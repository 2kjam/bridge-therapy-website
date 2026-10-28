import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { parse } from "parse5";
import { getBlogPosts, getPublishedBlogPosts } from "../lib/blog.ts";
import { serializeJsonLd } from "../lib/seo/json-ld.mjs";
import { services, therapists } from "../lib/seo/schema-data.ts";
import { canonicalUrl } from "../lib/seo/policy.ts";

const origin = "https://www.thebridgetherapy.com";
const ORGANIZATION_ID = `${origin}/#organization`;
const WEBSITE_ID = `${origin}/#website`;
const publicPages = JSON.parse(
  fs.readFileSync("content/seo/public-pages.json", "utf8"),
);
const posts = getBlogPosts();
const all = (node, predicate) => [
  ...(predicate(node) ? [node] : []),
  ...(node.childNodes ?? []).flatMap((child) => all(child, predicate)),
];
const attr = (node, name) => node.attrs?.find((a) => a.name === name)?.value;
const text = (node) =>
  node.nodeName === "#text"
    ? node.value
    : (node.childNodes ?? []).map(text).join("");
const graph = (data) => data["@graph"];
const nodeOfType = (data, type) =>
  graph(data).find((node) =>
    Array.isArray(node["@type"])
      ? node["@type"].includes(type)
      : node["@type"] === type,
  );
const builtFile = (path) =>
  path === "/"
    ? ".next/server/app/index.html"
    : `.next/server/app${path.slice(0, -1)}.html`;
const builtJsonLd = (path) => {
  const document = parse(fs.readFileSync(builtFile(path), "utf8"));
  const scripts = all(
    document,
    (node) =>
      node.tagName === "script" && attr(node, "type") === "application/ld+json",
  );
  assert.equal(scripts.length, 1, path);
  return { raw: text(scripts[0]), data: JSON.parse(text(scripts[0])) };
};
const references = (value, found = []) => {
  if (Array.isArray(value)) value.forEach((item) => references(item, found));
  else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (
        (key === "@id" || key === "url" || key === "item") &&
        typeof item === "string"
      )
        found.push(item);
      references(item, found);
    }
  }
  return found;
};

test("homepage has one consistent Organization/LocalBusiness identity", () => {
  const { data } = builtJsonLd("/");
  assert.equal(data["@context"], "https://schema.org");
  assert.equal(
    graph(data).filter((node) => node["@id"] === ORGANIZATION_ID).length,
    1,
  );
  const business = graph(data).find((node) => node["@id"] === ORGANIZATION_ID);
  assert.deepEqual(business["@type"], ["Organization", "LocalBusiness"]);
  assert.equal(business.name, "The Bridge Therapeutic Services");
  assert.equal(business.url, `${origin}/`);
  assert.equal(business.telephone, "+1-903-283-8729");
  assert.equal(business.email, "info@thebridgetherapy.com");
  assert.deepEqual(business.address, {
    "@type": "PostalAddress",
    streetAddress: "3800 Paluxy Drive, Suite 240, Building 2",
    addressLocality: "Tyler",
    addressRegion: "TX",
    postalCode: "75703",
    addressCountry: "US",
  });
  assert.deepEqual(business.openingHoursSpecification.dayOfWeek, [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ]);
  assert.equal(business.openingHoursSpecification.opens, "08:00");
  assert.equal(business.openingHoursSpecification.closes, "19:00");
  assert.equal(business.logo.url, `${origin}/assets/logo.png`);
  assert.ok(fs.existsSync("public/assets/logo.png"));
  const website = graph(data).find((node) => node["@id"] === WEBSITE_ID);
  assert.equal(website.publisher["@id"], ORGANIZATION_ID);
  assert.equal(
    website.potentialAction,
    undefined,
    "No unsupported site search",
  );
  assert.equal(nodeOfType(data, "WebPage").mainEntity["@id"], ORGANIZATION_ID);
});

test("About and Contact pages reference the same practice without duplicate definitions", () => {
  for (const [path, type] of [
    ["/about/", "AboutPage"],
    ["/contact/", "ContactPage"],
  ]) {
    const { data } = builtJsonLd(path);
    const page = nodeOfType(data, type);
    assert.equal(page.url, canonicalUrl(path));
    assert.equal(page.mainEntity["@id"], ORGANIZATION_ID);
    assert.equal(
      graph(data).filter((node) => node["@id"] === ORGANIZATION_ID).length,
      0,
    );
  }
});

