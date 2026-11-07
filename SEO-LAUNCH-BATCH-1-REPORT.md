# SEO Launch Readiness Cleanup — Batch 1

Completed: October 10, 2026
Scope: metadata, one article display title, and NES image provenance only
Deployment status: local implementation; not pushed or deployed

## Files changed

- `app/blog/page.tsx` — adds the Blog index description.
- `lib/blog.ts` — supplies reviewed presentation-only descriptions and the corrected holiday article display/SEO title while retaining historical records.
- `content/service-images.json` — removes the false current NES attribution, marks current provenance unverified, and preserves the old attribution as superseded history.
- `tests/blog-collection.test.mjs` — verifies the presentation title and preserves source-record assertions.
- `tests/seo-metadata.test.mjs` — verifies all 54 descriptions are present, unique, and plain text, and rejects malformed titles.
- `tests/seo-migration.test.mjs` — verifies preserved article routes against their reviewed presentation titles.
- `tests/service-images.spec.ts` — verifies the explicit NES unverified/superseded provenance state without relaxing byte, hash, dimension, budget, or responsive checks.
- `tests/structured-data.test.mjs` — expects the corrected plain-text BlogPosting headline.
- `SEO-LAUNCH-BATCH-1-REPORT.md` — this report.

No article body, source snapshot, image file, route, redirect, indexing control, canonical utility, sitemap, robots rule, schema type, service copy, therapist profile, CTA, or application interaction was changed.

## Seven descriptions added

| Route | New meta description |
| --- | --- |
| `/blog/` | Read articles from The Bridge Therapeutic Services about counseling, anxiety, EMDR, trauma, relationships, faith, and family life in Tyler, TX. |
| `/news/2026/1/18/how-emdr-therapy-helps-heal-trauma-and-ptsd/` | Learn how EMDR therapy may help people process traumatic memories, reduce emotional intensity, and support healing at The Bridge in Tyler, TX. |
| `/news/2026/1/18/is-emdr-therapy-safe-and-effective/` | Explore common questions about EMDR safety, evidence, preparation, pacing, and readiness from The Bridge Therapeutic Services in Tyler, TX. |
| `/news/2021/12/8/screen-time-recommendations/` | Review screen-time recommendations for children, including age-based limits, family routines, parental controls, and screen-free bedtime habits. |
| `/news/2019/5/21/storm-anxiety/` | Learn how storms can trigger anxiety and find grounding, preparation, and parenting strategies discussed by The Bridge therapists in Tyler, TX. |
| `/news/2021/4/11/the-bridge-community-spotlight-featuring-beth-reed-with-sightorg/` | Read The Bridge's community spotlight with Beth Reed about Sight.org, intentional living, faith, and her family's adoption story. |
| `/news/2026/1/18/what-is-emdr-therapy-and-how-does-it-work/` | Learn what EMDR stands for, how bilateral stimulation is used, and what a structured EMDR therapy process may involve in Tyler, TX. |

The six article descriptions are presentation overrides. Their migrated metadata records still retain the original blank Squarespace descriptions as historical evidence. The Blog index description is defined on the Blog page.

The built-site audit found exactly one nonempty description on every one of the 54 intended content routes. All 54 descriptions are unique. None contains HTML, localhost, a Netlify staging host, an unsupported credential, or a newly introduced medical outcome promise.

## Holiday article title correction

Affected article:

`/news/2019/11/30/simple-ways-to-lower-stress-during-the-holidays/`

The malformed value originated in the preserved Squarespace SEO title stored in the migrated metadata record:

`Simple Ways to Lower Stress During the Holidays<br/> — The Bridge Therapeutic Services`

The historical source snapshot and migrated record were not edited. `lib/blog.ts` now supplies explicit plain-text presentation values for this one path.

| Surface | Before | After |
| --- | --- | --- |
| Blog index title | Source title with doubled whitespace | `Simple Ways to Lower Stress During the Holidays` |
| Article H1 | Source title with doubled whitespace | `Simple Ways to Lower Stress During the Holidays` |
| HTML title | Literal `<br/>` visible in title text | `Simple Ways to Lower Stress During the Holidays — The Bridge Therapeutic Services` |
| Open Graph title | Not implemented | Still not implemented; no unrelated metadata type added |
| BlogPosting headline | Source title with doubled whitespace | `Simple Ways to Lower Stress During the Holidays` |
| Canonical | Correct historical article URL | Unchanged |

