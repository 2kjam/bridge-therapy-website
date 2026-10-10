// Trusted build configuration only. Nothing in a request can activate indexing.
export const PRODUCTION_ORIGIN = "https://www.thebridgetherapy.com";

export function productionIndexingAllowed(
  env: Record<string, string | undefined>,
  phase: string,
): boolean {
  return (
    ["phase-production-build", "phase-production-server"].includes(phase) &&
    env.BRIDGE_ENABLE_INDEXING === "true" &&
    env.NODE_ENV === "production" &&
    env.NETLIFY === "true" &&
    env.CONTEXT === "production" &&
    !env.NETLIFY_PREVIEW_SERVER &&
    env.PULL_REQUEST !== "true" &&
    !env.REVIEW_ID &&
    env.URL === PRODUCTION_ORIGIN &&
    /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(
      env.BRIDGE_PRODUCTION_SITE_ID ?? "",
    ) &&
    env.SITE_ID === env.BRIDGE_PRODUCTION_SITE_ID
  );
}

export function canonicalUrl(path: string): string {
  // Accept only reviewed, plain local content paths; never request URLs or origins.
  if (path !== "/" && !/^\/(?:[a-z0-9-]+\/)*[a-z0-9-]+\/?$/.test(path)) {
    throw new Error("Invalid canonical content path: " + path);
  }
  return PRODUCTION_ORIGIN + (path.endsWith("/") ? path : path + "/");
}
