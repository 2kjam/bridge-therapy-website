# Netlify staging deployment and live SEO verification

Audit date: October 10, 2026

## Final status

| Area | Result |
| --- | --- |
| Staging public access | **ENABLED** |
| Staging indexing protection | **PASS** |
| Live SEO verification | **PASS** |
| Production cutover ready | **NO** |

No application build was deployed in this task. No DNS, domain alias, Git, environment variable, indexing, or production-site setting was changed.

## Site identity and deployment

**PASS**

- Repository/branch: `https://github.com/2kjam/bridge-therapy-website.git`, `main`
- Netlify site: `bridge-therapy-website`
- Site UUID: `1c0ce777-b889-4f6b-8292-ef7590a4a25e`
- Staging hostname: `https://bridge-therapy-website.netlify.app/`
- Published deploy: `6aca6d31ece4b70008db5c9f`
- Published commit: `b99036fdd5409c0bc91d25e69f6cc20f99cfd05d`
- Deploy state: `ready`
- Netlify Git source: `2kjam/bridge-therapy-website`, branch `main`
- Custom, branch, and preview domains: none
- Domain aliases: none

The production hostname is not attached to this Netlify project.

## Security and privacy gate

**PASS**

- No tracked environment, credential, secret, patient, submission, database, private-key, source-map, admin, or debug artifacts were found by the filename audit.
- No suspicious public artifact was found among 229 public files.
- Content scanning found no credential, API-key, bearer-token, private-key, real-inquiry, or private-client data. Patient-language matches were preserved public article content.
- Netlify's deploy scan covered 542 files and found no secret match.
- No private development or administrative route was found.
- No form submissions were opened or read.

## Indexing gate before removal

**PASS**

- Phase 2 fail-closed and built-response tests passed 11/11.
- All 54 local staging routes emitted HTML `noindex, nofollow`.
- The Netlify host guard supplied `X-Robots-Tag: noindex, nofollow` and blocked the staging sitemap.
- Netlify environment inventory contained only `NODE_VERSION`.
- `BRIDGE_ENABLE_INDEXING` and `BRIDGE_PRODUCTION_SITE_ID` were absent, so staging cannot meet production activation conditions.
- No environment setting was displayed or changed.

## Password protection

**PASS**

Netlify initially reported `has_password: true`, `password_context: all`. After the gates passed, only the site password field for UUID `1c0ce777-b889-4f6b-8292-ef7590a4a25e` was cleared through Netlify's `updateSite` API. Netlify confirmed `has_password: false` while retaining the same deploy and commit. No build was triggered.

## Public access and noindex

**PASS**

- The staging homepage now returns `200 OK` over HTTPS; the former `401` is gone.
- All 54 inventoried content routes return `200`.
- All 54 return `X-Robots-Tag: noindex, nofollow`.
- All 54 contain exactly one robots meta tag with `noindex, nofollow`.
- No content route permits indexing.
- Protection exists in both HTML and the response header and does not rely on `robots.txt` alone.

The password-restoration contingency was not needed because every live content response remained nonindexable.

## Redirects

**PASS**

Both slash variants passed for all five approved mappings. All 10 requests returned one `301` to the approved location followed by `200`, with no loop or additional hop.

| Legacy route | Destination |
| --- | --- |
| `/what-we-believe/` | `/christian-counseling-tyler/` |
| `/our-story/` | `/about/` |
| `/meet-the-team/` | `/therapists/` |
| `/schedule-an-apointment/` | `/contact/` |
| `/news/` | `/blog/` |

## Canonicals and descriptions

**PASS**

- All 54 routes have exactly one canonical.
- Every canonical uses `https://www.thebridgetherapy.com`, matches its route, and has the approved trailing slash.
- No canonical contains the staging host, localhost, or a query string.
- All 54 descriptions are present, nonempty, unique, and plain text.
- The seven Batch 1 description corrections are deployed.

## Structured data

**PASS**

All deployed JSON-LD parsed successfully and used production URLs.

