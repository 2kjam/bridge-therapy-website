import { parseFragment, serialize, serializeOuter } from "parse5";

export function stagingBuildAllowed(env) {
  return env.SITE_ID === "c9ac64dc-b248-4666-bc90-6219f2b483a4" && env.BRANCH === "staging";
}

export function previewEnabled(env, verifiedStagingBuild = false) {
  if (env.BRIDGE_BABYLOVE_PREVIEW !== "true" || !env.BABYLOVEGROWTH_BLOG_API_KEY) return false;
  // Netlify build identity is not guaranteed in serverless process.env.
  // This boolean is computed by next.config from the build identity, never from request input.
  if (verifiedStagingBuild) return true;
  if (env.NETLIFY || env.CONTEXT) return stagingBuildAllowed(env);
  return env.NODE_ENV === "development";
}

// Adam authorized every generated Bridge article for protected staging review.
// Publication to production remains a separate, per-article approval.
export function validStagingArticle(article) {
  return typeof article?.published === "boolean" && validArticle({ ...article, published: true });
}

export async function collectStagingArticles(listPage) {
  const articles = new Map();
  const rawIds = new Set();
  const slugs = new Set();
  const pageSize = 50;
  // Fail visibly instead of silently dropping posts or looping forever on a broken API.
  for (let page = 0; page < 200; page++) {
    const batch = await listPage({ limit: pageSize, offset: page * pageSize, publishedOnly: false });
    if (!Array.isArray(batch)) throw new Error("Invalid CMS page");
    let added = 0;
    for (const article of batch) {
      if (article && !rawIds.has(article.id)) { rawIds.add(article.id); added++; }
      if (validStagingArticle(article) && !articles.has(article.id) && !slugs.has(article.slug)) {
        articles.set(article.id, article); slugs.add(article.slug);
      }
    }
    if (batch.length < pageSize) return [...articles.values()];
    if (page > 0 && added === 0) throw new Error("CMS pagination did not advance");
  }
  throw new Error("CMS pagination exceeded safety limit");
}

export function validArticle(article) {
  if (!article || article.published !== true || !Number.isSafeInteger(article.id) ||
      typeof article.slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug) ||
      typeof article.title !== "string" || !article.title.trim()) return false;
  try {
    const url = new URL(article.orgWebsite);
    return url.protocol === "https:" && ["thebridgetherapy.com", "www.thebridgetherapy.com"].includes(url.hostname)
      && !url.username && !url.password && !url.port;
  } catch { return false; }
}

