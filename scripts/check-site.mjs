import { expectBatchTwo } from "./expect-batch2.mjs";
import { expectPerformance } from "./expect-performance.mjs";
import fs from "node:fs";
import { expectBatchOne } from "./expect-homepage-batch1.mjs";
import path from "node:path";
import assert from "node:assert/strict";
import { parse, parseFragment } from "parse5";

const routes = JSON.parse(fs.readFileSync("legacy/routes.json", "utf8"));
const pages = new Map();
const serviceImages = JSON.parse(fs.readFileSync("content/service-images.json", "utf8")).images;
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
  // Jennifer's updated offerings remove Military from the active navigation and homepage.
  for (const removed of all(legacy, (node) => attr(node, "data-service") === "Military & Deployment Support")) {
    removed.parentNode.childNodes = removed.parentNode.childNodes.filter((node) => node !== removed);
  }
  const teamPanel = all(legacy, (node) => attr(node, "id") === "team-panel")[0];
  for (const link of all(legacy, (node) => node.tagName === "a" &&
    attr(node, "href") === "https://www.thebridgetherapy.com/meet-the-team#:~:text=Misty%20Shultz")) {
    link.attrs = link.attrs.filter(({ name }) => !["target", "rel"].includes(name));
    link.attrs.find(({ name }) => name === "href").value = "/therapists/misty-shultz/";
    for (const text of all(link, (node) => node.nodeName === "#text")) {
      text.value = text.value.replaceAll("↗", "→");
    }
  }
  for (const link of all(legacy, (node) => node.tagName === "a" &&
    attr(node, "href") === "https://www.thebridgetherapy.com/meet-the-team#:~:text=Kim%20Gonzales")) {
    link.attrs = link.attrs.filter(({ name }) => !["target", "rel"].includes(name));
    link.attrs.find(({ name }) => name === "href").value = "/therapists/kim-gonzales/";
    for (const text of all(link, (node) => node.nodeName === "#text")) {
      text.value = text.value.replaceAll("↗", "→");
    }
  }
  for (const link of all(legacy, (node) => node.tagName === "a" &&
    attr(node, "href") === "https://www.thebridgetherapy.com/meet-the-team#:~:text=Sarah%20Critzman")) {
    link.attrs = link.attrs.filter(({ name }) => !["target", "rel"].includes(name));
    link.attrs.find(({ name }) => name === "href").value = "/therapists/sarah-critzman/";
    for (const text of all(link, (node) => node.nodeName === "#text")) {
      text.value = text.value.replaceAll("↗", "→");
    }
  }
  for (const link of all(legacy, (node) => node.tagName === "a" &&
    attr(node, "href") === "https://www.thebridgetherapy.com/meet-the-team#:~:text=Sarah%20Bell")) {
    link.attrs = link.attrs.filter(({ name }) => !["target", "rel"].includes(name));
    link.attrs.find(({ name }) => name === "href").value = "/therapists/sarah-bell/";
    for (const text of all(link, (node) => node.nodeName === "#text")) {
      text.value = text.value.replaceAll("↗", "→");
    }
  }
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
  const mistyLink = all(teamPanel, (node) => attr(node, "href") === "/therapists/misty-shultz/")[0];
  const mentoringLabel = parseFragment("<span>Mentoring and discipleship</span>").childNodes[0];
  mentoringLabel.parentNode = mistyLink;
  mistyLink.childNodes.push(mentoringLabel);
  const directoryLink = all(teamPanel, (node) =>
    node.tagName === "a" && attr(node, "href") === "https://www.thebridgetherapy.com/meet-the-team",
  )[0];
  directoryLink.attrs = directoryLink.attrs.filter(({ name }) => !["target", "rel"].includes(name));
  directoryLink.attrs.find(({ name }) => name === "href").value = "/therapists/";
  directoryLink.childNodes = parseFragment("View All Therapists →").childNodes;
  // These 12 active-page directory links now use the local directory; preserve all other attributes and text.
  const localDirectoryRoutes = ["/", "/individual-counseling-tyler/", "/anxiety-counseling-tyler/", "/depression-counseling-tyler/", "/christian-counseling-tyler/", "/adoption-counseling-tyler/", "/adhd-counseling-tyler/", "/grief-counseling-tyler/", "/life-transitions-counseling-tyler/", "/marriage-counseling-tyler/", "/premarital-counseling-tyler/", "/divorce-blended-family-counseling-tyler/"];
  if (localDirectoryRoutes.includes(route)) {
    const links = all(elements(legacy, "main")[0], (node) => node.tagName === "a" && attr(node, "href") === "https://www.thebridgetherapy.com/meet-the-team");
    assert.equal(links.length, 1, route + ": expected one general directory link");
    links[0].attrs.find(({ name }) => name === "href").value = "/therapists/";
  }
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
  // Six approved contextual link edits; preserve the rest of the frozen reference.
  function appendHtml(node, html) {
    const children = parseFragment(html).childNodes;
    children.forEach((child) => { child.parentNode = node; });
    node.childNodes.push(...children);
  }
  if (route === "/") {
    const section = all(legacy, (node) => attr(node, "id") === "services")[0];
    appendHtml(elements(section, "p")[0], ' Explore <a href="/individual-counseling-tyler/">Individual counseling</a>.');
  }
  if (route === "/individual-counseling-tyler/") {
    const related = all(legacy, (node) => attr(node, "class") === "related-care")[0];
    const link = parseFragment('<a class="service-text-link" href="/trauma-therapy-tyler/">Trauma counseling</a>').childNodes[0];
    link.parentNode = related;
    related.childNodes.unshift(link);
  }
  if (route === "/depression-counseling-tyler/") {
    const related = all(legacy, (node) => attr(node, "class") === "related-care")[0];
    const paragraph = parseFragment('<p>If you are experiencing depression during pregnancy or after childbirth, explore <a href="/pregnancy-postpartum-counseling-tyler/">Pregnancy and postpartum counseling</a>.</p>').childNodes[0];
    paragraph.parentNode = related.parentNode;
    related.parentNode.childNodes.splice(related.parentNode.childNodes.indexOf(related), 0, paragraph);
  }
  if (route === "/contact/") {
    const link = elements(elements(legacy, "main")[0], "a").find((node) => attr(node, "href") === "/#therapists");
    link.attrs.find(({name}) => name === "href").value = "/therapists/";
  }
  if (route === "/divorce-blended-family-counseling-tyler/") {
    const paragraphs = elements(legacy, "p");
    appendHtml(paragraphs.find((node) => normalizedText(node).startsWith("Explore communication about children")), ' You can also explore <a href="/parenting-support-tyler/">parenting support</a>.');
    appendHtml(paragraphs.find((node) => normalizedText(node).startsWith("Family change can bring different concerns")), ' If a younger family member needs their own space to talk, explore <a href="/child-teen-counseling-tyler/">support for children and teens</a>.');
  }
  // Approved faith-link consolidation, without changing frozen reference files.
  for (const link of elements(legacy, "a").filter(n => attr(n, "href") === "https://www.thebridgetherapy.com/what-we-believe")) {
    const inHeader = elements(elements(legacy, "header")[0], "a").includes(link);
    if ((inHeader && attr(link, "class") !== "menu-feature wide") || (!inHeader && route === "/christian-counseling-tyler/")) {
      link.parentNode.childNodes = link.parentNode.childNodes.filter(n => n !== link);
      continue;
    }
    link.attrs = link.attrs.filter(a => !["target", "rel"].includes(a.name));
    link.attrs.find(a => a.name === "href").value = "/christian-counseling-tyler/";
    if (inHeader) {
      elements(link, "strong")[0].childNodes = parseFragment("Christian Counseling").childNodes;
      elements(link, "b")[0].childNodes = parseFragment("Learn more").childNodes;
      for (const n of all(link, n => n.nodeName === "#text")) n.value = n.value.replace("Discover the heart behind The Bridge.", "Learn how faith and counseling come together at The Bridge.");
    } else link.childNodes = parseFragment("Learn about Christian counseling").childNodes;
  }
  if (route === "/anxiety-counseling-tyler/") {
    const main = elements(legacy, "main")[0];
    const replacements = [
      ["Book an Appointment", "Ask About an Appointment"],
      ["Understand your concerns.", "Understand how worry affects you."],
      ["Find the right starting point.", "Explore related support."],
      ["Start with a conversation.", "Ask about support for anxiety."],
      ["Erin works with children, adolescents, individual adults, and families. Her areas of experience include anxiety disorders, trauma, depression, and grief.", "Erin works with children, adolescents, individual adults, and families. Her experience includes anxiety, phobias, and trauma-related concerns, with a background in private practice, foster care and adoption services, and elementary education."],
      ["Jill works with individual adults experiencing anxiety, life transitions, grief, relationship concerns, and spiritual issues. Her counseling is grounded in her Christian faith.", "Jill works with individual adults facing anxiety, life transitions, relationship concerns, and grief. Her Christian and biblical perspective is an important part of her counseling work."]
    ];
    for (const n of all(main, n => n.nodeName === "#text"))
      for (const [before, after] of replacements) n.value = n.value.replace(before, after);
    const hero = all(main, n => attr(n, "class") === "service-hero")[0];
    appendHtml(elements(hero, "div")[1], '<p><a class="service-text-link" href="#anxiety-team-title">Meet our anxiety counselors</a></p>');
    const heading = all(main, n => attr(n, "id") === "anxiety-team-title")[0];
    heading.attrs.push({name:"tabindex",value:"-1"}, {name:"style",value:"scroll-margin-top:2rem"});
    const directory = elements(main, "a").find(n => attr(n,"href") === "/therapists/");
    directory.attrs = directory.attrs.filter(a => !["target","rel"].includes(a.name));
    directory.childNodes = parseFragment("View All Therapists").childNodes;
  }
  if (route === "/marriage-counseling-tyler/") {
    const main = elements(legacy, "main")[0];
    for (const n of all(main, n => n.nodeName === "#text")) {
      n.value = n.value.replace("Book an Appointment", "Ask About an Appointment")
        .replace("Start with a conversation.", "Take the next step together.")
        .replace(" by phone or email and let us know you’re interested in couples counseling. Our office will help with availability and scheduling at our Tyler office.", " through the website inquiry form, the conversational inquiry widget, phone, or email to ask about couples counseling and scheduling at our Tyler office.");
    }
    const hero = all(main, n => attr(n, "class") === "service-hero")[0];
    appendHtml(elements(hero, "div")[1], '<p><a class="service-text-link" href="#couples-team-title">Meet our marriage counselors</a></p>');
    const heading = all(main, n => attr(n, "id") === "couples-team-title")[0];
    heading.attrs.push({name:"tabindex",value:"-1"}, {name:"style",value:"scroll-margin-top:2rem"});
    const duplicate = elements(main, "a").find(n => normalizedText(n).startsWith("Explore Christian Counseling"));
    duplicate.parentNode.childNodes = duplicate.parentNode.childNodes.filter(n => n !== duplicate);
    const directory = elements(main, "a").find(n => attr(n,"href") === "/therapists/");
    directory.attrs = directory.attrs.filter(a => !["target","rel"].includes(a.name));
    directory.childNodes = parseFragment("View All Therapists").childNodes;
    const premarital = elements(all(main, n => attr(n,"id") === "premarital")[0], "p")[0];
    premarital.childNodes = parseFragment('Ask our office about <a href="/premarital-counseling-tyler/">premarital counseling</a> to explore expectations, communication, and the life you hope to build together.').childNodes;
    const family = elements(main, "p").find(n => normalizedText(n).startsWith("Work through differing expectations about parenting"));
    appendHtml(family, ' Marriage counseling centers on the couple relationship; <a href="/family-counseling-tyler/">family counseling</a> may be a useful starting point for concerns involving broader family relationships.');
  }
  // Approved service-page inquiry and local-directory consistency batch.
  const serviceInquiryUpdates = {
  "/individual-counseling-tyler/": [
    " by phone or email to discuss scheduling.",
    " through the website inquiry form, conversational inquiry widget, phone, or email to ask about individual counseling and scheduling."
  ],
  "/depression-counseling-tyler/": [
    " by phone or email.",
    " through the website inquiry form, conversational inquiry widget, phone, or email to ask about depression counseling and scheduling."
  ],
  "/trauma-therapy-tyler/": [
    " by phone or email.",
    " through the website inquiry form, conversational inquiry widget, phone, or email to ask about trauma and PTSD counseling and scheduling."
  ],
  "/emdr-therapy-tyler/": [
    " by phone or email.",
    " through the website inquiry form, conversational inquiry widget, phone, or email to ask about EMDR therapy and scheduling."
  ],
  "/grief-counseling-tyler/": [
    " by phone or email to discuss scheduling.",
    " through the website inquiry form, conversational inquiry widget, phone, or email to ask about grief counseling and scheduling."
  ],
  "/adhd-counseling-tyler/": [
    " by phone or email to discuss scheduling.",
    " through the website inquiry form, conversational inquiry widget, phone, or email to ask about ADHD counseling and support and scheduling."
  ],
  "/life-transitions-counseling-tyler/": [
    " by phone or email to discuss scheduling.",
    " through the website inquiry form, conversational inquiry widget, phone, or email to ask about life transitions counseling and scheduling."
  ],
  "/pregnancy-postpartum-counseling-tyler/": [
    " by phone or email to discuss scheduling.",
    " through the website inquiry form, conversational inquiry widget, phone, or email to ask about pregnancy and postpartum counseling and scheduling."
  ],
  "/premarital-counseling-tyler/": [
    " by phone or email to discuss scheduling.",
    " through the website inquiry form, conversational inquiry widget, phone, or email to ask about premarital or marital enrichment counseling and scheduling."
  ],
  "/family-counseling-tyler/": [
    " by phone or email to discuss scheduling.",
    " through the website inquiry form, conversational inquiry widget, phone, or email to ask about family counseling and scheduling."
  ],
  "/parenting-support-tyler/": [
    " by phone or email to discuss scheduling.",
    " through the website inquiry form, conversational inquiry widget, phone, or email to ask about parenting support and scheduling."
  ],
  "/child-teen-counseling-tyler/": [
    " by phone or email to discuss scheduling.",
    " through the website inquiry form, conversational inquiry widget, phone, or email to ask about child and teen counseling and scheduling."
  ],
  "/adoption-counseling-tyler/": [
    " by phone or email to discuss scheduling.",
    " through the website inquiry form, conversational inquiry widget, phone, or email to ask about adoption and foster family support and scheduling."
  ],
  "/divorce-blended-family-counseling-tyler/": [
    " by phone or email to discuss scheduling.",
    " through the website inquiry form, conversational inquiry widget, phone, or email to ask about divorce and blended family counseling and scheduling."
  ],
  "/christian-counseling-tyler/": [
    " by phone or email to discuss scheduling.",
    " through the website inquiry form, conversational inquiry widget, phone, or email to ask about Christian counseling and scheduling."
  ]
};
  if (serviceInquiryUpdates[route]) {
    const main = elements(legacy, "main")[0];
    const [before, after] = serviceInquiryUpdates[route];
    for (const n of all(main, n => n.nodeName === "#text")) {
      n.value = n.value.replace("Book an Appointment", "Ask About an Appointment").replace(before, after);
    }
    for (const directory of elements(main, "a").filter(n => attr(n, "href") === "/therapists/")) {
      directory.attrs = directory.attrs.filter(a => !["target", "rel"].includes(a.name));
      directory.childNodes = parseFragment("View All Therapists").childNodes;
    }
    if (route === "/individual-counseling-tyler/") {
      const duplicate = elements(main, "a").find(n => normalizedText(n).startsWith("Explore Christian Counseling"));
      duplicate.parentNode.childNodes = duplicate.parentNode.childNodes.filter(n => n !== duplicate);
    }
  }
  // Approved early links to existing service-page therapist headings.
  const therapistJumps = {
  "/individual-counseling-tyler/": [
    "individual-team-title",
    "Meet our individual counselors"
  ],
  "/depression-counseling-tyler/": [
    "depression-team-title",
    "Meet our depression counselors"
  ],
  "/trauma-therapy-tyler/": [
    "team-title",
    "Meet our trauma counselors"
  ],
  "/emdr-therapy-tyler/": [
    "team-title",
    "Meet our EMDR-trained counselors"
  ],
  "/grief-counseling-tyler/": [
    "team-title",
    "Meet our grief counselors"
  ],
  "/adhd-counseling-tyler/": [
    "team-title",
    "Meet our ADHD counselors"
  ],
  "/life-transitions-counseling-tyler/": [
    "team-title",
    "Meet our life transitions counselors"
  ],
  "/premarital-counseling-tyler/": [
    "team-title",
    "Meet our premarital counselors"
  ],
  "/family-counseling-tyler/": [
    "team-title",
    "Meet our family counselors"
  ],
  "/parenting-support-tyler/": [
    "team-title",
    "Meet our parenting counselors"
  ],
  "/child-teen-counseling-tyler/": [
    "team-title",
    "Meet our child & teen counselors"
  ],
  "/divorce-blended-family-counseling-tyler/": [
    "team-title",
    "Meet our divorce & blended family counselors"
  ],
  "/christian-counseling-tyler/": [
    "team-title",
    "Meet our Christian counselors"
  ]
};
  if (therapistJumps[route]) {
    const [id, wording] = therapistJumps[route];
    const main = elements(legacy, "main")[0];
    const hero = all(main, n => attr(n, "class") === "service-hero")[0];
    appendHtml(elements(hero, "div")[1], '<p><a class="service-text-link" href="#' + id + '">' + wording.replaceAll("&", "&amp;") + '</a></p>');
    const heading = all(main, n => attr(n, "id") === id)[0];
    heading.attrs.push({name: "tabindex", value: "-1"}, {name: "style", value: "scroll-margin-top:2rem"});
  }
  // Approved stock-image batch: amend only the illustrative image attributes.
  // The remaining frozen content, portraits, mappings and structure still compare exactly.
  const imageReplacement = serviceImages.find(record => record.route === route && record.status === "imported");
  if (imageReplacement) {
    const hero = all(legacy, n => attr(n, "class") === "service-hero")[0];
    const images = elements(hero, "img");
    assert.equal(images.length, 1);
    const illustrative = images[0];
    assert.match(attr(illustrative, "src"), /^\/assets\/(individual|couples|family)-care\.jpg$/);
    for (const [name, value] of Object.entries({src: imageReplacement.production.path, alt: imageReplacement.alt, width: "1440", height: "1080"})) {
      illustrative.attrs.find(a => a.name === name).value = value;
    }
    illustrative.attrs.push({name: "style", value: `object-position:${imageReplacement.objectPosition}`});
  }
  pages.set(route, built);
  const ids = all(built, (node) => attr(node, "id") !== undefined).map((node) =>
    attr(node, "id"),
  );
  assert.equal(new Set(ids).size, ids.length, `${route}: duplicate IDs`);
  assert.equal(elements(built, "h1").length, 1, `${route}: main heading`);
  // Approved local Blog navigation; change only the two shared reference links in memory.
  for (const region of ["header", "footer"]) {
    const links = elements(elements(legacy, region)[0], "a").filter((node) =>
      attr(node, "href") === "https://www.thebridgetherapy.com/blog");
    assert.equal(links.length, 1, `${route}: expected one ${region} blog link`);
    const link = links[0];
    link.attrs.find((a) => a.name === "href").value = "/blog/";
    if (region === "header") {
      link.attrs = link.attrs.filter((a) => !["target", "rel"].includes(a.name));
      for (const node of all(link, (n) => n.nodeName === "#text"))
        node.value = node.value.replace("↗", "→");
    }
  }
  // Intentional CTA/navigation cleanup, applied only to the in-memory reference.
  const referenceHeader = elements(legacy, "header")[0];
  const helpCards = all(referenceHeader, n => attr(n, "class") === "menu-feature");
  assert.equal(helpCards.length, 1);
  const helpCard = helpCards[0];
  const officeCard = parseFragment('<a class="menu-feature office-help" href="/contact/"><img src="/assets/kalynne.jpg" width="2500" height="3750" alt=""><span><strong>Not sure where to start?</strong><span class="office-help-name">Kalynne Arrick · Office Manager</span>Contact our office with questions about getting started.<b>Contact us →</b></span></a>').childNodes[0];
  helpCard.attrs = officeCard.attrs;
  helpCard.childNodes = officeCard.childNodes;
  const referenceFooter = elements(legacy, "footer")[0];
  const storyLinks = elements(referenceHeader, "a").filter(n => attr(n, "href") === "https://www.thebridgetherapy.com/our-story");
  assert.equal(storyLinks.length, 1);
  storyLinks[0].parentNode.childNodes = storyLinks[0].parentNode.childNodes.filter(n => n !== storyLinks[0]);
  const footerDirectory = elements(referenceFooter, "a").filter(n => attr(n, "href") === "/#therapists");
  assert.equal(footerDirectory.length, 1);
  footerDirectory[0].attrs.find(a => a.name === "href").value = "/therapists/";
  for (const link of elements(legacy, "a").filter(n => attr(n, "href") === "/contact/")) {
    for (const node of all(link, n => n.nodeName === "#text")) {
      node.value = node.value.replace("Ask About an Appointment", "Book an Appointment").replace("Book an appointment", "Book an Appointment");
    }
  }
  expectBatchOne(legacy, route);
  expectBatchTwo(legacy, route);
  expectPerformance(legacy, route);
  for (const tag of ["title", "header", "main", "footer"]) {
    let current = elements(built, tag)[0];
    if (route === "/contact/" && tag === "main") {
      // Validate the new form separately, while preserving every pre-existing contact element.
      current = parse(fs.readFileSync(builtFile, "utf8"));
      current = elements(current, "main")[0];
      const staffFeatures = all(current, n => attr(n, "class") === "contact-staff");
      assert.equal(staffFeatures.length, 1);
      const staffFeature = staffFeatures[0];
      assert.equal(normalizedText(staffFeature), "Kalynne Arrick Office Manager If you are not sure which counselor to contact, Kalynne, our Office Manager, can talk with you about what you are looking for and help connect you with a counselor who may be a good fit. Meet Kalynne →");
      assert.equal(attr(elements(staffFeature, "a")[0], "href"), "/staff/kalynne-arrick/");
      assert.equal(attr(elements(staffFeature, "img")[0], "src"), "/assets/kalynne.jpg");
      staffFeature.parentNode.childNodes = staffFeature.parentNode.childNodes.filter(n => n !== staffFeature);
      const inquiry = all(current, (node) => attr(node, "id") === "inquiry")[0];
      assert.ok(inquiry);
      const visibleForm = elements(inquiry, "form")[0];
      const definition = parse(fs.readFileSync("public/__forms.html", "utf8"));
      const staticForm = elements(definition, "form")[0];
      const fieldNames = (form) => all(form, (n) => ["input", "select", "textarea"].includes(n.tagName)).map((n) => attr(n, "name")).sort();
      assert.deepEqual(fieldNames(visibleForm), fieldNames(staticForm));
      assert.deepEqual(fieldNames(staticForm), ["form-name", "first_name", "last_name", "email", "phone", "preferred_therapist", "message", "bot-field", "source_page", "inquiry_source"].sort());
      for (const form of [visibleForm, staticForm]) {
        assert.equal(attr(form, "name"), "bridge-contact-inquiry");
        assert.equal(attr(form, "data-netlify-honeypot"), "bot-field");
        assert.equal(attr(elements(form, "input").find((n) => attr(n, "name") === "form-name"), "value"), "bridge-contact-inquiry");
      }
      assert.equal(attr(staticForm, "data-netlify"), "true");
      assert.equal(attr(visibleForm, "action"), "/__forms.html");
      assert.equal(attr(visibleForm, "method"), "post");
      assert.deepEqual(elements(inquiry, "input").map((n) => attr(n, "name")), ["form-name", "source_page", "inquiry_source", "first_name", "last_name", "email", "phone", "bot-field"]);
      assert.equal(elements(inquiry, "option").length, 11);
      assert.equal(attr(elements(inquiry, "textarea")[0], "maxlength"), "2000");
      assert.ok(normalizedText(inquiry).includes("Please do not include sensitive medical or personal health information in this form."));
      inquiry.parentNode.childNodes = inquiry.parentNode.childNodes.filter((n) => n !== inquiry);
    }
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
      // Keep the legacy cascade exact; the new widget uses isolated CSS-module classes.
      .filter((node) => attr(node, "rel") === "stylesheet" && !attr(node, "href").startsWith("/_next/static/"))
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
  } else if (normalizedText(elements(card, "h2")[0]) === "Sarah Bell") {
    assert.equal(links.length, 1);
    assert.equal(attr(links[0], "href"), "/therapists/sarah-bell/");
  } else if (normalizedText(elements(card, "h2")[0]) === "Sarah Critzman") {
    assert.equal(links.length, 1);
    assert.equal(attr(links[0], "href"), "/therapists/sarah-critzman/");
  } else if (normalizedText(elements(card, "h2")[0]) === "Kim Gonzales") {
    assert.equal(links.length, 1);
    assert.equal(attr(links[0], "href"), "/therapists/kim-gonzales/");
  } else if (normalizedText(elements(card, "h2")[0]) === "Misty Shultz") {
    assert.equal(links.length, 1);
    assert.equal(attr(links[0], "href"), "/therapists/misty-shultz/");
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
  "/emdr-therapy-tyler/", "/adhd-counseling-tyler/", "/adoption-counseling-tyler/", "/non-epileptic-seizures-counseling-tyler/",
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
const sarahBellProfile = parse(fs.readFileSync(".next/server/app/therapists/sarah-bell.html", "utf8"));
pages.set("/therapists/sarah-bell/", sarahBellProfile);
assert.equal(elements(sarahBellProfile, "h1").length, 1);
assert.equal(normalizedText(elements(sarahBellProfile, "h1")[0]), "Sarah Bell, LPC-A");
assert.equal(normalizedText(elements(sarahBellProfile, "title")[0]), "Sarah Bell, LPC-A | Tyler, TX | The Bridge");
assert.equal(attr(elements(sarahBellProfile, "meta").find((node) => attr(node, "name") === "robots"), "content"), "noindex, nofollow");
const sarahBellMain = elements(sarahBellProfile, "main")[0];
assert.equal(attr(elements(sarahBellMain, "img")[0], "src"), "/assets/sarah-bell.jpg");
const sarahBellServices = all(sarahBellMain, (node) => attr(node, "class") === "profile-services")[0];
assert.deepEqual(elements(sarahBellServices, "a").map((node) => attr(node, "href")), [
  "/trauma-therapy-tyler/", "/emdr-therapy-tyler/", "/adhd-counseling-tyler/",
]);
assert.ok(!elements(sarahBellProfile, "link").some((node) => attr(node, "rel") === "canonical"));
assert.ok(!elements(sarahBellProfile, "script").some((node) => attr(node, "type") === "application/ld+json"));
assert.ok(normalizedText(sarahBellMain).includes("Supervised by Whitney Briggs, LPC-S"));
assert.ok(normalizedText(sarahBellMain).includes("Licensed Professional Counselor Associate"));
const kimProfile = parse(fs.readFileSync(".next/server/app/therapists/kim-gonzales.html", "utf8"));
pages.set("/therapists/kim-gonzales/", kimProfile);
assert.equal(elements(kimProfile, "h1").length, 1);
assert.equal(normalizedText(elements(kimProfile, "h1")[0]), "Kim Gonzales, LMSW");
assert.equal(normalizedText(elements(kimProfile, "title")[0]), "Kim Gonzales, LMSW | Tyler, TX | The Bridge");
assert.equal(attr(elements(kimProfile, "meta").find((node) => attr(node, "name") === "robots"), "content"), "noindex, nofollow");
const kimMain = elements(kimProfile, "main")[0];
assert.equal(attr(elements(kimMain, "img")[0], "src"), "/assets/kim.jpg");
// Batch 2: owners explicitly confirmed Kim for Adoption/Foster; personal experience is not a credential.
const kimServices = all(kimMain, (node) => attr(node, "class") === "profile-services")[0];
assert.deepEqual(elements(kimServices, "a").map((node) => attr(node, "href")), [
  "/adoption-counseling-tyler/",
]);
assert.ok(!elements(kimProfile, "link").some((node) => attr(node, "rel") === "canonical"));
assert.ok(!elements(kimProfile, "script").some((node) => attr(node, "type") === "application/ld+json"));
assert.ok(normalizedText(kimMain).includes("Supervised by Erin Young, LCSW-S"));
assert.ok(normalizedText(kimMain).includes("Licensed Master Social Worker"));
const mistyProfile = parse(fs.readFileSync(".next/server/app/therapists/misty-shultz.html", "utf8"));
pages.set("/therapists/misty-shultz/", mistyProfile);
assert.equal(elements(mistyProfile, "h1").length, 1);
assert.equal(normalizedText(elements(mistyProfile, "h1")[0]), "Misty Shultz, LPC");
assert.equal(normalizedText(elements(mistyProfile, "title")[0]), "Misty Shultz, LPC | Tyler, TX | The Bridge");
assert.equal(attr(elements(mistyProfile, "meta").find((node) => attr(node, "name") === "robots"), "content"), "noindex, nofollow");
const mistyMain = elements(mistyProfile, "main")[0];
assert.equal(attr(elements(mistyMain, "img")[0], "src"), "/assets/misty.jpg");
assert.equal(all(mistyMain, (node) => attr(node, "class") === "profile-services").length, 0);
assert.ok(!elements(mistyProfile, "link").some((node) => attr(node, "rel") === "canonical"));
assert.ok(!elements(mistyProfile, "script").some((node) => attr(node, "type") === "application/ld+json"));
assert.ok(normalizedText(mistyMain).includes("Licensed Professional Counselor"));
const sarahCritzmanProfile = parse(fs.readFileSync(".next/server/app/therapists/sarah-critzman.html", "utf8"));
pages.set("/therapists/sarah-critzman/", sarahCritzmanProfile);
assert.equal(elements(sarahCritzmanProfile, "h1").length, 1);
assert.equal(normalizedText(elements(sarahCritzmanProfile, "h1")[0]), "Sarah Critzman, LMSW");
assert.equal(normalizedText(elements(sarahCritzmanProfile, "title")[0]), "Sarah Critzman, LMSW | Tyler, TX | The Bridge");
assert.equal(attr(elements(sarahCritzmanProfile, "meta").find((node) => attr(node, "name") === "robots"), "content"), "noindex, nofollow");
const sarahCritzmanMain = elements(sarahCritzmanProfile, "main")[0];
assert.equal(attr(elements(sarahCritzmanMain, "img")[0], "src"), "/assets/sarah-critzman.jpg");
assert.equal(all(sarahCritzmanMain, (node) => attr(node, "class") === "profile-services").length, 0);
assert.ok(!elements(sarahCritzmanProfile, "link").some((node) => attr(node, "rel") === "canonical"));
assert.ok(!elements(sarahCritzmanProfile, "script").some((node) => attr(node, "type") === "application/ld+json"));
assert.ok(normalizedText(sarahCritzmanMain).includes("Supervised by Christi Lawson, LCSW-S"));
assert.ok(normalizedText(sarahCritzmanMain).includes("Licensed Master Social Worker"));
// Authoritative specialty mapping: enforce the exact active-profile associations.
const focusMappings = [
  [/\banger\b/i, ["jennifer-wood", "alyxandrah-white", "denise-santos"]],
  [/co-?dependency/i, ["erin-young"]],
  [/play therapy/i, ["sarah-critzman"]],
  [/eating disorders/i, ["jennifer-wood"]],
  [/non-epileptic/i, ["erin-young"]],
  [/Brain Gym/i, ["erin-young"]],
  [/fibromyalgia/i, ["erin-young", "jill-kirkley"]],
  [/mentoring (?:and|&) discipleship/i, ["jennifer-wood", "jill-kirkley", "misty-shultz"]],
];
for (const [term, expected] of focusMappings) {
  const actual = [...pages].filter(([route, doc]) => route.startsWith("/therapists/") && route !== "/therapists/" && term.test(normalizedText(elements(doc, "main")[0]))).map(([route]) => route.split("/")[2]);
  assert.deepEqual(actual.sort(), expected.sort(), String(term));
}
// Owner-approved full service; Erin is the only featured provider.
const nesRoute = "/non-epileptic-seizures-counseling-tyler/";
const nesPage = parse(fs.readFileSync(".next/server/app/non-epileptic-seizures-counseling-tyler.html", "utf8"));
pages.set(nesRoute, nesPage);
const nesMain = elements(nesPage, "main")[0];
assert.equal(elements(nesMain, "h1").length, 1);
assert.equal(normalizedText(elements(nesMain, "h1")[0]), "Non-Epileptic Seizures Counseling in Tyler, TX");
assert.equal(normalizedText(elements(nesPage, "title")[0]), "Non-Epileptic Seizures Counseling | Tyler, TX | The Bridge");
assert.equal(attr(elements(nesPage, "meta").find(n => attr(n, "name") === "robots"), "content"), "noindex, nofollow");
assert.deepEqual(elements(nesMain, "a").map(n => attr(n, "href")).filter(href => href.startsWith("/therapists/")), ["/therapists/erin-young/"]);
assert.equal(elements(nesMain, "details").length, 4);
assert.ok(normalizedText(nesMain).includes("Counseling is not a substitute for appropriate medical evaluation or emergency care."));
assert.equal(all(nesMain, n => attr(n, "class") === "individual-team-grid")[0].childNodes.filter(n => n.tagName === "article").length, 1);
assert.equal(all(nesPage, n => attr(n, "data-service") === "Non-Epileptic Seizures").length, 0);
// Include new blog routes in the same link/asset/widget checks.
const blogIndex = parse(fs.readFileSync(".next/server/app/blog.html", "utf8"));
pages.set("/blog/", blogIndex);
for (const entry of fs.readdirSync("content/blog", { withFileTypes: true }).filter((entry) => entry.isDirectory())) {
  const record = JSON.parse(fs.readFileSync(`content/blog/${entry.name}/metadata.json`, "utf8"));
  const article = parse(fs.readFileSync(`.next/server/app${record.legacyPath}.html`, "utf8"));
  pages.set(record.legacyPath, article);
  pages.set(`${record.legacyPath}/`, article);
}
const staffProfile = parse(fs.readFileSync(".next/server/app/staff/kalynne-arrick.html", "utf8"));
assert.equal(normalizedText(elements(staffProfile, "h1")[0]), "Kalynne Arrick");
assert.equal(normalizedText(elements(staffProfile, "title")[0]), "Kalynne Arrick, Office Manager | The Bridge");
pages.set("/staff/kalynne-arrick/", staffProfile);

// The practice-level About page participates in the shared route/asset checks.
const about = parse(fs.readFileSync(".next/server/app/about.html", "utf8"));
pages.set("/about/", about);
const aboutMain = elements(about, "main")[0];
assert.equal(elements(about, "h1").length, 1);
assert.equal(normalizedText(elements(about, "h1")[0]), "About The Bridge");
assert.equal(normalizedText(elements(about, "title")[0]), "About The Bridge | The Bridge Therapeutic Services");
assert.equal(attr(elements(about, "meta").find(n => attr(n, "name") === "robots"), "content"), "noindex, nofollow");
assert.deepEqual(elements(aboutMain, "img").map(n => attr(n, "src")), ["/assets/our-story.jpg"]);
assert.deepEqual(elements(aboutMain, "h3").map(normalizedText), ["Jennifer Wood, LPC-S", "Erin Young, LCSW-S"]);
assert.deepEqual(elements(aboutMain, "a").map(n => attr(n, "href")), [
  "/therapists/jennifer-wood/", "/therapists/erin-young/", "/christian-counseling-tyler/",
  "/staff/kalynne-arrick/", "/therapists/", "/contact/",
]);
assert.equal(normalizedText(elements(aboutMain, "a").find(n => attr(n, "href") === "/staff/kalynne-arrick/")), "Kalynne Arrick, Office Manager");
assert.ok(!elements(elements(pages.get("/"), "main")[0], "img").some(n => attr(n, "src") === "/assets/our-story.jpg"));

for (const [route, doc] of pages) {
  assert.ok(!normalizedText(all(doc, n => attr(n, "id") === "team-panel")[0]).includes("Kalynne"), `${route}: staff excluded from therapist carousel`);
  if (route !== "/contact/" && route !== "/about/" && !route.startsWith("/staff/")) {
    assert.ok(!normalizedText(elements(doc, "main")[0]).includes("Kalynne"), `${route}: staff excluded from clinical content`);
  }
  assert.equal(all(doc, (n) => attr(n, "id") === "chat-open").length, 1, `${route}: expected one inquiry launcher`);
  assert.ok(!normalizedText(doc).includes("Chat preview:"), `${route}: obsolete chat placeholder`);
  if (route.startsWith("/therapists/") && route !== "/therapists/") {
    const contacts = elements(elements(doc, "main")[0], "a").filter((n) => attr(n, "href")?.startsWith("/contact/"));
    assert.equal(contacts.length, 2);
    contacts.forEach((n) => assert.equal(attr(n, "href"), `/contact/?therapist=${route.split("/")[2]}`));
  }
  // Historical articles are immutable; removed-service rules still cover all new chrome.
  const currentSiteText = (node) => ["script", "style"].includes(node.tagName) || attr(node, "data-original-article-body") !== undefined
    ? "" : node.nodeName === "#text" ? node.value : (node.childNodes ?? []).map(currentSiteText).join(" ");
  assert.ok(!/Military|Psychological (?:assessment|testing)/i.test(route.startsWith("/news/") ? currentSiteText(doc) : normalizedText(doc)), route + ": removed service");
  for (const node of all(
    doc,
    (entry) =>
      attr(entry, "href") !== undefined || attr(entry, "src") !== undefined,
  )) {
    const value = attr(node, "href") ?? attr(node, "src");
    if (/^(?:[a-z]+:|\/\/)/i.test(value)) continue;
    const url = new URL(value, `http://localhost${route}`);
    if (url.pathname.startsWith("/_next/")) continue;
    // Preserve these exact historical body destinations; launch disposition is deferred.
    if (route.startsWith("/news/") && ["/schedule-an-apointment", "/what-we-believe", "/our-story"].includes(url.pathname)) {
      let parent = node.parentNode;
      while (parent && attr(parent, "data-original-article-body") === undefined) parent = parent.parentNode;
      assert.ok(parent, `${route}: unresolved legacy link must remain inside original body`);
      continue;
    }
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
