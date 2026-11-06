# Project Architecture Document: Jain Mandir / Jambudweep Website

## 1. Executive Overview
The **Jain Mandir / Jambudweep (DJICR)** web platform is a modern decoupled web application designed to serve pilgrims, scholars, and administrative personnel of the Shri Digambar Jain Trilok Shodh Sansthan at Hastinapur, Meerut, Uttar Pradesh.

The architecture comprises:
- **Client Frontend**: Single Page Application (SPA) built with React 19, Vite 5, Tailwind CSS, React Router v7, and Lucide React.
- **Backend API**: RESTful API service built on Laravel 13 and PHP 8.4, utilizing Laravel Sanctum for API token authentication and Eloquent ORM with SQLite for local persistence (configurable for PostgreSQL/MySQL in production).
- **Administrative Portal**: Protected administrative dashboard within the SPA for content management (Blogs, Events, News, and Gallery), communicating with the backend via Bearer token authentication.

---

## 2. System Topology & Technology Stack

```
+-------------------------------------------------------------+
|                        Web Clients                          |
|             (Desktop, Tablet, Mobile Browsers)              |
+-------------------------------------------------------------+
                              |
                              | HTTPS
                              v
+-------------------------------------------------------------+
|                     Frontend SPA (Vite)                     |
|  - React 19 / React Router v7 / Tailwind CSS                |
|  - Public Portals: Home, About, Leaders, Gallery,           |
|    Events, Jambudweep, Donations, Contact, News             |
|  - Admin Dashboard: Manage Blogs, Events, News, Gallery     |
|  - HTTP Client: Axios with Authorization Interceptors       |
+-------------------------------------------------------------+
                              |
                              | REST JSON (Sanctum Bearer Auth)
                              v
+-------------------------------------------------------------+
|                    Backend API (Laravel 13)                 |
|  - PHP 8.4 / Laravel 13                                     |
|  - Routing: routes/api.php, routes/web.php                  |
|  - Authentication: Laravel Sanctum                          |
|  - Middleware: CORS, Security Headers, Throttle, AdminRole  |
|  - Controllers: AuthController, BlogController,             |
|    GalleryController, EventController, NewsController,      |
|    ContactController                                        |
+-------------------------------------------------------------+
                              |
                              | Eloquent ORM
                              v
+-------------------------------------------------------------+
|                     Database Layer                          |
|  - SQLite (Local Development & CI Test Environment)         |
|  - Production Compatible: PostgreSQL 15+ / MySQL 8.0+       |
|  - Tables: users, personal_access_tokens, blogs,            |
|    events, gallery_items, news_items, contact_submissions,  |
|    sessions, cache, jobs                                    |
+-------------------------------------------------------------+
```

### Detailed Component Specifications

| Tier | Component | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend** | Framework | React | 19.2.5 | Core reactive component tree |
| **Frontend** | Bundler | Vite | 5.4.11 | Build tool, HMR, production asset optimization |
| **Frontend** | Routing | React Router DOM | 7.14.2 | Client-side routing, route protection |
| **Frontend** | Styling | Tailwind CSS | 3.4.17 | Utility-first CSS architecture |
| **Frontend** | HTTP Client | Axios | 1.16.0+ | Promise-based HTTP client with interceptors |
| **Frontend** | Animations | Framer Motion | 12.38.0 | Micro-interactions and layout transitions |
| **Frontend** | Icons | Lucide React | 1.12.0 | Standardized UI iconography |
| **Backend** | Framework | Laravel | 13.7.0 | Backend core MVC / REST API framework |
| **Backend** | Language | PHP | 8.4.23 | Server-side execution engine |
| **Backend** | Auth Engine | Laravel Sanctum | 4.3.1 | Token-based API authentication |
| **Backend** | Package Mgr | Composer | 2.10.1 | PHP dependency management |
| **Database** | Development | SQLite | 3.x | Zero-config file-backed SQL database |
| **Database** | Production | MySQL / PostgreSQL | 8.0+ / 15+ | Enterprise relational storage |

---

## 3. Directory Layout & Key Modules

