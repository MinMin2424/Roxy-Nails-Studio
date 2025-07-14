document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.category-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category to show
            const category = this.getAttribute('data-category');
            
            // Hide all gallery items
            document.querySelectorAll('.gallery-item').forEach(item => {
                item.style.display = 'none';
            });
            
            // Show items of selected category
            document.querySelectorAll(`.gallery-item.${category}`).forEach(item => {
                item.style.display = 'block';
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Category filtering code remains the same
    
    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.close-lightbox');
    const prevArrow = document.getElementById('prev-arrow');
    const nextArrow = document.getElementById('next-arrow');
    
    let currentImages = [];
    let currentIndex = 0;
    
    // Get all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Add click event to each gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const category = this.classList.contains('nails') ? 'nails' : 
                            this.classList.contains('eyelashes') ? 'eyelashes' : 'makeup';
            
            // Get all visible images of the same category
            currentImages = Array.from(document.querySelectorAll(`.gallery-item.${category}`))
                .filter(img => img.style.display !== 'none');
            
            // Find the index of the clicked image
            currentIndex = currentImages.findIndex(img => img === this);
            
            // Show the clicked image in lightbox
            lightboxImg.src = this.querySelector('img').src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close lightbox
    closeBtn.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Click on overlay to close
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Navigation arrows
    prevArrow.addEventListener('click', function(e) {
        e.stopPropagation();
        navigate(-1);
    });
    
    nextArrow.addEventListener('click', function(e) {
        e.stopPropagation();
        navigate(1);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowLeft') {
            navigate(-1);
        } else if (e.key === 'ArrowRight') {
            navigate(1);
        }
    });
    
    function navigate(direction) {
        currentIndex += direction;
        
        // Wrap around
        if (currentIndex < 0) {
            currentIndex = currentImages.length - 1;
        } else if (currentIndex >= currentImages.length) {
            currentIndex = 0;
        }
        
        // Update image
        lightboxImg.src = currentImages[currentIndex].querySelector('img').src;
        
        // Add slight fade effect
        lightboxImg.style.opacity = 0;
        setTimeout(() => {
            lightboxImg.style.opacity = 1;
        }, 100);
    }
});