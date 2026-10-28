import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import sharp from "sharp";
import {
  getBlogPosts,
  getNewBlogPosts,
  getPublishedBlogPosts,
  draftPreviewEnabled,
} from "../lib/blog.ts";
test("approved announcement date and organization metadata; 19 historical URLs retained", () => {
  assert.equal(getBlogPosts().length, 19);
  assert.equal(getPublishedBlogPosts().length, 20);
  assert.equal(getNewBlogPosts().length, 1);
  const [post] = getNewBlogPosts(true);
  assert.equal(post.legacyPath, "/blog/welcome-to-our-new-website/");
  assert.equal(post.publicationDate, "2026-10-28");
  assert.equal(post.publishedAt, "2026-10-28T05:00:00.000Z");
  assert.equal(post.authorType, "Organization");
  assert.equal(post.displayedByline, "The Bridge Therapeutic Services Team");
  assert.equal((post.bodyHtml.match(/https:\/\/2kjam.com\//g) || []).length, 1);
  assert.match(post.bodyHtml, /<a href="https:\/\/2kjam.com\/" target="_blank" rel="noopener noreferrer">2KJAM<\/a>/);
  assert.doesNotMatch(post.bodyHtml, /nofollow|sponsored/);
  const original = { ...process.env };
  try {
    process.env.BRIDGE_PREVIEW_DRAFTS = "true";
    delete process.env.NETLIFY;
    delete process.env.CONTEXT;
    assert.equal(draftPreviewEnabled(), true);
    process.env.NETLIFY = "true";
    assert.equal(draftPreviewEnabled(), false);
    delete process.env.NETLIFY;
    process.env.CONTEXT = "production";
    assert.equal(draftPreviewEnabled(), false);
  } finally {
    process.env = original;
  }
});
test("homepage screenshot variants preserve aspect ratio, dimensions and actual source", async () => {
  const root = "content/new-blog/welcome-to-our-new-website";
  const source = fs.readFileSync(
    "public/assets/blog/welcome-to-our-new-website/homepage.png",
  );
  const meta = await sharp(source).metadata();
  assert.equal(meta.width, 1440);
  assert.equal(meta.height, 960);
  for (const v of JSON.parse(
    fs.readFileSync(root + "/image-variants.json", "utf8"),
  )) {
    const bytes = fs.readFileSync("public" + v.src);
    const image = await sharp(bytes).metadata();
    assert.equal(image.format, "webp");
    assert.equal(image.width, v.width);
    assert.equal(image.height, v.height);
    assert.ok(Math.abs(image.height - (image.width * 2) / 3) <= 1);
    assert.deepEqual(
      bytes,
      await sharp(source)
        .resize({ width: v.width, withoutEnlargement: true })
        .webp({ quality: 88, effort: 6 })
        .toBuffer(),
    );
  }
});

test("approved publication adds exactly one native URL without changing historical inventory", () => {
  const originalDirectory = process.cwd();
  const fixture = fs.mkdtempSync(
    originalDirectory + "/tmp/announcement-publication-",
  );
  try {
    const directory = fixture + "/content/new-blog/welcome-to-our-new-website";
    fs.mkdirSync(directory, { recursive: true });
    const [post] = getNewBlogPosts(true);
    // Synthetic test fixture only; no real publication date is assigned.
    fs.writeFileSync(
      directory + "/metadata.json",
      JSON.stringify({
        ...post,
        status: "published",
        publicationDate: "2099-01-01",
        publishedAt: "2099-01-01T12:00:00-06:00",
      }),
    );
    fs.writeFileSync(directory + "/body.html", post.bodyHtml);
    process.chdir(fixture);
    const posts = getPublishedBlogPosts();
    const pages = JSON.parse(
      fs.readFileSync(
        originalDirectory + "/content/seo/public-pages.json",
        "utf8",
      ),
    );
    const urls = [...pages, ...posts.map((post) => post.legacyPath)].map(
      (path) =>
        "https://www.thebridgetherapy.com" + path.replace(/\/$/, "") + "/",
    );
    assert.equal(posts.length, 20);
    assert.equal(urls.length, 55);
    assert.equal(new Set(urls).size, 55);
    assert.equal(
      urls.filter((url) => url.endsWith("/blog/welcome-to-our-new-website/"))
        .length,
      1,
    );
    assert.equal(
      posts.filter((post) => post.legacyPath.startsWith("/news/")).length,
      19,
    );
    assert.ok(urls.every((url) => !/netlify|job-postings/.test(url)));
    fs.writeFileSync(
      directory + "/metadata.json",
      JSON.stringify({
        ...post,
        status: "draft",
        publicationDate: "",
        publishedAt: "",
      }),
    );
    assert.equal(getNewBlogPosts().length, 0);
    assert.equal(getNewBlogPosts(true).length, 1);
    assert.equal(getPublishedBlogPosts().length, 19);
    fs.writeFileSync(
      directory + "/metadata.json",
      JSON.stringify({
        ...post,
        status: "published",
        publicationDate: "",
        publishedAt: "",
      }),
    );
    assert.throws(() => getNewBlogPosts(), /approved publication date/);
  } finally {
    process.chdir(originalDirectory);
    // The small synthetic fixture stays under ignored tmp for inspection.
  }
});
