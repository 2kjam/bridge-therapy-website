# Completed legacy blog migration

Verified September 16, 2026. **19 of 19 published articles are local.** The 18 new records were captured from live production pages and public collection data. The existing Navigating Life Transitions record, rendered body, source files, and image were not modified. No push or deployment.

## Per-article results

Every row passed exact source title/date/byline, original excerpt/tags, raw metadata, literal text-block HTML, ordered body elements, heading levels, links, image/media placement, SHA-256, built HTML, and chronological navigation verification. Every legacy path returned **308 to its trailing-slash form, then 200**, in both desktop and mobile test contexts. Unknown dated and undated paths returned 404.

| # | Exact title | Publication date | Legacy route | Import | Preservation / route |
|---|---|---|---|---|---|
| 01 | `How to Calm an Anxious Mind: Learning to Quiet Your Soul with God` | 2026-08-21 | `/news/2026/8/21/how-to-calm-an-anxious-mind-learning-to-quiet-your-soul-with-god` | New | PASS / 308 -> 200 |
| 02 | `Anxiety Therapy vs Medication: What’s the Difference?` | 2026-01-19 | `/news/2026/1/19/anxiety-therapy-vs-medication-whats-the-difference` | New | PASS / 308 -> 200 |
| 03 | `What Is Anxiety Therapy?` | 2026-01-19 | `/news/2026/1/19/what-is-anxiety-therapy` | New | PASS / 308 -> 200 |
| 04 | `Anxiety Therapy in Tyler, TX` | 2026-01-19 | `/news/2026/1/19/anxiety-therapy-in-tyler-tx` | New | PASS / 308 -> 200 |
| 05 | `Can EMDR Be Integrated with Christian Counseling?` | 2026-01-19 | `/news/2026/1/19/can-emdr-be-integrated-with-christian-counseling` | New | PASS / 308 -> 200 |
| 06 | `EMDR Therapy for Anxiety, Panic, and Trauma Responses` | 2026-01-19 | `/news/2026/1/19/emdr-therapy-for-anxiety-panic-and-trauma-responses` | New | PASS / 308 -> 200 |
| 07 | `Is EMDR Therapy Safe and Effective?` | 2026-01-18 | `/news/2026/1/18/is-emdr-therapy-safe-and-effective` | New | PASS / 308 -> 200 |
| 08 | `What to Expect in EMDR Therapy Sessions` | 2026-01-18 | `/news/2026/1/18/what-to-expect-in-emdr-therapy-sessions` | New | PASS / 308 -> 200 |
| 09 | `How EMDR Therapy Helps Heal Trauma and PTSD` | 2026-01-18 | `/news/2026/1/18/how-emdr-therapy-helps-heal-trauma-and-ptsd` | New | PASS / 308 -> 200 |
| 10 | `What Is EMDR Therapy and How Does It Work?` | 2026-01-18 | `/news/2026/1/18/what-is-emdr-therapy-and-how-does-it-work` | New | PASS / 308 -> 200 |
| 11 | `EMDR Therapy for Trauma and PTSD in Tyler, TX` | 2026-01-18 | `/news/2026/1/18/emdr-therapy-for-trauma-and-ptsd-in-tyler-tx` | New | PASS / 308 -> 200 |
| 12 | `Navigating Life Transitions: How Counseling Can Guide You Through Change` | 2023-08-31 | `/news/navigating-life-transitions` | Existing, unchanged | PASS / 308 -> 200 |
| 13 | `Screen Time Recommendations for Children` | 2021-12-09 | `/news/2021/12/8/screen-time-recommendations` | New | PASS / 308 -> 200 |
| 14 | `The Bridge Community Spotlight featuring Beth Reed with Sight.org` | 2021-04-11 | `/news/2021/4/11/the-bridge-community-spotlight-featuring-beth-reed-with-sightorg` | New | PASS / 308 -> 200 |
| 15 | `Simple Ways to Lower Stress  During the Holidays` | 2019-11-30 | `/news/2019/11/30/simple-ways-to-lower-stress-during-the-holidays` | New | PASS / 308 -> 200 |
| 16 | `Storm Anxiety` | 2019-05-21 | `/news/2019/5/21/storm-anxiety` | New | PASS / 308 -> 200 |
| 17 | `Take heart, and be courageous, because He has overcome the world.` | 2019-04-12 | `/news/take-heart` | New | PASS / 308 -> 200 |
| 18 | `Traumatic Memories and Treatment` | 2019-02-03 | `/news/2019/2/3/traumatic-memories-and-treatment` | New | PASS / 308 -> 200 |
| 19 | `Big News!` | 2019-01-01 | `/news/2019/1/2/big-news` | New | PASS / 308 -> 200 |

## Files and index

