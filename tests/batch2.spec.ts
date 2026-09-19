import { test, expect } from "@playwright/test";
import fs from "node:fs";
import { createHash } from "node:crypto";
import { parse, parseFragment, type DefaultTreeAdapterTypes } from "parse5";
import updates from "./fixtures/batch2-copy.json";
import protectedFiles from "./fixtures/batch2-protected.json";
type Node = DefaultTreeAdapterTypes.Node;
const all = (n: Node, p: (n: Node) => boolean): Node[] => [
  ...(p(n) ? [n] : []),
  ...("childNodes" in n ? n.childNodes.flatMap((c) => all(c, p)) : []),
];
const tag = (n: Node, name: string) => "tagName" in n && n.tagName === name;
const text = (n: Node): string =>
  "value" in n
    ? n.value
    : "childNodes" in n
      ? n.childNodes.map(text).join("")
      : "";
const normalized = (n: Node) => text(n).replace(/\s+/g, " ").trim();
const hash = (s: string | Buffer) =>
  createHash("sha256").update(s).digest("hex");

test("Batch 2 preserves form/widget sources and NES content outside getting-started FAQ", () => {
  for (const [file, expected] of Object.entries(protectedFiles)) {
    if (file === "nesExceptGettingStarted") continue;
    expect(hash(fs.readFileSync(file)), file).toBe(expected);
  }
  const nes = fs
    .readFileSync(
      "app/non-epileptic-seizures-counseling-tyler/page.tsx",
      "utf8",
    )
    .replace(
      /<details>\s*<summary>How do I get started\?<\/summary>[\s\S]*?<\/details>/,
      "",
    )
    .replace(/\s+/g, "");
  expect(hash(nes)).toBe(protectedFiles.nesExceptGettingStarted);
});

test("Batch 2 exact operational copy and active-content audit", async ({
  request,
}) => {
  for (const [route, paragraphs] of Object.entries(updates.paragraphs)) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(200);
    const doc = parse(await response.text());
    const main = all(doc, (n) => tag(n, "main"))[0];
    const copy = all(main, (n) => tag(n, "p")).map(normalized);
    for (const update of paragraphs)
      expect(copy, route).toContain(normalized(parseFragment(update.html)));
    expect(normalized(main)).not.toMatch(
      /[$£€]\s*\d|no sliding.scale|do not offer.{0,20}(sliding|reduced.fee)/i,
    );
    expect(normalized(main)).not.toMatch(/Cigna|Meritain|Meritan/i);
  }
  const contact = parse(await (await request.get("/contact/")).text());
  const contactText = normalized(all(contact, (n) => tag(n, "main"))[0]);
  for (const phrase of [
    "within 24 hours",
    "50–60 minutes",
    "8:00 AM–7:00 PM",
    "Based on availability",
    "check, cash, and credit card",
    "requires a card",
    "superbill",
    "insurance company determines",
    "full session fee",
    "in-person and telehealth",
  ])
    expect(contactText).toContain(phrase);
});

for (const width of [375, 390, 768, 1440]) {
  test(`Batch 2 Contact and help card at ${width}px`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.addInitScript(() =>
      sessionStorage.setItem("bridge-inquiry-prompt-shown", "1"),
    );
    await page.goto("/contact/");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );
    await expect(page.locator("#inquiry form")).toHaveCount(1);
    expect((await page.locator("#inquiry").boundingBox())!.y).toBeLessThan(
      (await page.locator(".contact-faq").boundingBox())!.y,
    );
    await expect(page.locator(".contact-faq details")).toHaveCount(8);
    await expect(page.locator(".contact-faq")).not.toContainText("What should I include in my first email?");
    await expect(page.locator(".contact-faq")).not.toContainText("What happens after I contact The Bridge?");

    for (const item of await page.locator(".contact-faq details").all()) {
      await item.locator("summary").focus();
      await page.keyboard.press("Enter");
      await expect(item).toHaveAttribute("open", "");
      await page.keyboard.press("Enter");
    }
    await page.evaluate(async () => {
      document.querySelectorAll("img").forEach((n) => (n.loading = "eager"));
      await document.fonts.ready;
      await Promise.all([...document.images].map((n) => n.decode()));
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
      await page.evaluate(() => {
        (document.activeElement as HTMLElement)?.blur();
        window.scrollTo(0, 0);
      });
    await page.screenshot({
      path: info.outputPath(`contact-${width}.png`),
      fullPage: true,
    });
    if (width <= 1050)
      await page.getByRole("button", { name: "Menu", exact: false }).click();
    await page.getByRole("button", { name: "Counseling Services" }).click();
    const help = page.locator(".office-help");
    await expect(help).toContainText(
      "Kalynne can help you find a counselor who may be a good fit.",
    );
    await expect(help).toHaveAttribute("href", "/contact/");
    await help.scrollIntoViewIfNeeded();
    await help.screenshot({ path: info.outputPath(`help-${width}.png`) });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}
