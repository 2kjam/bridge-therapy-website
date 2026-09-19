import { test, expect } from "@playwright/test";
import fs from "node:fs";
import { createHash } from "node:crypto";

const destinations = [
  "/therapists/jennifer-wood/",
  "/therapists/erin-young/",
  "/christian-counseling-tyler/",
  "/staff/kalynne-arrick/",
  "/therapists/",
  "/contact/",
];

for (const width of [375, 390, 768, 1440]) {
  test(`About: practice content, moved photo, links and layout at ${width}px`, async ({
    page,
    request,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto("/about/");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(
      "About The Bridge | The Bridge Therapeutic Services",
    );
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText("About The Bridge");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );
    const main = page.locator("main");
    await expect(main.locator("h2")).toHaveText([
      "Meet Jennifer & Erin",
      "A Christian perspective on care",
      "Get to know our team",
      "Contact The Bridge",
    ]);
    await expect(main.locator("h3")).toHaveText([
      "Jennifer Wood, LPC-S",
      "Erin Young, LCSW-S",
    ]);
    await expect(main.locator("img")).toHaveCount(1);
    const photo = main.locator("img");
    await expect(photo).toHaveAttribute("src", "/assets/our-story.jpg");
    await expect(photo).toHaveAttribute(
      "alt",
      "Erin Young and Jennifer Wood, co-owners of The Bridge",
    );
    await photo.evaluate((image: HTMLImageElement) => image.decode());
    expect(
      createHash("sha256")
        .update(fs.readFileSync("public/assets/our-story.jpg"))
        .digest("hex"),
    ).toBe("bbd812b42ca65f1084dbd4cee89fd7209bccb84ff8c6da501e20c8cded538ca2");
    expect(
      await main
        .locator("a")
        .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("href"))),
    ).toEqual(destinations);
    await expect(main.locator('a[target="_blank"]')).toHaveCount(0);
    for (const href of destinations)
      expect((await request.get(href)).status(), href).toBe(200);
    await expect(
      main.getByRole("link", { name: "Book an Appointment", exact: true }),
    ).toHaveAttribute("href", "/contact/");
    await expect(
      main.getByRole("link", { name: "Meet Our Therapists", exact: true }),
    ).toHaveAttribute("href", "/therapists/");
    await expect(
      main.getByRole("link", { name: "Kalynne Arrick, Office Manager" }),
    ).toHaveAttribute("href", "/staff/kalynne-arrick/");
    for (const chrome of [page.locator(".header"), page.locator("footer")]) {
      await expect(
        chrome.getByRole("link", {
          name: "About",
          exact: true,
          includeHidden: true,
        }),
      ).toHaveAttribute("href", "/about/");
      await expect(chrome.locator('a[href*="our-story"]')).toHaveCount(0);
    }
    expect(
      await page.locator("h1").evaluate((n) => n.getBoundingClientRect().top),
    ).toBeLessThan(220);
    const bounds = await photo.boundingBox();
    expect(bounds!.height / bounds!.width).toBeCloseTo(0.664, 2);
    if (width < 700) expect(bounds!.height).toBeLessThan(260);
    for (const link of await main.locator("a").all()) {
      await link.focus();
      await expect(link).toBeFocused();
      expect(
        await link.evaluate((n) => getComputedStyle(n).outlineStyle),
      ).not.toBe("none");
    }
    await page.evaluate(() => {
      (document.activeElement as HTMLElement)?.blur();
      window.scrollTo(0, 0);
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: testInfo.outputPath(`about-${width}.png`),
      fullPage: true,
    });
    await main.getByRole("link", { name: "Meet Jennifer" }).click();
    await expect(page.locator("h1")).toHaveText("Jennifer Wood, LPC-S");
    await page.goto("/about/");
    await main.getByRole("link", { name: "Meet Erin" }).click();
    await expect(page.locator("h1")).toHaveText("Erin Young, LCSW-S");
    await page.goto("/");
    await expect(
      page.locator('main img[src="/assets/our-story.jpg"]'),
    ).toHaveCount(0);
    await expect(page.locator("main")).not.toContainText(
      "Jennifer & Erin · Co-owners",
    );
    await expect(page.locator("#why-the-bridge")).toHaveCount(1);
    await expect(page.locator(".ivory-local address")).toContainText(
      "3800 Paluxy Drive",
    );
    await expect(page.locator("#homepage-team-track li")).toHaveCount(10);
    if (width <= 1050) await page.locator(".mobile-toggle").click();
    await page
      .locator(".header")
      .getByRole("link", { name: "About", exact: true })
      .click();
    await expect(page).toHaveURL(/\/about\/$/);
    await page
      .locator("footer")
      .getByRole("link", { name: "About", exact: true })
      .click();
    await expect(page).toHaveURL(/\/about\/$/);
    expect(errors).toEqual([]);
  });
}
