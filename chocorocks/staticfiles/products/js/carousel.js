document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    
    if (!carousel) return;

    // Duplicar los productos para crear el efecto infinito
    const productos = [...carousel.children];
    
    // Duplicar todos los productos al final
    productos.forEach(producto => {
        const clon = producto.cloneNode(true);
        carousel.appendChild(clon);
    });

    // Configurar la animación inicial
    function iniciarCarousel() {
        const anchoPrimerSet = carousel.scrollWidth / 2;
        const duracionAnimacion = anchoPrimerSet * 0.02; // Ajusta este valor para cambiar la velocidad

        carousel.style.setProperty('--carousel-width', `-${anchoPrimerSet}px`);
        carousel.style.setProperty('--animation-duration', `${duracionAnimacion}s`);
        carousel.classList.add('animando');
    }

    // Esperar a que las imágenes se carguen antes de iniciar
    window.addEventListener('load', iniciarCarousel);

    // Manejar hover
    carousel.addEventListener('mouseenter', () => {
        carousel.style.animationPlayState = 'paused';
    });

    carousel.addEventListener('mouseleave', () => {
        carousel.style.animationPlayState = 'running';
    });

    // Reiniciar la animación cuando termina
    carousel.addEventListener('animationend', () => {
        carousel.classList.remove('animando');
        carousel.offsetWidth; // Forzar reflow
        carousel.classList.add('animando');
    });

    // Manejar cambios de visibilidad
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            carousel.classList.remove('animando');
            carousel.offsetWidth; // Forzar reflow
            carousel.classList.add('animando');
        }
    });
});