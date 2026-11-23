import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { parseFragment } from 'parse5';

const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const json = v => JSON.stringify(v, null, 2) + '\n';
const assert = (v, m) => { if (!v) throw new Error(m); };
export function files(root, prefix = '') {
  assert(!fs.lstatSync(root).isSymbolicLink(), 'Symlink root forbidden');
  return fs.readdirSync(path.join(root, prefix), { withFileTypes: true }).flatMap(e => {
    const p = path.posix.join(prefix, e.name);
    assert(!e.isSymbolicLink(), `Symlink forbidden: ${p}`);
    return e.isDirectory() ? files(root, p) : [p];
  }).sort();
}
function read(root, p) {
  assert(!path.isAbsolute(p) && !p.split('/').some(x => x === '..' || x === '.' || !x), 'Unsafe path');
  let current = root;
  for (const part of p.split('/')) { current = path.join(current, part); assert(!fs.lstatSync(current).isSymbolicLink(), 'Symlink forbidden'); }
  return fs.readFileSync(current);
}
export function verify(root) {
  const manifest = JSON.parse(read(root, 'manifest.json'));
  assert(manifest.version === 1 && manifest.kind === 'bridge-private-article-archive', 'Unknown manifest');
  const names = Object.keys(manifest.files).sort();
  assert(JSON.stringify(files(root).filter(p => p !== 'manifest.json')) === JSON.stringify(names), 'Missing or extra files');
  for (const p of names) assert(sha(read(root, p)) === manifest.files[p], `Checksum mismatch: ${p}`);
  assert(sha(json(manifest.files)) === manifest.contentHash, 'Version mismatch');
  validate(root);
  return manifest;
}
function validate(root) {
  const m = JSON.parse(read(root, 'metadata.json'));
  assert(m.status === 'draft', 'Archive input must remain draft');
  assert(m.seo?.title?.trim() && m.seo?.description?.trim(), 'SEO required');
  assert(m.seo.sourceCanonical === `https://www.thebridgetherapy.com/blog/${m.id}/` && m.legacyPath === `/blog/${m.id}/`, 'Incorrect canonical/path');
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(m.id), 'Invalid slug');
  assert(m.status === 'draft', 'Archive must remain draft');
  assert(m.legacyPath === `/blog/${m.id}/`, 'Incorrect route');
  assert(m.seo?.sourceCanonical === `https://www.thebridgetherapy.com${m.legacyPath}`, 'Incorrect canonical');
  assert(typeof m.title === 'string' && m.title.trim() && m.seo.title?.trim() && m.seo.description?.trim(), 'Missing SEO');
  assert(/^\d{4}-\d{2}-\d{2}$/.test(m.publicationDate) && !Number.isNaN(Date.parse(m.publicationDate)) && new Date(m.publicationDate).toISOString().slice(0,10) === m.publicationDate && m.publishedAt === m.publicationDate && m.publicationTimezone === 'America/Chicago', 'Incorrect date');
  assert(m.displayedByline === 'Jennifer Wood LPC-S' && m.authorType === 'Person' && m.authorProfilePath === '/therapists/jennifer-wood/', 'Incorrect author');
  const approval = JSON.parse(read(root, 'capture.json'));
  assert(approval.slug === m.id && approval.publicationDate === m.publicationDate && typeof approval.authorization === 'string' && approval.authorization.trim(), 'Capture authorization/date mismatch');
  assert(Array.isArray(approval.originals) && approval.originals.length > 0 && new Set(approval.originals).size === approval.originals.length, 'Original image list required');
  for (const p of approval.originals) {
    assert(/^images\/[a-zA-Z0-9_.-]+\.(jpeg|jpg|png|webp)$/.test(p), 'Unsafe original path');
    const b = read(root,p); assert(b.length > 12 && ((b[0] === 255 && b[1] === 216 && b[2] === 255) || b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])) || (b.toString('ascii',0,4) === 'RIFF' && b.toString('ascii',8,12) === 'WEBP')), 'Invalid raster original');
  }
  const local = src => {
    assert(typeof src === 'string' && src.startsWith(`/assets/blog/${m.id}/`) && !/[?#%\\]/.test(src), 'External/unsafe rendered image');
    const name = src.slice(`/assets/blog/${m.id}/`.length);
    assert(!name.includes('/') && approval.originals.includes(`images/${name}`), 'Image not retained as original');
  };
  local(m.featuredImage?.src);
  assert(m.featuredImage.alt?.trim() && m.featuredImage.width > 0 && m.featuredImage.height > 0, 'Image metadata required');
  assert(m.seo.sourceOpenGraphImage === `https://www.thebridgetherapy.com${m.featuredImage.src}`, 'Incorrect OG image');
  const body = read(root,'body.html').toString(); assert(body.trim(), 'Empty body');
  function walk(n) {
    assert(!n.tagName || ['p','div','section','article','aside','h2','h3','h4','h5','h6','ul','ol','li','strong','b','em','i','a','img','figure','figcaption','blockquote','table','thead','tbody','tr','th','td','br','hr','span','details','summary','sup','sub','caption'].includes(n.tagName), 'Unsafe body element');
    for (const a of n.attrs || []) assert(!/^on/i.test(a.name) && !['style','srcdoc','srcset'].includes(a.name) && !/^(?:javascript|data):/i.test(a.value.trim()), 'Unsafe body attribute');
    if(n.tagName === 'img') { const a=Object.fromEntries(n.attrs.map(a=>[a.name,a.value]));local(a.src);assert(a.alt?.trim(),'Image alt required'); }
    for(const c of n.childNodes || []) walk(c);
  }
  walk(parseFragment(body));
  const allowed = new Set(['metadata.json','body.html','capture.json','manifest.json', ...approval.originals]);
  assert(files(root).every(p => allowed.has(p)), 'Unexpected/private source file');
  return m;
}
export function pack(input, repo) {
  const m = validate(input);
  for (const group of ['blog','new-blog']) {
    for (const f of files(path.join(repo,'content',group)).filter(p=>p.endsWith('/metadata.json'))) {
      const old = JSON.parse(read(path.join(repo,'content',group),f));
      assert(old.id !== m.id && old.legacyPath !== m.legacyPath, 'Duplicate approved path');
    }
  }
  const entries = Object.fromEntries(files(input).filter(p=>p!=='manifest.json').map(p=>[p,sha(read(input,p))]));
  const hash = sha(json(entries));
  for(const part of ['content','content/article-archive',`content/article-archive/${m.id}`]) { const p=path.join(repo,part);if(fs.existsSync(p)) assert(fs.lstatSync(p).isDirectory() && !fs.lstatSync(p).isSymbolicLink(),'Unsafe archive destination'); }
  const dest = path.join(repo,'content','article-archive',m.id,hash);
  if(fs.existsSync(dest)) { verify(dest);return dest; }
  fs.mkdirSync(path.dirname(dest),{recursive:true});
  const temp = fs.mkdtempSync(path.join(path.dirname(dest),'.capture-'));
  try {
    for (const p of Object.keys(entries)) { fs.mkdirSync(path.dirname(path.join(temp,p)),{recursive:true});fs.writeFileSync(path.join(temp,p),read(input,p),{flag:'wx'}); }
    fs.writeFileSync(path.join(temp,'manifest.json'),json({version:1,kind:'bridge-private-article-archive',contentHash:hash,files:entries}));
    verify(temp);fs.renameSync(temp,dest);
  } finally { if(fs.existsSync(temp)) fs.rmSync(temp,{recursive:true}); }
  return dest;
}
export function baseline(repo) {
  const entries={};
  for(const dir of ['content/blog','content/new-blog','public/assets/blog']) for(const p of files(path.join(repo,dir))) entries[`${dir}/${p}`]=sha(read(repo,`${dir}/${p}`));
  return {version:1,files:entries};
}