- Homepage: Organization/LocalBusiness and WebSite.
- Services: 18 Tyler counseling Service entities plus statewide Online Therapy, 19 total. This explains the raw total of 19 when the launch requirement refers to 18 Tyler services.
- Therapists: 10 therapist Person/ProfilePage entities.
- Kalynne: one additional Person/ProfilePage, identified only as Office Manager and absent from the therapist collection. This explains the sitewide raw Person total of 11.
- Articles: 19 BlogPosting entities.
- NES: Erin Young is the sole counselor reference.
- No invented prices, ratings, staging URLs, or localhost URLs were found.

## Robots and sitemap

**PASS**

- `/robots.txt`: `200`, header `noindex, nofollow`, with `Allow: /` and `Disallow: /sitemap.xml`.
- `/sitemap.xml`: intentional `404` with header `noindex, nofollow`.

This matches the documented staging policy. Production sitemap/indexing behavior remains disabled.

## Blog and assets

**PASS**

- All 19 migrated articles return `200` with the expected title, author, original publication date, and production canonical.
- No article redirected unexpectedly.
- 106 unique same-origin image assets referenced by the 54 pages were requested; 106/106 returned `200`.
- Browser checks found no broken visible image at 375, 390, 768, or 1440 pixels.
- Closed mega menus did not download hidden therapist portraits.
- Blog requested optimized presentation thumbnails rather than preserved originals.
- Grief remains within the 250,000-byte main-image budget; NES integrity metadata passed the complete local image suite.

The mobile lab probe measured CLS at approximately `0.122` on Home, Anxiety, Blog, and Contact. This is above the commonly used `0.10` good threshold and should be investigated before cutover. No field Core Web Vitals claim is made.

## Contact form

**PASS for configuration and validation; submission UNVERIFIED**

- Form: `bridge-contact-inquiry`, `POST`, action `/__forms.html`.
- Required: first name, last name, email.
- Hidden: `form-name`, `source_page`, `inquiry_source`.
- Honeypot: `bot-field`.
- Netlify confirms registration with the expected fields and honeypot.
- Erin query-string preselection passed at all four viewport widths.
- Local client-validation and mocked success/error tests passed.

No live submission was sent because no staging-only delivery path isolated from real inboxes or client records was established.

## Chatbot, navigation, and responsive behavior

**PASS without submission**

At 375, 390, 768, and 1440 pixels:

- Home, Contact, Kalynne, Anxiety, Blog, and Therapists loaded without horizontal overflow or broken controls.
- Mobile navigation opened and closed correctly.
- Counseling Services, therapist, and Resources menu image/loading checks passed.
- Keyboard interaction and Escape dismissal passed.
- Homepage therapist-carousel controls moved the carousel.
- The chatbot loaded, opened, accepted a name, advanced to email, and produced no page-level JavaScript error.
- No chatbot or Contact inquiry was submitted.

## Security headers

**PARTIAL PASS**

Present: HTTPS, strong HSTS, `X-Content-Type-Options: nosniff`, and staging `X-Robots-Tag`.

Absent from the inspected application response:

- Content-Security-Policy
- Referrer-Policy
- Permissions-Policy
- X-Frame-Options or equivalent CSP `frame-ancestors`

These hardening gaps were reported without changing headers or CSP.

## Production protection

**PASS**

After password removal and live verification, `www.thebridgetherapy.com` still resolves by CNAME to `ext-cust.squarespace.com` and returns `200 OK` with `Server: Squarespace`. It remains absent from the Netlify site's aliases and custom-domain fields. Production content, DNS, indexing, sitemap, and configuration were unchanged.

## Remaining launch blockers

1. Resolve uncertain historical URLs and obtain the Google Search Console history identified in the Phase 1 and readiness reports.
2. Review the missing CSP, Referrer-Policy, Permissions-Policy, and framing protection in a separately scoped security change.
3. Investigate the approximately `0.122` mobile lab CLS.
4. Establish an approved isolated form-delivery test if end-to-end submission verification is required.
5. Complete a separately authorized production-domain, DNS, and indexing activation process.

The SEO infrastructure passed live staging verification, but production cutover is not yet recommended.
