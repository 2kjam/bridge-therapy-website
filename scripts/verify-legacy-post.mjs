// Optional live verification, separate from deterministic offline regression tests.
import fs from "node:fs";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { parse, parseFragment } from "parse5";

const directory = "content/blog/navigating-life-transitions";
const record = JSON.parse(
  fs.readFileSync(`${directory}/metadata.json`, "utf8"),
);
const captured = JSON.parse(
  fs.readFileSync(`${directory}/source/item.json`, "utf8"),
);
const response = await fetch(`${record.source.url}?format=json`);
assert.equal(response.status, 200);
const live = (await response.json()).item;
for (const key of [
  "title",
  "publishOn",
  "excerpt",
  "fullUrl",
  "body",
  "assetUrl",
  "originalSize",
])
  assert.equal(live[key], captured[key], key);
assert.equal(live.author.displayName, record.displayedByline);
assert.deepEqual(live.seoData, captured.seoData);
const page = await fetch(record.source.url);
assert.equal(page.status, 200);
const document = parse(await page.text());
const attr = (n, name) => n.attrs?.find((a) => a.name === name)?.value;
const all = (node, predicate) => [
  ...(predicate(node) ? [node] : []),
  ...(node.childNodes ?? []).flatMap((child) => all(child, predicate)),
];
const text = (node) =>
  node.nodeName === "#text"
    ? node.value
    : (node.childNodes ?? []).map(text).join("");
const body = fs.readFileSync(`${directory}/body.html`, "utf8");
const block = all(
  document,
  (n) =>
    attr(n, "class") === "sqs-html-content" &&
    text(n).startsWith("Change is an inevitable part of life."),
)[0];
assert.equal(text(block), text(parseFragment(body)));
assert.equal(
  text(all(document, (n) => n.tagName === "title")[0]),
  record.seo.title,
);
assert.equal(
  attr(
    all(
      document,
      (n) => n.tagName === "meta" && attr(n, "name") === "description",
    )[0],
    "content",
  ),
  record.seo.description,
);
const image = await fetch(record.featuredImage.sourceUrl, {
  headers: { Accept: "image/jpeg", "User-Agent": "Python-urllib/3.14" },
});
assert.equal(image.status, 200);
assert.equal(
  createHash("sha256")
    .update(Buffer.from(await image.arrayBuffer()))
    .digest("hex"),
  record.source.hashes.image,
);
console.log(
  "Live page, feed, exact body HTML, text, metadata, date, attribution and original JPEG match the local snapshot.",
);
