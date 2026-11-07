import { applySecurityHeaders } from "../../lib/security-headers.mjs";

const goneHtml = String.raw`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>Page No Longer Available | The Bridge Therapeutic Services</title>
  <style>
    :root { color-scheme: light; font-family: Georgia, "Times New Roman", serif; background: #f7f2e8; color: #273b36; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; }
    main { width: min(42rem, calc(100% - 3rem)); padding: 4rem 0; text-align: center; }
    p:first-child { color: #826a45; font: 600 .78rem/1.4 Arial, sans-serif; letter-spacing: .14em; text-transform: uppercase; }
    h1 { margin: .6rem 0 1rem; font-size: clamp(2.25rem, 7vw, 4.5rem); font-weight: 400; line-height: 1.05; }
    p { font: 1.05rem/1.7 Arial, sans-serif; }
    a { color: #365f55; font-weight: 700; text-underline-offset: .2em; }
  </style>
</head>
<body>
  <main>
    <p>410 · Gone</p>
    <h1>This page is no longer available.</h1>
    <p>The resource at this address has been permanently retired.</p>
    <p><a href="/">Return to The Bridge homepage</a></p>
  </main>
</body>
</html>`;

export default function retiredLegacyUrl(request, context) {
  const pathname = new URL(request.url).pathname;
  if (!["/job-postings", "/job-postings/"].includes(pathname))
    return context.next();
  const headers = new Headers({
    "Content-Type": "text/html; charset=utf-8",
    "X-Robots-Tag": "noindex, nofollow",
    "Cache-Control": "no-store",
  });
  applySecurityHeaders(headers);
  return new Response(goneHtml, { status: 410, headers });
}

export const config = { path: ["/job-postings", "/job-postings/"] };
