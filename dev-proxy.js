// Local dev proxy: replaces the Docker nginx while testing without containers.
//   /            -> static files from ./public (fallback: editor)
//   /edit/*      -> iD editor (npm start)          http://127.0.0.1:8080/*
//   /api /oauth2 /admin /static -> Django          http://127.0.0.1:8000
//   /tiles/*     -> Martin                          http://127.0.0.1:3000/*
//   /labels/*    -> label PNG tiles (TileServer GL) http://127.0.0.1:8085/*   (docker compose up -d labels)
// Run:  node dev-proxy.js     then open http://127.0.0.1:8099/
// No npm dependencies needed.

const http = require('http');
const net = require('net');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 8099);
const PUBLIC = path.join(__dirname, 'public');
const T = {
  editor: { host: '127.0.0.1', port: 8080 },
  django: { host: '127.0.0.1', port: Number(process.env.DJANGO_PORT || 8000) },
  martin: { host: '127.0.0.1', port: 3000 },
  labels: { host: '127.0.0.1', port: 8085 },
};

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
};

// path prefix -> [target, prefix to strip]
function route(url) {
  if (url === '/edit') return { redirect: '/edit/' };
  if (url.startsWith('/edit/')) return { t: T.editor, url: url.slice('/edit'.length) };
  if (url.startsWith('/tiles/')) return { t: T.martin, url: url.slice('/tiles'.length) };
  if (url.startsWith('/labels/')) return { t: T.labels, url: url.slice('/labels'.length) };
  if (/^\/(api|oauth2|admin|static)\//.test(url)) return { t: T.django, url };
  return null;
}

function proxy(req, res, target, url) {
  const headers = { ...req.headers, 'x-forwarded-for': req.socket.remoteAddress, 'x-forwarded-proto': 'http' };
  const p = http.request({ ...target, method: req.method, path: url, headers }, (r) => {
    res.writeHead(r.statusCode, r.headers);
    r.pipe(res);
  });
  p.on('error', (e) => {
    res.writeHead(502, { 'content-type': 'text/plain; charset=utf-8' });
    res.end(`502: ${target.host}:${target.port} is not reachable (${e.code}). Is that service running?`);
  });
  req.pipe(p);
}

// Pretty URLs (same as openstreetmap.org: /login and /user/new) all serve the one auth page
const PAGES = { '/login': '/auth.html', '/signup': '/auth.html', '/user/new': '/auth.html', '/forgot': '/auth.html' };

function serveStatic(req, res) {
  let pathname = decodeURIComponent(req.url.split('?')[0]);
  pathname = PAGES[pathname.replace(/\/+$/, '')] || pathname;
  let file = path.join(PUBLIC, pathname);
  if (!file.startsWith(PUBLIC)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (fs.existsSync(file)) {
    res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
    return fs.createReadStream(file).pipe(res);
  }
  // Not in public/: the iD editor loads absolute assets (e.g. /dist/...), so try the editor.
  proxy(req, res, T.editor, req.url);
}

const server = http.createServer((req, res) => {
  const r = route(req.url);
  if (!r) return serveStatic(req, res);
  if (r.redirect) { res.writeHead(301, { location: r.redirect }); return res.end(); }
  proxy(req, res, r.t, r.url);
});

// WebSocket upgrade (editor live-reload)
server.on('upgrade', (req, socket, head) => {
  const r = route(req.url);
  const target = r && r.t ? r.t : T.editor;
  const upstream = net.connect(target.port, target.host, () => {
    let raw = `${req.method} ${r && r.url ? r.url : req.url} HTTP/1.1\r\n`;
    for (let i = 0; i < req.rawHeaders.length; i += 2) raw += `${req.rawHeaders[i]}: ${req.rawHeaders[i + 1]}\r\n`;
    upstream.write(raw + '\r\n');
    if (head && head.length) upstream.write(head);
    socket.pipe(upstream).pipe(socket);
  });
  upstream.on('error', () => socket.destroy());
  socket.on('error', () => upstream.destroy());
});

server.listen(PORT, '127.0.0.1', () => console.log(`dev proxy: http://127.0.0.1:${PORT}/`));