```
jain-mandir-website/
├── .env.example                     # Environment template for frontend
├── .gitignore                       # Repository ignore rules
├── eslint.config.js                 # Frontend static analysis configuration
├── index.html                       # SPA HTML entry point
├── package.json                     # Frontend dependencies & scripts
├── vite.config.js                   # Vite bundler configuration
├── src/                             # Frontend source code
│   ├── main.jsx                     # Application root bootstrapper
│   ├── App.jsx                      # Router definitions & route guards
│   ├── admin/                       # Admin portal module
│   │   ├── api/client.js            # Axios client with bearer token injector
│   │   ├── components/              # AdminLayout, ProtectedRoute
│   │   └── pages/                   # AdminDashboard, ManageBlogs, ManageEvents, etc.
│   ├── components/                  # Shared public components
│   │   ├── Home/                    # HeroSlider, Attractions, CosmicWonders, etc.
│   │   └── layout/                  # Header, Footer, Main Layout
│   ├── pages/                       # Public view components
│   │   ├── Home.jsx, About.jsx, Leaders.jsx, GalleryPage.jsx,
│   │   ├── Events.jsx, Jambudweep.jsx, Donations.jsx, Contact.jsx, News.jsx
│   └── data/                        # Static metadata (leadersData, jambudweepData, etc.)
├── backend/                         # Laravel API application
│   ├── artisan                      # Artisan CLI runner
│   ├── bootstrap/app.php            # Laravel application, middleware & exception config
│   ├── composer.json                # PHP dependencies & autoloader
│   ├── config/                      # Application configuration
│   │   ├── app.php, auth.php, cors.php, database.php, sanctum.php, session.php
│   ├── app/
│   │   ├── Http/Controllers/        # ContactController, Controller
│   │   │   └── API/                 # AuthController, BlogController, GalleryController, etc.
│   │   ├── Http/Middleware/         # Custom middleware (EnsureUserIsAdmin, SecurityHeaders)
│   │   └── Models/                  # User, Blog, Event, GalleryItem, NewsItem, ContactSubmission
│   ├── database/
│   │   ├── migrations/              # Database schema migrations
│   │   └── seeders/                 # Database seeders (AdminUserSeeder, DatabaseSeeder)
│   ├── routes/
│   │   ├── api.php                  # API route declarations & throttle limits
│   │   └── web.php                  # Root web route
│   └── tests/                       # Automated test suite (Feature & Unit)
└── docs/security/                   # Complete security audit, QA & deployment documentation
```

---

## 4. Network and API Surface Architecture

### Public Endpoints (Unauthenticated)
1. `GET /api/blogs` - Returns published blog posts (filtered by publication status).
2. `GET /api/blogs/{blog}` - Returns individual published blog post details.
3. `GET /api/gallery` - Returns gallery items categorized by temple/campus sections.
4. `GET /api/gallery/{galleryItem}` - Returns individual gallery item metadata.
5. `GET /api/events` - Returns scheduled events and holy festivals.
6. `GET /api/events/{event}` - Returns individual event details.
7. `GET /api/news` - Returns temple updates and press releases.
8. `GET /api/news/{newsItem}` - Returns individual news article.
9. `POST /api/contact` - Accepts public inquiry submissions (strictly rate-limited: 3 req/min, input bounded).
10. `GET /api/status` - Health check status endpoint (sanitized output).
11. `POST /api/login` - Admin login endpoint with server-side brute-force throttling.

### Protected Administrative Endpoints (`auth:sanctum` + `admin` authorization)
1. `GET /api/me` - Authenticated admin profile data.
2. `POST /api/logout` - Revokes the caller's active personal access token.
3. `POST /api/blogs` - Create a blog post.
4. `PUT /api/blogs/{blog}` - Update a blog post.
5. `DELETE /api/blogs/{blog}` - Delete a blog post.
6. `POST /api/gallery` - Add an item to the media gallery.
7. `PUT /api/gallery/{galleryItem}` - Update a gallery item.
8. `DELETE /api/gallery/{galleryItem}` - Delete a gallery item.
9. `POST /api/events` - Create a scheduled event.
10. `PUT /api/events/{event}` - Update an event.
11. `DELETE /api/events/{event}` - Delete an event.
12. `POST /api/news` - Create a news publication.
13. `PUT /api/news/{newsItem}` - Update a news publication.
14. `DELETE /api/news/{newsItem}` - Delete a news publication.

---

## 5. Security Boundary & Authentication Lifecycle
1. **Credentials Dispatch**: The administrator enters credentials at `/admin/login`.
2. **Brute Force Protection**: The backend verifies credentials under a rate limiter (`throttle:5,1` - 5 attempts per minute per IP/email).
3. **Role Validation**: Authentication verifies both valid credentials and explicit administrator privilege (`is_admin === true` or role `admin`).
4. **Token Generation**: Upon successful authentication, a Sanctum token with an explicit expiration is issued.
5. **Client Persistence**: Token is stored in client browser storage and passed in the `Authorization: Bearer <token>` header for subsequent requests.
6. **Authorization Guard**: Every state-changing administrative endpoint enforces both token validity and admin authorization via backend middleware.
7. **Session Invalidation**: On logout, a call is made to `POST /api/logout` to revoke the token on the server before client storage is purged.

---

## 6. Baseline Verification Information
- **Git Branch**: `security/prelaunch-hardening`
- **Initial Baseline Commit**: `2b11180`
- **Audit Date**: November 2026
- **Status**: Audit & Remediation In-Progress