The correction uses ordinary text values. It does not use `dangerouslySetInnerHTML`, parse arbitrary markup, or introduce an XSS path.

The complete preservation suite confirms all 19 bodies, source snapshots, paths, dates, bylines, images, embeds, and historical evidence remain unchanged. Tests now distinguish immutable source values from intentional presentation values.

## NES provenance correction

The approved asset remains the image described by the alt text:

`A woman with her eyes closed holding both sides of her head`

Before this cleanup, its top-level manifest fields falsely identified the current image as Unsplash ID `D6Hkl-wot_E`, credited `@invadingkingdom`, and linked to a photograph described as a man in a red-and-black plaid shirt. The download URL, Unsplash license, access date, selection rationale, and candidates belonged to that superseded selection process.

Current top-level provenance now records:

- `id`, `photographer`, `source`, `license`, `accessed`, `sourceArchive`, and `downloadUrl`: `null`
- `provenance.status`: `unverified`
- an explicit note that the repository has no verified creator, source, download, or license evidence for the current image
- an approval-history note confirming the current image and alt while stating that its source history was not preserved

The former Unsplash fields remain under `supersededProvenance`, and the candidate list is now `supersededCandidates`. These fields explicitly state that they do not establish provenance for the current asset. No photographer, source URL, or license was invented.

## Image integrity

No image byte changed. All 53 generated files across the 19 service-image entries were recalculated and compared with the manifest; every byte count, SHA-256 hash, width, and height matched. All 53 returned HTTP 200 from the local production server.

NES remains:

| Variant | Dimensions | Bytes | SHA-256 |
| --- | ---: | ---: | --- |
| Main | 1440 × 958 | 80,428 | `c210dc444511664632f30367e20ee1448b541e1724a9ab0719f6b301e533e62f` |
| Medium | 800 × 532 | 27,840 | `e7c6b1e99c48ab69fee22c15b372e6b82d05c908c81932617dad8a23938d8578` |
| Small | 480 × 319 | 12,642 | `0847d6a275594cc1038319a9b4be9bc8f7a53e13ef55129de496832a0f50ec10` |

Erin Young remains the only featured NES counselor and only individual NES schema provider. The page language, alt text, crop, layout, and counseling/medical boundary did not change.

The optimized Grief main image remains 1440 × 960, 246,086 bytes, quality 75/effort 6, with SHA-256 `873043bc01f529d0ef810402e9cc11dd6392524435f9881db599f257dec169d6`. Its responsive variants and approved wooden-heart alt text are unchanged.

## Regression and validation results

| Check | Result |
| --- | --- |
| `npm run check` | Pass; TypeScript plus 73 structural page records |
| `npm run lint` | Pass |
| `npm run build` | Pass; fail-closed Next.js 16.3.5 build generated 58 framework routes |
| `git diff --check` | Pass |
| 54-route metadata HTTP audit | Pass; all descriptions present, unique, plain text; titles well formed; canonicals and staging robots correct |
| Phase 1 redirect and article-route tests | Pass; five approved moves and all 19 article URLs, 4/4 tests |
| Phase 2 staging SEO tests | Pass; 7/7 tests including the new metadata coverage check |
| Phase 2 policy tests | Pass; 4/4 tests |
| Phase 3 structured-data tests | Pass; 8/8 tests, including 19 corrected/preserved BlogPosting nodes and Erin-only NES |
| Blog preservation and collection tests | Pass; 24/24 tests |
| Presentation-image tests | Pass; 2/2 tests |
| Service-image integrity | Pass; 19 records, 53 assets, zero byte/hash/dimension mismatches, all local responses 200 |
| Inquiry tests | Pass; 3/3 tests |

The existing Playwright service-image suite retains its seven-width visual checks and all integrity assertions. The browser runner could not complete reliably in the current tool environment because its managed Edge/server teardown exceeds the tool execution window; no full browser-suite pass is claimed here. The file-level integrity work was independently executed across every service-image variant, and `npm run check` verified rendered service attributes and mappings. No test was disabled or weakened.

## Remaining attention

The current NES image's creator, original source URL, and license remain genuinely unverified. Obtain documentary evidence before public launch and update the current provenance fields only from that evidence.

The final audit's external dependencies remain: a real Netlify staging/CDN/Edge/form/mobile verification, production Netlify identity verification, Google Search Console reconciliation, and owner decisions for nine unresolved historical resources. Batch 1 did not alter or claim to resolve those items.

No production indexing flag was enabled. Nothing was pushed, deployed, or changed in DNS or Netlify.
