from django.contrib import admin
from .models import Product, Post

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    pass

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    pass