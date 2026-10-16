import assert from "node:assert/strict";
import test from "node:test";
import { productionIndexingAllowed } from "../lib/seo/policy.ts";
import aliasPolicy, { productionSiteId } from "./fixtures/two-site-alias-policy.mjs";
import { contentSecurityPolicy } from "../lib/security-headers.mjs";

const env = { BRIDGE_ENABLE_INDEXING: "true", BRIDGE_PRODUCTION_SITE_ID: productionSiteId, SITE_ID: productionSiteId, NETLIFY: "true", NODE_ENV: "production", CONTEXT: "production", URL: "https://www.thebridgetherapy.com" };
const context = { site: { id: productionSiteId }, deploy: { context: "production" }, next: () => { throw Error("Must not serve an alias content body"); } };
test("same branch and production context cannot enable a different staging site", () => {
  assert.equal(productionIndexingAllowed(env, "phase-production-build"), true);
  for (const mutation of [{ SITE_ID: "22222222-2222-4222-8222-222222222222" }, { URL: "https://isolated-staging.example" }, { BRIDGE_ENABLE_INDEXING: "false" }, { CONTEXT: "deploy-preview" }, { CONTEXT: "branch-deploy" }, { BRIDGE_ENABLE_INDEXING: undefined }])
    assert.equal(productionIndexingAllowed({ ...env, ...mutation }, "phase-production-build"), false);
});
test("prototype redirects production aliases/permalinks without exposing HTML or trusting headers", async () => {
  for (const hostname of ["bridge-therapy-website.netlify.app", "6acbde0b31a91800096938ba--bridge-therapy-website.netlify.app", "unexpected.example"])
    for (const path of ["/", "/contact/?therapist=erin-young", "/news/2019/1/2/big-news/", "//evil.example/path?target=https://evil.example"])
      for (const method of ["GET", "HEAD"]) {
        const request = new Request(`https://${hostname}${path}`, { method, headers: { "X-Forwarded-Host": "evil.example" } });
        const r = await aliasPolicy(request, context);
        assert.equal(r.status, 301);
        const target = new URL(r.headers.get("location"));
        assert.equal(target.origin, "https://www.thebridgetherapy.com");
        assert.equal(target.pathname, new URL(request.url).pathname);
        assert.equal(target.search, new URL(request.url).search);
        assert.equal(await r.text(), "");
        assert.equal(r.headers.get("x-robots-tag"), "noindex, nofollow");
        assert.equal(r.headers.get("content-security-policy"), contentSecurityPolicy);
      }
});
test("prototype preserves canonical content and Forms; rejects unsafe alias methods", async () => {
  const next = () => new Response("unchanged");
  assert.equal(await (await aliasPolicy(new Request("https://www.thebridgetherapy.com/contact/"), { ...context, next })).text(), "unchanged");
  assert.equal(await (await aliasPolicy(new Request("https://bridge-therapy-website.netlify.app/__forms.html", { method: "POST", body: "test" }), { ...context, next })).text(), "unchanged");
  const denied = await aliasPolicy(new Request("https://bridge-therapy-website.netlify.app/contact/", { method: "POST", body: "test" }), context);
  assert.equal(denied.status, 403);
  assert.equal(denied.headers.has("location"), false);
  const ambiguous = await aliasPolicy(new Request("https://www.thebridgetherapy.com/"), { next });
  assert.equal(ambiguous.status, 503);
  assert.match(await ambiguous.text(), /noindex, nofollow/);
});
test("prototype keeps preview/staging sitemap and headers nonindexable", async () => {
  const preview = { ...context, deploy: { context: "deploy-preview" }, next: () => new Response('<meta name="robots" content="noindex, nofollow">') };
  for (const ctx of [preview, { ...preview, site: { id: "22222222-2222-4222-8222-222222222222" }, deploy: { context: "production" } }]) {
    const page = await aliasPolicy(new Request("https://isolated-staging.example/about/"), ctx);
    assert.equal(page.status, 200);
    assert.match(await page.text(), /noindex, nofollow/);
    assert.equal(page.headers.get("x-robots-tag"), "noindex, nofollow");
    assert.equal((await aliasPolicy(new Request("https://isolated-staging.example/sitemap.xml"), ctx)).status, 404);
  }
});
