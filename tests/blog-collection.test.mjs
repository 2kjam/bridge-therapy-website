import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createHash } from "node:crypto";
import { parse, parseFragment } from "parse5";
import { getBlogPosts, getBlogPost } from "../lib/blog.ts";
import {
  all,
  attr,
  text,
  hasClass,
  blocks,
  inner,
  outer,
  localizeLinks,
  localHref,
  renderLegacyBody,
} from "../scripts/legacy-blog-content.mjs";
const posts = getBlogPosts();
const paths = new Set(posts.map((p) => p.legacyPath));
// Erin confirmed authorship; only displayed metadata changes, never source evidence.
const erinAuthored = new Set([
  "traumatic-memories-and-treatment",
  "storm-anxiety",
  "simple-ways-to-lower-stress-during-the-holidays",
  "the-bridge-community-spotlight-featuring-beth-reed-with-sightorg",
]);
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
const signature = (n) => ({
  name: n.nodeName,
  value: n.value,
  attrs: n.attrs,
  children: (n.childNodes ?? []).map(signature),
});
const directories = fs
  .readdirSync("content/blog", { withFileTypes: true })
  .filter((d) => d.isDirectory());
test("collection: exactly 19 distinct routes, 23 assets, original excerpts only, newest first", () => {
  assert.equal(posts.length, 19);
  assert.equal(paths.size, 19);
  assert.deepEqual(
    posts.map((p) => p.publishedAt),
    posts
      .map((p) => p.publishedAt)
      .sort()
      .reverse(),
  );
  assert.equal(
    new Set(
      posts.flatMap((p) =>
        (p.assets ?? [p.featuredImage]).filter(Boolean).map((a) => a.src),
      ),
    ).size,
    23,
  );
  assert.deepEqual(
    posts
      .filter((p) => p.excerptHtml)
      .map((p) => p.legacyPath.split("/").at(-1)),
    ["take-heart", "traumatic-memories-and-treatment", "big-news"],
  );
  assert.deepEqual(
    posts.find((p) =>
      p.legacyPath.endsWith("/traumatic-memories-and-treatment"),
    ).tags,
    ["Trauma", "Memories", "EDMR"],
  );
  assert.equal(
    posts.find((p) => p.legacyPath.endsWith("/screen-time-recommendations"))
      .publicationDate,
    "2021-12-09",
  );
  assert.equal(posts.at(-1).publicationDate, "2019-01-01");
  assert.ok(
    posts
      .find((p) => p.legacyPath.includes("simple-ways"))
      .title.includes("Stress  During"),
  );
  assert.equal(getBlogPost(["unknown-article"]), undefined);
  const index = parse(fs.readFileSync(".next/server/app/blog.html", "utf8"));
  const cards = all(index, (n) => hasClass(n, "blog-card"));
  assert.equal(cards.length, 19);
  cards.forEach((card, i) => {
    assert.equal(text(all(card, (n) => n.tagName === "h2")[0]), posts[i].title);
    assert.equal(
      attr(all(card, (n) => hasClass(n, "blog-card-link"))[0], "href"),
      posts[i].legacyPath,
    );
    assert.equal(
      attr(all(card, (n) => n.tagName === "time")[0], "datetime"),
      posts[i].publicationDate,
    );
    const excerpt = all(card, (n) => hasClass(n, "blog-card-excerpt"))[0];
    assert.deepEqual(
      excerpt?.childNodes.map(signature) ?? [],
      parseFragment(posts[i].excerptHtml).childNodes.map(signature),
    );
    assert.equal(
      all(card, (n) => n.tagName === "img").length,
      posts[i].featuredImage ? 1 : 0,
    );
  });
});
for (const directory of directories) {
  const root = `content/blog/${directory.name}`;
  const record = JSON.parse(fs.readFileSync(`${root}/metadata.json`, "utf8"));
  const source = JSON.parse(
    fs.readFileSync(`${root}/source/item.json`, "utf8"),
  );
  const post = posts.find((p) => p.id === record.id);
  test(`preservation: ${record.title}`, () => {
    const page = parse(fs.readFileSync(`${root}/source/page.html`, "utf8"));
    const built = parse(
      fs.readFileSync(`.next/server/app${record.legacyPath}.html`, "utf8"),
    );
    const body = parseFragment(post.bodyHtml);
    assert.equal(record.legacyPath, source.fullUrl);
    assert.equal(record.title, source.title);
    const correctedAuthor = erinAuthored.has(directory.name);
    assert.equal(record.displayedByline, correctedAuthor ? "Erin Young, LCSW-S" : source.author.displayName);
    const profilePath = correctedAuthor ? "/therapists/erin-young/" : "/therapists/jennifer-wood/";
    assert.equal(record.authorProfilePath, profilePath);
    assert.equal(record.bylinePrefix, correctedAuthor ? "Written by" : undefined);
    assert.equal(
      source.author.displayName,
      text(all(page, (n) => hasClass(n, "blog-author-name"))[0]),
    );
    const byline = all(built, (n) => hasClass(n, "blog-meta"))[0];
    assert.equal(text(all(byline, (n) => n.tagName === "span")[0]), `${correctedAuthor ? "Written by" : "Written By"} ${record.displayedByline}`);
    const authorLinks = all(byline, (n) => n.tagName === "a");
    assert.equal(authorLinks.length, 1);
    assert.equal(attr(authorLinks[0], "href"), profilePath);
    assert.equal(text(authorLinks[0]), record.displayedByline);
    assert.equal(attr(authorLinks[0], "rel"), undefined);
    assert.equal(all(authorLinks[0], (n) => n.tagName === "time").length, 0);
    assert.equal(record.publishedAt, new Date(source.publishOn).toISOString());
    assert.equal(
      record.publicationDate,
      new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Chicago",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date(source.publishOn)),
    );
    assert.equal(record.excerptHtml, source.excerpt);
    if (directory.name === "take-heart") {
      assert.equal(record.featuredImage, null);
      assert.equal(record.source.omittedFeaturedImage.sourceUrl, source.assetUrl);
    } else {
      assert.equal(record.featuredImage.sourceUrl, source.assetUrl);
      const featured = all(built, (n) => hasClass(n, "blog-featured-image"))[0];
      if (directory.name === "traumatic-memories-and-treatment") {
        assert.equal(featured, undefined, "Suppress only the new-template duplicate");
        const article = all(built, (n) => n.tagName === "article")[0];
        assert.ok(hasClass(article, "blog-article--traumatic-memories"));
        const portraits = all(article, (n) => n.tagName === "img" && attr(n, "src") === record.featuredImage.src);
        assert.equal(portraits.length, 1, "Keep the original body portrait");
      } else {
        assert.equal(attr(featured, "src"), record.featuredImage.src);
        assert.equal(all(built, (n) => hasClass(n, "blog-article--traumatic-memories")).length, 0);
      }
    }
    assert.deepEqual(record.tags, source.tags);
    assert.deepEqual(record.categories, source.categories);
    for (const [file, hash] of Object.entries(record.source.hashes))
      assert.equal(
        sha(
          fs.readFileSync(
            file === "image"
              ? `public${record.featuredImage.src}`
              : `${root}/source/${file}`,
          ),
        ),
        hash,
        file,
      );
    assert.equal(
      fs.readFileSync(`${root}/source/body.html`, "utf8"),
      source.body,
    );
    const meta = (doc, key) =>
      attr(
        all(
          doc,
          (n) =>
            n.tagName === "meta" &&
            (attr(n, "name") === key || attr(n, "property") === key),
        )[0],
        "content",
      );
    assert.equal(
      record.seo.title,
      text(all(page, (n) => n.tagName === "title")[0]),
    );
    assert.equal(record.seo.description, meta(page, "description") ?? "");
    assert.equal(record.seo.sourceOpenGraphImage, meta(page, "og:image"));
    assert.equal(
      record.seo.sourceCanonical,
      attr(
        all(
          page,
          (n) => n.tagName === "link" && attr(n, "rel") === "canonical",
        )[0],
        "href",
      ),
    );
    assert.equal(
      text(all(built, (n) => n.tagName === "title")[0]),
      record.seo.title,
    );
    assert.equal(meta(built, "description") ?? "", record.seo.description);
    assert.equal(meta(built, "robots"), "noindex, nofollow");
    assert.equal(
      all(built, (n) => n.tagName === "link" && attr(n, "rel") === "canonical")
        .length,
      0,
    );
    assert.equal(
      text(all(built, (n) => attr(n, "id") === "article-title")[0]),
      source.title,
    );
    const builtBody = all(
      built,
      (n) => attr(n, "data-original-article-body") !== undefined,
    )[0];
    assert.deepEqual(
      builtBody.childNodes.map(signature),
      body.childNodes.map(signature),
    );
    const sourceBlocks = blocks(source.body);
    if (record.assets)
      assert.equal(
        post.bodyHtml,
        renderLegacyBody(source.body, record.assets, paths),
      );
    // Independently check each literal text/button slice and ordered content events.
    const events = [];
    for (const block of sourceBlocks) {
      if (hasClass(block, "html-block")) {
        const node = all(block, (n) => hasClass(n, "sqs-html-content"))[0];
        const slice = localizeLinks(inner(source.body, node), paths);
        assert.ok(
          post.bodyHtml.includes(slice),
          "Literal text-block HTML must survive",
        );
        events.push(
          ...parseFragment(slice)
            .childNodes.filter((n) => n.nodeName !== "#text" || n.value.trim())
            .map(signature),
        );
      } else if (hasClass(block, "button-block")) {
        const link = all(block, (n) => n.tagName === "a")[0];
        assert.ok(post.bodyHtml.includes(outer(source.body, link)));
        events.push(
          signature(parseFragment(outer(source.body, link)).childNodes[0]),
        );
      } else if (hasClass(block, "image-block")) events.push("image");
      else if (hasClass(block, "video-block")) events.push("video");
    }
    const actual = body.childNodes
      .filter((n) => n.nodeName !== "#text" || n.value.trim())
      .map((n) =>
        n.tagName === "figure"
          ? "image"
          : hasClass(n, "legacy-video")
            ? "video"
            : signature(n),
      );
    assert.deepEqual(
      actual,
      events,
      "Ordered text, headings, lists, images, video, and buttons",
    );
    const original = parseFragment(source.body);
    const headings = (doc) =>
      all(doc, (n) => /^h[1-6]$/.test(n.tagName)).map((n) => [
        n.tagName,
        text(n),
      ]);
    assert.deepEqual(headings(body), headings(original));
    const links = (doc) =>
      all(doc, (n) => n.tagName === "a").map((n) => [
        localHref(attr(n, "href"), paths),
        text(n).trim(),
      ]);
    assert.deepEqual(links(body), links(original));
    for (const n of all(body, (n) => n.tagName === "a"))
      if (attr(n, "href").startsWith("/news/"))
        assert.ok(paths.has(attr(n, "href")));
    for (const asset of record.assets ?? []) {
      assert.equal(sha(fs.readFileSync(`public${asset.src}`)), asset.sha256);
      assert.equal(fs.statSync(`public${asset.src}`).size, asset.bytes);
    }
    const originalImages = all(original, (n) => n.tagName === "img");
    const images = all(body, (n) => n.tagName === "img");
    assert.equal(images.length, originalImages.length);
    images.forEach((image, i) => {
      const mapping = record.assets.find(
        (a) => a.sourceUrl === attr(originalImages[i], "data-src"),
      );
      assert.equal(attr(image, "src"), mapping.src);
      assert.equal(attr(image, "alt"), attr(originalImages[i], "alt") ?? "");
      assert.equal(attr(image, "width"), String(mapping.width));
      assert.equal(attr(image, "height"), String(mapping.height));
    });
    assert.equal(
      all(
        body,
        (n) =>
          ["script", "style"].includes(n.tagName) ||
          n.attrs?.some((a) => /^on/i.test(a.name)),
      ).length,
      0,
    );
    assert.equal(
      all(built, (n) => n.tagName === "img" && /^https?:/.test(attr(n, "src")))
        .length,
      0,
    );
    const neighbors = all(built, (n) => hasClass(n, "blog-neighbors"))[0];
    const index = posts.findIndex((p) => p.id === post.id);
    assert.deepEqual(
      all(neighbors, (n) => n.tagName === "a").map((n) => attr(n, "href")),
      [posts[index + 1], posts[index - 1]]
        .filter(Boolean)
        .map((p) => p.legacyPath),
    );
    if (directory.name === "storm-anxiety") {
      const iframe = all(body, (n) => n.tagName === "iframe")[0];
      assert.equal(
        attr(iframe, "src"),
        "https://player.vimeo.com/video/337499860?app_id=122963&wmode=opaque",
      );
      assert.equal(attr(iframe, "title"), "Storm Anxiety w/ Doc Deason");
      assert.equal(attr(iframe, "allow"), "fullscreen");
    }
  });
}
