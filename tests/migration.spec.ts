import { test, expect, type Page } from "@playwright/test";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import fs from "node:fs";

async function ready(page: Page, url: string) {
  await page.goto(url);
  await page.evaluate(async () => {
    document.querySelectorAll("img").forEach((img) => {
      img.loading = "eager";
    });
    await document.fonts.ready;
    await Promise.all([...document.images].map((image) => image.decode()));
  });
}

test("homepage matches legacy pixels and responsive geometry", async ({
  page,
  context,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const original = await context.newPage();
  await original.emulateMedia({ reducedMotion: "reduce" });
  await ready(original, "http://127.0.0.1:4322/");
  await ready(page, "/");
  await expect(page.locator("[data-duplicate]:visible")).toHaveCount(0);
  const geometry = (target: Page) =>
    target.locator("header, main > section, footer").evaluateAll((nodes) =>
      nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return { width: rect.width, height: rect.height, x: rect.x, y: rect.y };
      }),
    );
  expect(await geometry(page)).toEqual(await geometry(original));
  const before = await original.screenshot({
    fullPage: true,
    animations: "disabled",
    scale: "css",
  });
  const after = await page.screenshot({
    fullPage: true,
    animations: "disabled",
    scale: "css",
  });
  fs.writeFileSync(testInfo.outputPath("legacy-home.png"), before);
  fs.writeFileSync(testInfo.outputPath("next-home.png"), after);
  const a = PNG.sync.read(before),
    b = PNG.sync.read(after);
  expect([b.width, b.height]).toEqual([a.width, a.height]);
  const difference = new PNG({ width: a.width, height: a.height });
  const changed = pixelmatch(
    a.data,
    b.data,
    difference.data,
    a.width,
    a.height,
    { threshold: 0.1 },
  );
  fs.writeFileSync(
    testInfo.outputPath("home-difference.png"),
    PNG.sync.write(difference),
  );
  console.log(
    `${testInfo.project.name}: ${changed} changed pixels / ${a.width * a.height}`,
  );
  expect(changed / (a.width * a.height)).toBeLessThan(0.001);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await original.close();
});

test("navigation, keyboard focus, therapist arrows, and dismissal", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (isMobile) await page.locator(".mobile-toggle").click();
  const trigger = page.locator('[aria-controls="team-panel"]');
  await trigger.focus();
  await trigger.press("ArrowDown");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#team-panel a").first()).toBeFocused();
  const track = page.locator("#team-track");
  await track.focus();
  await track.press("ArrowRight");
  await expect
    .poll(() => track.evaluate((node) => node.scrollLeft))
    .toBeGreaterThan(0);
  await expect(
    page.getByRole("button", { name: "Previous therapists" }),
  ).toHaveAttribute("aria-disabled", "false");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(page.locator("#team-panel")).toBeHidden();
  if (isMobile) {
    await page.keyboard.press("Escape");
    await expect(page.locator(".mobile-toggle")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  }
  await page.locator("#meet-team").click();
  await expect(page.locator("#team-panel")).toBeVisible();
  await expect(trigger).toBeFocused();
  await page.locator("#hero-title").click({ force: true });
  await expect(page.locator("#team-panel")).toBeHidden();
});

test("desktop hover moves between menus without a stale close timer", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Hover is intentionally desktop-only");
  await page.goto("/");
  await page.locator('[aria-controls="care-panel"]').hover();
  await expect(page.locator("#care-panel")).toBeVisible();
  await page.locator('[aria-controls="team-panel"]').hover();
  await expect(page.locator("#team-panel")).toBeVisible();
  await page.waitForTimeout(300);
  await expect(page.locator("#team-panel")).toBeVisible();
  await expect(page.locator("#care-panel")).toBeHidden();
  await page.mouse.move(1430, 950);
  await expect(page.locator("#team-panel")).toBeHidden();
});

