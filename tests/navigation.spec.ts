import { test, expect } from "@playwright/test";
import fs from "node:fs";
import { parse, type DefaultTreeAdapterTypes } from "parse5";

for (const width of [375, 390, 768, 900, 1024, 1100, 1280, 1440]) {
  test(`shared cleanup: Home link, header fit and mobile dismissal at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/contact/");
    if (width <= 1050) await page.locator(".mobile-toggle").click();
    const home = page.locator('#navigation > a[href="/"]');
    await expect(home).toHaveText("Home");
    await expect(home).toBeVisible();
    await expect(page.locator('.brand')).toHaveAttribute("href", "/");
    expect(await page.locator('#navigation > a, #navigation > .nav-item > button').evaluateAll(nodes => nodes.map(n => n.textContent?.replace(/[⌄]/g, "").trim()))).toEqual(["Home", "About", "Counseling Services", "Our Therapists", "Resources", "Contact", "Book an Appointment"]);
    if (width <= 1050) await page.keyboard.press("Tab");
    else await home.focus();
    await expect(home).toBeFocused();
    expect(await home.evaluate(n => getComputedStyle(n).outlineStyle)).not.toBe("none");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (width <= 1050) {
      await expect(page.locator('#chat-open')).toBeHidden();
      await page.keyboard.press('Escape');
      await expect(page.locator('.mobile-toggle')).toBeFocused();
      await page.locator('.mobile-toggle').click();
    } else {
      const bounds = await page.locator('.brand, #navigation > a, #navigation > .nav-item > button').evaluateAll(nodes => nodes.map(n => {
        const r = n.getBoundingClientRect();
        return {left:r.left,right:r.right,center:r.top+r.height/2};
      }));
      for (let i=1;i<bounds.length;i++) {
        expect(bounds[i].left).toBeGreaterThan(bounds[i-1].right);
        expect(Math.abs(bounds[i].center-bounds[0].center)).toBeLessThan(1);
      }
      expect(bounds.at(-1)!.right).toBeLessThan(width);
    }
    await page.screenshot({path:info.outputPath(`home-navigation-${width}.png`)});
    await home.click();
    await expect(page).toHaveURL(/:\d+\/$/);
    if (width <= 1050) await expect(page.locator('.mobile-toggle')).toHaveAttribute('aria-expanded','false');
  });
}

test('shared cleanup: crawlable Home link and unchanged homepage URL', async ({browser, request}) => {
  const response = await request.get('/', {maxRedirects:0});
  expect(response.status()).toBe(200);
  expect(response.headers().location).toBeUndefined();
  for (const route of ['/', '/contact/', '/blog/', '/anxiety-counseling-tyler/', '/staff/kalynne-arrick/']) {
    const html = await (await request.get(route)).text();
    expect(html).toMatch(/<a class="nav-direct" href="\/">Home<\/a>/);
    expect(html).not.toMatch(/href="(?:\/home\/?|\/index(?:\.html)?|\/#home)"/);
  }
  const context = await browser.newContext({javaScriptEnabled:false,viewport:{width:1440,height:900}});
  const page = await context.newPage();
  await page.goto('/contact/');
  await page.locator('#navigation > a[href="/"]').click();
  await expect(page).toHaveURL(/:\d+\/$/);
  await context.close();
});

test("shared cleanup: sitewide CTA labels, preserved therapist inquiries and working routes", async ({
  page,
  request,
}) => {
  await page.goto("/contact/");
  const shared = page.locator(".header, footer");
  await expect(shared.locator('a[href*="our-story"]')).toHaveCount(0);
  await expect(shared.getByText(/ask about an appointment/i)).toHaveCount(0);
  const appointments = shared
    .locator('a[href="/contact/"]')
    .filter({ hasText: /Book an Appointment/ });
  await expect(appointments).toHaveCount(4);
  await expect(page.locator('footer a[href="/therapists/"]')).toHaveText(
    "Our Therapists",
  );
  await expect(page.locator('#about-panel a[href="/blog/"]')).toHaveText(
    ["Articles & resources›", "Visit the Blog→"],
  );
  await expect(page.locator('footer a[href="/blog/"]')).toHaveText("Resources");
  await expect(
    shared.locator('a[href="/christian-counseling-tyler/"]'),
  ).toHaveCount(2);
  const destinations = await shared
    .locator("a")
    .evaluateAll((nodes) => [
      ...new Set(nodes.map((n) => n.getAttribute("href")!)),
    ]);
  for (const href of destinations) {
    if (href.startsWith("tel:") || href.startsWith("mailto:")) continue;
    expect(href).toMatch(/^\//);
    const response = await request.get(href, { maxRedirects: 0 });
    expect(response.status(), href).toBe(200);
    if (href.includes("#"))
      expect(await response.text()).toContain(`id="${href.split("#")[1]}"`);
  }
  expect(await shared.locator('a[target="_blank"]').count()).toBe(0);
  // Audit only active JSX pages, never historical blog bodies or frozen references.
  const services = fs
    .readdirSync("app")
    .filter((name) => name.endsWith("-tyler"));
  expect(services).toHaveLength(18);
  for (const slug of services) {
    const response = await request.get(`/${slug}/`);
    expect(response.status()).toBe(200);
    const html = await response.text();
    const document = parse(html);
    type Node = DefaultTreeAdapterTypes.Node;
    const walk = (node: Node): Node[] => [
      node,
      ...("childNodes" in node ? node.childNodes.flatMap(walk) : []),
    ];
    const content = (node: Node): string =>
      "value" in node
        ? node.value
        : "childNodes" in node
          ? node.childNodes.map(content).join("")
          : "";
    const main = walk(document).find(
      (n) => "tagName" in n && n.tagName === "main",
    )!;
    const links = walk(main).filter(
      (n) =>
        "tagName" in n &&
        n.tagName === "a" &&
        content(n).includes("Book an Appointment"),
    );
    expect(links, slug).toHaveLength(2);
    for (const link of links)
      expect(
        "attrs" in link && link.attrs.find((a) => a.name === "href")?.value,
      ).toBe("/contact/");
    expect(content(main)).not.toContain("Ask About an Appointment");
  }
  for (const slug of fs
    .readdirSync("app/therapists")
    .filter((name) => fs.statSync(`app/therapists/${name}`).isDirectory())) {
    await page.goto(`/therapists/${slug}/`);
    const inquiries = page.locator(
      `main a[href="/contact/?therapist=${slug}"]`,
    );
    await expect(inquiries).toHaveCount(2);
    await expect(inquiries.first()).toHaveText(/Ask About Working With/);
    await expect(inquiries.last()).toHaveText("Contact Our Office");
  }
});

