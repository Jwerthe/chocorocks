document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    
    if (carousel) {
        // Clonar todos los productos
        const products = [...carousel.children];
        products.forEach(product => {
            const clone = product.cloneNode(true);
            carousel.appendChild(clone);
        });
 
        // Manejo de eventos hover para cada producto
        const productElements = carousel.querySelectorAll('.product');
        if (productElements.length > 0) {
            productElements.forEach(product => {
                if (product) { // Verificar que el producto existe
                    product.addEventListener('mouseenter', () => {
                        if (carousel) carousel.style.animationPlayState = 'paused';
                    });
                    
                    product.addEventListener('mouseleave', () => {
                        if (carousel) carousel.style.animationPlayState = 'running';
                    });
                }
            });
        }
 
        // Función para reiniciar el carrusel si algo sale mal
        function resetCarousel() {
            if (carousel) {
                carousel.style.animation = 'none';
                carousel.offsetHeight; // Forzar reflow
                carousel.style.animation = 'carousel 40s linear infinite';
            }
        }
 
        // Manejar casos donde la animación podría detenerse
        carousel.addEventListener('animationend', resetCarousel);
        
        // Asegurarse de que el carrusel sigue funcionando cuando la pestaña vuelve a estar activa
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                resetCarousel();
            }
        });
 
        // Reiniciar el carrusel si hay algún error
        window.addEventListener('error', (e) => {
            if (e.target === carousel) {
                resetCarousel();
            }
        });
 
        // Observar cambios en el DOM que puedan afectar al carrusel
        const observer = new MutationObserver(() => {
            resetCarousel();
        });
 
        observer.observe(carousel, {
            childList: true,
            subtree: true,
            attributes: true
        });
 
        // Reiniciar carrusel cuando la ventana cambie de tamaño
        window.addEventListener('resize', () => {
            resetCarousel();
        });
 
        // Iniciar la animación
        resetCarousel();
    }
 });