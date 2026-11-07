import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import guard from "../netlify/edge-functions/indexing-guard.js";

const content = fs.readFileSync("public/llms.txt", "utf8");
const canonicalOrigin = "https://www.thebridgetherapy.com";
const pages = new Set(JSON.parse(fs.readFileSync("content/seo/public-pages.json", "utf8")));

test("llms.txt stays concise Markdown with links to existing canonical pages", () => {
  assert.match(content, /^# The Bridge Therapeutic Services\n/);
  assert.equal((content.match(/^# /gm) ?? []).length, 1);
  assert.ok(Buffer.byteLength(content) < 8000);
  assert.doesNotMatch(content, /<html|netlify\.app|localhost/i);
  const links = [...content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map(match => match[1]);
  assert.ok(links.length > 0);
  assert.equal(new Set(links).size, links.length);
  for (const link of links) {
    const url = new URL(link);
    assert.equal(url.origin, canonicalOrigin);
    assert.equal(url.search + url.hash, "");
    assert.ok(pages.has(url.pathname), `Unknown canonical page: ${link}`);
  }
});

test("llms.txt static body survives the host guard with staging protected", async () => {
  for (const [origin, expectedRobots] of [[canonicalOrigin, null], ["https://bridge-therapy-staging.netlify.app", "noindex, nofollow"]]) {
    let calls = 0;
    const response = await guard(new Request(origin + "/llms.txt"), {
      next: () => {
        calls++;
        return new Response(content, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
      },
    });
    assert.equal(calls, 1);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("location"), null);
    assert.equal(response.headers.get("x-robots-tag"), expectedRobots);
    assert.equal(await response.text(), content);
  }
});
