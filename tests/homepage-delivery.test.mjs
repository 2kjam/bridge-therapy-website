import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";
import sharp from "sharp";

const images = JSON.parse(fs.readFileSync("lib/optimized-images.json", "utf8"));
const hash = bytes => crypto.createHash("sha256").update(bytes).digest("hex");

test("delivery variants preserve originals, composition, dimensions and image quality", async () => {
  for (const [source, entry] of Object.entries(images)) {
    assert.equal(hash(fs.readFileSync(`public${source}`)), entry.sha256, source);
    const input = fs.readFileSync(`public${entry.inputSource}`);
    assert.equal(hash(input), entry.inputSha256, entry.inputSource);
    assert.equal(new Set(entry.variants.map(v => v.width)).size, entry.variants.length);
    for (const variant of [...entry.variants, ...(entry.avifVariants ?? [])]) {
      const bytes = fs.readFileSync(`public${variant.src}`);
      const metadata = await sharp(bytes).metadata();
      assert.equal(bytes.length, variant.bytes, variant.src);
      assert.equal(metadata.width, variant.width);
      assert.equal(metadata.height, variant.height);
      assert.ok(variant.width <= entry.width, "No upscaling");
      assert.ok(Math.abs(variant.height - variant.width * entry.height / entry.width) <= 1, "Full-frame proportional resize");
      const expected = await sharp(input).resize({ width: variant.width, withoutEnlargement: true }).ensureAlpha().raw().toBuffer();
      const actual = await sharp(bytes).ensureAlpha().raw().toBuffer();
      assert.equal(actual.length, expected.length);
      if (variant.lossless) {
        for (let i = 0; i < actual.length; i += 4) {
          assert.equal(actual[i+3], expected[i+3], "Logo alpha must be exact");
          if (expected[i+3]) assert.deepEqual(actual.subarray(i,i+3), expected.subarray(i,i+3), "Visible logo colors must be lossless");
        }
      } else {
        let error = 0;
        for (let i = 0; i < actual.length; i += 4) for (let c = 0; c < 3; c++) error += (actual[i+c]-expected[i+c]) ** 2;
        const mse = error / (actual.length / 4 * 3);
        const psnr = mse ? 10 * Math.log10(255 ** 2 / mse) : Infinity;
        assert.ok(psnr >= 34, `${variant.src}: decoded quality ${psnr.toFixed(2)} dB`);
      }
    }
  }
});
