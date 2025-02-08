// Modal y carrito de compras
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar variables
    const modal = document.getElementById('buyModal');
    const buyButtons = document.querySelectorAll('#buyButton');
    const closeBtn = document.querySelector('.close-modal');
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    const selectedProductCard = document.getElementById('selectedProduct');
    const cartItems = {};
 
    // Manejar múltiples botones de compra
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            loadProducts();
        });
    });
 
    // Cerrar modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            selectedProductCard.style.display = 'none';
        });
    }
 
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            selectedProductCard.style.display = 'none';
        }
    });
 
    // Toggle dropdown
    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', () => {
            dropdownContent.classList.toggle('active');
        });
    }
 
    // Función para cargar productos desde la API
    async function loadProducts() {
        try {
            const response = await fetch('/api/products/');
            const products = await response.json();
            
            if (dropdownContent) {
                dropdownContent.innerHTML = products.map(product => `
                    <div class="dropdown-item"
                        data-product='${JSON.stringify(product)}'>
                        ${product.name}
                    </div>
                `).join('');
 
                setupProductListeners();
            }
            
            updateCartDisplay();
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }
 
    // Configurar listeners para productos
    function setupProductListeners() {
        const productItems = document.querySelectorAll('.dropdown-item');
        productItems.forEach(item => {
            item.addEventListener('click', function() {
                const product = JSON.parse(this.dataset.product);
                
                if (selectedProductCard) {
                    const productImg = selectedProductCard.querySelector('img');
                    const productTitle = selectedProductCard.querySelector('h3');
                    const sizeSelect = selectedProductCard.querySelector('.size-select');
                    
                    if (productImg) productImg.src = product.image;
                    if (productTitle) productTitle.textContent = product.name;
                    
                    // Actualizar selector de tamaños
                    if (sizeSelect) {
                        sizeSelect.innerHTML = `
                            <option value="">Seleccione un tamaño</option>
                            ${product.sizes.map(size => `
                                <option value="${size.id}" data-price="${size.price}">
                                    ${size.size} - $${size.price}
                                </option>
                            `).join('')}
                        `;
                    }
                    
                    selectedProductCard.style.display = 'block';
                    
                    const form = selectedProductCard.querySelector('form');
                    if (form) {
                        form.dataset.productId = product.id;
                    }
                }
    
                dropdownContent.classList.remove('active');
            });
        });
    }
 
    // Manejar formulario de agregar al carrito
    const addToCartForm = document.querySelector('.add-to-cart-form');
    if (addToCartForm) {
        addToCartForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const productId = this.dataset.productId;
            const sizeSelect = this.querySelector('.size-select');
            const sizeId = sizeSelect.value;
            const sizeOption = sizeSelect.querySelector(`option[value="${sizeId}"]`);
            const quantityInput = this.querySelector('[name="quantity"]');
            const productTitle = selectedProductCard.querySelector('h3');
            
            if (quantityInput && productId && productTitle && sizeOption) {
                const quantity = parseInt(quantityInput.value);
                const productName = productTitle.textContent;
                const price = parseFloat(sizeOption.dataset.price);
                const sizeName = sizeOption.textContent.split(' - ')[0];
 
                const cartKey = `${productId}-${sizeId}`;
 
                if (cartItems[cartKey]) {
                    cartItems[cartKey].quantity += quantity;
                } else {
                    cartItems[cartKey] = {
                        name: productName,
                        size: sizeName,
                        price: price,
                        quantity: quantity
                    };
                }
 
                updateCartDisplay();
                quantityInput.value = 1;
            }
        });
    }
 
    // Función para actualizar el carrito
    function updateCartDisplay() {
        const cartItemsDiv = document.getElementById('cartItems');
        const cartTotalDiv = document.getElementById('cartTotal');
        
        if (!cartItemsDiv || !cartTotalDiv) return;
 
        let total = 0;
        cartItemsDiv.innerHTML = '';
 
        Object.values(cartItems).forEach(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
 
            cartItemsDiv.innerHTML += `
                <div class="cart-item">
                    <h3>${item.name}</h3>
                    <p>Tamaño: ${item.size}</p>
                    <p>Cantidad: ${item.quantity}</p>
                    <p>Precio unitario: $${item.price}</p>
                    <p>Subtotal: $${subtotal.toFixed(2)}</p>
                </div>
            `;
        });
 
        if (Object.keys(cartItems).length > 0) {
            cartTotalDiv.innerHTML = `
                <div class="cart-total">
                    <h3>Total: $${total.toFixed(2)}</h3>
                    <button onclick="showCheckoutForm()" class="checkout-btn">Continuar con el pedido</button>
                </div>
            `;
        } else {
            cartTotalDiv.innerHTML = '<p>Tu carrito está vacío</p>';
        }
    }
 
    // Mostrar formulario de checkout
    window.showCheckoutForm = function() {
        const checkoutForm = document.getElementById('checkoutForm');
        if (checkoutForm) {
            checkoutForm.style.display = 'block';
        }
    }
 
    // Manejar envío del formulario de checkout
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
 
            let total = 0;
            const cartItemsList = Object.values(cartItems).map(item => {
                const subtotal = item.price * item.quantity;
                total += subtotal;
                return `${item.quantity}x ${item.name} (${item.size}) - $${subtotal.toFixed(2)}`;
            });
 
            const message = `
 Nuevo pedido de: ${name}
 Teléfono: ${phone}
 Email: ${email}
 
 Productos:
 ${cartItemsList.join('\n')}
 
 Total: $${total.toFixed(2)}
            `;
 
            const whatsappUrl = `https://wa.me/+593995888853?text=${encodeURIComponent(message)}`;
            
            // Limpiar carrito
            Object.keys(cartItems).forEach(key => delete cartItems[key]);
            updateCartDisplay();
            
            // Abrir WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Cerrar modal y limpiar formulario
            modal.style.display = 'none';
            orderForm.reset();
            document.getElementById('checkoutForm').style.display = 'none';
        });
    }
 });