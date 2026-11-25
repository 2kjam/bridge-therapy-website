import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { stagingArticleCover } from '../lib/babylovegrowth/cover.ts';
const draft = { id: 1320874, slug: 'emotional-regulation-therapy', title: 'Emotional Regulation Therapy' };
test('missing cover gets one reviewed local fallback with descriptive alt and stable dimensions', () => {
  const cover = stagingArticleCover(draft);
  assert.equal(cover.state, 'missing-vendor-cover');
  assert.equal(cover.alt, 'Person writing in a notebook');
  assert.ok(fs.existsSync('public' + cover.src));
  assert.equal(cover.metadataUrl, 'https://www.thebridgetherapy.com' + cover.src);
  assert.deepEqual([cover.width, cover.height], [800, 1227]);
});
test('valid intended vendor cover takes precedence; invalid URLs never reach markup or metadata', () => {
  const url = 'https://media.babylovegrowth.ai/blog-images/organization-65684/reviewed-cover.jpeg';
  const cover = stagingArticleCover({ ...draft, hero_image_url: url });
  assert.equal(cover.state, 'vendor-cover'); assert.equal(cover.metadataUrl, url);
  assert.equal(cover.src, '/api/cms-media/?slug=emotional-regulation-therapy&file=reviewed-cover.jpeg');
  for (const hero_image_url of ['https://attacker.example/cover.jpg', 'javascript:alert(1)', '/logo.jpg']) {
    const fallback = stagingArticleCover({ ...draft, hero_image_url });
    assert.equal(fallback.state, 'invalid-vendor-cover'); assert.ok(fallback.src.startsWith('/assets/'));
  }
});
test('fallback cannot change any other article or a mismatched identity', () => {
  for (const article of [undefined, { ...draft, id: 1 }, { ...draft, slug: 'other' }]) assert.equal(stagingArticleCover(article), undefined);
});
