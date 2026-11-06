# Production Deployment Checklist & Staging Verification Gates

> [!IMPORTANT]
> **SAFETY GATE**: Do not deploy directly to production without completing verification on an authorized staging server. Never alter live DNS records, rotate production keys, or execute unverified production migrations.

---

## 1. Local Codebase Verification Gates (Completed)

- [x] **Branch Readiness**: All remediations verified on `security/prelaunch-hardening`.
- [x] **Backend Automated Tests**: 26 / 26 tests passed (80 assertions, 0 failures).
- [x] **Frontend Linter**: `npm run lint` passed with 0 errors.
- [x] **Frontend Build**: `npm run build` compiled without errors or warnings.
- [x] **Backend Dependencies**: `composer audit` reports 0 security advisories.
- [x] **Frontend Runtime Dependencies**: `npm audit --omit=dev` reports 0 vulnerabilities.
- [x] **Secrets Scan**: No `.env` files or hardcoded production passwords committed.
- [x] **Mass Assignment Defense**: `is_admin` strictly guarded from mass assignment.

---

## 2. Staging Infrastructure Verification (Pending Authorized Staging Host)

- [ ] **Hosting Provisioning**: Server instance provisioned with Linux, PHP 8.3/8.4, and web server.
- [ ] **Domain Mapping**: Verified actual staging domains for frontend and API backend.
- [ ] **Database Setup**: Dedicated staging database created; verified credentials.
- [ ] **SSL/TLS Certificates**: Valid staging TLS certificates installed and active.
- [ ] **Directory Permissions**: `storage/` and `bootstrap/cache/` set to `775` permissions under web server group.
- [ ] **CORS Verification**: `CORS_ALLOWED_ORIGINS` mapped to exact staging frontend origin.

---

## 3. Staging Deployment Execution Commands

```bash
# Step 1: Clone or fetch release branch
git checkout security/prelaunch-hardening

# Step 2: Install dependencies
npm ci
(cd backend && composer install --no-dev --optimize-autoloader --no-interaction)

# Step 3: Build frontend production bundle
npm run build

# Step 4: Run database migrations
(cd backend && php artisan migrate --force)

# Step 5: Optimize backend caches
(cd backend && php artisan config:cache)
(cd backend && php artisan route:cache)
(cd backend && php artisan view:cache)
```

---

## 4. Staging Smoke & Security Verification

- [ ] **Health Endpoint**: `GET /api/status` returns HTTP 200 with `status="healthy"`.
- [ ] **Defensive Headers**: `curl -I <API_URL>/api/status` confirms `X-Content-Type-Options: nosniff` and `X-Frame-Options: SAMEORIGIN`.
- [ ] **Brute Force Protection**: Submit 6 rapid login requests to verify HTTP 429 response on 6th attempt.
- [ ] **Admin Authentication**: Verify admin login issues token; confirm non-admin user cannot access `/admin`.
- [ ] **Logout Invalidation**: Confirm token is deleted from `personal_access_tokens` on logout.
- [ ] **Draft Isolation**: Verify draft blogs are excluded from public API responses.
- [ ] **Contact Form**: Test submission with valid and invalid inputs; confirm tags are stripped in database.

---

## 5. Rollback Procedure

If any staging or production check fails:

1. **Revert Git Commit**:
   ```bash
   git checkout <PREVIOUS_STABLE_COMMIT_HASH>
   ```

2. **Roll Back Database Migrations (if applicable)**:
   ```bash
   cd backend && php artisan migrate:rollback --step=1 --force
   ```

3. **Purge and Rebuild Caches**:
   ```bash
   npm run build
   cd backend
   php artisan optimize:clear
   php artisan config:cache
   php artisan route:cache
   ```
