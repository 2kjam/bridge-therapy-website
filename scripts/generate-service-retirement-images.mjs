// Reproduce the current service-image derivatives from archived, credited originals.
// Owner-supplied ADHD and Online Therapy images have no responsive variants and are untouched.
import fs from "node:fs";
import sharp from "sharp";
const manifest = JSON.parse(fs.readFileSync("content/service-images.json", "utf8"));
for (const record of manifest.images.filter(record => record.responsive)) {
  const source = `${record.sourceArchive}${record.sourceFile || `${record.id}.jpg`}`;
  for (const variant of record.responsive) {
    await sharp(source).extract(record.crop).resize(variant.width, variant.height)
      .webp({ quality: variant.quality, effort: 6 }).toFile(`public${variant.path}`);
  }
}
