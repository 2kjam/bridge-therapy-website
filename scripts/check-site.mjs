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
  for (const link of all(legacy, (node) => node.tagName === "a" &&
    ["https://www.thebridgetherapy.com/meet-the-team#:~:text=Jennifer%20Wood", "https://www.thebridgetherapy.com/meet-the-team#:~:text=Erin%20Young", "https://www.thebridgetherapy.com/meet-the-team#:~:text=Alyxandrah%20White", "https://www.thebridgetherapy.com/meet-the-team#:~:text=Kelley%20Bell"].includes(attr(node, "href")))) {
    const destination = attr(link, "href").includes("Kelley%20Bell") ? "/therapists/kelley-bell/" : attr(link, "href").includes("Alyxandrah%20White") ? "/therapists/alyxandrah-white/" : attr(link, "href").includes("Erin%20Young") ? "/therapists/erin-young/" : "/therapists/jennifer-wood/";
    link.attrs = link.attrs.filter(({ name }) => !["target", "rel"].includes(name));
    link.attrs.find(({ name }) => name === "href").value = destination;
    for (const text of all(link, (node) => node.nodeName === "#text")) {
      text.value = text.value.replaceAll("↗", "→");
    }
  }
  const teamPanel = all(legacy, (node) => attr(node, "id") === "team-panel")[0];
  for (const link of all(legacy, (node) => node.tagName === "a" &&
    attr(node, "href") === "https://www.thebridgetherapy.com/meet-the-team#:~:text=Jill%20Kirkley")) {
    link.attrs = link.attrs.filter(({ name }) => !["target", "rel"].includes(name));
    link.attrs.find(({ name }) => name === "href").value = "/therapists/jill-kirkley/";
    for (const text of all(link, (node) => node.nodeName === "#text")) {
      text.value = text.value.replaceAll("↗", "→");
    }
  }
  for (const link of all(legacy, (node) => node.tagName === "a" &&
    attr(node, "href") === "https://www.thebridgetherapy.com/meet-the-team#:~:text=Denise%20Santos")) {
    link.attrs = link.attrs.filter(({ name }) => !["target", "rel"].includes(name));
    link.attrs.find(({ name }) => name === "href").value = "/therapists/denise-santos/";
    for (const text of all(link, (node) => node.nodeName === "#text")) {
      text.value = text.value.replaceAll("↗", "→");
    }
  }
  const directoryLink = all(teamPanel, (node) =>
    node.tagName === "a" && attr(node, "href") === "https://www.thebridgetherapy.com/meet-the-team",
  )[0];
  directoryLink.attrs = directoryLink.attrs.filter(({ name }) => !["target", "rel"].includes(name));
  directoryLink.attrs.find(({ name }) => name === "href").value = "/therapists/";
  directoryLink.childNodes = parseFragment("View All Therapists →").childNodes;
  if (route === "/") {
    // The frozen reference predates the homepage's heading hierarchy.
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
const directory = parse(fs.readFileSync(".next/server/app/therapists.html", "utf8"));
pages.set("/therapists/", directory);
const directoryMain = elements(directory, "main")[0];
const cards = all(directoryMain, (node) => attr(node, "class") === "directory-card");
assert.equal(cards.length, 10, "Directory must contain ten therapists");
assert.equal(elements(directory, "h1").length, 1);
assert.equal(normalizedText(elements(directory, "h1")[0]), "Meet Our Therapists");
assert.equal(normalizedText(elements(directory, "title")[0]), "Therapists in Tyler, TX | The Bridge");
assert.equal(attr(elements(directory, "meta").find((node) => attr(node, "name") === "robots"), "content"), "noindex, nofollow");
assert.ok(!normalizedText(directoryMain).includes("Kalynne"));
assert.deepEqual(cards.map((card) => normalizedText(elements(card, "h2")[0])), [
  "Jennifer Wood", "Erin Young", "Jill Kirkley", "Alyxandrah “Alyx” White", "Misty Shultz",
  "Kim Gonzales", "Kelley Bell", "Denise Santos", "Sarah Bell", "Sarah Critzman",
]);
for (const card of cards) {
  assert.equal(elements(card, "img").length, 1);
  const links = elements(card, "a");
  if (normalizedText(elements(card, "h2")[0]) === "Jennifer Wood") {
    assert.equal(links.length, 1);
    assert.equal(attr(links[0], "href"), "/therapists/jennifer-wood/");
  } else if (normalizedText(elements(card, "h2")[0]) === "Erin Young") {
    assert.equal(links.length, 1);
    assert.equal(attr(links[0], "href"), "/therapists/erin-young/");
  } else if (normalizedText(elements(card, "h2")[0]) === "Alyxandrah “Alyx” White") {
    assert.equal(links.length, 1);
    assert.equal(attr(links[0], "href"), "/therapists/alyxandrah-white/");
  } else if (normalizedText(elements(card, "h2")[0]) === "Kelley Bell") {
    assert.equal(links.length, 1);
    assert.equal(attr(links[0], "href"), "/therapists/kelley-bell/");
  } else if (normalizedText(elements(card, "h2")[0]) === "Denise Santos") {
    assert.equal(links.length, 1);
    assert.equal(attr(links[0], "href"), "/therapists/denise-santos/");
  } else if (normalizedText(elements(card, "h2")[0]) === "Jill Kirkley") {
    assert.equal(links.length, 1);
    assert.equal(attr(links[0], "href"), "/therapists/jill-kirkley/");
  } else {
    assert.equal(links.length, 0, "No premature profile links");
  }
}
const profile = parse(fs.readFileSync(".next/server/app/therapists/jennifer-wood.html", "utf8"));
pages.set("/therapists/jennifer-wood/", profile);
assert.equal(elements(profile, "h1").length, 1);
assert.equal(normalizedText(elements(profile, "h1")[0]), "Jennifer Wood, LPC-S");
assert.equal(normalizedText(elements(profile, "title")[0]), "Jennifer Wood, LPC-S | Tyler, TX | The Bridge");
assert.equal(attr(elements(profile, "meta").find((node) => attr(node, "name") === "robots"), "content"), "noindex, nofollow");
const profileMain = elements(profile, "main")[0];
assert.equal(attr(elements(profileMain, "img")[0], "src"), "/assets/jennifer.jpg");
const serviceList = all(profileMain, (node) => attr(node, "class") === "profile-services")[0];
assert.deepEqual(elements(serviceList, "a").map((node) => attr(node, "href")), [
  "/individual-counseling-tyler/", "/depression-counseling-tyler/", "/family-counseling-tyler/",
  "/grief-counseling-tyler/", "/christian-counseling-tyler/", "/divorce-blended-family-counseling-tyler/",
]);
assert.ok(!elements(profile, "link").some((node) => attr(node, "rel") === "canonical"));
assert.ok(!elements(profile, "script").some((node) => attr(node, "type") === "application/ld+json"));
const erinProfile = parse(fs.readFileSync(".next/server/app/therapists/erin-young.html", "utf8"));
pages.set("/therapists/erin-young/", erinProfile);
assert.equal(elements(erinProfile, "h1").length, 1);
assert.equal(normalizedText(elements(erinProfile, "h1")[0]), "Erin Young, LCSW-S");
assert.equal(normalizedText(elements(erinProfile, "title")[0]), "Erin Young, LCSW-S | Tyler, TX | The Bridge");
assert.equal(attr(elements(erinProfile, "meta").find((node) => attr(node, "name") === "robots"), "content"), "noindex, nofollow");
const erinMain = elements(erinProfile, "main")[0];
assert.equal(attr(elements(erinMain, "img")[0], "src"), "/assets/erin.jpg");
const erinServices = all(erinMain, (node) => attr(node, "class") === "profile-services")[0];
assert.deepEqual(elements(erinServices, "a").map((node) => attr(node, "href")), [
  "/anxiety-counseling-tyler/", "/grief-counseling-tyler/", "/trauma-therapy-tyler/",
  "/emdr-therapy-tyler/", "/adhd-counseling-tyler/", "/adoption-counseling-tyler/",
]);
assert.ok(!elements(erinProfile, "link").some((node) => attr(node, "rel") === "canonical"));
assert.ok(!elements(erinProfile, "script").some((node) => attr(node, "type") === "application/ld+json"));
const alyxProfile = parse(fs.readFileSync(".next/server/app/therapists/alyxandrah-white.html", "utf8"));
pages.set("/therapists/alyxandrah-white/", alyxProfile);
assert.equal(elements(alyxProfile, "h1").length, 1);
assert.equal(normalizedText(elements(alyxProfile, "h1")[0]), "Alyxandrah “Alyx” White, LMFT");
assert.equal(normalizedText(elements(alyxProfile, "title")[0]), "Alyxandrah White, LMFT | Tyler, TX | The Bridge");
assert.equal(attr(elements(alyxProfile, "meta").find((node) => attr(node, "name") === "robots"), "content"), "noindex, nofollow");
const alyxMain = elements(alyxProfile, "main")[0];
assert.equal(attr(elements(alyxMain, "img")[0], "src"), "/assets/alyx.jpg");
const alyxServices = all(alyxMain, (node) => attr(node, "class") === "profile-services")[0];
assert.deepEqual(elements(alyxServices, "a").map((node) => attr(node, "href")), [
  "/marriage-counseling-tyler/", "/family-counseling-tyler/", "/parenting-support-tyler/",
  "/premarital-counseling-tyler/", "/divorce-blended-family-counseling-tyler/",
]);
assert.ok(!elements(alyxProfile, "link").some((node) => attr(node, "rel") === "canonical"));
assert.ok(!elements(alyxProfile, "script").some((node) => attr(node, "type") === "application/ld+json"));
const kelleyProfile = parse(fs.readFileSync(".next/server/app/therapists/kelley-bell.html", "utf8"));
pages.set("/therapists/kelley-bell/", kelleyProfile);
assert.equal(elements(kelleyProfile, "h1").length, 1);
assert.equal(normalizedText(elements(kelleyProfile, "h1")[0]), "Kelley Bell, LPC");
assert.equal(normalizedText(elements(kelleyProfile, "title")[0]), "Kelley Bell, LPC | Tyler, TX | The Bridge");
assert.equal(attr(elements(kelleyProfile, "meta").find((node) => attr(node, "name") === "robots"), "content"), "noindex, nofollow");
const kelleyMain = elements(kelleyProfile, "main")[0];
assert.equal(attr(elements(kelleyMain, "img")[0], "src"), "/assets/kelley.jpg");
const kelleyServices = all(kelleyMain, (node) => attr(node, "class") === "profile-services")[0];
assert.deepEqual(elements(kelleyServices, "a").map((node) => attr(node, "href")), [
  "/marriage-counseling-tyler/", "/child-teen-counseling-tyler/", "/parenting-support-tyler/", "/premarital-counseling-tyler/",
]);
assert.ok(!elements(kelleyProfile, "link").some((node) => attr(node, "rel") === "canonical"));
assert.ok(!elements(kelleyProfile, "script").some((node) => attr(node, "type") === "application/ld+json"));
const deniseProfile = parse(fs.readFileSync(".next/server/app/therapists/denise-santos.html", "utf8"));
pages.set("/therapists/denise-santos/", deniseProfile);
assert.equal(elements(deniseProfile, "h1").length, 1);
assert.equal(normalizedText(elements(deniseProfile, "h1")[0]), "Denise Santos, LPC");
assert.equal(normalizedText(elements(deniseProfile, "title")[0]), "Denise Santos, LPC | Tyler, TX | The Bridge");
assert.equal(attr(elements(deniseProfile, "meta").find((node) => attr(node, "name") === "robots"), "content"), "noindex, nofollow");
const deniseMain = elements(deniseProfile, "main")[0];
assert.equal(attr(elements(deniseMain, "img")[0], "src"), "/assets/denise.jpg");
const deniseServices = all(deniseMain, (node) => attr(node, "class") === "profile-services")[0];
assert.deepEqual(elements(deniseServices, "a").map((node) => attr(node, "href")), [
  "/individual-counseling-tyler/", "/depression-counseling-tyler/", "/child-teen-counseling-tyler/", "/life-transitions-counseling-tyler/",
]);
assert.ok(!elements(deniseProfile, "link").some((node) => attr(node, "rel") === "canonical"));
assert.ok(!elements(deniseProfile, "script").some((node) => attr(node, "type") === "application/ld+json"));
const jillProfile = parse(fs.readFileSync(".next/server/app/therapists/jill-kirkley.html", "utf8"));
pages.set("/therapists/jill-kirkley/", jillProfile);
assert.equal(elements(jillProfile, "h1").length, 1);
assert.equal(normalizedText(elements(jillProfile, "h1")[0]), "Jill Kirkley, LPC");
assert.equal(normalizedText(elements(jillProfile, "title")[0]), "Jill Kirkley, LPC | Tyler, TX | The Bridge");
assert.equal(attr(elements(jillProfile, "meta").find((node) => attr(node, "name") === "robots"), "content"), "noindex, nofollow");
const jillMain = elements(jillProfile, "main")[0];
assert.equal(attr(elements(jillMain, "img")[0], "src"), "/assets/jill.jpg");
const jillServices = all(jillMain, (node) => attr(node, "class") === "profile-services")[0];
assert.deepEqual(elements(jillServices, "a").map((node) => attr(node, "href")), [
  "/anxiety-counseling-tyler/", "/life-transitions-counseling-tyler/", "/christian-counseling-tyler/",
]);
assert.ok(!elements(jillProfile, "link").some((node) => attr(node, "rel") === "canonical"));
assert.ok(!elements(jillProfile, "script").some((node) => attr(node, "type") === "application/ld+json"));
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
