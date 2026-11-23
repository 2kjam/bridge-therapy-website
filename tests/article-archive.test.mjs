import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pack,verify,baseline,assertPrivateArchive } from '../scripts/article-archive/archive.mjs';
function fixture(t) {
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'bridge-archive-'));t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
 const input=path.join(root,'input'),repo=path.join(root,'repo');
 fs.mkdirSync(path.join(input,'images'),{recursive:true});for(const g of ['blog','new-blog'])fs.mkdirSync(path.join(repo,'content',g),{recursive:true});
 execFileSync('git',['init','--quiet',repo]);fs.writeFileSync(path.join(repo,'.gitignore'),'/content/article-archive/\n');
 const src='/assets/blog/synthetic-archive/cover.png';
 const m={id:'synthetic-archive',legacyPath:'/blog/synthetic-archive/',status:'draft',title:'Synthetic fixture',publishedAt:'2026-11-23',publicationDate:'2026-11-23',publicationTimezone:'America/Chicago',displayedByline:'Jennifer Wood LPC-S',authorType:'Person',authorProfilePath:'/therapists/jennifer-wood/',seo:{title:'Synthetic fixture',description:'Fixture only',sourceCanonical:'https://www.thebridgetherapy.com/blog/synthetic-archive/',sourceOpenGraphImage:`https://www.thebridgetherapy.com${src}`},featuredImage:{src,alt:'Synthetic pixel',width:1,height:1}};
 fs.writeFileSync(path.join(input,'metadata.json'),JSON.stringify(m));fs.writeFileSync(path.join(input,'capture.json'),JSON.stringify({slug:m.id,publicationDate:m.publicationDate,authorization:'synthetic test only',originals:['images/cover.png']}));fs.writeFileSync(path.join(input,'body.html'),`<p>Fixture only</p><img src="${src}" alt="Synthetic pixel">`);
 fs.writeFileSync(path.join(input,'images/cover.png'),Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jGZkAAAAASUVORK5CYII=','base64'));
 return {root,input,repo,m,change(fn){fn(m);fs.writeFileSync(path.join(input,'metadata.json'),JSON.stringify(m));}};
}
test('deterministic private package is idempotent, original bytes retained, no route/public writes',t=>{const f=fixture(t);const dest=pack(f.input,f.repo);assert.equal(dest,pack(f.input,f.repo));assert.equal(verify(dest).contentHash,path.basename(dest));assert.deepEqual(fs.readFileSync(path.join(dest,'images/cover.png')),fs.readFileSync(path.join(f.input,'images/cover.png')));assert.equal(fs.existsSync(path.join(f.repo,'public')),false);assert.equal(fs.readdirSync(path.join(f.repo,'content/new-blog')).length,0);});
for(const mode of ['missing','mutated','extra','manifest'])test(`fails closed: ${mode}`,t=>{const f=fixture(t),d=pack(f.input,f.repo);if(mode==='missing')fs.unlinkSync(path.join(d,'body.html'));if(mode==='mutated')fs.appendFileSync(path.join(d,'body.html'),'changed');if(mode==='extra')fs.writeFileSync(path.join(d,'secret.txt'),'unexpected');if(mode==='manifest'){const p=path.join(d,'manifest.json'),m=JSON.parse(fs.readFileSync(p));m.contentHash='wrong';fs.writeFileSync(p,JSON.stringify(m));}assert.throws(()=>verify(d));});
for(const [name,fn] of [['canonical',m=>m.seo.sourceCanonical='https://other.example/'],['date',m=>m.publicationDate='2026-02-30'],['author',m=>m.displayedByline='Unknown'],['published',m=>m.status='published'],['external',m=>m.featuredImage.src='https://example.com/a.png']])test(`rejects incorrect ${name}`,t=>{const f=fixture(t);f.change(fn);assert.throws(()=>pack(f.input,f.repo));});
test('duplicate approved path rejected',t=>{const f=fixture(t),d=path.join(f.repo,'content/new-blog/existing');fs.mkdirSync(d);fs.writeFileSync(path.join(d,'metadata.json'),JSON.stringify({...f.m,id:'other'}));assert.throws(()=>pack(f.input,f.repo),/Duplicate/);});
test('symlinks, unsafe markup and absent originals rejected',t=>{const f=fixture(t);fs.symlinkSync(path.join(f.input,'body.html'),path.join(f.input,'secret'));assert.throws(()=>pack(f.input,f.repo),/symlink|symbolic/i);fs.unlinkSync(path.join(f.input,'secret'));fs.appendFileSync(path.join(f.input,'body.html'),'<script>alert(1)</script>');assert.throws(()=>pack(f.input,f.repo),/Unsafe/);});
test('actual 36 article baseline and original-retention evidence remain unchanged',()=>{const expected=JSON.parse(fs.readFileSync('scripts/article-archive/baseline.json'));assert.deepEqual(baseline(process.cwd()),expected);for(const [group,count]of [['blog',19],['new-blog',17]])assert.equal(fs.readdirSync(`content/${group}`).filter(p=>fs.existsSync(`content/${group}/${p}/metadata.json`)).length,count);});
for(const target of ['body.html','metadata.json','images/cover.png','manifest.json'])test(`verification rejects mutated ${target}`,t=>{const f=fixture(t),dest=pack(f.input,f.repo);fs.appendFileSync(path.join(dest,target),'x');assert.throws(()=>verify(dest));});
test('missing original, external body image, bad date and unsafe markup fail before packaging',t=>{const f=fixture(t);fs.unlinkSync(path.join(f.input,'images/cover.png'));assert.throws(()=>pack(f.input,f.repo));});
test('body cannot expose external media or execute markup',t=>{const f=fixture(t);for(const body of ['<img src="https://example.com/a.jpg" alt="x">','<script>alert(1)</script>','<svg onload="alert(1)"></svg>']){fs.writeFileSync(path.join(f.input,'body.html'),body);assert.throws(()=>pack(f.input,f.repo));}});
test('invalid calendar and wrong author fail',t=>{const f=fixture(t);f.change(m=>{m.publicationDate=m.publishedAt='2026-02-30';});assert.throws(()=>pack(f.input,f.repo));f.change(m=>{m.publicationDate=m.publishedAt='2026-11-23';m.displayedByline='Unknown';});assert.throws(()=>pack(f.input,f.repo));});
test('existing approved route cannot be overwritten',t=>{const f=fixture(t);const dir=path.join(f.repo,'content/new-blog/existing');fs.mkdirSync(dir);fs.writeFileSync(path.join(dir,'metadata.json'),JSON.stringify({id:'other',legacyPath:f.m.legacyPath}));assert.throws(()=>pack(f.input,f.repo),/Duplicate/);});
test('symlink originals and extra private files rejected',t=>{const f=fixture(t);fs.writeFileSync(path.join(f.input,'private.txt'),'fixture');assert.throws(()=>pack(f.input,f.repo));fs.unlinkSync(path.join(f.input,'private.txt'));fs.renameSync(path.join(f.input,'images/cover.png'),path.join(f.root,'cover.png'));fs.symlinkSync(path.join(f.root,'cover.png'),path.join(f.input,'images/cover.png'));assert.throws(()=>pack(f.input,f.repo),/symlink|symbolic/i);});

