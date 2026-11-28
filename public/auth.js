(function () {
  var $ = function (id) { return document.getElementById(id); };
  var t = I18N.t, f = I18N.f;

  var path = location.pathname.replace(/\/+$/, '');
  var mode = path === '/forgot' ? 'forgot' : (path === '/signup' || path === '/user/new') ? 'signup' : 'login';
  var qs = new URLSearchParams(location.search);
  var oauth = qs.get('oauth') === '1';
  var next = safeNext(qs.get('next'));
  var state = { step: 'form', kind: null, email: '', info: null, error: null, secs: 0, timer: null, busy: false, pwVisible: false };
  var PW_IDS = ['password', 'password2', 'newpw', 'newpw2'];

  function safeNext(v) { return v && v.charAt(0) === '/' && v.charAt(1) !== '/' && v.charAt(1) !== '\\' ? v : '/'; }
  function csrf() { var m = document.cookie.match(/(?:^|; )csrftoken=([^;]*)/); return m ? decodeURIComponent(m[1]) : ''; }

  function api(url, body) {
    return fetch(url, {
      method: 'POST', credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrf() },
      body: JSON.stringify(body || {})
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (data) { return { status: r.status, data: data }; });
    }, function () { return { status: 0, data: { error: 'network' } }; });
  }

  function emailValue() { return $('email').value.trim().toLowerCase(); }
  function emailOk(e) { return e.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e); }
  function nameOk(n) { return /^[\w .'’ʻ‘-]{3,30}$/.test(n); }
  function cleanName() { return $('display-name').value.replace(/\s+/g, ' ').trim(); }

  function showError(code, extra) { state.error = { code: code, extra: extra || {} }; renderError(); }
  function clearError() { state.error = null; renderError(); }
  function renderError() {
    var el = $('msg');
    if (!state.error) { el.hidden = true; el.textContent = ''; return; }
    var e = state.error, key = 'err_' + e.code;
    var text = f(key, { s: e.extra.retry_after, left: e.extra.left });
    el.textContent = text === key ? e.code : text;
    var link = { not_registered: '/signup', already_registered: '/login', already_verified: '/login' }[e.code];
    if (link) {
      var a = document.createElement('a');
      a.href = link + location.search;
      a.textContent = ' ' + t(link === '/signup' ? 'signup' : 'login');
      el.appendChild(a);
    }
    el.hidden = false;
  }

  function render() {
    I18N.apply();
    $('lang-code').textContent = I18N.get().toUpperCase();
    var signup = mode === 'signup';
    document.title = 'GetPlace — ' + t(signup ? 'authSignupTitle' : mode === 'forgot' ? 'authForgotTitle' : 'authLoginTitle');
    $('tab-login').setAttribute('aria-selected', String(!signup));
    $('tab-signup').setAttribute('aria-selected', String(signup));
    $('tab-login').href = '/login' + location.search;
    $('tab-signup').href = '/signup' + location.search;
    $('forgot-link').href = '/forgot' + location.search;
    $('oauth-note').hidden = !oauth;

    var inCode = state.step === 'code';
    $('step-form').hidden = inCode;
    $('step-code').hidden = !inCode;
    document.querySelectorAll('[data-modes]').forEach(function (el) {
      el.hidden = el.dataset.modes.split(' ').indexOf(mode) < 0;
    });
    $('password').setAttribute('autocomplete', signup ? 'new-password' : 'current-password');

    var introKey = inCode ? (state.kind === 'reset' ? 'introReset' : 'introConfirm')
      : signup ? 'introSignup' : mode === 'forgot' ? 'introForgot' : 'introLogin';
    $('intro').textContent = t(introKey);
    $('send').textContent = t(signup ? 'signupBtn' : mode === 'forgot' ? 'sendCode' : 'loginBtn');
    $('verify').textContent = t(state.kind === 'reset' ? 'resetBtn' : 'confirmBtn');
    $('reset-fields').hidden = !(inCode && state.kind === 'reset');

    $('alt-text').textContent = mode === 'forgot' ? '' : t(signup ? 'haveAccount' : 'noAccount');
    $('alt-link').textContent = mode === 'forgot' ? t('backToLogin') : t(signup ? 'login' : 'signup');
    $('alt-link').href = (signup || mode === 'forgot' ? '/login' : '/signup') + location.search;

    if (inCode) $('sent-to').textContent = f('codeSentTo', { email: state.email });
    $('info').hidden = !state.info;
    if (state.info) $('info').textContent = t(state.info);
    document.querySelectorAll('.pw-toggle').forEach(function (b) { b.textContent = t(state.pwVisible ? 'hidePw' : 'showPw'); });
    renderResend();
    renderError();
  }

  function renderResend() {
    var b = $('resend');
    b.disabled = state.secs > 0 || state.busy;
    b.textContent = state.secs > 0 ? f('resendIn', { s: state.secs }) : t('resend');
  }
  function startCountdown(secs) {
    clearInterval(state.timer);
    state.secs = secs;
    renderResend();
    state.timer = setInterval(function () {
      state.secs = Math.max(0, state.secs - 1);
      renderResend();
      if (!state.secs) clearInterval(state.timer);
    }, 1000);
  }

  function setBusy(on) {
    state.busy = on;
    $('send').disabled = on; $('verify').disabled = on;
    renderResend();
  }
  function setPwVisible(on) {
    state.pwVisible = on;
    PW_IDS.forEach(function (id) { $(id).type = on ? 'text' : 'password'; });
    render();
  }
  function goStep(step) {
    state.step = step;
    render();
    if (step === 'code') { $('code').value = ''; $('code').focus(); }
    else $('email').focus();
  }
  function go(data) { location.href = data.redirect || next; }

  function afterCodeSent(kind, email, data, info) {
    state.kind = kind; state.email = email; state.info = info || null;
    $('dev-note').hidden = !data.dev_code;
    if (data.dev_code) $('dev-code').textContent = data.dev_code;
    goStep('code');
    startCountdown(data.resend_after || 30);
  }

  function submitForm() {
    clearError();
    var email = emailValue();
    if (!emailOk(email)) return showError('invalid_email');

    if (mode === 'login') {
      var pw = $('password').value;
      if (!pw) return showError('password_required');
      setBusy(true);
      api('/api/auth/login/', { email: email, password: pw, remember: $('remember').checked }).then(function (r) {
        if (r.status === 200) return go(r.data);
        setBusy(false);
        if (r.data.error === 'not_verified') return confirmLater(email);
        showError(r.data.error || 'network', r.data);
      });
    } else if (mode === 'signup') {
      var name = cleanName(), p1 = $('password').value, p2 = $('password2').value;
      if (!nameOk(name)) return showError('invalid_name');
      if (!p1) return showError('password_required');
      if (p1 !== p2) return showError('password_mismatch');
      if (!$('terms').checked) return showError('terms');
      setBusy(true);
      api('/api/auth/signup/', { email: email, password: p1, display_name: name }).then(function (r) {
        setBusy(false);
        if (r.status !== 200) return showError(r.data.error || 'network', r.data);
        afterCodeSent('confirm', email, r.data);
      });
    } else {
      setBusy(true);
      api('/api/auth/forgot/', { email: email }).then(function (r) {
        setBusy(false);
        if (r.status !== 200) return showError(r.data.error || 'network', r.data);
        afterCodeSent('reset', email, r.data);
      });
    }
  }

  function confirmLater(email) {
    setBusy(true);
    api('/api/auth/resend/', { email: email }).then(function (r) {
      setBusy(false);
      if (r.status === 200) return afterCodeSent('confirm', email, r.data, 'notVerifiedInfo');
      if (r.data.error === 'too_many_requests') return afterCodeSent('confirm', email, { resend_after: r.data.retry_after }, 'notVerifiedInfo');
      showError(r.data.error || 'network', r.data);
    });
  }

  function verify() {
    clearError();
    var code = $('code').value.replace(/\D/g, '');
    if (code.length !== 6) return showError('code_format');
    var url = '/api/auth/verify/', body = { email: state.email, code: code };
    if (state.kind === 'reset') {
      if (!$('newpw').value) return showError('password_required');
      if ($('newpw').value !== $('newpw2').value) return showError('password_mismatch');
      url = '/api/auth/reset/'; body.password = $('newpw').value;
    }
    setBusy(true);
    api(url, body).then(function (r) {
      if (r.status === 200) return go(r.data);
      setBusy(false);
      var err = r.data.error || 'network';
      showError(err, r.data);
      if (err === 'code_invalid') { $('code').value = ''; $('code').focus(); }
      if (err === 'code_expired' || err === 'too_many_attempts') startCountdown(0);
    });
  }

  function resend() {
    clearError();
    setBusy(true);
    api(state.kind === 'reset' ? '/api/auth/forgot/' : '/api/auth/resend/', { email: state.email }).then(function (r) {
      setBusy(false);
      if (r.status !== 200) {
        showError(r.data.error || 'network', r.data);
        if (r.data.error === 'too_many_requests' && r.data.retry_after) startCountdown(Math.min(r.data.retry_after, 300));
        return;
      }
      $('dev-note').hidden = !r.data.dev_code;
      if (r.data.dev_code) $('dev-code').textContent = r.data.dev_code;
      startCountdown(r.data.resend_after || 30);
    });
  }

  $('code').addEventListener('input', function () {
    var c = $('code');
    c.value = c.value.replace(/\D/g, '').slice(0, 6);
    if (c.value.length === 6 && !state.busy && state.kind === 'confirm') verify();
  });
  $('auth-form').addEventListener('submit', function (e) {
    e.preventDefault();
    if (state.step === 'form') submitForm(); else verify();
  });
  $('verify').addEventListener('click', verify);
  $('resend').addEventListener('click', resend);
  $('back').addEventListener('click', function () { clearInterval(state.timer); state.secs = 0; state.info = null; clearError(); goStep('form'); });
  document.querySelectorAll('.pw-toggle').forEach(function (b) { b.addEventListener('click', function () { setPwVisible(!state.pwVisible); }); });

  $('lang-btn').addEventListener('click', function (e) { e.stopPropagation(); $('lang-menu').hidden = !$('lang-menu').hidden; });
  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { I18N.set(b.dataset.lang); $('lang-menu').hidden = true; render(); updateAlready(); });
  });
  document.addEventListener('click', function () { $('lang-menu').hidden = true; });

  var me = null;
  function updateAlready() {
    if (!me) return;
    $('already-text').textContent = f('alreadyIn', { name: me.display_name });
    $('already-continue').href = next;
  }
  $('already-logout').addEventListener('click', function () {
    api('/api/auth/logout/', {}).then(function () { location.reload(); });
  });

  render();
  fetch('/api/auth/me/', { credentials: 'same-origin' }).then(function (r) { return r.json(); }).then(function (d) {
    if (d.authenticated) {
      me = d.user;
      $('already').hidden = false;
      $('auth-form').hidden = true;
      document.querySelector('.alt').hidden = true;
      updateAlready();
    } else {
      $('email').focus();
    }
  }, function () { showError('network'); });
})();
