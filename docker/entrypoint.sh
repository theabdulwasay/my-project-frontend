#!/bin/sh
set -e

cd /app/backend

echo "Waiting for MySQL..."
python /app/docker/wait_for_db.py

echo "Running migrations..."
python manage.py migrate --noinput

if [ "${SEED_ON_START:-true}" = "true" ]; then
  echo "Seeding tours and admin (idempotent)..."
  python manage.py seed_tours || true
fi

echo "Collecting static files..."
python manage.py collectstatic --noinput
mkdir -p /app/backend/staticfiles/images
ln -sfn /app/frontend/images/tours /app/backend/staticfiles/images/tours

echo "Starting Gunicorn on port 8000..."
exec gunicorn backend.wsgi:application \
  --bind 0.0.0.0:8000 \
  --workers "${GUNICORN_WORKERS:-3}" \
  --timeout 120 \
  --access-logfile - \
  --error-logfile -
