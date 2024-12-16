from django.http import HttpResponse
from django.template import loader
from django.shortcuts import get_object_or_404, redirect, render
from .models import Product
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
from products.forms import ProductForm

def index(request):
    products = Product.objects.all()
    return render(request, 'index.html', {'products': products})

def about_us(request):
    return render(request, 'about_us.html')

#Products

def product(request, product_id):
    product = get_object_or_404(Product, pk = product_id)
    template = loader.get_template('display_product.html')
    context = {
        'product': product
    }
    return HttpResponse(template.render(context, request))

def list_product(request):
    products = Product.objects.order_by('name')
    template = loader.get_template('list_product.html')
    return HttpResponse(template.render({'products': products}, request))



