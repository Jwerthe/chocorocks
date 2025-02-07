from django.urls import path
from . import views

app_name = "products"

urlpatterns = [
    # APIs y endpoints del carrito
    path('api/products/', views.product_list_api, name='product_list_api'),
    path('api/product/<int:product_id>/sizes/', views.get_product_sizes, name='product_sizes'),
    path('api/cart/add/', views.add_to_cart, name='add_to_cart'),
    path('api/cart/get/', views.get_cart, name='get_cart'),
    path('api/cart/clear/', views.clear_cart, name='clear_cart'),
    path('api/cart/remove/', views.remove_from_cart, name='remove_from_cart'),
    
    # Páginas principales
    path('', views.index, name='index'),
    path('about_us/', views.about_us, name='about_us'),
    path('buy/', views.buy, name='buy'),
    path('cart/', views.cart, name='cart'),
    path('checkout/', views.checkout, name='checkout'),
    
    # Productos
    path('product/<int:product_id>/', views.product, name='product'),
    path('products/', views.list_product, name='list_product'),
    
    # Posts
    path('post/<int:post_id>/', views.post, name='post'),
    path('posts/', views.list_post, name='list_post'),
    
    # Comentarios
    path('comment/add/', views.add_comment, name='add_comment'),
    path('comment/<int:comment_id>/edit/', views.edit_comment, name='edit_comment'),
]