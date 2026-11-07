// Comparison-only server. Never used by the Next.js development or production scripts.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const archive = path.resolve(__dirname, 'public');
const assets = path.resolve(__dirname, '../public');
http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); return res.end('Invalid address'); }
  for (const root of [archive, assets]) {
    let file = path.resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) continue;
    res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.ttf': 'font/ttf' })[path.extname(file)] || 'application/octet-stream');
    return fs.createReadStream(file).pipe(res);
  }
  res.writeHead(404); res.end('Page not found');
}).listen(4322, '127.0.0.1', () => console.log('Legacy comparison: http://127.0.0.1:4322'));
