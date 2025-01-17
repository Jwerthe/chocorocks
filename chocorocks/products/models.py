from django.db import models
from django.core.validators import MinValueValidator

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    complete_description = models.TextField(null=True, blank=True)  
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0.00)]
    )
    image = models.ImageField(upload_to='products/images', blank=True, null=True)
    PRODUCT_AVAILABLE = (  
        ('Available', 'Disponible'),
        ('Not Available', 'No Disponible'),
        ('Soon', 'Proximamente'),
    )
    available = models.CharField(max_length=20, choices=PRODUCT_AVAILABLE, null=False)

    def __str__(self):
        return self.name

class Post(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='products/images', blank=True, null=True)
    description = models.TextField()

    def __str__(self):
        return self.title

