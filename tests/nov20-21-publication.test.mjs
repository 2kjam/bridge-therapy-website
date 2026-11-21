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
for(const [slug,date,hash,count] of [
 ['therapy-for-emotional-abuse','2026-11-20','b6ca66118285084cd55ce37b223f9abfe3b04828b23f164b0acc4be88b4d99f3',133],
 ['adhd-relationship-problems','2026-11-21','4fbc8fc1028464bf771e9fe5cd82ffed190a791ed680b824e44a6fce08186f99',130],
]){
 const root=`content/new-blog/${slug}`,post=JSON.parse(fs.readFileSync(`${root}/metadata.json`,'utf8'));
 const html=fs.readFileSync(`${root}/body.html`,'utf8'),body=parseFragment(html);
 test(`${slug}: exact reviewed wording, approved dates, author and original responsive images`,()=>{
  assert.equal(post.status,'published');assert.equal(post.publishedAt,date);assert.equal(post.publicationDate,date);assert.equal(post.publicationTimezone,'America/Chicago');
  assert.equal(post.displayedByline,'Jennifer Wood LPC-S');assert.equal(post.authorType,'Person');assert.equal(post.authorProfilePath,'/therapists/jennifer-wood/');
  const blocks=all(body,n=>['p','h2','h3','h4','li','th','td'].includes(n.tagName)).map(n=>text(n).replace(/\s+/g,' ').trim());
  assert.equal(blocks.length,count);assert.equal(sha(JSON.stringify(blocks)),hash);
  assert.doesNotMatch(html,/cms-media|cms-preview|<iframe|<script|\bAdam\b|BabyLoveGrowth/i);
  for(const image of [post.featuredImage,...all(body,n=>n.tagName==='img').map(n=>({src:attr(n,'src'),alt:attr(n,'alt'),width:Number(attr(n,'width')),height:Number(attr(n,'height'))}))]){
   assert.ok(image.alt);const record=registry[image.src];assert.ok(record);assert.equal(sha(fs.readFileSync('public'+image.src)),record.sha256);assert.equal(image.width,record.originalWidth);assert.equal(image.height,record.originalHeight);
   assert.equal(record.variants.length,3);for(const v of record.variants)assert.ok(fs.existsSync('public'+v.src));
  }
  for(const image of all(body,n=>n.tagName==='img')){assert.equal(attr(image,'loading'),'lazy');assert.ok(attr(image,'srcset'));}
  const ids=new Set(all(body,n=>attr(n,'id')).map(n=>attr(n,'id')));for(const a of all(body,n=>n.tagName==='a'&&attr(n,'href')?.startsWith('#')))assert.ok(ids.has(attr(a,'href').slice(1)));
 });
 test(`${slug}: one H1, canonical, dates, SEO metadata and verified Person schema/card`,()=>{
  const doc=parse(fs.readFileSync(`.next/server/app/blog/${slug}.html`,'utf8'));
  assert.equal(all(doc,n=>n.tagName==='h1').length,1);assert.equal(text(all(doc,n=>n.tagName==='h1')[0]),post.title);
  assert.equal(text(all(doc,n=>n.tagName==='title')[0]),post.seo.title);assert.ok(post.seo.title.length<=65);
  assert.equal(attr(all(doc,n=>attr(n,'name')==='description')[0],'content'),post.seo.description);
  assert.equal(attr(all(doc,n=>attr(n,'rel')==='canonical')[0],'href'),`https://www.thebridgetherapy.com/blog/${slug}/`);
  assert.equal(attr(all(doc,n=>attr(n,'property')==='og:image')[0],'content'),post.seo.sourceOpenGraphImage);
  assert.equal(attr(all(doc,n=>attr(n,'property')==='article:published_time')[0],'content'),date);
  assert.equal(text(all(doc,n=>n.tagName==='time')[0]),blogDate(post));assert.equal(attr(all(doc,n=>n.tagName==='time')[0],'datetime'),date);
  assert.equal(all(doc,n=>attr(n,'class')==='blog-author-card').length,1);
  const schemas=all(doc,n=>n.tagName==='script'&&attr(n,'type')==='application/ld+json').map(n=>JSON.parse(text(n)));
  const article=schemas.flatMap(s=>s['@graph']??[s]).find(n=>n['@type']==='BlogPosting');assert.equal(article.datePublished,date);assert.equal(article.author['@type'],'Person');assert.equal(article.author.name,'Jennifer Wood LPC-S');assert.equal(article.author.url,'https://www.thebridgetherapy.com/therapists/jennifer-wood/');
  assert.doesNotMatch(text(all(doc,n=>n.tagName==='main')[0]),/Draft: awaiting publication approval/);
 });
}
test('exactly two approved snapshots lead the collection and no queued article is published',()=>{
 assert.equal(getPublishedBlogPosts().length,36);assert.deepEqual(getPublishedBlogPosts().slice(0,2).map(p=>[p.id,p.publicationDate]),[['adhd-relationship-problems','2026-11-21'],['therapy-for-emotional-abuse','2026-11-20']]);
 assert.equal(getPublishedBlogPosts().some(p=>p.id==='family-stress-management'),false);
});
