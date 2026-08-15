/* ==========================================================================
   Bright Public School (BPS)
   Hero Slider Controller (slider.js)
   Manages: Homepage hero image slider with auto-play and dot navigation.
   ========================================================================== */

function initSlider() {
  const slider = $('.hero-slider');
  if (!slider) return;

  const slides = $$('.hero-slider .slide', slider);
  const dots = $$('.slider-dots .dot', slider);
  let currentSlide = 0;
  let autoPlayTimer = null;
  const INTERVAL = 5000; // 5 seconds

  if (slides.length === 0) return;

  function goToSlide(index) {
    // Remove active from all
    slides.forEach(function (s) { s.classList.remove('active'); });
    dots.forEach(function (d) { d.classList.remove('active'); });

    // Set new active
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(nextSlide, INTERVAL);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  // Dot click navigation
  dots.forEach(function (dot, index) {
    dot.addEventListener('click', function () {
      goToSlide(index);
      startAutoPlay(); // Reset timer on manual navigation
    });
  });

  // Pause on hover
  slider.addEventListener('mouseenter', stopAutoPlay);
  slider.addEventListener('mouseleave', startAutoPlay);

  // Start auto-play
  startAutoPlay();
}
