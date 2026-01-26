const galleryContainer = document.getElementById('obrazy');
const allImages = document.querySelectorAll('#obrazy img');
const mainTitle = document.getElementById('gallery-main-title');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

let currentIndex = 0;

if (mainTitle) {
    mainTitle.innerHTML = "Moja Interaktywna <span style='color: #4facfe;'>Galeria</span>";
}

allImages.forEach((img) => {
    img.style.transition = "transform 0.3s ease";
    img.addEventListener('mouseenter', () => img.style.transform = "scale(1.03)");
    img.addEventListener('mouseleave', () => img.style.transform = "scale(1)");
});

function updateLightbox(index) {
    currentIndex = index;
    const img = allImages[currentIndex];
    
    if (lightboxImg && img) {
        lightboxImg.src = img.src;
        const parentFigure = img.closest('figure');
        lightboxCaption.textContent = parentFigure 
            ? parentFigure.querySelector('figcaption').textContent 
            : img.alt;
    }
}

galleryContainer.addEventListener('click', (e) => {
    const clickedImg = e.target.closest('img');
    if (!clickedImg || clickedImg.closest('video')) return;

    currentIndex = Array.from(allImages).indexOf(clickedImg);
    updateLightbox(currentIndex);
    lightbox.style.display = 'flex';
});

const nextImage = () => {
    currentIndex = (currentIndex + 1) % allImages.length;
    updateLightbox(currentIndex);
};

const prevImage = () => {
    currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    updateLightbox(currentIndex);
};

const closeLightbox = () => {
    lightbox.style.display = 'none';
};

document.getElementById('next').onclick = (e) => { 
    e.stopPropagation(); 
    nextImage(); 
};

document.getElementById('prev').onclick = (e) => { 
    e.stopPropagation(); 
    prevImage(); 
};

document.querySelector('.close-btn').onclick = (e) => { 
    e.preventDefault(); 
    closeLightbox(); 
};

lightbox.onclick = (e) => {
    if (e.target === lightbox) closeLightbox();
};

document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
    }
});