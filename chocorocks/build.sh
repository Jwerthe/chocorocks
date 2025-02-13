#!/bin/bash

echo "Building the project..."
python -m pip install -r requirements.txt

# Create necessary directories
mkdir -p staticfiles
mkdir -p mediafiles/products/images

# Debug: List zip contents
echo "Contents of media_backup.zip:"
unzip -l media_backup.zip

# Extract with full paths
unzip -o media_backup.zip -d mediafiles/

# Debug: List mediafiles contents
echo "Contents of mediafiles directory:"
ls -R mediafiles/

# Set permissions
chmod -R 755 mediafiles/
find mediafiles/ -type f -exec chmod 644 {} \;

# Make migrations
python manage.py makemigrations --noinput
python manage.py migrate --noinput

# Collect static files
python manage.py collectstatic --noinput --clear