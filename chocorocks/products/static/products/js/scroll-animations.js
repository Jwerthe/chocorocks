document.addEventListener('DOMContentLoaded', function() {
    const options = {
        root: null,
        threshold: 0.2, // Aumentado de 0.1 a 0.2
        rootMargin: '0px'
    };

    let animationFrame;
    let lastScrollTime = Date.now();
    const scrollThreshold = 50; // ms entre cada actualización

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Cancelar cualquier frame de animación pendiente
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }

            // Usar requestAnimationFrame para suavizar las actualizaciones
            animationFrame = requestAnimationFrame(() => {
                const currentTime = Date.now();
                if (currentTime - lastScrollTime > scrollThreshold) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    } else {
                        // Solo remover la clase si el elemento está completamente fuera de vista
                        if (entry.intersectionRatio < 0.1) {
                            entry.target.classList.remove('is-visible');
                        }
                    }
                    lastScrollTime = currentTime;
                }
            });
        });
    }, options);

    // Observar todos los elementos con las clases de animación
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
    });

    // Limpiar al desmontar
    return () => {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        observer.disconnect();
    };
});


// document.addEventListener('DOMContentLoaded', function() {
//     const options = {
//         root: null,
//         threshold: 0.2, // Aumentado de 0.1 a 0.2
//         rootMargin: '0px'
//     };

//     let animationFrame;
//     let lastScrollTime = Date.now();
//     const scrollThreshold = 50; // ms entre cada actualización

//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             // Cancelar cualquier frame de animación pendiente
//             if (animationFrame) {
//                 cancelAnimationFrame(animationFrame);
//             }

//             // Usar requestAnimationFrame para suavizar las actualizaciones
//             animationFrame = requestAnimationFrame(() => {
//                 const currentTime = Date.now();
//                 if (currentTime - lastScrollTime > scrollThreshold) {
//                     if (entry.isIntersecting) {
//                         entry.target.classList.add('is-visible');
//                     } else {
//                         // Solo remover la clase si el elemento está completamente fuera de vista
//                         if (entry.intersectionRatio < 0.1) {
//                             entry.target.classList.remove('is-visible');
//                         }
//                     }
//                     lastScrollTime = currentTime;
//                 }
//             });
//         });
//     }, options);

//     // Observar todos los elementos con las clases de animación
//     document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
//         observer.observe(el);
//     });

//     // Limpiar al desmontar
//     return () => {
//         if (animationFrame) {
//             cancelAnimationFrame(animationFrame);
//         }
//         observer.disconnect();
//     };
// });

