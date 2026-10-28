import indexingGuard from "../netlify/edge-functions/indexing-guard.js";
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { parse } from "parse5";
import { getBlogPosts, getPublishedBlogPosts } from "../lib/blog.ts";
import { all, attr } from "../scripts/legacy-blog-content.mjs";

const origin = "https://www.thebridgetherapy.com";
const pages = JSON.parse(
  fs.readFileSync("content/seo/public-pages.json", "utf8"),
);
const posts = getPublishedBlogPosts();
const paths = [
  ...pages,
  ...posts.map((post) => post.legacyPath.replace(/\/$/, "") + "/"),
].sort();
const production = process.env.SEO_TEST_MODE === "simulated-production";
const base = process.env.SEO_TEST_URL || "http://127.0.0.1:3012";
assert.ok(
  ["localhost", "127.0.0.1"].includes(new URL(base).hostname),
  "Local validation only",
);
const canonicals = (doc) =>
  all(doc, (n) => n.tagName === "link" && attr(n, "rel") === "canonical").map(
    (n) => attr(n, "href"),
  );
const robots = (doc) =>
  all(doc, (n) => n.tagName === "meta" && attr(n, "name") === "robots").map(
    (n) => attr(n, "content"),
  );
const descriptions = (doc) =>
  all(
    doc,
    (n) => n.tagName === "meta" && attr(n, "name") === "description",
  ).map((n) => attr(n, "content"));
const walk = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory() ? walk(dir + "/" + e.name) : [dir + "/" + e.name],
    );

