// Host guard: never enables indexing or removes downstream noindex.
// The build's independent launch gate controls production HTML/robots/sitemap.
import { applySecurityHeaders } from "../../lib/security-headers.mjs";

const productionOrigin = "https://www.thebridgetherapy.com";
const productionAlias = "bridge-therapy-website.netlify.app";
const productionSiteId = "1c0ce777-b889-4f6b-8292-ef7590a4a25e";
// Netlify deploy IDs are 24 hex characters. This is deliberately not a
// wildcard for branch/preview prefixes or for any other Netlify site's name.
const productionPermalink = /^([a-f0-9]{24})--bridge-therapy-website\.netlify\.app$/;
export default async function indexingGuard(request, context) {
  const url = new URL(request.url);
  // Keep the TOML Forms exclusion as well as this defense in depth. Do not
  // inspect/consume submission bodies or alter framework/platform endpoints.
  if (
    url.pathname === "/__forms.html" ||
    !["GET", "HEAD"].includes(request.method) ||
    /^\/(?:\.netlify|_next|api)(?:\/|$)/.test(url.pathname)
  ) return context.next();
  if (url.origin === productionOrigin) return context.next();
  const headers = {
    "X-Robots-Tag": "noindex, nofollow",
    "Cache-Control": "no-store",
  };
  if (/^\/sitemap\.xml\/?$/.test(url.pathname)) {
    const response = new Response(null, { status: 404, headers });
    applySecurityHeaders(response.headers);
    return response;
  }
  if (/^\/robots\.txt\/?$/.test(url.pathname)) {
    const response = new Response("User-Agent: *\nAllow: /\nDisallow: /sitemap.xml\n", {
      headers: { ...headers, "Content-Type": "text/plain; charset=utf-8" },
    });
    applySecurityHeaders(response.headers);
    return response;
  }
  const permalink = productionPermalink.exec(url.hostname);
  // Redirect page-like requests on this site's exact alias or deploy permalink.
  // Files/assets stay local; previews/branches remain independently noindex.
  if (
    (url.hostname === productionAlias || permalink) &&
    !/^\/assets(?:\/|$)/.test(url.pathname) &&
    !url.pathname.split("/").filter(Boolean).at(-1)?.includes(".")
  ) {
    if (
      context.site?.id !== productionSiteId ||
      !context.deploy?.context ||
      (permalink && context.deploy.context === "production" && context.deploy.id !== permalink[1])
    ) {
      const response = new Response(
        '<!doctype html><html><head><meta name="robots" content="noindex, nofollow"><title>Unavailable</title></head><body></body></html>',
        { status: 503, headers: { ...headers, "Content-Type": "text/html; charset=utf-8" } },
      );
      applySecurityHeaders(response.headers);
      return response;
    }
    if (context.deploy.context === "production") {
      // Assign path/search separately: even //evil.example stays on our origin.
      const target = new URL(productionOrigin);
      target.pathname = url.pathname;
      target.search = url.search;
      const response = new Response(null, {
        status: 301,
        headers: { ...headers, Location: target.href },
      });
      applySecurityHeaders(response.headers);
      return response;
    }
  }
  const upstream = await context.next();
  const response = new Response(upstream.body, upstream);
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  applySecurityHeaders(response.headers);
  return response;
}
