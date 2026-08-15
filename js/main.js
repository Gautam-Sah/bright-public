/* ==========================================================================
   Bright Public School (BPS)
   Main Application Entry (main.js)
   Initializes all modules after DOM is ready.

   Script loading order in HTML:
   1. utils.js       — shared helpers ($, $$, on, debounce, throttle, etc.)
   2. navbar.js      — sticky nav & mobile menu
   3. slider.js      — homepage hero slider
   4. gallery.js     — gallery lightbox & show more
   5. counter.js     — animated statistics
   6. animations.js  — scroll reveal (IntersectionObserver)
   7. lazyload.js    — lazy loading images & iframes
   8. main.js        — this file (initializer)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  // Core — always initialize
  if (typeof initNavbar === 'function')       initNavbar();
  if (typeof initScrollReveal === 'function') initScrollReveal();
  if (typeof initLazyLoad === 'function')     initLazyLoad();

  // Page-specific — initialize only if the relevant elements exist
  if (typeof initSlider === 'function')       initSlider();
  if (typeof initGallery === 'function')      initGallery();
  if (typeof initCounters === 'function')     initCounters();

  console.log('BPS: All modules initialized.');
});
