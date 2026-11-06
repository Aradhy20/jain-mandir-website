# Application Threat Model: Jain Mandir / Jambudweep Platform

## 1. Threat Modeling Methodology
This threat model employs the **STRIDE** methodology (developed by Microsoft) to evaluate threat actors, attack vectors, data flows, and trust boundaries across the Jain Mandir / Jambudweep system.

```
       [ Internet / Unauthenticated Public ]
                         |
           (Trust Boundary 1: TLS / HTTPS)
                         v
       [ Web Browser / React SPA Client ]
                         |
           (Trust Boundary 2: CORS / Sanctum Auth / Throttle)
                         v
       [ Backend API Services (Laravel 13) ]
                         |
           (Trust Boundary 3: Eloquent ORM / SQL Prepared Statements)
                         v
       [ Relational Database Storage ]
```

---

## 2. Threat Actor Profiles

| Threat Actor | Motivation | Capability | Primary Vectors |
| :--- | :--- | :--- | :--- |
| **External Script Kiddie / Bot** | Vandalism, site defacement, automated scanning | Low to Medium | Credential stuffing on `/api/login`, form spam on `/api/contact`, known CVE scans |
| **Spammer / Denial of Service Actor** | Resource exhaustion, service disruption | Low to Medium | High-volume submission of large payloads, HTTP request floods |
| **Rogue / Low-Privileged User** | Unauthorized content tampering, privilege escalation | Medium | Attempting to invoke administrative CRUD endpoints without admin role |
| **Network Eavesdropper / MitM** | Intercepting credentials or sensitive session tokens | Medium | Public Wi-Fi sniffing (mitigated by mandatory HTTPS and secure headers) |

---

## 3. STRIDE Threat Analysis

### 3.1 Spoofing (Identity Deception)
- **Threat**: Attacker guesses or brute forces admin credentials to pose as the site administrator.
- **Risk Level**: **HIGH**
- **Mitigation Implemented**:
  - `throttle:5,1` rate limiting prevents rapid dictionary attacks.
  - Mandatory bcrypt password hashing (12 rounds).
  - Explicit `is_admin === true` verification required for token issuance.

### 3.2 Tampering (Data Modification)
- **Threat**: Attacker modifies sacred temple event announcements, blog teachings, or replaces gallery imagery with inappropriate media.
- **Risk Level**: **CRITICAL**
- **Mitigation Implemented**:
  - `EnsureUserIsAdmin` middleware guards all write, update, and delete actions on `/api/blogs`, `/api/gallery`, `/api/events`, and `/api/news`.
  - React ProtectedRoute prevents UI access; backend middleware blocks API tampering.
  - Input sanitization strips injected HTML tags.

### 3.3 Repudiation (Denial of Action)
- **Threat**: Administrator denies making an unauthorized change or deleting a sacred event record.
- **Risk Level**: **LOW**
- **Mitigation Implemented**:
  - Laravel logging records API access and error exceptions.
  - Production recommendation: Retain audit trails for content deletions with author attribution.

### 3.4 Information Disclosure (Data Leakage)
- **Threat**: Attacker accesses draft/embargoed articles, internal user table details, or database server configurations.
- **Risk Level**: **HIGH**
- **Mitigation Implemented**:
  - Public blog queries are scoped to published records only (`published_at <= now()`).
  - `AuthController` returns an explicit whitelist of user fields (`id`, `name`, `email`, `is_admin`), concealing `password` and `remember_token`.
  - `status()` endpoint does not leak connection parameters or internal infrastructure names.
  - Production configuration mandates `APP_DEBUG=false`.

### 3.5 Denial of Service (Resource Exhaustion)
- **Threat**: Attacker floods contact form with huge payloads or spams requests to exhaust server CPU and database storage.
- **Risk Level**: **MEDIUM**
- **Mitigation Implemented**:
  - `throttle:3,1` on `POST /api/contact`.
  - Max string bounds enforced (`max:5000` on message, `max:100` on name).

### 3.6 Elevation of Privilege (Privilege Escalation)
- **Threat**: Standard user token gains access to admin operations, or an attacker exploits mass assignment (`is_admin=1`) to grant themselves administrator privileges.
- **Risk Level**: **HIGH**
- **Mitigation Implemented**:
  - Database schema enforces `is_admin` boolean (default false).
  - `is_admin` is strictly excluded from `#[Fillable]` on `User.php`; Eloquent ignores injected `is_admin` flags.
  - Administrator privileges can only be provisioned through explicit trusted logic (`$user->setAdmin(true)`).
  - Backend verifies `$user->isAdmin()` on every sensitive endpoint via `EnsureUserIsAdmin`.
  - Token is generated with explicit `['admin']` ability.

