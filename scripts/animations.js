/* ==========================================================================
   Bright Public School (BPS)
   Scroll Reveal Animations (animations.js)
   Manages: IntersectionObserver-based scroll reveal for .reveal elements.
   ========================================================================== */

function initScrollReveal() {
  const revealElements = $$('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (revealElements.length === 0) return;

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(function (el) {
    observer.observe(el);
  });
}
