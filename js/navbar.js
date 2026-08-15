/* ==========================================================================
   Bright Public School (BPS)
   Navbar Controller (navbar.js)
   Manages: Sticky navigation, scroll state, and mobile menu toggle.
   ========================================================================== */

function initNavbar() {
  const navbar = $('#navbar');
  const hamburger = $('#hamburger');
  const mobileMenu = $('#mobileMenu');

  if (!navbar) return;

  // --- Scroll state ---
  const handleScroll = throttle(function () {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, 100);

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Set initial state

  // --- Mobile menu toggle ---
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    $$('.navbar__mobile-links a', mobileMenu).forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', function (e) {
      if (mobileMenu.classList.contains('open') &&
          !mobileMenu.contains(e.target) &&
          !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // --- Active link highlight ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  $$('.navbar__link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  $$('.mobile-bottom-nav__link').forEach(function (link) {
    const href = link.getAttribute('href') || '';
    const linkPage = href.split('#')[0];
    link.classList.toggle('active', linkPage === currentPage);
  });
}
