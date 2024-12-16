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

