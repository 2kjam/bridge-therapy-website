import type { NextConfig } from "next";
import { stagingBuildAllowed } from "./lib/babylovegrowth/policy.mjs";
import { productionIndexingAllowed } from "./lib/seo/policy";
import {
  securityHeaderRule,
} from "./lib/security-headers.mjs";

export default function nextConfig(phase: string): NextConfig {
  const indexingEnabled = productionIndexingAllowed(process.env, phase);
  return {
    trailingSlash: true,
    poweredByHeader: false,
    // Boolean only, never secrets. Ignore any externally supplied BRIDGE_BUILD_INDEXING.
    env: {
      BRIDGE_BUILD_INDEXING: String(indexingEnabled),
      // Non-secret boolean only. Ignore externally supplied BRIDGE_BUILD_CMS_STAGING.
      BRIDGE_BUILD_CMS_STAGING: String(stagingBuildAllowed(process.env)),
    },
    async headers() {
      return [
        securityHeaderRule("Content-Security-Policy"),
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
