import { test, expect } from "@playwright/test";
import fs from "node:fs";

const approvedBiography = fs.readFileSync("tests/fixtures/kalynne-approved-biography.txt", "utf8").trim().split(/\r?\n\r?\n/);

for (const width of [375, 390, 768, 1440]) {
  test(`staff profile: portrait, contact links and administrative placement at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/staff/kalynne-arrick/");
    await expect(page).toHaveTitle("Kalynne Arrick, Office Manager | The Bridge");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex, nofollow/);
    await expect(page.locator("h1")).toHaveText("Kalynne Arrick");
    await expect(page.locator("main .profile-credential")).toHaveText("Office Manager");
    await expect(page.locator(".profile-details p")).toHaveText(approvedBiography);
    await expect(page.locator(".staff-scripture p")).toHaveText(approvedBiography[5]);
    await expect(page.locator(".profile-breadcrumb li")).toHaveText(["Home", "Kalynne Arrick"]);
    await expect(page.locator("main .button")).toHaveCount(1);
    await expect(page.locator(".profile-intro h2")).toHaveText("Helping you get started at The Bridge");
    await expect(page.locator(".profile-intro h2 + p")).toHaveText("Kalynne is The Bridge’s Office Manager. If you are not sure which counselor to contact, she can talk with you about what you are looking for and help connect you with a counselor who may be a good fit.");
    const portrait = page.locator("main img");
    const bounds = await portrait.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.height / bounds!.width).toBeCloseTo(1.5, 1);
    expect(bounds!.width).toBeLessThanOrEqual(width <= 600 ? 180 : 240);
    if (width <= 600) {
      const intro = await page.locator(".profile-intro > div").boundingBox();
      expect(intro!.y + intro!.height).toBeLessThan(bounds!.y);
    }
    await expect(portrait).toHaveJSProperty("naturalWidth", 2500);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(`staff-${width}.png`), fullPage: true });
    await page.locator("main .button").first().click();
    await expect(page).toHaveURL(/\/contact\/$/);
    await expect(page.locator(".contact-staff")).toContainText("Office Manager");
    const contactPortrait = page.locator(".contact-portrait > img");
    await expect(contactPortrait).toHaveAttribute("alt", "Kalynne Arrick, Office Manager at The Bridge Therapeutic Services");
    await expect(contactPortrait).toHaveAttribute("src", "/assets/presentation/contact/kalynne-720.webp");
    const contactBounds = await contactPortrait.boundingBox();
    expect(contactBounds!.width).toBe(width <= 600 ? 260 : width <= 800 ? 300 : 360);
    expect(contactBounds!.height).toBe(width <= 600 ? 338 : width <= 800 ? 390 : 468);
    await expect(page.locator(".contact-intro .contact-staff")).toHaveCount(1);
    await expect(page.locator(".contact-details-layout > #inquiry")).toHaveCount(1);
    await page.getByRole("link", { name: "Meet Kalynne" }).focus();
    expect(await page.getByRole("link", { name: "Meet Kalynne" }).evaluate(n => getComputedStyle(n).outlineStyle)).not.toBe("none");
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
    const menuFrame = await help.locator(".office-help-portrait").boundingBox();
    expect(menuFrame!.width).toBe(width <= 1050 ? 120 : 130);
    expect(menuFrame!.height).toBe(width <= 1050 ? 180 : 195);
    await expect(help.locator("img")).toHaveAttribute("src", "/assets/presentation/menu/kalynne-480.webp");
    await expect(help.locator("img")).toHaveAttribute("loading", "lazy");
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
