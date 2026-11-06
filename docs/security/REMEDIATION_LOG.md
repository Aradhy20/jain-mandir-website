# Security Remediation Log: Jain Mandir / Jambudweep Platform

## Log Metadata
- **Branch**: `security/prelaunch-hardening`
- **Baseline Commit**: `2b11180`
- **Execution Date**: November 2026

---

## 1. Remediation Chronology

### Entry REM-001: Database Migration for Admin Role Enforcement
- **Date**: November 2026
- **Files Modified/Created**:
  - `backend/database/migrations/2026_11_05_172333_add_is_admin_to_users_table.php` (Created)
  - `backend/app/Models/User.php` (Modified)
- **Change Description**: Added `is_admin` boolean column to the `users` table defaulting to `false`. Configured `is_admin` boolean cast and `isAdmin(): bool` and `setAdmin(bool $status = true): self` helper methods on `User.php`. Note: `is_admin` is strictly excluded from `#[Fillable]` to prevent mass-assignment privilege escalation.
- **Verification**: Ran `php artisan migrate` successfully on database.sqlite.

### Entry REM-002: Role-Based Authorization Middleware
- **Date**: November 2026
- **Files Modified/Created**:
  - `backend/app/Http/Middleware/EnsureUserIsAdmin.php` (Created)
  - `backend/bootstrap/app.php` (Modified)
  - `backend/routes/api.php` (Modified)
- **Change Description**: Created `EnsureUserIsAdmin` middleware to block non-admin users with HTTP 403. Registered alias `'admin'` in `bootstrap/app.php` and grouped all administrative routes under `middleware(['auth:sanctum', 'admin'])`.
- **Verification**: Verified via `php artisan route:list` and `AuthorizationSecurityTest`.

### Entry REM-003: Defensive HTTP Security Headers Middleware
- **Date**: November 2026
- **Files Modified/Created**:
  - `backend/app/Http/Middleware/SecurityHeadersMiddleware.php` (Created)
  - `backend/bootstrap/app.php` (Modified)
