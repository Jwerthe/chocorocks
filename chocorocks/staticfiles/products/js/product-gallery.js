document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.querySelector('.main-image img');
    const additionalImages = document.querySelectorAll('.additional-image img');

    additionalImages.forEach(img => {
        img.addEventListener('click', function() {
            // Guardar la imagen principal actual
            const tempSrc = mainImage.src;
            const tempAlt = mainImage.alt;
            
            // Actualizar la imagen principal con la imagen clickeada
            mainImage.src = this.src;
            mainImage.alt = this.alt;
            
            // Actualizar la imagen clickeada con la imagen principal anterior
            this.src = tempSrc;
            this.alt = tempAlt;

            // Añadir una pequeña animación
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 50);
        });
    });
});