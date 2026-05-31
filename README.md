# Wah Cantt Coaster Tour Website

A premium web application for coaster rental and tourism booking in Wah Cantt, Pakistan. Designed with a dark blue theme, white text, emerald green highlights, glassmorphic card overlays, and fluid transitions, backed by a robust Django and MySQL database system.

---

## 🛠️ Tech Stack
* **Frontend**: HTML5, Vanilla CSS3 (custom styling system with HSL colors and glassmorphism), Vanilla Javascript ES6
* **Backend**: Django 6.0.5 + Python 3.14
* **Database**: MySQL (via `mysqlclient`)

---

## 🚀 Quick Start & Setup

### Docker (recommended for deploy)

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
2. Copy `.env.example` to `.env` and set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and DB passwords.
3. **Double-click `DOCKER_RUN.bat`** or run:

```bash
docker compose up --build
```

Open: [http://localhost:8000/](http://localhost:8000/)

Full VPS/production steps: **[DEPLOY.md](DEPLOY.md)**

---

### Easiest way without Docker (Windows)

**Double-click `RUN.bat`** in the project folder — local MySQL + Django dev server.

Open: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

---

Follow these steps to run the application manually on your machine.

### Step 1: Configure Environment Variables
Open the `.env` file in the root directory (`wah-tour-project/.env`) and update the MySQL configurations to match your local setup:
```env
DB_NAME=wah_tour_db
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=127.0.0.1
DB_PORT=3306
```

### Step 2: Initialize the MySQL Database

**Option A — Import complete SQL (fastest)**  
Import the ready-made database from `database/wah_tour_db_complete.sql` (see `database/README.md`).

**Option B — Django setup**  
Run the helper setup script in the project root. This connects to your MySQL server and automatically executes `CREATE DATABASE IF NOT EXISTS`:
```bash
py setup_db.py
```

### Step 3: Run Django Database Migrations
Create all the necessary tables (Users, Bookings, Tours, Notifications) in your MySQL database (skip if you used Option A in Step 2):
```bash
cd backend
py manage.py migrate
```

### Step 4: Seed Default Tours
Populate the database with the five beautiful locations shown in the designs (Wah Gardens, Taxila Museum, Khanpur Dam, Sher Shah Park, Mall of Wah) (skip if you used Option A in Step 2):
```bash
py manage.py seed_tours
```

### Step 5: Start the Development Server
Run Django's built-in development server:
```bash
py manage.py runserver
```
Open your browser and navigate to: **[http://127.0.0.1:8000/](http://127.0.0.1:8000/)**

---

## � Setup Admin Account

To create your admin account, set the following environment variables in `.env`:

```env
ADMIN_EMAIL=your-admin@example.com
ADMIN_PASSWORD=your-strong-password
```

Then run:
```bash
py manage.py seed_tours
```

This will create your admin account with the credentials from `.env`.
