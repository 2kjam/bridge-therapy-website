import assert from "node:assert/strict";
import fs from "node:fs";
import { chromium, expect } from "@playwright/test";

const base = process.env.INQUIRY_TEST_URL || "http://127.0.0.1:3048";
assert.match(base, /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/);
const browser = await chromium.launch({ channel: "msedge", headless: true });
const results = [];
fs.mkdirSync("tmp/widget-escape", { recursive: true });
try {
  for (const width of [375, 390, 768, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 844 },
    });
    await context.addInitScript(() =>
      sessionStorage.setItem("bridge-inquiry-prompt-shown", "1"),
    );
    await context.route("**/*", (route) =>
      ["GET", "HEAD"].includes(route.request().method())
        ? route.continue()
        : route.abort(),
    );
    let calls = 0,
      release;
    const held = new Promise((resolve) => {
      release = resolve;
    });
    const payloads = [];
    await context.route("**/__forms.html", async (route) => {
      assert.equal(route.request().method(), "POST");
      calls++;
      payloads.push(
        Object.fromEntries(new URLSearchParams(route.request().postData())),
      );
      if (calls === 1) await held;
      await route.fulfill({
        status: calls === 1 ? 503 : 200,
        body: "Mock response",
      });
    });
    const page = await context.newPage();
    await page.goto(base + "/", { waitUntil: "networkidle" });
    const launcher = page.locator("#chat-open");
    const panel = page.locator("#inquiry-widget-panel");
    const answer = page.locator("#widget-answer");
    const log = panel.getByRole("log");
    const reopen = async () => {
      await launcher.focus();
      await page.keyboard.press("Enter");
      await expect(panel).toBeVisible();
    };
    const dismissed = async () => {
      await expect(panel).toHaveCount(0);
      await expect(launcher).toBeFocused();
      await expect(launcher).toHaveAttribute("aria-expanded", "false");
      await expect(launcher).not.toHaveAttribute("aria-controls", /.+/);
    };
    const escape = async () => {
      await page.keyboard.press("Escape");
      await dismissed();
    };
    await reopen();
    await expect(answer).toBeFocused();
    await answer.fill("Escape test");
    await escape();
    assert.equal(calls, 0);
    await reopen();
    await expect(answer).toHaveValue("Escape test");
    await panel
      .getByRole("button", { name: "Close inquiry assistant", exact: true })
      .click();
    await dismissed();
    await reopen();
    await expect(answer).toHaveValue("Escape test");
    await panel
      .getByRole("button", { name: "Send answer", exact: true })
      .click();
    await expect(log.locator("[data-typing]")).toBeVisible();
    await expect(answer).toHaveCount(0);
    const typingFocus = await page.evaluate(() => ({
      tag: document.activeElement.tagName,
      id: document.activeElement.id,
      insidePanel: !!document.activeElement.closest("#inquiry-widget-panel"),
    }));
    console.log(
      JSON.stringify({
        width,
        phase: "typing-before-Escape",
        focus: typingFocus,
        calls,
      }),
    );
    await escape();
    assert.equal(calls, 0);
    await reopen();
    await expect(log).toContainText("Escape test");
    await expect(answer).toHaveAttribute("type", "email");
    await answer.fill("escape@example.com");
    // A nonmodal dialog allows focus outside; Escape must still dismiss it.
    await launcher.focus();
    await escape();
    assert.equal(calls, 0);
    await reopen();
    await expect(answer).toHaveValue("escape@example.com");
    await panel
      .getByRole("button", { name: "Send answer", exact: true })
      .click();
    await expect(answer).toHaveAttribute("type", "tel");
    await answer.fill("903-283-8729");
    await panel
      .getByRole("button", { name: "Send answer", exact: true })
      .click();
    await expect.poll(() => calls).toBe(1);
    await expect(log.locator('[data-pending="true"]')).toBeVisible();
    await expect(answer).toHaveCount(0);
    const pendingTranscript = await log.textContent();
    const pendingFocus = await page.evaluate(() => ({
      tag: document.activeElement.tagName,
      id: document.activeElement.id,
      insidePanel: !!document.activeElement.closest("#inquiry-widget-panel"),
    }));
    console.log(
      JSON.stringify({
        width,
        phase: "pending-before-Escape",
        focus: pendingFocus,
        calls,
      }),
    );
    await escape();
    assert.equal(calls, 1, "Escape must not submit/retry an inquiry");
    await reopen();
    await expect(log.locator('[data-pending="true"]')).toBeVisible();
    assert.equal(await log.textContent(), pendingTranscript);
    assert.equal(calls, 1);
    release();
    await expect(
      panel.getByRole("button", { name: "Try Again", exact: true }),
    ).toBeEnabled();
    await expect(log).toContainText("wasn't sent");
    const errorTranscript = await log.textContent();
    await escape();
    await reopen();
    assert.equal(await log.textContent(), errorTranscript);
    await panel
      .getByRole("button", { name: "Close inquiry assistant", exact: true })
      .click();
    await dismissed();
    assert.equal(calls, 1);
    await reopen();
    assert.equal(await log.textContent(), errorTranscript);
    await panel.getByRole("button", { name: "Try Again", exact: true }).click();
    await expect(log).toContainText("Perfect. Thank you.");
    assert.equal(calls, 2);
    assert.deepEqual(
      payloads[1],
      payloads[0],
      "Dismiss/reopen retains all answers and routing",
    );
    assert.equal(payloads[0]["form-name"], "bridge-contact-inquiry");
    assert.equal(payloads[0].first_name, "Escape test");
    assert.equal(payloads[0].email, "escape@example.com");
    assert.equal(payloads[0].phone, "903-283-8729");
    assert.equal(payloads[0].source_page, "/");
    assert.equal(payloads[0].inquiry_source, "chat_widget");
    const successTranscript = await log.textContent();
    await escape();
    await reopen();
    assert.equal(await log.textContent(), successTranscript);
    await panel.getByRole("button", { name: "Close", exact: true }).click();
    await dismissed();
    assert.equal(calls, 2);
    // A closed widget must not consume Escape elsewhere on the page.
    await page.locator("h1").evaluate((node) => {
      node.tabIndex = -1;
      node.focus();
    });
    await page.keyboard.press("Escape");
    await expect(page.locator("h1")).toBeFocused();
    assert.equal(calls, 2);
    results.push({
      width,
      typingFocus,
      pendingFocus,
      escape: "pass",
      closeButtons: "pass",
      focusReturn: "pass",
      statePreserved: "pass",
      submissions: "2 explicit mocked sends only",
    });
    await context.close();
  }
  fs.writeFileSync(
    "tmp/widget-escape/results.json",
    JSON.stringify(results, null, 2),
  );
  console.log(
    "PASS: Escape with composer focus, outside focus, typing, pending request, error and success; close/reopen, launcher focus and conversation/answer preservation at four widths. No live submissions.",
  );
} finally {
  await browser.close();
}
