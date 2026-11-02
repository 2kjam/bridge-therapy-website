import { test, expect } from "@playwright/test";

const articles = [
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
        expect(data.src).toContain("/assets/presentation/blog/");
        expect(data.width).toBeLessThanOrEqual(1080);
        expect(data.ratio).toBeCloseTo(data.originalRatio, 1);
        expect(data.priority).toBe("high");
        expect(data.loading).not.toBe("lazy");
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
