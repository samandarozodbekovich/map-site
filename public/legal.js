(function () {
  // ── SET THESE BEFORE THE SITE GOES PUBLIC ──────────────────────────────────────────────
  var CONTACT = {
    operator: '',   // who runs the service: a company name or your own name, e.g. 'GetPlace jamoasi'
    email: ''       // where users write: complaints, data requests, e.g. 'info@getplace.uz'
  };
  // ─────────────────────────────────────────────────────────────────────────────────────

  var ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ESC[c]; }); }
  function inline(s) {
    var html = esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    return html
      .replace(/\{operator\}/g, CONTACT.operator ? esc(CONTACT.operator) : '<mark>[operator name: set CONTACT.operator in legal.js]</mark>')
      .replace(/\{email\}/g, CONTACT.email ? '<a href="mailto:' + esc(CONTACT.email) + '">' + esc(CONTACT.email) + '</a>' : '<mark>[contact e-mail: set CONTACT.email in legal.js]</mark>');
  }

  var which = /^\/privacy\/?$/.test(location.pathname) ? 'privacy' : 'terms';

  function render() {
    var lang = I18N.get(), L = window.LEGAL[lang] || window.LEGAL.uz, doc = L[which];
    document.title = 'GetPlace — ' + doc.title;
    document.getElementById('legal-tabs').innerHTML =
      ['terms', 'privacy'].map(function (k) { return '<a href="/' + k + '"' + (k === which ? ' class="on" aria-current="page"' : '') + '>' + esc(L.ui[k]) + '</a>'; }).join('');
    var html = '<h1>' + esc(doc.title) + '</h1><p class="updated">' + esc(L.ui.updated) + ': ' + esc(window.LEGAL.updated) + '</p>';
    doc.sections.forEach(function (s) {
      html += '<section><h2>' + esc(s.h) + '</h2>' + (s.p || []).map(function (p) { return '<p>' + inline(p) + '</p>'; }).join('') +
        (s.ul ? '<ul>' + s.ul.map(function (li) { return '<li>' + inline(li) + '</li>'; }).join('') + '</ul>' : '') + '</section>';
    });
    document.getElementById('legal-body').innerHTML = html;
    document.getElementById('legal-note').textContent = L.ui.draft;
    document.getElementById('back-link').textContent = L.ui.back;
    document.getElementById('lang-code').textContent = lang.toUpperCase();
    document.documentElement.lang = lang;
  }

  var menu = document.getElementById('lang-menu');
  document.getElementById('lang-btn').onclick = function (e) { e.stopPropagation(); menu.hidden = !menu.hidden; };
  document.addEventListener('click', function () { menu.hidden = true; });
  document.querySelectorAll('[data-lang]').forEach(function (b) { b.onclick = function () { I18N.set(b.dataset.lang); menu.hidden = true; render(); }; });
  render();
})();
