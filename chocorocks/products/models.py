from django.db import models
from django.core.validators import MinValueValidator

class ProductSize(models.Model):
    size = models.CharField(max_length=50)  
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0.00)]
    )

    def __str__(self):
        return f"{self.size}gr - ${self.price}"

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    complete_description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='products/images', blank=True, null=True)
    sizes = models.ManyToManyField(ProductSize)
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

class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    size = models.ForeignKey(ProductSize, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    date_added = models.DateTimeField(auto_now_add=True)

    @property
    def total_price(self):
        return self.size.price * self.quantity

class Order(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    items = models.ManyToManyField(CartItem)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    date_created = models.DateTimeField(auto_now_add=True)