import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {parse} from 'parse5';
import {getPublishedBlogPosts} from '../lib/blog.ts';
const all=(n,f)=>[...(f(n)?[n]:[]),...(n.childNodes??[]).flatMap(c=>all(c,f))];
const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
const txt=n=>n.nodeName==='#text'?n.value:(n.childNodes??[]).map(txt).join('');
for(const [slug,date] of [['adjustment-disorder-therapy','2026-11-10'],['how-much-does-therapy-cost-in-texas','2026-11-11']])test(`${slug}: approved snapshot, date, links, image and author schema`,()=>{
 const post=getPublishedBlogPosts().find(p=>p.id===slug);assert.ok(post);assert.equal(post.publicationDate,date);assert.equal(post.publishedAt,date);assert.equal(post.displayedByline,'Jennifer Wood LPC-S');
 assert.doesNotMatch(post.bodyHtml,/cms-media|BabyLoveGrowth|Created using|Adam Wood|<script|<style/);
 const d=parse(fs.readFileSync(`.next/server/app/blog/${slug}.html`,'utf8'));
 assert.equal(all(d,n=>n.tagName==='h1').length,1);
 assert.equal(all(d,n=>n.tagName==='time')[0].attrs.find(a=>a.name==='datetime').value,date);
 const ids=all(d,n=>attr(n,'id')).map(n=>attr(n,'id'));assert.equal(ids.length,new Set(ids).size);
 for(const a of all(d,n=>n.tagName==='a'&&attr(n,'href')?.startsWith('#')))assert.ok(ids.includes(attr(a,'href').slice(1)));
 for(const i of all(d,n=>n.tagName==='img')){assert.ok(fs.existsSync('public'+attr(i,'src')));assert.ok(Number(attr(i,'width'))>0);assert.ok(Number(attr(i,'height'))>0);}
 const schema=JSON.parse(txt(all(d,n=>n.tagName==='script'&&attr(n,'type')==='application/ld+json')[0]));const article=schema['@graph'].find(n=>n['@type']==='BlogPosting');assert.equal(article.datePublished,date);assert.equal(article.author['@type'],'Person');assert.equal(article.author.name,'Jennifer Wood LPC-S');assert.equal(article.author.url,'https://www.thebridgetherapy.com/therapists/jennifer-wood/');
 assert.ok(all(d,n=>n.tagName==='link'&&attr(n,'rel')==='canonical').some(n=>attr(n,'href')===`https://www.thebridgetherapy.com/blog/${slug}/`));
});
test('release adds exactly the two approved newest snapshots in date order',()=>{
 assert.equal(getPublishedBlogPosts().length,27);assert.deepEqual(getPublishedBlogPosts().slice(0,2).map(p=>p.id),['how-much-does-therapy-cost-in-texas','adjustment-disorder-therapy']);
});
