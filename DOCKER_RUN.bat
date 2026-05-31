@echo off
title Wah Tour - Docker
cd /d "%~dp0"

if not exist ".env" (
  echo Creating .env from .env.example...
  copy /Y ".env.example" ".env"
  echo.
  echo Edit .env with your ADMIN_EMAIL and passwords, then run this again.
  pause
  exit /b 1
)

echo Starting Docker Compose (build + run)...
echo Open http://localhost:8000 when ready.
echo.
docker compose up --build
