from django.http import HttpResponse
from django.template import loader
from django.shortcuts import get_object_or_404, redirect, render
from .models import Product, Post, CartItem, Order, Comment
from products.forms import ProductForm, PostForm, CheckoutForm
from django.urls import reverse
from urllib.parse import quote
from django.http import JsonResponse
from django.contrib import messages

def product_list_api(request):
    products = Product.objects.all()
    products_data = [{
        'id': product.id,
        'name': product.name,
        'image': product.image.url if product.image else '',
        'description': product.description,
        'sizes': [{
            'id': size.id,
            'size': size.size,
            'price': str(size.price)
        } for size in product.sizes.all()]
    } for product in products]
    
    return JsonResponse(products_data, safe=False)

def index(request):
    products = Product.objects.all()
    posts = Post.objects.all()
    return render(request, 'index.html', {'products': products, 'posts':posts})

def about_us(request):
    posts = Post.objects.order_by('title')
    template = loader.get_template('about_us.html')
    return HttpResponse(template.render({'posts': posts}, request))

# def buy(request):
#     products = Product.objects.order_by('name')
#     template = loader.get_template('buy.html')
#     return HttpResponse(template.render({'products': products}, request))

def buy(request):
    products = Product.objects.all()
    return render(request, 'base.html', {'products': products})

#Products
# def product(request, product_id):
#     product = get_object_or_404(Product, pk = product_id)
#     template = loader.get_template('display_product.html')
#     context = {
#         'product': product
#     }
#     return HttpResponse(template.render(context, request))

def product(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    products = Product.objects.all().exclude(id=product_id) 
    
    context = {
        'product': product,
        'products': products  
    }
    return render(request, 'display_product.html', context)

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
    posts = Post.objects.all()
    comments = Comment.objects.all()
    return render(request, 'list_post.html', {
        'posts': posts,
        'comments': comments
    })
#Cart
def add_to_cart(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    quantity = int(request.POST.get('quantity', 1))
    
    cart = request.session.get('cart', {})
    
    # Si el producto ya está en el carrito, actualizar cantidad
    if str(product_id) in cart:
        cart[str(product_id)]['quantity'] += quantity
    else:
        cart[str(product_id)] = {
            'quantity': quantity,
            'name': product.name,
            'price': str(product.price)
        }
    
    request.session['cart'] = cart
    return redirect('products:cart')

def cart(request):
    cart = request.session.get('cart', {})
    cart_items = []
    total = 0
    
    for product_id, item in cart.items():
        subtotal = float(item['price']) * item['quantity']
        cart_items.append({
            'id': product_id,
            'name': item['name'],
            'quantity': item['quantity'],
            'price': item['price'],
            'subtotal': subtotal
        })
        total += subtotal
    
    return render(request, 'cart.html', {
        'cart_items': cart_items,
        'total': total
    })


#MSM
def checkout(request):
    cart = request.session.get('cart', {})
    if not cart:
        return redirect('products:cart')
        
    if request.method == 'POST':
        form = CheckoutForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            phone = form.cleaned_data['phone']
            email = form.cleaned_data['email']
            
            # Crear mensaje para WhatsApp
            cart_items = []
            total = 0
            
            for item in cart.values():
                subtotal = float(item['price']) * item['quantity']
                cart_items.append(f"{item['quantity']}x {item['name']} - ${subtotal}")
                total += subtotal
            
            items_text = '\n'.join(cart_items)
            message = f"""
Nuevo pedido de: {name}
Teléfono: {phone}
Email: {email}

Productos:
{items_text}

Total: ${total}
"""
            # Aquí reemplaza NUMERO_ADMIN con el número real
            whatsapp_url = f"https://wa.me/+593978757097?text={quote(message)}"
            
            # Limpiar carrito
            request.session['cart'] = {}
            
            return redirect(whatsapp_url)
    else:
        form = CheckoutForm()
    
    return render(request, 'cart.html', {'form': form})

#Comment
def add_comment(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        content = request.POST.get('content')
        
        comment = Comment.objects.create(
            name=name,
            content=content
        )
        
        messages.success(request, f'Comentario añadido. IMPORTANTE: Guarda este código si quieres editar tu comentario más tarde: {comment.edit_code}')
        return redirect('products:list_post')  # o la URL donde esté tu sección de comentarios

def edit_comment(request, comment_id):
    if request.method == 'POST':
        edit_code = request.POST.get('edit_code')
        new_content = request.POST.get('content')
        
        try:
            comment = Comment.objects.get(id=comment_id, edit_code=edit_code)
            comment.content = new_content
            comment.is_edited = True
            comment.save()
            messages.success(request, 'Comentario actualizado correctamente')
        except Comment.DoesNotExist:
            messages.error(request, 'Código de edición inválido')
            
        return redirect('products:list_post')