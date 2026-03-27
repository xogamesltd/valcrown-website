// ValCrown — Shared Nav + Footer
// Include this in every page: <script src="js/shared.js"></script>
// Then call: renderNav('active-page'); renderFooter();

const API = 'https://api.valcrown.com';

function renderNav(activePage) {
  const pages = ['home','pricing','download','status','support'];
  const links = {
    home: ['index.html','Home'],
    pricing: ['pricing.html','Pricing'],
    download: ['download.html','Download'],
    status: ['status.html','Status'],
    support: ['contact.html','Support'],
  };
  const navHtml = `
  <nav class="nav">
    <div class="nav-in">
      <a href="index.html" class="logo">
        <div class="logo-v">V</div>
        <span class="logo-n">ValCrown</span>
      </a>
      <div class="nm">
        ${pages.map(p=>`<a href="${links[p][0]}" ${p===activePage?'class="active"':''}>${links[p][1]}</a>`).join('')}
      </div>
      <div class="na">
        <select class="lsel" id="lang-select" onchange="setLanguage&&setLanguage(this.value)">
          <option value="en">🇬🇧 EN</option><option value="hi">🇮🇳 HI</option>
          <option value="es">🇪🇸 ES</option><option value="fr">🇫🇷 FR</option>
          <option value="de">🇩🇪 DE</option><option value="pt">🇧🇷 PT</option>
        </select>
        <a href="auth.html" class="bsi">Sign In</a>
        <a href="pricing.html" class="bct">Get ValCrown</a>
      </div>
    </div>
  </nav>`;
  document.body.insertAdjacentHTML('afterbegin', navHtml);
}

function renderStatusBar() {
  const html = `
  <div class="sbar">
    <div class="sbar-in">
      <div class="sind">
        <span class="sdot ok" id="sdot"></span>
        <span>All systems: <span class="sok" id="stxt">Checking...</span></span>
      </div>
      <a href="status.html" class="slink">View detailed status →</a>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
  checkStatus();
}

function renderFooter() {
  const html = `
  <footer class="ft">
    <div class="ftm">
      <div>
        <a href="index.html" class="logo" style="margin-bottom:0">
          <div class="logo-v">V</div>
          <span class="logo-n">ValCrown</span>
        </a>
        <p class="ftd">AI-powered gaming optimizer built specifically for cloud gaming. Auto-detect, auto-boost, auto-optimize.</p>
        <div class="ftso">
          <a href="https://www.instagram.com/xogamesspresence" target="_blank" rel="noopener" class="fsi" title="Instagram">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://www.youtube.com/channel/UCQYo32IcKfPmcn4bNBe0KbA" target="_blank" rel="noopener" class="fsi" title="YouTube">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
          </a>
          <a href="https://xogamess.com" target="_blank" rel="noopener" class="fsi" title="XOGAMESLTD">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="mailto:support@valcrown.com" class="fsi" title="Email">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </a>
        </div>
      </div>
      <div class="fcl">
        <div class="fct">Product</div>
        <a href="index.html">Home</a>
        <a href="pricing.html">Pricing</a>
        <a href="download.html">Download</a>
        <a href="status.html">Server Status</a>
        <a href="contact.html">Support</a>
      </div>
      <div class="fcl">
        <div class="fct">Legal</div>
        <a href="terms.html">Terms of Service</a>
        <a href="privacy.html">Privacy Policy</a>
        <a href="refund.html">Refund Policy</a>
        <a href="eula.html">EULA</a>
        <a href="delivery.html">Instant Delivery</a>
      </div>
      <div class="fcl">
        <div class="fct">XOGAMESLTD</div>
        <a href="https://xogamess.com" target="_blank" rel="noopener">Our Website</a>
        <a href="https://www.instagram.com/xogamesspresence" target="_blank" rel="noopener">Instagram</a>
        <a href="https://www.youtube.com/channel/UCQYo32IcKfPmcn4bNBe0KbA" target="_blank" rel="noopener">YouTube</a>
        <a href="mailto:support@valcrown.com">Contact Us</a>
      </div>
    </div>
    <div class="ftb">
      <div class="ftc">© 2026 ValCrown. All rights reserved.</div>
      <div class="ftco">A company of <a href="https://xogamess.com" target="_blank" rel="noopener">XOGAMESLTD</a></div>
      <div class="ftl">
        <a href="terms.html">Terms</a>
        <a href="privacy.html">Privacy</a>
        <a href="refund.html">Refund</a>
      </div>
    </div>
  </footer>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

async function checkStatus() {
  try {
    const t = Date.now();
    const r = await fetch(API + '/health', { signal: AbortSignal.timeout(4000) });
    const ms = Date.now() - t;
    const d = document.getElementById('sdot');
    const s = document.getElementById('stxt');
    if (!d) return;
    if (r.ok) { d.className='sdot ok'; s.className='sok'; s.textContent='Operational ('+ms+'ms)'; }
    else { d.className='sdot warn'; s.className='swarn'; s.textContent='Degraded'; }
  } catch(e) {
    const d=document.getElementById('sdot'); const s=document.getElementById('stxt');
    if (d) { d.className='sdot err'; s.className='serr'; s.textContent='Service disruption'; }
  }
}
