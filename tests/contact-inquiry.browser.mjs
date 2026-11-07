import fs from "node:fs";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import os from "node:os";
import path from "node:path";

const base = process.env.INQUIRY_TEST_URL || "http://localhost:3011";
if (!/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(base))
  throw new Error("Use a local test server.");
const browser = await chromium.launch({ headless: true, channel: "msedge" });
try {
  const page = await browser.newPage();
  let calls = 0;
  let mode = "error";
  await page.route(/\/__forms\.html$/, async (route) => {
    calls++;
    assert.equal(route.request().method(), "POST");
    assert.equal(route.request().headers()["content-type"], "application/x-www-form-urlencoded");
    const payload = new URLSearchParams(route.request().postData());
    assert.deepEqual([...payload.keys()].sort(), ["form-name", "first_name", "last_name", "email", "phone", "preferred_therapist", "message", "bot-field", "source_page", "inquiry_source"].sort());
    assert.equal(payload.get("form-name"), "bridge-contact-inquiry");
    assert.equal(payload.get("preferred_therapist"), "erin-young");
    assert.equal(payload.get("bot-field"), "");
    assert.equal(payload.get("source_page"), "/contact/");
    assert.equal(payload.get("inquiry_source"), "contact_form");
    if (mode === "static") return route.fulfill({status:200, contentType:"text/html", body:fs.readFileSync("public/__forms.html","utf8")});
    if (mode === "network-error") return route.abort();
    await route.fulfill({
      status: mode === "success" ? 200 : 503,
      contentType: "text/html",
      body: mode === "success" ? "Accepted" : "Unavailable",
    });
  });
  const slugs = [
    "jennifer-wood",
    "erin-young",
    "jill-kirkley",
    "alyxandrah-white",
    "misty-shultz",
    "kim-gonzales",
    "kelley-bell",
    "denise-santos",
    "sarah-bell",
    "sarah-critzman",
  ];
  for (const slug of [...slugs, "unknown"]) {
    await page.goto(`${base}/contact/?therapist=${slug}`, {
      waitUntil: "networkidle",
    });
    assert.equal(
      await page.locator("#inquiry-therapist").inputValue(),
      slug === "unknown" ? "" : slug,
    );
  }
  await page.selectOption("#inquiry-therapist", "erin-young");
  assert.equal(
    await page.locator("#inquiry-therapist").inputValue(),
    "erin-young",
  );
  await page.getByRole("button", { name: "Send Inquiry" }).click();
  assert.equal(
    await page.locator("#first_name-error").innerText(),
    "Enter your first name.",
  );
  await page.fill("#inquiry-first_name", "Test");
  await page.getByRole("button", { name: "Send Inquiry" }).click();
  assert.equal(
    await page.locator("#last_name-error").innerText(),
    "Enter your last name.",
  );
  await page.fill("#inquiry-last_name", "Visitor");
  await page.fill("#inquiry-email", "invalid");
  await page.getByRole("button", { name: "Send Inquiry" }).click();
  assert.equal(
    await page.locator("#email-error").innerText(),
    "Enter a valid email address.",
  );
  assert.equal(calls, 0);
  await page.fill("#inquiry-email", "visitor@example.com");
  await page.getByRole("button", { name: "Send Inquiry" }).click();
  await page
    .getByRole("alert")
    .getByText(/could not be sent/)
    .waitFor();
  assert.equal(await page.locator("#inquiry-first_name").inputValue(), "Test");
  assert.equal(
    await page.getByRole("alert").locator('a[href="tel:9032838729"]').count(),
    1,
  );
  mode = "success";
  const honeypot = page.locator('[name="bot-field"]');
  assert.equal(await honeypot.getAttribute("tabindex"), "-1");
  assert.equal(await honeypot.inputValue(), "");
  mode = "network-error";
  await page.getByRole("button", { name: "Send Inquiry" }).click();
  await page.getByRole("alert").getByText(/could not be sent/).waitFor();
  assert.equal(await page.locator("#inquiry-first_name").inputValue(), "Test");
  mode = "static";
  await page.getByRole("button", { name: "Send Inquiry" }).click();
  await page.getByRole("alert").getByText(/could not be sent/).waitFor();
  assert.equal(await page.locator("#inquiry-first_name").inputValue(), "Test");
  assert.equal(await page.getByRole("heading", {name:"Thank you for reaching out."}).count(), 0);
  mode = "success";
  await page.getByRole("button", { name: "Send Inquiry" }).click();
  await page
    .getByRole("heading", { name: "Thank you for reaching out." })
    .waitFor();
  assert.equal(await page.locator("#inquiry form").count(), 0);
  for (const width of [375, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${base}/contact/?therapist=jennifer-wood`, {
      waitUntil: "networkidle",
    });
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    await page
      .locator("#inquiry")
      .screenshot({ path: path.join(os.tmpdir(), `inquiry-${width}.png`) });
    for (const details of await page.locator(".contact-faq details").all()) {
      await details.locator("summary").click();
      assert.equal(await details.getAttribute("open"), "");
    }
    for (const href of await page
      .locator('main a[href^="/"]')
      .evaluateAll((as) => [...new Set(as.map((a) => a.href))]))
      assert.equal((await page.request.get(href)).status(), 200);
  }
  console.log(
    "PASS: 10 preselected therapists, unknown fallback, editable selection, client validation, mocked success/error, retained input, fallback links, four widths, existing FAQs and local links. No mail sent.",
  );
} finally {
  await browser.close();
}
