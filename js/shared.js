// ValCrown shared.js v7 — auth-aware nav, working translator, mobile hamburger
'use strict';
const API = 'https://api.valcrown.com';

function renderNav(activePage) {
  if (document.querySelector('.nav')) return;

  const token     = localStorage.getItem('vc_token') || '';
  const email     = localStorage.getItem('vc_email') || '';
  const isLoggedIn = token.length > 20;
  const initial   = isLoggedIn ? (email[0] || 'U').toUpperCase() : '';

  const pages = [
    ['index.html',    'home',    'Home'],
    ['features.html', 'features','Features'],
    ['compare.html',  'compare', 'Compare'],
    ['pricing.html',  'pricing', 'Pricing'],
    ['download.html', 'download','Download'],
    ['status.html',   'status',  'Status'],
    ['contact.html',  'support', 'Support'],
  ];

  const dLinks = pages.map(([h,id,l]) =>
    `<a href="${h}"${id===activePage?' aria-current="page"':''} class="${id===activePage?'active':''}">${l}</a>`
  ).join('');

  const mLinks = pages.map(([h,id,l]) =>
    `<a href="${h}"${id===activePage?' aria-current="page"':''}>${l}</a>`
  ).join('');

  const authD = isLoggedIn
    ? `<a href="dashboard.html" class="bsi" style="display:flex;align-items:center;gap:7px">
        <span style="width:24px;height:24px;background:linear-gradient(135deg,#7c6aff,#a89fff);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff;flex-shrink:0">${initial}</span>
        Dashboard
       </a>
       <button class="bsi" onclick="vcSignOut()" style="background:rgba(255,71,87,.08);border-color:rgba(255,71,87,.2);color:#ff4757">Sign Out</button>`
    : `<a href="auth.html" class="bsi">Sign In</a><a href="pricing.html" class="bct">Get ValCrown</a>`;

  const authM = isLoggedIn
    ? `<a href="dashboard.html" class="bct" style="justify-content:center">My Dashboard →</a>
       <button class="bsi" onclick="vcSignOut()" style="justify-content:center;background:rgba(255,71,87,.08);border-color:rgba(255,71,87,.2);color:#ff4757">Sign Out</button>`
    : `<a href="auth.html" class="bsi" style="justify-content:center">Sign In</a>
       <a href="pricing.html" class="bct" style="justify-content:center">Get ValCrown</a>`;

  // Skip link
  const skip = document.createElement('a');
  skip.href = '#main-content'; skip.className = 'skip-link'; skip.textContent = 'Skip to main content';
  document.body.insertBefore(skip, document.body.firstChild);

  document.body.insertAdjacentHTML('afterbegin', `
  <nav class="nav" role="navigation" aria-label="Main navigation">
    <div class="nav-in">
      <a href="index.html" class="logo" aria-label="ValCrown home">
        <div class="logo-v" aria-hidden="true">V</div>
        <span class="logo-n">ValCrown</span>
      </a>
      <div class="nm" role="menubar">${dLinks}</div>
      <div class="na">
        <select class="lsel" id="vc-lang" aria-label="Language">
          <option value="en">🇬🇧 EN</option>
          <option value="hi">🇮🇳 HI</option>
          <option value="es">🇪🇸 ES</option>
          <option value="fr">🇫🇷 FR</option>
          <option value="de">🇩🇪 DE</option>
          <option value="pt">🇧🇷 PT</option>
        </select>
        ${authD}
      </div>
      <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="vc-menu" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <div class="mobile-menu" id="vc-menu" role="dialog" aria-label="Navigation">
    ${mLinks}
    <div class="mobile-menu-btns">${authM}</div>
  </div>`);

  // Hamburger
  const tog = document.getElementById('nav-toggle');
  const men = document.getElementById('vc-menu');
  const open  = () => { men.classList.add('open'); tog.setAttribute('aria-expanded','true'); tog.setAttribute('aria-label','Close menu'); document.body.style.overflow='hidden'; };
  const close = () => { men.classList.remove('open'); tog.setAttribute('aria-expanded','false'); tog.setAttribute('aria-label','Open menu'); document.body.style.overflow=''; };
  tog.addEventListener('click', () => men.classList.contains('open') ? close() : open());
  document.addEventListener('click', e => { if (men.classList.contains('open') && !men.contains(e.target) && !tog.contains(e.target)) close(); });
  document.addEventListener('keydown', e => { if (e.key==='Escape' && men.classList.contains('open')) { close(); tog.focus(); } });
  window.addEventListener('resize', () => { if (window.innerWidth > 768) close(); });

  // Language selector — wire AFTER nav is in DOM
  const sel = document.getElementById('vc-lang');
  if (sel) {
    const saved = localStorage.getItem('vc_lang') || (navigator.language||'en').split('-')[0];
    const valid = ['en','hi','es','fr','de','pt'];
    sel.value = valid.includes(saved) ? saved : 'en';
    sel.addEventListener('change', function() {
      const lang = this.value;
      localStorage.setItem('vc_lang', lang);
      _applyLang(lang);
    });
    // Apply language to page content after a short tick
    setTimeout(() => _applyLang(sel.value), 80);
  }
}

// Sign out — global so nav buttons can call it
window.vcSignOut = function() {
  ['vc_token','vc_refresh','vc_email','vc_user','vc_license'].forEach(k => localStorage.removeItem(k));
  window.location.href = 'index.html';
};

