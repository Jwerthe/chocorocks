document.addEventListener('DOMContentLoaded', function() {
    const options = {
        root: null, // usar el viewport
        threshold: 0.1, // cuando al menos 10% del elemento es visible
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Opcional: dejar de observar después de la animación
                // observer.unobserve(entry.target);
            } else {
                // Comentar la siguiente línea si quieres que la animación
                // solo ocurra una vez
                entry.target.classList.remove('is-visible');
            }
        });
    }, options);

    // Observar todos los elementos con la clase fade-in
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
    });
});