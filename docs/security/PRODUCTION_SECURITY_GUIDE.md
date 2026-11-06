# Production Security Hardening & Hosting Reference Guide

> [!WARNING]
> **DEPLOYMENT SAFETY & INFRASTRUCTURE BOUNDARIES**:
> The domains (`jambudweep.org`, `api.jambudweep.org`) and software stacks (PostgreSQL 15+, Nginx, PHP 8.4-FPM) referenced in this document are **architectural target recommendations**, not confirmed or pre-provisioned live infrastructure.
> 
> In accordance with safety rules:
> - Do not assume domains, DNS records, or hosting servers are configured.
> - Do not execute live production migrations without verified staging approval.
> - Do not rotate production credentials without explicit stakeholder authorization.
> - Do not deploy code or alter DNS settings.

---

## 1. Environment Configuration Reference (`backend/.env`)

Before deploying to the authorized production hosting environment, configure the server `.env` using environment-specific values:

```ini
APP_NAME="Jambudweep DJICR"
APP_ENV=production
APP_KEY=base64:GENERATE_FRESH_PRODUCTION_KEY_WITH_ARTISAN
APP_DEBUG=false
APP_URL=https://YOUR_API_DOMAIN_HERE

# Database Configuration (PostgreSQL / MySQL / SQLite)
# Configure based on actual provisioned hosting database:
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=jambudweep_prod
DB_USERNAME=jambudweep_app
DB_PASSWORD=YOUR_STRONG_RANDOM_PASSWORD_HERE
DB_SSLMODE=require

# CORS & Frontend Origins (Map to your actual frontend domain)
FRONTEND_URL=https://YOUR_FRONTEND_DOMAIN_HERE
CORS_ALLOWED_ORIGINS=https://YOUR_FRONTEND_DOMAIN_HERE

# Sanctum Token Lifetime (in minutes)
SANCTUM_EXPIRATION=120

# Session & Cache Drivers
SESSION_DRIVER=database
SESSION_ENCRYPT=true
SESSION_PATH=/
SESSION_DOMAIN=YOUR_DOMAIN_COOKIE_SCOPE_HERE
SESSION_SECURE_COOKIE=true
SESSION_HTTP_ONLY=true
SESSION_SAME_SITE=lax

# Logging
LOG_CHANNEL=stack
LOG_LEVEL=warning

# Admin Default Seed (Only used during initial seed)
ADMIN_DEFAULT_EMAIL=admin@YOUR_DOMAIN_HERE
ADMIN_DEFAULT_PASSWORD=YOUR_INITIAL_STRONG_RANDOM_PASSWORD
```

---

## 2. Web Server & Reverse Proxy Hardening (Reference Nginx Architecture)

When Nginx is used as the reverse proxy, apply the following hardening standards:

```nginx
# 1. Mandatory HTTP to HTTPS Redirection
server {
    listen 80;
    listen [::]:80;
    server_name YOUR_FRONTEND_DOMAIN YOUR_API_DOMAIN;
    return 301 https://$host$request_uri;
}

# 2. API Backend Host
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name YOUR_API_DOMAIN;

    ssl_certificate /path/to/fullchain.pem;
    ssl_certificate_key /path/to/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    root /path/to/project/backend/public;
    index index.php;

    client_max_body_size 10M;

    # Protective Security Headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/run/php/php8.4-fpm.sock; # Adjust to match installed PHP-FPM socket
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_hide_header X-Powered-By;
    }

    location ~ /\. {
        deny all;
    }
}

# 3. Frontend SPA Host
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name YOUR_FRONTEND_DOMAIN;

    ssl_certificate /path/to/fullchain.pem;
    ssl_certificate_key /path/to/privkey.pem;

    root /path/to/project/dist;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(?:css|js|woff2?|svg|png|jpg|webp)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

---

## 3. File System & Directory Permissions
Apply least privilege on the target server:

```bash
# Set ownership to deploy user and web server group
sudo chown -R deploy:www-data /path/to/project

# Standard files and directories
sudo find /path/to/project -type f -exec chmod 644 {} \;
sudo find /path/to/project -type d -exec chmod 755 {} \;

# Writable directories for Laravel backend
sudo chmod -R 775 /path/to/project/backend/storage
sudo chmod -R 775 /path/to/project/backend/bootstrap/cache
sudo chgrp -R www-data /path/to/project/backend/storage /path/to/project/backend/bootstrap/cache
```

---

## 4. Database Security Principles
1. Never connect with database administrative privileges (`root` / `postgres`).
2. Provision a dedicated application database user with restricted permissions on the application schema.
3. Bind database services to `127.0.0.1` or internal VPC networks, disallowing direct external public connections.
4. Schedule automated encrypted database snapshots.
