/* ==========================================================================
   Bright Public School (BPS)
   Lazy Load (lazyload.js)
   Manages: Lazy loading of images and iframes using IntersectionObserver.
   ========================================================================== */

function initLazyLoad() {
  const lazyElements = $$('img[data-src], iframe[data-src]');
  if (lazyElements.length === 0) return;

  // Use native lazy loading if supported and no data-src overrides
  if ('loading' in HTMLImageElement.prototype) {
    lazyElements.forEach(function (el) {
      el.src = el.getAttribute('data-src');
      el.removeAttribute('data-src');
      if (el.dataset.srcset) {
        el.srcset = el.dataset.srcset;
        el.removeAttribute('data-srcset');
      }
    });
    return;
  }

  // Fallback: IntersectionObserver
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.src = el.getAttribute('data-src');
        el.removeAttribute('data-src');

        if (el.dataset.srcset) {
          el.srcset = el.dataset.srcset;
          el.removeAttribute('data-srcset');
        }

        el.addEventListener('load', function () {
          el.classList.add('loaded');
        });

        observer.unobserve(el);
      }
    });
  }, {
    rootMargin: '200px 0px' // Start loading 200px before entering viewport
  });

  lazyElements.forEach(function (el) {
    observer.observe(el);
  });
}
