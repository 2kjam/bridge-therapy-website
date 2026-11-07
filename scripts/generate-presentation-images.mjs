// Run with the Sharp version bundled by the pinned Next dependency (0.35.4).
// Originals are read-only; every output lives in assets/presentation.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";

const manifest = {};
async function generate(src, group, name, widths) {
  const input = fs.readFileSync(`public${src}`);
  const metadata = await sharp(input).metadata();
  const variants = [];
  const uniqueWidths = widths.filter((width, index) => widths.findIndex(candidate =>
    Math.min(candidate, metadata.width) === Math.min(width, metadata.width)) === index);
  for (const width of uniqueWidths) {
    const output = `/assets/presentation/${group}/${name}-${width}.webp`;
    fs.mkdirSync(path.dirname(`public${output}`), { recursive: true });
    const info = await sharp(input).resize({ width, withoutEnlargement: true })
      .webp({ quality: 88, effort: 6 }).toFile(`public${output}`);
    variants.push({ src: output, width: info.width, height: info.height });
  }
  manifest[src] = {
    sha256: crypto.createHash("sha256").update(input).digest("hex"),
    originalWidth: metadata.width, originalHeight: metadata.height,
    ...variants[Math.min(1, variants.length - 1)], variants,
  };
}
for (const name of ["kalynne", "jennifer", "erin", "jill", "alyx", "misty", "kim", "kelley", "denise", "sarah-bell", "sarah-critzman", "team"]) {
  await generate(`/assets/${name}.jpg`, "menu", name, [name === "kalynne" ? 480 : name === "team" ? 1200 : 500]);
}
for (const folder of fs.readdirSync("content/blog")) {
  const file = `content/blog/${folder}/metadata.json`;
  if (!fs.existsSync(file)) continue;
  const post = JSON.parse(fs.readFileSync(file, "utf8"));
  if (post.featuredImage) await generate(post.featuredImage.src, "blog", folder, [400, 800, 1080]);
}
for (const name of ["anxiety", "relationships", "trauma", "parenting", "grief", "teen"]) {
  await generate(`/assets/ivory-${name}.jpg`, "home", name, [800]);
}
fs.writeFileSync("lib/presentation-images.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(`Generated presentation images for ${Object.keys(manifest).length} originals; source files unchanged.`);