test('repository ignores entire archive and nested packages',()=>{
 assertPrivateArchive(process.cwd());
 for(const p of ['content/article-archive/','content/article-archive/test/version/images/original.jpeg'])assert.equal(execFileSync('git',['check-ignore','--',p],{encoding:'utf8'}).trim(),p);
});
test('Git verification failure or absent ignore rule prevents packaging',t=>{
 const f=fixture(t);fs.unlinkSync(path.join(f.repo,'.gitignore'));assert.throws(()=>pack(f.input,f.repo),/Git verification/);
 fs.rmSync(path.join(f.repo,'.git'),{recursive:true});assert.throws(()=>pack(f.input,f.repo),/Git verification/);
});
for(const name of ['content/article-archive','content/article-archive/nested/version/body.html'])test(`tracked archive path refused: ${name}`,t=>{
 const f=fixture(t),p=path.join(f.repo,name);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,'synthetic');execFileSync('git',['-C',f.repo,'add','--force','--',name]);assert.throws(()=>pack(f.input,f.repo),/tracked/);
});
test('archive and nested symlink escapes refused',t=>{
 const f=fixture(t),archive=path.join(f.repo,'content/article-archive');fs.symlinkSync(f.root,archive);assert.throws(()=>pack(f.input,f.repo),/symlink|symbolic/i);fs.unlinkSync(archive);fs.mkdirSync(archive);fs.symlinkSync(f.root,path.join(archive,'escape'));assert.throws(()=>pack(f.input,f.repo),/symlink|symbolic/i);
});
