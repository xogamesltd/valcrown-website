(function() {
  var API    = 'https://hycqflm9y3b1qlviho3b1dsz.187.127.136.104.sslip.io';
  var sid    = sessionStorage.getItem('vc_sid');
  if (!sid) { sid = Math.random().toString(36).slice(2) + Date.now().toString(36); sessionStorage.setItem('vc_sid', sid); }

  function track(event, props) {
    try {
      var uid = localStorage.getItem('vc_user_id') || null;
      fetch(API + '/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: event,
          properties: props || {},
          session_id: sid,
          user_id: uid,
          page: location.pathname + location.search,
          referrer: document.referrer || null
        }),
        keepalive: true
      }).catch(function(){});
    } catch(e) {}
  }

  track('page_view', { title: document.title, path: location.pathname });

  document.addEventListener('click', function(e) {
    var el = e.target.closest('a,button,[data-track]');
    if (!el) return;
    var label = el.getAttribute('data-track') || el.textContent.trim().slice(0,50) || '';
    if (label) track('click', { label: label, tag: el.tagName.toLowerCase() });
  }, { passive: true });

  window.vcTrack = track;
})();
