import test from "node:test";
import assert from "node:assert/strict";
import { stagingArticleAuthor } from "../lib/babylovegrowth/authorship.ts";
test("only the owner-approved exact draft receives Jennifer attribution", () => {
  const article = { id: 1077552, slug: "blended-family-counseling" };
  assert.deepEqual(stagingArticleAuthor(article), { name: "Jennifer Wood LPC-S", profilePath: "/therapists/jennifer-wood/" });
  for (const other of [{ ...article, id: 1077553 }, { ...article, slug: "another-draft" }, { id: 1069980, slug: "online-couples-counseling" }]) assert.equal(stagingArticleAuthor(other), undefined);
});
