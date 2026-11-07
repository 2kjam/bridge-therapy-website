import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { parse, parseFragment } from "parse5";
import {
  all,
  attr,
  text,
  hasClass,
  blocks,
  renderLegacyBody,
} from "./legacy-blog-content.mjs";
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
const captureRoot = "test-results/blog-capture";
const captures = fs
  .readdirSync(captureRoot)
  .map((slug) => ({
    slug,
    item: JSON.parse(
      fs.readFileSync(`${captureRoot}/${slug}/item.json`, "utf8"),
    ),
  }));
assert.equal(captures.length, 18);
const paths = new Set([
  "/news/navigating-life-transitions",
  ...captures.map((c) => c.item.fullUrl),
]);
const knownAssets = new Map();
for (const directory of fs
  .readdirSync("content/blog", { withFileTypes: true })
  .filter((d) => d.isDirectory())) {
  const record = JSON.parse(
    fs.readFileSync(`content/blog/${directory.name}/metadata.json`, "utf8"),
  );
  for (const asset of record.assets ?? [record.featuredImage])
    if (asset)
      knownAssets.set(sha(fs.readFileSync(`public${asset.src}`)), asset.src);
}
function dimensions(bytes) {
  if (bytes.subarray(0, 8).toString("hex") === "89504e470d0a1a0a")
    return [bytes.readUInt32BE(16), bytes.readUInt32BE(20), "png"];
  assert.equal(
    bytes.subarray(0, 3).toString("hex"),
    "ffd8ff",
    "Require original PNG/JPEG, never negotiated WebP",
  );
  let offset = 2;
  while (offset < bytes.length) {
    assert.equal(bytes[offset], 255);
    const marker = bytes[offset + 1];
    const length = bytes.readUInt16BE(offset + 2);
    if ([0xc0, 0xc1, 0xc2].includes(marker))
      return [
        bytes.readUInt16BE(offset + 7),
        bytes.readUInt16BE(offset + 5),
        "jpg",
      ];
    offset += 2 + length;
  }
  throw new Error("JPEG dimensions missing");
}
async function asset(sourceUrl, size, alt, slug, label) {
  const response = await fetch(sourceUrl, {
    headers: {
      Accept: /\.png$/i.test(sourceUrl) ? "image/png" : "image/jpeg",
      "User-Agent": "Python-urllib/3.14",
    },
  });
  assert.equal(response.status, 200, sourceUrl);
  const bytes = Buffer.from(await response.arrayBuffer());
  const [width, height, extension] = dimensions(bytes);
  if (
    slug === "how-to-calm-an-anxious-mind-learning-to-quiet-your-soul-with-god"
  ) {
    assert.equal(size, "3653x4207");
    assert.equal(`${width}x${height}`, "2500x2879");
  } else assert.equal(`${width}x${height}`, size, sourceUrl);
  const hash = sha(bytes);
  const src =
    knownAssets.get(hash) ?? `/assets/blog/${slug}/${label}.${extension}`;
  if (!knownAssets.has(hash)) {
    fs.mkdirSync(path.dirname(`public${src}`), { recursive: true });
    fs.writeFileSync(`public${src}`, bytes, { flag: "wx" });
    knownAssets.set(hash, src);
  }
  return {
    sourceUrl,
    src,
    width,
    height,
    alt,
    sha256: hash,
    bytes: bytes.length,
    sourceDeclaredSize: size,
    ...(`${width}x${height}` !== size
      ? {
          sourceDeliveryNote:
            "The unmodified public source response is 2500x2879; source metadata declares 3653x4207. Both the bare URL and format=original return the same 2500px-wide JPEG. No local resizing or conversion.",
        }
      : {}),
  };
}
for (const { slug, item } of captures) {
  const directory = `content/blog/${slug}`;
  if (fs.existsSync(directory)) {
    console.log(`Existing immutable record: ${slug}`);
    continue;
  }
  const page = fs.readFileSync(`${captureRoot}/${slug}/page.html`);
  const document = parse(page.toString());
  const sourceBody = parseFragment(item.body);
  const liveBody = all(
    document,
    (n) => n.tagName === "div" && attr(n, "id") === `item-${item.id}`,
  )[0];
  assert.ok(liveBody, slug);
  const sourceText = all(sourceBody, (n) =>
    hasClass(n, "sqs-html-content"),
  ).map(text);
  assert.deepEqual(
    all(liveBody, (n) => hasClass(n, "sqs-html-content")).map(text),
    sourceText,
    `Live body text: ${slug}`,
  );
  assert.equal(
    text(all(document, (n) => hasClass(n, "blog-author-name"))[0]),
    item.author.displayName,
  );
  const heading = all(document, (n) => hasClass(n, "blog-item-title"))[0];
  assert.equal(text(heading).trim(), item.title);
  const meta = (name) =>
    attr(
      all(
        document,
        (n) =>
          n.tagName === "meta" &&
          (attr(n, "name") === name || attr(n, "property") === name),
      )[0],
      "content",
    );
  const canonical = attr(
    all(
      document,
      (n) => n.tagName === "link" && attr(n, "rel") === "canonical",
    )[0],
    "href",
  );
  assert.equal(canonical, `https://www.thebridgetherapy.com${item.fullUrl}`);
  const assets = [];
  const featuredImage =
    slug === "take-heart"
      ? null
      : await asset(item.assetUrl, item.originalSize, "", slug, "featured");
  if (featuredImage) assets.push(featuredImage);
  const images = all(sourceBody, (n) => n.tagName === "img");
  const liveImages = all(liveBody, (n) => n.tagName === "img");
  assert.deepEqual(
    liveImages.map((n) => attr(n, "data-src")),
    images.map((n) => attr(n, "data-src")),
  );
  for (const [index, image] of images.entries()) {
    assert.equal(
      attr(image, "alt"),
      attr(liveImages[index], "alt"),
      "Live image alt",
    );
    assets.push(
      await asset(
        attr(image, "data-src"),
        attr(image, "data-image-dimensions"),
        attr(image, "alt") ?? "",
        slug,
        `body-${index + 1}`,
      ),
    );
  }
  const body = renderLegacyBody(item.body, assets, paths);
  const rendered = parseFragment(body);
  assert.equal(
    all(
      rendered,
      (n) =>
        ["script", "style"].includes(n.tagName) ||
        n.attrs?.some((a) => /^on/i.test(a.name)),
    ).length,
    0,
    "No source platform scripts or event handlers",
  );
  assert.ok(
    all(rendered, (n) => n.tagName === "a").every(
      (n) => !/^javascript:/i.test(attr(n, "href")),
    ),
  );
  const publicationDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(item.publishOn));
  const liveDate = text(
    all(
      document,
      (n) =>
        n.tagName === "time" &&
        attr(n, "data-content-field") === "published-on",
    )[0],
  ).trim();
  assert.equal(
    liveDate,
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago",
      month: "short",
      day: "numeric",
    }).format(new Date(item.publishOn)),
  );
  const itemBytes = fs.readFileSync(`${captureRoot}/${slug}/item.json`);
  const record = {
    id: item.id,
    legacyPath: item.fullUrl,
    title: item.title,
    publishedAt: new Date(item.publishOn).toISOString(),
    publicationDate,
    publicationTimezone: "America/Chicago",
    displayedByline: item.author.displayName,
    excerptHtml: item.excerpt,
    categories: item.categories,
    tags: item.tags,
    seo: {
      title: text(all(document, (n) => n.tagName === "title")[0]),
      description: meta("description") ?? "",
      sourceCanonical: canonical,
      sourceOpenGraphImage: meta("og:image"),
    },
    featuredImage,
    assets,
    source: {
      capturedAt: fs
        .statSync(`${captureRoot}/${slug}/page.html`)
        .mtime.toISOString(),
      url: canonical,
      sourceUpdatedAt: new Date(item.updatedOn).toISOString(),
      displayedDate: liveDate,
      hashes: {
        "page.html": sha(page),
        "item.json": sha(itemBytes),
        "body.html": sha(item.body),
        "../body.html": sha(body),
      },
      blockTypes: blocks(item.body).map((n) => attr(n, "class")),
      transformation:
        "Exact inner-HTML slices of text blocks; only same-site migrated article href destinations localized. Image blocks retain order, links and source alt values with original local bytes and proportional wrappers. Vimeo deferred markup becomes a responsive iframe with the exact source URL/title, fullscreen permission and no autoplay permission. Button anchor preserved verbatim. Empty spacer and platform-only layout/style/script wrappers omitted.",
      ...(slug === "take-heart"
        ? {
            omittedFeaturedImage: {
              sourceUrl: item.assetUrl,
              reason:
                "Generic Squarespace no-image.png placeholder; actual body/OG image preserved.",
            },
          }
        : {}),
    },
  };
  fs.mkdirSync(`${directory}/source`, { recursive: true });
  for (const [file, bytes] of Object.entries({
    "source/page.html": page,
    "source/item.json": itemBytes,
    "source/body.html": item.body,
    "body.html": body,
    "metadata.json": JSON.stringify(record, null, 2) + "\n",
  }))
    fs.writeFileSync(`${directory}/${file}`, bytes, { flag: "wx" });
  console.log(`Imported ${slug}: ${assets.length} placements`);
}
assert.equal(knownAssets.size, 23);
console.log("19 articles; 23 unique original image assets.");
