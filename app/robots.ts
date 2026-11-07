import type { MetadataRoute } from "next";
import { indexingEnabled } from "@/lib/seo/metadata";
import { PRODUCTION_ORIGIN } from "@/lib/seo/policy";

export default function robots(): MetadataRoute.Robots {
  // Staging HTML must stay crawlable so crawlers can observe noindex.
  return indexingEnabled
    ? {
        rules: { userAgent: "*", allow: "/" },
        sitemap: PRODUCTION_ORIGIN + "/sitemap.xml",
      }
    : { rules: { userAgent: "*", allow: "/", disallow: "/sitemap.xml" } };
}
