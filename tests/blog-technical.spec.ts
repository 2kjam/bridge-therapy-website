import { test, expect } from "@playwright/test";

const articles = [
  "/blog/christian-grief-counseling/",
  "/blog/marriage-communication-problems/",
  "/blog/blended-family-counseling/",
  "/blog/online-couples-counseling/",
  "/blog/religious-trauma-therapy/",
  "/news/2021/4/11/the-bridge-community-spotlight-featuring-beth-reed-with-sightorg/",
  "/news/2026/8/21/how-to-calm-an-anxious-mind-learning-to-quiet-your-soul-with-god/",
  "/news/2019/5/21/storm-anxiety/",
  "/news/2026/1/18/what-is-emdr-therapy-and-how-does-it-work/",
];

for (const width of [320, 375, 390, 768, 1440]) {
  test(`article technical SEO and layout at ${width}px`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height: 950 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const path of articles) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(
        page.locator(
          '.legacy-article-body a[href*="schedule-an-apointment"], .legacy-article-body a[href="/our-story"]',
        ),
      ).toHaveCount(0);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const image = page.locator(".blog-featured-image");
      if (await image.count()) {
        const data = await image.evaluate(async (img: HTMLImageElement) => {
          await img.decode();
          return {
            src: img.currentSrc,
            width: img.naturalWidth,
            ratio: img.width / img.height,
            originalRatio:
              Number(img.getAttribute("width")) /
              Number(img.getAttribute("height")),
            priority: img.fetchPriority,
            loading: img.loading,
          };
        });
        expect(data.src).toContain(path.startsWith("/blog/") ? "/assets/blog/approved-2026-11/" : "/assets/presentation/blog/");
        expect(data.width).toBeLessThanOrEqual(path.startsWith("/blog/") ? 1260 : 1080);
        expect(data.ratio).toBeCloseTo(data.originalRatio, 1);
        expect(data.priority).toBe("high");
        expect(data.loading).not.toBe("lazy");
      }
      if (path.startsWith("/blog/")) {
        const threeCards = ["blended-family-counseling", "christian-grief-counseling", "marriage-communication-problems"].some(slug => path.includes(slug));
        await expect(page.locator(".blog-support-card")).toHaveCount(threeCards ? 3 : 2);
        const authorCard = page.locator(".blog-author-card");
        await expect(authorCard).toHaveCount(1);
        await expect(authorCard).toHaveCSS("flex-wrap", "nowrap");
        await expect(authorCard.getByRole("heading", { name: "Jennifer Wood LPC-S", exact: true })).toBeVisible();
        const profileLink = authorCard.getByRole("link", { name: /View Jennifer’s profile/ });
        await expect(profileLink).toHaveAttribute("href", "/therapists/jennifer-wood/");
        await profileLink.focus();
        expect(await profileLink.evaluate(node => getComputedStyle(node).outlineStyle)).not.toBe("none");
        expect(await authorCard.evaluate(node => node.getBoundingClientRect().right <= innerWidth)).toBe(true);
        await expect(page.locator("main")).not.toContainText(/Adam|BabyLoveGrowth/i);
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.thebridgetherapy.com" + path);
        const structure = await page.locator(".legacy-article-body").evaluate((body) => ({
          brokenAnchors: [...body.querySelectorAll('a[href^="#"]')].filter(a => !document.getElementById(a.getAttribute("href")!.slice(1))).length,
          externalMedia: [...body.querySelectorAll("img")].filter(img => !img.getAttribute("src")!.startsWith("/assets/blog/approved-2026-11/")).length,
          unsizedImages: [...body.querySelectorAll("img")].filter(img => !img.width || !img.height || img.loading !== "lazy").length,
          headings: body.querySelectorAll("h2,h3").length,
        }));
        expect(structure.brokenAnchors).toBe(0);
        expect(structure.externalMedia).toBe(0);
        expect(structure.unsizedImages).toBe(0);
        expect(structure.headings).toBeGreaterThan(20);
      }
      await page.screenshot({
        path: info.outputPath(
          `${path.split("/").filter(Boolean).at(-1)}-${width}.png`,
        ),
        fullPage: true,
      });
    }
    expect(errors).toEqual([]);
  });
}

test("contextual article links lead directly to service and contact pages", async ({
  page,
  request,
}) => {
  await page.goto("/news/2026/1/19/what-is-anxiety-therapy/");
  const body = page.locator(".legacy-article-body");
  await expect(
    body.locator('a[href="/anxiety-counseling-tyler/"]'),
  ).toHaveCount(1);
  await expect(body.locator('a[href="/emdr-therapy-tyler/"]')).toHaveCount(1);
  await expect(body.locator('a[href="/contact/"]')).toHaveCount(1);
  for (const path of [
    "/anxiety-counseling-tyler/",
    "/emdr-therapy-tyler/",
    "/contact/",
  ]) {
    expect((await request.get(path, { maxRedirects: 0 })).status()).toBe(200);
  }
  await page.goto(
    "/news/2026/8/21/how-to-calm-an-anxious-mind-learning-to-quiet-your-soul-with-god/",
  );
  await expect(body.locator('a[href="/contact/"]')).toHaveCount(1);
  await expect(
    body.locator('a[href="/christian-counseling-tyler/"]'),
  ).toHaveCount(1);
});
