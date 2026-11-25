import test from 'node:test';
import assert from 'node:assert/strict';
import { stagingArticleCover } from '../lib/babylovegrowth/cover.ts';
const draft = { id: 1320874, slug: 'emotional-regulation-therapy' };
test('exact approved draft uses its verified original cover through the same-origin proxy', () => {
  const cover = stagingArticleCover(draft);
  assert.equal(cover.state, 'verified-original-cover');
  assert.equal(cover.alt, 'Client pausing during an emotion regulation session');
  assert.equal(cover.src, '/api/cms-media/?slug=emotional-regulation-therapy&file=' + cover.file);
  assert.equal(cover.metadataUrl, 'https://media.ai-fast-cdn.com/blog-images/organization-65684/' + cover.file);
  assert.deepEqual([cover.width, cover.height], [1280, 720]);
  assert.doesNotMatch(JSON.stringify(cover), /notebook|anxiety-800|thebridgetherapy\.jpg/);
});
test('identity and upstream URL are pinned; input cannot select a substitute or an arbitrary host', () => {
  for (const article of [undefined, { ...draft, id: 1 }, { ...draft, slug: 'other' }]) assert.equal(stagingArticleCover(article), undefined);
  for (const hero_image_url of ['https://attacker.example/cover.jpg', 'javascript:alert(1)', '/logo.jpg', null]) assert.deepEqual(stagingArticleCover({ ...draft, hero_image_url }), stagingArticleCover(draft));
});
