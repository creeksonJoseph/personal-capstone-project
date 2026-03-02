# Birch Hills School - Full-Stack Application Overview

Welcome to the Birch Hills School project repository. This is a full-stack web application designed for a school, featuring a public-facing informative website and a secure administrative dashboard for a content management system (CMS) covering blogs and galleries.

## Architecture

This project is separated into a decoupled **Frontend (React)** and **Backend (Django)** architecture.

- **Frontend**: A modern Single Page Application (SPA) built with React, Vite, and TailwindCSS.
- **Backend**: A robust REST API built with Django and Django REST Framework (DRF).
- **Media Storage**: Cloudinary is integrated directly for image storage across both ends.

## Documentation Navigation

To keep the documentation comprehensive yet accessible, it is divided into specific areas:

1. [**Frontend Documentation**](./frontend/README.md)
   - Setup instructions (Node.js, Vite).
   - Component structure and routing (Pages like Home, Admissions, Admin, Blog).
   - State management and API integration architecture (Axios, hooks).
   - Styling strategies (TailwindCSS).

2. [**Backend Documentation**](./backend/README.md)
   - Setup instructions (Python, Virtual Environments, Requirements).
   - Database schema and Models (`Post`, `Category`, `GalleryImage`, `Tag`).
   - Authentication flow (PyJWT).
   - API endpoints structure and Django Admin.

## Features

- **Public Site**: Home, Story, Admissions, Academics, Contact, Gallery, and Blog pages fully responsive for mobile and desktop viewing.
- **Admin Dashboard**: Secure panel to manage, create, and edit Blog Posts (with a rich text editor powered by Lexical), manage Post Categories, and update the School Gallery.
- **Media Management**: Automatic Cloudinary integration ensuring that uploaded images are hosted externally, and deleted images are automatically removed from Cloudinary buckets via Django signals.
- **Authentication**: JWT-based secure authentication for administrators.

## Getting Started

To get the entire stack running locally, you must run both the frontend and backend servers.

### 1. Start the Backend server first
Navigate to the backend directory, activate your environment, and run the server. See [Backend README](./backend/README.md) for detailed environment setup.
```bash
cd backend
# Activate virtual environment (e.g., source venv/bin/activate)
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 2. Start the Frontend server
Navigate to the frontend directory, install dependencies, and run the Vite development server. See [Frontend README](./frontend/README.md).
```bash
cd frontend
npm install
npm run dev
```

## Deployment Info

- **Frontend**: Designed to be deployed on static hosting platforms like Vercel, Netlify, or Render (configured for `vite build`).
- **Backend**: Production-ready with `gunicorn`, `whitenoise` (for static assets), and `dj-database-url` (for Heroku/Render-like database deployments).