import { chromium, expect } from "@playwright/test";
import fs from "node:fs";

const baseURL = process.env.INQUIRY_TEST_URL || "http://127.0.0.1:3023";
const browser = await chromium.launch({ channel: "msedge" });
fs.mkdirSync("test-results/online-therapy", { recursive: true });
try {
  const page = await browser.newPage({ baseURL, reducedMotion: "reduce" });
  await page.addInitScript(() => sessionStorage.setItem("bridge-inquiry-prompt-shown", "1"));
  for (const width of [375, 390, 768, 1024, 1100, 1280, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    const response = await page.goto("/online-therapy-texas/");
    expect(response.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText("Online Therapy & Telehealth Counseling Across Texas");
    await expect(page).toHaveTitle("Online Therapy in Texas | Telehealth Counseling | The Bridge");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /telehealth counseling across Texas/);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
    await expect(page.locator("main details")).toHaveCount(6);
    for (const summary of await page.locator("main summary").all()) {
      await summary.focus();
      expect(await summary.evaluate(node => getComputedStyle(node).outlineStyle)).not.toBe("none");
      await page.keyboard.press("Enter");
      await expect(summary.locator("..")).toHaveAttribute("open", "");
      await expect(summary.locator("..").locator("p")).toBeVisible();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator("main a.button")).toHaveCount(2);
    for (const link of await page.locator("main a.button").all()) await expect(link).toHaveAttribute("href", "/contact/");
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `test-results/online-therapy/${width}.png`, fullPage: true });
  }
  const paths = [...new Set(await page.locator('main a[href^="/"]').evaluateAll(nodes => nodes.map(node => node.getAttribute("href"))))];
  for (const path of paths) {
    const response = await page.request.get(path.split("#")[0], { maxRedirects: 0 });
    expect(response.status(), path).toBe(200);
  }
  await page.locator("main a.button").first().click();
  await expect(page).toHaveURL(/\/contact\/$/);
  await expect(page.locator("#inquiry form")).toBeVisible();
  await expect(page.locator("#location")).toHaveCount(1);
  for (const source of ["/", "/christian-counseling-tyler/"]) {
    await page.goto(source);
    const link = page.locator('main a[href="/online-therapy-texas/"]');
    await expect(link).toHaveCount(1);
    await link.click();
    await expect(page).toHaveURL(/\/online-therapy-texas\/$/);
  }
  console.log("PASS: 7 widths, metadata, FAQ keyboard controls, overflow, local destinations, contact flow, and both inbound links.");
} finally {
  await browser.close();
}
