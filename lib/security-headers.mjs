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
) {
  return {
    source: "/:path*",
    headers: [
      { key: cspHeaderName, value: contentSecurityPolicy },
      ...securityHeaders,
    ],
  };
}

export function applySecurityHeaders(headers, cspHeaderName = "Content-Security-Policy") {
  headers.set(cspHeaderName, contentSecurityPolicy);
  for (const { key, value } of securityHeaders) headers.set(key, value);
}
