document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item.nails');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let itemsToShow = 6;
    let currentIndex = 0;

    function showItems() {
        for (let i = currentIndex; i < currentIndex + itemsToShow && i < galleryItems.length; i++) {
            galleryItems[i].style.display = 'block';
        }
        currentIndex += itemsToShow;
        if (currentIndex >= galleryItems.length) {
            loadMoreBtn.style.display = 'none';
        }
    }

    showItems();

    loadMoreBtn.addEventListener('click', showItems);
})