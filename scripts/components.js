/* ==========================================================================
   Bright Public School (BPS)
   Shared Components
   Renders repeated site chrome from one JavaScript source.
   ========================================================================== */

window.bpsComponentPromises = window.bpsComponentPromises || [];

function getSiteRootPrefix() {
  return window.location.pathname.includes('/pages/') ? '../' : '';
}

function isLocalProjectPath(value) {
  return value &&
    !value.startsWith('#') &&
    !value.startsWith('../') &&
    !value.startsWith('/') &&
    !value.match(/^[a-z][a-z0-9+.-]*:/i);
}

function prefixComponentPaths(host, prefix) {
  if (!prefix) return;

  host.querySelectorAll('a[href], img[src]').forEach(function (el) {
    const attr = el.hasAttribute('href') ? 'href' : 'src';
    const value = el.getAttribute(attr);

    if (isLocalProjectPath(value)) {
      el.setAttribute(attr, prefix + value);
    }
  });
}

async function loadComponentMarkup(host, url, fallbackMarkup) {
  const rootPrefix = getSiteRootPrefix();
  host.innerHTML = fallbackMarkup;
  prefixComponentPaths(host, rootPrefix);

  try {
    const response = await fetch(rootPrefix + url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    host.innerHTML = await response.text();
    prefixComponentPaths(host, rootPrefix);
  } catch (error) {
    console.warn(`BPS: Using fallback markup for ${url}.`, error);
  }
}

class BpsNavbar extends HTMLElement {
  connectedCallback() {
    const fallbackMarkup = `
      <header class="navbar" id="navbar">
        <div class="container navbar__inner">
          <a href="index.html" class="navbar__brand">
            <img src="assets/logo/logo.png" alt="Bright Public School" class="navbar__logo">
            <div class="navbar__brand-text">
              <span class="navbar__school-name">Bright Public School</span>
              <span class="navbar__tagline">Ignite. Innovate. Inspire.</span>
            </div>
          </a>

          <nav class="navbar__nav">
            <ul class="navbar__links">
              <li><a href="index.html" class="navbar__link">Home</a></li>
              <li class="navbar__dropdown">
                <a href="pages/about.html" class="navbar__link">About <span class="dropdown-arrow">▾</span></a>
                <ul class="navbar__submenu">
                  <li><a href="pages/about.html#vision">Vision &amp; Mission</a></li>
                  <li><a href="pages/about.html#principal">Principal's Message</a></li>
                  <li><a href="pages/about.html#values">Core Values</a></li>
                  <li><a href="pages/about.html#facilities">Facilities</a></li>
                </ul>
              </li>
              <li class="navbar__dropdown">
                <a href="pages/academics.html" class="navbar__link">Academics <span class="dropdown-arrow">▾</span></a>
                <ul class="navbar__submenu">
                  <li><a href="pages/academics.html#programs">Programs</a></li>
                  <li><a href="pages/academics.html#curriculum">Curriculum</a></li>
                  <li><a href="pages/academics.html#plus2">+2 Science &amp; Management</a></li>
                </ul>
              </li>
              <li><a href="pages/faculty.html" class="navbar__link">Faculty</a></li>
              <li><a href="pages/gallery.html" class="navbar__link">Gallery</a></li>
              <li><a href="pages/news.html" class="navbar__link">News</a></li>
              <li><a href="pages/contact.html" class="navbar__link">Contact</a></li>
            </ul>
          </nav>

          <div class="navbar__actions">
            <a href="pages/admissions.html" class="btn btn-primary navbar__cta">Apply Now</a>
            <button class="navbar__hamburger" id="hamburger" aria-label="Toggle menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>

        <div class="navbar__mobile" id="mobileMenu">
          <ul class="navbar__mobile-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="pages/about.html">About</a></li>
            <li><a href="pages/academics.html">Academics</a></li>
            <li><a href="pages/faculty.html">Faculty</a></li>
            <li><a href="pages/gallery.html">Gallery</a></li>
            <li><a href="pages/news.html">News</a></li>
            <li><a href="pages/contact.html">Contact</a></li>
            <li><a href="pages/admissions.html" class="mobile-cta">Apply Now</a></li>
          </ul>
        </div>
      </header>
    `;

    window.bpsComponentPromises.push(
      loadComponentMarkup(this, 'components/navbar.html', fallbackMarkup)
    );
  }
}

class BpsFooter extends HTMLElement {
  connectedCallback() {
    const fallbackMarkup = `
      <footer class="footer">
        <div class="footer__top">
          <div class="container footer__grid">
            <div class="footer__brand">
              <img src="assets/logo/logo.png" alt="BPS Logo" class="footer__logo">
              <p class="footer__about">
                Bright Public School is committed to nurturing innovative,
                confident learners from Play Group through +2 level in Birgunj,
                Nepal.
              </p>
              <div class="footer__social">
                <a href="https://facebook.com/p/Bright-Public-School-61556083547734" target="_blank" rel="noopener noreferrer" class="footer__social-link footer__social-link--facebook" aria-label="Facebook">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="6" fill="#1877F2"/>
                    <path d="M15.5 12H13.2V20H10V12H8.5V9.3H10V7.5C10 5.8 11 4.5 13.2 4.5C14.1 4.5 14.9 4.6 15.3 4.7V7.1H14.1C13.2 7.1 13 7.6 13 8.3V9.3H15.6L15.5 12Z" fill="white"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/bright__college/" target="_blank" rel="noopener noreferrer" class="footer__social-link footer__social-link--instagram" aria-label="Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <defs>
                      <linearGradient id="bps-ig-grad-fallback" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#FFDC80"/>
                        <stop offset="25%" stop-color="#F77737"/>
                        <stop offset="50%" stop-color="#F56040"/>
                        <stop offset="75%" stop-color="#FD1D1D"/>
                        <stop offset="100%" stop-color="#833AB4"/>
                      </linearGradient>
                    </defs>
                    <rect width="24" height="24" rx="6" fill="url(#bps-ig-grad-fallback)"/>
                    <path d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 15.2C10.23 15.2 8.8 13.77 8.8 12C8.8 10.23 10.23 8.8 12 8.8C13.77 8.8 15.2 10.23 15.2 12C15.2 13.77 13.77 15.2 12 15.2Z" fill="white"/>
                    <circle cx="16.5" cy="7.5" r="1.1" fill="white"/>
                    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="white" stroke-width="1.6" fill="none"/>
                  </svg>
                </a>
                <a href="https://www.youtube.com/watch?v=qFYU1nmPurM" target="_blank" rel="noopener noreferrer" class="footer__social-link footer__social-link--youtube" aria-label="YouTube">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="6" fill="#FF0000"/>
                    <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="white"/>
                  </svg>
                </a>
              </div>
            </div>

            <div class="footer__col">
              <h4 class="footer__heading">Quick Links</h4>
              <ul class="footer__links">
                <li><a href="index.html">Home</a></li>
                <li><a href="pages/about.html">About Us</a></li>
                <li><a href="pages/academics.html">Academics</a></li>
                <li><a href="pages/faculty.html">Our Faculty</a></li>
                <li><a href="pages/gallery.html">Gallery</a></li>
                <li><a href="pages/news.html">News &amp; Events</a></li>
                <li><a href="pages/admissions.html">Admissions</a></li>
                <li><a href="pages/contact.html">Contact</a></li>
              </ul>
            </div>

            <div class="footer__col">
              <h4 class="footer__heading">Programs</h4>
              <ul class="footer__links">
                <li><a href="pages/academics.html#programs">Play Group &amp; Nursery</a></li>
                <li><a href="pages/academics.html#programs">Kindergarten</a></li>
                <li><a href="pages/academics.html#programs">Primary Level</a></li>
                <li><a href="pages/academics.html#programs">Lower Secondary</a></li>
                <li><a href="pages/academics.html#programs">Secondary Level</a></li>
                <li><a href="pages/academics.html#plus2">+2 Science</a></li>
                <li><a href="pages/academics.html#plus2">+2 Management</a></li>
              </ul>
            </div>

            <div class="footer__col">
              <h4 class="footer__heading">Contact Us</h4>
              <ul class="footer__contact">
                <li>
                  <span class="footer__contact-icon">📍</span>
                  <span>Ghantaghar-9, Birgunj, Parsa,<br>Madhesh Province, Nepal</span>
                </li>
                <li>
                  <span class="footer__contact-icon">📩</span>
                  <a href="mailto:brighteducation2080@gmail.com">brighteducation2080@gmail.com</a>
                </li>
                <li>
                  <span class="footer__contact-icon">📞</span>
                  <div>
                    <a href="tel:051528008">051-528008</a><br>
                    <a href="tel:9802593401">9802593401</a><br>
                    <a href="tel:9802593403">9802593403</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="footer__bottom">
          <div class="container footer__bottom-inner">
            <p class="footer__copy">&copy; 2025 Bright Public School, Birgunj. All rights reserved.</p>
            <p class="footer__motto font-mono">Ignite. Innovate. Inspire.</p>
          </div>
        </div>
      </footer>

      <nav class="mobile-bottom-nav" aria-label="Mobile quick navigation">
        <a href="index.html" class="mobile-bottom-nav__link">
          <span class="mobile-bottom-nav__icon">⌂</span>
          <span>Home</span>
        </a>
        <a href="pages/about.html#facilities" class="mobile-bottom-nav__link">
          <span class="mobile-bottom-nav__icon">⌬</span>
          <span>Facilities</span>
        </a>
        <a href="pages/faculty.html" class="mobile-bottom-nav__link">
          <span class="mobile-bottom-nav__icon">♙</span>
          <span>Faculty</span>
        </a>
        <a href="pages/admissions.html" class="mobile-bottom-nav__link">
          <span class="mobile-bottom-nav__icon">☰</span>
          <span>Apply</span>
        </a>
      </nav>
    `;

    window.bpsComponentPromises.push(
      loadComponentMarkup(this, 'components/footer.html', fallbackMarkup)
    );
  }
}

customElements.define('bps-navbar', BpsNavbar);
customElements.define('bps-footer', BpsFooter);
