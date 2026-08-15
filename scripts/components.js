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
                <a href="https://facebook.com/p/Bright-Public-School-61556083547734" target="_blank" class="footer__social-link" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/bright__college/" target="_blank" class="footer__social-link" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                <a href="https://www.youtube.com/watch?v=qFYU1nmPurM" target="_blank" class="footer__social-link" aria-label="YouTube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
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