Created **90 article files**: for each of the 18 new record directories listed above, `metadata.json`, `body.html`, `source/page.html`, `source/item.json`, and `source/body.html`. The complete collection has 95 article files. Each metadata file records source ID/URL, timestamps, raw metadata, original excerpt/categories/tags, mappings and SHA-256 hashes. Full page response bytes and original body HTML are retained. Original item fields are retained in the same JSON snapshot format used by batch one.

`/blog/` lists all 19 records by original publication timestamp, newest first, with exact titles, dates and displayed bylines. Only Take heart, Traumatic Memories and Treatment, and Big News! display excerpts. Take heart has a text-only index card and no placeholder featured image. The shared template supports original body images and the Vimeo iframe, plus older/newer navigation outside the original body. No filtering, pagination, search, CMS, or author/tag archives.

New capture/import tooling: `scripts/capture-remaining-blog.mjs`, `scripts/import-remaining-blog.mjs`, and the strict block extractor `scripts/legacy-blog-content.mjs`. Capture scratch files go to ignored `test-results/blog-capture`; authoritative snapshots are under `content/blog`. The importer never overwrites an existing article directory. Review new source layouts before expanding the allowed block types.

Expanded `tests/blog.test.mjs` and `tests/blog.spec.ts` retain the original article checks. Added `tests/blog-collection.test.mjs` and `tests/blog-collection.spec.ts`; the existing npm test command runs both collections. Site checking explicitly permits the three deferred legacy destinations only within original article bodies. Removed-service wording checks continue to cover current site content and new chrome, while historical article wording is preserved.

## Image assets

**22 new files; 23 distinct article images total.** All files retain the image response bytes without local conversion, enhancement, crop, or resizing. Rendered image URLs are local. CSS preserves delivered image aspect ratios. Source URL, local URL, dimensions, byte size and hash are retained in the new records.

F18 and B18a have the same SHA-256 (`41796d5f9ced2678a65a3592764828bc546274ab38ca236bb8b057034d4d3452`) and share one file while retaining featured and body placements. Big News! uses the newly downloaded 1024 x 680 original response, not the older 1000 x 664 `our-story.jpg` derivative. Take heart omits the generic Squarespace missing-image thumbnail and retains its real body/OG image.

