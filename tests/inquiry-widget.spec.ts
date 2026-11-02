import { test, expect } from "@playwright/test";

test("widget Escape preserves drafts, conversation and pending delivery without resubmitting", async ({
  page,
}) => {
  await page.addInitScript(() =>
    sessionStorage.setItem("bridge-inquiry-prompt-shown", "1"),
  );
  let calls = 0;
  let release!: () => void;
  const held = new Promise<void>((resolve) => {
    release = resolve;
  });
  // Every submission is intercepted; no inquiry or provider receives test data.
  await page.route("**/__forms.html", async (route) => {
    calls++;
    expect(route.request().method()).toBe("POST");
    await held;
    await route.fulfill({ status: 200, body: "Mock delivery" });
  });
  await page.goto("/");
  const launcher = page.locator("#chat-open");
  const panel = page.getByRole("dialog", {
    name: "The Bridge",
    exact: true,
  });
  const answer = page.locator("#widget-answer");
  const reopen = async () => {
    await launcher.click();
    await expect(panel).toBeVisible();
  };
  const dismiss = async () => {
    await page.keyboard.press("Escape");
    await expect(panel).toHaveCount(0);
    await expect(launcher).toBeFocused();
    await expect(launcher).toHaveAttribute("aria-expanded", "false");
  };
  await reopen();
  await answer.fill("Regression test");
  await dismiss();
  await reopen();
  await expect(answer).toHaveValue("Regression test");
  await panel.getByRole("button", { name: "Send answer", exact: true }).click();
  await expect(panel.locator("[data-typing]")).toBeVisible();
  await dismiss();
  await reopen();
  await expect(panel.getByRole("log")).toContainText("Regression test");
  await expect(answer).toHaveAttribute("type", "email");
  await answer.fill("test@example.com");
  // Escape also works while focus is outside this nonmodal dialog.
  await launcher.focus();
  await dismiss();
  await reopen();
  await expect(answer).toHaveValue("test@example.com");
  await panel.getByRole("button", { name: "Send answer", exact: true }).click();
  await expect(answer).toHaveAttribute("type", "tel");
  await answer.fill("903-555-0123");
  await panel.getByRole("button", { name: "Send answer", exact: true }).click();
  await expect.poll(() => calls).toBe(1);
  await expect(panel.locator('[data-pending="true"]')).toBeVisible();
  const transcript = await panel.getByRole("log").textContent();
  await dismiss();
  await reopen();
  await expect(panel.getByRole("log")).toHaveText(transcript!);
  expect(calls).toBe(1);
  release();
  await expect(panel.getByRole("log")).toContainText("Perfect. Thank you.");
  await dismiss();
  await reopen();
  await expect(panel.getByRole("log")).toContainText("Perfect. Thank you.");
  expect(calls).toBe(1);
});
