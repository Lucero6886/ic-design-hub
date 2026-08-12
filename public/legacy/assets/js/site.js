/* IC Design Mentoring Learning Hub — search (vanilla JS, no dependencies).
   The site works without JS: navigation and content are static HTML;
   only this search box requires it. Index: assets/js/search-index.js
   (regenerate with tools/build-search-index.mjs). */
(function () {
  'use strict';
  var input = document.getElementById('search-input');
  if (!input) return;
  var list = document.getElementById('search-results');
  var empty = document.getElementById('search-empty');
  var scopeBtns = Array.prototype.slice.call(document.querySelectorAll('.scope button'));
  var scope = 'all';
  var IDX = (window.LICHUB_INDEX || []);

  // Fold Vietnamese diacritics so "tuan tu" matches "tuần tự"
  function fold(s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
  }
  function score(entry, terms) {
    var sc = 0;
    for (var i = 0; i < terms.length; i++) {
      var t = terms[i];
      if (!t) continue;
      if (entry.ft.indexOf(t) >= 0) sc += 3;          // folded title
      var hIdx = entry.fh.indexOf(t);                  // folded headings blob
      if (hIdx >= 0) sc += 1;
      if (sc === 0) return 0;                          // every term must hit somewhere
    }
    // require all terms present in title+headings combined
    for (var j = 0; j < terms.length; j++) {
      var q = terms[j];
      if (q && entry.ft.indexOf(q) < 0 && entry.fh.indexOf(q) < 0) return 0;
    }
    return sc;
  }
  function firstHit(entry, terms) {
    for (var i = 0; i < entry.h.length; i++) {
      var fhh = fold(entry.h[i]);
      for (var j = 0; j < terms.length; j++) {
        if (terms[j] && fhh.indexOf(terms[j]) >= 0) return entry.h[i];
      }
    }
    return '';
  }
  function render() {
    var q = fold(input.value.trim());
    list.innerHTML = '';
    if (q.length < 2) { empty.textContent = ''; return; }
    var terms = q.split(/\s+/).slice(0, 8);
    var out = [];
    for (var i = 0; i < IDX.length; i++) {
      var e = IDX[i];
      if (scope !== 'all' && e.v !== scope) continue;
      var sc = score(e, terms);
      if (sc > 0) out.push([sc, e]);
    }
    out.sort(function (a, b) { return b[0] - a[0]; });
    out = out.slice(0, 20);
    if (!out.length) { empty.textContent = 'Không tìm thấy — thử từ khóa khác (có thể gõ không dấu).'; return; }
    empty.textContent = '';
    for (var k = 0; k < out.length; k++) {
      var e2 = out[k][1];
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = e2.p;
      var src = document.createElement('span');
      src.className = 'src s-' + e2.v;
      src.textContent = '[' + e2.v.toUpperCase() + (e2.w ? ' · Tuần ' + e2.w : '') + ']';
      a.appendChild(src);
      a.appendChild(document.createTextNode(' ' + e2.t));
      var hit = firstHit(e2, terms);
      if (hit && hit !== e2.t) {
        var s2 = document.createElement('span');
        s2.className = 'hit';
        s2.textContent = '↳ ' + hit;
        a.appendChild(s2);
      }
      li.appendChild(a);
      list.appendChild(li);
    }
  }
  scopeBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      scope = b.getAttribute('data-scope');
      scopeBtns.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      render();
    });
  });
  input.addEventListener('input', render);
})();
