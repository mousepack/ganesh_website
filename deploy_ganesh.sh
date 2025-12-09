#!/bin/bash

echo "=== DEPLOYMENT START: GANESH WEBSITE ==="

cd /var/www/gannay/ganesh || { echo "Directory not found"; exit 1; }

echo "--- Pulling latest code from main branch ---"
git pull origin main

echo "--- Activating virtual environment ---"
source venv/bin/activate

echo "--- Installing dependencies ---"
pip install -r requirements.txt

echo "--- Applying migrations ---"
python3 manage.py migrate

echo "--- Collecting static files ---"
python3 manage.py collectstatic --noinput

echo "--- Restarting Gunicorn ---"
systemctl restart gunicorn_ganesh

echo "--- Reloading Nginx ---"
systemctl reload nginx

echo "--- Gunicorn Status ---"
systemctl status gunorn_ganesh --no-pager

echo "=== DEPLOYMENT COMPLETE: GANESH WEBSITE ==="
