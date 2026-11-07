import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import guard from "../netlify/edge-functions/indexing-guard.js";
import news from "../netlify/edge-functions/legacy-news.js";
import retired from "../netlify/edge-functions/retired-legacy-url.js";
import { getBlogPosts } from "../lib/blog.ts";
import { contentSecurityPolicy, securityHeaders } from "../lib/security-headers.mjs";

const main = "https://main--bridge-therapy-website.netlify.app";
const canonical = "https://www.thebridgetherapy.com";
const id = "6ad2838fad7a8fa78dad48fe";
const identity = { site: { id: "1c0ce777-b889-4f6b-8292-ef7590a4a25e" }, deploy: { context: "production", id } };
const paths = [...JSON.parse(fs.readFileSync("content/seo/public-pages.json")), ...getBlogPosts().map(p => p.legacyPath.replace(/\/$/, "") + "/")];
const enabledDocument = () => new Response('<!doctype html><meta name="robots" content="index, follow">');

test("exact production main alias redirects all 54 GET/HEAD pages without exposing enabled HTML", async () => {
  assert.equal(paths.length, 54);
  for (const path of paths) for (const method of ["GET", "HEAD"]) {
    const r = await guard(new Request(main + path, { method }), { ...identity, next: enabledDocument });
    assert.equal(r.status, 301, method + path);
    assert.equal(r.headers.get("location"), canonical + path);
    assert.equal(await r.text(), "");
    assert.equal(r.headers.get("cache-control"), "no-store");
    assert.equal(r.headers.get("x-robots-tag"), "noindex, nofollow");
    assert.equal(r.headers.get("content-security-policy"), contentSecurityPolicy);
    for (const { key, value } of securityHeaders) assert.equal(r.headers.get(key), value);
  }
});

test("main alias preserves encoded paths and queries without trusting forwarded hosts or destinations", async () => {
  for (const path of ["/about/", "/contact?therapist=erin-young&x=1&x=2", "/about/?q=%2F%3F%26&next=https%3A%2F%2Fevil.example", "//evil.example/path?next=https://evil.example", "/%2f%2fevil/path/", "/news/?tag=Trauma"]) {
    const request = new Request(main + path, { headers: { "X-Forwarded-Host": "evil.example", "X-Forwarded-Proto": "http" } });
    const r = await guard(request, { ...identity, next: enabledDocument });
    assert.equal(r.status, 301);
    const target = new URL(r.headers.get("location"));
    assert.equal(target.origin, canonical);
    assert.equal(target.pathname, new URL(request.url).pathname);
    assert.equal(target.search, new URL(request.url).search);
    const destination = await guard(new Request(target), { ...identity, next: enabledDocument });
    assert.equal(destination.status, 200);
    assert.equal(destination.headers.has("location"), false);
  }
});

test("hostname matching is exact, including unrelated main aliases and spoofed headers", async () => {
  for (const host of ["main--bridge-therapy-staging.netlify.app", "bridge-therapy-staging.netlify.app", "staging--bridge-therapy-staging.netlify.app", "main--another-site.netlify.app", "main--bridge-therapy-website.netlify.app.evil.example", "evilmain--bridge-therapy-website.netlify.app", "main---bridge-therapy-website.netlify.app", "deploy-preview-42--bridge-therapy-website.netlify.app", "review--bridge-therapy-website.netlify.app", "unknown.example"]) {
    const r = await guard(new Request(`https://${host}/about/`, { headers: { "X-Forwarded-Host": "main--bridge-therapy-website.netlify.app" } }), { ...identity, next: () => new Response('<meta name="robots" content="noindex, nofollow">') });
    assert.equal(r.status, 200, host);
    assert.equal(r.headers.has("location"), false);
    assert.equal(r.headers.get("x-robots-tag"), "noindex, nofollow");
    assert.match(await r.text(), /noindex, nofollow/);
  }
  const normalized = await guard(new Request("https://MAIN--BRIDGE-THERAPY-WEBSITE.NETLIFY.APP/about/"), { ...identity, next: enabledDocument });
  assert.equal(normalized.status, 301);
  assert.equal(normalized.headers.get("location"), canonical + "/about/");
});

