import type { Metadata } from "next";
import { canonicalUrl } from "./policy";

// next.config.ts computes this non-secret boolean from trusted build identity.
// It is frozen into the build, so runtime env drift cannot change only half the policy.
export const indexingEnabled = process.env.BRIDGE_BUILD_INDEXING === "true";

export function publicPageMetadata(path: string): Metadata {
  return {
    alternates: { canonical: canonicalUrl(path) },
    robots: { index: indexingEnabled, follow: indexingEnabled },
  };
}
