from django.contrib import admin
from .models import Product, Post, ProductSize, Comment

class ProductSizeInline(admin.TabularInline):
    model = Product.sizes.through
    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductSizeInline]
    exclude = ('sizes',)

@admin.register(ProductSize)
class ProductSizeAdmin(admin.ModelAdmin):
    list_display = ['size', 'price']

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    pass

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'is_edited')
    list_filter = ('created_at', 'is_edited')
    search_fields = ('name', 'content')