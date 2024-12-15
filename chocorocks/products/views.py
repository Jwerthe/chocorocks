from django.http import HttpResponse
from django.template import loader
from django.shortcuts import get_object_or_404, redirect, render
from .models import Product
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
from products.forms import ProductForm

def index(request):
    return render(request, 'index.html')

def about_us(request):
    return render(request, 'about_us.html')





