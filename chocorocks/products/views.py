from django.http import HttpResponse
from django.template import loader
from django.shortcuts import get_object_or_404, redirect, render
from .models import Product, Post
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
from products.forms import ProductForm, PostForm

def index(request):
    products = Product.objects.all()
    posts = Post.objects.all()
    return render(request, 'index.html', {'products': products, 'posts':posts})

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

#Posts
def post(request, post_id):
    post = get_object_or_404(Post, pk = post_id)
    template = loader.get_template('display_post.html')
    context = {
        'post': post
    }
    return HttpResponse(template.render(context, request))

def list_post(request):
    posts = Post.objects.order_by('title')
    template = loader.get_template('list_post.html')
    return HttpResponse(template.render({'posts': posts}, request))