// Apply translations — called by both nav and i18n.js
window._applyLang = function(lang) {
  if (typeof window.TRANSLATIONS !== 'object') return;
  const t = window.TRANSLATIONS[lang] || window.TRANSLATIONS['en'];
  if (!t) return;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    if (t[k] !== undefined) el.textContent = t[k];
  });
  const sel = document.getElementById('vc-lang');
  if (sel) sel.value = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
};

// Also expose as setLanguage for backward compat
window.setLanguage = function(lang) {
  localStorage.setItem('vc_lang', lang);
  _applyLang(lang);
};

function renderStatusBar() {
  if (document.getElementById('vc-sbar')) return;
  document.body.insertAdjacentHTML('beforeend', `
  <div class="sbar" id="vc-sbar" role="status" aria-live="polite">
    <div class="sbar-in">
      <div class="sind">
        <span class="sdot ok" id="vc-sdot" aria-hidden="true"></span>
        <div>
          <span style="font-weight:600;font-size:13px"><span class="sok" id="vc-stxt">Checking...</span></span>
          <span style="font-size:11px;color:var(--t3);margin-left:8px" id="vc-ssub"></span>
        </div>
      </div>
      <a href="status.html" class="slink">View detailed status →</a>
    </div>
  </div>`);
  _ping(); setInterval(_ping, 15000);
}

async function _ping() {
  const dot = document.getElementById('vc-sdot');
  const txt = document.getElementById('vc-stxt');
  const sub = document.getElementById('vc-ssub');
  if (!dot) return;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 4000);
    const t = Date.now();
    const r = await fetch(API + '/health', { signal: ctrl.signal });
    clearTimeout(timer);
    const ms = Date.now() - t;
    let data = {};
    try { data = await r.json(); } catch(e) {}
    if (r.ok) {
      const isDegraded = data.database === 'unavailable';
      dot.className = isDegraded ? 'sdot warn' : 'sdot ok';
      txt.className = isDegraded ? 'swarn' : 'sok';
      txt.textContent = isDegraded ? 'Partial degradation — DB issues' : 'All systems operational';
      if (sub) sub.textContent = ms + 'ms · ' + new Date().toLocaleTimeString();
    } else {
      dot.className = 'sdot warn'; txt.className = 'swarn'; txt.textContent = 'Degraded';
      if (sub) sub.textContent = new Date().toLocaleTimeString();
    }
  } catch(e) {
    dot.className = 'sdot err'; txt.className = 'serr'; txt.textContent = 'API unreachable';
    const sub = document.getElementById('vc-ssub');
    if (sub) sub.textContent = 'Using cached data · ' + new Date().toLocaleTimeString();
  }
}

function renderFooter() {
  if (document.querySelector('.ft')) return;
  document.body.insertAdjacentHTML('beforeend', `
  <footer class="ft" role="contentinfo">
    <div class="ftm">
      <div>
        <a href="index.html" class="logo" style="text-decoration:none" aria-label="ValCrown home">
          <div class="logo-v" aria-hidden="true">V</div>
          <span class="logo-n">ValCrown</span>
        </a>
        <p class="ftd"> gaming optimizer built for cloud gaming. Auto-detect, auto-boost, auto-optimize.</p>
        <nav class="ftso" aria-label="Social links">
          <a href="https://www.instagram.com/xogamesspresence" target="_blank" rel="noopener noreferrer" class="fsi" aria-label="Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://www.youtube.com/channel/UCQYo32IcKfPmcn4bNBe0KbA" target="_blank" rel="noopener noreferrer" class="fsi" aria-label="YouTube">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
          </a>
          <a href="https://xogamess.com" target="_blank" rel="noopener noreferrer" class="fsi" aria-label="XOGAMESLTD">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="mailto:support@xogamess.com" class="fsi" aria-label="Email support">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </a>
        </nav>
      </div>
      <div>
        <p class="fct">Product</p>
        <ul class="fcl">
          <li><a href="index.html">Home</a></li>
          <li><a href="features.html">Features</a></li>
          <li><a href="compare.html">Compare</a></li>
          <li><a href="pricing.html">Pricing</a></li>
          <li><a href="download.html">Download</a></li>
          <li><a href="status.html">Server Status</a></li>
          <li><a href="contact.html">Support</a></li>
        </ul>
      </div>
      <div>
        <p class="fct">Legal</p>
        <ul class="fcl">
          <li><a href="terms.html">Terms of Service</a></li>
          <li><a href="privacy.html">Privacy Policy</a></li>
          <li><a href="refund.html">Refund Policy</a></li>
          <li><a href="eula.html">EULA</a></li>
          <li><a href="delivery.html">Instant Delivery</a></li>
        </ul>
      </div>
      <div>
        <p class="fct">XOGAMESLTD</p>
        <ul class="fcl">
          <li><a href="https://xogamess.com" target="_blank" rel="noopener noreferrer">Our Website</a></li>
          <li><a href="https://www.instagram.com/xogamesspresence" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a href="https://www.youtube.com/channel/UCQYo32IcKfPmcn4bNBe0KbA" target="_blank" rel="noopener noreferrer">YouTube</a></li>
          <li><a href="mailto:support@xogamess.com">Contact Us</a></li>
        </ul>
      </div>
    </div>
    <div class="ftb">
      <p class="ftc">© 2026 ValCrown. All rights reserved.</p>
      <p class="ftco">A company of <a href="https://xogamess.com" target="_blank" rel="noopener noreferrer">XOGAMESLTD</a></p>
      <nav class="ftl" aria-label="Footer links">
        <a href="terms.html">Terms</a>
        <a href="privacy.html">Privacy</a>
        <a href="refund.html">Refund</a>
      </nav>
    </div>
  </footer>`);
}
