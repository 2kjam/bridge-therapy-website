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
for(const [slug,date] of [['christian-counseling-insurance','2026-11-18'],['anxiety-therapist-texas','2026-11-19']]){
 const root=`content/new-blog/${slug}`, post=JSON.parse(fs.readFileSync(`${root}/metadata.json`,'utf8'));
 const html=fs.readFileSync(`${root}/body.html`,'utf8'), body=parseFragment(html);
 test(`${slug}: approved author/date, preserved text and original responsive assets`,()=>{
  assert.equal(post.status,'published');assert.equal(post.publishedAt,date);assert.equal(post.publicationDate,date);assert.equal(post.publicationTimezone,'America/Chicago');
  assert.equal(post.displayedByline,'Jennifer Wood LPC-S');assert.equal(post.authorProfilePath,'/therapists/jennifer-wood/');assert.equal(post.authorType,'Person');
  assert.doesNotMatch(html,/cms-media|cms-preview|<iframe|<script|\bAdam\b|BabyLoveGrowth/i);
  const images=[post.featuredImage,...all(body,n=>n.tagName==='img').map(n=>({src:attr(n,'src'),alt:attr(n,'alt'),width:Number(attr(n,'width')),height:Number(attr(n,'height'))}))];
  assert.equal(images.length,slug==='anxiety-therapist-texas'?3:4);
  for(const image of images){
   assert.ok(image.alt);assert.ok(image.width);assert.ok(image.height);
   assert.ok(image.src.startsWith('/assets/blog/reviewed-2026-11-18-19/'));
   const record=registry[image.src];assert.ok(record);assert.equal(sha(fs.readFileSync('public'+image.src)),record.sha256);
   assert.equal(image.width,record.originalWidth);assert.equal(image.height,record.originalHeight);
   assert.equal(record.variants.length,3);for(const v of record.variants)assert.ok(fs.existsSync('public'+v.src));
  }
  for(const image of all(body,n=>n.tagName==='img')){assert.equal(attr(image,'loading'),'lazy');assert.ok(attr(image,'srcset'));}
  for(const th of all(body,n=>n.tagName==='th'))assert.equal(attr(th,'scope'),'col');
  if(slug==='anxiety-therapist-texas'){
   const blocks=all(body,n=>['p','h2','h3','h4','li','th','td'].includes(n.tagName)).map(n=>text(n).replace(/\s+/g,' ').trim());
   assert.equal(blocks.length,145);assert.equal(sha(JSON.stringify(blocks)),'5f599010c46c4e4662e93515464f46ade264abe8509e03d519ef8517af82873d');
  }else{
   assert.doesNotMatch(html,/Noridian|cannot submit Medicare claims|cannot bill Medicare|never cover|January 1, 202[56]|September 9, 2024/i);
   assert.match(html,/January 1, 2024/);assert.match(html,/Medicare-enrolled marriage and family therapists/);
   assert.match(html,/Medicare Part B covers certain outpatient mental health services, including family counseling when its main purpose is to help with your treatment/);
   assert.match(html,/MHPAEA parity rules do not apply to Medicare/);
   assert.match(html,/cms.gov\/medicare\/payment\/fee-schedules\/physician-fee-schedule\/marriage-family-therapists-mental-health-counselors/);
   assert.match(html,/medicare.gov\/coverage\/mental-health-care-outpatient/);assert.match(html,/dol.gov\/agencies\/ebsa/);
  }
 });
 test(`${slug}: built SEO, canonical, dates, Person schema and author card`,()=>{
  const doc=parse(fs.readFileSync(`.next/server/app/blog/${slug}.html`,'utf8'));
  assert.equal(all(doc,n=>n.tagName==='h1').length,1);assert.equal(text(all(doc,n=>n.tagName==='h1')[0]),post.title);
  assert.equal(text(all(doc,n=>n.tagName==='title')[0]),post.seo.title);
  assert.equal(attr(all(doc,n=>attr(n,'name')==='description')[0],'content'),post.seo.description);
  assert.equal(attr(all(doc,n=>attr(n,'rel')==='canonical')[0],'href'),`https://www.thebridgetherapy.com/blog/${slug}/`);
  assert.equal(attr(all(doc,n=>attr(n,'property')==='og:image')[0],'content'),post.seo.sourceOpenGraphImage);
  assert.equal(text(all(doc,n=>n.tagName==='time')[0]),blogDate(post));assert.equal(attr(all(doc,n=>n.tagName==='time')[0],'datetime'),date);
  assert.equal(all(doc,n=>attr(n,'class')==='blog-author-card').length,1);
  const schemas=all(doc,n=>n.tagName==='script'&&attr(n,'type')==='application/ld+json').map(n=>JSON.parse(text(n)));
  const article=schemas.flatMap(s=>s['@graph']??[s]).find(n=>n['@type']==='BlogPosting');
  assert.equal(article.datePublished,date);assert.equal(article.author['@type'],'Person');assert.equal(article.author.name,'Jennifer Wood LPC-S');assert.equal(article.author.url,'https://www.thebridgetherapy.com/therapists/jennifer-wood/');
 });
}
test('only the approved two articles lead the published collection in date order',()=>{
 assert.equal(getPublishedBlogPosts().length,34);
 assert.deepEqual(getPublishedBlogPosts().slice(0,2).map(p=>[p.id,p.publicationDate]),[['anxiety-therapist-texas','2026-11-19'],['christian-counseling-insurance','2026-11-18']]);
});
