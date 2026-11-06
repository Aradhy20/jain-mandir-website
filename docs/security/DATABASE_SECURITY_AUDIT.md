# Database Security Audit

## 1. Overview
This assessment evaluates the database architecture, schema migrations, query security, mass assignment protection, and data privacy controls for the Jain Mandir / Jambudweep platform.

---

## 2. Database Environment & Engines
- **Development & Automated Testing**: SQLite 3 file-backed database (`database/database.sqlite`). Ignored by `.gitignore` to prevent committing live data or credentials.
- **Production Architecture**: Configurable via standard Laravel database drivers (`mysql`, `pgsql`).
- **Connection Security**: In production, TLS/SSL connection parameters (`DB_SSLMODE=require` for PostgreSQL, `MYSQL_ATTR_SSL_CA` for MySQL) must be enforced.

---

## 3. Schema & Migrations Review

| Table Name | Purpose | Sensitive Columns | Protection Mechanism |
| :--- | :--- | :--- | :--- |
| `users` | Administrator & user records | `password`, `remember_token` | Hashed via bcrypt, hidden via Eloquent `#[Hidden]` attribute |
| `personal_access_tokens` | Sanctum API session tokens | `token` | SHA-256 hashed before storage |
| `blogs` | Spiritual articles & announcements | None | Input sanitized, publication date scoped |
| `events` | Temple festival schedule & projects | None | Input sanitized |
| `gallery_items` | Campus & temple photography | None | Input sanitized |
| `news_items` | News press releases | None | Input sanitized |
| `contact_submissions` | Pilgrim inquiries & feedback | `name`, `email`, `message` | Stripped tags, bounded length, access restricted |
| `sessions` | Web sessions | `payload` | Handled by Laravel session guard |

---

## 4. Query Construction & SQL Injection (SQLi) Audit
- **ORM Audited**: Laravel Eloquent ORM.
- **Analysis**:
  - All database queries across `AuthController`, `BlogController`, `GalleryController`, `EventController`, `NewsController`, and `ContactController` utilize Eloquent query builder methods (`where`, `create`, `update`, `delete`, `orderBy`).
  - No raw SQL statements (`DB::raw()`, `whereRaw()`, `selectRaw()`) accepting unescaped user parameters exist in the codebase.
  - Parameter binding is automatically enforced by PDO prepared statements.
- **Verdict**: **PASS** - Immune to traditional SQL injection vectors.

---

## 5. Mass Assignment Protection
- **Vulnerability Context**: Mass assignment occurs when unvetted user input is passed directly to Eloquent models, allowing attackers to overwrite protected columns (e.g. `is_admin`, `id`).
- **Audit Findings**:
  - In `User.php`:
    ```php
    #[Fillable(['name', 'email', 'password'])]
    #[Hidden(['password', 'remember_token'])]
    ```
    The `User` model explicitly defines fillable attributes, **strictly excluding `is_admin`**. Administrator privileges can only be provisioned through explicit code logic (`$user->setAdmin(true)` or `$user->is_admin = true`). Mass assignment attempts to elevate `is_admin` are silently ignored.
  - In `Blog.php`, `Event.php`, `GalleryItem.php`, `NewsItem.php`, and `ContactSubmission.php`:
    All models declare explicit `$fillable` arrays.
  - In controllers:
    Only validated attributes (`$request->validate(...)`) are passed into `create()` and `update()`.
- **Verdict**: **PASS (Verified via TC-AUTHZ-006 and TC-AUTHZ-007)**

---

## 6. Sensitive Data Storage & Compliance
- **Payment Card Data**: No credit card numbers, CVVs, or bank credentials are stored. The website only presents static bank transfer information (account name, IFSC, branch) and UPI QR code guidelines for voluntary donations.
- **Personally Identifiable Information (PII)**: Contact submissions store pilgrim names and emails solely for response handling. Retention policies and periodic archiving are recommended before production launch.

