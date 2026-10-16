import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import guard from "../netlify/edge-functions/indexing-guard.js";
import { getBlogPosts } from "../lib/blog.ts";
import { contentSecurityPolicy, securityHeaders } from "../lib/security-headers.mjs";
const origin = "https://www.thebridgetherapy.com";
const deployId = "6acbde0b31a91800096938ba";
const hostname = deployId + "--bridge-therapy-website.netlify.app";
const identity = { site: { id: "1c0ce777-b889-4f6b-8292-ef7590a4a25e" }, deploy: { id: deployId, context: "production", published: false } };
const paths = [...JSON.parse(fs.readFileSync("content/seo/public-pages.json")), ...getBlogPosts().map(p => p.legacyPath.replace(/\/$/, "") + "/")];
const noNext = () => { throw Error("Do not fetch indexable HTML for a production permalink"); };

test("production permalinks redirect all 54 GET/HEAD paths even when no longer published", async () => {
  for (const path of paths) for (const method of ["GET", "HEAD"]) {
    const r = await guard(new Request(`https://${hostname}${path}`, { method }), { ...identity, next: noNext });
    assert.equal(r.status, 301);
    assert.equal(r.headers.get("location"), origin + path);
    assert.equal(await r.text(), "");
    assert.equal(r.headers.get("x-robots-tag"), "noindex, nofollow");
    assert.equal(r.headers.get("content-security-policy"), contentSecurityPolicy);
    for (const { key, value } of securityHeaders) assert.equal(r.headers.get(key), value);
  }
});
test("deploy-ID and site identity must agree; forwarded headers cannot select a target", async () => {
  for (const context of [{}, { site: { id: "wrong" }, deploy: identity.deploy }, { site: identity.site, deploy: { context: "production" } }, { site: identity.site, deploy: { ...identity.deploy, id: "aaaaaaaaaaaaaaaaaaaaaaaa" } }]) {
    const r = await guard(new Request(`https://${hostname}/contact/`), { ...context, next: noNext });
    assert.equal(r.status, 503);
    assert.equal(r.headers.has("location"), false);
    assert.match(await r.text(), /noindex, nofollow/);
  }
  for (const path of ["/contact/?therapist=erin-young&x=1&x=2", "//evil.example/path?next=https://evil.example", "/%2f%2fevil/path/"]) {
    const request = new Request(`https://${hostname}${path}`, { headers: { "X-Forwarded-Host": "evil.example", "X-Forwarded-Proto": "http" } });
    const r = await guard(request, { ...identity, next: noNext });
    const target = new URL(r.headers.get("location"));
    assert.equal(target.origin, origin);
    assert.equal(target.pathname, new URL(request.url).pathname);
    assert.equal(target.search, new URL(request.url).search);
  }
});
test("previews, branches, staging permalinks and malformed hosts retain effective noindex", async () => {
  for (const host of ["deploy-preview-42--bridge-therapy-website.netlify.app", "agent-69a6140cc823ebba94b8ef32--bridge-therapy-website.netlify.app", "review--bridge-therapy-website.netlify.app", "bridge-therapy-staging.netlify.app", deployId + "--bridge-therapy-staging.netlify.app", "abc--bridge-therapy-website.netlify.app", "gggggggggggggggggggggggg--bridge-therapy-website.netlify.app", deployId + "--bridge-therapy-website.netlify.app.evil.example", "unknown.example"]) {
    const r = await guard(new Request(`https://${host}/about/`), { ...identity, next: () => new Response('<meta name="robots" content="noindex, nofollow">') });
    assert.equal(r.status, 200, host);
    assert.equal(r.headers.has("location"), false);
    assert.equal(r.headers.get("x-robots-tag"), "noindex, nofollow");
    assert.match(await r.text(), /noindex, nofollow/);
  }
  // A branch may itself be named 24 hex characters; its trusted context wins.
  for (const context of ["branch-deploy", "deploy-preview"]) {
    const r = await guard(new Request(`https://${hostname}/`), { ...identity, deploy: { context, id: "bbbbbbbbbbbbbbbbbbbbbbbb" }, next: () => new Response("disabled preview artifact") });
    assert.equal(r.status, 200);
    assert.equal(r.headers.has("location"), false);
    assert.equal(r.headers.get("x-robots-tag"), "noindex, nofollow");
  }
});
test("permalink Forms/method/infrastructure bypass and asset caching are unchanged", async () => {
  for (const path of ["/__forms.html", "/.netlify/functions/test", "/_next/static/test.js", "/api/test"]) {
    const upstream = new Response("untouched");
    assert.equal(await guard(new Request(`https://${hostname}${path}`), { ...identity, next: () => upstream }), upstream);
  }
  for (const method of ["POST", "PUT", "PATCH", "DELETE", "OPTIONS"]) {
    const request = new Request(`https://${hostname}/contact/`, { method, body: "local-only" });
    const upstream = new Response("untouched");
    assert.equal(await guard(request, { ...identity, next: () => upstream }), upstream);
    assert.equal(request.bodyUsed, false);
  }
  for (const path of ["/assets/photo.webp", "/assets/portrait", "/font.woff2", "/style.css"]) {
    const r = await guard(new Request(`https://${hostname}${path}`), { ...identity, next: () => new Response("asset", { headers: { "Cache-Control": "public, max-age=31536000, immutable", ETag: '"asset"' } }) });
    assert.equal(r.status, 200);
    assert.equal(r.headers.get("cache-control"), "public, max-age=31536000, immutable");
    assert.equal(r.headers.get("etag"), '"asset"');
    assert.equal(await r.text(), "asset");
  }
});
test("canonical and apex redirects are unchanged; resources cannot expose a permalink sitemap", async () => {
  const canonical = new Response("indexable canonical content");
  assert.equal(await guard(new Request(origin + "/"), { ...identity, next: () => canonical }), canonical);
  const apex = await guard(new Request("https://thebridgetherapy.com/about/"), { ...identity, next: () => new Response(null, { status: 301, headers: { Location: origin + "/about/" } }) });
  assert.equal(apex.headers.get("location"), origin + "/about/");
  assert.equal((await guard(new Request(`https://${hostname}/sitemap.xml`), { ...identity, next: noNext })).status, 404);
  const robots = await guard(new Request(`https://${hostname}/robots.txt`), { ...identity, next: noNext });
  assert.doesNotMatch(await robots.text(), /Sitemap:/);
});
