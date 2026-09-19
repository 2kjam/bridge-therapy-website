import { chromium, expect } from "@playwright/test";
import fs from "node:fs";
const base = process.env.INQUIRY_TEST_URL || "http://127.0.0.1:3011";
const browser = await chromium.launch({ channel: "msedge" });
fs.mkdirSync("test-results/homepage-batch1", { recursive: true });
try {
  for (const width of [375, 390, 768, 1440]) {
    const context = await browser.newContext({
      baseURL: base,
      viewport: { width, height: 1000 },
      hasTouch: true,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.addInitScript(() => sessionStorage.setItem("bridge-inquiry-prompt-shown", "1"));
    await page.goto(base + "/");
    await expect(page.locator("h1")).toHaveText(
      "Counseling and Therapy in Tyler, TX",
    );
    await expect(page.locator("#why-title")).toHaveText(
      "Faith-informed approach to therapy",
    );
    await expect(page.locator(".bridge-positioning")).toHaveText(
      "Bridging Christian Counseling with Whole Health Together",
    );
    await expect(page.locator(".next-script")).toHaveCount(0);
    const track = page.locator("#homepage-team-track");
    await expect(track.locator("li")).toHaveCount(10);
    const links = await track
      .locator("a")
      .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("href")));
    expect(new Set(links).size).toBe(10);
    for (const href of links)
      expect((await page.request.get(href)).status()).toBe(200);
    const menuLinks = await page
      .locator("#team-track a")
      .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("href")));
    expect(links).toEqual(menuLinks);
    if (width <= 768) {
      await track.scrollIntoViewIfNeeded();
      const bounds = await track.boundingBox();
      const session = await context.newCDPSession(page);
      const x = bounds.x + bounds.width * 0.8,
        y = bounds.y + 60;
      await session.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [{ x, y }],
      });
      for (let step = 1; step <= 8; step++) {
        await session.send("Input.dispatchTouchEvent", {
          type: "touchMove",
          touchPoints: [{ x: x - step * 24, y }],
        });
        await page.waitForTimeout(20);
      }
      await session.send("Input.dispatchTouchEvent", {
        type: "touchEnd",
        touchPoints: [],
      });
      await expect
        .poll(() => track.evaluate((n) => n.scrollLeft))
        .toBeGreaterThan(0);
      await session.detach();
      await track.evaluate((n) => {
        n.scrollLeft = 0;
      });
    }
    await track.focus();
    expect(
      await track.evaluate((n) => getComputedStyle(n).outlineStyle),
    ).not.toBe("none");
    await page.keyboard.press("ArrowRight");
    await expect
      .poll(() => track.evaluate((n) => n.scrollLeft))
      .toBeGreaterThan(0);
    await page
      .locator(".homepage-team-carousel")
      .getByRole("button", { name: "Next therapists" })
      .click();
    const afterNext = await track.evaluate(n => n.scrollLeft);
    await page.locator(".homepage-team-carousel").getByRole("button", { name: "Previous therapists" }).click();
    await expect.poll(() => track.evaluate(n => n.scrollLeft)).toBeLessThan(afterNext);
    await track.locator("a").last().focus();
    await expect
      .poll(() =>
        track.evaluate(
          (n) => n.scrollLeft + n.clientWidth >= n.scrollWidth - 2,
        ),
      )
      .toBe(true);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const insurance = page.locator("#insurance");
    await expect(insurance.locator("button")).toHaveCount(0);
    await expect(insurance.locator(".insurance-heading, .insurance-options")).toHaveCount(0);
    expect(
      await insurance.locator("li:not([data-duplicate])").allTextContents(),
    ).toContain("TRICARE");
    expect(
      await insurance.locator("li:not([data-duplicate])").allTextContents(),
    ).toContain("UnitedHealthcare");
    await expect(
      insurance.locator('img[alt="Cigna"],img[alt="Meritain Health"]'),
    ).toHaveCount(0);
    expect(
      await insurance.evaluate((n) => n.previousElementSibling.className),
    ).toBe("ivory-community");
    const local = page.locator("main > section.ivory-local");
    await expect(page.getByText("ROOTED IN TYLER", { exact: true })).toHaveCount(1);
    await expect(local.locator(".local-watermark")).toHaveAttribute("aria-hidden", "true");
    await expect(local.locator(".local-watermark")).toHaveText("EAST TEXAS");
    await page.keyboard.press("Tab");
    for (const selector of [".local-phone", ".local-directions"]) {
      await local.locator(selector).focus();
      expect(await local.locator(selector).evaluate(n => getComputedStyle(n).outlineStyle)).not.toBe("none");
    }
    await expect(local.locator("h2")).toHaveText("Here forEast Texas.");
    await expect(local.locator("p:not(.eyebrow)")).toHaveText("We\u2019re honored to serve individuals, couples, and families in Tyler and throughout the East Texas community.");
    await expect(local.locator("address span")).toHaveText("3800 Paluxy Drive, Suite 240Building 2Tyler, TX 75703");
    await expect(local.locator(".local-phone")).toHaveAttribute("href", "tel:9032838729");
    await expect(local.locator(".local-phone")).toHaveText("(903) 283-8729");
    await expect(local.locator(".local-directions")).toHaveAttribute("href", "https://www.google.com/maps/search/?api=1&query=The+Bridge+Therapeutic+Services+3800+Paluxy+Drive+Suite+240+Tyler+TX");
    expect(await local.evaluate(n => n.previousElementSibling.id)).toBe("insurance");
    expect(await local.evaluate(n => n.nextElementSibling.id)).toBe("getting-started");
    await expect(page.locator(".ivory-team > .button")).toHaveAttribute("href", "/therapists/");
    const layout = await page.evaluate(() => {
      const team = document.querySelector(".ivory-team").getBoundingClientRect();
      const section = document.querySelector(".ivory-community");
      const style = getComputedStyle(section);
      const track = document.querySelector("#homepage-team-track");
      const local = document.querySelector(".ivory-local");
      const copy = local.children[0].getBoundingClientRect(), details = local.children[1].getBoundingClientRect();
      return { teamWidth: team.width, available: section.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight), cardWidth: track.querySelector("li").getBoundingClientRect().width, stacked: details.top >= copy.bottom };
    });
    expect(Math.abs(layout.teamWidth - layout.available)).toBeLessThan(1);
    expect(layout.cardWidth).toBeGreaterThanOrEqual(220);
    expect(layout.stacked).toBe(width <= 560);
    console.log(width, layout);
    const dimensions = await page.evaluate(() =>
      Object.fromEntries(
        [
          ".brand img",
          ".header",
          ".insurance-strip",
          ".insurance-logos li",
        ].map((s) => {
          const r = document.querySelector(s).getBoundingClientRect();
          return [s, { width: r.width, height: r.height }];
        }),
      ),
    );
    console.log(width, dimensions);
    await page.locator(".specialty-directory summary").click();
    await expect(page.locator(".service-list button, [data-service], #detail-dialog")).toHaveCount(0);
    await expect(page.locator(".service-list a")).toHaveCount(17);
    await expect(page.locator(".service-list")).not.toContainText(/Support after abuse|Anger counseling|Codependency|Eating disorders/i);
    await expect(page.locator("body")).not.toContainText(/design preview|planned website|still in development/i);
    const serviceLinks = await page.locator("#services a").evaluateAll(nodes => [...new Set(nodes.map(n => n.getAttribute("href")))]);
    expect(serviceLinks).toHaveLength(18);
    for (const href of serviceLinks) expect((await page.request.get(href, { maxRedirects: 0 })).status()).toBe(200);
    await page.locator(".specialty-directory").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/homepage-batch1/discovery-${width}.png` });

    await expect(page.locator(".specialty-directory").getByRole("link", {name: /^Non-Epileptic Seizures/})).toHaveAttribute("href", "/non-epileptic-seizures-counseling-tyler/");
    if (width <= 1050)
      await page.getByRole("button", { name: "Menu", exact: false }).click();
    await page.getByRole("button", { name: "Counseling Services" }).click();
    const groups = page.locator("#care-panel .mega-columns section");
    await expect(
      groups.nth(0).getByRole("link", { name: "Children and Teens" }),
    ).toHaveAttribute("href", "/child-teen-counseling-tyler/");
    await expect(
      groups.nth(1).getByRole("link", { name: "Relationships", exact: true }),
    ).toHaveAttribute("href", "/marriage-counseling-tyler/");
    await expect(
      groups.nth(1).getByRole("link", { name: "Pregnancy & postpartum" }),
    ).toHaveCount(1);
    await expect(
      groups.nth(2).getByRole("link", { name: "Pregnancy & postpartum" }),
    ).toHaveCount(0);
    await groups
      .nth(1)
      .getByRole("link", { name: "Non-Epileptic Seizures" })
      .scrollIntoViewIfNeeded();
    await page.screenshot({
      path: `test-results/homepage-batch1/menu-${width}.png`,
    });
    await groups
      .nth(1)
      .getByRole("link", { name: "Non-Epileptic Seizures" })
      .click();
    await expect(page).toHaveURL(/non-epileptic-seizures-counseling-tyler/);
    await expect(page.locator(".individual-team-grid article")).toHaveCount(1);
    await page.goto(base + "/");
    await track.evaluate((n) => {
      n.scrollLeft = 0;
    });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `test-results/homepage-batch1/home-${width}.png`,
      fullPage: true,
    });
    await context.close();
  }
  console.log(
    "Homepage Batch 1: four viewport, roster/link, keyboard, copy, service discovery, menu and overflow checks passed.",
  );
} finally {
  await browser.close();
}
