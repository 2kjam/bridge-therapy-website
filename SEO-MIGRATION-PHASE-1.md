# SEO launch migration — Phase 1 preparation

Reviewed 2026-10-09. Local implementation only. No push, deployment, domain change, indexing change, or launch action.

## Outcome and review scope

Prepared the five owner-approved permanent moves. The [machine-readable URL map](content/seo/phase-1-url-map.json) contains all 76 concrete page/query URLs found in the inspected records, each with old URL, destination (or null), exact status, rationale, source references, confidence, and observed local response chain. Its activeRoutes and articleRoutes arrays enumerate all 54 active content URLs (35 static pages and 19 original articles). Next's internal not-found response is not a content URL.

Inspected next.config.ts, netlify.toml, the generated .netlify/netlify.toml from the earlier adapter build, MIGRATION.md, legacy/routes.json, archived local HTML, root HTML fragments, all 19 article metadata files and preserved HTML snapshots, content/blog/MIGRATION-REPORT.md, and content/blog/AUTHOR-LINK-AUDIT.md. No public/_redirects or other authored redirect file was found. The earlier generated Netlify configuration contains image-proxy rules, not these page moves.

The root migration report predates later expansion and says 19 content routes; it is not the current complete route inventory. Legacy local HTML contains predecessor Next-site service routes as well as Squarespace links; the URL map does not claim all those service URLs were published on Squarespace.

A standalone prior SEO audit was not found among repository records. Its location was requested during the task. It remains an outstanding input; this report is not a claim that the missing audit was reviewed. The existing blog author audit and migration reports were reviewed.

## Confirmed mapping review

| Old URL (both slash variants) | New URL | Status | Rationale | Verification source | Confidence |
|---|---|---|---|---|---|
| /what-we-believe | /christian-counseling-tyler/ | 301 → 200 | Approved consolidation of Christian counseling/faith destination | Owner task, MIGRATION.md pending SEO note, preserved snapshot navigation and historical beliefs page | High |
| /our-story | /about/ | 301 → 200 | Practice story moved to About | Owner task, original Big News body link, historical Our Story page | High |
| /meet-the-team | /therapists/ | 301 → 200 | Team directory moved to therapist directory | Owner task, preserved snapshot navigation and historical team page | High |
| /schedule-an-apointment | /contact/ | 301 → 200 | Appointment inquiry destination moved to Contact | Owner task, preserved article-body links and scheduling page | High |
| /news | /blog/ | 301 → 200 | Collection index moved; individual articles retain their URLs | Owner task, blog metadata and migration report | High |

The historical misspelling **apointment** is intentional. No corrected-spelling alias was invented. All five final destinations returned 200. Both slash forms were tested independently. No added mapping points to the homepage, captures article descendants, or takes its destination from user input.

## Configuration, query protection, and precedence

Four exact 301 rules live in netlify.toml. Netlify's URL normalization matches slashless and trailing-slash requests with a single rule, so duplicate rules are unnecessary. force=true makes the intended move win over a future file with the same legacy name. Destinations already include their final slash. Netlify evaluates user-defined rules before adapter-generated routing, avoiding a Next.js slash-normalization hop for these moves.