test("all 10 therapist profiles publish accurate Person identities", () => {
  assert.equal(therapists.length, 10);
  for (const expected of therapists) {
    const { data } = builtJsonLd(expected.path);
    const person = nodeOfType(data, "Person");
    assert.equal(person["@id"], `${canonicalUrl(expected.path)}#person`);
    assert.equal(person.name, expected.name);
    assert.equal(person.url, canonicalUrl(expected.path));
    assert.equal(person.image, origin + expected.image);
    assert.equal(person.jobTitle, expected.credential);
    assert.equal(person.hasCredential.name, expected.credential);
    assert.equal(person.worksFor["@id"], ORGANIZATION_ID);
    assert.equal(person.identifier, undefined);
  }
  const erin = nodeOfType(
    builtJsonLd("/therapists/erin-young/").data,
    "Person",
  );
  assert.deepEqual(
    erin.alumniOf.map((college) => college.name),
    ["University of North Texas", "Temple University"],
  );
  assert.equal(JSON.stringify(erin).includes("certif"), false);
});

test("Kalynne is administrative staff and absent from the therapist collection", () => {
  const { data } = builtJsonLd("/staff/kalynne-arrick/");
  const person = nodeOfType(data, "Person");
  assert.equal(person.name, "Kalynne Arrick");
  assert.equal(person.jobTitle, "Office Manager");
  assert.equal(person.worksFor["@id"], ORGANIZATION_ID);
  assert.doesNotMatch(
    JSON.stringify(person),
    /therapist|counselor|clinical|medical/i,
  );
  const directory = nodeOfType(
    builtJsonLd("/therapists/").data,
    "CollectionPage",
  );
  assert.equal(directory.mainEntity.numberOfItems, 10);
  assert.equal(JSON.stringify(directory).includes("kalynne"), false);
});

test("18 Tyler counseling services plus statewide telehealth mirror approved mappings", () => {
  assert.equal(services.length, 19);
  assert.equal(
    services.filter((service) => !service.statewideTelehealth).length,
    18,
  );
  for (const expected of services) {
    const { data } = builtJsonLd(expected.path);
    const service = nodeOfType(data, "Service");
    assert.equal(service.url, canonicalUrl(expected.path));
    assert.equal(service.name, expected.name);
    assert.equal(service.description, expected.description);
    assert.equal(service.provider[0]["@id"], ORGANIZATION_ID);
    assert.deepEqual(
      service.provider.slice(1).map((provider) => provider["@id"]),
      expected.therapists.map((path) => `${canonicalUrl(path)}#person`),
    );
    assert.equal(
      service.areaServed.name,
      expected.statewideTelehealth ? "Texas" : "Tyler, Texas",
    );
  }
  const nes = nodeOfType(
    builtJsonLd("/non-epileptic-seizures-counseling-tyler/").data,
    "Service",
  );
  assert.deepEqual(nes.provider.slice(1), [
    { "@id": `${canonicalUrl("/therapists/erin-young/")}#person` },
  ]);
  assert.match(nes.name, /Counseling Support/);
  assert.doesNotMatch(
    JSON.stringify(nes),
    /diagnos|neurological testing|medical treatment|emergency|guarantee/i,
  );
});

test("all 19 BlogPosting nodes preserve dates, images, publisher, and verified authors", () => {
  assert.equal(posts.length, 19);
  const erinTitles = new Set([
    "Traumatic Memories and Treatment",
    "Storm Anxiety",
    "Simple Ways to Lower Stress During the Holidays",
    "The Bridge Community Spotlight featuring Beth Reed with Sight.org",
  ]);
  let erinCount = 0;
  for (const post of posts) {
    const { data } = builtJsonLd(`${post.legacyPath}/`);
    const article = nodeOfType(data, "BlogPosting");
    assert.equal(article.headline, post.title);
    assert.equal(article.datePublished, post.publicationDate);
    assert.equal(article.dateModified, undefined);
    assert.equal(article.url, canonicalUrl(post.legacyPath));
    assert.equal(article.publisher["@id"], ORGANIZATION_ID);
    assert.equal(
      article.author["@id"],
      `${canonicalUrl(post.authorProfilePath)}#person`,
    );
    assert.equal(
      article.image,
      post.featuredImage ? origin + post.featuredImage.src : undefined,
    );
    if (article.author["@id"].endsWith("/therapists/erin-young/#person")) {
      erinCount += 1;
      assert.ok(erinTitles.has(post.title), post.title);
    }
  }
  assert.equal(erinCount, 4);
});