for (const width of [375, 390, 768, 1440]) {
  test(`shared cleanup: focus, menu, widget state and footer at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: width < 768 ? 667 : 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/contact/");
    const menu = page.locator(".mobile-toggle");
    const launcher = page.locator("#chat-open");
    const welcome = page.getByRole("button", {
      name: "Dismiss welcome prompt",
    });
    if (width < 1051) {
      // Let the existing timer expire while visually suppressed; it must not restart.
      await menu.click();
      await expect(launcher).toBeHidden();
      await expect
        .poll(() =>
          page.evaluate(() =>
            sessionStorage.getItem("bridge-inquiry-prompt-shown"),
          ),
        )
        .toBe("1");
      await expect(welcome).toBeHidden();
      await page.locator('[aria-controls="care-panel"]').focus();
      await page.keyboard.press("ArrowDown");
      await expect(page.locator("#care-panel a").first()).toBeFocused();
      await expect(launcher).toBeHidden();
      await page.keyboard.press("Escape");
      await expect(page.locator('[aria-controls="care-panel"]')).toBeFocused();
      await expect(menu).toHaveAttribute("aria-expanded", "true");
      await page.locator(".header-cta").focus();
      await page.keyboard.press("Tab");
      await expect(menu).toHaveAttribute("aria-expanded", "false");
      await expect(page.locator('main a[href="/"]').first()).toBeFocused();
      await expect(launcher).toBeVisible();
      await expect(welcome).toBeVisible();
      await menu.click();
      await page.keyboard.press("Escape");
      await expect(menu).toBeFocused();
      await expect(menu).toHaveAttribute("aria-expanded", "false");
    }
    await launcher.click();
    await page.locator("#widget-answer").fill("Navigation state test");
    await page
      .getByRole("button", { name: "Send answer", exact: true })
      .click();
    await expect(page.locator("#widget-answer")).toHaveAttribute(
      "type",
      "email",
    );
    await page.locator("#widget-answer").fill("retained@example.com");
    await page.keyboard.press("Escape");
    if (width < 1051) {
      await menu.click();
      await page.locator('[aria-controls="care-panel"]').click();
      await page.locator(".header-cta").scrollIntoViewIfNeeded();
      await expect(launcher).toBeHidden();
      await page.screenshot({ path: testInfo.outputPath(`menu-${width}.png`) });
      await page.keyboard.press("Escape");
      await page.keyboard.press("Escape");
    } else {
      await page.locator('[aria-controls="care-panel"]').hover();
      await expect(page.locator("#care-panel")).toBeVisible();
      await expect(launcher).toBeVisible();
      await page.mouse.move(1400, 850);
      await expect(page.locator("#care-panel")).toBeHidden();
    }
    await launcher.click();
    await expect(page.locator("#widget-answer")).toHaveValue(
      "retained@example.com",
    );
    await expect(page.getByRole("log")).toContainText("Navigation state test");
    expect(
      await page.evaluate(() =>
        sessionStorage.getItem("bridge-inquiry-prompt-shown"),
      ),
    ).toBe("1");
    await page.keyboard.press("Escape");
    const heights = await page
      .locator("footer section a")
      .evaluateAll((nodes) =>
        nodes.map((n) => n.getBoundingClientRect().height),
      );
    expect(Math.min(...heights)).toBeGreaterThanOrEqual(24);
    expect(Math.max(...heights)).toBeLessThan(48);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.screenshot({ path: testInfo.outputPath(`footer-${width}.png`) });
  });
}
