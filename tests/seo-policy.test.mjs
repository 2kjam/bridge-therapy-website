import test from "node:test";
import assert from "node:assert/strict";
import {
  canonicalUrl,
  productionIndexingAllowed as evaluateProduction,
} from "../lib/seo/policy.ts";
import indexingGuard from "../netlify/edge-functions/indexing-guard.js";

const productionIndexingAllowed = (env) =>
  evaluateProduction(env, "phase-production-build");
const verified = {
  BRIDGE_ENABLE_INDEXING: "true",
  NODE_ENV: "production",
  NETLIFY: "true",
  CONTEXT: "production",
  URL: "https://www.thebridgetherapy.com",
  SITE_ID: "11111111-2222-3333-4444-555555555555",
  BRIDGE_PRODUCTION_SITE_ID: "11111111-2222-3333-4444-555555555555",
};
test("indexing requires every trusted production identity condition", () => {
  assert.equal(productionIndexingAllowed(verified), true);
  for (const phase of [
    undefined,
    "phase-development-server",
    "phase-test",
    "unknown",
  ])
    assert.equal(evaluateProduction(verified, phase), false);
  assert.equal(productionIndexingAllowed({}), false);
  assert.equal(productionIndexingAllowed({ NODE_ENV: "production" }), false);
  for (const key of Object.keys(verified)) {
    for (const value of [undefined, "", "false", "unknown"]) {
      assert.equal(
        productionIndexingAllowed({ ...verified, [key]: value }),
        false,
        key + ": " + value,
      );
    }
  }
  for (const [key, value] of [
    ["NETLIFY_PREVIEW_SERVER", "true"],
    ["PULL_REQUEST", "true"],
    ["REVIEW_ID", "12"],
  ]) {
    assert.equal(
      productionIndexingAllowed({ ...verified, [key]: value }),
      false,
    );
  }
  for (const context of ["dev", "deploy-preview", "branch-deploy"]) {
    assert.equal(
      productionIndexingAllowed({ ...verified, CONTEXT: context }),
      false,
    );
  }
  for (const url of [
    "https://preview.netlify.app",
    "http://www.thebridgetherapy.com",
    "https://thebridgetherapy.com",
    verified.URL + "/",
    verified.URL + "?index=true",
  ]) {
    assert.equal(productionIndexingAllowed({ ...verified, URL: url }), false);
  }
  assert.equal(
    productionIndexingAllowed({ BRIDGE_BUILD_INDEXING: "true" }),
    false,
  );
});
test("canonical origin is fixed and input accepts only plain content paths", () => {
  assert.equal(canonicalUrl("/"), verified.URL + "/");
  assert.equal(canonicalUrl("/about"), verified.URL + "/about/");
  assert.equal(
    canonicalUrl("/news/2026/1/19/article/"),
    verified.URL + "/news/2026/1/19/article/",
  );
  for (const input of [
    "https://evil.test/",
    "//evil.test",
    "/about//",
    "/about?q=x",
    "/about#x",
    "/../about",
    "/%2fabout",
    "/about\\evil",
    "",
  ]) {
    assert.throws(() => canonicalUrl(input));
  }
});
test("Netlify aliases always receive noindex and cannot expose a production sitemap", async () => {
  for (const origin of [
    "https://review.netlify.app",
    "https://deploy-preview-4--bridge.netlify.app",
    "https://branch--bridge.netlify.app",
    "https://123--bridge.netlify.app",
    "http://localhost:3012",
    "https://temporary.example",
    "http://www.thebridgetherapy.com",
  ]) {
    for (const path of [
      "/",
      "/about/?index=true",
      "/news/",
      "/assets/photo.webp",
      "/missing/",
    ]) {
      const request = new Request(origin + path, {
        headers: {
          "X-Forwarded-Host": "www.thebridgetherapy.com",
          "X-Forwarded-Proto": "https",
          "X-Indexing": "true",
        },
      });
      const response = await indexingGuard(request, {
        next: () =>
          new Response("content", {
            headers: { "X-Robots-Tag": "index, follow" },
          }),
      });
      assert.equal(response.headers.get("X-Robots-Tag"), "noindex, nofollow");
      assert.equal(await response.text(), "content");
    }
    for (const path of ["/sitemap.xml", "/sitemap.xml/?index=true"]) {
      const response = await indexingGuard(new Request(origin + path), {
        next: () => {
          throw new Error("Must not fetch sitemap");
        },
      });
      assert.equal(response.status, 404);
      assert.equal(response.headers.get("X-Robots-Tag"), "noindex, nofollow");
      assert.equal(await response.text(), "");
    }
    const robots = await indexingGuard(new Request(origin + "/robots.txt"), {
      next: () => {
        throw new Error("Must not fetch production robots");
      },
    });
    assert.equal(
      await robots.text(),
      "User-Agent: *\nAllow: /\nDisallow: /sitemap.xml\n",
    );
  }
});
test("host guard never enables indexing and preserves downstream redirects", async () => {
  for (const policy of ["index, follow", "noindex, nofollow"]) {
    const response = await indexingGuard(new Request(verified.URL + "/"), {
      next: () => new Response("ok", { headers: { "X-Robots-Tag": policy } }),
    });
    assert.equal(response.headers.get("X-Robots-Tag"), policy);
  }
  const response = await indexingGuard(
    new Request("https://review.netlify.app/news"),
    {
      next: () =>
        new Response(null, { status: 301, headers: { Location: "/blog/" } }),
    },
  );
  assert.equal(response.status, 301);
  assert.equal(response.headers.get("Location"), "/blog/");
  assert.equal(response.headers.get("X-Robots-Tag"), "noindex, nofollow");
});
