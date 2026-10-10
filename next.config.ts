import type { NextConfig } from "next";
import { productionIndexingAllowed } from "./lib/seo/policy";

export default function nextConfig(phase: string): NextConfig {
  const indexingEnabled = productionIndexingAllowed(process.env, phase);
  return {
    trailingSlash: true,
    poweredByHeader: false,
    // Boolean only, never secrets. Ignore any externally supplied BRIDGE_BUILD_INDEXING.
    env: { BRIDGE_BUILD_INDEXING: String(indexingEnabled) },
    async headers() {
      return [
        {
          source: indexingEnabled
            ? "/:file(robots\\.txt|sitemap\\.xml)"
            : "/:path*",
          headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
        },
      ];
    },
    async redirects() {
      return [
        { source: "/index.html", destination: "/", permanent: true },
        {
          source: "/:path+/index.html",
          destination: "/:path+/",
          permanent: true,
        },
        {
          source: "/children-families",
          destination: "/#family-services",
          permanent: true,
        },
      ];
    },
  };
}