The /news move lives in netlify/edge-functions/legacy-news.js, scoped to exactly /news and /news/. It emits 301 with a fixed local /blog/ destination for the plain index and tracking-only queries (utm_*, gclid, fbclid, msclkid). Other query keys continue through normal routing without a migration redirect. This is needed because the original author archive uses /news?author=..., and the RSS feed uses /news?format=rss. A blanket path-only rule would incorrectly redirect those unresolved resources to the index. Tag paths and article paths do not match the edge function. There is no wildcard /news/* → /blog/ rule.

Edge Functions run before Netlify redirect rules and before the Next.js server. The Next.js trailingSlash:true setting and existing Next.js redirects are untouched. Query values cannot change any redirect destination; an external next= value remains data and never becomes a target. No catch-all rewrite or fallback redirect was added.

The existing Next.js rules remain:
- /index.html → /, 308.
- /:path+/index.html → /:path+/, 308.
- /children-families → /#family-services, 308 (existing intentional directory anchor).

Existing behavior measured locally:
- /children-families → 308 /children-families/ → 308 /#family-services → 200.
- /children-families/ → 308 /#family-services → 200.
- /index.html → 308 / → 200.
- /about/index.html → 308 /about/ → 200.
- Legacy children-families/index.html also retains its existing normalization chain.
The pre-existing children-families chain is explicitly recorded, not described as a new single-hop move. A later consolidation can move this existing rule to the Netlify layer without duplicating it, after review of the anchor destination. This phase preserves it.

Official implementation references:
- [Netlify redirect options and trailing-slash matching](https://docs.netlify.com/manage/routing/redirects/redirect-options/)
- [Netlify Frameworks API rule precedence](https://docs.netlify.com/build/frameworks/frameworks-api/)
- [Edge Functions declaration order](https://docs.netlify.com/build/edge-functions/declarations/)
- [Edge Functions API and context.next](https://docs.netlify.com/build/edge-functions/api/)
- Installed Next.js guide: node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/redirects.md (permanent:true means 308, not 301).

## Unresolved URLs and owner decisions

No speculative redirects were added for the following. Their trailing-slash forms remain 404 locally; slashless forms can receive the existing 308 normalization first.

| Historical URL/resource | Evidence and current knowledge | Recommended options / evidence needed |
|---|---|---|
| /programs/ | Preserved navigation; retrieved historical page contains multiple programs, not one equivalent destination | Owner decides whether to retain a programs overview or approve a truly equivalent consolidated destination. Obtain GSC landing-page/query performance, backlinks, and current program scope. Do not map the entire page to one service based on a partial topic match. |
| /job-postings/ | Preserved navigation; retrieved page advertises clinician and associate roles | Confirm current recruiting needs. Retain/recreate careers content if active; otherwise consider deliberate retirement (404/410) after owner approval and backlink review. Contact is not an assumed replacement. |
| /about-us-bedford/ | Navigation-folder reference in snapshots; fetch did not establish page content/status | Obtain Squarespace page export and URL mappings, GSC and backlink evidence. Determine whether this is a folder placeholder, an actual page, or obsolete URL before mapping. |
| /news/tag/Trauma | Original Traumatic Memories snapshot | Decide whether topic archives will exist. Preserve exact spelling/case. Require tag membership, impressions/clicks and backlinks. Do not map all tags to Blog. |
| /news/tag/Memories | Same source | Same archive review required. |
| /news/tag/EDMR | Same source; EDMR is the exact historical spelling | Do not silently correct to EMDR or invent a service redirect. Review source tag and indexed URL evidence. |
| /news?author=5f5e4cd445de701d477994a6 | Present in all 19 source-page snapshots | Owner-approved author bylines are not evidence that an author archive equals a therapist profile. Obtain all author IDs, article membership, GSC and backlink data; decide whether to retain author archives. |
| /news?format=rss | Original feed links in snapshots | Confirm active subscribers/consumers and whether to provide a compatible feed later. HTML Blog is not an RSS replacement. |
| /cart/ | Squarespace template navigation | Confirm whether commerce ever operated and whether links/traffic exist. Do not map an obsolete cart to the homepage. |

Other unobserved author IDs, category archives, archive pagination, RSS/JSON variants, and misspelled URLs remain unclassified until evidence is provided. The news handler conservatively leaves non-tracking query resources unresolved.

Historical content checked via the web reader:
- [Programs](https://www.thebridgetherapy.com/programs)
- [Job Postings](https://www.thebridgetherapy.com/job-postings)
- [What We Believe](https://www.thebridgetherapy.com/what-we-believe)
- [Our Story](https://www.thebridgetherapy.com/our-story)
- [Meet the Team](https://www.thebridgetherapy.com/meet-the-team)
- [Schedule an Apointment](https://www.thebridgetherapy.com/schedule-an-apointment)

These retrieved documents corroborate page intent; the web reader does not prove current raw production HTTP codes. Direct production fetches from the local runtime failed, and sitemap.xml was unavailable through the web tool. Live /news and /about-us-bedford status is not asserted. The exact HTTP statuses in the map are local observations, not live-production measurements.

## Article preservation

All 19 original dated and undated paths are retained in app/news/[...slug]/page.tsx. No article, body link, title, date, source snapshot, or article mapping was edited. Every original slashless URL returns its existing 308 to the same article's slash form; that form returns 200. Unknown dated/undated article URLs return 404, never the Blog index.

| Original URL | Title | Publication date | Local result |
|---|---|---|---|
| /news/2026/8/21/how-to-calm-an-anxious-mind-learning-to-quiet-your-soul-with-god | How to Calm an Anxious Mind: Learning to Quiet Your Soul with God | 2026-08-21 | 308 → same path + / → 200 |
| /news/2026/1/19/anxiety-therapy-vs-medication-whats-the-difference | Anxiety Therapy vs Medication: What’s the Difference? | 2026-01-19 | 308 → same path + / → 200 |
| /news/2026/1/19/what-is-anxiety-therapy | What Is Anxiety Therapy? | 2026-01-19 | 308 → same path + / → 200 |
| /news/2026/1/19/anxiety-therapy-in-tyler-tx | Anxiety Therapy in Tyler, TX | 2026-01-19 | 308 → same path + / → 200 |
| /news/2026/1/19/can-emdr-be-integrated-with-christian-counseling | Can EMDR Be Integrated with Christian Counseling? | 2026-01-19 | 308 → same path + / → 200 |
| /news/2026/1/19/emdr-therapy-for-anxiety-panic-and-trauma-responses | EMDR Therapy for Anxiety, Panic, and Trauma Responses | 2026-01-19 | 308 → same path + / → 200 |
| /news/2026/1/18/is-emdr-therapy-safe-and-effective | Is EMDR Therapy Safe and Effective? | 2026-01-18 | 308 → same path + / → 200 |
| /news/2026/1/18/what-to-expect-in-emdr-therapy-sessions | What to Expect in EMDR Therapy Sessions | 2026-01-18 | 308 → same path + / → 200 |
| /news/2026/1/18/how-emdr-therapy-helps-heal-trauma-and-ptsd | How EMDR Therapy Helps Heal Trauma and PTSD | 2026-01-18 | 308 → same path + / → 200 |
| /news/2026/1/18/what-is-emdr-therapy-and-how-does-it-work | What Is EMDR Therapy and How Does It Work? | 2026-01-18 | 308 → same path + / → 200 |
| /news/2026/1/18/emdr-therapy-for-trauma-and-ptsd-in-tyler-tx | EMDR Therapy for Trauma and PTSD in Tyler, TX | 2026-01-18 | 308 → same path + / → 200 |
| /news/navigating-life-transitions | Navigating Life Transitions: How Counseling Can Guide You Through Change | 2023-08-31 | 308 → same path + / → 200 |
| /news/2021/12/8/screen-time-recommendations | Screen Time Recommendations for Children | 2021-12-09 | 308 → same path + / → 200 |
| /news/2021/4/11/the-bridge-community-spotlight-featuring-beth-reed-with-sightorg | The Bridge Community Spotlight featuring Beth Reed with Sight.org | 2021-04-11 | 308 → same path + / → 200 |
| /news/2019/11/30/simple-ways-to-lower-stress-during-the-holidays | Simple Ways to Lower Stress  During the Holidays | 2019-11-30 | 308 → same path + / → 200 |
| /news/2019/5/21/storm-anxiety | Storm Anxiety | 2019-05-21 | 308 → same path + / → 200 |
| /news/take-heart | Take heart, and be courageous, because He has overcome the world. | 2019-04-12 | 308 → same path + / → 200 |
| /news/2019/2/3/traumatic-memories-and-treatment | Traumatic Memories and Treatment | 2019-02-03 | 308 → same path + / → 200 |
| /news/2019/1/2/big-news | Big News! | 2019-01-01 | 308 → same path + / → 200 |

## Complete known URL inventory

The following inventory includes the original discovered spelling and slash form. Query-based resources are distinct. See the JSON map for confidence, rationale, source files, and full chains for every row.

| Recorded URL | Mapped target / disposition | Observed HTTP chain |
|---|---|---|
| / | / | 200 |
| /about-us-bedford | Unresolved; no migration redirect | 308 → 404 |
| /adhd-counseling-tyler/ | /adhd-counseling-tyler/ | 200 |
| /adhd-counseling-tyler/index.html | /adhd-counseling-tyler/ | 308 → 200 |
| /adoption-counseling-tyler/ | /adoption-counseling-tyler/ | 200 |
| /adoption-counseling-tyler/index.html | /adoption-counseling-tyler/ | 308 → 200 |
| /anxiety-counseling-tyler/ | /anxiety-counseling-tyler/ | 200 |
| /anxiety-counseling-tyler/index.html | /anxiety-counseling-tyler/ | 308 → 200 |
| /blog | /blog/ | 308 → 200 |
| /cart | Unresolved; no migration redirect | 308 → 404 |
| /child-teen-counseling-tyler/ | /child-teen-counseling-tyler/ | 200 |
| /child-teen-counseling-tyler/index.html | /child-teen-counseling-tyler/ | 308 → 200 |
| /children-families | /#family-services | 308 → 308 → 200 |
| /children-families/ | /#family-services | 308 → 200 |
| /children-families/index.html | /children-families/ | 308 → 308 → 200 |
| /christian-counseling-tyler/ | /christian-counseling-tyler/ | 200 |
| /christian-counseling-tyler/index.html | /christian-counseling-tyler/ | 308 → 200 |
| /contact | /contact/ | 308 → 200 |
| /contact/ | /contact/ | 200 |
| /contact/index.html | /contact/ | 308 → 200 |
| /depression-counseling-tyler/ | /depression-counseling-tyler/ | 200 |
| /depression-counseling-tyler/index.html | /depression-counseling-tyler/ | 308 → 200 |
| /divorce-blended-family-counseling-tyler/ | /divorce-blended-family-counseling-tyler/ | 200 |
| /divorce-blended-family-counseling-tyler/index.html | /divorce-blended-family-counseling-tyler/ | 308 → 200 |
| /emdr-therapy-tyler/ | /emdr-therapy-tyler/ | 200 |
| /emdr-therapy-tyler/index.html | /emdr-therapy-tyler/ | 308 → 200 |
| /family-counseling-tyler/ | /family-counseling-tyler/ | 200 |
| /family-counseling-tyler/index.html | /family-counseling-tyler/ | 308 → 200 |
| /grief-counseling-tyler/ | /grief-counseling-tyler/ | 200 |
| /grief-counseling-tyler/index.html | /grief-counseling-tyler/ | 308 → 200 |
| /index.html | / | 308 → 200 |
| /individual-counseling-tyler/ | /individual-counseling-tyler/ | 200 |
| /individual-counseling-tyler/index.html | /individual-counseling-tyler/ | 308 → 200 |
| /job-postings | Unresolved; no migration redirect | 308 → 404 |
| /life-transitions-counseling-tyler/ | /life-transitions-counseling-tyler/ | 200 |
| /life-transitions-counseling-tyler/index.html | /life-transitions-counseling-tyler/ | 308 → 200 |
| /marriage-counseling-tyler/ | /marriage-counseling-tyler/ | 200 |
| /marriage-counseling-tyler/index.html | /marriage-counseling-tyler/ | 308 → 200 |
| /meet-the-team | /therapists/ | 301 → 200 |
| /news | /blog/ | 301 → 200 |
| /news?author=5f5e4cd445de701d477994a6 | Unresolved; no migration redirect | 308 → 404 |
| /news?format=rss | Unresolved; no migration redirect | 308 → 404 |
| /news/2019/1/2/big-news | /news/2019/1/2/big-news/ | 308 → 200 |
| /news/2019/11/30/simple-ways-to-lower-stress-during-the-holidays | /news/2019/11/30/simple-ways-to-lower-stress-during-the-holidays/ | 308 → 200 |
| /news/2019/2/3/traumatic-memories-and-treatment | /news/2019/2/3/traumatic-memories-and-treatment/ | 308 → 200 |
| /news/2019/5/21/storm-anxiety | /news/2019/5/21/storm-anxiety/ | 308 → 200 |
| /news/2021/12/8/screen-time-recommendations | /news/2021/12/8/screen-time-recommendations/ | 308 → 200 |
| /news/2021/4/11/the-bridge-community-spotlight-featuring-beth-reed-with-sightorg | /news/2021/4/11/the-bridge-community-spotlight-featuring-beth-reed-with-sightorg/ | 308 → 200 |
| /news/2026/1/18/emdr-therapy-for-trauma-and-ptsd-in-tyler-tx | /news/2026/1/18/emdr-therapy-for-trauma-and-ptsd-in-tyler-tx/ | 308 → 200 |
| /news/2026/1/18/how-emdr-therapy-helps-heal-trauma-and-ptsd | /news/2026/1/18/how-emdr-therapy-helps-heal-trauma-and-ptsd/ | 308 → 200 |
| /news/2026/1/18/is-emdr-therapy-safe-and-effective | /news/2026/1/18/is-emdr-therapy-safe-and-effective/ | 308 → 200 |
| /news/2026/1/18/what-is-emdr-therapy-and-how-does-it-work | /news/2026/1/18/what-is-emdr-therapy-and-how-does-it-work/ | 308 → 200 |
| /news/2026/1/18/what-to-expect-in-emdr-therapy-sessions | /news/2026/1/18/what-to-expect-in-emdr-therapy-sessions/ | 308 → 200 |
| /news/2026/1/19/anxiety-therapy-in-tyler-tx | /news/2026/1/19/anxiety-therapy-in-tyler-tx/ | 308 → 200 |
| /news/2026/1/19/anxiety-therapy-vs-medication-whats-the-difference | /news/2026/1/19/anxiety-therapy-vs-medication-whats-the-difference/ | 308 → 200 |
| /news/2026/1/19/can-emdr-be-integrated-with-christian-counseling | /news/2026/1/19/can-emdr-be-integrated-with-christian-counseling/ | 308 → 200 |
| /news/2026/1/19/emdr-therapy-for-anxiety-panic-and-trauma-responses | /news/2026/1/19/emdr-therapy-for-anxiety-panic-and-trauma-responses/ | 308 → 200 |
| /news/2026/1/19/what-is-anxiety-therapy | /news/2026/1/19/what-is-anxiety-therapy/ | 308 → 200 |
| /news/2026/8/21/how-to-calm-an-anxious-mind-learning-to-quiet-your-soul-with-god | /news/2026/8/21/how-to-calm-an-anxious-mind-learning-to-quiet-your-soul-with-god/ | 308 → 200 |
| /news/navigating-life-transitions | /news/navigating-life-transitions/ | 308 → 200 |
| /news/tag/EDMR | Unresolved; no migration redirect | 308 → 404 |
| /news/tag/Memories | Unresolved; no migration redirect | 308 → 404 |
| /news/tag/Trauma | Unresolved; no migration redirect | 308 → 404 |
| /news/take-heart | /news/take-heart/ | 308 → 200 |
| /our-story | /about/ | 301 → 200 |
| /parenting-support-tyler/ | /parenting-support-tyler/ | 200 |
| /parenting-support-tyler/index.html | /parenting-support-tyler/ | 308 → 200 |
| /pregnancy-postpartum-counseling-tyler/ | /pregnancy-postpartum-counseling-tyler/ | 200 |
| /pregnancy-postpartum-counseling-tyler/index.html | /pregnancy-postpartum-counseling-tyler/ | 308 → 200 |
| /premarital-counseling-tyler/ | /premarital-counseling-tyler/ | 200 |
| /premarital-counseling-tyler/index.html | /premarital-counseling-tyler/ | 308 → 200 |
| /programs | Unresolved; no migration redirect | 308 → 404 |
| /schedule-an-apointment | /contact/ | 301 → 200 |
| /trauma-therapy-tyler/ | /trauma-therapy-tyler/ | 200 |
| /trauma-therapy-tyler/index.html | /trauma-therapy-tyler/ | 308 → 200 |
| /what-we-believe | /christian-counseling-tyler/ | 301 → 200 |

## Outstanding historical evidence

Before production launch, obtain:
1. The prior SEO audit and its crawl/redirect recommendations.
2. GSC Performance → Pages export for the maximum available history (including full URLs, clicks, impressions and date range); query-by-page data for ambiguous resources.
3. GSC Page indexing reports for indexed, excluded, not-found and redirected URLs; external Links export with target URLs; sitemap submissions and URL Inspection for important legacy pages.
4. Current Squarespace sitemap(s), full published/unlisted page export, URL Mappings configuration, blog collection/author/tag/category IDs, pagination and feed URLs.
5. Analytics organic/referral landing pages and server/CDN request logs, if available; backlink exports from other tools and known external partners.
6. Historical host/protocol variants (www/non-www, HTTP/HTTPS), earlier domains, renamed slugs, downloadable documents and images with incoming links.
7. Owner decisions on the unresolved resources above.

Merge those exports into this inventory, deduplicate against implemented rules, and validate every added mapping individually. The 76 rows are the complete known inventory from the inspected records, not a guarantee of every URL ever indexed.

## Validation and limits

- npm run build: passed.
- npm run check: passed; 73 pages checked.
- npm run lint: passed, including a separate ESLint check of the new edge handler.
- git diff --check: passed.
- Article preservation tests: 24/24 passed, including all 19 articles, source/body hashes, titles/dates and built metadata.
- Migration HTTP tests: 4/4 passed, covering ten slash variants, final 200 destinations, no speculative archive redirect, unknown routes, fixed local destinations, all 19 articles and staging noindex/nofollow.
- Both slash forms of each implemented move: exactly one 301; no loop or extra normalization hop.
- Existing children-families chain: unchanged and explicitly documented above.
- No protected application/content files changed.

Local platform verification used the installed official @netlify/redirects 4.0.2 engine to parse and match actual netlify.toml rules, the actual edge handler under Node's Web Request/Response APIs, and a built Next.js production server. Netlify Dev 27.6.0 started with isolated local configuration but its Deno runtime download failed (fetch failed). Full Deno/CDN execution is therefore **not verified here**. These are supported Netlify configuration/API forms, but a later non-production deploy-preview/CDN smoke test must confirm adapter/edge packaging and precedence. This phase did not deploy anything.

Re-run HTTP tests against a locally running Netlify Dev server:
`MIGRATION_TEST_URL=http://127.0.0.1:8888 node --test tests/seo-migration.test.mjs`
(Set the environment variable using your shell's syntax.) A plain next start server does not execute Netlify rules. The checked-in scripts/seo-local-preview.mjs is an offline fallback using the installed Netlify redirect engine; it needs NETLIFY_TEST_MODULES pointing to a Netlify CLI node_modules directory, a Next production server at port 3012, and serves at port 8890. It is a validation harness, not deployment code.

## Files changed

- netlify.toml — four exact permanent redirects.
- netlify/edge-functions/legacy-news.js — query-aware index-only 301.
- tests/seo-migration.test.mjs — migration regression tests.
- scripts/seo-local-preview.mjs — documented offline platform-matching test harness.
- content/seo/phase-1-url-map.json — reviewed inventory, mappings, evidence and local traces.
- SEO-MIGRATION-PHASE-1.md — this report.
- MIGRATION.md — update the stale documentation-only instruction to record explicit local preparation authorization.

Staging noindex/nofollow, production indexing settings, canonical metadata, sitemap, robots.txt, structured data, page titles/H1s, service copy, therapist mappings, Contact form and chatbot are untouched.
