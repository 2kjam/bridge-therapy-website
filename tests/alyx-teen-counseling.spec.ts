import { test, expect } from "@playwright/test";

test("Teens & Adolescents leads to Alyx's profile and selected contact inquiry", async ({ page }) => {
  await page.goto("/");
  await page.locator("a.ivory-service").filter({ hasText: "Teens & Adolescents" }).click();
  await expect(page).toHaveURL(/\/child-teen-counseling-tyler\/$/);
  await page.getByRole("link", { name: "Meet our child & teen counselors" }).click();
  const card = page.locator(".individual-team-grid article").filter({ hasText: "Alyxandrah" });
  await expect(card).toHaveCount(1);
  await expect(card).toContainText("teens with persistent mental illness");
  await expect(card.locator("img")).toBeVisible();
  expect(await card.locator("img").evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await card.getByRole("link", { name: "Read counselor profile" }).click();
  await expect(page.locator("h1")).toHaveText("Alyxandrah “Alyx” White, LMFT");
  await page.locator(".profile-services").getByRole("link", { name: "Child & Teen Counseling" }).click();
  await expect(page).toHaveURL(/\/child-teen-counseling-tyler\/$/);
  await page.goBack();
  await page.getByRole("link", { name: "Ask About Working With Alyx", exact: true }).click();
  await expect(page).toHaveURL(/\/contact\/\?therapist=alyxandrah-white$/);
  await expect(page.locator('select[name="preferred_therapist"]')).toHaveValue("alyxandrah-white");
  await page.goBack();
  await expect(page.locator("h1")).toHaveText("Alyxandrah “Alyx” White, LMFT");
});
