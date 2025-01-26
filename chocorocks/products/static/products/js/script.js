const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

const productWidth = 308; // Ancho fijo de los productos
const productMargin = 16; // Margen entre productos (basado en tu CSS margin-right: 1em)
const totalProductWidth = productWidth + productMargin;

let currentIndex = 0;
const totalProducts = carousel.children.length;

nextBtn.addEventListener('click', () => {
    // Verificar si hay más productos para mostrar
    if (currentIndex < totalProducts - 3) { // Mostramos 3 productos a la vez
        currentIndex++;
        const translateAmount = currentIndex * totalProductWidth;
        carousel.style.transform = `translateX(-${translateAmount}px)`;
    }
});

prevBtn.addEventListener('click', () => {
    // Verificar si podemos retroceder
    if (currentIndex > 0) {
        currentIndex--;
        const translateAmount = currentIndex * totalProductWidth;
        carousel.style.transform = `translateX(-${translateAmount}px)`;
    }
});

// Modal y carrito de compras
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar variables
    const modal = document.getElementById('buyModal');
    const buyButton = document.getElementById('buyButton');
    const closeBtn = document.querySelector('.close-modal');
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    const selectedProductCard = document.getElementById('selectedProduct');
    const cartItems = {};
 
    // Verificar y añadir event listener para abrir modal
    if (buyButton && modal) {
        buyButton.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            loadProducts();
        });
    }
 
    // Verificar y añadir event listeners para cerrar modal
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => modal.style.display = 'none');
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }
 
    // Verificar y añadir event listener para dropdown
    if (dropdownBtn && dropdownContent) {
        dropdownBtn.addEventListener('click', () => {
            dropdownContent.classList.toggle('active');
        });
    }
 
    // Manejar selección de productos
    const productItems = document.querySelectorAll('.dropdown-item');
    if (productItems.length > 0 && selectedProductCard) {
        productItems.forEach(item => {
            item.addEventListener('click', function() {
                const productId = this.dataset.productId;
                const productName = this.dataset.productName;
                const productPrice = this.dataset.productPrice;
                const productImage = this.dataset.productImage;
 
                const productImg = selectedProductCard.querySelector('img');
                const productTitle = selectedProductCard.querySelector('h3');
                
                if (productImg && productImage) {
                    productImg.src = productImage;
                }
                
                if (productTitle) {
                    productTitle.textContent = productName;
                }
                
                selectedProductCard.style.display = 'block';
                
                if (dropdownContent) {
                    dropdownContent.classList.remove('active');
                }
 
                const form = selectedProductCard.querySelector('form');
                if (form) {
                    form.dataset.productId = productId;
                    form.dataset.productPrice = productPrice;
                }
            });
        });
    }
 
    // Manejar formulario de agregar al carrito
    const addToCartForm = document.querySelector('.add-to-cart-form');
    if (addToCartForm && selectedProductCard) {
        addToCartForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const productId = this.dataset.productId;
            const quantityInput = this.querySelector('[name="quantity"]');
            const productTitle = selectedProductCard.querySelector('h3');
            
            if (quantityInput && productId && productTitle) {
                const quantity = parseInt(quantityInput.value);
                const productName = productTitle.textContent;
                const productPrice = parseFloat(this.dataset.productPrice);
 
                if (cartItems[productId]) {
                    cartItems[productId].quantity += quantity;
                } else {
                    cartItems[productId] = {
                        name: productName,
                        price: productPrice,
                        quantity: quantity
                    };
                }
 
                updateCartDisplay();
                
                // Resetear cantidad
                quantityInput.value = 1;
            }
        });
    }
 
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
                    <p>Cantidad: ${item.quantity}</p>
                    <p>Precio unitario: $${item.price}</p>
                    <p>Subtotal: $${subtotal.toFixed(2)}</p>
                </div>
            `;
        });
 
        // Solo mostrar el botón de checkout si hay items en el carrito
        if (Object.keys(cartItems).length > 0) {
            cartTotalDiv.innerHTML = `
                <div class="cart-total">
                    <h3>Total: $${total.toFixed(2)}</h3>
                    <a href="/checkout" class="checkout-btn">Continuar con el pedido</a>
                </div>
            `;
        } else {
            cartTotalDiv.innerHTML = '<p>Tu carrito está vacío</p>';
        }
    }
 
    // Función para cargar productos si es necesario
    function loadProducts() {
        // Aquí puedes añadir lógica para cargar productos dinámicamente si lo necesitas
        updateCartDisplay(); // Actualizar la visualización del carrito al abrir el modal
    }
 });