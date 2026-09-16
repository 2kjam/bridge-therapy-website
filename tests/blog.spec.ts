import { test, expect } from "@playwright/test";
import fs from "node:fs";

const directory = "content/blog/navigating-life-transitions";
const record = JSON.parse(
  fs.readFileSync(`${directory}/metadata.json`, "utf8"),
);
const source = JSON.parse(
  fs.readFileSync(`${directory}/source/item.json`, "utf8"),
);

test("legacy route follows existing staging slash policy; unknown articles stay absent", async ({
  request,
}) => {
  const response = await request.get(record.legacyPath, { maxRedirects: 0 });
  expect(response.status()).toBe(308);
  expect(response.headers().location).toBe(`${record.legacyPath}/`);
  expect((await request.get(record.legacyPath)).status()).toBe(200);
  expect((await request.get("/news/2026/1/19/unknown-article/")).status()).toBe(
    404,
  );
  expect((await request.get("/contact", { maxRedirects: 0 })).status()).toBe(
    308,
  );
});

for (const width of [375, 390, 768, 1440]) {
  test(`article and index work at ${width}px with unchanged body and inquiry flow`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 950 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/blog/");
    await expect(page.locator(".blog-card")).toHaveCount(19);
    await expect(
      page.locator(`.blog-card:has(a[href="${record.legacyPath}"]) h2`),
    ).toHaveText(record.title);
    await expect(
      page.locator(`.blog-card-link[href="${record.legacyPath}"]`),
    ).toHaveAttribute("href", record.legacyPath);
    await expect(
      page.locator(
        `.blog-card:has(a[href="${record.legacyPath}"]) .blog-card-copy p`,
      ),
    ).toHaveText(record.displayedByline);
    await page.screenshot({
      path: testInfo.outputPath(`blog-${width}.png`),
      fullPage: true,
    });
    await page.locator(`.blog-card-link[href="${record.legacyPath}"]`).click();
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
    await expect(page.locator("#article-title")).toHaveText(record.title);
    await expect(page.locator(".blog-meta time")).toHaveText("August 31, 2023");
    await expect(page.locator(".blog-meta time")).toHaveAttribute(
      "datetime",
      "2023-08-31",
    );
    await expect(page.locator(".blog-meta span")).toHaveText(
      "Written By Jennifer Wood, LPC-S",
    );
    await expect(page).toHaveTitle(record.seo.title);
    const comparison = await page.evaluate((html: string) => {
      const original = new DOMParser()
        .parseFromString(html, "text/html")
        .querySelector(".sqs-html-content")!;
      const migrated = document.querySelector("[data-original-article-body]")!;
      const nodes = (root: Element) =>
        Array.from(root.querySelectorAll("*")).map((node) => ({
          tag: node.tagName,
          text: node.textContent,
          attributes: Array.from(node.attributes).map((a) => [a.name, a.value]),
        }));
      return {
        source: nodes(original),
        migrated: nodes(migrated),
        sourceText: original.textContent,
        migratedText: migrated.textContent,
      };
    }, source.body);
    expect(comparison.migrated).toEqual(comparison.source);
    expect(comparison.migratedText).toBe(comparison.sourceText);
    await expect(page.locator(".legacy-article-body h2")).toHaveCount(7);
    await expect(page.locator(".legacy-article-body h2").nth(3)).toHaveText("");
    const geometry = await page
      .locator(".blog-featured-image")
      .evaluate(async (node: HTMLImageElement) => {
        await node.decode();
        const box = node.getBoundingClientRect();
        const body = document
          .querySelector(".legacy-article-body")!
          .getBoundingClientRect();
        return {
          natural: [node.naturalWidth, node.naturalHeight],
          ratio: box.width / box.height,
          bodyWidth: body.width,
          overflow: document.documentElement.scrollWidth > innerWidth,
        };
      });
    expect(geometry.natural).toEqual([2500, 1667]);
    expect(geometry.ratio).toBeCloseTo(2500 / 1667, 2);
    expect(geometry.bodyWidth).toBeLessThanOrEqual(720);
    expect(geometry.overflow).toBe(false);
    await expect(page.locator(".header")).toBeVisible();
    await expect(page.locator("footer")).toBeAttached();
    await page.screenshot({
      path: testInfo.outputPath(`article-${width}.png`),
      fullPage: true,
    });
    await page.locator("#chat-open").click();
    const panel = page.locator("#inquiry-widget-panel");
    await expect(panel).toBeVisible();
    await page.locator("#widget-answer").fill("Blog test");
    await panel
      .getByRole("button", { name: "Send answer", exact: true })
      .click();
    await expect(panel.getByRole("log")).toContainText("Blog test");
    // The widget returns focus after its asynchronous reply finishes.
    await expect(page.locator("#widget-answer")).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(panel).not.toBeVisible();
    await page
      .getByRole("navigation", { name: "Breadcrumb" })
      .getByRole("link", { name: "Blog", exact: true })
      .click();
    await expect(page).toHaveURL(/\/blog\/$/);
    if (width <= 1050) await page.locator(".mobile-toggle").click();
    await page.locator('[aria-controls="about-panel"]').click();
    const blogLink = page
      .locator("#about-panel")
      .getByRole("link", { name: "Articles & resources" });
    await expect(blogLink).toHaveAttribute("href", "/blog/");
    expect(await blogLink.getAttribute("target")).toBeNull();
    await blogLink.click();
    await expect(page).toHaveURL(/\/blog\/$/);
    expect(errors).toEqual([]);
  });
}
