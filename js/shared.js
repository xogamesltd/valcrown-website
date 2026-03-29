'use strict';
const API = 'https://api.valcrown.com';

// ── NAV ──────────────────────────────────────────────────────────────────────
function renderNav(activePage) {
  if (document.querySelector('.nav')) return;
  const token = localStorage.getItem('vc_token') || '';
  const email = localStorage.getItem('vc_email') || '';
  const isLoggedIn = token.length > 20;
  const initial = isLoggedIn ? (email[0] || 'U').toUpperCase() : '';

  const pages = [
    ['index.html','home','Home'],
    ['pricing.html','pricing','Pricing'],
    ['download.html','download','Download'],
    ['status.html','status','Status'],
    ['contact.html','support','Support'],
  ];

  const dLinks = pages.map(([h,id,l]) =>
    `<a href="${h}" class="${id===activePage?'active':''}">${l}</a>`).join('');

  const mLinks = pages.map(([h,id,l]) =>
    `<a href="${h}">${l}</a>`).join('');

  const authD = isLoggedIn
    ? `<a href="dashboard.html" class="bsi"><span style="width:22px;height:22px;background:linear-gradient(135deg,#7c6aff,#a89fff);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:#fff">${initial}</span>Dashboard</a>
       <button class="bsi" onclick="vcSignOut()" style="color:#ff4757;border-color:rgba(255,71,87,.2);background:rgba(255,71,87,.06)">Sign Out</button>`
    : `<a href="auth.html" class="bsi">Sign In</a><a href="pricing.html" class="bct">Get ValCrown →</a>`;

  const authM = isLoggedIn
    ? `<a href="dashboard.html" class="bct" style="justify-content:center">My Dashboard →</a>
       <button onclick="vcSignOut()" style="justify-content:center;color:#ff4757">Sign Out</button>`
    : `<a href="auth.html" style="justify-content:center">Sign In</a>
       <a href="pricing.html" class="bct" style="justify-content:center">Get ValCrown →</a>`;

  const skip = document.createElement('a');
  skip.href = '#main'; skip.className = 'skip-link'; skip.textContent = 'Skip to content';
  document.body.insertBefore(skip, document.body.firstChild);

  document.body.insertAdjacentHTML('afterbegin', `
  <nav class="nav" id="main-nav">
    <div class="nav-in">
      <a href="index.html" class="logo" aria-label="ValCrown home">
        <div class="logo-v">V</div>
        <span class="logo-n">ValCrown</span>
      </a>
      <div class="nm">${dLinks}</div>
      <div class="na">${authD}</div>
      <button class="hbg" id="hbg" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <div class="mob-menu" id="mob-menu" role="dialog" aria-label="Navigation">
    ${mLinks}
    <div class="mob-div"></div>
    ${authM}
  </div>`);

  // Hamburger
  const hbg = document.getElementById('hbg');
  const mob = document.getElementById('mob-menu');
  hbg.addEventListener('click', () => {
    hbg.classList.toggle('open');
    mob.classList.toggle('open');
    hbg.setAttribute('aria-expanded', mob.classList.contains('open'));
    document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
  });

  // Scroll shadow
  window.addEventListener('scroll', () => {
    document.getElementById('main-nav')?.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── STATUS BAR ───────────────────────────────────────────────────────────────
function renderStatusBar() {
  document.body.insertAdjacentHTML('beforeend', `
  <div class="sbar" id="status-bar">
    <div class="sbar-in">
      <div class="sind">
        <span class="sdot ok" id="sb-dot"></span>
        <span id="sb-txt" class="sok">Checking status...</span>
      </div>
      <a href="status.html" class="slink">View status page →</a>
    </div>
  </div>`);

  fetch(API + '/health').then(r => r.json()).then(d => {
    const ok = d.database === 'ok';
    const dot = document.getElementById('sb-dot');
    const txt = document.getElementById('sb-txt');
    if (dot) dot.className = 'sdot ' + (ok ? 'ok' : 'err');
    if (txt) {
      txt.className = ok ? 'sok' : 'serr';
      txt.textContent = ok ? 'All systems operational' : 'Service disruption detected';
    }
  }).catch(() => {
    const txt = document.getElementById('sb-txt');
    if (txt) { txt.className = 'swarn'; txt.textContent = 'Status unknown — check status page'; }
  });
}

// ── FOOTER ───────────────────────────────────────────────────────────────────
function renderFooter() {
  document.body.insertAdjacentHTML('beforeend', `
  <footer class="ft">
    <div class="ftm">
      <div>
        <div class="logo" style="margin-bottom:0">
          <div class="logo-v">V</div>
          <span class="logo-n">ValCrown</span>
        </div>
        <p class="ftd">The cloud gaming optimizer built for Windows. Auto-detects 200+ games. AI-powered. No settings required.</p>
        <div class="ftso">
          <a href="https://twitter.com/valcrown" class="fsi" target="_blank" rel="noopener" aria-label="Twitter">
            <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://discord.gg/valcrown" class="fsi" target="_blank" rel="noopener" aria-label="Discord">
            <svg viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.114 18.1.132 18.114a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
          </a>
          <a href="https://github.com/xogamesltd" class="fsi" target="_blank" rel="noopener" aria-label="GitHub">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
          </a>
        </div>
      </div>
      <div>
        <div class="fct">Product</div>
        <div class="fcl">
          <a href="index.html">Home</a>
          <a href="pricing.html">Pricing</a>
          <a href="download.html">Download</a>
          <a href="auth.html">Sign In</a>
          <a href="dashboard.html">Dashboard</a>
        </div>
      </div>
      <div>
        <div class="fct">Company</div>
        <div class="fcl">
          <a href="contact.html">Support</a>
          <a href="status.html">System Status</a>
          <a href="terms.html">Terms of Service</a>
          <a href="privacy.html">Privacy Policy</a>
          <a href="refund.html">Refund Policy</a>
        </div>
      </div>
      <div>
        <div class="fct">Resources</div>
        <div class="fcl">
          <a href="eula.html">EULA</a>
          <a href="delivery.html">Digital Delivery</a>
          <a href="sitemap.xml">Sitemap</a>
          <a href="https://github.com/xogamesltd/valcrown-app" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>
    </div>
    <div class="ftb">
      <span class="ftc">© 2026 XOGAMESLTD. All rights reserved.</span>
      <div class="ftl">
        <a href="terms.html">Terms</a>
        <a href="privacy.html">Privacy</a>
        <a href="refund.html">Refunds</a>
        <a href="contact.html">Contact</a>
      </div>
      <span class="ftco">Made with ❤ by <a href="https://valcrown.com">XOGAMESLTD</a></span>
    </div>
  </footer>`);
}

// ── AUTH ──────────────────────────────────────────────────────────────────────
function vcSignOut() {
  const rt = localStorage.getItem('vc_refresh');
  if (rt) fetch(API + '/api/auth/logout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ refreshToken: rt }) }).catch(() => {});
  ['vc_token','vc_refresh','vc_email','vc_user','vc_license'].forEach(k => localStorage.removeItem(k));
  window.location.href = 'index.html';
}

// ── SCROLL REVEAL INIT ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
});
