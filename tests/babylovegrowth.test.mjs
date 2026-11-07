import test from 'node:test';
import assert from 'node:assert/strict';
import { stagingBuildAllowed, previewEnabled, validArticle, cleanArticleHtml } from '../lib/babylovegrowth/policy.mjs';
const configured = { BRIDGE_BABYLOVE_PREVIEW: 'true', BABYLOVEGROWTH_BLOG_API_KEY: 'test-placeholder' };
test('preview is opt-in and never enabled on production site', () => {
  assert.equal(previewEnabled({}), false);
  assert.equal(previewEnabled({...configured, NODE_ENV: 'production'}), false);
  assert.equal(previewEnabled({...configured, NETLIFY:'true', SITE_ID:'1c0ce777-b889-4f6b-8292-ef7590a4a25e', BRANCH:'main'}), false);
  assert.equal(previewEnabled({...configured, NETLIFY:'true', SITE_ID:'c9ac64dc-b248-4666-bc90-6219f2b483a4', BRANCH:'main'}), false);
  assert.equal(previewEnabled({...configured, NETLIFY:'true', SITE_ID:'c9ac64dc-b248-4666-bc90-6219f2b483a4', BRANCH:'staging'}), true);
  assert.equal(previewEnabled({...configured, NODE_ENV:'development'}), true);
});
test('only published articles belonging to the correct website pass', () => {
  const article = { id:1, title:'Example', slug:'example-article', published:true, orgWebsite:'https://thebridgetherapy.com/' };
  assert.equal(validArticle(article), true);
  for (const patch of [{published:false},{published:'true'},{orgWebsite:'https://thebridgetherapy.com.attacker.example'},{orgWebsite:'https://user@thebridgetherapy.com'}, {slug:'../example'},{id:'1'},{title:''}]) assert.equal(validArticle({...article,...patch}), false);
  assert.equal(validArticle(null), false);
});
test('external HTML is sanitized before rendering', () => {
  const clean = cleanArticleHtml('<h1>Title</h1><script>alert(1)</script><img src="https://tracker.example/x" onerror="alert(1)"><iframe src="x"></iframe><form>secret<input></form><a href="javascript:alert(1)" onclick="alert(1)">bad</a><a href="//tracker.example">relative host</a><a href="https://example.com" style="color:red">safe</a><p>Content</p>');
  assert.match(clean, /<h2>Title<\/h2>/);
  assert.match(clean, /safe/);
  assert.doesNotMatch(clean, /<script|<img|<iframe|<form|<input|onclick|javascript:|style=|href="\/\//);
});

test('build identity safely survives absent serverless build variables', () => {
  const staging = { SITE_ID:'c9ac64dc-b248-4666-bc90-6219f2b483a4', BRANCH:'staging' };
  assert.equal(stagingBuildAllowed(staging), true);
  assert.equal(stagingBuildAllowed({...staging, BRANCH:'main'}), false);
  assert.equal(stagingBuildAllowed({...staging, SITE_ID:'production'}), false);
  assert.equal(stagingBuildAllowed({BRIDGE_BUILD_CMS_STAGING:'true'}), false);
  assert.equal(previewEnabled({...configured, NODE_ENV:'production'}, true), true);
  assert.equal(previewEnabled({...configured, NODE_ENV:'production'}, false), false);
  assert.equal(previewEnabled({NODE_ENV:'production'}, true), false);
});
