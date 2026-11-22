import test from 'node:test';
import assert from 'node:assert/strict';
import {stagingArticlePublication,stagingArticleMetadata} from '../lib/babylovegrowth/presentation.ts';
const article={id:1178256,slug:'family-stress-management',title:'Family Stress Management: Practical Ways to Calm Your Home',meta_description:'Source description'};
test('only the exact approved Family Stress draft gets the calendar November 22 date in Central time',()=>{
 const p=stagingArticlePublication(article);
 assert.deepEqual(p,{date:'2026-11-22',timezone:'America/Chicago',label:'November 22, 2026'});
 assert.equal(new Intl.DateTimeFormat('en-US',{dateStyle:'long',timeZone:p.timezone}).format(new Date(p.date+'T12:00:00Z')),p.label);
 assert.equal(stagingArticlePublication({...article,id:1178257}),undefined);
 assert.equal(stagingArticlePublication({...article,slug:'future-draft'}),undefined);
});
test('reviewed SEO title and source description apply only to the verified article identity',()=>{
 const seo=stagingArticleMetadata(article);assert.equal(seo.title,'Family Stress Management: Practical Ways to Help | The Bridge');assert.ok(seo.title.length<=65);
 assert.equal(seo.description,'Learn what drives family stress and the habits that ease it: talking, pausing, routines, boundaries and support. Plus when counseling in Tyler or online helps.');
 const other={...article,id:1178257};assert.deepEqual(stagingArticleMetadata(other),{title:other.title+' | The Bridge',description:other.meta_description});
});