test("reviewed inventory exactly matches real static routes plus original articles", () => {
  const actualPages = walk("app")
    .filter((p) => p.endsWith("/page.tsx") && !p.includes("["))
    .map((p) => (p === "app/page.tsx" ? "/" : "/" + p.slice(4, -9) + "/"))
    .sort();
  assert.deepEqual([...pages].sort(), actualPages);
  assert.equal(new Set(paths).size, paths.length);
  const legacy = JSON.parse(
    fs.readFileSync("content/seo/phase-1-url-map.json", "utf8"),
  );
  assert.deepEqual([...legacy.activeRoutes].sort(), [...pages].sort());
  assert.equal(getBlogPosts().length, 19);
  assert.equal(posts.length, 20);
  assert.equal(paths.length, 55);
  for (const path of paths) assert.match(path, /^\/(?:[a-z0-9-]+\/)*$/);
});
test("all public pages have unique, plain-text descriptions", async () => {
  const seen = new Map();
  for (const path of paths) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    const doc = parse(await response.text());
    const values = descriptions(doc);
    assert.equal(values.length, 1, path);
    assert.ok(values[0].trim(), path);
    assert.doesNotMatch(values[0], /<[^>]+>|localhost|netlify\.app/i, path);
    assert.equal(
      seen.has(values[0]),
      false,
      `${path} duplicates ${seen.get(values[0])}`,
    );
    seen.set(values[0], path);
    const title = all(doc, (n) => n.tagName === "title");
    assert.equal(title.length, 1, path);
    assert.doesNotMatch(
      title[0].childNodes.map((n) => n.value ?? "").join(""),
      /<br\s*\/?\s*>/i,
      path,
    );
  }
});
test("every public page serves one exact canonical, expected robots, and one-hop slash normalization", async () => {
  for (const path of paths) {
    const response = await fetch(base + path, { redirect: "manual" });
    assert.equal(response.status, 200, path);
    assert.equal(response.headers.get("location"), null, path);
    const doc = parse(await response.text());
    assert.deepEqual(canonicals(doc), [origin + path], path);
    assert.deepEqual(
      robots(doc),
      [production ? "index, follow" : "noindex, nofollow"],
      path,
    );
    assert.equal(
      response.headers.get("x-robots-tag"),
      production ? null : "noindex, nofollow",
      path,
    );
    if (path !== "/") {
      const slashless = await fetch(base + path.slice(0, -1), {
        redirect: "manual",
      });
      assert.equal(slashless.status, 308, path);
      assert.equal(
        new URL(slashless.headers.get("location"), base).pathname,
        path,
      );
    }
  }
});
test("queries and spoofed forwarded headers do not change canonicals or indexing", async () => {
  const response = await fetch(
    base + "/contact/?therapist=erin-young&index=true&origin=https://evil.test",
    {
      headers: {
        "X-Forwarded-Host": "www.thebridgetherapy.com",
        "X-Forwarded-Proto": "https",
        "X-Indexing": "true",
      },
      redirect: "manual",
    },
  );
  assert.equal(response.status, 200);
  const doc = parse(await response.text());
  assert.deepEqual(canonicals(doc), [origin + "/contact/"]);
  assert.deepEqual(robots(doc), [
    production ? "index, follow" : "noindex, nofollow",
  ]);
});
test("unknown and unresolved routes have no canonical and cannot be indexed", async () => {
  for (const path of [
    "/not-a-page/",
    "/news/not-an-article/",
    "/programs/",
    "/job-postings/",
    "/about-us-bedford/",
    "/news/tag/Trauma/",
    "/api/unknown/",
  ]) {
    const response = await fetch(base + path, { redirect: "manual" });
    assert.equal(response.status, 404, path);
    assert.equal(response.headers.get("location"), null);
    const doc = parse(await response.text());
    assert.deepEqual(canonicals(doc), [], path);
    assert.ok(
      robots(doc).some((value) => value.includes("noindex")),
      path,
    );
  }
});
test("sitemap and robots match the build gate without fabricated dates or excluded URLs", async () => {
  const sitemap = await fetch(base + "/sitemap.xml", { redirect: "manual" });
  assert.equal(sitemap.status, 200);
  assert.match(sitemap.headers.get("content-type"), /xml/);
  assert.equal(sitemap.headers.get("x-robots-tag"), "noindex, nofollow");
  const xml = await sitemap.text();
  assert.match(
    xml,
    /<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/,
  );
  assert.doesNotMatch(
    xml,
    /<lastmod>|<priority>|<changefreq>|localhost|netlify\.app/,
  );
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.deepEqual(
    urls.sort(),
    production ? paths.map((p) => origin + p).sort() : [],
  );
  const response = await fetch(base + "/robots.txt", { redirect: "manual" });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
  const text = await response.text();
  assert.match(text, /User-Agent: \*/i);
  assert.match(text, /Allow: \//);
  if (production) {
    assert.match(
      text,
      /Sitemap: https:\/\/www.thebridgetherapy.com\/sitemap.xml/,
    );
    assert.doesNotMatch(text, /Disallow:/);
  } else {
    assert.match(text, /Disallow: \/sitemap.xml/);
    assert.doesNotMatch(text, /Sitemap:|Disallow: \/\s*(?:$|\n)/);
  }
});

test("real built responses remain nonindexable through the Netlify alias guard", async () => {
  for (const alias of [
    "https://deploy-preview-42--bridge.netlify.app",
    "https://production-alias.netlify.app",
  ]) {
    const page = await indexingGuard(new Request(alias + "/about/"), {
      next: () => fetch(base + "/about/"),
    });
    assert.equal(page.status, 200);
    assert.equal(page.headers.get("x-robots-tag"), "noindex, nofollow");
    assert.deepEqual(canonicals(parse(await page.text())), [
      origin + "/about/",
    ]);
    const sitemap = await indexingGuard(new Request(alias + "/sitemap.xml"), {
      next: () => fetch(base + "/sitemap.xml"),
    });
    assert.equal(sitemap.status, 404);
    assert.equal(await sitemap.text(), "");
    const rules = await indexingGuard(new Request(alias + "/robots.txt"), {
      next: () => fetch(base + "/robots.txt"),
    });
    assert.doesNotMatch(await rules.text(), /Sitemap:/);
  }
});
