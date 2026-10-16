import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import guard from "../netlify/edge-functions/indexing-guard.js";
import retired from "../netlify/edge-functions/retired-legacy-url.js";
import news from "../netlify/edge-functions/legacy-news.js";
import { contentSecurityPolicy, securityHeaders } from "../lib/security-headers.mjs";
import { getBlogPosts } from "../lib/blog.ts";

const alias = "https://bridge-therapy-website.netlify.app";
const origin = "https://www.thebridgetherapy.com";
const identity = { site: { id: "1c0ce777-b889-4f6b-8292-ef7590a4a25e" }, deploy: { context: "production" } };
const noUpstream = () => { throw Error("Redirect must not fetch a content document"); };
const paths = [...JSON.parse(fs.readFileSync("content/seo/public-pages.json")), ...getBlogPosts().map(p => p.legacyPath.replace(/\/$/, "") + "/")];

test("actual guard redirects all 54 content paths for GET and HEAD, without a document", async () => {
  assert.equal(paths.length, 54);
  for (const path of paths) for (const method of ["GET", "HEAD"]) {
    const r = await guard(new Request(alias + path, { method }), { ...identity, next: noUpstream });
    assert.equal(r.status, 301, method + path);
    assert.equal(r.headers.get("location"), origin + path);
    assert.equal(r.headers.get("x-robots-tag"), "noindex, nofollow");
    assert.equal(r.headers.get("cache-control"), "no-store");
    assert.equal(r.headers.get("content-security-policy"), contentSecurityPolicy);
    for (const { key, value } of securityHeaders) assert.equal(r.headers.get(key), value);
    assert.equal(await r.text(), "");
  }
});

test("fixed target preserves paths/queries and cannot become an open redirect", async () => {
  for (const path of ["/contact?therapist=erin-young&utm_source=test", "/?next=https://evil.example/&index=true", "//evil.example/path?x=1&x=2", "/news/?tag=Trauma", "/about/?q=%2F%3F%26", "/%2f%2fevil/path/"]) {
    const req = new Request(alias + path, { headers: { "X-Forwarded-Host": "evil.example", "X-Forwarded-Proto": "http" } });
    const r = await guard(req, { ...identity, next: noUpstream });
    assert.equal(r.status, 301);
    const location = new URL(r.headers.get("location"));
    assert.equal(location.origin, origin);
    assert.equal(location.pathname, new URL(req.url).pathname);
    assert.equal(location.search, new URL(req.url).search);
  }
});

test("canonical host is unchanged and exact-host matching excludes previews, apex and lookalikes", async () => {
  for (const host of ["www.thebridgetherapy.com", "thebridgetherapy.com", "bridge-therapy-website.netlify.app.evil.example", "evilbridge-therapy-website.netlify.app", "deploy-preview-2--bridge-therapy-website.netlify.app", "branch--bridge-therapy-website.netlify.app", "isolated-staging.netlify.app"]) {
    const upstream = new Response('page', { headers: { "X-Upstream": "yes", ...(host === "www.thebridgetherapy.com" ? { "X-Robots-Tag": "noindex, nofollow" } : {}) } });
    const r = await guard(new Request(`https://${host}/contact/`, { headers: { "X-Forwarded-Host": "bridge-therapy-website.netlify.app" } }), { ...identity, next: () => upstream });
    assert.equal(r.status, 200);
    assert.equal(r.headers.has("location"), false);
    assert.equal(await r.text(), "page");
    assert.equal(r.headers.get("x-robots-tag"), "noindex, nofollow");
  }
  const upstream = new Response(null, { status: 301, headers: { Location: origin + "/contact/" } });
  const r = await guard(new Request("https://thebridgetherapy.com/contact/"), { ...identity, next: () => upstream });
  assert.equal(r.status, 301);
  assert.equal(r.headers.get("location"), origin + "/contact/");
});

test("Forms, infrastructure and unsafe methods preserve upstream responses and request bodies", async () => {
  for (const path of ["/__forms.html", "/.netlify/functions/test", "/.netlify/images?url=x", "/.netlify", "/_next/static/test.js", "/_next/image?url=x", "/api/test"]) {
    for (const method of ["GET", "HEAD", "POST"]) {
      const request = new Request(alias + path, { method, ...(method === "POST" ? { body: "synthetic-local-only" } : {}) });
      const upstream = new Response("untouched", { headers: { "X-Upstream": "yes" } });
      const r = await guard(request, { ...identity, next: () => upstream });
      assert.equal(r, upstream);
      assert.equal(request.bodyUsed, false);
      if (method === "POST") assert.equal(await request.text(), "synthetic-local-only");
    }
  }
  for (const method of ["POST", "PUT", "PATCH", "DELETE", "OPTIONS"]) {
    const request = new Request(alias + "/contact/", { method, body: "synthetic-local-only" });
    const upstream = new Response("untouched");
    assert.equal(await guard(request, { ...identity, next: () => upstream }), upstream);
    assert.equal(request.bodyUsed, false);
  }
  const config = fs.readFileSync("netlify.toml", "utf8");
  assert.match(config, /function = "indexing-guard"\s+path = "\/\*"\s+excludedPath = "\/__forms\.html"/);
});

test("resources stay local; alias robots/sitemap protection and identity failures stay closed", async () => {
  for (const path of ["/assets/photo.webp", "/assets/portrait", "/favicon.ico", "/manifest.webmanifest"]) {
    const r = await guard(new Request(alias + path), { ...identity, next: () => new Response("asset") });
    assert.equal(r.status, 200);
    assert.equal(r.headers.has("location"), false);
    assert.equal(await r.text(), "asset");
  }
  assert.equal((await guard(new Request(alias + "/sitemap.xml"), { ...identity, next: noUpstream })).status, 404);
  const robots = await guard(new Request(alias + "/robots.txt"), { ...identity, next: noUpstream });
  assert.doesNotMatch(await robots.text(), /Sitemap:/);
  for (const metadata of [{}, { site: identity.site }, { site: { id: "wrong-site" }, deploy: identity.deploy }]) {
    const r = await guard(new Request(alias + "/about/"), { ...metadata, next: noUpstream });
    assert.equal(r.status, 503);
    assert.equal(r.headers.has("location"), false);
    assert.match(await r.text(), /noindex, nofollow/);
  }
  for (const context of ["deploy-preview", "branch-deploy"]) {
    const r = await guard(new Request(alias + "/about/"), { ...identity, deploy: { context }, next: () => new Response('<meta name="robots" content="noindex, nofollow">') });
    assert.equal(r.status, 200);
    assert.equal(r.headers.has("location"), false);
    assert.equal(r.headers.get("x-robots-tag"), "noindex, nofollow");
  }
});

test("canonical retirement/news handlers retain precedence downstream; alias normalizes host first", async () => {
  const chain = request => guard(request, { ...identity, next: () => retired(request, { next: () => news(request, { next: () => new Response("content") }) }) });
  for (const path of ["/job-postings", "/job-postings/"]) {
    assert.equal((await chain(new Request(origin + path))).status, 410);
    const r = await chain(new Request(alias + path));
    assert.equal(r.status, 301);
    assert.equal(r.headers.get("location"), origin + path);
  }
  for (const path of ["/news", "/news/"]) {
    const r = await chain(new Request(origin + path));
    assert.equal(r.status, 301);
    assert.equal(r.headers.get("location"), "/blog/");
  }
});
