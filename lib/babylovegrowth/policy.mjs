import { parseFragment } from "parse5";

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

// Adam approved these two generated articles for protected staging review only.
const stagingApprovedArticles = new Map([[1069962, "religious-trauma-therapy"], [1069980, "online-couples-counseling"]]);
export function validStagingArticle(article) {
  return validArticle(article) || (article?.published === false &&
    stagingApprovedArticles.get(article.id) === article.slug &&
    validArticle({ ...article, published: true }));
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
export function cleanArticleHtml(html, slug = "", title = "") {
  const fragment = parseFragment(typeof html === "string" ? html : "");
  const text = n => n.nodeName === "#text" ? n.value : (n.childNodes ?? []).map(text).join("");
  function render(node) {
    if (node.nodeName === "#text") return escapeText(node.value);
    if (excluded.has(node.tagName)) return "";
    if (node.tagName === "h1" && text(node).trim() === title.trim()) return "";
    if (node.tagName === "img") {
      const url = safeImageUrl(attr(node, "src"));
      if (!url || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return "";
      const src = `/blog/cms-preview/media/?slug=${encodeURIComponent(slug)}&file=${encodeURIComponent(new URL(url).pathname.split("/").pop())}`;
      return `<img src="${attrText(src)}" alt="${attrText(attr(node, "alt"))}" loading="lazy" decoding="async" referrerpolicy="no-referrer">`;
    }
    const body = (node.childNodes ?? []).map(render).join("");
    const tag = node.tagName === "h1" ? "h2" : node.tagName;
    if (!allowed.has(tag)) return body;
    let attrs = "";
    const id = attr(node, "id");
    if (/^h[2-6]$/.test(tag) && /^[a-zA-Z0-9_-]+$/.test(id)) attrs += ` id="cms-${id}"`;
    if (tag === "a") {
      let href = safeHref(attr(node, "href"));
      if (!href) return body;
      if (href.startsWith("#")) href = "#cms-" + href.slice(1);
      attrs += ` href="${attrText(href)}" rel="noopener noreferrer nofollow"`;
    }
    if (attr(node, "data-cta-card") === "true" || (tag === "div" && node.parentNode === fragment)) attrs += ' class="cms-cta"';
    if (["td", "th"].includes(tag)) for (const name of ["colspan", "rowspan"]) {
      const value = attr(node, name); if (/^[1-9][0-9]?$/.test(value)) attrs += ` ${name}="${value}"`;
    }
    return ["br", "hr"].includes(tag) ? `<${tag}>` : `<${tag}${attrs}>${body}</${tag}>`;
  }
  return render(fragment);
}