| Article # | Placement | Local asset | Delivered dimensions | Source |
|---|---|---|---|---|
| 01 | Featured | `/assets/blog/how-to-calm-an-anxious-mind-learning-to-quiet-your-soul-with-god/featured.jpg` | 2500 x 2879 | [Original URL](https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1787329021962-NE5UWMD2QXCAUB8DL3EX/IMG_1510.jpeg) |
| 02 | Featured | `/assets/blog/anxiety-therapy-vs-medication-whats-the-difference/featured.png` | 1366 x 768 | [Original URL](https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1768848418550-ZHJBACAK3PLXUERKE123/Copy+of+Untitled+Design+%2816%29.png) |
| 03 | Featured | `/assets/blog/what-is-anxiety-therapy/featured.png` | 1366 x 768 | [Original URL](https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1768848009784-XVXT2WXQGZLIF2I4XNN0/Copy+of+Untitled+Design+%2815%29.png) |
| 04 | Featured | `/assets/blog/anxiety-therapy-in-tyler-tx/featured.png` | 1366 x 768 | [Original URL](https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1768846337802-G0FJFEVQ1LMGPO9M1FEG/Copy+of+Untitled+Design+%2814%29.png) |
| 05 | Featured | `/assets/blog/can-emdr-be-integrated-with-christian-counseling/featured.png` | 1366 x 768 | [Original URL](https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1768844319904-6OFANU795PQ5UJXEPM6M/Copy+of+Untitled+Design+%2813%29.png) |
| 06 | Featured | `/assets/blog/emdr-therapy-for-anxiety-panic-and-trauma-responses/featured.png` | 1366 x 768 | [Original URL](https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1768843831001-10026PUJARJH5NQMTC1R/Copy+of+Untitled+Design+%2812%29.png) |
| 07 | Featured | `/assets/blog/is-emdr-therapy-safe-and-effective/featured.png` | 1366 x 768 | [Original URL](https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1768791674747-ZHOPPNX8RQQ3ISH4ZMVR/Copy+of+Untitled+Design+%2811%29.png) |
| 08 | Featured | `/assets/blog/what-to-expect-in-emdr-therapy-sessions/featured.png` | 1366 x 768 | [Original URL](https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1768791312835-XE8OHJD585OJMPXLZC2A/Copy+of+Untitled+Design+%2810%29.png) |
| 09 | Featured | `/assets/blog/how-emdr-therapy-helps-heal-trauma-and-ptsd/featured.png` | 1366 x 768 | [Original URL](https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1768790254069-0CEG46DR4TAQ38HTKK3C/Copy+of+Untitled+Design+%289%29.png) |
| 10 | Featured | `/assets/blog/what-is-emdr-therapy-and-how-does-it-work/featured.png` | 1366 x 768 | [Original URL](https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1768789592067-SGRUVMNC8OZATY0PBZJA/Copy+of+Untitled+Design+%288%29.png) |
| 11 | Featured | `/assets/blog/emdr-therapy-for-trauma-and-ptsd-in-tyler-tx/featured.png` | 1366 x 768 | [Original URL](https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1768788533505-6NIVWKDWLZ06TG8AA2MZ/Copy+of+Untitled+Design+%287%29.png) |
| 12 | Featured | `/assets/blog/navigating-life-transitions/image-asset.jpeg` | 2500 x 1667 | [Original URL](https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1693490213078-EERIGYEIR8QGVAHRLVKN/image-asset.jpeg) |
| 13 | Featured | `/assets/blog/screen-time-recommendations/featured.jpg` | 2285 x 1523 | [Original URL](https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1639061652978-D74HQF2HZ2TH8PHHQPR8/Shutterstock_539157508.jpg) |
| 14 | Featured | `/assets/blog/the-bridge-community-spotlight-featuring-beth-reed-with-sightorg/featured.png` | 2048 x 2048 | [Original URL](https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1618159263622-WIFN9GD4AFZY4IC9KN8L/IMG_2051+copy.PNG) |
| 14 | Body | `/assets/blog/the-bridge-community-spotlight-featuring-beth-reed-with-sightorg/body-1.jpg` | 1280 x 720 | [Original URL](https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1618159472451-1OFP5TDC2DVC5IGMQ3XO/17504401_1307682365987058_4684543869110211591_o.jpg) |
| 14 | Body | `/assets/blog/the-bridge-community-spotlight-featuring-beth-reed-with-sightorg/body-2.jpg` | 1365 x 1365 | [Original URL](https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1618159564071-AT425YKQLMQYPKW33RGT/43562272_10100272337885313_3181240065208614912_o+%281%29.jpg) |
| 14 | Body | `/assets/blog/the-bridge-community-spotlight-featuring-beth-reed-with-sightorg/body-3.jpg` | 2500 x 2000 | [Original URL](https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1618159708833-CT6HTR6GRPYHL0BTHE31/2J9A5102.jpg) |
| 15 | Featured | `/assets/blog/simple-ways-to-lower-stress-during-the-holidays/featured.jpg` | 2500 x 1667 | [Original URL](https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1575149175234-WGASBK2W1ZHYZRLT2W1U/the+bridge+therapeutic+services.JPG) |
| 16 | Featured | `/assets/blog/storm-anxiety/featured.png` | 1268 x 706 | [Original URL](https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1558440507310-5OARL9KRA152HVQTKKXG/Screen+Shot+2019-05-21+at+7.06.48+AM.png) |
| 17 | Body | `/assets/blog/take-heart/body-1.jpg` | 741 x 741 | [Original URL](https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1555127816842-YZ3ZLUQB93R91TMIR6HD/the+bridge+therapeutic+services) |
| 18 | Featured | `/assets/blog/traumatic-memories-and-treatment/featured.jpg` | 640 x 365 | [Original URL](https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1549229561260-NZRVFLOHXGWUHHH58BB9/erinblog1.jpg) |
| 18 | Body | `/assets/blog/traumatic-memories-and-treatment/featured.jpg` | 640 x 365 | [Original URL](https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1549230046416-0X6PS0TYJBPIINE22ZP2/Erin+Young+-+The+Bridge+Therapeutic+Services) |
| 18 | Body | `/assets/blog/traumatic-memories-and-treatment/body-2.png` | 1492 x 832 | [Original URL](https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1549235319134-ZXQ96P4IYSWVD7LBQGHO/trauma) |
| 19 | Featured | `/assets/blog/big-news/featured.jpg` | 1024 x 680 | [Original URL](https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1546431975587-NKUADPQYMYSHSIZNXCFG/Erin+and+Jennifer.JPG) |

