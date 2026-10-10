// Deny-only host guard: never enables indexing or removes downstream noindex.
// The build's independent launch gate controls production HTML/robots/sitemap.
const productionOrigin = "https://www.thebridgetherapy.com";
export default async function indexingGuard(request, context) {
  const url = new URL(request.url);
  if (url.origin === productionOrigin) return context.next();
  const headers = {
    "X-Robots-Tag": "noindex, nofollow",
    "Cache-Control": "no-store",
  };
  if (/^\/sitemap\.xml\/?$/.test(url.pathname)) {
    return new Response(null, { status: 404, headers });
  }
  if (/^\/robots\.txt\/?$/.test(url.pathname)) {
    return new Response("User-Agent: *\nAllow: /\nDisallow: /sitemap.xml\n", {
      headers: { ...headers, "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  const upstream = await context.next();
  const response = new Response(upstream.body, upstream);
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}
