import { test, expect } from "@playwright/test";
import fs from "node:fs";
const posts = fs
  .readdirSync("content/blog", { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) =>
    JSON.parse(fs.readFileSync(`content/blog/${d.name}/metadata.json`, "utf8")),
  )
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
const representative = new Set([
  "how-to-calm-an-anxious-mind-learning-to-quiet-your-soul-with-god",
  "can-emdr-be-integrated-with-christian-counseling",
  "simple-ways-to-lower-stress-during-the-holidays",
  "the-bridge-community-spotlight-featuring-beth-reed-with-sightorg",
  "storm-anxiety",
  "emdr-therapy-for-trauma-and-ptsd-in-tyler-tx",
  "take-heart",
]);
test("all 19 legacy routes and article links resolve; unknown paths return 404", async ({
  request,
}) => {
  for (const post of posts) {
    const response = await request.get(post.legacyPath, { maxRedirects: 0 });
    expect(response.status(), post.legacyPath).toBe(308);
    expect(response.headers().location).toBe(`${post.legacyPath}/`);
    expect(
      (await request.get(`${post.legacyPath}/`)).status(),
      post.legacyPath,
    ).toBe(200);
  }
  for (const route of [
    "/news/unknown-article/",
    "/news/2026/9/16/unknown-article/",
  ])
    expect((await request.get(route)).status()).toBe(404);
});
for (const width of [375, 390, 768, 1440]) {
  test(`all 19 article layouts and representative screenshots at ${width}px`, async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name === "mobile",
      "All widths covered once; original mobile-context interactions covered separately.",
    );
    test.setTimeout(180_000);
    await page.setViewportSize({ width, height: 950 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const post of posts) {
      await page.goto(`${post.legacyPath}/`);
      await expect(page.locator("#article-title")).toHaveText(post.title);
      await expect(page.locator(".blog-meta time")).toHaveAttribute(
        "datetime",
        post.publicationDate,
      );
      await expect(page.locator(".blog-meta span")).toHaveText(
        `Written By ${post.displayedByline}`,
      );
      const layout = await page
        .locator(".blog-article")
        .evaluate(async (article) => {
          const images = Array.from(article.querySelectorAll("img"));
          // Decode lazy images too, including below-the-fold body placements.
          await Promise.all(
            images.map(async (image) => {
              image.loading = "eager";
              await image.decode();
            }),
          );
          return {
            overflow: document.documentElement.scrollWidth > innerWidth,
            bodyWidth: article
              .querySelector(".legacy-article-body")!
              .getBoundingClientRect().width,
            images: images.map((image) => ({
              src: image.getAttribute("src"),
              natural: [image.naturalWidth, image.naturalHeight],
              width: image.getBoundingClientRect().width,
              height: image.getBoundingClientRect().height,
            })),
            frames: Array.from(article.querySelectorAll("iframe")).map(
              (frame) => ({
                width: frame.getBoundingClientRect().width,
                height: frame.getBoundingClientRect().height,
              }),
            ),
          };
        });
      expect(layout.overflow, post.title).toBe(false);
      expect(layout.bodyWidth).toBeLessThanOrEqual(720);
      expect(layout.bodyWidth).toBeGreaterThanOrEqual(
        Math.min(width - 44, 600),
      );
      for (const image of layout.images) {
        const mapping = (post.assets ?? [post.featuredImage]).find(
          (a: { src: string }) => a.src === image.src,
        );
        expect(image.natural).toEqual([mapping.width, mapping.height]);
        expect(image.width / image.height).toBeCloseTo(
          mapping.width / mapping.height,
          2,
        );
      }
      for (const frame of layout.frames) {
        expect(frame.width).toBeLessThanOrEqual(layout.bodyWidth);
        expect(frame.width / frame.height).toBeCloseTo(426 / 240, 2);
      }
      const slug = post.legacyPath.split("/").at(-1);
      if (representative.has(slug))
        await page.screenshot({
          path: testInfo.outputPath(`${slug}-${width}.png`),
          fullPage: true,
        });
      expect(errors, post.title).toEqual([]);
    }
    await page.goto("/blog/");
    await expect(page.locator(".blog-card h2")).toHaveText(
      posts.map((p) => p.title),
    );
    await expect(page.locator(".blog-card-excerpt")).toHaveCount(3);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
  });
}
test("Vimeo reference and browser availability evidence", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name === "mobile",
    "One independent playback availability observation.",
  );
  const responses: { url: string; status: number }[] = [];
  page.on("response", (response) => {
    if (response.url().includes("player.vimeo.com/video/337499860"))
      responses.push({ url: response.url(), status: response.status() });
  });
  await page.goto("/news/2019/5/21/storm-anxiety/");
  const iframe = page.locator(".legacy-video iframe");
  await iframe.scrollIntoViewIfNeeded();
  await expect(iframe).toHaveAttribute(
    "src",
    "https://player.vimeo.com/video/337499860?app_id=122963&wmode=opaque",
  );
  await expect(iframe).toHaveAttribute("title", "Storm Anxiety w/ Doc Deason");
  await expect(iframe).toHaveAttribute("allow", "fullscreen");
  const frame = await (await iframe.elementHandle())!.contentFrame();
  let visibleText = "";
  try {
    visibleText = await frame!.locator("body").innerText({ timeout: 15000 });
  } catch {
    visibleText = "Player did not provide readable content within 15 seconds.";
  }
  let playback: {
    verified: boolean;
    currentTime?: number;
    duration?: number;
    detail?: string;
  } = { verified: false };
  try {
    await frame!
      .getByRole("button", { name: "Play", exact: true })
      .first()
      .click({ timeout: 10000 });
    await expect
      .poll(
        async () =>
          frame!
            .locator("video")
            .evaluate((video: HTMLVideoElement) => video.currentTime),
        { timeout: 15000 },
      )
      .toBeGreaterThan(0);
    playback = await frame!
      .locator("video")
      .evaluate((video: HTMLVideoElement) => ({
        verified: !video.paused && video.currentTime > 0,
        currentTime: video.currentTime,
        duration: video.duration,
      }));
    await frame!
      .locator("video")
      .evaluate((video: HTMLVideoElement) => video.pause());
  } catch (error) {
    playback.detail = String(error);
  }
  await testInfo.attach("vimeo-availability", {
    body: JSON.stringify({ responses, visibleText, playback }, null, 2),
    contentType: "application/json",
  });
  fs.writeFileSync(
    testInfo.outputPath("vimeo-availability.json"),
    JSON.stringify({ responses, visibleText, playback }, null, 2),
  );
  await page.screenshot({ path: testInfo.outputPath("vimeo-browser.png") });
});
