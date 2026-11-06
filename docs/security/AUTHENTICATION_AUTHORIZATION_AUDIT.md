# Authentication and Authorization Security Audit

## 1. Overview
This audit examines the identity, authentication, token management, and role-based access control (RBAC) architecture of the Jain Mandir / Jambudweep platform.

---

## 2. Authentication Mechanics

### 2.1 Password Hashing Architecture
- **Algorithm**: `bcrypt` (default in Laravel 13).
- **Work Factor**: Configured to 12 rounds (`BCRYPT_ROUNDS=12` in `.env.example`).
- **Implementation**: Handled transparently by Eloquent's `'password' => 'hashed'` model casting and `Hash::check()` verification in `AuthController::login`.
- **Verdict**: **PASS** - Industry standard password hashing resists GPU-accelerated hash cracking.

### 2.2 Brute-Force Defense
- **Previous State**: Endpoint was unthrottled, vulnerable to unlimited password guessing.
- **Current Hardened State**: Enforced via `throttle:5,1` middleware on `POST /api/login`.
- **Behavior**: If an IP submits more than 5 attempts in a 60-second window, the application returns HTTP 429 Too Many Requests with a `Retry-After: 60` header.
- **Frontend Integration**: `AdminLogin.jsx` inspects error status 429 and displays a user-friendly alert: *"Too many failed attempts. Please wait 1 minute before trying again."*
- **Verdict**: **PASS**

### 2.3 Token Security (Laravel Sanctum)
- **Token Engine**: Laravel Sanctum Personal Access Tokens.
- **Token Format**: High-entropy cryptographically secure random token string prefixed with Sanctum metadata.
- **Storage**: Plaintext tokens are returned once upon creation; SHA-256 hashes of tokens are stored in the `personal_access_tokens` table.
- **Expiration**: Configured in `config/sanctum.php` via `'expiration' => env('SANCTUM_EXPIRATION', 120)` (120 minutes). Expired tokens are rejected by `auth:sanctum`.
- **Revocation**: The `POST /api/logout` endpoint immediately deletes the active access token record from the database.
- **Verdict**: **PASS**

---

## 3. Authorization & Role-Based Access Control (RBAC)

### 3.1 Client-Side vs Server-Side Boundaries
- **Security Principle**: React's `ProtectedRoute` is a user-experience navigation guard, not a security boundary.
- **Server Enforcement**: All state-changing administrative operations are protected on the backend by:
  ```php
  Route::middleware(['auth:sanctum', 'admin'])->group(function () { ... });
  ```
- **Middleware Logic**: `EnsureUserIsAdmin` validates that the user instance retrieved by Sanctum satisfies `$user->isAdmin() === true`.

### 3.2 Role Provisioning, Mass-Assignment Immunity & Privilege Escalation Prevention
- **Database Schema**: The `users` table has an explicit boolean `is_admin` column defaulting to `false`.
- **Public Registration**: There is no public user registration endpoint. Accounts cannot be created arbitrarily.
- **Mass Assignment Immunity**: `is_admin` is strictly excluded from `#[Fillable]` on `User.php`. Any attempt to create or update users passing `['is_admin' => true]` via mass assignment is silently ignored by Eloquent, preventing privilege escalation.
- **Explicit Provisioning**: Administrator status can only be granted through trusted, explicit code logic: `$user->setAdmin(true)` or `$user->is_admin = true; $user->save();`.
- **Admin Seeder Environment Safety**: `AdminUserSeeder.php` explicitly sets `is_admin => true` for the configured administrative account, and aborts with a `RuntimeException` if executed in production with the fallback default password `'admin123'`.
- **Test User Isolation**: `DatabaseSeeder.php` creates test users only in `local` and `testing` environments, preventing test accounts from ever entering production databases.

---

## 4. Verification Test Matrix

| Test Case | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- |
| Login with non-existent email | HTTP 422 Validation Error | HTTP 422 | **PASS** |
| Login with valid email & wrong password | HTTP 422 Validation Error | HTTP 422 | **PASS** |
| Login with valid credentials (non-admin) | HTTP 403 Forbidden | HTTP 403 | **PASS** |
| Login with valid credentials (admin) | HTTP 200, Bearer token issued | HTTP 200 | **PASS** |
| 6 rapid failed logins | HTTP 429 Rate Limited | HTTP 429 | **PASS** |
| Unauthenticated request to `/api/me` | HTTP 401 Unauthorized | HTTP 401 | **PASS** |
| Admin request to `/api/me` | HTTP 200, sanitized profile | HTTP 200 | **PASS** |
| Logout with active token | HTTP 200, token removed from DB | HTTP 200 | **PASS** |
| Unauthenticated admin route access | HTTP 401 Unauthorized | HTTP 401 | **PASS** |
| Non-admin token accessing admin route | HTTP 403 Forbidden | HTTP 403 | **PASS** |
| Mass-assignment `User::create(['is_admin' => true])` | `is_admin` remains false in DB | `is_admin` is 0/false | **PASS** |
| Mass-assignment `$user->update(['is_admin' => true])` | `is_admin` remains false in DB | `is_admin` is 0/false | **PASS** |
| Explicit provisioning `$user->setAdmin(true)` | `is_admin` becomes true | `is_admin` is true | **PASS** |
| `DatabaseSeeder` in production environment | Skips test user creation | Test user not created | **PASS** |
| `AdminUserSeeder` with default password in production | Throws RuntimeException | Exception thrown & aborted | **PASS** |

