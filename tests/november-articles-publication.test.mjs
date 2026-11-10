import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {parse,parseFragment} from 'parse5';
import {getPublishedBlogPosts,blogDate} from '../lib/blog.ts';
const all=(n,p)=>[...(p(n)?[n]:[]),...(n.childNodes??[]).flatMap(c=>all(c,p))];
const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
const text=n=>n.nodeName==='#text'?n.value:(n.childNodes??[]).map(text).join('');
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const registry=JSON.parse(fs.readFileSync('lib/presentation-images.json','utf8'));
for(const [slug,date,id] of [['christian-grief-counseling','2026-11-09',1083766],['marriage-communication-problems','2026-11-10',1086181]]){
 const root=`content/new-blog/${slug}`;
 const post=JSON.parse(fs.readFileSync(`${root}/metadata.json`,'utf8'));
 const source=JSON.parse(fs.readFileSync(`${root}/source.json`,'utf8'));
 const html=fs.readFileSync(`${root}/body.html`,'utf8');
 const body=parseFragment(html);
 test(`${slug}: approved dates, exact article text and local images`,()=>{
  assert.equal(post.status,'published');assert.equal(post.publishedAt,date);assert.equal(post.publicationDate,date);assert.equal(source.approvedPublicationDate,date);assert.equal(source.vendorArticleId,id);
  assert.equal(post.displayedByline,'Jennifer Wood LPC-S');assert.equal(post.authorProfilePath,'/therapists/jennifer-wood/');assert.equal(post.authorType,'Person');
  assert.equal(sha(html),source.reviewedBodySha256);assert.equal(sha(text(body).replace(/\s+/g,' ').trim()),source.approvedStagingTextSha256);
  assert.doesNotMatch(html,/openstreetmap|cms-media|cms-preview|<iframe|<script|\bAdam\b/i);
  assert.match(html,/href="\/contact\/#location"/);
  for(const image of all(body,n=>n.tagName==='img')){assert.ok(attr(image,'src').startsWith('/assets/blog/approved-2026-11/'));assert.ok(fs.existsSync('public'+attr(image,'src')));assert.ok(Number(attr(image,'width')));assert.ok(Number(attr(image,'height')));assert.equal(attr(image,'loading'),'lazy');assert.ok(attr(image,'alt'));}
  assert.equal(all(body,n=>n.tagName==='img').length,3);
  const hero=registry[post.featuredImage.src];assert.ok(hero);assert.equal(hero.variants.length,3);for(const v of hero.variants)assert.ok(fs.existsSync('public'+v.src));
  const anchors=new Set(all(body,n=>attr(n,'id')).map(n=>attr(n,'id')));
  for(const a of all(body,n=>n.tagName==='a'&&attr(n,'href')?.startsWith('#')))assert.ok(anchors.has(attr(a,'href').slice(1)));
  assert.equal(all(body,n=>n.tagName==='th'&&attr(n,'scope')==='col').length,3);
  assert.equal(all(body,n=>attr(n,'role')==='region'&&attr(n,'tabindex')==='0').length,1);
 });
 test(`${slug}: production metadata, schema, byline and navigation`,()=>{
  const doc=parse(fs.readFileSync(`.next/server/app/blog/${slug}.html`,'utf8'));
  assert.equal(all(doc,n=>n.tagName==='h1').length,1);
  assert.equal(text(all(doc,n=>n.tagName==='title')[0]),post.seo.title);
  assert.equal(attr(all(doc,n=>attr(n,'name')==='description')[0],'content'),post.seo.description);
  assert.equal(attr(all(doc,n=>attr(n,'rel')==='canonical')[0],'href'),`https://www.thebridgetherapy.com/blog/${slug}/`);
  assert.equal(text(all(doc,n=>n.tagName==='time')[0]),blogDate(post));assert.equal(attr(all(doc,n=>n.tagName==='time')[0],'datetime'),date);
  assert.equal(all(doc,n=>attr(n,'class')==='blog-author-card').length,1);
  const schemas=all(doc,n=>n.tagName==='script'&&attr(n,'type')==='application/ld+json').map(n=>JSON.parse(text(n)));
  const article=schemas.flatMap(s=>s['@graph']??[s]).find(n=>n['@type']==='BlogPosting');
  assert.equal(article.datePublished,date);assert.equal(article.dateModified,undefined);assert.equal(article.author.name,'Jennifer Wood LPC-S');assert.equal(article.author.url,'https://www.thebridgetherapy.com/therapists/jennifer-wood/');
  assert.doesNotMatch(text(all(doc,n=>n.tagName==='main')[0]),/Draft: awaiting publication approval|OpenStreetMap/);
 });
}
test('new dated articles are the newest two published records',()=>{
 assert.deepEqual(getPublishedBlogPosts().slice(0,2).map(p=>[p.id,p.publicationDate]),[['marriage-communication-problems','2026-11-10'],['christian-grief-counseling','2026-11-09']]);
});
