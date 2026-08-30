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
  /* 出ないまま終わる事故を防ぐ三重の保険。
     マスクや overflow を掛けた箱は IntersectionObserver が拾い損ねることがある
     （.rail が実際にそうだった）。読者がそこまで来たら、観測に頼らず必ず開ける。 */
  function sweep() {
    for (var i = 0; i < els.length; i++) {
      var e = els[i];
      if (e.getAttribute('data-rv') === 'in') continue;
      var b = e.getBoundingClientRect();
      if (b.top < innerHeight + 320 && b.bottom > -320) open(e);
    }
  }
  var tick = 0;
  addEventListener('scroll', function () {
    if (tick) return; tick = 1;
    requestAnimationFrame(function () { tick = 0; sweep(); });
  }, { passive: true });
  setTimeout(sweep, 2500);
})();
