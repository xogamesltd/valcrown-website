/**
 * ValCrown Affiliate Tracker
 * Add to valcrown-website/js/affiliate.js
 * Include on every page: <script src="/js/affiliate.js"></script>
 */
(function () {
  const API = 'https://api.valcrown.com';
  const COOKIE_DAYS = 30;

  function setCookie(name, val, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 864e5);
    document.cookie = `${name}=${val};expires=${d.toUTCString()};path=/;SameSite=Lax`;
  }

  function getCookie(name) {
    const v = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return v ? v.pop() : null;
  }

  // Read ?ref= from URL and save to cookie
  const params = new URLSearchParams(location.search);
  const ref = params.get('ref') || params.get('aff');

  if (ref) {
    setCookie('vc_ref', ref.toUpperCase(), COOKIE_DAYS);
    localStorage.setItem('vc_ref', ref.toUpperCase());
    // Track the click
    fetch(`${API}/api/affiliate/click`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ref_code: ref, page: location.pathname }),
      keepalive: true,
    }).catch(() => {});
  }

  // Expose ref getter for checkout
  window.getAffiliateRef = function () {
    return localStorage.getItem('vc_ref') || getCookie('vc_ref') || null;
  };
})();
