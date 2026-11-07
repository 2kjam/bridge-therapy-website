import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";
import sharp from "sharp";

test("presentation derivatives preserve originals, full aspect ratios and declared dimensions", async () => {
  const manifest = JSON.parse(fs.readFileSync("lib/presentation-images.json", "utf8"));
  assert.equal(Object.keys(manifest).length, 36);
  for (const [source, entry] of Object.entries(manifest)) {
    assert.equal(new Set(entry.variants.map(v => v.width)).size, entry.variants.length, "Responsive width descriptors must be unique");
    const input = fs.readFileSync(`public${source}`);
    assert.equal(crypto.createHash("sha256").update(input).digest("hex"), entry.sha256, source);
    const original = await sharp(input).metadata();
    assert.equal(original.width, entry.originalWidth);
    assert.equal(original.height, entry.originalHeight);
    for (const variant of entry.variants) {
      assert.ok(variant.src.startsWith("/assets/presentation/"));
      const output = fs.readFileSync(`public${variant.src}`);
      const metadata = await sharp(output).metadata();
      assert.equal(metadata.format, "webp");
      assert.equal(metadata.width, variant.width);
      assert.equal(metadata.height, variant.height);
      assert.ok(Math.abs(variant.height - variant.width * original.height / original.width) <= 1, source);
      assert.ok(output.length < input.length, source);
    }
  }
});

test("Contact portrait preserves the source composition at sufficient high-density resolution", async () => {
  const output = fs.readFileSync("public/assets/presentation/contact/kalynne-720.webp");
  const metadata = await sharp(output).metadata();
  assert.equal(metadata.width, 720);
  assert.equal(metadata.height, 1080);
  assert.equal(metadata.format, "webp");
  assert.ok(output.length < 200_000);
  const expected = await sharp("public/assets/kalynne.jpg")
    .resize({ width: 720, withoutEnlargement: true })
    .webp({ quality: 85, effort: 6 }).toBuffer();
  assert.deepEqual(output, expected, "The derivative must only resize and encode the original photograph");
});
