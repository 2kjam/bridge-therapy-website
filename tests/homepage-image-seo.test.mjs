import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {parse} from 'parse5';
const doc=parse(fs.readFileSync('.next/server/app/index.html','utf8'));
const all=(n,p)=>[...(p(n)?[n]:[]),...(n.childNodes??[]).flatMap(c=>all(c,p))];
const attr=(n,key)=>n.attrs?.find(a=>a.name===key)?.value;
const has=(n,c)=>attr(n,'class')?.split(' ').includes(c);

test('homepage images retain accessible names and intentional decorative alternatives',()=>{
  const images=all(doc,n=>n.tagName==='img');
  assert.ok(images.length>20);
  for(const image of images) assert.notEqual(attr(image,'alt'),undefined);
  const originals=all(doc,n=>n.tagName==='li'&&attr(n,'data-duplicate')===undefined).flatMap(n=>all(n,c=>c.tagName==='img'&&attr(c,'src')?.includes('/delivery/insurance-')));
  assert.equal(originals.length,10);
  assert.ok(originals.every(n=>attr(n,'alt')?.trim()));
  assert.ok(originals.some(n=>attr(n,'alt')==='UMR insurance logo'));
  const duplicates=all(doc,n=>n.tagName==='li'&&attr(n,'data-duplicate')!==undefined);
  assert.equal(duplicates.length,12);
  for(const item of duplicates){ assert.equal(attr(item,'aria-hidden'),'true'); for(const image of all(item,n=>n.tagName==='img')) assert.equal(attr(image,'alt'),''); }
  for(const image of images.filter(n=>has(n,'ivory-hero-photo')||has(n,'ivory-next-background')||attr(n,'src')?.includes('/menu/kalynne-')||attr(n,'src')?.includes('/menu/resources-blog-'))) assert.equal(attr(image,'alt'),'');
});

test('decorative backgrounds offer responsive AVIF and WebP with preserved loading priorities',()=>{
  for(const css of ['ivory-hero-photo','ivory-next-background']){
    const img=all(doc,n=>n.tagName==='img'&&has(n,css))[0];
    assert.equal(img.parentNode.tagName,'picture');
    const source=all(img.parentNode,n=>n.tagName==='source')[0];
    assert.equal(attr(source,'type'),'image/avif');
    assert.equal(attr(source,'style'),'display:none', 'Global reset must not turn source into an invisible flex item');
    assert.match(attr(source,'srcset'),/1080\.avif 1080w.*1448\.avif 1448w.*2172\.avif 2172w/);
    assert.match(attr(img,'src'),/\.webp$/);
    assert.doesNotMatch(attr(img,'srcset'),/\.jpg/);
    assert.equal(attr(img,'width'),'2172');assert.equal(attr(img,'height'),'724');
    if(css==='ivory-hero-photo')assert.equal(attr(img,'fetchpriority'),'high');
    else assert.equal(attr(img,'loading'),'lazy');
  }
});
