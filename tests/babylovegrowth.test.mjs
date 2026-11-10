import test from 'node:test';
import assert from 'node:assert/strict';
import { stagingBuildAllowed, previewEnabled, validArticle, validStagingArticle, cleanArticleHtml, articlePresentation } from '../lib/babylovegrowth/policy.mjs';
import { parseFragment, serialize } from 'parse5';
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

test('staging permits generated Bridge drafts without production publication', () => {
  const article = {id:1069980, slug:'online-couples-counseling', title:'Example', published:false, orgWebsite:'https://thebridgetherapy.com/'};
  assert.equal(validStagingArticle(article), true);
  assert.equal(validStagingArticle({...article,id:1069962,slug:'religious-trauma-therapy'}), true);
  assert.equal(validStagingArticle({...article,id:1069981}), true);
  assert.equal(validStagingArticle({...article,slug:'different-article'}), true);
  assert.equal(validStagingArticle({...article,orgWebsite:'https://other.example'}), false);
  assert.equal(validArticle(article), false);
});

test('restores safe image, semantic layout and anchored links without supplied styles', () => {
  const src = 'https://media.babylovegrowth.ai/blog-images/organization-65684/1793990449656_Abstract-bridge.jpeg';
  const html = `<h1>My title</h1><div data-cta-card="true" style="position:fixed"><div>CTA copy</div><a href="https://thebridgetherapy.com/contact/">Contact</a></div><h2 id="details">Details</h2><a href="#details">Jump</a><img src="${src}" alt='Photo & "caption"' onerror="alert(1)"><table><tr><td colspan="2">Value</td></tr></table>`;
  const clean = cleanArticleHtml(html, 'online-couples-counseling', 'My title');
  assert.doesNotMatch(clean, /My title|onerror|style=|src="https:/);
  assert.match(clean, /class="cms-cta blog-support-card"/);
  assert.match(clean, /id="cms-details"/);
  assert.match(clean, /href="#cms-details"/);
  assert.match(clean, /href="\/contact\/"/);
  assert.match(clean, /src="\/api\/cms-media\/\?slug=online-couples-counseling&amp;file=/);
  assert.match(clean, /alt="Photo &amp; &quot;caption&quot;"/);
  assert.match(clean, /colspan="2"/);
});
test('only organization raster media is permitted; traversal and tracking rejected', async () => {
  const {safeImageUrl, articleImageUrls} = await import('../lib/babylovegrowth/policy.mjs');
  const base = 'https://media.babylovegrowth.ai/blog-images/organization-65684/';
  assert.equal(safeImageUrl(base + 'photo.jpeg'), base + 'photo.jpeg');
  for (const url of [base+'photo.svg',base+'photo.jpeg?track=1',base+'photo.jpeg#x',base+'../private.jpeg',base+'%2fprivate.jpeg','https://evil.example/photo.jpeg',base.replace('65684','1')+'photo.jpeg','http://media.babylovegrowth.ai/blog-images/organization-65684/photo.jpeg']) assert.equal(safeImageUrl(url), null);
  assert.deepEqual(articleImageUrls(`<img src="${base}photo.jpeg"><script><img src="${base}bad.jpeg"></script><img src="https://tracker.example/x">`), [base+'photo.jpeg']);
});


test('pagination includes older generated articles and deduplicates by ID', async () => {
  const {collectStagingArticles} = await import('../lib/babylovegrowth/policy.mjs');
  const item = i => ({id:i,slug:`article-${i}`,title:'Article',published:false,orgWebsite:'https://thebridgetherapy.com/'});
  const seen=[];
  const result=await collectStagingArticles(async opts => { seen.push(opts); return opts.offset===0 ? Array.from({length:50},(_,i)=>item(i+1)) : [item(50),item(51)]; });
  assert.equal(result.length,51); assert.equal(seen[1].offset,50); assert.equal(seen[0].publishedOnly,false);
  await assert.rejects(()=>collectStagingArticles(async()=>Array.from({length:50},(_,i)=>item(i+1))), /did not advance/);
});

test('requested personal-name removal is scoped to the two staging articles', () => {
  assert.equal(cleanArticleHtml('<p>Adam</p><p>Welcome Adam.</p>', 'religious-trauma-therapy'), '<p></p><p>Welcome .</p>');
  assert.equal(cleanArticleHtml('<p>Adam</p>', 'unrelated-article'), '<p>Adam</p>');
});

 test('removes only requested standalone vendor credits on the two staging articles', () => {
  const credit = '<p><a href="https://www.babylovegrowth.ai/">Created with BabyLoveGrowth, an AI writing tool</a></p>';
  for (const slug of ['online-couples-counseling', 'religious-trauma-therapy']) {
    assert.equal(cleanArticleHtml('<p>Article body</p>'+credit, slug), '<p>Article body</p>');
    assert.match(cleanArticleHtml('<p>We discussed BabyLoveGrowth.</p>', slug), /BabyLoveGrowth/);
  }
  assert.match(cleanArticleHtml(credit, 'another-article'), /Created with BabyLoveGrowth/);
});


test("CMS card semantics preserve text and distinguish headings from paragraphs", () => {
  const html = '<div data-cta-card="true"><div><div><span>THE BRIDGE</span></div><div>Family support</div><div>First paragraph.</div><div>Second paragraph.</div><a href="/contact/">Contact us</a></div></div>';
  const result = cleanArticleHtml(html, "blended-family-counseling");
  assert.match(result, /<h2>Family support<\/h2>/);
  assert.match(result, /<p>First paragraph.<\/p><p>Second paragraph.<\/p>/);
  assert.match(result, /href="\/contact\/"/);
});

test("CMS hero uses the shared production class without duplication or article-text loss", () => {
  const image = 'https://media.babylovegrowth.ai/blog-images/organization-65684/hero.jpeg';
  const clean = cleanArticleHtml(`<p><img src="${image}" alt="Counseling illustration"></p><h2 id="answer">An answer</h2><p>Preserved text.</p>`, 'christian-grief-counseling');
  const result = articlePresentation(clean);
  assert.match(result.heroHtml, /class="blog-featured-image"/);
  assert.match(result.heroHtml, /fetchpriority="high"/);
  assert.match(result.heroHtml, /alt="Counseling illustration"/);
  assert.equal(result.bodyHtml, '<h2 id="cms-answer">An answer</h2><p>Preserved text.</p>');
  assert.doesNotMatch(result.bodyHtml, /<img/);
  const mixed = `<p>Keep the introduction <img src="${image}" alt="Illustration"></p>`;
  const retained = cleanArticleHtml(mixed, 'christian-grief-counseling');
  assert.equal(articlePresentation(retained).heroHtml, '');
  assert.equal(articlePresentation(retained).bodyHtml, serialize(parseFragment(retained)));
});

test("communication table gets semantic headers and a keyboard-accessible overflow region", () => {
  const clean = cleanArticleHtml('<table><tr><td>Pattern</td><td>What it looks like</td><td>What helps instead</td></tr><tr><td>Criticism</td><td>Blame</td><td>Name a behavior</td></tr></table>');
  const { bodyHtml } = articlePresentation(clean);
  assert.match(bodyHtml, /role="region" aria-label="Article table 1" tabindex="0"/);
  assert.equal((bodyHtml.match(/<th scope="col">/g) ?? []).length, 3);
  assert.match(bodyHtml, /<td>Criticism<\/td><td>Blame<\/td><td>Name a behavior<\/td>/);
  const unrelated = articlePresentation(cleanArticleHtml('<table><tr><td>A</td><td>B</td></tr></table>'));
  assert.doesNotMatch(unrelated.bodyHtml, /<th/);
});

test("internal editorial links remain ordinary links and external links stay protected", () => {
  const clean = cleanArticleHtml('<a href="https://www.thebridgetherapy.com/grief-counseling-tyler/">Grief support</a><a href="#answer">Answer</a><a href="https://example.com/">Reference</a>');
  assert.match(clean, /<a href="\/grief-counseling-tyler\/">Grief support<\/a>/);
  assert.match(clean, /<a href="#cms-answer">Answer<\/a>/);
  assert.match(clean, /<a href="https:\/\/example.com\/" rel="noopener noreferrer nofollow">Reference<\/a>/);
});
