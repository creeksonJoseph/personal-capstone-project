# Birch Hills School - Backend API

This directory contains the backend REST API for the Birch Hills School application, built with **Django** and **Django REST Framework (DRF)**.

## Technology Stack

- **Framework**: Django 4.2.27
- **API Toolkit**: Django REST Framework (DRF) 3.14.0
- **Database**: PostgreSQL (Production) / SQLite3 (Local Dev default)
- **Authentication**: PyJWT (JSON Web Tokens)
- **Media Management**: Cloudinary plugin for Django
- **Environment config**: python-decouple
- **Image Processing**: Pillow
- **Production Server**: Gunicorn with Whitenoise (for static assets delivery)

## Project Structure

```text
backend/
├── backend/                  # Django Project configurations
│   ├── settings.py           # Includes database, apps, cloudinary, and auth settings
│   ├── urls.py               # Main project URL router
│   └── wsgi.py / asgi.py
├── api/                      # Main Django App
│   ├── models.py             # Database schemas (Post, Category, GalleryImage)
│   ├── serializers.py        # DRF data serialization
│   ├── views/                # API endpoint controllers (split by feature)
│   ├── urls.py               # App-level URL routing
│   └── authentication.py     # Custom JWT backend authentication configurations
├── manage.py                 # Django command-line utility
├── requirements.txt          # Python dependencies
└── db.sqlite3                # Local development database
```

## Core Models

- **`Post`**: Represents blog articles. Supports rich text content (JSON extracted from Lexical editor frontend), HTML fallbacks, publication status, author tags, and references Cloudinary images.
- **`Category` & `Tag`**: Taxonomies to categorize and label `Post` items. Categories and tags automatically generate URL-friendly slugs.
- **`GalleryImage`**: Standalone public gallery images.
- **`PostImage`**: Inline images specifically uploaded inside the content editor of a blog post.

*Note on Media:* 
This backend automatically handles Cloudinary image deletion via **Django Signals**. When a `Post`, `GalleryImage`, or `PostImage` is deleted or a featured image is updated, an API call is made to Cloudinary to destroy the orphaned asset, maintaining clean storage.

## Key Endpoints (`/api/`)

A `DefaultRouter` connects the endpoints automatically. Common endpoints include:
- `POST /login/` - Authenticates admin users and hands out JWT.
- `POST /logout/` - Clears the authentication token.
- `GET /check-auth/` - Verifies the valid state of a JWT.
- `GET/POST /posts/` - Blog Post CRUD operations.
- `GET/POST /categories/` - Taxonomy CRUD operations.
- `GET/POST /gallery-images/` - Gallery image CRUD.
- `POST /cloudinary/signature/` - Provides a secure, signed hash to the frontend, allowing the frontend to upload images directly to Cloudinary without passing large binaries through this Django backend.
- `POST /cloudinary/delete/` - Direct explicit request to remove a specific image.

## Setup Instructions

Make sure you have Python 3.9+ installed natively.

1. **Activate a Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Or `venv\Scripts\activate` on Windows
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure Environment Variables**
   Ensure an `.env` file exists at the root of this `backend` repository containing necessary values:
   - `SECRET_KEY`
   - `DEBUG`
   - `DATABASE_URL` (For pointing to PostgreSQL)
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

4. **Run Migrations**
   ```bash
   python manage.py migrate
   ```

5. **Start the Development Server**
   ```bash
   python manage.py runserver
   ```
   The API will be accessible by default at `http://localhost:8000/`. You can view the native DRF browsable API by navigating there in your browser.

## Deployment Notes

- The project uses `dj-database-url` meaning database connections are exclusively evaluated from the `DATABASE_URL` environment variable if present.
- `Whitenoise` is configured in `settings.py` middleware to serve static files (like Django admin styles) effectively in production.
