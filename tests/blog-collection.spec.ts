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
  "traumatic-memories-and-treatment",
  "emdr-therapy-for-trauma-and-ptsd-in-tyler-tx",
  "take-heart",
]);
for (const width of [375, 390, 768, 1440]) {
  test(`Traumatic Memories presentation: one portrait and no CBS19 spacer at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/news/2019/2/3/traumatic-memories-and-treatment/");
    await expect(page.locator(".blog-featured-image")).toHaveCount(0);
    const body = page.locator("[data-original-article-body]");
    await expect(body.locator('img[src$="/featured.jpg"]')).toHaveCount(1);
    await expect(body.locator("figure")).toHaveCount(2);
    await expect(page.locator(".blog-meta span")).toHaveText("Written by Erin Young, LCSW-S");
    await expect(page.locator(".blog-meta a")).toHaveAttribute("href", "/therapists/erin-young/");
    const destination = "https://www.cbs19.tv/video/news/local/tyler-news/mistaken-identity/501-8386488?jwsource=cl";
    const link = body.locator("figure a");
    await expect(link).toHaveAttribute("href", destination);
    const image = link.locator("img");
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((node: HTMLImageElement) => node.decode());
    const layout = await image.evaluate((node: HTMLImageElement) => {
      const image = node.getBoundingClientRect();
      const wrapper = node.parentElement!.getBoundingClientRect();
      const figure = node.closest("figure")!;
      const before = figure.previousElementSibling!.getBoundingClientRect();
      const after = figure.nextElementSibling!.getBoundingClientRect();
      return {
        imageHeight: image.height,
        wrapperHeight: wrapper.height,
        ratio: image.width / image.height,
        naturalRatio: node.naturalWidth / node.naturalHeight,
        gapBefore: image.top - before.bottom,
        gapAfter: after.top - image.bottom,
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    expect(layout.wrapperHeight).toBeCloseTo(layout.imageHeight, 1);
    expect(layout.ratio).toBeCloseTo(layout.naturalRatio, 2);
    expect(layout.gapBefore).toBeGreaterThanOrEqual(0);
    expect(layout.gapBefore).toBeLessThanOrEqual(29);
    expect(layout.gapAfter).toBeGreaterThanOrEqual(0);
    expect(layout.gapAfter).toBeLessThanOrEqual(29);
    expect(layout.overflow).toBe(false);
    // Confirm activation without depending on the external site's availability.
    await page.route(destination, (route) => route.fulfill({ status: 200, body: "CBS19 link destination verified" }));
    await image.click();
    await expect(page).toHaveURL(destination);
  });
}

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
        `${post.bylinePrefix ?? "Written By"} ${post.displayedByline}`,
      );
      if (post.authorProfilePath) {
        await expect(page.locator(".blog-meta a")).toHaveText(post.displayedByline);
        await expect(page.locator(".blog-meta a")).toHaveAttribute("href", post.authorProfilePath);
      }
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
test("verified therapist bylines: all 19 links, direct profile routes, keyboard access and valid index cards", async ({ page, request }) => {
  test.setTimeout(90_000);
  const profiles = new Map([
    ["Jennifer Wood, LPC-S", "/therapists/jennifer-wood/"],
    ["Erin Young, LCSW-S", "/therapists/erin-young/"],
  ]);
  for (const [name, path] of profiles) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(200);
    expect(response.headers().location).toBeUndefined();
    await page.goto(path);
    await expect(page.locator("h1")).toHaveText(name);
  }
  for (const post of posts) {
    await page.goto(`${post.legacyPath}/`);
    const link = page.locator(".blog-meta a");
    await expect(link).toHaveCount(1);
    await expect(link).toHaveText(post.displayedByline);
    const destination = profiles.get(post.displayedByline)!;
    expect(destination).toBeTruthy();
    await expect(link).toHaveAttribute("href", destination);
    await expect(link).not.toHaveAttribute("rel", /nofollow/);
    await expect(link.locator("time, a")).toHaveCount(0);
    await link.hover();
    await expect(link).toHaveCSS("text-decoration-thickness", "2px");
    await link.focus();
    expect(await link.evaluate((node) => getComputedStyle(node).outlineStyle)).not.toBe("none");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`${destination}$`));
  }
  await page.goto("/blog/");
  const cardLinks = page.locator(".blog-card-link");
  await expect(cardLinks).toHaveCount(19);
  await expect(cardLinks.locator("a")).toHaveCount(0);
  await expect(page.locator(".blog-card-copy > p")).toHaveText(posts.map((post) => post.displayedByline));
});

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
