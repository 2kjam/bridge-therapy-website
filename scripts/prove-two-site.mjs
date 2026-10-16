// Offline/local proof only: never invokes Netlify, git push, or a hosted API.
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import assert from "node:assert/strict";
import { once } from "node:events";
import { parse } from "parse5";
import { chromium } from "@playwright/test";
import { getBlogPosts } from "../lib/blog.ts";
import guard from "../netlify/edge-functions/indexing-guard.js";
const productionSiteId = "1c0ce777-b889-4f6b-8292-ef7590a4a25e";

const root = process.cwd();
const output = path.join(root, ".netlify/verification/two-site-proof", String(Date.now()));
fs.mkdirSync(output, { recursive: true });
const productionOrigin = "https://www.thebridgetherapy.com";
const paths = [...JSON.parse(fs.readFileSync("content/seo/public-pages.json")), ...getBlogPosts().map(p => p.legacyPath.replace(/\/$/, "") + "/")].sort();
assert.equal(paths.length, 54);
const walk = n => [n, ...(n.childNodes ?? []).flatMap(walk)];
const attr = (n, name) => n.attrs?.find(a => a.name === name)?.value;
const meta = (html, name) => walk(parse(html)).filter(n => n.tagName === "meta" && attr(n, "name") === name).map(n => attr(n, "content"));
const proof = { output, productionSiteId, note: "LOCAL SIMULATION ONLY; no hosted changes", builds: [] };
const servers = [];
let browser;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const nextBin = path.join(root, "node_modules/next/dist/bin/next");
function child(args, cwd, env, logName) {
  const log = fs.openSync(path.join(output, logName), "w");
  const proc = spawn(process.execPath, [nextBin, ...args], { cwd, env, stdio: ["ignore", log, log], windowsHide: true });
  fs.closeSync(log);
  return proc;
}
try {
  for (const [mode, port] of [["production", 3036], ["staging", 3037]]) {
    console.log(`Preparing isolated ${mode} workspace`);
    const work = path.join(output, mode);
    fs.mkdirSync(work);
    for (const directory of ["app", "components", "content", "lib"])
      fs.cpSync(path.join(root, directory), path.join(work, directory), { recursive: true });
    for (const file of ["package.json", "package-lock.json", "tsconfig.json"])
      fs.copyFileSync(path.join(root, file), path.join(work, file));
    for (const directory of ["node_modules", "public"])
      fs.symlinkSync(path.join(root, directory), path.join(work, directory), process.platform === "win32" ? "junction" : "dir");
    // Only the proof workspace's resolver root differs; application policy is exact.
    const config = fs.readFileSync(path.join(root, "next.config.ts"), "utf8");
    assert.equal(config.split("trailingSlash: true,").length, 2);
    fs.writeFileSync(path.join(work, "next.config.ts"), config.replace("trailingSlash: true,", `trailingSlash: true,\n    turbopack: { root: ${JSON.stringify(root)} },`));
    const env = { ...process.env, NODE_ENV: "production", NETLIFY: "true", CONTEXT: "production", PULL_REQUEST: "false", NETLIFY_PREVIEW_SERVER: "", REVIEW_ID: "", BRIDGE_BUILD_INDEXING: "true",
      SITE_ID: mode === "production" ? productionSiteId : "22222222-2222-4222-8222-222222222222",
      URL: mode === "production" ? productionOrigin : "https://bridge-isolated-staging.example",
      BRIDGE_PRODUCTION_SITE_ID: productionSiteId,
      BRIDGE_ENABLE_INDEXING: mode === "production" ? "true" : "false" };
    const build = child(["build"], work, env, `${mode}-build.log`);
    const [code] = await once(build, "exit");
    assert.equal(code, 0, `${mode} build; inspect ${mode}-build.log`);
    const result = { mode, port, workspace: work, rows: [], hydration: [], errors: [] };
    proof.builds.push(result);
    const expected = mode === "production" ? "index, follow" : "noindex, nofollow";
    for (const route of paths) {
      const filename = route === "/" ? "index" : route.slice(1, -1);
      const html = fs.readFileSync(path.join(work, ".next/server/app", filename + ".html"), "utf8");
      assert.deepEqual(meta(html, "robots"), [expected], route);
    }
    const manifest = JSON.parse(fs.readFileSync(path.join(work, ".next/prerender-manifest.json")));
    for (const route of paths) assert.ok(Object.hasOwn(manifest.routes, route === "/" ? route : route.slice(0, -1)), `Not prerendered: ${route}`);
    const server = child(["start", "-p", String(port), "--hostname", "127.0.0.1"], work, env, `${mode}-server.log`);
    servers.push(server);
    const base = `http://127.0.0.1:${port}`;
    let ready = false;
    for (let i = 0; i < 100; i++) {
      if (server.exitCode !== null) throw Error(`${mode} server exited`);
      try { if ((await fetch(base)).ok) { ready = true; break; } } catch { /* server starting */ }
      await delay(100);
    }
    assert.ok(ready, `${mode} server readiness`);
    const descriptions = new Set();
    for (const route of paths) {
      const response = await fetch(base + route, { redirect: "manual" });
      assert.equal(response.status, 200, route);
      const html = await response.text();
      assert.deepEqual(meta(html, "robots"), [expected]);
      const nodes = walk(parse(html));
      assert.deepEqual(nodes.filter(n => n.tagName === "link" && attr(n, "rel") === "canonical").map(n => attr(n, "href")), [productionOrigin + route]);
      const descriptionsHere = meta(html, "description");
      assert.equal(descriptionsHere.length, 1);
      assert.ok(descriptionsHere[0] && !descriptions.has(descriptionsHere[0]));
      descriptions.add(descriptionsHere[0]);
      const schemas = nodes.filter(n => n.tagName === "script" && attr(n, "type") === "application/ld+json");
      assert.equal(schemas.length, 1);
      const schema = JSON.parse(schemas[0].childNodes.map(n => n.value ?? "").join(""));
      assert.equal(schema["@context"], "https://schema.org");
      assert.ok(Array.isArray(schema["@graph"]));
      const origin = mode === "production" ? productionOrigin : "https://bridge-isolated-staging.example";
      const guarded = await guard(new Request(origin + route), { next: () => new Response(html, response) });
      assert.equal(guarded.headers.get("x-robots-tag"), mode === "production" ? null : "noindex, nofollow");
      result.rows.push({ route, status: response.status, robots: expected, canonical: productionOrigin + route, schema: true, header: guarded.headers.get("x-robots-tag") });
      if (mode === "production") {
        const alias = await guard(new Request("https://bridge-therapy-website.netlify.app" + route), { site: { id: productionSiteId }, deploy: { context: "production" }, next: () => { throw Error("Alias leaked body"); } });
        assert.equal(alias.status, 301);
        assert.equal(alias.headers.get("location"), productionOrigin + route);
        assert.equal(await alias.text(), "");
        const mainAlias = await guard(new Request("https://main--bridge-therapy-website.netlify.app" + route), { site: { id: productionSiteId }, deploy: { context: "production" }, next: () => { throw Error("Main alias leaked enabled body"); } });
        assert.equal(mainAlias.status, 301);
        assert.equal(mainAlias.headers.get("location"), productionOrigin + route);
        assert.equal(await mainAlias.text(), "");
        const id = "6acbde0b31a91800096938ba";
        const permalink = await guard(new Request(`https://${id}--bridge-therapy-website.netlify.app${route}`), { site: { id: productionSiteId }, deploy: { id, context: "production", published: false }, next: () => { throw Error("Permalink leaked body"); } });
        assert.equal(permalink.status, 301);
        assert.equal(permalink.headers.get("location"), productionOrigin + route);
        assert.equal(await permalink.text(), "");
      } else {
        const permalink = await guard(new Request(`https://6ad2492ffce51fa0f290154a--bridge-therapy-staging.netlify.app${route}`), { next: () => new Response(html, response) });
        assert.equal(permalink.status, 200);
        assert.equal(permalink.headers.get("x-robots-tag"), "noindex, nofollow");
        assert.deepEqual(meta(await permalink.text(), "robots"), [expected]);
      }
    }
    const sitemap = await fetch(base + "/sitemap.xml");
    const xml = await sitemap.text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
    assert.deepEqual(urls.sort(), mode === "production" ? paths.map(p => productionOrigin + p).sort() : []);
    assert.doesNotMatch(xml, /netlify\.app|<lastmod>|<priority>|<changefreq>/);
    const robots = await (await fetch(base + "/robots.txt")).text();
    assert.match(robots, /Allow: \//);
    if (mode === "production") { assert.match(robots, /Sitemap: https:\/\/www.thebridgetherapy.com\/sitemap.xml/); assert.doesNotMatch(robots, /Disallow:/); }
    else { assert.doesNotMatch(robots, /Sitemap:/); assert.match(robots, /Disallow: \/sitemap.xml/); }
    result.sitemapCount = urls.length;
    result.robots = robots;
    console.log(`${mode}: 54 static + HTTP pages, schema, canonicals, robots and sitemap passed`);
  }
  browser = await chromium.launch({ channel: "msedge", headless: true });
  for (const result of proof.builds) {
    const page = await browser.newPage();
    page.on("pageerror", e => result.errors.push(e.message));
    page.on("console", m => { if (m.type() === "error") result.errors.push(m.text()); });
    const expected = result.mode === "production" ? "index, follow" : "noindex, nofollow";
    for (const route of paths) {
      await page.goto(`http://127.0.0.1:${result.port}${route}`, { waitUntil: "networkidle" });
      const robots = await page.locator('meta[name="robots"]').evaluateAll(ns => ns.map(n => n.content));
      assert.deepEqual(robots, [expected], `Hydrated ${result.mode} ${route}`);
      result.hydration.push({ route, robots });
    }
    assert.deepEqual(result.errors, []);
    await page.close();
    console.log(`${result.mode}: all 54 hydrated pages have one matching robots tag; no browser errors`);
  }
  proof.status = "PASS";
} catch (error) {
  proof.status = "FAIL";
  proof.error = error.stack;
  throw error;
} finally {
  if (browser) await browser.close();
  for (const server of servers) server.kill();
  fs.writeFileSync(path.join(output, "proof.json"), JSON.stringify(proof, null, 2));
  console.log(`Evidence: ${path.join(output, "proof.json")}`);
}
