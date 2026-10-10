# Security headers hardening report

Prepared: October 10, 2026

Status: **implemented and enforced locally; deployment verification required**

No code was pushed or deployed. DNS, Netlify environment variables, staging indexing, and the production Squarespace website were unchanged.

## Existing deployed headers

The public Netlify staging homepage was inspected before this batch.

| Header | Existing result |
| --- | --- |
| Content-Security-Policy | Missing |
| Strict-Transport-Security | `max-age=31536000; includeSubDomains; preload` from Netlify |
| X-Content-Type-Options | `nosniff` from Netlify |
| Referrer-Policy | Missing |
| Permissions-Policy | Missing |
| X-Frame-Options | Missing |
| Cross-Origin-Resource-Policy | Missing |
| Cross-Origin-Opener-Policy | Missing |
| X-Robots-Tag | `noindex, nofollow` on staging |

No duplicate or conflicting application header source existed. `next.config.ts` supplied staging `X-Robots-Tag`; the Netlify indexing Edge Function enforced it on noncanonical hosts and synthesized staging robots/sitemap responses. There was no `public/_headers`, middleware/proxy, CSP, or competing security-header block.

HSTS remains owned by Netlify. The application does not duplicate or strengthen it because ownership and HTTPS readiness of every possible subdomain were not established in this batch.

## Files changed

- `lib/security-headers.mjs`: shared CSP, headers, Next.js rule, and Edge response applicator.
- `lib/security-headers.d.mts`: TypeScript declarations for the shared module.
- `next.config.ts`: applies the shared enforced headers to every Next.js path.
- `netlify/edge-functions/indexing-guard.js`: applies the same headers to upstream, redirect, error, robots, and sitemap responses while preserving staging noindex.
- `tests/security-headers.test.mjs`: CSP syntax, uniqueness, enforcement, Edge, robots/sitemap, and redirect tests.
- `tests/security-headers.spec.ts`: HTML/asset/error header checks plus form, chatbot, navigation, CSP-violation, and Vimeo browser checks.
- `SECURITY-HEADERS-REPORT.md`: this report.

The pre-existing uncommitted `SEO-NETLIFY-STAGING-VERIFICATION.md` remains unchanged by this batch.

## Final header values

```text
Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-src https://player.vimeo.com; manifest-src 'self'; worker-src 'self' blob:; upgrade-insecure-requests
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=(), fullscreen=(self "https://player.vimeo.com")
X-Frame-Options: DENY
Cross-Origin-Resource-Policy: same-origin
Cross-Origin-Opener-Policy: same-origin
```

Staging continues to receive:

```text
X-Robots-Tag: noindex, nofollow
```

## CSP rationale

- `default-src 'self'`: same-origin fallback.
- `base-uri 'self'`: prevents hostile base URL injection.
- `object-src 'none'`: blocks plugin objects.
- `frame-ancestors 'none'` plus `X-Frame-Options: DENY`: prevents unauthorized framing.
- `form-action 'self'`: permits the same-origin Netlify Forms endpoint and no external submission target.
- `script-src 'self' 'unsafe-inline'`: permits self-hosted Next.js bundles and the inline Next.js hydration payload. It does not permit `unsafe-eval`, wildcards, or third-party script origins.
- `style-src 'self' 'unsafe-inline'`: permits local stylesheets and existing inline style attributes.
- `img-src 'self' data: blob:`: permits local site images and safe local data/blob image use.
- `font-src 'self'`: local fonts only.
- `connect-src 'self'`: same-origin Contact and chatbot form requests only.
- `frame-src https://player.vimeo.com`: the sole verified embedded origin, used by the preserved Storm Anxiety article.
- `manifest-src 'self'` and `worker-src 'self' blob:`: narrow application capabilities.
- `upgrade-insecure-requests`: upgrades accidental HTTP subresource requests under enforcement.

Active code and all 19 rendered article bodies were inventoried. Google Maps, CBS19, NIMH, AACAP, VA, Sight.org, and the production domain appear only as outbound links; they require no CSP source allowance. No wildcard or unverified third-party origin was added.

## Nonce/hash tradeoff

The installed Next.js 16.3.5 guidance states that per-request nonces require dynamic rendering. Applying them would convert all 54 statically generated content pages to dynamic responses, disable their current static/CDN optimization, and materially change runtime behavior. Experimental SRI was not introduced in a security hardening batch.

The practical static-site policy therefore retains `unsafe-inline` for scripts and styles. This is limited to the Next.js hydration payload and existing inline presentation styles, excludes `unsafe-eval`, and keeps all script origins same-origin. Moving to nonce-based scripts would require a separately reviewed rendering and performance migration.

## Report-only validation

The complete policy was first built as `Content-Security-Policy-Report-Only` and exercised in Edge at 375, 390, 768, and 1440 pixels on:

- Homepage
- Contact
- Counseling Services navigation
- therapist profile
- Blog index
- Storm Anxiety migrated article and Vimeo iframe

Results:

- No Bridge document `securitypolicyviolation` event.
- No required local script, stylesheet, image, font, connection, form action, or frame was reported as blocked.
- Navigation, client validation, chatbot progression, and layouts remained functional.
- The browser noted that `upgrade-insecure-requests` is ignored in report-only mode, as expected; it becomes active only under enforcement.
- Vimeo produced internal `401` resource messages from within its third-party player, but the allowed iframe loaded and the existing independent playback test passed. These were not Bridge CSP violations and did not justify broader allowances.
- No violation reporting endpoint was added, avoiding transmission of browsing or inquiry context to a third party.

