@echo off
rem ------------------------------------------------------------
rem Wah Cantt Coaster Tour - Backend Automation Script
rem ------------------------------------------------------------

rem Ensure we are in the project directory
cd /d "%~dp0"

rem Activate virtual environment if it exists
if exist venv\Scripts\activate.bat (
    call venv\Scripts\activate.bat
) else (
    echo No virtual environment found. Skipping activation.
)

rem Install required Python packages
echo Installing dependencies...
pip install -r requirements.txt

rem Apply database migrations
echo Applying migrations...
py manage.py makemigrations
py manage.py migrate

rem Collect static files
echo Collecting static files...
py manage.py collectstatic --noinput

rem Create a superuser if not exists (optional). Uncomment and set below if needed.
rem echo Creating superuser...
rem py manage.py createsuperuser

rem Run the development server
echo Starting Django development server...
py manage.py runserver

pause
