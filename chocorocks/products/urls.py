from django.urls import path
from . import views

app_name = "products"
urlpatterns = [
    path("", views.index, name="index"),

    path("about_us", views.about_us, name="about_us"),
    
    path("product/<int:product_id>/", views.product, name="product"),
    path("product/", views.list_product, name="list_product"),
]