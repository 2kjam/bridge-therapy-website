import { test, expect } from "@playwright/test";
import fs from "node:fs";
import { parse, type DefaultTreeAdapterTypes } from "parse5";

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
    "Articles & resources →",
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
