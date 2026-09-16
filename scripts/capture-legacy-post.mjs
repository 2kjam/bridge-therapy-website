// One-time, explicit capture. Refuses to overwrite an existing source snapshot.
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { parse, parseFragment } from "parse5";

const slug = "navigating-life-transitions";
const canonical = `https://www.thebridgetherapy.com/news/${slug}`;
const directory = `content/blog/${slug}`;
assert.ok(
  !fs.existsSync(directory),
  "Snapshot already exists; never overwrite it.",
);
async function download(url, image = false) {
  const response = await fetch(
    url,
    image
      ? {
          headers: { Accept: "image/jpeg", "User-Agent": "Python-urllib/3.14" },
        }
      : undefined,
  );
  assert.equal(response.status, 200, url);
  return Buffer.from(await response.arrayBuffer());
}
const page = await download(canonical);
const response = await download(`${canonical}?format=json`);
const item = JSON.parse(response.toString("utf8")).item;
const attr = (node, name) => node.attrs?.find((a) => a.name === name)?.value;
const all = (node, predicate) => [
  ...(predicate(node) ? [node] : []),
  ...(node.childNodes ?? []).flatMap((child) => all(child, predicate)),
];
const text = (node) =>
  node.nodeName === "#text"
    ? node.value
    : (node.childNodes ?? []).map(text).join("");
const document = parse(page.toString("utf8"));
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
assert.equal(
  attr(
    all(
      document,
      (n) => n.tagName === "link" && attr(n, "rel") === "canonical",
    )[0],
    "href",
  ),
  canonical,
);
const fragment = parseFragment(item.body, { sourceCodeLocationInfo: true });
const blocks = all(fragment, (n) =>
  attr(n, "class")?.split(" ").includes("sqs-html-content"),
);
assert.equal(blocks.length, 1, "Review any new block types before importing.");
const location = blocks[0].sourceCodeLocation;
// Slice original bytes rather than serialize/normalize content through a parser.
const body = item.body.slice(
  location.startTag.endOffset,
  location.endTag.startOffset,
);
const liveBlock = all(
  document,
  (n) =>
    attr(n, "class")?.split(" ").includes("sqs-html-content") &&
    text(n).startsWith("Change is an inevitable part of life."),
)[0];
assert.equal(
  text(liveBlock),
  text(blocks[0]),
  "Live page and feed body must agree.",
);
assert.equal(all(blocks[0], (n) => n.tagName === "h2").length, 7);
assert.equal(
  all(blocks[0], (n) => n.tagName === "h2" && text(n) === "").length,
  1,
);
const image = await download(item.assetUrl, true);
assert.equal(
  image.subarray(0, 3).toString("hex"),
  "ffd8ff",
  "Require original JPEG, not CDN-negotiated WebP.",
);
const imagePath = `/assets/blog/${slug}/image-asset.jpeg`;
const sha256 = (data) => createHash("sha256").update(data).digest("hex");
const metadata = {
  id: item.id,
  legacyPath: item.fullUrl,
  title: item.title,
  publishedAt: new Date(item.publishOn).toISOString(),
  publicationDate: "2023-08-31",
  publicationTimezone: "America/Chicago",
  displayedByline: item.author.displayName,
  excerptHtml: item.excerpt,
  categories: item.categories,
  tags: item.tags,
  seo: {
    title: text(all(document, (n) => n.tagName === "title")[0]),
    description: meta("description"),
    sourceCanonical: canonical,
    sourceOpenGraphImage: meta("og:image"),
  },
  featuredImage: {
    src: imagePath,
    sourceUrl: item.assetUrl,
    width: 2500,
    height: 1667,
    alt: "",
  },
  source: {
    capturedAt: new Date().toISOString(),
    url: canonical,
    sourceUpdatedAt: new Date(item.updatedOn).toISOString(),
    hashes: {
      "page.html": sha256(page),
      "item.json": sha256(JSON.stringify(item, null, 2) + "\n"),
      "body.html": sha256(item.body),
      "../body.html": sha256(body),
      image: sha256(image),
    },
    transformation:
      "Exact inner-HTML slice of the single sqs-html-content block. Only outer Squarespace layout wrappers and their style/script metadata are omitted. No body text, elements, attributes, or whitespace changed.",
  },
};
assert.equal(metadata.displayedByline, "Jennifer Wood, LPC-S");
assert.equal(metadata.excerptHtml, "");
fs.mkdirSync(`${directory}/source`, { recursive: true });
fs.mkdirSync(path.dirname(`public${imagePath}`), { recursive: true });
fs.writeFileSync(`${directory}/source/page.html`, page, { flag: "wx" });
fs.writeFileSync(
  `${directory}/source/item.json`,
  JSON.stringify(item, null, 2) + "\n",
  { flag: "wx" },
);
fs.writeFileSync(`${directory}/source/body.html`, item.body, { flag: "wx" });
fs.writeFileSync(`${directory}/body.html`, body, { flag: "wx" });
fs.writeFileSync(
  `${directory}/metadata.json`,
  JSON.stringify(metadata, null, 2) + "\n",
  { flag: "wx" },
);
fs.writeFileSync(`public${imagePath}`, image, { flag: "wx" });
console.log(JSON.stringify(metadata, null, 2));
