# Birch Hills School - Frontend Application

This directory contains the frontend portion of the Birch Hills School website, built with **React** and **Vite**.

## Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **Styling**: TailwindCSS 3.4 (with PostCSS and Autoprefixer)
- **State/Fetching**: Custom React Hooks utilizing `axios` for API calls
- **Rich Text Editor**: Lexical (Facebook's extensible web text-editor framework)
- **Media**: Cloudinary Core (for image transformations/optimizations)
- **Testing**: Vitest & React Testing Library

## Folder Structure

```text
frontend/
├── src/
│   ├── api/          # Axios instances and endpoint configurations (auth, Cloudinary)
│   ├── assets/       # Static local assets
│   ├── components/   # Reusable UI components (Navbar, Footer, Buttons, Lexical Editor wrappers)
│   ├── config/       # Environment variables / global config
│   ├── context/      # React Contexts (e.g., Auth Context if applicable)
│   ├── data/         # Static fallback data or constants
│   ├── hooks/        # Custom hooks for managing state and API calls (e.g., usePost)
│   └── pages/        # Route components (representing full pages)
├── package.json      # Dependencies and npm scripts
├── vite.config.js    # Vite builder configuration
└── tailwind.config.js# Tailwind theme and plugin setup
```

## Key Pages and Routes

The application features a mix of public and protected (admin) routes:

**Public Pages:**
- `Home.jsx` - Landing page.
- `Story.jsx` - About us / History of the school.
- `Admissions.jsx` - Information on how to apply.
- `Academics.jsx` - Curriculum information.
- `Gallery.jsx` - Public image gallery.
- `Blog.jsx` & `SingleBlog.jsx` - Listing and viewing specific school news/articles.
- `Contact.jsx` - Contact form and location details.

**Admin Pages (Protected):**
- `Login.jsx` - Authentication entry point.
- `Admin.jsx` - Main admin dashboard.
- `AdminGallery.jsx` - Upload/Delete images for the Gallery.
- `AllPosts.jsx` - CMS view of all blog posts with edit/delete actions.
- `CreatePost.jsx` & `EditPost.jsx` - Interface for authoring blog posts using the configured Lexical Rich Text Editor. Includes featured image upload and article taxonomy management.

## Setup and Commands

Make sure you have Node.js (v18+ recommended) installed.

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Testing
```bash
npm run test           # Run Vitest globally
npm run test:ui        # Run Vitest with the UI dashboard
npm run test:coverage  # Generate coverage reports
```

### Linting
```bash
npm run lint
```

## Integration with Backend

The frontend extensively communicates with the Django REST backend. 
- Ensure that the backend server is running locally (usually `http://localhost:8000`) before developing features that require API interaction (like viewing the blog or logging in).
- Environment variables (usually in a `.env` file) dictates the base URL for the API endpoints and the Cloudinary cloud name.

*Note: Clean up of `TODOs` and redundant console logs is advised before pushing any new UI changes to production.*
