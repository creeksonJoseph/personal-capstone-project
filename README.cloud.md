# Cloud Deployment Guide — Birch Hills School

This document narrates the complete cloud deployment setup for the Birch Hills School application. The app runs as three Docker containers on a single **Azure Linux VM**, orchestrated with **Docker Compose** and deployed automatically via a **GitHub Actions CI/CD pipeline** on every push to the `main` branch.

---

## 1. Infrastructure Overview

```
Internet
   │
   ▼
Azure VM (102.133.146.89) — Ubuntu Linux
   │
   ▼ Port 80
┌─────────────────────────────────────┐
│  birch_hills_frontend (Nginx)       │  React SPA + Nginx reverse proxy
│                                     │
│  /           → serves React SPA     │
│  /api/  ──►  backend:8000/api/      │  Internal proxy (same-origin trick)
└─────────────────────────────────────┘
   │
   ▼ Port 8000 (internal only)
┌─────────────────────────────────────┐
│  birch_hills_backend (Gunicorn)     │  Django REST API
│  - Runs migrations on startup       │
│  - Collects static files            │
│  - Connects to DB via Docker net    │
└─────────────────────────────────────┘
   │
   ▼ Port 5432 (internal only)
┌─────────────────────────────────────┐
│  birch_hills_db (PostgreSQL 15)     │  Persistent volume: postgres_data
└─────────────────────────────────────┘
```

### Key Design Decision — Nginx as API Proxy

All browser API calls go to `http://102.133.146.89/api/` (port 80), and Nginx proxies them internally to the backend container on port 8000. This means the browser sees everything on the same origin, completely eliminating CORS browser errors. The backend port 8000 is **never exposed directly to the internet**.

![Frontend preview — the live public-facing site served by Nginx on the VM](./screenshots/frontend%20preview.png)

---

## 2. VM Setup

The deployment target is an **Azure Virtual Machine** with the following characteristics:

- **Provider**: Microsoft Azure
- **OS**: Ubuntu Linux
- **Public IP**: `102.133.146.89` (static)

- **Protocol**: HTTP only (no SSL certificate configured)
- **Project directory on VM**: `/home/creeksonjoseph/birch-hills-school/`

Docker and Docker Compose are installed automatically by the CI/CD pipeline on first run if they are not already present.

> **HTTP-Only Note**: Because the VM runs on plain HTTP (not HTTPS), all security settings that require HTTPS have been made opt-in via the `HTTPS_ENABLED` environment variable. JWT session cookies are set with `Secure=False, SameSite=Lax` so browsers can store them over HTTP. When HTTPS is added in future, simply set `HTTPS_ENABLED=True` in the VM's `.env` file.

---

## 3. GitHub Actions CI/CD Pipeline

The pipeline is defined at `.github/workflows/deploy.yml` and triggers on every push to `main`.

### Pipeline Stages

#### Stage 1 — `build-and-push`

1. Checks out the repository code.
2. Logs in to **Docker Hub** using stored secrets.
3. Builds the **backend** Docker image from `./backend/Dockerfile` and pushes it to Docker Hub as `creeksonjoseph/birch-hills-backend:latest`.
4. Builds the **frontend** Docker image from `./frontend/Dockerfile`, injecting `VITE_API_URL` as a build argument so Vite bakes the correct API URL into the compiled React bundle. Pushes to Docker Hub as `creeksonjoseph/birch-hills-frontend:latest`.

#### Stage 2 — `deploy`

1. Copies the `docker-compose.yml` file to the VM at `/home/creeksonjoseph/birch-hills-school/` via SCP.
2. SSHs into the VM and runs:
   - Installs Docker + Docker Compose if missing.
   - Exports required environment variables (`DOCKER_USERNAME`, `AZURE_VM_HOST`).
   - `docker-compose pull` — pulls the freshly-built images from Docker Hub.
   - `docker-compose up -d` — restarts containers in the background.

![GitHub Actions workflow — successful build and deploy run](./screenshots/a%20preview%20of%20github%20workflow%20success.png)

---

## 4. Required GitHub Repository Secrets

Navigate to **GitHub → Repository → Settings → Secrets and variables → Actions** and create the following secrets. The **values** must never be committed to the repository.

