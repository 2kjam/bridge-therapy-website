import { expect, test } from "@playwright/test";
import { contentSecurityPolicy, securityHeaders } from "../lib/security-headers.mjs";

const expected = Object.fromEntries(
  securityHeaders.map(({ key, value }) => [key.toLowerCase(), value]),
);

test("HTML, assets, errors and staging Edge responses receive one enforced policy", async ({
  page,
  request,
}) => {
  for (const path of ["/", "/assets/ivory-logo.svg", "/not-a-page/"]) {
    const response = await request.get(path, { maxRedirects: 0 });
    const headers = response.headers();
    expect(headers["content-security-policy"], path).toBe(contentSecurityPolicy);
    expect(headers["content-security-policy-report-only"], path).toBeUndefined();
    for (const [name, value] of Object.entries(expected))
      expect(headers[name], `${path} ${name}`).toBe(value);
  }

  await page.addInitScript(() => {
    window.addEventListener("securitypolicyviolation", (event) => {
      document.documentElement.dataset.cspViolation = [
        event.violatedDirective,
        event.blockedURI,
      ].join(":");
    });
  });
  await page.goto("/");
  expect(
    await page.locator("html").getAttribute("data-csp-violation"),
  ).toBeNull();
});

test("CSP preserves forms, chatbot, navigation and the sole Vimeo frame", async ({
  page,
}) => {
  const violations: string[] = [];
  page.on("console", (message) => {
    if (/content security policy|refused to|violat/i.test(message.text()))
      violations.push(message.text());
  });

  await page.goto("/contact/?therapist=erin-young");
  await expect(page.locator("#inquiry-therapist")).toHaveValue("erin-young");
  await page.getByRole("button", { name: "Send Inquiry" }).click();
  await expect(page.locator("#first_name-error")).toHaveText(
    "Enter your first name.",
  );

  await page.goto("/");
  if (!(await page.locator("#navigation").isVisible()))
    await page.locator(".mobile-toggle").click();
  await page.locator('[aria-controls="care-panel"]').focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.locator("#care-panel")).toBeVisible();
  await page.keyboard.press("Escape");
  if (!(await page.locator("#chat-open").isVisible()))
    await page.locator(".mobile-toggle").click();
  await page.locator("#chat-open").click();
  await page.locator("#widget-answer").fill("Security test");
  await page.getByRole("button", { name: "Send answer" }).click();
  await expect(page.locator("#widget-answer")).toHaveAttribute("type", "email");

  await page.goto("/news/2019/5/21/storm-anxiety/");
  const iframe = page.locator('.legacy-video iframe[src^="https://player.vimeo.com/"]');
  await expect(iframe).toHaveCount(1);
  await iframe.scrollIntoViewIfNeeded();
  await expect(iframe).toHaveAttribute("allow", "fullscreen");
  expect(violations).toEqual([]);
});
