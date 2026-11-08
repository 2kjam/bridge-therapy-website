export const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src https://player.vimeo.com",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

// Exact approved Analytics paths; enabled only by the trusted production build gate.
export const analyticsContentSecurityPolicy = contentSecurityPolicy
  .replace("script-src 'self' 'unsafe-inline'", "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com/gtag/js")
  .replace("img-src 'self' data: blob:", "img-src 'self' data: blob: https://www.google-analytics.com/g/collect https://region1.google-analytics.com/g/collect")
  .replace("connect-src 'self'", "connect-src 'self' https://www.google-analytics.com/g/collect https://region1.google-analytics.com/g/collect");

export const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=(), fullscreen=(self "https://player.vimeo.com")',
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

export function securityHeaderRule(
  cspHeaderName = "Content-Security-Policy",
  analyticsEnabled = false,
) {
  return {
    source: "/:path*",
    headers: [
      { key: cspHeaderName, value: analyticsEnabled ? analyticsContentSecurityPolicy : contentSecurityPolicy },
      ...securityHeaders,
    ],
  };
}

export function applySecurityHeaders(headers, cspHeaderName = "Content-Security-Policy") {
  headers.set(cspHeaderName, contentSecurityPolicy);
  for (const { key, value } of securityHeaders) headers.set(key, value);
}
