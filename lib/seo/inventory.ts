import pages from "@/content/seo/public-pages.json";
import { getPublishedBlogPosts } from "@/lib/blog";
import { canonicalUrl } from "./policy";

export function publicContentUrls(): string[] {
  const urls = [
    ...pages,
    ...getPublishedBlogPosts().map((post) => post.legacyPath),
  ].map(canonicalUrl);
  if (new Set(urls).size !== urls.length)
    throw new Error("Duplicate public SEO URL");
  return urls.sort();
}
