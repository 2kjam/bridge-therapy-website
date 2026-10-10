# SEO migration — Phase 2 preparation

Prepared 2026-10-10. Local implementation and local production simulation only. No push, deploy, DNS/domain changes, hosted environment changes, or live indexing activation.

## Existing configuration audited

Next.js 16.3.5 App Router uses trailingSlash:true. The root layout supplied noindex,nofollow; individual pages supplied titles/descriptions but no canonicals. No authored robots.txt, sitemap, X-Robots-Tag rule, public/_headers, or alternate SEO implementation was found. Netlify builds with npm run build, publishes .next, and uses Node 24 plus the Next adapter. Existing redirect rules were audited in next.config.ts, netlify.toml, and the Phase 1 Edge Function. Reviewed SEO-MIGRATION-PHASE-1.md and content/seo/phase-1-url-map.json.

The active filesystem has 35 static content pages and one catch-all article implementation generating 19 reviewed article paths: **54 public content URLs**. This includes **19 services**, not the 18 assumed in the request (18 counseling service pages plus Online Therapy). The other static pages are Home, About, Contact, therapist directory, Blog, 10 therapist profiles, and Kalynne's public office-manager profile. Kalynne is already a linked public staff page and is included without changing her role or presentation.

No root .env files or indexing/deployment variables were found in the current process. Hosted Netlify environment settings, deployment access control, and the final production site identity were not available for verification. An existing local Netlify link is not authorization or proof of production identity. The production gate therefore remains **false**. The earlier standalone SEO audit and GSC exports remain outstanding from Phase 1.

## Canonicals and content inventory

Every reviewed public page receives exactly one absolute canonical under https://www.thebridgetherapy.com with a trailing slash. Static pages add only a metadata helper import and metadata spread; the article metadata function uses the existing post.legacyPath. No request headers, queries, hostnames, dates, or user input construct these URLs. The helper rejects absolute URLs, queries, fragments, duplicate slashes, dot traversal, and encoded paths. Canonicals are not inherited from the root, so unknown/404 pages do not accidentally canonicalize to Home. The root retains noindex,nofollow as its fallback.

content/seo/public-pages.json is the reviewed static inclusion list; lib/seo/inventory.ts combines it with the existing getBlogPosts() data. Tests independently enumerate app/**/page.tsx and require exact inventory agreement. New pages require deliberate review of this list and page metadata; they are not silently added to the sitemap.

| Group | URLs |
|---|---:|
| Core pages (Home, About, Contact, therapist directory, Blog) | 5 |
| Therapist profiles | 10 |
| Public staff profile | 1 |
| Service pages, including Online Therapy | 19 |
| Preserved articles | 19 |
| Total production sitemap | **54** |

