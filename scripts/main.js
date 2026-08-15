/* ==========================================================================
   Bright Public School (BPS)
   Main Application Entry (main.js)
   Initializes all modules after DOM is ready.

   Script loading order in HTML:
   1. components.js  — shared navbar/footer components
   2. utils.js       — shared helpers ($, $$, on, debounce, throttle, etc.)
   3. navbar.js      — sticky nav & mobile menu
   4. slider.js      — homepage hero slider
   5. gallery.js     — gallery lightbox & show more
   6. counter.js     — animated statistics
   7. animations.js  — scroll reveal (IntersectionObserver)
   8. lazyload.js    — lazy loading images & iframes
   9. main.js        — this file (initializer)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', async function () {
  if (Array.isArray(window.bpsComponentPromises)) {
    await Promise.allSettled(window.bpsComponentPromises);
  }

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
