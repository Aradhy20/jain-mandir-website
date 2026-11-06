# API Security Audit & Route Inventory

## 1. Executive Summary
This document provides a comprehensive security audit of every API endpoint exposed by the Jain Mandir / Jambudweep backend, aligned with the **OWASP API Security Top 10 (2023)**.

---

## 2. Complete Route Inventory

| Method | Endpoint | Controller Action | Auth Requirement | Authz Rule | Access | Input Validation Rules | Test Coverage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/login` | `AuthController@login` | None (Public) | None | Public | `email` (req, email, max:255), `password` (req, str, min:6, max:255), `device_name` (req, str, max:100) | `AuthenticationSecurityTest` |
| **GET** | `/api/me` | `AuthController@me` | `auth:sanctum` | `admin` | Admin Only | None | `AuthenticationSecurityTest` |
| **POST** | `/api/logout` | `AuthController@logout` | `auth:sanctum` | `admin` | Admin Only | None | `AuthenticationSecurityTest` |
| **GET** | `/api/blogs` | `BlogController@index` | None (Optional) | Filtered by publication | Public / Admin | None (Query parameter) | `ApiAndInputSecurityTest` |
| **GET** | `/api/blogs/{blog}` | `BlogController@show` | None (Optional) | Drafts blocked for public | Public / Admin | Route Model Binding (`id`) | `ApiAndInputSecurityTest` |
| **POST** | `/api/blogs` | `BlogController@store` | `auth:sanctum` | `admin` | Admin Only | `title` (req, min:2, max:255), `content` (req, max:65535), `image_url` (opt, max:2048), `author` (opt, max:100), `published_at` (opt, date) | `AuthorizationSecurityTest` |
| **PUT/PATCH** | `/api/blogs/{blog}` | `BlogController@update` | `auth:sanctum` | `admin` | Admin Only | `title` (opt, min:2, max:255), `content` (opt, max:65535), `image_url` (opt, max:2048), `author` (opt, max:100), `published_at` (opt, date) | `AuthorizationSecurityTest` |
| **DELETE** | `/api/blogs/{blog}` | `BlogController@destroy` | `auth:sanctum` | `admin` | Admin Only | Route Model Binding (`id`) | `AuthorizationSecurityTest` |
| **GET** | `/api/gallery` | `GalleryController@index` | None | None | Public | None | `AuthorizationSecurityTest` |
| **GET** | `/api/gallery/{galleryItem}` | `GalleryController@show` | None | None | Public | Route Model Binding (`id`) | Code Review |
| **POST** | `/api/gallery` | `GalleryController@store` | `auth:sanctum` | `admin` | Admin Only | `title` (opt, max:255), `image_url` (req, max:2048), `category` (opt, max:100), `description` (opt, max:2000) | `AuthorizationSecurityTest` |
| **PUT/PATCH** | `/api/gallery/{galleryItem}` | `GalleryController@update` | `auth:sanctum` | `admin` | Admin Only | `title` (opt, max:255), `image_url` (opt, max:2048), `category` (opt, max:100), `description` (opt, max:2000) | Code Review |
| **DELETE** | `/api/gallery/{galleryItem}` | `GalleryController@destroy` | `auth:sanctum` | `admin` | Admin Only | Route Model Binding (`id`) | Code Review |
| **GET** | `/api/events` | `EventController@index` | None | None | Public | None | `AuthorizationSecurityTest` |
| **GET** | `/api/events/{event}` | `EventController@show` | None | None | Public | Route Model Binding (`id`) | Code Review |
| **POST** | `/api/events` | `EventController@store` | `auth:sanctum` | `admin` | Admin Only | `title` (req, min:2, max:255), `description` (req, max:65535), `event_date` (opt, date), `location` (opt, max:255), `image_url` (opt, max:2048) | `AuthorizationSecurityTest` |
| **PUT/PATCH** | `/api/events/{event}` | `EventController@update` | `auth:sanctum` | `admin` | Admin Only | `title` (opt, min:2, max:255), `description` (opt, max:65535), `event_date` (opt, date), `location` (opt, max:255), `image_url` (opt, max:2048) | Code Review |
| **DELETE** | `/api/events/{event}` | `EventController@destroy` | `auth:sanctum` | `admin` | Admin Only | Route Model Binding (`id`) | Code Review |
| **GET** | `/api/news` | `NewsController@index` | None | None | Public | None | `AuthorizationSecurityTest` |
| **GET** | `/api/news/{newsItem}` | `NewsController@show` | None | None | Public | Route Model Binding (`id`) | Code Review |
| **POST** | `/api/news` | `NewsController@store` | `auth:sanctum` | `admin` | Admin Only | `title` (req, min:2, max:255), `content` (req, max:65535), `news_date` (opt, date), `image_url` (opt, max:2048) | `AuthorizationSecurityTest` |
| **PUT/PATCH** | `/api/news/{newsItem}` | `NewsController@update` | `auth:sanctum` | `admin` | Admin Only | `title` (opt, min:2, max:255), `content` (opt, max:65535), `news_date` (opt, date), `image_url` (opt, max:2048) | Code Review |
| **DELETE** | `/api/news/{newsItem}` | `NewsController@destroy` | `auth:sanctum` | `admin` | Admin Only | Route Model Binding (`id`) | Code Review |
| **POST** | `/api/contact` | `ContactController@submit` | None | Rate Limited (`throttle:3,1`) | Public | `name` (req, min:2, max:100), `email` (req, email, max:255), `message` (req, min:5, max:5000) | `ApiAndInputSecurityTest` |
| **GET** | `/api/status` | `ContactController@status` | None | None | Public | None | `ApiAndInputSecurityTest` |

---

## 3. OWASP API Security Top 10 (2023) Assessment

### API1:2023 Broken Object Level Authorization (BOLA)
- **Evaluation**: Administrative resource mutations (`PUT /api/blogs/{blog}`, `DELETE /api/blogs/{blog}`, etc.) are protected behind `EnsureUserIsAdmin` middleware. Only authenticated users with verified administrator privilege can mutate any temple content.
- **Verdict**: **PASS**

### API2:2023 Broken Authentication
- **Evaluation**: The login endpoint is hardened with `throttle:5,1` brute force protection. Tokens are issued with a 120-minute expiration. Tokens are revoked on logout. Non-admins cannot log in.
- **Verdict**: **PASS**

### API3:2023 Broken Object Property Level Authorization
- **Evaluation**: Excessive data exposure was remediated in `AuthController::login` and `/api/me`. Only `id`, `name`, `email`, and `is_admin` are returned. Passwords and remember tokens are shielded by model attributes.
- **Verdict**: **PASS**

### API4:2023 Unrestricted Resource Consumption
- **Evaluation**: Rate limiting is applied to high-risk endpoints (`throttle:5,1` on `/api/login`, `throttle:3,1` on `/api/contact`). Maximum character bounds (`max:5000` on messages, `max:255` on titles) protect against payload flooding.
- **Verdict**: **PASS**

### API5:2023 Broken Function Level Authorization (BFLA)
- **Evaluation**: Administrative endpoints were separated from public access using middleware `['auth:sanctum', 'admin']`. Regular visitors cannot access admin capabilities by guessing URLs.
- **Verdict**: **PASS**

### API6:2023 Unrestricted Access to Sensitive Business Flows
- **Evaluation**: Contact form abuse is mitigated with rate limiting (`3 req/min`) and field length constraints.
- **Verdict**: **PASS**

### API7:2023 Server Side Request Forgery (SSRF)
- **Evaluation**: The backend does not fetch remote URLs or proxy external requests based on user input. Image URLs stored in the database are rendered directly on the client side.
- **Verdict**: **PASS**

### API8:2023 Security Misconfiguration
- **Evaluation**: Security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, etc.) are attached to all responses. Production `.env` guidelines mandate `APP_DEBUG=false`.
- **Verdict**: **PASS**

### API9:2023 Improper Inventory Management
- **Evaluation**: Deprecated or rogue debug routes were removed. All routes are explicitly defined in `routes/api.php` and verified via `php artisan route:list`.
- **Verdict**: **PASS**

### API10:2023 Unsafe Consumption of APIs
- **Evaluation**: The backend relies solely on first-party database transactions and does not ingest untrusted third-party API payloads.
- **Verdict**: **PASS**

