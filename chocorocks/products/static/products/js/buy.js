document.addEventListener('DOMContentLoaded', function() {
    const productSelect = document.getElementById('productSelect');
    const sizeSelect = document.getElementById('sizeSelect');
    const quantityInput = document.getElementById('quantity');
    const addToCartBtn = document.getElementById('addToCart');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.querySelector('#cartTotal span');

    // Cargar tamaños cuando se selecciona un producto
    productSelect.addEventListener('change', async function() {
        const productId = this.value;
        if (!productId) {
            sizeSelect.innerHTML = '<option value="">Seleccionar tamaño</option>';
            return;
        }

        try {
            const response = await fetch(`/api/product/${productId}/sizes/`);
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            
            sizeSelect.innerHTML = '<option value="">Seleccionar tamaño</option>';
            data.sizes.forEach(size => {
                sizeSelect.innerHTML += `
                    <option value="${size.id}" data-price="${size.price}">
                        ${size.size} - $${size.price}
                    </option>
                `;
            });
        } catch (error) {
            console.error('Error loading sizes:', error);
            sizeSelect.innerHTML = '<option value="">Error cargando tamaños</option>';
        }
    });

    // Agregar al carrito
    addToCartBtn.addEventListener('click', async function() {
        const productId = productSelect.value;
        const sizeId = sizeSelect.value;
        const quantity = parseInt(quantityInput.value);

        if (!productId || !sizeId || quantity < 1) {
            alert('Por favor seleccione producto, tamaño y cantidad');
            return;
        }

        try {
            const response = await fetch('/api/cart/add/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCsrfToken()
                },
                body: JSON.stringify({
                    product_id: productId,
                    size_id: sizeId,
                    quantity: quantity
                })
            });

            if (response.ok) {
                updateCart();
                quantityInput.value = 1;
                sizeSelect.value = '';
                productSelect.value = '';
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    });

    // Actualizar carrito
    async function updateCart() {
        try {
            const response = await fetch('/api/cart/get/');
            if (!response.ok) throw new Error('Network response was not ok');
            
            const cartData = await response.json();
            
            cartItems.innerHTML = cartData.items.map(item => `
                <div class="cart-item" data-item-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>Tamaño: ${item.size}</p>
                        <p>Cantidad: ${item.quantity}</p>
                        <p>Precio: $${item.price}</p>
                        <p>Subtotal: $${item.subtotal}</p>
                    </div>
                    <button class="remove-item" onclick="removeFromCart('${item.id}')">×</button>
                </div>
            `).join('');

            cartTotal.textContent = cartData.total.toFixed(2);
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    }

    // Función para eliminar del carrito
    window.removeFromCart = async function(itemId) {
        try {
            const response = await fetch('/api/cart/remove/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCsrfToken()
                },
                body: JSON.stringify({
                    item_id: itemId
                })
            });

            if (response.ok) {
                updateCart();
            }
        } catch (error) {
            console.error('Error removing item:', error);
        }
    }

    function getCsrfToken() {
        return document.querySelector('[name=csrfmiddlewaretoken]').value;
    }

    // Cargar carrito inicial
    updateCart();

    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async function(e) {
            e.preventDefault();
    
            try {
                const cartResponse = await fetch('/api/cart/get/');
                const cartData = await cartResponse.json();
    
                const name = document.getElementById('name').value;
                const phone = document.getElementById('phone').value;
                const email = document.getElementById('email').value;
    
                let message = `*Nuevo pedido de:* ${name}\n`;
                message += `*Teléfono:* ${phone}\n`;
                message += `*Email:* ${email}\n\n`;
                message += '*Productos:*\n';
    
                cartData.items.forEach(item => {
                    message += `• ${item.quantity}x ${item.name} (${item.size}) - $${item.price} c/u\n`;
                    message += `  Subtotal: $${(item.quantity * parseFloat(item.price)).toFixed(2)}\n`;
                });
    
                message += `\n*Total:* $${cartData.total.toFixed(2)}`;
    
                // Limpiar carrito
                await fetch('/api/cart/clear/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCsrfToken()
                    }
                });
    
                const encodedMessage = encodeURIComponent(message);
                const phoneNumber = '593995888853';
    
                // Detectar el dispositivo
                const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                const isAndroid = /Android/.test(navigator.userAgent);
    
                let whatsappUrl;
                if (isIOS) {
                    // URL específica para iOS
                    whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
                } else if (isAndroid) {
                    // URL para Android
                    whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
                } else {
                    // URL para desktop
                    whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
                }
    
                // Usar window.location.href para iOS
                if (isIOS) {
                    window.location.href = whatsappUrl;
                } else {
                    // Para otros dispositivos usar window.open
                    window.open(whatsappUrl, '_blank');
                }
    
                // Limpiar formulario y actualizar carrito
                setTimeout(() => {
                    checkoutForm.reset();
                    updateCart();
                }, 1000);
    
            } catch (error) {
                console.error('Error processing checkout:', error);
                alert('Hubo un error al procesar el pedido. Por favor, intente nuevamente.');
            }
        });
    }

    const fallbackButton = document.getElementById('fallbackWhatsApp');
    if (fallbackButton) {
        fallbackButton.addEventListener('click', function(e) {
            e.preventDefault();
            const url = `https://wa.me/593995888853?text=${encodedMessage}`;
            window.open(url, '_blank');
        });
    }
});