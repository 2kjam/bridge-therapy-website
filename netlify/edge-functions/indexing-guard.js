// Deny-only host guard: never enables indexing or removes downstream noindex.
// The build's independent launch gate controls production HTML/robots/sitemap.
import { applySecurityHeaders } from "../../lib/security-headers.mjs";

const productionOrigin = "https://www.thebridgetherapy.com";
export default async function indexingGuard(request, context) {
  const url = new URL(request.url);
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
  const upstream = await context.next();
  const response = new Response(upstream.body, upstream);
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  applySecurityHeaders(response.headers);
  return response;
}
