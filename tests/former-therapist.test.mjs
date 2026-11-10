import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { therapists as inquiryTherapists, therapistValue, validateInquiry } from "../lib/inquiry.ts";
import { therapists, services } from "../lib/seo/schema-data.ts";
import retiredLegacyUrl, { config } from "../netlify/edge-functions/retired-legacy-url.js";
import { contentSecurityPolicy } from "../lib/security-headers.mjs";

const formerPaths = ["/therapists/sarah-bell", "/therapists/sarah-bell/"];
const publicPages = JSON.parse(fs.readFileSync("content/seo/public-pages.json", "utf8"));

function files(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? files(file) : [file];
  });
}

test("former staff profile and portraits are absent from deployed page and image sources", () => {
  assert.equal(fs.existsSync("app/therapists/sarah-bell/page.tsx"), false);
  for (const file of files("public")) assert.doesNotMatch(file, /sarah-bell/i);
  for (const file of files(".next/server/app").filter((file) => file.endsWith(".html"))) {
    assert.doesNotMatch(fs.readFileSync(file, "utf8"), /Sarah Bell|Sarah%20Bell|sarah-bell/i, file);
  }
  for (const manifest of ["lib/presentation-images.json", "lib/optimized-images.json"])
    assert.doesNotMatch(fs.readFileSync(manifest, "utf8"), /sarah-bell/i);
});

test("current therapist directory, service schemas, sitemap and inquiry roster agree", () => {
  assert.equal(therapists.length, 9);
  assert.equal(inquiryTherapists.length, 10, "Nine clinicians plus help-me-choose");
  const inquiryPaths = inquiryTherapists.filter(([slug]) => slug).map(([slug]) => `/therapists/${slug}/`).sort();
  assert.deepEqual(therapists.map(({ path }) => path).sort(), inquiryPaths);
  assert.deepEqual(publicPages.filter((page) => /^\/therapists\/[^/]+\/$/.test(page)).sort(), inquiryPaths);
  for (const service of services) {
    if (["/adhd-counseling-tyler/", "/emdr-therapy-tyler/", "/trauma-therapy-tyler/"].includes(service.path))
      assert.deepEqual(service.therapists, ["/therapists/erin-young/"]);
    assert.ok(service.therapists.every((therapist) => inquiryPaths.includes(therapist)));
  }
  assert.equal(therapistValue("sarah-bell"), "");
  assert.equal(therapistValue("sarah-critzman"), "sarah-critzman");
  assert.equal(therapistValue("kelley-bell"), "kelley-bell");
  for (const inquirySource of ["contact_form", "chat_widget"]) {
    const result = validateInquiry({ first_name: "Test", email: "visitor@example.com", phone: "903-555-0123", preferred_therapist: "sarah-bell" }, inquirySource);
    assert.equal(result.errors.preferred_therapist, "Choose a therapist from the list.");
  }
});

test("exact former profile URLs are noindex 410 responses without redirects or personal details", async () => {
  for (const pathname of formerPaths) {
    assert.ok(config.path.includes(pathname));
    for (const method of ["GET", "HEAD"]) {
      const response = retiredLegacyUrl(new Request(`https://www.thebridgetherapy.com${pathname}?ref=old-link`, { method }), {
        next: () => { throw new Error("Former profile must not reach origin"); },
      });
      assert.equal(response.status, 410);
      assert.equal(response.headers.get("location"), null);
      assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
      assert.equal(response.headers.get("cache-control"), "no-store");
      assert.equal(response.headers.get("content-security-policy"), contentSecurityPolicy);
      assert.doesNotMatch(await response.text(), /Sarah|Bell|Whitney|appointment/i);
    }
  }
  for (const pathname of ["/therapists/sarah-critzman/", "/therapists/kelley-bell/", "/therapists/sarah-bell/unrelated/"]) {
    const response = retiredLegacyUrl(new Request(`https://www.thebridgetherapy.com${pathname}`), { next: () => new Response("Unchanged") });
    assert.equal(response.status, 200);
    assert.equal(await response.text(), "Unchanged");
  }
});