test("existing specialty and chat preview dialogs retain their behavior", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".specialty-directory summary").click();
  await page
    .getByRole("button", { name: /^Military deployment/ })
    .click();
  const dialog = page.locator("#detail-dialog");
  await expect(dialog).toBeVisible();
  await expect(page.locator("#detail-title")).toHaveText(
    "Military & Deployment Support",
  );
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await page.locator("#chat-open").click();
  await expect(page.locator("#detail-title")).toHaveText("How can we help?");
  await page.getByRole("button", { name: "Close preview" }).click();
  await expect(dialog).toBeHidden();
  await page.locator("#chat-open").click();
  await page.mouse.click(1, 1);
  await expect(dialog).toBeHidden();
});

test("insurance animation pauses, resumes, and respects reduced motion", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  const carousel = page.locator(".insurance-window");
  await carousel.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect
    .poll(() => carousel.evaluate((node) => node.scrollLeft))
    .toBeGreaterThan(2);
  await carousel.focus();
  const focused = await carousel.evaluate((node) => node.scrollLeft);
  await page.waitForTimeout(250);
  expect(await carousel.evaluate((node) => node.scrollLeft)).toBe(focused);
  await carousel.evaluate((node: HTMLElement) => node.blur());
  await expect
    .poll(() => carousel.evaluate((node) => node.scrollLeft))
    .toBeGreaterThan(focused);
  if (!isMobile) {
    await carousel.hover();
    const hovered = await carousel.evaluate((node) => node.scrollLeft);
    await page.waitForTimeout(250);
    expect(await carousel.evaluate((node) => node.scrollLeft)).toBe(hovered);
    await page.mouse.move(0, 0);
  } else {
    await carousel.dispatchEvent("touchstart");
    const touched = await carousel.evaluate((node) => node.scrollLeft);
    await page.waitForTimeout(250);
    expect(await carousel.evaluate((node) => node.scrollLeft)).toBe(touched);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("[data-duplicate]:visible")).toHaveCount(0);
  await expect.poll(() => carousel.evaluate((node) => node.scrollLeft)).toBe(0);
  await expect(
    page.locator(".insurance-logos li:not([data-duplicate])"),
  ).toHaveCount(12);
});

test("scroll reveals and reduced-motion content remain accessible", async ({
  page,
}) => {
  await page.goto("/");
  const last = page.locator(".ivory-next > div");
  await expect(last).toHaveClass(/scroll-pending/);
  await last.scrollIntoViewIfNeeded();
  await expect(last).not.toHaveClass(/scroll-pending/);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".scroll-pending, .scroll-enter")).toHaveCount(0);
});

test("contact links and native FAQ work after navigation", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.locator(".ivory-hero .button").first().click();
  await expect(page).toHaveURL(/\/contact\/$/);
  await expect(page).toHaveTitle(
    "Book an Appointment | Contact The Bridge in Tyler, TX",
  );
  const question = page.locator(".contact-faq details").first();
  await question.locator("summary").click();
  await expect(question).toHaveAttribute("open", "");
  await expect(
    page.locator(".contact-options a[href^='tel:']"),
  ).toHaveAttribute("href", "tel:9032838729");
  await page.locator("#chat-open").click();
  await expect(page.locator("#detail-dialog")).toBeVisible();
  expect(errors).toEqual([]);
});

test("all content routes render without hydration errors", async ({ page }) => {
  const routes: string[] = JSON.parse(
    fs.readFileSync("legacy/routes.json", "utf8"),
  );
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of routes.filter(
    (route) => route !== "/children-families/",
  )) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await page.locator("#chat-open").click();
    await expect(page.locator("#detail-dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      route,
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});

test("legacy URLs redirect and static content works without JavaScript", async ({
  browser,
  page,
}) => {
  await page.goto("/children-families/");
  await expect(page).toHaveURL(/\/#family-services$/);
  await page.goto("/contact/index.html");
  await expect(page).toHaveURL(/\/contact\/$/);
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: page.viewportSize() ?? undefined,
  });
  const plain = await context.newPage();
  await plain.goto("http://127.0.0.1:3000/");
  await expect(plain.locator("h1")).toHaveText("Real Help forReal Life");
  await expect(plain.locator(".ivory-next h2")).toBeVisible();
  await context.close();
});
