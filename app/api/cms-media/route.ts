import { previewEnabled, previewArticle } from "@/lib/babylovegrowth/client";
import { articleImageUrls, safeImageUrl } from "@/lib/babylovegrowth/policy.mjs";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  if (!previewEnabled(process.env)) return new Response(null, { status: 404 });
  const params = new URL(request.url).searchParams;
  const slug = params.get("slug") ?? "";
  const file = params.get("file") ?? "";
  if (!/^[a-zA-Z0-9_-]+\.(jpeg|jpg|png|webp)$/i.test(file)) return new Response(null, { status: 404 });
  try {
    const article = await previewArticle(slug);
    const url = `https://media.babylovegrowth.ai/blog-images/organization-65684/${file}`;
    if (!article || ![...articleImageUrls(article.content_html), safeImageUrl(article.hero_image_url)].includes(url)) return new Response(null, { status: 404 });
    // No browser cookies, API keys, referrers, redirects or arbitrary upstream hosts.
    const upstream = await fetch(url, { redirect: "error", signal: AbortSignal.timeout(15000), cache: "no-store" });
    const type = upstream.headers.get("content-type")?.split(";")[0] ?? "";
    if (!upstream.ok || !["image/jpeg", "image/png", "image/webp"].includes(type) || !upstream.body) throw new Error();
    const reader = upstream.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read(); if (done) break;
      size += value.length;
      if (size > 8 * 1024 * 1024) { await reader.cancel(); throw new Error(); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size); let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    return new Response(bytes, { headers: { "Content-Type": type, "X-Content-Type-Options": "nosniff", "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "private, max-age=3600", "Cross-Origin-Resource-Policy": "same-origin" } });
  } catch { return new Response(null, { status: 502 }); }
}
