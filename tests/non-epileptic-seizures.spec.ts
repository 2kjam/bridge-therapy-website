import { test, expect } from "@playwright/test";
const route = "/non-epileptic-seizures-counseling-tyler/";
for (const width of [375, 390, 768, 1440]) {
  test(`Non-Epileptic Seizures: page and entry points at ${width}px`, async ({
    page,
    request,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.addInitScript(() =>
      sessionStorage.setItem("bridge-inquiry-prompt-shown", "1"),
    );
    await page.goto(route);
    await expect(page).toHaveTitle(
      "Non-Epileptic Seizures Counseling | Tyler, TX | The Bridge",
    );
    await expect(page.locator("h1")).toHaveText(
      "Non-Epileptic Seizures Counseling in Tyler, TX",
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );
    const main = page.locator("main");
    await expect(main.locator(".individual-team-grid article")).toHaveCount(1);
    await expect(main.locator(".individual-team-grid h3")).toHaveText(
      "Erin Young, LCSW-S",
    );
    await expect(main.locator('a[href^="/therapists/"]')).toHaveCount(1);
    await expect(main.locator('a[href^="/therapists/"]')).toHaveAttribute(
      "href",
      "/therapists/erin-young/",
    );
    await expect(main).toContainText(
      "Counseling is not a substitute for appropriate medical evaluation or emergency care.",
    );
    const jump = main.getByRole("link", {
      name: "Meet our Non-Epileptic Seizures counselor",
      exact: true,
    });
    await jump.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#team-title")).toBeFocused();
    const heading = await page.locator("#team-title").boundingBox();
    const header = await page.locator(".header").boundingBox();
    expect(heading!.y).toBeGreaterThan(header!.height);
    for (const summary of await main.locator("summary").all()) {
      await summary.focus();
      expect(
        await summary.evaluate((n) => getComputedStyle(n).outlineStyle),
      ).not.toBe("none");
      await page.keyboard.press("Enter");
      await expect(summary.locator("..")).toHaveAttribute("open", "");
      await page.keyboard.press("Enter");
    }
    const links = await main
      .locator('a[href^="/"]')
      .evaluateAll((nodes) => [
        ...new Set(nodes.map((n) => n.getAttribute("href")!)),
      ]);
    for (const href of links)
      expect((await request.get(href)).status()).toBe(200);
    await expect(
      main.getByRole("link", { name: "Book an Appointment" }),
    ).toHaveCount(2);
    await main
      .getByRole("link", { name: "Book an Appointment" })
      .last()
      .click();
    await expect(page).toHaveURL(/\/contact\//);
    await page.goto(route);
    await page.evaluate(async () => {
      document.querySelectorAll("img").forEach((n) => (n.loading = "eager"));
      await document.fonts.ready;
      await Promise.all([...document.images].map((n) => n.decode()));
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: testInfo.outputPath(`service-${width}.png`),
      fullPage: true,
    });
    await main
      .locator(".individual-team")
      .screenshot({ path: testInfo.outputPath(`erin-${width}.png`) });
    await page.goto("/");
    await page.locator(".specialty-directory summary").click();
    const entry = page
      .locator(".specialty-directory")
      .getByRole("link", { name: /^Non-Epileptic Seizures/ });
    await expect(entry).toHaveCount(1);
    await entry.click();
    await expect(page).toHaveURL(route);
    await page.goto("/");
    if (width <= 1050)
      await page.getByRole("button", { name: "Menu", exact: false }).click();
    await page.getByRole("button", { name: "Counseling Services" }).click();
    const group = page.locator("#care-panel .mega-columns section").nth(1);
    await group
      .getByRole("link", { name: /^Non-Epileptic Seizures/ })
      .click();
    await expect(page).toHaveURL(route);
    await expect(page.locator("#detail-dialog")).not.toBeVisible();
    await page.goto("/therapists/erin-young/");
    await expect(
      page.locator('.profile-focus a[href="' + route + '"]'),
    ).toHaveText("Counseling support for non-epileptic concerns");
    await page.locator('.profile-services a[href="' + route + '"]').click();
    await expect(page).toHaveURL(route);
  });
}