The newest article declares 3653 x 4207 in its source metadata; the bare public URL and `?format=original` both delivered the same 2500 x 2879 JPEG (2,695,888 bytes). Those delivered bytes were preserved; the declared dimensions and discrepancy remain in the record. The larger upload is not recoverable from the tested public URLs. Squarespace documents its generated widths up to 2500px in its [image loader documentation](https://developers.squarespace.com/image-loader).

The live page and collection data supplied filename-style alt strings on all six historical body image placements, differing from the earlier inventory summary. Those live values were compared and preserved exactly; no alt wording was invented. Empty featured-image alt values remain empty.

## Vimeo

Storm Anxiety retains the exact source URL `https://player.vimeo.com/video/337499860?app_id=122963&wmode=opaque`, title `Storm Anxiety w/ Doc Deason`, position between its original text blocks, and 426:240 aspect ratio. The source deferred `data-html` iframe becomes a real responsive iframe. It allows fullscreen, has no autoplay URL parameter and no autoplay permission. No third-party Squarespace loader is retained.

**Local browser playback verified:** the iframe returned HTTP 200; the player showed 33:25. A user-style Play click advanced `currentTime` to 0.572071 seconds while playing, with duration 2005.300107 seconds, then the test paused playback. This resolves the earlier automated 401 observation for this local check; no staging deployment was performed. Evidence: `test-results/blog-playback/` (ignored generated artifacts).

## Preservation and presentation differences

No wording, grammar, clinical/theological claims, signatures, credentials, heading hierarchy, punctuation or dates were repaired. Preserved oddities include the two spaces in article 15's title, its literal `<br/>` metadata title, the publication-date/URL differences in articles 13 and 19, additional body H1s, the first article's empty H2, and `EDMR`. Metadata tests retain empty descriptions and raw whitespace. Source canonical and OG URLs remain evidence; production canonical/OG infrastructure is deferred. All pages remain `noindex, nofollow`.

Mechanical differences are documented per record: Squarespace layout/style/script wrappers and its empty spacer are omitted; source text-block inner HTML is sliced verbatim rather than serialized; migrated article href destinations become root-relative local URLs; source image lazy-load/crop machinery becomes proportional local images; deferred Vimeo markup becomes the safe iframe; the original Our Story button anchor remains verbatim. Source snapshots retain all original wrappers and attributes. Source image links and placement remain intact.

The new site uses its own fonts, spacing, full date display, header/footer, breadcrumb and outside-body older/newer navigation. Featured images appear above article bodies as established in batch one. Shared Squarespace author biographies, newsletter and platform navigation are replaced by new site chrome; original body signatures remain separate from the page byline.

## Links and deferred routes

All article-to-article destinations map to the preserved local `/news/...` records. Anchor wording and all source URLs remain in the immutable snapshots. No new service links were added. The following observations were made against the original external/live destinations:

| Destination | Observed result | Handling |
|---|---|---|
| AACAP screen-time article | 200 | Original link retained |
| `http://sight.org/` | 200 after HTTPS redirect | Original href retained |
| Both CBS19 article/video links | 403 to automated requests | Retained; not classified as dead |
| `/schedule-an-apointment` | Live production 200; no local route | Original body destination retained; launch redirect deferred |
| `/what-we-believe` | Live production 200; no local route | Original body destination retained; launch redirect deferred |
| `/our-story` | Live production 404; no local route | Original button retained; launch disposition deferred |

Most appointment/belief body links are absolute production URLs and remain so. The Our Story button is root-relative and remains unresolved locally. These are documented historical links, not silently corrected.

## Validation

- Production build: PASS; 19 static article routes generated.
- `npm run check`: PASS, 69 route entries checked (includes both forms of article paths).
- `npm run lint`: PASS.
- `git diff --check`: PASS.
- Blog preservation: **24 tests passed**, including an explicit result for every article and the original article's existing assertions.
- Blog browser suite: **17 passed**, with 5 intentionally skipped duplicate mobile-context layout/playback cases. All 19 articles received automated layout checks at **375, 390, 768 and 1440px**; original article/index/widget interactions ran in desktop and mobile contexts at all four widths.
- Independent Vimeo playback probe: **1 passed**, playback verified.
- Representative screenshots visually reviewed for long modern, short EMDR, historical, multi-image, Vimeo, unusual-heading and no-featured-image articles at all four widths. No horizontal overflow, distorted images, clipped headings, or broken article layout found. Lazy Vimeo loading may show blank space in an unscrolled full-page screenshot; scrolling to the player loads it and playback was separately verified.
- Inquiry unit regression: **3 passed**.
- Comprehensive widget and contact browser regressions: **PASS**, including all ten therapist contexts, mocked submissions/errors/retries, session/focus behavior and responsive widths. No real submissions.

Screenshots and browser evidence are in ignored `test-results/blog/` and `test-results/blog-playback/`. Next logs its existing `NoFallbackError` diagnostic for intentionally unknown static paths while returning the required 404; tests pass. Node reports its existing module-type warning when directly loading the TypeScript loader in Node tests. Neither is a content failure.

## Launch-only follow-up

Keep staging noindex/nofollow. Decide slashless preservation versus current sitewide `trailingSlash: true` behavior; implement production canonical/indexing/sitemap architecture only at launch. Decide `/news` -> `/blog`, tag-route handling, appointment and beliefs redirects, and `/our-story` disposition. Recheck CBS19 and public Vimeo availability near launch. Retain source evidence and image mappings. No launch redirects, routing overhaul, SEO switch, push, or deployment were performed.
