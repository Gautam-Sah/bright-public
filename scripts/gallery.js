/* ==========================================================================
   Bright Public School (BPS)
   Gallery Controller (gallery.js)
   Manages: Gallery grid, lightbox, category filters, and View More toggle.
   ========================================================================== */

function initGallery() {
  const galleryGrid = $('#gallery-grid');
  if (!galleryGrid) return;

  initViewMoreToggle(galleryGrid);
  initCategoryFilters(galleryGrid);
  initLightbox(galleryGrid);
}

/**
 * View More / Show Less toggle for hidden gallery items
 */
function initViewMoreToggle(grid) {
  const btn = $('#show-more-btn');
  if (!btn) return;

  const hiddenItems = $$('.hidden-gallery-item', grid);
  let expanded = false;

  btn.addEventListener('click', function () {
    expanded = !expanded;

    hiddenItems.forEach(function (item) {
      // If a category filter is active, respect it
      const activeFilter = $('.filter-btn.active');
      const category = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
      const itemCategory = item.getAttribute('data-category');

      if (expanded) {
        if (category === 'all' || itemCategory === category) {
          item.style.display = 'block';
        }
      } else {
        item.style.display = 'none';
      }
    });

    btn.textContent = expanded ? 'Show Less' : 'View More';
  });
}

/**
 * Category filtering for the gallery
 */
function initCategoryFilters(grid) {
  const filterBtns = $$('.filter-btn');
  const galleryItems = $$('.gallery-item', grid);
  const showMoreBtn = $('#show-more-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      // Toggle active class on buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        const isHiddenDefault = item.classList.contains('hidden-gallery-item');
        
        // Check if "Show More" is expanded
        const isExpanded = showMoreBtn ? showMoreBtn.textContent === 'Show Less' : true;

        if (filterValue === 'all') {
          if (isHiddenDefault && !isExpanded) {
            item.style.display = 'none';
          } else {
            item.style.display = 'block';
          }
        } else if (category === filterValue) {
          if (isHiddenDefault && !isExpanded) {
            item.style.display = 'none';
          } else {
            item.style.display = 'block';
          }
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Lightbox for gallery image viewing
 */
function initLightbox(grid) {
  // Create lightbox element if not already present
  let lightbox = $('.lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox__backdrop"></div>
      <div class="lightbox__content">
        <button class="lightbox__close" aria-label="Close lightbox">&times;</button>
        <button class="lightbox__prev" aria-label="Previous image">&#8249;</button>
        <img class="lightbox__img" src="" alt="Gallery image">
        <button class="lightbox__next" aria-label="Next image">&#8250;</button>
      </div>
    `;
    document.body.appendChild(lightbox);
  }

  const lightboxImg = $('.lightbox__img', lightbox);
  let visibleImages = [];
  let currentIndex = 0;

  function updateVisibleImages() {
    // Select all images inside currently visible gallery items
    const visibleItems = Array.from($$('.gallery-item', grid)).filter(item => {
      return window.getComputedStyle(item).display !== 'none';
    });
    visibleImages = visibleItems.map(item => $('img', item)).filter(img => img !== null);
  }

  function openLightbox(imgElement) {
    updateVisibleImages();
    currentIndex = visibleImages.indexOf(imgElement);
    if (currentIndex === -1) currentIndex = 0;

    lightboxImg.src = imgElement.src;
    lightboxImg.alt = imgElement.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function nextImage() {
    if (visibleImages.length === 0) return;
    currentIndex = (currentIndex + 1) % visibleImages.length;
    lightboxImg.src = visibleImages[currentIndex].src;
    lightboxImg.alt = visibleImages[currentIndex].alt;
  }

  function prevImage() {
    if (visibleImages.length === 0) return;
    currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
    lightboxImg.src = visibleImages[currentIndex].src;
    lightboxImg.alt = visibleImages[currentIndex].alt;
  }

  // Click on gallery items inside grid
  grid.addEventListener('click', function (e) {
    const clickedImg = e.target.closest('.gallery-item img');
    if (clickedImg) {
      openLightbox(clickedImg);
    }
  });

  // Controls
  on($('.lightbox__close', lightbox), 'click', closeLightbox);
  on($('.lightbox__backdrop', lightbox), 'click', closeLightbox);
  on($('.lightbox__next', lightbox), 'click', nextImage);
  on($('.lightbox__prev', lightbox), 'click', prevImage);

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
}
