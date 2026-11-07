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

// Preview text only: no scripts, embeds, tracking images, styles, forms or supplied JSON-LD.
const allowed = new Set(["p", "h2", "h3", "h4", "ul", "ol", "li", "strong", "em", "b", "i", "blockquote", "br", "hr", "table", "thead", "tbody", "tr", "th", "td"]);
const excluded = new Set(["script", "style", "iframe", "object", "embed", "form", "input", "textarea", "select", "button", "svg", "math", "template"]);
const escapeText = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
export function cleanArticleHtml(html) {
  const fragment = parseFragment(typeof html === "string" ? html : "");
  function render(node) {
    if (node.nodeName === "#text") return escapeText(node.value);
    if (excluded.has(node.tagName)) return "";
    const body = (node.childNodes ?? []).map(render).join("");
    const tag = node.tagName === "h1" ? "h2" : node.tagName;
    if (!allowed.has(tag)) return body;
    return ["br", "hr"].includes(tag) ? `<${tag}>` : `<${tag}>${body}</${tag}>`;
  }
  return render(fragment);
}
