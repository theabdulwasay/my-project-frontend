@echo off
title Wah Cantt Coaster Tour
cd /d "%~dp0"

echo ============================================
echo   Wah Cantt Coaster Tour - Starting...
echo ============================================
echo.

echo [1/3] MySQL database check...
py setup_db.py
if errorlevel 1 (
    echo ERROR: MySQL connect nahi hua. MySQL server ON karein aur .env check karein.
    pause
    exit /b 1
)

echo.
echo [2/3] Database tables update...
cd backend
py manage.py migrate
if errorlevel 1 (
    echo ERROR: migrate fail.
    cd ..
    pause
    exit /b 1
)

echo.
echo [3/3] Server start...
echo.
echo   Website:  http://127.0.0.1:8000/
echo   Check .env for ADMIN_EMAIL and ADMIN_PASSWORD
echo.
echo   Band karne ke liye: Ctrl+C
echo ============================================
echo.

py manage.py runserver

cd ..
pause
