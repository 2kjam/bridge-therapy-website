import assert from "node:assert/strict";
import { parseFragment } from "parse5";
export const attr = (node, name) =>
  node?.attrs?.find((a) => a.name === name)?.value;
export const all = (node, predicate) => [
  ...(predicate(node) ? [node] : []),
  ...(node.childNodes ?? []).flatMap((child) => all(child, predicate)),
];
export const text = (node) =>
  node.nodeName === "#text"
    ? node.value
    : (node.childNodes ?? []).map(text).join("");
export const hasClass = (node, value) =>
  attr(node, "class")?.split(/\s+/).includes(value);
export const escape = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
export const blocks = (html) =>
  all(parseFragment(html, { sourceCodeLocationInfo: true }), (n) =>
    hasClass(n, "sqs-block"),
  );
export const inner = (html, node) =>
  html.slice(
    node.sourceCodeLocation.startTag.endOffset,
    node.sourceCodeLocation.endTag.startOffset,
  );
export const outer = (html, node) =>
  html.slice(
    node.sourceCodeLocation.startOffset,
    node.sourceCodeLocation.endOffset,
  );
export function localHref(href, paths) {
  const url = new URL(href, "https://www.thebridgetherapy.com");
  return ["www.thebridgetherapy.com", "thebridgetherapy.com"].includes(
    url.hostname,
  ) && paths.has(url.pathname.replace(/\/$/, ""))
    ? url.pathname.replace(/\/$/, "") + url.search + url.hash
    : href;
}
export function localizeLinks(html, paths) {
  const edits = all(
    parseFragment(html, { sourceCodeLocationInfo: true }),
    (n) => n.tagName === "a",
  ).flatMap((n) => {
    const href = attr(n, "href");
    const next = localHref(href, paths);
    return href === next
      ? []
      : [
          {
            ...n.sourceCodeLocation.attrs.href,
            value: `href="${escape(next)}"`,
          },
        ];
  });
  for (const edit of edits.sort((a, b) => b.startOffset - a.startOffset))
    html =
      html.slice(0, edit.startOffset) + edit.value + html.slice(edit.endOffset);
  return html;
}
// Only these reviewed Squarespace block types are accepted. Text block HTML is sliced,
// never serialized. Media wrappers replace platform scripts/lazy loading/cropping.
export function renderLegacyBody(html, assets, paths) {
  return blocks(html)
    .map((block) => {
      if (hasClass(block, "html-block")) {
        const nodes = all(block, (n) => hasClass(n, "sqs-html-content"));
        assert.equal(nodes.length, 1);
        return localizeLinks(inner(html, nodes[0]), paths);
      }
      if (hasClass(block, "image-block")) {
        const images = all(block, (n) => n.tagName === "img");
        assert.equal(images.length, 1);
        const original = images[0];
        const asset = assets.find(
          (a) => a.sourceUrl === attr(original, "data-src"),
        );
        assert.ok(asset);
        const image = `<img src="${escape(asset.src)}" width="${asset.width}" height="${asset.height}" alt="${escape(asset.alt)}" loading="lazy" decoding="async">`;
        const links = all(block, (n) => n.tagName === "a");
        assert.ok(links.length <= 1);
        const linked = links.length
          ? outer(html, links[0]).replace(outer(html, original), image)
          : image;
        const captions = all(block, (n) => n.tagName === "figcaption");
        assert.ok(
          captions.every((n) => !text(n).trim()),
          "Review nonempty caption",
        );
        return `<figure>${linked}</figure>`;
      }
      if (hasClass(block, "video-block")) {
        const wrapper = all(
          block,
          (n) => attr(n, "data-html") !== undefined,
        )[0];
        const iframe = all(
          parseFragment(attr(wrapper, "data-html")),
          (n) => n.tagName === "iframe",
        )[0];
        assert.equal(
          attr(iframe, "src"),
          "https://player.vimeo.com/video/337499860?app_id=122963&wmode=opaque",
        );
        assert.equal(attr(iframe, "title"), "Storm Anxiety w/ Doc Deason");
        return `<div class="legacy-video"><iframe src="${escape(attr(iframe, "src"))}" title="${escape(attr(iframe, "title"))}" width="426" height="240" allow="fullscreen" allowfullscreen loading="lazy"></iframe></div>`;
      }
      if (hasClass(block, "button-block")) {
        const links = all(block, (n) => n.tagName === "a");
        assert.equal(links.length, 1);
        return outer(html, links[0]);
      }
      if (hasClass(block, "spacer-block")) {
        assert.equal(text(block).trim(), "");
        return "";
      }
      throw new Error(`Unreviewed block: ${attr(block, "class")}`);
    })
    .join("\n");
}
