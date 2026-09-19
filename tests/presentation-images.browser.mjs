import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
const browser = await chromium.launch({ channel: "msedge" });
const base = process.env.INQUIRY_TEST_URL || "http://127.0.0.1:3032";
try {
  for (const width of [375, 390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: "reduce" });
    await context.addInitScript(() => sessionStorage.setItem("bridge-inquiry-prompt-shown", "1"));
    const page = await context.newPage();
    await page.goto(base + "/anxiety-counseling-tyler/");
    for (const [label, panel] of [["Counseling Services", "care-panel"], ["Our Therapists", "team-panel"], ["Resources", "about-panel"]]) {
      if (!await page.locator("#navigation").isVisible()) await page.locator(".mobile-toggle").click();
      const trigger = page.getByRole("button", { name: label, exact: true });
      await trigger.focus(); await page.keyboard.press("ArrowDown");
      await expect(page.locator(`#${panel}`)).toBeVisible();
      const pictures = page.locator(`#${panel} img`);
      for (const image of await pictures.all()) {
        await image.scrollIntoViewIfNeeded();
        const before = await image.boundingBox();
        await expect.poll(() => image.evaluate(i => i.complete && i.naturalWidth > 0)).toBe(true);
        assert.deepEqual(await image.boundingBox(), before, "Image loading must not change its reserved frame");
        assert.equal(await image.getAttribute("loading"), "lazy");
      }
      await page.keyboard.press("Escape");
    }
    for (const route of ["/", "/blog/", "/anxiety-counseling-tyler/", "/contact/"]) {
      await page.goto(base + route);
      for (const image of await page.locator("main img:visible").all()) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate(i => i.complete && i.naturalWidth > 0)).toBe(true);
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${width} ${route}: overflow`);
    }
    await context.close();
    console.log(`${width}px: menu keyboard/loading stability, all page images, and overflow checks passed`);
  }
} finally { await browser.close(); }
