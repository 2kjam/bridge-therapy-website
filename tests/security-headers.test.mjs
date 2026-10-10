import assert from "node:assert/strict";
import test from "node:test";
import indexingGuard from "../netlify/edge-functions/indexing-guard.js";
import {
  contentSecurityPolicy,
  securityHeaderRule,
  securityHeaders,
} from "../lib/security-headers.mjs";

const directives = new Map(
  contentSecurityPolicy.split(";").map((part) => {
    const [name, ...values] = part.trim().split(/\s+/);
    return [name, values];
  }),
);

test("CSP is restrictive, syntactically unique, and permits only required resources", () => {
  assert.equal(directives.size, contentSecurityPolicy.split(";").length);
  assert.deepEqual(directives.get("default-src"), ["'self'"]);
  assert.deepEqual(directives.get("object-src"), ["'none'"]);
  assert.deepEqual(directives.get("base-uri"), ["'self'"]);
  assert.deepEqual(directives.get("frame-ancestors"), ["'none'"]);
  assert.deepEqual(directives.get("form-action"), ["'self'"]);
  assert.deepEqual(directives.get("connect-src"), ["'self'"]);
  assert.deepEqual(directives.get("frame-src"), ["https://player.vimeo.com"]);
  assert.deepEqual(directives.get("script-src"), ["'self'", "'unsafe-inline'"]);
  assert.deepEqual(directives.get("style-src"), ["'self'", "'unsafe-inline'"]);
  assert.doesNotMatch(contentSecurityPolicy, /(?:^|\s)\*(?:\s|;|$)|unsafe-eval|https?:\s/);
  assert.equal(directives.has("upgrade-insecure-requests"), true);
});

test("security header collection has one nonconflicting value per header", () => {
  const names = securityHeaders.map(({ key }) => key.toLowerCase());
  assert.equal(new Set(names).size, names.length);
  assert.deepEqual(Object.fromEntries(securityHeaders.map(({ key, value }) => [key, value])), {
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy":
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=(), fullscreen=(self "https://player.vimeo.com")',
    "X-Frame-Options": "DENY",
    "Cross-Origin-Resource-Policy": "same-origin",
    "Cross-Origin-Opener-Policy": "same-origin",
  });
  assert.equal(names.includes("strict-transport-security"), false);
});

test("Next applies one enforced CSP and the shared headers to every path", async () => {
  const securityRule = securityHeaderRule();
  const values = new Map(securityRule.headers.map(({ key, value }) => [key, value]));
  assert.equal(values.size, securityRule.headers.length);
  assert.equal(values.get("Content-Security-Policy"), contentSecurityPolicy);
  assert.equal(values.has("Content-Security-Policy-Report-Only"), false);
  for (const { key, value } of securityHeaders) assert.equal(values.get(key), value);
});

test("Netlify guard preserves noindex and secures upstream and synthetic responses", async () => {
  const upstream = async () => new Response("page", { headers: { "X-Upstream": "yes" } });
  for (const path of ["/", "/robots.txt", "/sitemap.xml"]) {
    const response = await indexingGuard(
      new Request(`https://bridge-therapy-website.netlify.app${path}`),
      { next: upstream },
    );
    assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
    assert.equal(
      response.headers.get("content-security-policy"),
      contentSecurityPolicy,
    );
    assert.equal(response.headers.get("content-security-policy-report-only"), null);
    for (const { key, value } of securityHeaders)
      assert.equal(response.headers.get(key), value, `${path} ${key}`);
  }
});

test("Netlify guard adds security headers without changing redirects", async () => {
  const response = await indexingGuard(
    new Request("https://bridge-therapy-website.netlify.app/what-we-believe/"),
    {
      next: async () =>
        new Response(null, {
          status: 301,
          headers: { Location: "/christian-counseling-tyler/" },
        }),
    },
  );
  assert.equal(response.status, 301);
  assert.equal(response.headers.get("location"), "/christian-counseling-tyler/");
  assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
  assert.equal(response.headers.get("content-security-policy"), contentSecurityPolicy);
});
