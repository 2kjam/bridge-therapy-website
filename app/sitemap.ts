import type { MetadataRoute } from "next";
import { indexingEnabled } from "@/lib/seo/metadata";
import { publicContentUrls } from "@/lib/seo/inventory";

export default function sitemap(): MetadataRoute.Sitemap {
  // Empty and noindex until the explicit launch gate passes. No staged discovery list.
  // Publication dates and checkout mtimes are not verified content modification dates.
  return indexingEnabled ? publicContentUrls().map((url) => ({ url })) : [];
}
