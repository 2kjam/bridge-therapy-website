import test from 'node:test';
import assert from 'node:assert/strict';
import { stagingArticlePublication } from '../lib/babylovegrowth/presentation.ts';

test('only the exact November 21 vendor article receives the approved Central publication date',()=>{
 const article={id:1131611,slug:'adhd-relationship-problems'};
 const original={...article};
 const publication=stagingArticlePublication(article);
 assert.deepEqual(publication,{date:'2026-11-21',timezone:'America/Chicago',label:'November 21, 2026'});
 assert.equal(new Intl.DateTimeFormat('en-US',{dateStyle:'long',timeZone:publication.timezone}).format(new Date(publication.date+'T12:00:00Z')),publication.label);
 assert.deepEqual(article,original);
 for(const other of [{...article,id:1131612},{...article,slug:'therapy-for-emotional-abuse'},{id:1,slug:'future-draft'}])assert.equal(stagingArticlePublication(other),undefined);
});

test('the separately approved Emotional Abuse draft receives November 20 without dating other drafts',()=>{
 assert.deepEqual(stagingArticlePublication({id:1133079,slug:'therapy-for-emotional-abuse'}),{date:'2026-11-20',timezone:'America/Chicago',label:'November 20, 2026'});
 assert.equal(stagingArticlePublication({id:1131611,slug:'therapy-for-emotional-abuse'}),undefined);
 assert.equal(stagingArticlePublication({id:1133079,slug:'adhd-relationship-problems'}),undefined);
 assert.equal(stagingArticlePublication({id:1133079,slug:'family-stress-management'}),undefined);
});
