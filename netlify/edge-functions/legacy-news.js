// The collection index moved; author/tag archives and feeds have no approved replacement.
// Permit tracking parameters, but do not turn unknown query-based resources into blog redirects.
export default function legacyNews(request, context) {
  const url = new URL(request.url);
  if (!["/news", "/news/"].includes(url.pathname)) return context.next();
  const tracking = /^(utm_[a-z0-9_]+|gclid|fbclid|msclkid)$/i;
  if ([...url.searchParams.keys()].some((key) => !tracking.test(key))) {
    return context.next();
  }
  return new Response(null, {
    status: 301,
    headers: { Location: "/blog/" + url.search },
  });
}

export const config = { path: ["/news", "/news/"] };
