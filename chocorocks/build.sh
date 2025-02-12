# #!/bin/bash
# #!/bin/bash
# echo "Building the project..."
# python -m pip install -r requirements.txt

# # Create necessary directories
# mkdir -p staticfiles
# mkdir -p mediafiles

# # Copy media files
# cp -r media/* mediafiles/ || true

# # Make migrations
# python manage.py makemigrations --noinput
# python manage.py migrate --noinput

# # Collect static files
# python manage.py collectstatic --noinput --clear

#!/bin/bash
echo "Building the project..."
python -m pip install -r requirements.txt

echo "Making migrations..."
python manage.py makemigrations --noinput
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --no-input --clear

echo "Creating media directory..."
mkdir -p mediafiles
cp -r media/* mediafiles/ || true