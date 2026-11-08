import { test, expect } from "@playwright/test";
import fs from "node:fs";

const images = JSON.parse(fs.readFileSync("lib/optimized-images.json", "utf8"));
const variants = new Map<string, { width: number }>();
for (const entry of Object.values(images) as Array<{ variants: Array<{ src: string; width: number }>; avifVariants?: Array<{ src: string; width: number }> }>) {
  for (const variant of [...entry.variants, ...(entry.avifVariants ?? [])]) variants.set(variant.src, variant);
}
const selector = ".ivory-hero-photo,.ivory-next-background,.ivory-service img,.homepage-team-carousel img,.insurance-logos img,img[src='/assets/chat-assistant.webp']";

for (const width of [320, 375, 390, 768, 1440]) {
  test(`homepage image delivery preserves frames and native-density detail at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.addInitScript(() => sessionStorage.setItem("bridge-inquiry-prompt-shown", "1"));
    await page.goto("/");
    const pictures = page.locator(selector);
    const before = await pictures.evaluateAll(nodes => nodes.map(n => {
      const r = n.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height };
    }));
    const rows = await pictures.evaluateAll(async nodes => {
      await Promise.all(nodes.map(async node => {
        const image = node as HTMLImageElement;
        if (!image.classList.contains("ivory-hero-photo")) image.loading = "eager";
        await image.decode();
      }));
      return nodes.map(node => {
        const image = node as HTMLImageElement, box = image.getBoundingClientRect();
        return { fallback: image.getAttribute("src")!, selected: new URL(image.currentSrc).pathname, width: box.width, height: box.height, fit: getComputedStyle(image).objectFit, dpr: devicePixelRatio };
      });
    });
    expect(await pictures.evaluateAll(nodes => nodes.map(n => {
      const r = n.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height };
    }))).toEqual(before);
    for (const row of rows) {
      const source = images[row.fallback] ?? Object.values(images).find((entry: unknown) => [...(entry as { variants: Array<{src: string}> }).variants, ...((entry as { avifVariants?: Array<{src: string}> }).avifVariants ?? [])].some(v => v.src === row.selected));
      expect(source, row.selected).toBeTruthy();
      const entry = source as {width:number;height:number;variants:Array<{src:string;width:number}>};
      const variant = variants.get(row.selected)!;
      expect(variant, row.selected).toBeTruthy();
      const ratio = entry.width / entry.height;
      const slot = row.fit === "cover" ? Math.max(row.width, row.height * ratio) : row.fit === "contain" ? Math.min(row.width, row.height * ratio) : row.width;
      const largest = Math.max(...entry.variants.map(v => v.width));
      expect(variant.width, row.selected).toBeGreaterThanOrEqual(Math.min(Math.ceil(slot * row.dpr) - 1, largest));
    }
    await expect(page.locator(".ivory-hero-photo")).toHaveAttribute("fetchpriority", "high");
    await expect(page.locator(".ivory-hero-photo")).not.toHaveAttribute("loading", "lazy");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: info.outputPath(`homepage-images-${width}.png`), fullPage: true });
  });
}

test("llms.txt is a static plain-text response with staging indexing protection", async ({ request }) => {
  for (const method of ["GET", "HEAD"]) {
    const response = await request.fetch("/llms.txt", { method, maxRedirects: 0 });
    expect(response.status()).toBe(200);
    expect(response.headers()["location"]).toBeUndefined();
    expect(response.headers()["content-type"]).toMatch(/^text\/plain/);
    expect(response.headers()["x-robots-tag"]).toBe("noindex, nofollow");
    expect(await response.text()).toBe(method === "GET" ? fs.readFileSync("public/llms.txt", "utf8") : "");
  }
});
