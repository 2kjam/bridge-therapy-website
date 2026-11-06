// A GTM container ID is public configuration, never an API secret.
export const GOOGLE_TAG_MANAGER_ID = "GTM-W4PHT6RP";
export const GOOGLE_TAG_MANAGER_SRC =
  `https://www.googletagmanager.com/gtm.js?id=${GOOGLE_TAG_MANAGER_ID}`;

// Remains off until the container, consent behavior and CSP have been reviewed.
// Set only in a reviewed deployment context, never from a request/query string.
export function googleTagEnabled(env) {
  return env.BRIDGE_ENABLE_GOOGLE_TAG === "true";
}

// Current Google installation snippet. The inline initialization is synchronous;
// the external loader is async. Never add form values or patient identifiers.
export const GOOGLE_TAG_INITIALIZATION =
  "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date());";
