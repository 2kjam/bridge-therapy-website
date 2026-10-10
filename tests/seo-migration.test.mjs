import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { parse } from "parse5";
import legacyNews from "../netlify/edge-functions/legacy-news.js";
import { getBlogPosts } from "../lib/blog.ts";

const moves = [
  ["/what-we-believe", "/christian-counseling-tyler/"],
  ["/our-story", "/about/"],
  ["/meet-the-team", "/therapists/"],
  ["/schedule-an-apointment", "/contact/"],
  ["/news", "/blog/"],
];
const base = process.env.MIGRATION_TEST_URL || "http://127.0.0.1:8888";
assert.match(base, /^http:\/\/(localhost|127\.0\.0\.1):\d+$/);
const get = (path) => fetch(base + path, { redirect: "manual" });
const nodes = (n) => [n, ...(n.childNodes || []).flatMap(nodes)];
const text = (n) =>
  n.nodeName === "#text" ? n.value : (n.childNodes || []).map(text).join("");

test("news edge rule preserves unresolved archives, feeds, queries and article paths", async () => {
  for (const path of [
    "/news?author=5f5e4cd445de701d477994a6",
    "/news/?tag=Trauma",
    "/news?format=rss",
    "/news?offset=1",
    "/news?next=https://example.com",
    "/news/tag/EDMR/",
    "/news/take-heart/",
  ]) {
    let continued = false;
    await legacyNews(new Request(base + path), {
      next() {
        continued = true;
        return new Response(null, { status: 404 });
      },
    });
    assert.equal(continued, true, path);
  }
  const response = legacyNews(
    new Request(base + "/news?utm_source=migration"),
    {},
  );
  assert.equal(response.status, 301);
  assert.equal(response.headers.get("location"), "/blog/?utm_source=migration");
});

test("confirmed moves: both slash variants make one 301 hop to a 200 destination", async () => {
  for (const [oldPath, destination] of moves) {
    for (const suffix of ["", "/"]) {
      const response = await get(oldPath + suffix);
      assert.equal(response.status, 301, oldPath + suffix);
      const location = new URL(response.headers.get("location"), base);
      assert.equal(location.origin, base);
      assert.equal(location.pathname, destination);
      const final = await get(destination);
      assert.equal(final.status, 200, destination);
      assert.equal(final.headers.get("location"), null);
      const html = await final.text();
      assert.match(html, /noindex, nofollow/);
      const canonical = nodes(parse(html)).filter(
        (node) =>
          node.tagName === "link" &&
          node.attrs?.some((a) => a.name === "rel" && a.value === "canonical"),
      );
      assert.deepEqual(
        canonical.map(
          (node) => node.attrs.find((a) => a.name === "href").value,
        ),
        ["https://www.thebridgetherapy.com" + destination],
      );
    }
  }
});

test("no speculative redirects, descendant matches, open redirects or homepage fallback", async () => {
  for (const path of [
    "/programs/",
    "/job-postings/",
    "/about-us-bedford/",
    "/cart/",
    "/news/tag/Trauma/",
    "/news/tag/Memories/",
    "/news/tag/EDMR/",
    "/news/?author=5f5e4cd445de701d477994a6",
    "/news/?format=rss",
    "/news/?unknown=1",
    "/what-we-believe/unrelated/",
    "/news/unknown-article/",
    "/news/2020/1/1/unknown/",
    "/unknown-phase-one-url/",
  ]) {
    const response = await get(path);
    assert.equal(response.status, 404, path);
    assert.equal(response.headers.get("location"), null, path);
  }
  const response = await get("/our-story?next=https://example.com");
  const location = new URL(response.headers.get("location"), base);
  assert.equal(response.status, 301);
  assert.equal(location.origin, base);
  assert.equal(location.pathname, "/about/");
});

test("all 19 original article URLs retain their own page and title", async () => {
  const presentedTitles = new Map(
    getBlogPosts().map((post) => [post.legacyPath, post.title]),
  );
  const directories = fs
    .readdirSync("content/blog", { withFileTypes: true })
    .filter((entry) => entry.isDirectory());
  assert.equal(directories.length, 19);
  for (const directory of directories) {
    const post = JSON.parse(
      fs.readFileSync(
        "content/blog/" + directory.name + "/metadata.json",
        "utf8",
      ),
    );
    const slashless = await get(post.legacyPath);
    assert.equal(slashless.status, 308, post.legacyPath);
    assert.equal(
      new URL(slashless.headers.get("location"), base).pathname,
      post.legacyPath + "/",
    );
    const page = await get(post.legacyPath + "/");
    assert.equal(page.status, 200, post.legacyPath);
    const html = await page.text();
    const h1 = nodes(parse(html)).find((node) => node.tagName === "h1");
    assert.equal(text(h1), presentedTitles.get(post.legacyPath));
    assert.match(html, /noindex, nofollow/);
  }
});
