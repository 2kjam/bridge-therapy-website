import sharp from "sharp";

// Work from the original pixels: no tracing, recoloring, or generated lettering.
const sources = [
  "allied.png",
  "blue-cross.jpg",
  "christus.png",
  "cigna.jpg",
  "healthfirst.jpg",
  "magellan.png",
  "meritain.jpg",
  "umr.png",
];

for (const file of sources) {
  const { data: original, info } = await sharp(
    `public/assets/insurance/${file}`,
  )
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const count = width * height;
  const background = new Uint8Array(count);
  const protectedWhite = new Uint8Array(count);
  const seen = new Uint8Array(count);
  const neighbors = (p) =>
    [
      p % width > 0 ? p - 1 : -1,
      p % width < width - 1 ? p + 1 : -1,
      p >= width ? p - width : -1,
      p < count - width ? p + width : -1,
    ].filter((n) => n >= 0);
  const light = (p) => Math.min(...original.subarray(p * 4, p * 4 + 3)) >= 230;

  // Classify connected near-white regions, including the counters of letters.
  // Keep the BCBS marks' enclosed whites and CHRISTUS's two white ribbon areas.
  for (let p = 0; p < count; p++) {
    if (seen[p] || !light(p)) continue;
    const region = [p];
    seen[p] = 1;
    for (let i = 0; i < region.length; i++) {
      for (const n of neighbors(region[i])) {
        if (!seen[n] && light(n)) {
          seen[n] = 1;
          region.push(n);
        }
      }
    }
    const touchesEdge = region.some(
      (n) =>
        n % width === 0 ||
        n % width === width - 1 ||
        n < width ||
        n >= count - width,
    );
    const preserve =
      (file === "blue-cross.jpg" &&
        !touchesEdge &&
        region.every((n) => n % width < 145)) ||
      (file === "christus.png" &&
        (region.includes(8751) || region.includes(17701)));
    for (const n of region) (preserve ? protectedWhite : background)[n] = 1;
  }

  const output = Buffer.from(original);
  for (let p = 0; p < count; p++) {
    if (protectedWhite[p]) continue;
    if (background[p]) {
      output[p * 4 + 3] = 0;
      continue;
    }
    // Unmatte only the narrow antialiased edge beside removed background.
    // Solid interior pixels and protected white details stay byte-for-byte intact.
    const x = p % width;
    const y = Math.floor(p / width);
    let nearBackground = false;
    let nearProtected = false;
    let foreground = -1;
    let distance = Infinity;
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        if (x + dx < 0 || x + dx >= width || y + dy < 0 || y + dy >= height)
          continue;
        const n = (y + dy) * width + x + dx;
        if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) {
          nearBackground ||= Boolean(background[n]);
          nearProtected ||= Boolean(protectedWhite[n]);
        }
        const d = dx * dx + dy * dy;
        if (
          !background[n] &&
          !protectedWhite[n] &&
          Math.min(...original.subarray(n * 4, n * 4 + 3)) < 180 &&
          d < distance
        ) {
          foreground = n;
          distance = d;
        }
      }
    }
    const minimum = Math.min(...original.subarray(p * 4, p * 4 + 3));
    if (!nearBackground || nearProtected || minimum < 180 || foreground < 0)
      continue;
    const base = Math.min(
      ...original.subarray(foreground * 4, foreground * 4 + 3),
    );
    const alpha = Math.min(1, (255 - minimum) / (255 - base));
    output[p * 4 + 3] = Math.round(255 * alpha);
    for (let c = 0; c < 3; c++) {
      output[p * 4 + c] = Math.max(
        0,
        Math.min(255, Math.round(255 + (original[p * 4 + c] - 255) / alpha)),
      );
    }
  }

  // Retain all source pixels and add actual transparent padding; never crop a mark.
  const padding = Math.ceil(Math.max(width, height) * 0.04);
  const target = file.replace(/\.(png|jpg)$/, "-transparent.png");
  await sharp(output, { raw: { width, height, channels: 4 } })
    .extend({
      top: padding,
      bottom: padding,
      left: padding,
      right: padding,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(`public/assets/insurance/${target}`);
  console.log(
    `${file} -> ${target}; ${background.reduce((a, b) => a + b, 0)} background pixels removed`,
  );
}
