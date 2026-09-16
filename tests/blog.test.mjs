import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createHash } from "node:crypto";
import { parse, parseFragment } from "parse5";
import { getBlogPosts, getBlogPost, blogDate } from "../lib/blog.ts";

const directory = "content/blog/navigating-life-transitions";
const record = JSON.parse(
  fs.readFileSync(`${directory}/metadata.json`, "utf8"),
);
const source = JSON.parse(
  fs.readFileSync(`${directory}/source/item.json`, "utf8"),
);
const attr = (node, name) => node.attrs?.find((a) => a.name === name)?.value;
const all = (node, predicate) => [
  ...(predicate(node) ? [node] : []),
  ...(node.childNodes ?? []).flatMap((child) => all(child, predicate)),
];
const text = (node) =>
  node.nodeName === "#text"
    ? node.value
    : (node.childNodes ?? []).map(text).join("");
// Compare every text node, element, attribute and position, including empty elements.
function signature(node) {
  return {
    name: node.nodeName,
    text: node.value,
    attrs: node.attrs,
    children: (node.childNodes ?? []).map(signature),
  };
}

test("original content record loads with exact legacy path, date, byline and metadata", () => {
  assert.equal(getBlogPosts().length, 19);
  const post = getBlogPost(["navigating-life-transitions"]);
  assert.equal(post.title, source.title);
  assert.equal(post.displayedByline, source.author.displayName);
  assert.equal(post.publishedAt, new Date(source.publishOn).toISOString());
  assert.equal(post.publicationDate, "2023-08-31");
  assert.equal(blogDate(post), "August 31, 2023");
  assert.equal(post.excerptHtml, "");
  assert.equal(
    post.seo.title,
    "How Counseling Can Guide You Through Change — The Bridge Therapeutic Services",
  );
  assert.equal(post.seo.description, source.seoData.seoDescription);
  assert.equal(post.legacyPath, "/news/navigating-life-transitions");
  assert.equal(getBlogPost(["..", "navigating-life-transitions"]), undefined);
  assert.equal(getBlogPost(["2026", "1", "19", "unknown-article"]), undefined);
});

test("immutable snapshot, rendered-body source and original image match recorded hashes", () => {
  for (const [file, expected] of Object.entries(record.source.hashes)) {
    const bytes = fs.readFileSync(
      file === "image"
        ? `public${record.featuredImage.src}`
        : `${directory}/source/${file}`,
    );
    assert.equal(
      createHash("sha256").update(bytes).digest("hex"),
      expected,
      file,
    );
  }
});

test("body preserves every source node and attribute, seven H2s and the empty H2", () => {
  const original = parseFragment(source.body);
  const block = all(
    original,
    (n) => attr(n, "class") === "sqs-html-content",
  )[0];
  const body = parseFragment(
    getBlogPost(["navigating-life-transitions"]).bodyHtml,
  );
  assert.deepEqual(
    body.childNodes.map(signature),
    block.childNodes.map(signature),
  );
  const headings = all(body, (n) => n.tagName === "h2");
  assert.equal(headings.length, 7);
  assert.equal(text(headings[2]), "Building Resilience");
  assert.equal(text(headings[3]), "");
  assert.deepEqual(
    all(body, (n) => n.tagName === "a").map((n) => [attr(n, "href"), text(n)]),
    [["tel:+19032838729", "903.283.8729"]],
  );
  assert.equal(
    all(body, (n) =>
      ["script", "style", "iframe", "img", "ul", "ol"].includes(n.tagName),
    ).length,
    0,
  );
  assert.equal(
    all(body, (n) => n.attrs?.some((a) => a.name.startsWith("on"))).length,
    0,
  );
});

test("built article and index retain content, metadata, local image and staging robots", () => {
  const article = parse(
    fs.readFileSync(`.next/server/app${record.legacyPath}.html`, "utf8"),
  );
  const body = all(
    article,
    (n) => attr(n, "data-original-article-body") !== undefined,
  )[0];
  assert.ok(body);
  assert.deepEqual(
    body.childNodes.map(signature),
    parseFragment(
      getBlogPost(["navigating-life-transitions"]).bodyHtml,
    ).childNodes.map(signature),
  );
  assert.equal(
    text(all(article, (n) => n.tagName === "title")[0]),
    record.seo.title,
  );
  assert.equal(
    attr(
      all(
        article,
        (n) => n.tagName === "meta" && attr(n, "name") === "description",
      )[0],
      "content",
    ),
    record.seo.description,
  );
  assert.equal(
    attr(
      all(
        article,
        (n) => n.tagName === "meta" && attr(n, "name") === "robots",
      )[0],
      "content",
    ),
    "noindex, nofollow",
  );
  assert.equal(
    all(article, (n) => n.tagName === "link" && attr(n, "rel") === "canonical")
      .length,
    0,
  );
  const image = all(
    article,
    (n) => attr(n, "class") === "blog-featured-image",
  )[0];
  assert.equal(attr(image, "src"), record.featuredImage.src);
  assert.equal(attr(image, "width"), "2500");
  assert.equal(attr(image, "height"), "1667");
  assert.equal(
    all(article, (n) => n.tagName === "img" && /^https?:/.test(attr(n, "src")))
      .length,
    0,
  );
  const index = parse(fs.readFileSync(".next/server/app/blog.html", "utf8"));
  const cards = all(index, (n) => attr(n, "class") === "blog-card");
  assert.equal(cards.length, 19);
  const originalCard = cards.find(
    (card) =>
      attr(all(card, (n) => n.tagName === "a")[0], "href") ===
      record.legacyPath,
  );
  assert.equal(
    attr(all(originalCard, (n) => n.tagName === "a")[0], "href"),
    record.legacyPath,
  );
  assert.equal(
    text(all(originalCard, (n) => n.tagName === "h2")[0]),
    record.title,
  );
  assert.deepEqual(all(originalCard, (n) => n.tagName === "p").map(text), [
    record.displayedByline,
  ]);
});
