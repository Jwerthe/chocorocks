# chocorocks.ec
# Elimina el zip anterior si existe
Remove-Item media_backup.zip -ErrorAction SilentlyContinue

# Crea el nuevo zip manteniendo la estructura de directorios
cd media
Compress-Archive -Path products -DestinationPath ../media_backup.zip
cd ..

# En settings.py 
MEDIA_ROOT = os.path.join(BASE_DIR, 'mediafiles')  -> media para develop