import { test, expect } from "@playwright/test";
import fs from "node:fs";
import crypto from "node:crypto";
import sharp from "sharp";
import manifest from "../content/service-images.json";

const imported = manifest.images.filter(record => record.status === "imported");

test("service images: production files and scope", async ({ request }) => {
  for (const file of fs.readdirSync(".next/server/app", { recursive: true }).filter(file => String(file).endsWith(".html"))) {
    expect(fs.readFileSync(`.next/server/app/${file}`, "utf8"), String(file)).not.toMatch(/individual-care\.jpg|6948152/);
  }
  expect(imported).toHaveLength(19);
  expect(crypto.createHash("sha256").update(fs.readFileSync("public/assets/services/service-adhd.webp")).digest("hex"))
    .toBe("27f1c69307f96807cb3b50af4547d2264956c54259b88ac10e7f3fe060b0f399");
  expect(new Set(imported.map(record => record.production!.sha256)).size).toBe(19);
  const replacements = imported.filter(record => !["adhd", "online", "anxiety", "depression", "parenting"].includes(record.slug));
  expect(replacements).toHaveLength(14);
  expect(new Set(replacements.map(record => record.source)).size).toBe(14);
  for (const record of replacements) {
    expect(record.source).toMatch(/^https:\/\/unsplash.com\/photos\//);
    expect("license" in record && record.license).toBe("https://unsplash.com/license");
  }
  expect(fs.readdirSync("public/assets/services").sort()).toEqual(imported.flatMap(r => 'responsive' in r ? r.responsive!.map(v => v.path.split("/").pop()) : [r.production!.path.split("/").pop()]).sort());
  for (const record of imported) {
    const production = record.production!;
    const bytes = fs.readFileSync(`public${production.path}`);
    expect(bytes.length).toBe(production.bytes);
    expect(bytes.length).toBeLessThan(250_000);
    expect(crypto.createHash("sha256").update(bytes).digest("hex")).toBe(production.sha256);
    const metadata = await sharp(bytes).metadata();
    expect([metadata.width, metadata.height, metadata.format]).toEqual([production.width, production.height, production.format === "avif" ? "heif" : "webp"]);
    expect((await request.get(production.path)).status()).toBe(200);
    if ('responsive' in record) {
      for (const variant of record.responsive!) {
        const bytes = fs.readFileSync(`public${variant.path}`);
        expect(bytes.length).toBe(variant.bytes);
        expect(crypto.createHash("sha256").update(bytes).digest("hex")).toBe(variant.sha256);
      }
    }
  }
  for (const record of imported) {
    expect(fs.readFileSync(`app${record.route}page.tsx`, "utf8")).not.toContain('/assets/individual-care.jpg');
  }
  expect(fs.readFileSync("app/marriage-counseling-tyler/page.tsx", "utf8")).toContain('/assets/services/service-marriage.webp');
  expect(fs.readFileSync("app/family-counseling-tyler/page.tsx", "utf8")).toContain('/assets/services/service-family.webp');
});

for (const record of imported) {
  test(`service images: ${record.slug} at seven crop widths`, async ({ page }, testInfo) => {
    const retiredRequests: string[] = [];
    page.on("request", request => { if (/individual-care\.jpg|6948152/.test(request.url())) retiredRequests.push(request.url()); });
    for (const width of [375, 390, 768, 900, 901, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(record.route);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
      const image = page.locator(".service-hero img");
      await expect(image).toHaveAttribute("src", record.production!.path);
      await expect(image).toHaveAttribute("alt", record.alt!);
      await expect(image).toHaveAttribute("width", String(record.production!.width));
      await expect(image).toHaveAttribute("height", String(record.production!.height));
      expect(await image.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true);
      const expectedRatio = record.production!.width / record.production!.height;
      // Width-descriptor srcsets can round density-corrected natural dimensions
      // to whole CSS pixels on high-DPR devices; check within that rounding bound.
      const natural = await image.evaluate((node: HTMLImageElement) => ({ width: node.naturalWidth, height: node.naturalHeight }));
      expect(Math.abs(natural.width - natural.height * expectedRatio)).toBeLessThanOrEqual(2);
      if ('displayHeight' in record) {
        const box = await image.boundingBox();
        expect(box!.width / box!.height).toBeCloseTo(expectedRatio, 2);
      }
      await expect(image).toHaveCSS("object-fit", "cover");
      await expect(image).toHaveCSS("object-position", record.objectPosition!);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await image.screenshot({ path: testInfo.outputPath(`${record.slug}-${width}.png`) });
    }
    expect(retiredRequests).toEqual([]);
  });
}