test("main alias requires trusted production identity and preserves independently disabled preview contexts", async () => {
  for (const metadata of [{}, { site: identity.site }, { site: { id: "wrong-site" }, deploy: identity.deploy }]) {
    const r = await guard(new Request(main + "/about/"), { ...metadata, next: enabledDocument });
    assert.equal(r.status, 503);
    assert.equal(r.headers.has("location"), false);
    assert.equal(r.headers.get("x-robots-tag"), "noindex, nofollow");
    assert.match(await r.text(), /noindex, nofollow/);
  }
  for (const context of ["branch-deploy", "deploy-preview"]) {
    const r = await guard(new Request(main + "/about/"), { ...identity, deploy: { context }, next: () => new Response('<meta name="robots" content="noindex, nofollow">') });
    assert.equal(r.status, 200);
    assert.equal(r.headers.has("location"), false);
    assert.equal(r.headers.get("x-robots-tag"), "noindex, nofollow");
  }
});

test("Forms, framework and Netlify infrastructure, unsafe methods and asset caches retain their exclusions", async () => {
  for (const path of ["/__forms.html", "/.netlify", "/.netlify/functions/example", "/.netlify/images?url=x", "/_next/static/example.js", "/_next/image?url=x", "/api/example"]) for (const method of ["GET", "HEAD", "POST"]) {
    const request = new Request(main + path, { method, ...(method === "POST" ? { body: "mock-only" } : {}) });
    const upstream = new Response("unchanged");
    assert.equal(await guard(request, { ...identity, next: () => upstream }), upstream);
    assert.equal(request.bodyUsed, false);
  }
  for (const method of ["POST", "PUT", "PATCH", "DELETE", "OPTIONS"]) {
    const request = new Request(main + "/contact/", { method, body: "mock-only" });
    const upstream = new Response("unchanged");
    assert.equal(await guard(request, { ...identity, next: () => upstream }), upstream);
    assert.equal(request.bodyUsed, false);
  }
  for (const path of ["/assets/photo.webp", "/assets/portrait", "/font.woff2", "/bundle.js", "/style.css", "/favicon.ico"]) {
    const r = await guard(new Request(main + path), { ...identity, next: () => new Response("asset", { headers: { "Cache-Control": "public, max-age=31536000, immutable", ETag: '"asset"' } }) });
    assert.equal(r.status, 200);
    assert.equal(r.headers.has("location"), false);
    assert.equal(r.headers.get("cache-control"), "public, max-age=31536000, immutable");
    assert.equal(r.headers.get("etag"), '"asset"');
    assert.equal(await r.text(), "asset");
  }
  assert.match(fs.readFileSync("netlify.toml", "utf8"), /function = "indexing-guard"\s+path = "\/\*"\s+excludedPath = "\/__forms\.html"/);
});

test("canonical, apex, existing alias and permalink behavior and legacy routing remain intact", async () => {
  const upstream = enabledDocument();
  assert.equal(await guard(new Request(canonical + "/"), { ...identity, next: () => upstream }), upstream);
  const apex = await guard(new Request("https://thebridgetherapy.com/about/"), { ...identity, next: () => new Response(null, { status: 301, headers: { Location: canonical + "/about/" } }) });
  assert.equal(apex.status, 301);
  assert.equal(apex.headers.get("location"), canonical + "/about/");
  for (const origin of [main, "https://bridge-therapy-website.netlify.app", `https://${id}--bridge-therapy-website.netlify.app`]) {
    for (const path of ["/about/", "/job-postings", "/job-postings/", "/news", "/news/"]) {
      const chain = request => guard(request, { ...identity, next: () => retired(request, { next: () => news(request, { next: enabledDocument }) }) });
      const r = await chain(new Request(origin + path));
      assert.equal(r.status, 301);
      assert.equal(r.headers.get("location"), canonical + path);
      const destination = await chain(new Request(canonical + path));
      assert.equal(destination.status, path.startsWith("/job-postings") ? 410 : path.startsWith("/news") ? 301 : 200);
      if (path.startsWith("/news")) assert.equal(destination.headers.get("location"), "/blog/");
    }
  }
});

test("main alias does not advertise a noncanonical sitemap", async () => {
  const sitemap = await guard(new Request(main + "/sitemap.xml"), { ...identity, next: enabledDocument });
  assert.equal(sitemap.status, 404);
  assert.equal(sitemap.headers.has("location"), false);
  const robots = await guard(new Request(main + "/robots.txt"), { ...identity, next: enabledDocument });
  assert.equal(robots.status, 200);
  assert.doesNotMatch(await robots.text(), /Sitemap:/);
});
