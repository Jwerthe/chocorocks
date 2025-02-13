#!/bin/bash

echo "Building the project..."
python -m pip install -r requirements.txt

# Create necessary directories
echo "Creating directories..."
mkdir -p staticfiles
mkdir -p mediafiles/products/images

# Debug: List zip contents
echo "Contents of media_backup.zip:"
unzip -l media_backup.zip

# Extract media files with path conversion
echo "Extracting media files..."
unzip -o media_backup.zip -d mediafiles/
find mediafiles -type f -name "*.jpg" -exec sh -c '
    newname=$(echo "$1" | tr " " "_")
    [ "$1" != "$newname" ] && mv "$1" "$newname"
' sh {} \;

# Debug: Show mediafiles contents
echo "Contents of mediafiles directory after unzip:"
ls -R mediafiles/

# Set permissions
echo "Setting permissions..."
chmod -R 755 mediafiles/
find mediafiles/ -type f -exec chmod 644 {} \;

# Make migrations
python manage.py makemigrations --noinput
python manage.py migrate --noinput

# Collect static files
python manage.py collectstatic --noinput --clear