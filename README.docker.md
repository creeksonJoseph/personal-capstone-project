# Docker and CI/CD Setup Instructions

This repository is configured with Docker and a GitHub Actions CI/CD pipeline.

## 1. Local Development Support
You can run the full application (Frontend, Backend, and Database) locally using Docker Compose.

```bash
docker-compose up --build -d
```
- **Frontend** will be running at `http://localhost:80`
- **Backend** will be running at `http://localhost:8000`
- **Postgres DB** will be running at `localhost:5432`

## 2. GitHub Actions Deployment Pipeline
The application uses GitHub Actions (`.github/workflows/deploy.yml`) to automatically build and deploy new images to an **Azure Linux VM** on every push to the `main` branch.

### Prerequisites (GitHub Secrets)
To make the pipeline work, you **must** configure the following secrets in your GitHub repository (`Settings` > `Secrets and variables` > `Actions` > `New repository secret`):

1. **`AZURE_VM_HOST`**: The VM's IP Documented as `102.133.146.89`.
2. **`AZURE_VM_USERNAME`**: The VM SSH username `creeksonjoseph`.
3. **`AZURE_VM_SSH_KEY`**: The **full private key text** for the VM. 
   *(Note: You provided the fingerprint earlier. GitHub needs the actual raw private key, beginning with `-----BEGIN RSA PRIVATE KEY-----` and ending with `-----END RSA PRIVATE KEY-----`)*.
4. **`DOCKER_USERNAME`**: Your Docker Hub username `creeksonjoseph`.
5. **`DOCKER_PASSWORD`**: Your Personal Access Token for Docker Hub (e.g., `dckr_pat_...`).

### What the Pipeline Does
1. **Builds** the Frontend and Backend Docker images.
2. **Pushes** the images to your Docker Hub repository.
3. **Connects** to the Azure VM via SSH.
4. **Installs** Docker and Docker Compose automatically if they are missing.
5. **Copies** the `docker-compose.yml` file to `/home/creeksonjoseph/birch-hills-school/`.
6. **Pulls** the latest images and restarts the application safely in the background.

## 3. Environment Variables
Local development uses `.env` defaults defined in `docker-compose.yml`. For your production Azure VM, you can place a `.env` file at `/home/creeksonjoseph/birch-hills-school/.env` with your secure credentials. Docker Compose will automatically detect and apply them.
