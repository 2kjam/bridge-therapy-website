import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { parse, parseFragment } from "parse5";

const routes = JSON.parse(fs.readFileSync("legacy/routes.json", "utf8"));
const pages = new Map();
const attr = (node, name) =>
  node.attrs?.find((entry) => entry.name === name)?.value;
function all(node, predicate) {
  return [
    ...(predicate(node) ? [node] : []),
    ...(node.childNodes ?? []).flatMap((child) => all(child, predicate)),
  ];
}
const elements = (node, tag) => all(node, (entry) => entry.tagName === tag);
const content = (node) =>
  node.nodeName === "#text"
    ? node.value
    : (node.childNodes ?? []).map(content).join("");
const normalizedText = (node) =>
  all(node, (entry) => entry.nodeName === "#text")
    .map((entry) => content(entry).replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join(" ");
function signature(node) {
  if (attr(node, "data-duplicate") !== undefined || node.tagName === "script")
    return [];
  if (!node.tagName) return (node.childNodes ?? []).flatMap(signature);
  const attrs = Object.fromEntries(
    (node.attrs ?? [])
      .filter(
        ({ name }) => !["aria-disabled", "data-nextjs-dialog"].includes(name),
      )
      .map(({ name, value }) => [name, value])
      .sort(([a], [b]) => a.localeCompare(b)),
  );
  return [
    { tag: node.tagName, attrs },
    ...(node.childNodes ?? []).flatMap(signature),
  ];
}

function expectedSignature(node) {
  // The frozen migration reference predates the insurance asset cleanup.
  // Assert the exact new sources/sizing without ignoring other image attributes.
  const replacements = {
    "allied.png": "allied-transparent.png",
    "blue-cross.jpg": "blue-cross-transparent.png",
    "christus.png": "christus-transparent.png",
    "cigna.jpg": "cigna-transparent.png",
    "healthfirst.jpg": "healthfirst-transparent.png",
    "meritain.jpg": "meritain-transparent.png",
    "umr.png": "umr-transparent.png",
    "magellan.png": "magellan-transparent.png",
  };
  return signature(node).map((entry) => {
    const prefix = "/assets/insurance/";
    if (entry.tag !== "img" || !entry.attrs.src?.startsWith(prefix))
      return entry;
    const file = entry.attrs.src.slice(prefix.length);
    if (replacements[file]) entry.attrs.src = prefix + replacements[file];
    if (file === "humana.png" || file === "webtpa.png")
      entry.attrs.style = "width:92%";
    return entry;
  });
}

for (const route of routes.filter((route) => route !== "/children-families/")) {
  const filename = route === "/" ? "index.html" : `${route.slice(1, -1)}.html`;
  const builtFile = path.join(".next/server/app", filename);
  assert.ok(
    fs.existsSync(builtFile),
    "Run npm run build before npm run check.",
  );
  const html = fs.readFileSync(builtFile, "utf8");
  const built = parse(html);
  const legacy = parse(
    fs.readFileSync(`legacy/public${route}index.html`, "utf8"),
  );
  if (route === "/") {
    // The frozen reference predates the homepage's local supporting sentence.
    const heroCopy = all(legacy, (node) => attr(node, "class") === "ivory-hero-copy")[0];
    // Expect the intentional homepage heading hierarchy, without relaxing other pages.
    const eyebrow = heroCopy.childNodes.findIndex(
      (node) => attr(node, "class") === "eyebrow",
    );
    heroCopy.childNodes.splice(eyebrow, 1);
    const heading = heroCopy.childNodes.findIndex((node) => node.tagName === "h1");
    const headings = parseFragment(
      '<h1 id="hero-title">Counseling &amp; Therapy in Tyler, Texas</h1><p class="hero-brand">Real Help for Real Life</p>',
    ).childNodes;
    for (const node of headings) node.parentNode = heroCopy;
    heroCopy.childNodes.splice(heading, 1, ...headings);
    const actions = heroCopy.childNodes.findIndex(
      (node) => attr(node, "class") === "ivory-actions",
    );
    const paragraph = parseFragment(
      "<p>Christian counseling for individuals, couples, children, and families in Tyler, Texas.</p>",
    ).childNodes[0];
    paragraph.parentNode = heroCopy;
    heroCopy.childNodes.splice(actions, 0, paragraph);
  }
  pages.set(route, built);
  const ids = all(built, (node) => attr(node, "id") !== undefined).map((node) =>
    attr(node, "id"),
  );
  assert.equal(new Set(ids).size, ids.length, `${route}: duplicate IDs`);
  assert.equal(elements(built, "h1").length, 1, `${route}: main heading`);
  for (const tag of ["title", "header", "main", "footer"]) {
    const current = elements(built, tag)[0];
    const original = elements(legacy, tag)[0];
    assert.deepEqual(
      signature(current),
      expectedSignature(original),
      `${route}: ${tag} elements or attributes changed`,
    );
    assert.equal(
      normalizedText(current),
      route === "/" && tag === "title"
        ? "Counseling & Therapy in Tyler, TX | The Bridge"
        : normalizedText(original),
      `${route}: ${tag} wording changed`,
    );
  }
  for (const name of ["description", "robots"]) {
    const get = (doc) =>
      attr(
        elements(doc, "meta").find((node) => attr(node, "name") === name),
        "content",
      );
    assert.equal(
      get(built)?.replace(/,\s*/g, ","),
      get(legacy)?.replace(/,\s*/g, ","),
      `${route}: ${name} metadata changed`,
    );
  }
  const styles = (doc) =>
    elements(doc, "link")
      .filter((node) => attr(node, "rel") === "stylesheet")
      .map((node) => attr(node, "href"));
  assert.deepEqual(
    styles(built),
    styles(legacy),
    `${route}: stylesheet cascade changed`,
  );
  assert.ok(
    !elements(built, "script").some((node) =>
      ["/app.js", "/homepage-motion.js"].includes(attr(node, "src")),
    ),
    `${route}: legacy script loaded`,
  );
}
for (const [route, doc] of pages) {
  for (const node of all(
    doc,
    (entry) =>
      attr(entry, "href") !== undefined || attr(entry, "src") !== undefined,
  )) {
    const value = attr(node, "href") ?? attr(node, "src");
    if (/^(?:[a-z]+:|\/\/)/i.test(value)) continue;
    const url = new URL(value, `http://localhost${route}`);
    if (url.pathname.startsWith("/_next/")) continue;
    const target = pages.get(url.pathname);
    assert.ok(
      target ||
        routes.includes(url.pathname) ||
        fs.existsSync(path.join("public", url.pathname)),
      `${route}: missing ${value}`,
    );
    if (target && url.hash) {
      assert.ok(
        all(
          target,
          (entry) =>
            attr(entry, "id") === decodeURIComponent(url.hash.slice(1)),
        ).length,
        `${route}: missing anchor ${value}`,
      );
    }
  }
}
console.log(
  `Checked ${pages.size} Next.js pages: legacy content/structure, metadata, stylesheet order, links, assets, anchors, unique IDs, and absence of legacy scripts pass.`,
);
