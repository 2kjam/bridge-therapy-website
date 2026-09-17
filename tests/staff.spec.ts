import { test, expect } from "@playwright/test";

for (const width of [375, 390, 768, 1440]) {
  test(`staff profile: portrait, contact links and administrative placement at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/staff/kalynne-arrick/");
    await expect(page).toHaveTitle("Kalynne Arrick, Office Manager | The Bridge");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex, nofollow/);
    await expect(page.locator("h1")).toHaveText("Kalynne Arrick");
    await expect(page.locator("main .profile-credential")).toHaveText("Office Manager");
    const portrait = page.locator("main img");
    const bounds = await portrait.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.height / bounds!.width).toBeCloseTo(1.5, 1);
    expect(bounds!.width).toBeLessThanOrEqual(320);
    await expect(portrait).toHaveJSProperty("naturalWidth", 2500);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(`staff-${width}.png`), fullPage: true });
    await page.locator("main .button").first().click();
    await expect(page).toHaveURL(/\/contact\/$/);
    await expect(page.locator(".contact-staff")).toContainText("Office Manager");
    await expect(page.locator("#inquiry option")).toHaveCount(11);
    await expect(page.locator("#inquiry")).not.toContainText("Kalynne");
    await page.locator(".contact-staff").scrollIntoViewIfNeeded();
    await page.screenshot({ path: testInfo.outputPath(`contact-${width}.png`) });
    await page.getByRole("link", { name: "Meet Kalynne" }).click();
    await expect(page).toHaveURL(/\/staff\/kalynne-arrick\/$/);
    if (width <= 1050) await page.locator(".mobile-toggle").click();
    await page.getByRole("button", { name: /Counseling Services/ }).click();
    const help = page.locator(".office-help");
    await expect(help).toBeVisible();
    await expect(help).toContainText("Kalynne Arrick · Office Manager");
    await expect(help).toHaveAttribute("href", "/contact/");
    const menuPhoto = await help.locator("img").boundingBox();
    expect(menuPhoto!.height / menuPhoto!.width).toBeCloseTo(1.5, 1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await help.scrollIntoViewIfNeeded();
    await page.screenshot({ path: testInfo.outputPath(`menu-${width}.png`) });
    await help.click();
    await expect(page).toHaveURL(/\/contact\/$/);
    await page.goto("/therapists/");
    await expect(page.locator("main")).not.toContainText("Kalynne");
    await expect(page.locator("#team-panel")).not.toContainText("Kalynne");
  });
}