- **Change Description**: Attached standard browser defense headers (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`, and conditional HSTS) globally to all HTTP responses.
- **Verification**: Verified via `ApiAndInputSecurityTest::test_responses_contain_protective_security_headers`.

### Entry REM-004: Brute Force Protection and Sanitized Auth Payloads
- **Date**: November 2026
- **Files Modified/Created**:
  - `backend/routes/api.php` (Modified)
  - `backend/app/Http/Controllers/API/AuthController.php` (Modified)
- **Change Description**:
  - Appended `throttle:5,1` to `POST /api/login`.
  - Added administrator privilege check in `AuthController::login` to reject non-admin logins with HTTP 403.
  - Sanitized login and `/api/me` payloads to return only `id`, `name`, `email`, and `is_admin`.
- **Verification**: Verified via `AuthenticationSecurityTest`.

### Entry REM-005: Sanctum Token Expiration Configuration
- **Date**: November 2026
- **Files Modified/Created**:
  - `backend/config/sanctum.php` (Modified)
- **Change Description**: Updated `'expiration'` from `null` to `env('SANCTUM_EXPIRATION', 120)` (default 120 minutes).
- **Verification**: Verified configuration values in `sanctum.php`.

### Entry REM-006: Server-Side Logout Token Revocation
- **Date**: November 2026
- **Files Modified/Created**:
  - `src/admin/components/AdminLayout.jsx` (Modified)
- **Change Description**: Updated `handleLogout` in the admin panel to dispatch `await client.post('/logout')` prior to removing local storage items, ensuring the active personal access token is purged from the database.
- **Verification**: Verified via `AuthenticationSecurityTest::test_logout_endpoint_revokes_token`.

### Entry REM-007: Seeder Hardening
- **Date**: November 2026
- **Files Modified/Created**:
  - `backend/database/seeders/AdminUserSeeder.php` (Modified)
- **Change Description**: Made credentials configurable via `ADMIN_DEFAULT_EMAIL` and `ADMIN_DEFAULT_PASSWORD` environment variables, and explicitly set `is_admin => true`.
- **Verification**: Executed `php artisan db:seed --class=AdminUserSeeder`.

### Entry REM-008: Publication Status Enforcement on Content APIs
- **Date**: November 2026
- **Files Modified/Created**:
  - `backend/app/Http/Controllers/API/BlogController.php` (Modified)
- **Change Description**: Public requests to `GET /api/blogs` and `GET /api/blogs/{blog}` now require `published_at` to be not-null and in the past. Drafts return 404 for public callers while remaining accessible to authenticated administrators.
- **Verification**: Verified via `ApiAndInputSecurityTest::test_public_endpoint_exposes_only_published_blogs`.

### Entry REM-009: Input Validation Bounds and Sanitization
- **Date**: November 2026
- **Files Modified/Created**:
  - `backend/app/Http/Controllers/ContactController.php` (Modified)
  - `backend/app/Http/Controllers/API/BlogController.php` (Modified)
  - `backend/app/Http/Controllers/API/GalleryController.php` (Modified)
  - `backend/app/Http/Controllers/API/EventController.php` (Modified)
  - `backend/app/Http/Controllers/API/NewsController.php` (Modified)
- **Change Description**:
  - Added `min` and `max` constraints to all inputs.
  - Stripped HTML tags (`strip_tags`) from user submitted text to avoid stored injection.
  - Hardened health endpoint `status()` to verify DB connectivity without exposing internal credentials.
- **Verification**: Verified via `ApiAndInputSecurityTest`.

### Entry REM-010: Dynamic CORS Allowlist
- **Date**: November 2026
- **Files Modified/Created**:
  - `backend/config/cors.php` (Modified)
- **Change Description**: Preserved user local test ports while supporting `CORS_ALLOWED_ORIGINS` and `FRONTEND_URL` from `.env`.
- **Verification**: Config validation and route requests.

### Entry REM-011: Frontend Build Optimization, Linting & Assets
- **Date**: November 2026
- **Files Modified/Created**:
  - `package.json` (Modified - added eslint & plugins)
  - `eslint.config.js` (Modified - configured ignores and rules)
  - `vite.config.js` (Modified - disabled sourcemaps, added manual vendor chunks)
  - `index.html` (Modified - updated favicon, added Open Graph & Twitter meta)
  - `public/robots.txt` (Created)
  - `public/sitemap.xml` (Created)
  - `.env.example` (Created)
- **Change Description**: Enabled clean `npm run lint` and `npm run build`, eliminated >500kB chunks, and established SEO/social sharing baseline.
- **Verification**: Executed `npm run lint` (0 errors) and `npm run build` (success).

### Entry REM-012: Dependency Vulnerability Updates
- **Date**: November 2026
- **Files Modified/Created**:
  - `backend/composer.lock` (Updated via composer update)
  - `package-lock.json` (Updated via npm audit fix)
- **Change Description**: Upgraded backend packages to current patch releases (resolving all 47 composer advisories). Fixed high severity vulnerabilities in npm packages.
- **Verification**: Ran `composer audit` (0 advisories) and verified application test suite.

### Entry REM-013: GitHub Actions Security & CI Workflow
- **Date**: November 2026
- **Files Modified/Created**:
  - `.github/workflows/ci.yml` (Created)
- **Change Description**: Added automated multi-stage CI pipeline for frontend build/lint/audit and backend composer/PHPUnit testing.
- **Verification**: Verified workflow YAML structure and step coverage.

### Entry REM-014: Mass Assignment Protection on User is_admin & Seeder Environment Hardening
- **Date**: November 2026
- **Files Modified/Created**:
  - `backend/app/Models/User.php` (Modified)
  - `backend/database/seeders/AdminUserSeeder.php` (Modified)
  - `backend/database/seeders/DatabaseSeeder.php` (Modified)
  - `backend/tests/Feature/AuthorizationSecurityTest.php` (Modified)
- **Change Description**:
  - Removed `is_admin` from `#[Fillable]` on `User.php` to prevent attackers or users from elevating their privileges through mass assignment.
  - Required administrator role assignment to proceed strictly through explicit provisioning logic (`$user->setAdmin(true)` or `$user->is_admin = true`).
  - Gated `DatabaseSeeder.php` test user creation to `local` and `testing` environments only.
  - Added abort condition with RuntimeException in `AdminUserSeeder.php` if executed in production with the fallback default password `'admin123'`.
  - Added 5 regression tests in `AuthorizationSecurityTest.php` to verify mass assignment protection and seeder production guards.
- **Verification**: Verified via `php artisan test` (`AuthorizationSecurityTest` passes all 10 tests).

