/* ==========================================================================
   Bright Public School (BPS)
   Hero Slider Controller (slider.js)
   Manages: Homepage hero image slider with auto-play, navigation arrows,
   dot indicators, touch swipe, drag, and keyboard navigation.
   ========================================================================== */

function initSlider() {
  const slider = $('.hero-slider');
  if (!slider) return;

  const slides = $$('.hero-slider .slide', slider);
  const dots = $$('.slider-dots .dot', slider);
  const prevBtn = $('#sliderPrevBtn', slider) || $('.slider-arrow--prev', slider);
  const nextBtn = $('#sliderNextBtn', slider) || $('.slider-arrow--next', slider);
  
  let currentSlide = 0;
  let autoPlayTimer = null;
  let isHovered = false;
  const INTERVAL = 5000; // 5 seconds

  if (slides.length === 0) return;

  function updateAria() {
    dots.forEach(function (dot, idx) {
      if (idx === currentSlide) {
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.removeAttribute('aria-current');
      }
    });
  }

  function goToSlide(index) {
    // Wrap around bounds
    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }

    // Remove active from all slides and dots
    slides.forEach(function (s) { s.classList.remove('active'); });
    dots.forEach(function (d) { d.classList.remove('active'); });

    // Activate new slide and dot
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    updateAria();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    if (!isHovered) {
      autoPlayTimer = setInterval(nextSlide, INTERVAL);
    }
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  function handleUserInteraction(callback) {
    if (typeof callback === 'function') callback();
    stopAutoPlay();
    startAutoPlay();
  }

  // --- Dot click navigation ---
  dots.forEach(function (dot, index) {
    dot.addEventListener('click', function (e) {
      e.stopPropagation();
      handleUserInteraction(function () {
        goToSlide(index);
      });
    });
  });

  // --- Arrow button navigation ---
  if (prevBtn) {
    prevBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      handleUserInteraction(prevSlide);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      handleUserInteraction(nextSlide);
    });
  }

  // --- Keyboard navigation (ArrowLeft & ArrowRight) ---
  slider.setAttribute('tabindex', '0');
  slider.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleUserInteraction(prevSlide);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleUserInteraction(nextSlide);
    }
  });

  // --- Touch Swipe Support (Mobile & Tablet) ---
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  const SWIPE_MIN_DISTANCE = 40;

  slider.addEventListener('touchstart', function (e) {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchEndX = touchStartX;
      touchEndY = touchStartY;
    }
  }, { passive: true });

  slider.addEventListener('touchmove', function (e) {
    if (e.touches.length === 1) {
      touchEndX = e.touches[0].clientX;
      touchEndY = e.touches[0].clientY;
    }
  }, { passive: true });

  slider.addEventListener('touchend', function () {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Horizontal swipe threshold check
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) >= SWIPE_MIN_DISTANCE) {
      if (diffX < 0) {
        // Swiped Left -> Next Slide
        handleUserInteraction(nextSlide);
      } else {
        // Swiped Right -> Previous Slide
        handleUserInteraction(prevSlide);
      }
    }
  }, { passive: true });

  // --- Mouse Drag Support (Desktop) ---
  let isMouseDown = false;
  let mouseStartX = 0;
  let mouseEndX = 0;
  const DRAG_MIN_DISTANCE = 50;

  slider.addEventListener('mousedown', function (e) {
    // Avoid triggering drag on buttons/links
    if (e.target.closest('button, a, input, select, textarea')) return;
    isMouseDown = true;
    mouseStartX = e.clientX;
    mouseEndX = e.clientX;
  });

  window.addEventListener('mousemove', function (e) {
    if (!isMouseDown) return;
    mouseEndX = e.clientX;
  });

  window.addEventListener('mouseup', function () {
    if (!isMouseDown) return;
    isMouseDown = false;
    const diffX = mouseEndX - mouseStartX;
    if (Math.abs(diffX) >= DRAG_MIN_DISTANCE) {
      if (diffX < 0) {
        handleUserInteraction(nextSlide);
      } else {
        handleUserInteraction(prevSlide);
      }
    }
  });

  // --- Hover and Focus Pause / Resume ---
  slider.addEventListener('mouseenter', function () {
    isHovered = true;
    stopAutoPlay();
  });

  slider.addEventListener('mouseleave', function () {
    isHovered = false;
    startAutoPlay();
  });

  slider.addEventListener('focusin', function () {
    stopAutoPlay();
  });

  slider.addEventListener('focusout', function (e) {
    if (!slider.contains(e.relatedTarget)) {
      startAutoPlay();
    }
  });

  // Initialize ARIA state & start autoplay
  updateAria();
  startAutoPlay();
}
