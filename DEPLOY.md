# Deploy Wah Cantt Coaster Tour (Docker)

This guide covers running the app with **Docker Compose** on your PC and deploying to a **VPS** (DigitalOcean, Hetzner, AWS EC2, etc.) with HTTPS.

---

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows/Mac) or Docker Engine + Compose (Linux)
- Copy environment file: `copy .env.example .env` (Windows) or `cp .env.example .env` (Linux/Mac)

Edit `.env`:

| Variable | Docker value |
|----------|----------------|
| `DB_HOST` | `db` (compose overrides this for the web container) |
| `DB_USER` / `DB_PASSWORD` / `DB_NAME` | Must match `docker-compose.yml` defaults or your custom values |
| `SECRET_KEY` | Long random string (required for production) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Owner admin account |
| `ALLOWED_HOSTS` | `localhost,127.0.0.1` locally; your domain in production |
| `DEBUG` | `True` locally; `False` on a public server |

**Do not commit `.env`** — it contains secrets.

---

## Run locally (Docker)

From the project root (`wah-tour-project`):

```bash
docker compose up --build
```

Open **http://localhost:8000**

- MySQL is exposed on host port **3307** (optional, for debugging).
- First start runs migrations and `seed_tours` (which creates default tours only).

Stop:

```bash
docker compose down
```

Remove database volume (fresh DB):

```bash
docker compose down -v
```

---

## Production on a VPS

### 1. Server setup

- Ubuntu 22.04+ (or similar)
- Install Docker: https://docs.docker.com/engine/install/
- Clone/upload this project to e.g. `/opt/wah-tour-project`

### 2. Configure `.env` for production

```env
DEBUG=False
SECRET_KEY=<generate-a-50+-char-random-string>
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
CSRF_TRUSTED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
SECURE_PROXY_SSL=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True

DB_NAME=wah_tour_db
DB_USER=wah_user
DB_PASSWORD=<strong-db-password>
MYSQL_ROOT_PASSWORD=<strong-root-password>
ADMIN_EMAIL=you@yourdomain.com
ADMIN_PASSWORD=<strong-admin-password>

SEED_ON_START=false
```

Set strong passwords for `DB_PASSWORD`, `MYSQL_ROOT_PASSWORD`, and `ADMIN_PASSWORD`.

### 3. Start with production overrides

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

The app listens on **127.0.0.1:8000** only (not public). Put a reverse proxy in front for HTTPS.

### 4. HTTPS with Caddy (recommended)

Install Caddy on the host, then use `docker/Caddyfile.example` as a starting point:

```bash
sudo apt install -y caddy
# Edit site name and paths, then:
sudo caddy validate --config /path/to/Caddyfile
sudo systemctl reload caddy
```

Point DNS **A record** for `yourdomain.com` to the server IP.

### 5. Updates

```bash
cd /opt/wah-tour-project
git pull   # or upload new files
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

---

## Useful commands

| Task | Command |
|------|---------|
| View logs | `docker compose logs -f web` |
| Django shell | `docker compose exec web python manage.py shell` |
| Re-seed tours | `docker compose exec web python manage.py seed_tours` |
| Create superuser | `docker compose exec web python manage.py createsuperuser` |
| Backup MySQL | `docker compose exec db mysqldump -u wah_user -p wah_tour_db > backup.sql` |

---

## Cloud platforms (Railway, Render, Fly.io)

These need:

1. A **managed MySQL** add-on (or external DB).
2. Set all `.env` variables in the platform dashboard.
3. Build from the **Dockerfile**; start command is already in the image entrypoint.
4. Set `DB_HOST` to the provider’s MySQL hostname (not `db`).
5. `ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS` to your app URL.

You may use only the `web` service from compose and connect to external MySQL instead of the bundled `db` service.

---

## Windows shortcut

Double-click **`DOCKER_RUN.bat`** (if present) or run:

```bat
docker compose up --build
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `Can't connect to MySQL` | Wait for `db` healthcheck; check `DB_*` in `.env` matches compose |
| Static/CSS missing | Rebuild: `docker compose up --build`; check web logs for `collectstatic` |
| CSRF error on login | Add your URL to `CSRF_TRUSTED_ORIGINS` with `https://` |
| Old `.env` has `DB_HOST=127.0.0.1` | Compose sets `DB_HOST=db` for `web`; ensure `.env` DB user/password match MySQL service |
