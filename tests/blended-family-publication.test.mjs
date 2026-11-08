import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {parse,parseFragment} from 'parse5';
const root='content/new-blog/blended-family-counseling';
const post=JSON.parse(fs.readFileSync(root+'/metadata.json','utf8'));
const evidence=JSON.parse(fs.readFileSync(root+'/source.json','utf8'));
const html=fs.readFileSync(root+'/body.html','utf8');
const all=(n,p)=>[...(p(n)?[n]:[]),...(n.childNodes??[]).flatMap(c=>all(c,p))];
const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
const doc=parse(fs.readFileSync('.next/server/app/blog/blended-family-counseling.html','utf8'));
test('only the approved static snapshot is promoted with truthful provenance',()=>{
 assert.equal(evidence.vendorArticleId,1077552);assert.equal(post.status,'published');
 assert.equal(post.publicationDate,'2026-11-08');assert.equal(post.displayedByline,'Jennifer Wood LPC-S');
 assert.equal(post.authorProfilePath,'/therapists/jennifer-wood/');
 assert.equal(crypto.createHash('sha256').update(html).digest('hex'),evidence.reviewedBodySha256);
 assert.doesNotMatch(html,/cms-media|cms-preview|BabyLoveGrowth|\bAdam\b|ranking guarantee/i);
 assert.match(html,/clinical framework and case example, not a guarantee/);
 assert.match(html,/rather than a requirement for every family/);
 assert.match(html,/Acceptance cannot be forced or guaranteed/);
});
test('article retains its cited sources, answer structure and accessible mobile table',()=>{
 const body=parseFragment(html);const links=all(body,n=>n.tagName==='a').map(n=>attr(n,'href'));
 for(const source of ['apa.org/pubs/books/4317274','onlinelibrary.wiley.com/doi/10.1111/famp.12321','EFFT_Blended_Furrow_2007.pdf','americanbar.org/groups/family_law','nbcc.org/resources/nccs','TherapywithStepfamiliesRonLDeal.pdf','counseling.org/publications/aca-books'])assert.ok(links.some(h=>h.includes(source)),source);
 assert.match(html,/^<div[^>]*>\s*<p>Blended family counseling is therapy/);
 assert.equal(all(body,n=>n.tagName==='aside').length,3);
 const region=all(body,n=>attr(n,'class')==='blog-table-scroll')[0];assert.equal(attr(region,'tabindex'),'0');assert.equal(attr(region,'role'),'region');
 assert.equal(all(region,n=>n.tagName==='th'&&attr(n,'scope')==='col').length,3);
 for(const image of all(body,n=>n.tagName==='img')){assert.ok(attr(image,'src').startsWith('/assets/'));assert.ok(Number(attr(image,'width')));assert.ok(Number(attr(image,'height')));assert.equal(attr(image,'loading'),'lazy');}
 assert.equal(all(doc,n=>n.tagName==='h1').length,1);
 assert.equal(all(doc,n=>attr(n,'class')==='blog-author-card').length,1);
});
