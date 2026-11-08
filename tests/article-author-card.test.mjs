import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { parse, parseFragment, serialize } from "parse5";
import { getPublishedBlogPosts } from "../lib/blog.ts";
import { presentArticleBody } from "../lib/blog-presentation.ts";
import { getArticleAuthor } from "../lib/article-author.ts";
import { therapists } from "../lib/seo/schema-data.ts";

const approvedNative = new Set([
  "/blog/blended-family-counseling/",
  "/blog/online-couples-counseling/",
  "/blog/religious-trauma-therapy/",
]);
const attr = (node, name) => node.attrs?.find((a) => a.name === name)?.value;
const all = (node, predicate) => [
  ...(predicate(node) ? [node] : []),
  ...(node.childNodes ?? []).flatMap((child) => all(child, predicate)),
];
const text = (node) => node.nodeName === "#text"
  ? node.value : (node.childNodes ?? []).map(text).join("");

for (const post of getPublishedBlogPosts()) {
  test(`author card scope and preserved body: ${post.legacyPath}`, () => {
    const route = post.legacyPath.replace(/\/$/, "");
    const doc = parse(fs.readFileSync(`.next/server/app${route}.html`, "utf8"));
    const cards = all(doc, (n) => attr(n, "class") === "blog-author-card");
    const legacy = post.legacyPath.startsWith("/news/");
    assert.equal(cards.length, legacy || approvedNative.has(post.legacyPath) ? 1 : 0);
    const body = all(doc, (n) => attr(n, "data-original-article-body") !== undefined)[0];
    assert.equal(serialize(body), serialize(parseFragment(presentArticleBody(post.bodyHtml))));
    if (!cards.length) return;
    const card = cards[0];
    assert.equal(card.tagName, "footer");
    assert.equal(card.parentNode.tagName, "article");
    assert.equal(card.parentNode.childNodes.filter((n) => n.tagName).at(-1), card);
    const heading = all(card, (n) => n.tagName === "h2")[0];
    assert.equal(attr(card, "aria-labelledby"), attr(heading, "id"));
    assert.equal(text(heading), post.displayedByline);
    const person = therapists.find((person) => person.path === post.authorProfilePath);
    assert.ok(person);
    assert.equal(all(doc, (n) => attr(n, "id") === attr(heading, "id")).length, 1);
    assert.ok(text(card).includes(person.credential));
    assert.match(text(card), /Co-owner at The Bridge Therapeutic Services/);
    assert.doesNotMatch(text(card), /reviewed|medically|board.certified|specialist/i);
    const links = all(card, (n) => n.tagName === "a");
    assert.equal(links.length, 1);
    assert.equal(attr(links[0], "href"), post.authorProfilePath);
    assert.equal(attr(links[0], "tabindex"), undefined);
    const image = all(card, (n) => n.tagName === "img")[0];
    assert.equal(attr(image, "alt"), "");
    assert.equal(attr(image, "loading"), "lazy");
    assert.ok(Number(attr(image, "width")) > 0 && Number(attr(image, "height")) > 0);
    assert.ok(fs.existsSync("public" + attr(image, "src")));
  });
}


test("future approved guides use their verified author and never inherit Jennifer", () => {
  for (const person of therapists) {
    const post = { legacyPath: "/blog/future-approved-guide/", status: "published", authorType: "Person", authorProfilePath: person.path, displayedByline: person.name };
    assert.equal(getArticleAuthor(post, therapists), person);
    assert.equal(getArticleAuthor({ ...post, status: "draft" }, therapists), undefined);
    assert.equal(getArticleAuthor({ ...post, legacyPath: "/news/old-article/" }, therapists), ["/therapists/jennifer-wood/", "/therapists/erin-young/"].includes(person.path) ? person : undefined);
    assert.equal(getArticleAuthor({ ...post, authorType: "Organization" }, therapists), undefined);
    assert.equal(getArticleAuthor({ ...post, displayedByline: "Different Author" }, therapists), undefined);
    assert.equal(getArticleAuthor({ ...post, authorProfilePath: "/therapists/unverified/" }, therapists), undefined);
  }
});


test("legacy ambiguity, missing attribution, team authorship and drafts never get a guessed card", () => {
  const post = { legacyPath: "/news/2019/1/2/big-news", displayedByline: "Jennifer Wood, LPC-S", authorProfilePath: "/therapists/jennifer-wood/" };
  assert.equal(getArticleAuthor(post, therapists)?.path, post.authorProfilePath);
  for (const override of [
    { displayedByline: "Jennifer Wood and Erin Young" },
    { displayedByline: "The Bridge Team" },
    { displayedByline: "Jennifer Wood" },
    { authorProfilePath: undefined },
    { authorProfilePath: "/therapists/erin-young/" },
    { authorType: "Organization" },
    { status: "draft" },
    { legacyPath: "/blog/unpublished-native-draft/" },
  ]) assert.equal(getArticleAuthor({ ...post, ...override }, therapists), undefined);
});