| Secret Name | Description |
|---|---|
| `AZURE_VM_HOST` | Public IP address of the Azure VM |
| `AZURE_VM_USERNAME` | SSH username for the VM |
| `AZURE_VM_SSH_KEY` | Full RSA private key text (including `-----BEGIN RSA PRIVATE KEY-----` header/footer) |
| `DOCKER_USERNAME` | Docker Hub username used to push/pull images |
| `DOCKER_PASSWORD` | Docker Hub Personal Access Token (PAT) — not your account password |

> All secret names are referenced with `${{ secrets.SECRET_NAME }}` syntax inside the workflow file.

---

## 5. Environment Variables

### Backend Container (set in `docker-compose.yml`)

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string pointing to the `db` container (`?sslmode=disable` required for Docker-internal connections) |
| `DB_SSL_REQUIRE` | Set to `False` for the container DB; set to `True` for cloud DBs like Neon |
| `DEBUG` | `False` in production |
| `ALLOWED_HOSTS` | `*` (the VM IP is dynamic; Nginx handles host filtering) |
| `CORS_ALLOWED_ORIGINS` | Comma-separated list of allowed frontend origins |
| `CSRF_TRUSTED_ORIGINS` | Comma-separated list of trusted origins for CSRF |
| `SECRET_KEY` | Django secret key |
| `HTTPS_ENABLED` | `False` on this HTTP-only VM. Set to `True` only when an SSL certificate is configured |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for media storage |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

### Frontend Build Argument (set in `docker-compose.yml` → `build.args`)

| Argument | Purpose |
|---|---|
| `VITE_API_URL` | Baked into the React bundle at build time. Points to `http://102.133.146.89/api` — the Nginx proxy path |


## 6. Docker Images

| Image | Registry | Tag |
|---|---|---|
| Backend | `docker.io/creeksonjoseph/birch-hills-backend` | `latest` |
| Frontend | `docker.io/creeksonjoseph/birch-hills-frontend` | `latest` |

Images are rebuilt and pushed on every `main` branch push. The VM always pulls `latest` during deployment.

---

## 7. Backend Startup Sequence

When the backend container starts, it runs this sequence before accepting requests:

```bash
cd /app/backend \
  && python manage.py collectstatic --noinput \
  && python manage.py migrate \
  && gunicorn --bind 0.0.0.0:8000 backend.wsgi:application
```

The backend container has a `depends_on` health check on the `db` container, so it only starts after PostgreSQL reports healthy.

![Azure CLI — all three containers running healthy](./screenshots/a%20preview%20of%20logs%20in%20azure%20cli%20of%20the%20containers%20running.png)

---

## 8. Authentication Architecture on HTTP

The API uses **JWT (JSON Web Token)** authentication stored in an **HttpOnly cookie** named `jwt`.

Because the VM is HTTP-only, the cookie is configured as:
- `Secure=False` — allows the browser to store the cookie over HTTP
- `SameSite=Lax` — prevents CSRF attacks while allowing same-site requests
- `HttpOnly=True` — not accessible via JavaScript
- `max_age=86400` — expires after 24 hours

When HTTPS is enabled in future, set `HTTPS_ENABLED=True` to switch to `Secure=True, SameSite=None`.

---

## 9. Initial Admin Account Setup

After the first deployment, the database is empty. To create a Django superuser and set up the admin account:

```bash
# 1. SSH into the VM
ssh -i fullstack-vm_key.pem <username>@<IP_ADDRESS>

# 2. Create the superuser interactively
sudo docker exec -it birch_hills_backend python /app/backend/manage.py createsuperuser

# 3. Or non-interactively (replace values)
sudo docker exec -it birch_hills_backend python /app/backend/manage.py shell -c \
  "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'admin@birch.com', 'YourPassword!')"
```

The custom admin dashboard is then accessible at: **`http://<IP_ADDRESS>/admin`**

![Admin login page — the custom React admin portal](./screenshots/A%20preview%20of%20the%20admin%20login.png)

---

## 10. Future Improvements

- **HTTPS / SSL**: Obtain a domain name and configure Let's Encrypt with Certbot (or use an Azure Load Balancer with TLS termination). Then set `HTTPS_ENABLED=True` in the VM's `.env`.
- **Staging environment**: Add a `staging` branch that deploys to a dedicated VM.
- **Secrets management**: Move Cloudinary credentials and `SECRET_KEY` out of `docker-compose.yml` and into the VM's `.env` file or Azure Key Vault.
- **Database backups**: Set up a scheduled `pg_dump` cron job on the VM to back up the `postgres_data` volume.
