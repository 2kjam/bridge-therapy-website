import fs from "node:fs";
import { chromium } from "@playwright/test";
import sharp from "sharp";
// Capture the real local homepage; hide only Next's development tooling overlay.
const origin = process.env.ANNOUNCEMENT_PREVIEW_URL || "http://127.0.0.1:3020";
if (!["localhost", "127.0.0.1"].includes(new URL(origin).hostname))
  throw new Error("Local capture only");
const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 960 },
    deviceScaleFactor: 1,
  });
  await page.goto(origin + "/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({
    content: "nextjs-portal { display: none !important; }",
  });
  const source = "public/assets/blog/welcome-to-our-new-website/homepage.png";
  await page.screenshot({ path: source });
  const variants = [];
  for (const width of [400, 800, 1080, 1440]) {
    const src = `/assets/presentation/blog/website-homepage-${width}.webp`;
    const info = await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 88, effort: 6 })
      .toFile(`public${src}`);
    variants.push({ src, width: info.width, height: info.height });
  }
  fs.writeFileSync(
    "content/new-blog/welcome-to-our-new-website/image-variants.json",
    JSON.stringify(variants, null, 2) + "\n",
  );
} finally {
  await browser.close();
}
