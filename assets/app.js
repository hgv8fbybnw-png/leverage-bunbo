/* レバレッジの分母 ── 動きだけを担当する。本文はHTMLに直接書いてある（S-03b）。 */
(function () {
  var d = document, r = d.documentElement;
  r.classList.add('js');
  function lvh() { r.style.setProperty('--stable-lvh', (innerHeight / 100) + 'px'); }
  lvh();
  var w = innerWidth;
  addEventListener('resize', function () {
    if (Math.abs(innerWidth - w) < 2) return; w = innerWidth; lvh();
  });
  var els = [].slice.call(d.querySelectorAll('[data-rv]'));
  function open(e) { e.setAttribute('data-rv', 'in'); }
  if (!('IntersectionObserver' in window)) { els.forEach(open); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (en) { if (en.isIntersecting) { open(en.target); io.unobserve(en.target); } });
  }, { threshold: 0, rootMargin: '260px 0px 260px 0px' });
  els.forEach(function (e) { io.observe(e); });
  /* 出ないまま終わる事故を防ぐ二重の保険 */
  setTimeout(function () {
    els.forEach(function (e) {
      if (e.getBoundingClientRect().top < innerHeight + 400) open(e);
    });
  }, 2500);
})();
