from django.urls import path
from . import views

app_name = "products"
urlpatterns = [
    path("", views.index, name="index"),

    path("about_us", views.about_us, name="about_us"),

    path("buy/", views.buy, name="buy"),
    
    path("product/<int:product_id>/", views.product, name="product"),
    path("product/", views.list_product, name="list_product"),

    path("post/<int:post_id>/", views.post, name="post"),
    path("post/", views.list_post, name="list_post"),

    path('add-to-cart/<int:product_id>/', views.add_to_cart, name='add_to_cart'),
    path('cart/', views.cart, name='cart'),
    path('checkout/', views.checkout, name='checkout'),

    path('api/products/', views.product_list_api, name='product_list_api'),
]