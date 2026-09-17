import { test, expect } from "@playwright/test";
import fs from "node:fs";
import crypto from "node:crypto";
import sharp from "sharp";
import manifest from "../content/service-images.json";

const imported = manifest.images.filter(record => record.status === "imported");

test("service images: production files and scope", async ({ request }) => {
  expect(imported).toHaveLength(7);
  expect(fs.readdirSync("public/assets/services").sort()).toEqual(imported.map(r => r.production!.path.split("/").pop()).sort());
  for (const record of imported) {
    const production = record.production!;
    const bytes = fs.readFileSync(`public${production.path}`);
    expect(bytes.length).toBe(production.bytes);
    expect(bytes.length).toBeLessThan(250_000);
    expect(crypto.createHash("sha256").update(bytes).digest("hex")).toBe(production.sha256);
    const metadata = await sharp(bytes).metadata();
    expect([metadata.width, metadata.height, metadata.format]).toEqual([1440, 1080, "webp"]);
    expect((await request.get(production.path)).status()).toBe(200);
  }
  const unchanged = ["individual-counseling", "anxiety-counseling", "depression-counseling", "trauma-therapy", "grief-counseling", "life-transitions-counseling", "christian-counseling", "emdr-therapy"];
  for (const slug of unchanged) {
    expect(fs.readFileSync(`app/${slug}-tyler/page.tsx`, "utf8")).toContain('/assets/individual-care.jpg');
  }
  expect(fs.readFileSync("app/marriage-counseling-tyler/page.tsx", "utf8")).toContain('/assets/couples-care.jpg');
  expect(fs.readFileSync("app/family-counseling-tyler/page.tsx", "utf8")).toContain('/assets/family-care.jpg');
});

for (const record of imported) {
  test(`service images: ${record.slug} at six crop widths`, async ({ page }, testInfo) => {
    for (const width of [375, 390, 768, 900, 901, 1440]) {
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(record.route);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
      const image = page.locator(".service-hero img");
      await expect(image).toHaveAttribute("src", record.production!.path);
      await expect(image).toHaveAttribute("alt", record.alt!);
      await expect(image).toHaveAttribute("width", "1440");
      await expect(image).toHaveAttribute("height", "1080");
      await expect(image).toHaveJSProperty("naturalWidth", 1440);
      await expect(image).toHaveJSProperty("naturalHeight", 1080);
      await expect(image).toHaveCSS("object-fit", "cover");
      await expect(image).toHaveCSS("object-position", record.objectPosition!);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await image.screenshot({ path: testInfo.outputPath(`${record.slug}-${width}.png`) });
    }
  });
}
