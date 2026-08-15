/* ==========================================================================
   Bright Public School (BPS)
   Counter Animation (counter.js)
   Manages: Animated number counting for statistics sections.
   ========================================================================== */

function initCounters() {
  const counters = $$('[data-counter]');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(function (counter) {
    observer.observe(counter);
  });
}

/**
 * Animate a single counter element from 0 to its target value
 * @param {Element} el - Element with data-counter attribute
 */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-counter'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2000; // 2 seconds
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);

    el.textContent = current.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