// Preserve semantic article layout, never arbitrary CSS, scripts or embeds.
const allowed = new Set(["p", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "strong", "em", "b", "i", "blockquote", "br", "hr", "table", "thead", "tbody", "tr", "th", "td", "caption", "figure", "figcaption", "div", "section", "span", "a", "code", "pre", "sup", "sub"]);
const excluded = new Set(["script", "style", "iframe", "object", "embed", "form", "input", "textarea", "select", "button", "svg", "math", "template"]);
const escapeText = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const attrText = (value) => escapeText(value).replaceAll('"', "&quot;");
const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value ?? "";
export function safeImageUrl(value) {
  try {
    const u = new URL(value);
    return u.origin === "https://media.babylovegrowth.ai" && !u.username && !u.password && !u.search && !u.hash &&
      /^\/blog-images\/organization-65684\/[a-zA-Z0-9_-]+\.(?:jpeg|jpg|png|webp)$/i.test(u.pathname) ? u.href : null;
  } catch { return null; }
}
export function articleImageUrls(html) {
  const urls = [];
  function visit(n) {
    if (excluded.has(n.tagName)) return;
    if (n.tagName === "img") { const url = safeImageUrl(attr(n, "src")); if (url) urls.push(url); }
    for (const c of n.childNodes ?? []) visit(c);
  }
  visit(parseFragment(typeof html === "string" ? html : ""));
  return urls;
}
function safeHref(value) {
  if (/^#[a-zA-Z0-9_-]+$/.test(value)) return value;
  if (/^tel:\+?[0-9 ()-]+$/.test(value)) return value;
  if (/^\/(?!\/)[a-zA-Z0-9/_#-]*$/.test(value)) return value;
  try {
    const u = new URL(value);
    if (u.protocol !== "https:" || u.username || u.password) return null;
    if (["thebridgetherapy.com", "www.thebridgetherapy.com"].includes(u.hostname)) return u.pathname.startsWith("//") ? null : u.pathname + u.search + u.hash;
    return u.href;
  } catch { return null; }
}
export function removeStagingName(value, slug) {
  if (typeof value !== "string") return value;
  return ["online-couples-counseling", "religious-trauma-therapy"].includes(slug) ? value.replace(/\bAdam\b/gi, "") : value;
}
export function cleanArticleHtml(html, slug = "", title = "") {
  const fragment = parseFragment(typeof html === "string" ? html : "");
  const text = n => n.nodeName === "#text" ? n.value : (n.childNodes ?? []).map(text).join("");
  let imageIndex = 0;
  function render(node) {
    if (node.nodeName === "#text") return escapeText(removeStagingName(node.value, slug));
    if (excluded.has(node.tagName)) return "";
    // Requested staging-only presentation change for these two review articles.
    // Match the standalone vendor credit, never general article references.
    if (["online-couples-counseling", "religious-trauma-therapy"].includes(slug) &&
        ["p", "a"].includes(node.tagName) &&
        text(node).trim() === "Created with BabyLoveGrowth, an AI writing tool") return "";
    if (node.tagName === "h1" && text(node).trim() === title.trim()) return "";
    if (node.tagName === "img") {
      const url = safeImageUrl(attr(node, "src"));
      if (!url || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return "";
      const src = `/api/cms-media/?slug=${encodeURIComponent(slug)}&file=${encodeURIComponent(new URL(url).pathname.split("/").pop())}`;
      return `<img src="${attrText(src)}" alt="${attrText(removeStagingName(attr(node, "alt"), slug))}" loading="${imageIndex++ === 0 ? "eager" : "lazy"}" decoding="async" referrerpolicy="no-referrer">`;
    }
    const body = (node.childNodes ?? []).map(render).join("");
    let tag = node.tagName === "h1" ? "h2" : node.tagName;
    // Restore semantic paragraphs/headings from vendor card divs, preserving text.
    let inCard = false;
    for (let parent = node; parent && parent !== fragment; parent = parent.parentNode) {
      if (attr(parent, "data-cta-card") === "true" || (parent.tagName === "div" && parent.parentNode === fragment)) inCard = true;
    }
    const elements = (node.childNodes ?? []).filter(child => child.tagName);
    const siblings = (node.parentNode?.childNodes ?? []).filter(child => child.tagName);
    const previous = siblings[siblings.indexOf(node) - 1];
    const label = n => n?.tagName === "div" && n.childNodes?.some(child => child.tagName === "span");
    if (inCard && tag === "div" && text(node).trim() && !elements.some(child => ["div", "a", "p", "h2"].includes(child.tagName))) {
      tag = label(previous) && !label(node) ? "h2" : "p";
    }
    if (!allowed.has(tag)) return body;
    let attrs = "";
    const id = attr(node, "id");
    if (/^h[2-6]$/.test(tag) && /^[a-zA-Z0-9_-]+$/.test(id)) attrs += ` id="cms-${id}"`;
    if (tag === "a") {
      let href = safeHref(attr(node, "href"));
      if (!href) return body;
      if (href.startsWith("#")) href = "#cms-" + href.slice(1);
      attrs += ` href="${attrText(href)}"`;
      if (href.startsWith("https://")) attrs += ' rel="noopener noreferrer nofollow"';
    }
    if (attr(node, "data-cta-card") === "true" || (tag === "div" && node.parentNode === fragment)) attrs += ' class="cms-cta blog-support-card"';
    if (["td", "th"].includes(tag)) for (const name of ["colspan", "rowspan"]) {
      const value = attr(node, name); if (/^[1-9][0-9]?$/.test(value)) attrs += ` ${name}="${value}"`;
    }
    return ["br", "hr"].includes(tag) ? `<${tag}>` : `<${tag}${attrs}>${body}</${tag}>`;
  }
  return render(fragment);
}

// Input must already be sanitized. Match the existing article hero and table
// presentation while retaining the vendor's text and the automatic staging feed.
export function articlePresentation(cleanHtml) {
  const fragment = parseFragment(cleanHtml);
  replaceGeneratedLocationCards(fragment);
  const meaningful = nodes => (nodes ?? []).filter(node => node.nodeName !== "#text" || node.value.trim());
  const first = meaningful(fragment.childNodes)[0];
  const children = meaningful(first?.childNodes);
  const hero = first?.tagName === "img" ? first : first?.tagName === "p" && children.length === 1 && children[0].tagName === "img" ? children[0] : undefined;
  let heroHtml = "";
  if (hero) {
    hero.attrs.push({ name: "class", value: "blog-featured-image" }, { name: "fetchpriority", value: "high" });
    heroHtml = serializeOuter(hero);
    fragment.childNodes = fragment.childNodes.filter(node => node !== first);
  }
  const text = node => node.nodeName === "#text" ? node.value : (node.childNodes ?? []).map(text).join("");
  let tableIndex = 0;
  function formatTables(node) {
    for (const child of [...(node.childNodes ?? [])]) {
      if (child.tagName !== "table") { formatTables(child); continue; }
      const rows = [];
      const collectRows = parent => { for (const entry of parent.childNodes ?? []) { if (entry.tagName === "tr") rows.push(entry); else collectRows(entry); } };
      collectRows(child);
      const cells = meaningful(rows[0]?.childNodes);
      if (cells.map(cell => text(cell).trim()).join("|") === "Pattern|What it looks like|What helps instead") {
        for (const cell of cells) {
          cell.tagName = cell.nodeName = "th";
          cell.attrs.push({ name: "scope", value: "col" });
        }
      }
      const wrapper = parseFragment(`<div class="cms-table-scroll" role="region" aria-label="Article table ${++tableIndex}" tabindex="0"></div>`).childNodes[0];
      wrapper.parentNode = node;
      wrapper.childNodes = [child];
      child.parentNode = wrapper;
      node.childNodes[node.childNodes.indexOf(child)] = wrapper;
    }
  }
  formatTables(fragment);
  return { heroHtml, bodyHtml: serialize(fragment) };
}

// Replace the complete recognized vendor map card, not just its attribution.
// The replacement uses our own address from app/contact/page.tsx and no map,
// coordinates, tiles or other third-party geographic data. Unrecognized layouts
// retain their attribution rather than silently detaching a license notice.
function replaceGeneratedLocationCards(fragment) {
  const text = node => node.nodeName === "#text" ? node.value : (node.childNodes ?? []).map(text).join("");
  const descendants = node => (node.childNodes ?? []).flatMap(child => [child, ...descendants(child)]);
  const isMapCredit = node => {
    if (node.tagName !== "a") return false;
    try {
      const url = new URL(attr(node, "href"));
      return ["openstreetmap.org", "www.openstreetmap.org"].includes(url.hostname) && url.pathname === "/copyright" &&
        /^©?\s*OpenStreetMap contributors$/i.test(text(node).trim());
    } catch { return false; }
  };
  for (const card of [...fragment.childNodes]) {
    if (card.tagName !== "div" || !attr(card, "class").split(/\s+/).includes("cms-cta")) continue;
    const nodes = descendants(card);
    const headings = nodes.filter(node => /^h[2-6]$/.test(node.tagName ?? ""));
    const paragraphs = nodes.filter(node => node.tagName === "p");
    const links = nodes.filter(node => node.tagName === "a");
    if (headings.length !== 1 || headings[0].tagName !== "h2" || paragraphs.length !== 4 ||
        links.length !== 2 || !links.some(isMapCredit) ||
        !links.some(link => text(link).trim().toLowerCase() === "get directions") ||
        text(paragraphs[0]).trim() !== "The Bridge Therapeutic Services" ||
        text(paragraphs[2]).trim() !== "The Bridge Therapeutic Services" ||
        text(paragraphs[3]).trim() !== "3800 Paluxy Dr Ste 240, Tyler, TX 75703" ||
        nodes.some(node => ["table", "ul", "ol", "blockquote"].includes(node.tagName))) continue;
    const recognized = new Set([...headings, ...paragraphs, ...links]);
    const hasOtherText = node => recognized.has(node) ? false : node.nodeName === "#text" ? Boolean(node.value.trim()) : (node.childNodes ?? []).some(hasOtherText);
    if (hasOtherText(card)) continue;
    const heading = escapeText(text(headings[0]).trim());
    const description = escapeText(text(paragraphs[1]).trim());
    const replacement = parseFragment(`<div class="cms-cta blog-support-card"><p><span>The Bridge Therapeutic Services</span></p><h2>${heading}</h2><p>${description}</p><p>The Bridge Therapeutic Services<br>3800 Paluxy Drive, Suite 240, Building 2, Tyler, TX 75703</p><p><a href="/contact/#location">Get directions</a></p></div>`).childNodes[0];
    replacement.parentNode = fragment;
    fragment.childNodes[fragment.childNodes.indexOf(card)] = replacement;
  }
}
