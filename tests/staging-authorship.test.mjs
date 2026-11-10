import test from "node:test";
import assert from "node:assert/strict";
import { stagingArticleAuthor } from "../lib/babylovegrowth/authorship.ts";
import { stagingArticleMetadata } from "../lib/babylovegrowth/presentation.ts";

test("only the owner-approved exact drafts receive Jennifer attribution", () => {
  const articles = [
    { id: 1077552, slug: "blended-family-counseling" },
    { id: 1083766, slug: "christian-grief-counseling" },
    { id: 1086181, slug: "marriage-communication-problems" },
  ];
  for (const article of articles) {
    assert.deepEqual(stagingArticleAuthor(article), { name: "Jennifer Wood LPC-S", profilePath: "/therapists/jennifer-wood/" });
    assert.equal(stagingArticleAuthor({ ...article, id: 9999999 }), undefined);
    assert.equal(stagingArticleAuthor({ ...article, slug: "another-draft" }), undefined);
  }
  assert.equal(stagingArticleAuthor({ id: 1083766, slug: "marriage-communication-problems" }), undefined);
  assert.equal(stagingArticleAuthor({ id: 1069980, slug: "online-couples-counseling" }), undefined);
});

test("SEO descriptions are scoped to the two drafts and do not imply publication or clinical review", () => {
  for (const article of [
    { id: 1083766, slug: "christian-grief-counseling" },
    { id: 1086181, slug: "marriage-communication-problems" },
  ]) {
    const input = { ...article, title: "Original title", meta_description: "Original description" };
    const seo = stagingArticleMetadata(input);
    assert.ok(seo.title.length <= 65);
    assert.ok(seo.description.length <= 160);
    assert.match(seo.description, /Tyler, TX/);
    assert.doesNotMatch(JSON.stringify(seo), /clinically reviewed|datePublished|dateModified|ratingValue/i);
    assert.deepEqual(stagingArticleMetadata({ ...input, id: 9999999 }), { title: "Original title | The Bridge", description: "Original description" });
  }
});
