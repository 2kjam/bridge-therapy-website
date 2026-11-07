import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs";
const base = process.env.ANNOUNCEMENT_PREVIEW_URL || "http://127.0.0.1:3042";
assert.ok(
  ["localhost", "127.0.0.1"].includes(new URL(base).hostname),
  "Local verification only",
);
const browser = await chromium.launch({ channel: "msedge", headless: true });
fs.mkdirSync("tmp/announcement-qa", { recursive: true });
const results = [];
try {
  for (const width of [375, 390, 768, 1440]) {
    for (const route of ["/blog/welcome-to-our-new-website/", "/blog/"]) {
      const page = await browser.newPage({ viewport: { width, height: 960 } });
      await page.addInitScript(() => {
        window.announcementLayoutShift = 0;
        window.announcementContentLayoutShift = 0;
        window.announcementShiftSources = [];
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries())
            if (!entry.hadRecentInput) {
              window.announcementLayoutShift += entry.value;
              // The unchanged floating inquiry widget can animate after its delay.
              // Record it separately; assert that article/index content stays stable.
              const sources = entry.sources.map((source) => source.node);
              const widgetOnly =
                sources.length > 0 &&
                sources.every(
                  (node) =>
                    node instanceof Element &&
                    node.closest('[class*="_widget"], [class*="_launcher"]'),
                );
              if (!widgetOnly)
                window.announcementContentLayoutShift += entry.value;
              window.announcementShiftSources.push({
                value: entry.value,
                widgetOnly,
                classes: sources.map((node) => node?.className),
              });
            }
        }).observe({ type: "layout-shift", buffered: true });
      });
      const response = await page.goto(base + route, {
        waitUntil: "networkidle",
      });
      assert.equal(response.status(), 200);
      await page.evaluate(() => document.fonts.ready);
      await page.addStyleTag({
        content: "nextjs-portal {display:none!important}",
      });
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
        `${route} ${width} overflow`,
      );
      assert.equal(await page.locator("h1").count(), 1);
      for (const img of await page.locator("main img").all()) {
        await img.scrollIntoViewIfNeeded();
        await img.evaluate((i) => i.decode());
        assert.equal(
          await img.evaluate((i) => i.complete && i.naturalWidth > 0),
          true,
        );
      }
      await page.evaluate(() => scrollTo(0, 0));
      if (route.includes("welcome")) {
        assert.equal(
          await page.title(),
          "Welcome to Our New Website | The Bridge Therapeutic Services",
        );
        assert.equal(await page.locator("link[rel=canonical]").count(), 1);
        assert.equal(
          await page.locator("link[rel=canonical]").getAttribute("href"),
          "https://www.thebridgetherapy.com" + route,
        );
        assert.equal(await page.locator("meta[name=description]").count(), 1);
        assert.equal(
          await page
            .locator('meta[property="og:type"]')
            .getAttribute("content"),
          "article",
        );
        assert.equal(
          await page.locator('main a[href="https://2kjam.com/"]').count(),
          1,
        );
        assert.equal(
          await page.locator('main a[href="https://2kjam.com/"]').textContent(),
          "2KJAM",
        );
        const graph = await page
          .locator('script[type="application/ld+json"]')
          .evaluateAll((nodes) =>
            nodes.flatMap((n) => JSON.parse(n.textContent)["@graph"] || []),
          );
        const post = graph.find((n) => n["@type"] === "BlogPosting");
        assert.equal(
          post.author["@id"],
          "https://www.thebridgetherapy.com/#organization",
        );
        assert.equal(post.datePublished, "2026-10-28");
        assert.equal(
          await page
            .locator('meta[property="article:published_time"]')
            .getAttribute("content"),
          "2026-10-28T05:00:00.000Z",
        );
        assert.ok(post.description);
        assert.deepEqual(
          graph
            .find((n) => n["@type"] === "BreadcrumbList")
            .itemListElement.map((i) => i.name),
          ["Home", "Blog", "Welcome to Our New Website!"],
        );
        assert.equal(await page.locator("main time").count(), 1);
        assert.equal(
          await page.locator("main time").getAttribute("datetime"),
          "2026-10-28",
        );
        assert.equal(
          await page.locator("main time").textContent(),
          "October 28, 2026",
        );
        for (const href of ["/therapists/", "/blog/"])
          assert.equal((await page.request.get(base + href)).status(), 200);
      } else {
        assert.equal(await page.locator(".blog-card").count(), 20);
        assert.equal(
          await page
            .locator(".blog-card")
            .first()
            .locator("time")
            .getAttribute("datetime"),
          "2026-10-28",
        );
        assert.equal(
          await page.locator(".blog-card-link").first().getAttribute("href"),
          "/blog/welcome-to-our-new-website/",
        );
      }
      await page.screenshot({
        path: `tmp/announcement-qa/${width}-${route.includes("welcome") ? "article" : "index"}.png`,
        fullPage: true,
      });
      const layoutShift = await page.evaluate(
        () => window.announcementLayoutShift,
      );
      const contentLayoutShift = await page.evaluate(
        () => window.announcementContentLayoutShift,
      );
      const shiftSources = await page.evaluate(
        () => window.announcementShiftSources,
      );
      assert.ok(
        contentLayoutShift < 0.1,
        `${width} ${route}: unexpected content layout shift ${contentLayoutShift}`,
      );
      results.push({
        width,
        route,
        layoutShift,
        contentLayoutShift,
        shiftSources,
        status: "pass",
      });
      await page.close();
    }
  }
  fs.writeFileSync(
    "tmp/announcement-qa/results.json",
    JSON.stringify(results, null, 2),
  );
  console.log(JSON.stringify(results));
} finally {
  await browser.close();
}
