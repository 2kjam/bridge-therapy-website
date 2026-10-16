// DESIGN PROTOTYPE ONLY. Not imported by netlify/edge-functions or netlify.toml.
import indexingGuard from "../../netlify/edge-functions/indexing-guard.js";
import { applySecurityHeaders } from "../../lib/security-headers.mjs";

export const productionSiteId = "1c0ce777-b889-4f6b-8292-ef7590a4a25e";
const origin = "https://www.thebridgetherapy.com";

function deny(status) {
  const headers = new Headers({
    "Content-Type": "text/html; charset=utf-8",
    "X-Robots-Tag": "noindex, nofollow",
    "Cache-Control": "no-store",
  });
  applySecurityHeaders(headers);
  return new Response('<!doctype html><html><head><meta name="robots" content="noindex, nofollow"><title>Unavailable</title></head><body></body></html>', { status, headers });
}

export default function aliasPolicy(request, context) {
  const url = new URL(request.url);
  // The TOML exclusion remains mandatory; this is defense in depth only.
  if (url.pathname === "/__forms.html") return context.next();
  if (!context.site?.id || !context.deploy?.context) return deny(503);
  if (context.site.id === productionSiteId && context.deploy.context === "production") {
    if (url.origin === origin) return context.next();
    // Never forward an inquiry payload across origins or convert POST into GET.
    if (!["GET", "HEAD"].includes(request.method)) return deny(403);
    // Keep sitemap discovery suppressed even on the old production alias.
    if (/^\/(?:robots\.txt|sitemap\.xml)\/?$/.test(url.pathname))
      return indexingGuard(request, context);
    // Fixed origin + separate pathname/search cannot produce an open redirect.
    const target = new URL(origin);
    target.pathname = url.pathname;
    target.search = url.search;
    const headers = new Headers({ Location: target.href, "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "no-store" });
    applySecurityHeaders(headers);
    return new Response(null, { status: 301, headers });
  }
  // A distinct site's/preview's independently disabled artifact is unchanged.
  // An unexpected site must never be allowed to serve the production origin.
  if (url.origin === origin) return deny(503);
  return indexingGuard(request, context);
}
