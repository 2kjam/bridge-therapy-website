import assert from "node:assert/strict";
import test from "node:test";
import vm from "node:vm";
import { readFileSync } from "node:fs";
import {
  googleTagEnabled,
  GOOGLE_TAG_INITIALIZATION,
  GOOGLE_TAG_MANAGER_ID,
  GOOGLE_TAG_MANAGER_SRC,
} from "../lib/google-tag.mjs";

test("Google Tag stays disabled unless explicitly enabled", () => {
  for (const value of [undefined, "false", "1", "TRUE", " true", ""]) {
    assert.equal(googleTagEnabled({ BRIDGE_ENABLE_GOOGLE_TAG: value }), false);
  }
  assert.equal(googleTagEnabled({ BRIDGE_ENABLE_GOOGLE_TAG: "true" }), true);
});

test("Uses supplied GTM ID with official gtm.js endpoint", () => {
  assert.equal(GOOGLE_TAG_MANAGER_ID, "GTM-W4PHT6RP");
  assert.equal(GOOGLE_TAG_MANAGER_SRC, "https://www.googletagmanager.com/gtm.js?id=GTM-W4PHT6RP");
  assert.doesNotMatch(GOOGLE_TAG_INITIALIZATION, /config|form|email|phone|message/);
});

test("Initialization preserves existing data layer and queues only startup", () => {
  const dataLayer = [{ existing: true }];
  const context = { dataLayer };
  context.window = context;
  vm.runInNewContext(GOOGLE_TAG_INITIALIZATION, context);
  assert.equal(context.dataLayer, dataLayer);
  assert.equal(dataLayer.length, 2);
  assert.equal(dataLayer[1][0], "js");
  assert.equal(Object.prototype.toString.call(dataLayer[1][1]), "[object Date]");
});

test("Root layout contains one loader and retains noindex default", () => {
  const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.equal((layout.match(/src=\{GOOGLE_TAG_MANAGER_SRC\}/g) || []).length, 1);
  assert.match(layout, /googleTagEnabled\(process.env\)/);
  assert.match(layout, /robots: \{ index: false, follow: false \}/);
});