test("breadcrumbs use only real parent destinations and truthful hierarchy", () => {
  const realParents = new Set(publicPages.map(canonicalUrl));
  for (const path of publicPages) {
    if (path === "/") continue;
    const { data } = builtJsonLd(path);
    const list = nodeOfType(data, "BreadcrumbList").itemListElement;
    assert.ok(list.length >= 2, path);
    assert.equal(list.at(-1).item, undefined, path);
    for (const item of list.slice(0, -1))
      assert.ok(realParents.has(item.item), item.item);
    if (services.some((service) => service.path === path)) {
      assert.deepEqual(
        list.map((item) => item.name),
        ["Home", services.find((service) => service.path === path).name],
      );
    }
  }
  for (const post of posts) {
    const list = nodeOfType(
      builtJsonLd(`${post.legacyPath}/`).data,
      "BreadcrumbList",
    ).itemListElement;
    assert.deepEqual(
      list.slice(0, 2).map((item) => item.item),
      [`${origin}/`, `${origin}/blog/`],
    );
    assert.equal(list.at(-1).item, undefined);
  }
});

test("every JSON-LD script is valid, canonical, safe, and free of forbidden markup", () => {
  const routes = [
    ...publicPages,
    ...getPublishedBlogPosts().map(
      (post) => post.legacyPath.replace(/\/$/, "") + "/",
    ),
  ];
  assert.equal(routes.length, 55);
  for (const path of routes) {
    const { raw, data } = builtJsonLd(path);
    assert.equal(raw.includes("<"), false, path);
    assert.doesNotMatch(
      raw,
      /localhost|netlify\.app|AggregateRating|Review|FAQPage|priceRange|"price"|"offers"/i,
      path,
    );
    for (const url of references(data)) {
      if (!url.startsWith(origin)) continue;
      const parsed = new URL(url);
      assert.equal(parsed.origin, origin);
      assert.equal(parsed.search, "");
      if (!parsed.pathname.startsWith("/assets/"))
        assert.ok(parsed.pathname.endsWith("/"), url);
    }
    const html = parse(fs.readFileSync(builtFile(path), "utf8"));
    assert.equal(
      all(
        html,
        (node) => node.tagName === "meta" && attr(node, "name") === "robots",
      ).map((node) => attr(node, "content"))[0],
      "noindex, nofollow",
      path,
    );
  }
  const dangerous = {
    "@context": "https://schema.org",
    name: "</script><script>alert(1)</script>\u2028",
  };
  const serialized = serializeJsonLd(dangerous);
  assert.equal(serialized.includes("<"), false);
  assert.equal(serialized.includes("\\u003c/script>"), true);
  assert.deepEqual(JSON.parse(serialized), dangerous);
  assert.deepEqual(
    nodeOfType(builtJsonLd("/").data, "LocalBusiness")["@type"],
    ["Organization", "LocalBusiness"],
  );
});

test("announcement has approved date, shared organization author/publisher, image and breadcrumbs", () => {
  const path = "/blog/welcome-to-our-new-website/";
  const { data } = builtJsonLd(path);
  const post = nodeOfType(data, "BlogPosting");
  assert.equal(post.headline, "Welcome to Our New Website!");
  assert.equal(post.datePublished, "2026-10-28");
  assert.equal(post.dateModified, undefined);
  assert.deepEqual(post.author, { "@id": ORGANIZATION_ID });
  assert.deepEqual(post.publisher, { "@id": ORGANIZATION_ID });
  assert.equal(post.url, origin + path);
  assert.deepEqual(post.mainEntityOfPage, {
    "@id": origin + path + "#webpage",
  });
  assert.equal(
    post.image,
    origin + "/assets/presentation/blog/website-homepage-1440.webp",
  );
  assert.equal(
    post.description,
    "Explore the newly redesigned website for The Bridge Therapeutic Services in Tyler, TX. Learn about our therapists, counseling services, and more.",
  );
  assert.equal(
    graph(data).filter((node) =>
      ["Person", "Organization"].includes(node["@type"]),
    ).length,
    0,
  );
  assert.deepEqual(
    nodeOfType(data, "BreadcrumbList").itemListElement.map((item) => item.name),
    ["Home", "Blog", "Welcome to Our New Website!"],
  );
});