All included paths (origin is always https://www.thebridgetherapy.com):

- /
- /about/
- /adhd-counseling-tyler/
- /adoption-counseling-tyler/
- /anxiety-counseling-tyler/
- /blog/
- /child-teen-counseling-tyler/
- /christian-counseling-tyler/
- /contact/
- /depression-counseling-tyler/
- /divorce-blended-family-counseling-tyler/
- /emdr-therapy-tyler/
- /family-counseling-tyler/
- /grief-counseling-tyler/
- /individual-counseling-tyler/
- /life-transitions-counseling-tyler/
- /marriage-counseling-tyler/
- /news/2019/1/2/big-news/
- /news/2019/11/30/simple-ways-to-lower-stress-during-the-holidays/
- /news/2019/2/3/traumatic-memories-and-treatment/
- /news/2019/5/21/storm-anxiety/
- /news/2021/12/8/screen-time-recommendations/
- /news/2021/4/11/the-bridge-community-spotlight-featuring-beth-reed-with-sightorg/
- /news/2026/1/18/emdr-therapy-for-trauma-and-ptsd-in-tyler-tx/
- /news/2026/1/18/how-emdr-therapy-helps-heal-trauma-and-ptsd/
- /news/2026/1/18/is-emdr-therapy-safe-and-effective/
- /news/2026/1/18/what-is-emdr-therapy-and-how-does-it-work/
- /news/2026/1/18/what-to-expect-in-emdr-therapy-sessions/
- /news/2026/1/19/anxiety-therapy-in-tyler-tx/
- /news/2026/1/19/anxiety-therapy-vs-medication-whats-the-difference/
- /news/2026/1/19/can-emdr-be-integrated-with-christian-counseling/
- /news/2026/1/19/emdr-therapy-for-anxiety-panic-and-trauma-responses/
- /news/2026/1/19/what-is-anxiety-therapy/
- /news/2026/8/21/how-to-calm-an-anxious-mind-learning-to-quiet-your-soul-with-god/
- /news/navigating-life-transitions/
- /news/take-heart/
- /non-epileptic-seizures-counseling-tyler/
- /online-therapy-texas/
- /parenting-support-tyler/
- /pregnancy-postpartum-counseling-tyler/
- /premarital-counseling-tyler/
- /staff/kalynne-arrick/
- /therapists/
- /therapists/alyxandrah-white/
- /therapists/denise-santos/
- /therapists/erin-young/
- /therapists/jennifer-wood/
- /therapists/jill-kirkley/
- /therapists/kelley-bell/
- /therapists/kim-gonzales/
- /therapists/misty-shultz/
- /therapists/sarah-bell/
- /therapists/sarah-critzman/
- /trauma-therapy-tyler/

Excluded: the five Phase 1 redirect sources; index.html aliases; /children-families/; unresolved /programs/, /job-postings/, /about-us-bedford/, /cart/; tag/author/feed archives; unknown article paths; 404 responses; robots.txt and sitemap.xml themselves; Next internal assets/routes; source snapshots and other repository files; query/slash duplicates. No preview-only or API content page was found. Unknown utility routes remain 404 and noindex. No arbitrary private URL was invented for robots exclusions.

## Environment safeguards and future production switch

lib/seo/policy.ts requires **all** of these trusted build conditions:

- BRIDGE_ENABLE_INDEXING equals the literal true string.
- NODE_ENV=production and NETLIFY=true; Next must be in its production build/server phase, never the development server.
- CONTEXT=production, with no NETLIFY_PREVIEW_SERVER or REVIEW_ID and PULL_REQUEST not true.
- URL equals exactly https://www.thebridgetherapy.com (no trailing slash, query, or alternative origin).
- BRIDGE_PRODUCTION_SITE_ID is a UUID and equals Netlify's SITE_ID.

The two BRIDGE inputs must later be set by an authorized owner for the production deployment's **Builds scope and production context only**. Nothing is enabled in netlify.toml or a .env file. Missing, malformed, or conflicting values fail closed. Neither NODE_ENV nor URL alone can activate indexing. No secret is required. next.config.ts derives and inlines only the non-secret boolean BRIDGE_BUILD_INDEXING; an externally supplied value of that internal boolean is ignored. Metadata, robots, and sitemap share this frozen build decision. Changing configuration requires a fresh build; do not promote an old artifact and assume runtime settings change its metadata.

netlify/edge-functions/indexing-guard.js supplies a second, deny-only boundary. For any request origin other than the exact HTTPS production origin it sets X-Robots-Tag:noindex,nofollow, overrides robots.txt with the staging version, and returns an empty 404 for sitemap.xml. This covers staging, branch deploys, deploy previews, deploy permalinks, localhost, alternate domains, and HTTP. It never sets index/follow, removes noindex, trusts forwarded headers, or builds a redirect. A request matching the production origin merely proceeds to the independent build policy. Thus manipulating request data cannot activate indexing.

The guard is declared once in netlify.toml and wraps the existing inline legacy-news handler. Four static Phase 1 rules and the news handler remain unchanged. The guard modifies only response headers on ordinary pages; it does not rewrite their HTML or interfere with forms, cookies, navigation, or response status. A production-build alias may contain index,follow in its HTML, but its effective policy remains noindex,nofollow through the stricter HTTP header. Branch/preview builds themselves still have noindex,nofollow in both HTML and headers.

## Robots and sitemap behavior

| Environment | HTML robots | X-Robots-Tag | robots.txt | sitemap.xml |
|---|---|---|---|---|
| Default/local staging Next build | noindex, nofollow | noindex, nofollow on all responses | Allow /; Disallow /sitemap.xml; no Sitemap line | 200, empty XML urlset, zero production URLs |
| Netlify noncanonical host, even with a production artifact | staging build noindex; production artifact may say index, overridden by header | noindex, nofollow | Same staging rules | Empty 404, no-store |
| Explicitly verified production build at approved host | index, follow on reviewed pages | No blocking header on public HTML; noindex on robots/sitemap resources themselves | Allow / and canonical Sitemap line | 200 XML, exactly 54 entries |
| Unknown content route | noindex fallback/Next 404 metadata | Additional noindex in staging | No sitemap entry | 404, no canonical |

Staging robots deliberately allows crawling of HTML so crawlers can see noindex; it does **not** use Disallow:/ or the unsupported robots.txt noindex directive. Sitemap discovery is suppressed. This resolves the conflict between blocking crawling and making noindex observable. [Google's guidance](https://developers.google.com/search/docs/fundamentals/get-started-developers) explains this distinction. For stronger protection, enable Netlify deployment/password/team access control on review deployments after owner review; robots rules are not access control and do not bind hostile crawlers. Access control was not changed during this task.

The production sitemap uses the App Router sitemap.ts convention and contains no lastmod, priority, or changefreq. Publication dates are preserved but are not reliable modification dates; filesystem checkout timestamps are also unsuitable. No date was fabricated. The robots.ts route advertises only https://www.thebridgetherapy.com/sitemap.xml after activation. CSS and JavaScript remain crawlable for rendering.

## Redirect and article compatibility

| Source, both slash variants | Final canonical destination | Result |
|---|---|---|
| /what-we-believe | https://www.thebridgetherapy.com/christian-counseling-tyler/ | 301 → 200 |
| /our-story | https://www.thebridgetherapy.com/about/ | 301 → 200 |
| /meet-the-team | https://www.thebridgetherapy.com/therapists/ | 301 → 200 |
| /schedule-an-apointment | https://www.thebridgetherapy.com/contact/ | 301 → 200 |
| /news | https://www.thebridgetherapy.com/blog/ | 301 → 200 |

No new redirect chain, loop, open redirect, or homepage fallback was introduced. Every canonical destination is a direct local 200 with no Location header. Slashless content URLs retain Next's 308 to the one trailing-slash destination. All 19 dated/undated article paths remain their own pages, with 308 normalization then 200. Article bodies, titles, dates, author attribution, images, source snapshots, and old body links are unchanged. Existing unresolved archives still return 404. The pre-existing /children-families slashless two-hop chain remains recorded in Phase 1 and was not altered.

## Netlify-specific verification boundary

Official references: [build identity variables](https://docs.netlify.com/build/configure-builds/environment-variables/), [Edge Function declaration order](https://docs.netlify.com/build/edge-functions/declarations/), and [response handling](https://docs.netlify.com/build/edge-functions/api/). Installed Next metadata, robots, sitemap, env, and headers guides were read before implementation.

User-declared netlify.toml edge functions run before user inline functions. Framework-generated functions can run earlier, so the final generated adapter configuration and real CDN responses must be inspected at the later authorized staging deployment. No broad Netlify _headers rule was added: those do not cover every dynamic response and an unconditional noindex could block the eventual live domain. The guard needs no runtime environment variables (netlify.toml build variables are not automatically Edge runtime variables).

Local validation uses the actual Edge Function handlers and Netlify's installed redirect engine ahead of a real Next production server. This verifies application responses, guard logic, redirect statuses, and precedence modeled from authored rules; it is not a deployed CDN/Deno execution test. A fresh Phase 2 Netlify Dev --offline attempt started Next successfully, then failed during Edge Functions environment setup with fetch failed, matching the Phase 1 runtime-download limitation (test-results/seo2-netlify-dev.log). Hosted adapter/header behavior, hostname cache separation, TLS/domain configuration, deployment protection, and search-engine observations remain launch acceptance checks. No local test is represented as a production deployment.

## Files created or changed in Phase 2

Created:

- app/robots.ts; app/sitemap.ts.
- lib/seo/policy.ts; lib/seo/metadata.ts; lib/seo/inventory.ts.
- content/seo/public-pages.json.
- netlify/edge-functions/indexing-guard.js.
- tests/seo-policy.test.mjs; tests/seo-metadata.test.mjs.
- SEO-MIGRATION-PHASE-2.md (this report).

Changed:

- All 35 static app page.tsx files listed in the inventory: metadata helper only.
- app/news/[...slug]/page.tsx: canonical/indexing metadata only.
- app/layout.tsx: explanatory fallback comment only; noindex stays in place.
- next.config.ts: derived indexing flag and response headers; redirects and trailingSlash unchanged.
- netlify.toml: indexing guard declaration only relative to Phase 1.
- scripts/seo-local-preview.mjs: includes the actual indexing guard in the local pipeline.
- scripts/check-site.mjs, tests/blog.test.mjs, tests/blog-collection.test.mjs: replace obsolete canonical-absence checks with exact singleton production canonical assertions. Existing staging, content, image and integrity assertions retained.
- tests/seo-migration.test.mjs: exact destination-canonical agreement assertion added.

Pre-existing uncommitted Phase 1 report/map/MIGRATION.md changes remain intact. No package/dependency, CSS, component, content/blog, service image, service-image manifest, contact logic, chatbot, title, H1, therapist mapping, or profile-body changes. All 36 page implementation files were compared against HEAD with only the introduced metadata lines removed; content matched exactly (line endings normalized).

## Validation results

| Check | Result |
|---|---|
| npm run check | Pass; structural checker reports 73 checked page records (54 content URLs plus the 19 slashless article aliases, not 73 unique sitemap entries) |
| npm run lint | Pass |
| npx eslint netlify/edge-functions/*.js | Pass |
| npm run build, staging | Pass initially and again after production simulation; final artifact is staging |
| npm run build, simulated production | Pass; temporary child-process test identity only, no hosted settings changed |
| git diff --check | Pass |
| node --test tests/seo-policy.test.mjs | 4 passed; includes missing/malformed identity, development/preview rejection, canonical input validation, alias guard and spoofed headers |
| node --test tests/seo-metadata.test.mjs, staging HTTP | 6 passed; all 54 pages, slash normalization, singleton canonical/meta, headers, queries, 404s, empty sitemap, robots and real artifact alias protection |
| Same HTTP suite, simulated production | 6 passed; all 54 pages index/follow, complete sitemap, intended robots, unknown404, and real artifact alias protection |
| node --test tests/seo-migration.test.mjs via local Netlify engine | 4 passed; both forms of five moves, exact canonical destinations, unresolved routes, all 19 article URLs |
| node --test tests/blog.test.mjs tests/blog-collection.test.mjs | 24 passed; all original articles and source/image hashes preserved |
| npm run test:navigation | 97 passed, 1 existing mobile desktop-hover skip; includes full service-image budgets/hashes/dimensions and responsive checks |
| npx playwright test --config=playwright.blog.config.ts | 27 passed, 5 existing duplicate-mobile layout/Vimeo skips |
| Existing migration route/legacy URL browser tests, desktop and mobile | 4 passed, using isolated localhost3012 config in ignored test-results |
| Protected source/content comparison | Pass; no non-metadata page changes and no diff in components/public/content/blog/service-image manifest |
| Full Netlify Dev/Deno | Blocked at Edge runtime setup: fetch failed; no CDN verification claimed |

No application test failed and no new skips were introduced. The browser runners finished their tests but waited for Windows-managed web-server teardown; only the task-owned servers were stopped, after which both runners returned exit 0 and their final summaries. Next logged Internal:NoFallbackError when requesting an unknown catch-all article; an isolated repeat confirmed the actual response is the intended 404 with no canonical, not a 500. This diagnostic was not suppressed. Node's existing module-type warning is informational; package module mode was not changed.

Detailed logs and browser evidence are under ignored test-results/seo2-*.json, test-results/navigation and test-results/blog. The final .next artifact was rebuilt in fail-closed staging mode and revalidated: all 54 HTML pages have noindex,nofollow, the sitemap has zero entries, and robots advertises no sitemap. The final build deliberately supplied only BRIDGE_BUILD_INDEXING=true to verify that this internal flag cannot bypass the trusted gate; next.config recomputed false. No activation variables were written to files, the parent environment, or Netlify. The temporary simulated identity existed only in a child build process and used a dummy UUID. Task-owned local servers were stopped after verification.

## Later production launch procedure — not executed

1. Obtain owner authorization and the outstanding Phase 1 URL decisions, standalone audit and GSC baseline/exports. Confirm all 54 reviewed content pages belong on the live domain, including Kalynne and Online Therapy. Preserve a rollback artifact and Squarespace URL records.
2. Identify the exact production Netlify site UUID and confirm ownership, repository/branch, adapter version, HTTPS www domain mapping, and canonical origin. Do not infer production from the staging site's production deploy context. Do not manually override Netlify's read-only identity variables.
3. While BRIDGE_ENABLE_INDEXING is absent/false, perform an authorized staging deployment and check raw headers/HTML on every public path, a 404, all five redirects, robots and sitemap, including preview/branch/permalink/custom review hostnames. Confirm the indexing guard is in the generated Edge manifest and executes before responses escape; check CDN cache behavior across hosts. Enable appropriate staging access control. Resolve any adapter failure before launch.
4. Only during the separately approved launch window, configure BRIDGE_PRODUCTION_SITE_ID to the verified UUID and BRIDGE_ENABLE_INDEXING=true in the production site's Builds scope, production context only. Confirm NETLIFY=true, CONTEXT=production, NODE_ENV=production, URL exactly https://www.thebridgetherapy.com, SITE_ID matching, and no preview markers. Do not set these on staging or globally across contexts.
5. Build a fresh artifact. Verify public HTML index,follow; exact singleton slash canonicals; robots Allow / and canonical sitemap; 54 unique sitemap URLs with direct 200 destinations; no blocking production X-Robots-Tag on HTML; unknown pages404/noindex/no canonical; and preview aliases still noindex with no exposed sitemap. The project's default check and preservation suites intentionally assert staging safety: run those on a staging build; use the explicit simulated-production SEO suite to validate the launch artifact.
6. Carry out the domain/DNS cutover only under that later authorization, and verify actual public HTTPS responses immediately. Confirm no inherited Netlify/dashboard/CDN noindex header or access control blocks the live domain. Confirm HTTP/apex aliases reach the chosen www origin as intended; this phase does not create domain redirects. Re-run the old-URL map and all 19 articles on the live host.
7. Submit the canonical sitemap in the existing GSC property only after successful live verification. Inspect representative pages and legacy URLs; monitor indexing, selected canonicals, 404s, clicks and backlinks. Do not request indexing of staging. If acceptance fails, follow the approved rollback plan; removing the indexing flag alone requires rebuilding and redeploying to change the artifact.

## Remaining decisions and risks

The production Netlify UUID and dashboard environment/access-control configuration are unverified. No activation values were guessed or persisted. A person with trusted build access can intentionally change policy; environment gates do not authenticate DNS or replace launch approval. Netlify aliases must retain the guard when promoting or rolling back an artifact. Older artifacts that lack it are unsuitable for launch. Confirm platform behavior against the actual adapter before activation.

Canonical tags on staging point to the intended future live URLs, some of which the current Squarespace site may not yet serve. This is preparation, not evidence those paths currently return 200 on Squarespace. Staging remains noindex and publishes no production discovery sitemap. Search engines must crawl a URL to observe noindex; access control is stronger protection.

Phase 1 unresolved programs, jobs, tag/author archives, about-us-bedford, cart and feed decisions remain unchanged. GSC historical page/indexing/link exports, Squarespace URL mappings and hidden/unlisted pages, analytics/referrals/logs, and the missing prior audit are still needed to improve coverage. This phase did not invent replacement URLs or add structured data.