## Enforcement status

**Content-Security-Policy is enforced in the local implementation.** `Content-Security-Policy-Report-Only` is absent from the final configuration.

After switching to enforcement, browser checks again found zero Bridge CSP violations at 375, 390, 768, and 1440 pixels. Required resources, form validation, chatbot flow, menus, responsive layouts, and the Vimeo frame remained available.

## Netlify compatibility

Next.js owns headers for generated HTML, public assets, and Next-handled 404 responses through one shared rule. The existing Netlify Edge guard imports the same policy and uses `Headers.set`, producing one final value while covering:

- normal upstream responses;
- Netlify/Next redirects passed through the guard;
- 404/error responses;
- synthesized staging `/robots.txt`;
- synthesized staging `/sitemap.xml` denial.

The Edge wrapper continues to set `X-Robots-Tag` independently, so the shared header application cannot remove staging noindex. Redirect tests confirm status and `Location` are preserved.

Netlify Forms receives same-origin POSTs to `/__forms.html`, allowed by both `form-action 'self'` and `connect-src 'self'`. Actual CDN/Edge header distribution must be reconfirmed after a separately authorized deployment.

## Contact form compatibility

**PASS with mocked delivery.** Existing fields, validation, therapist preselection, hidden fields, honeypot, payload, source tracking, and success/error behavior are unchanged. The browser regression covered all ten therapist contexts and four widths. Requests were intercepted or mocked; no real inquiry or mail was sent.

## Chatbot compatibility

**PASS with mocked delivery.** Welcome timing, avatar, transcript, validation, automatic therapist context, retry behavior, restart behavior, focus/Escape behavior, payload, storage privacy, and four responsive widths passed. No real submission was sent.

## Blog and Vimeo compatibility

**PASS.** All 19 preservation tests passed and article bodies were unchanged. Local images remain same-origin. The only iframe remains the exact approved Vimeo player URL. The existing desktop playback test advanced the video successfully under enforced CSP.

## Staging indexing protection

**PASS locally.** SEO policy/built-response tests confirm HTML `noindex, nofollow`, Edge `X-Robots-Tag`, staging robots behavior, and staging sitemap denial. Security headers are additive and do not overwrite `X-Robots-Tag`. Canonicals, metadata, JSON-LD, routes, titles, H1s, redirects, robots, and sitemap content were not changed.

## Privacy findings

- No analytics, monitoring, CSP reporting, or new third-party script was added.
- `connect-src 'self'` prevents browser scripts from sending inquiry data to arbitrary third parties.
- `form-action 'self'` prevents form submission to an external origin.
- Contact and chatbot code does not log names, email addresses, phone numbers, messages, or chatbot responses.
- CSP validation used synthetic local values and mocked requests.

## Browser results

- Security-header suite: 4/4 passed across desktop and mobile projects.
- Navigation suite: 15/15 passed, including 375, 390, 768, 900, 1024, 1100, 1280, and 1440 pixels.
- Contact inquiry browser regression: passed at 375, 390, 768, and 1440 pixels; no mail sent.
- Chatbot browser regression: passed at the four required widths; all network outcomes mocked.
- Vimeo availability/playback: 1/1 passed.
- No new Bridge CSP violation, page error, horizontal overflow, or broken required resource was observed.

## Automated validation

| Check | Result |
| --- | --- |
| `npm run check` | PASS; 73 pages |
| `npm run lint` | PASS |
| `npm run build` | PASS; 58 static/SSG framework routes |
| Security unit tests | PASS; 5/5 after final redirect assertion |
| SEO, structured data, blog, inquiry, image, and security node suites | PASS; 52/52 before the final additional redirect assertion |
| Focused security browser tests | PASS; 4/4 |
| Navigation browser tests | PASS; 15/15 |
| Contact browser regression | PASS |
| Chatbot browser regression | PASS |
| Vimeo playback | PASS; 1/1 |

Final whitespace validation and the focused redirect/security rerun passed after report creation.

## Remaining security risks

1. Static Next.js hydration requires `script-src 'unsafe-inline'`; a nonce migration would improve script injection resistance but requires dynamic rendering and performance review.
2. `style-src 'unsafe-inline'` remains for existing inline styles. Removing it requires inventorying and refactoring presentation attributes.
3. HSTS is supplied by Netlify and currently includes subdomains/preload. Domain-wide ownership and HTTPS readiness were outside this batch, so the application does not duplicate or alter it.
4. Vimeo is a necessary third-party frame and retains its own network/privacy behavior. No Vimeo script executes in the parent origin.
5. Browser compatibility for COOP, CORP, Permissions-Policy, and CSP should be checked again on the deployed Netlify runtime.

## Exact deployed verification required later

After an authorized staging deployment, request actual Netlify responses for:

1. `/`, `/contact/`, a therapist page, a service page, `/blog/`, the Storm Anxiety article, and an unknown route.
2. `/assets/ivory-logo.svg`, one font, one service image, and one Next.js static chunk.
3. `/robots.txt`, `/sitemap.xml`, and both slash variants of all five approved legacy redirects.
4. Confirm exactly one enforced CSP, no report-only CSP, all six additional security headers, and unchanged staging `X-Robots-Tag`.
5. Repeat Contact validation, mocked chatbot behavior, navigation, carousel, responsive overflow, and Vimeo playback while watching the browser console and network panel for CSP blocks.
6. Confirm the production Squarespace domain and DNS remain unchanged.

This task does not authorize that deployment.
