import { test, expect } from "@playwright/test";

const destinations = ["/blog/", "/christian-counseling-tyler/", "/contact/", "/contact/#questions", "/contact/#location", "tel:9032838729"];
for (const width of [375, 390, 768, 1024, 1280, 1440]) {
  test(`resources menu: retained destinations, deferred image and accessible layout at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.addInitScript(() => sessionStorage.setItem("bridge-inquiry-prompt-shown", "1"));
    const imageRequests: string[] = [];
    page.on("request", request => { if (request.resourceType() === "image") imageRequests.push(request.url()); });
    await page.goto("/", { waitUntil: "networkidle" });
    expect(imageRequests.some(url => url.includes("/presentation/menu/"))).toBe(false);
    const headerBefore = await page.locator(".header").boundingBox();
    if (width <= 1050) await page.locator(".mobile-toggle").click();
    const trigger = page.locator('[aria-controls="about-panel"]');
    await trigger.focus();
    await page.keyboard.press("ArrowDown");
    const panel = page.locator("#about-panel");
    await expect(panel).toBeVisible();
    await expect(panel.locator("a").first()).toBeFocused();
    expect(await panel.locator(".resources-links a").evaluateAll(links => links.map(link => link.getAttribute("href")))).toEqual(destinations);
    await expect(panel).not.toContainText(/Forms & Documents|Recommended Reading|Crisis Resources|You are not alone in the journey/);
    const image = panel.locator(".resources-feature img");
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty("naturalWidth", 720);
    await expect(image).toHaveAttribute("loading", "lazy");
    await expect(image).toHaveAttribute("alt", "");
    expect(imageRequests.some(url => url.includes("resources-blog-720.webp"))).toBe(true);
    expect(imageRequests.some(url => url.includes("/assets/blog/"))).toBe(false);
    const cta = panel.getByRole("link", { name: "Visit the Blog", exact: true });
    await cta.focus();
    expect(await cta.evaluate(node => getComputedStyle(node).outlineStyle)).not.toBe("none");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const card = await panel.locator(".resources-feature").boundingBox();
    const green = await panel.locator(".resources-feature-panel").boundingBox();
    expect(Math.abs(card!.y + card!.height - green!.y - green!.height)).toBeLessThan(1);
    if (width <= 1050) {
      await expect(page.locator("#chat-open")).toBeHidden();
      await expect(panel.locator(".resources-intro")).toBeHidden();
      expect(await page.locator("#navigation").evaluate(n => getComputedStyle(n).overflowY)).toBe("auto");
    } else {
      const intro = await panel.locator(".resources-intro").boundingBox();
      const links = await panel.locator(".resources-links").boundingBox();
      expect(intro!.x + intro!.width).toBeLessThan(links!.x);
      expect(links!.x + links!.width).toBeLessThan(card!.x);
      const portrait = await image.boundingBox();
      expect(portrait!.height / card!.height).toBeGreaterThan(0.45);
      expect(portrait!.height / card!.height).toBeLessThan(0.65);
    }
    expect(await page.locator(".header").boundingBox()).toEqual(headerBefore);
    await panel.screenshot({ path: info.outputPath(`resources-${width}.png`) });
    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
    await expect(trigger).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await cta.click();
    await expect(page).toHaveURL(/\/blog\/$/);
  });
}
