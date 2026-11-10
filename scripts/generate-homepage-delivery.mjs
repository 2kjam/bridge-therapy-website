// Re-encode/resize approved assets only. Originals and existing derivatives stay intact.
import fs from "node:fs";
import crypto from "node:crypto";
import sharp from "sharp";

const manifest = {};
const logoPaths = {};
const digest = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
async function generate(source, name, widths, { inputSource = source, existing = {}, lossless = false, quality = 88 } = {}) {
  const original = fs.readFileSync(`public${source}`);
  const input = fs.readFileSync(`public${inputSource}`);
  const metadata = await sharp(input).metadata();
  const variants = [];
  for (const width of [...new Set(widths.map(w => Math.min(w, metadata.width)))].sort((a,b) => a-b)) {
    const reused = existing[width];
    let src = reused;
    if (!src) {
      src = `/assets/presentation/delivery/${name}-${width}.webp`;
      const encoded = await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality, lossless, effort: 6 }).toBuffer();
      // At native size keep an already smaller original rather than inflate delivery.
      if (width === metadata.width && inputSource === source && encoded.length >= original.length) src = source;
      else {
        fs.mkdirSync("public/assets/presentation/delivery", { recursive: true });
        fs.writeFileSync(`public${src}`, encoded);
      }
    }
    const bytes = fs.readFileSync(`public${src}`), info = await sharp(bytes).metadata();
    variants.push({ src, width: info.width, height: info.height, bytes: bytes.length, lossless, reused: !!reused || src === source });
  }
  manifest[source] = { sha256: digest(original), inputSource, inputSha256: digest(input), width: metadata.width, height: metadata.height, variants };
  return variants;
}
for (const name of ["hero", "lake"]) await generate(`/assets/ivory-${name}.jpg`, name, [1080,1448,2172], { quality:90 });
for (const name of ["anxiety","relationships","parenting","grief","teens"]) {
  const src = `/assets/presentation/home/replacements/${name}-800.webp`;
  await generate(src, `service-${name}`, [240,400,600,800], { existing: {800:src} });
}
await generate("/assets/presentation/home/trauma-800.webp", "service-trauma", [240,400,600,800], { inputSource:"/assets/ivory-trauma.jpg", existing:{800:"/assets/presentation/home/trauma-800.webp"} });
for (const name of ["jennifer","erin","jill","alyx","misty","kim","kelley","denise","sarah-critzman"]) {
  const src = `/assets/${name}.jpg`;
  const info = await sharp(`public${src}`).metadata();
  await generate(src, `portrait-${name}`, name === "erin" ? [500] : info.width > 500 ? [240,500,info.width] : [240,500], { existing:{500:`/assets/presentation/menu/${name}-500.webp`}, quality:90 });
}
for (const file of ["aetna.png","allied-transparent.png","blue-cross-transparent.png","christus-transparent.png","healthfirst-transparent.png","humana.png","multiplan.png","umr-transparent.png","webtpa.png","magellan-transparent.png"]) {
  const src = `/assets/insurance/${file}`;
  const info = await sharp(`public${src}`).metadata();
  const variants = await generate(src, `insurance-${file.replace(/\.png$/, "")}`, [info.width], { lossless:true });
  logoPaths[file] = variants[0].src;
}
await generate("/assets/chat-assistant.webp", "assistant", [96,192,256], { existing:{256:"/assets/chat-assistant.webp"}, quality:90 });
fs.writeFileSync("lib/optimized-images.json", JSON.stringify(manifest,null,2)+"\n");
fs.writeFileSync("lib/insurance-image-paths.json", JSON.stringify(logoPaths,null,2)+"\n");
console.log(`Prepared ${Object.keys(manifest).length} approved image sources; originals unchanged.`);
