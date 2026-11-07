const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, 'public');
const files = fs.readdirSync(root, { recursive: true }).filter(f => f.endsWith('.html'));
const issues = [];
for (const file of files) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const redirect = /http-equiv="refresh"/i.test(html);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  if (new Set(ids).size !== ids.length) issues.push(`${file}: duplicate IDs`);
  if (!redirect && (html.match(/<h1\b/g) || []).length !== 1) issues.push(`${file}: expected one main heading`);
  if (!redirect && !html.includes('/polish.css')) issues.push(`${file}: missing shared polish stylesheet`);
  for (const match of html.matchAll(/\b(?:href|src)="([^"?#]*)(?:\?[^"#]*)?(?:#([^"]*))?"/g)) {
    const [ , url, fragment ] = match;
    if (/^(?:[a-z]+:|\/\/)/i.test(url)) continue;
    let target = url ? path.resolve(url.startsWith('/') ? root : path.dirname(path.join(root, file)), '.' + (url.startsWith('/') ? url : '/' + url)) : path.join(root, file);
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
    if (!fs.existsSync(target)) { issues.push(`${file}: missing ${url}`); continue; }
    if (fragment && target.endsWith('.html')) {
      const content = fs.readFileSync(target, 'utf8');
      if (!content.includes(`id="${fragment}"`)) issues.push(`${file}: missing anchor ${url}#${fragment}`);
    }
  }
}
if (issues.length) { console.error(issues.join('\n')); process.exitCode = 1; }
else console.log(`Checked ${files.length} pages: local links, assets, anchors, unique IDs, main headings and shared styles pass.`);
