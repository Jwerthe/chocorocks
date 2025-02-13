#!/bin/bash

echo "Building the project..."
python -m pip install -r requirements.txt

# Create necessary directories
mkdir -p staticfiles
mkdir -p mediafiles

# Unzip media backup if it exists
unzip -o media_backup.zip -d mediafiles/

# Make migrations
python manage.py makemigrations --noinput
python manage.py migrate --noinput

# Collect static files
python manage.py collectstatic --noinput --clear