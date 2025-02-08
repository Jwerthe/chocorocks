#!/bin/bash
echo "Building the project..."
python -m pip install -r requirements.txt

echo "Making migrations..."
python manage.py makemigrations --noinput
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput --clear

echo "Creating media directory..."
mkdir -p mediafiles
cp -r media/* mediafiles/ || true