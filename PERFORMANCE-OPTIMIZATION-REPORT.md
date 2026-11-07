Performance optimization batch — September 19, 2026

Implemented image-delivery changes only. No push or deployment. Existing uncommitted work was preserved.

The controlled measurements used a production build at localhost, fresh Edge browser contexts, a 390 × 900 viewport, device scale factor 1, no throttling, no scrolling or menu interaction, and a three-second observation after the load event. The timed inquiry prompt remained enabled in both runs. These are local engineering observations, **not production field Core Web Vitals**. Byte counts include resource-timing transfer overhead; image counts include the favicon.

| Page | Total bytes before → after | Image bytes before → after | Image requests before → after | Total reduction |
|---|---:|---:|---:|---:|
| Homepage | 5,490,100 → 1,192,392 | 5,307,812 → 1,009,816 | 35 → 22 | 78.3% |
| `/anxiety-counseling-tyler/` | 3,075,617 → 256,361 | 2,901,211 → 81,952 | 16 → 4 | 91.7% |
| `/blog/` | 17,929,053 → 335,454 | 17,753,874 → 158,693 | 33 → 7 | 98.1% |

| Page | Local LCP before → after | Observed CLS before → after |
|---|---:|---:|
| Homepage | 576 → 464 ms | 0.121644 → 0.121644 |
| Anxiety service | 224 → 188 ms | 0.121644 → 0.121644 |
| Blog | 436 → 172 ms | 0.121644 → 0.121644 |

Single-run local timing is noisy and does not establish real-user speed. The CLS observer attributes the unchanged shift to the existing timed inquiry-widget aside and launcher, not the optimized images. The widget was intentionally left unchanged. Separate stable visual captures suppress its timed prompt equally before and after.

The hidden-image cause was server-rendered, ordinary `<img>` elements inside panels whose `hidden` attribute controls visibility. They lacked `loading="lazy"`. React emitted image preload links in the initial HTML, even though the navigation panels were closed. Kalynne, the ten therapist portraits and the Resources image were consequently downloaded on every page. Sample initial request priorities were Low; these requests did not require an explicit high-priority setting to happen. There is no Next/Image wrapper involved.

All twelve menu images now use native lazy loading and optimized WebP presentation assets. Fresh-context requests and HTML preload checks confirm **zero menu-image downloads before interaction** on all three measured pages. Opening panels triggers loading normally; text links remain server-rendered and usable independently of images. No conditional-rendering component or navigation state rewrite was necessary. Existing portrait frames reserve their layout; intrinsic dimensions were also added to the Resources image.

Kalynne uses `/assets/presentation/menu/kalynne-480.webp`, 480 × 720, 95,456 bytes versus the 1,447,861-byte original: a 93.4% asset reduction. This supplies three pixels per CSS pixel for the existing 160 × 240 image inside its 100 × 150 crop frame. The approved size, position, overflow and face framing remain unchanged. `/assets/kalynne.jpg`, the staff page and Contact portrait remain untouched.

The ten menu therapist derivatives retain each original's full aspect ratio and up to 500px width, without enlarging sources. Their original profile images and homepage therapist portraits remain unchanged. The Resources menu uses a 1200 × 800 derivative with its original composition.

The Blog index uses 53 full-aspect WebP variants for its 18 featured images, normally 400/800/1080px wide. The one smaller source is capped at its native 640px width, with no duplicate srcset descriptors or enlargement. The server-rendered index provides responsive `srcSet`/`sizes`, actual derivative width/height, and the original aspect ratio to prevent rounding-induced layout shifts. The first card remains eager; subsequent cards are lazy. All 19 cards, order, titles, dates, bylines, excerpts, alt text and destinations are preserved. Article pages continue using their preserved assets.

Before optimization the index requested all 18 originals, including the 5.68 MB community-spotlight PNG, 2.70 MB newest image, 1.30 MB holiday image and 1.18 MB storm image. Afterward it requests four nearby 400px thumbnails during the initial observation, with no original Blog image requests. The first thumbnail transfers 92,582 bytes including overhead.

Six homepage service-card images now use 800px WebP derivatives while retaining existing native lazy loading. Their browser-selected near-viewport loading remains appropriate. The 418 KB lake background is now a native lazy decorative image beneath the identical gradient, using the same original JPEG, cover positioning and reserved section size. It is absent from initial 390px requests and loads when approached. The homepage LCP remains `/assets/ivory-hero.jpg` with high fetch priority. The service LCP remains the existing eagerly loaded `/assets/individual-care.jpg`; no service-page image substitutions were made.

Navigation, carousel and widget dependencies are small local React components; Blog remains server-rendered. No obvious large removable third-party client dependency was found. No JavaScript rewrite was made. Measured decoded script bytes are unchanged: 454,362 on home and 450,122 on service/Blog. Fonts, `font-display: swap`, widget timing/avatar/flow, and Netlify submission code remain unchanged.

Source hashes captured before this batch confirm all existing image assets and content records are unchanged. The generator only reads originals and writes under `public/assets/presentation/`. Blog preservation tests independently verify the original bodies, snapshots and assets. Titles, descriptions, H1s, links, redirects, canonical/schema/sitemap/robots configuration and staging noindex/nofollow settings were not changed.

Responsive review covered home, both portrait menus, Blog, the anxiety service page and Contact at 375, 390, 768 and 1440px. Resources-menu loading was also tested. All measured section and Blog-card rectangles match the fresh baseline exactly. No horizontal overflow, broken visible images, distorted portraits or image-loading frame jumps were found. Service and Contact full-page screenshots are pixel-identical at all four widths. Menu portraits and the lake were visually compared before/after. Keyboard opening/dismissal, focus, mobile menu scrolling, carousel arrows, reduced motion and widget/menu suppression are covered by browser regressions.

Files changed in this batch:

- `components/header.tsx`: lazy menu images and derivative URLs/dimensions.
- `app/blog/page.tsx`, `lib/presentation-images.ts`, `lib/presentation-images.json`: responsive index-only thumbnails.
- `components/home/Services.tsx`, `components/home/NextSteps.tsx`, `public/ivory-design.css`: smaller card sources and deferred lake presentation.
- `public/assets/presentation/`: 71 new WebP files (12 menu, 53 Blog, 6 homepage).
- `scripts/generate-presentation-images.mjs`: repeatable derivative generation using the Sharp version bundled with the pinned Next dependency.
- `scripts/check-site.mjs`, `scripts/expect-performance.mjs`: explicit expected delivery changes while retaining strict content/structure checks.
- `tests/performance.browser.mjs`, `tests/presentation-images.browser.mjs`, `tests/presentation-images.test.mjs`: request, loading, responsive, dimension and preservation checks.
- Homepage PNG references and the mobile geometry reference under `tests/fixtures/homepage-batch1-*`: refreshed after visual review for the intentional encoding changes and the already-removed footer sentence. No pixel threshold or assertion was relaxed.
- This report.

Validation completed:

- `npm run build`: passed, production build completed.
- `npm run check`: passed, including strict checks across 72 built HTML pages (active and retained legacy files).
- `npm run lint`: passed with no warnings or errors.
- `git diff --check`: passed.
- Combined Playwright regression suite: **88 passed, 6 expected skips**, covering homepage pixels/geometry, navigation, staff, Blog, service pages, Batch 2 preservation and Contact interactions. Skips are desktop-only checks repeated in the mobile project. The initial test-output collision was eliminated by running the final suite sequentially; the affected service test passed.
- Blog preservation, inquiry and derivative unit tests: **28 passed**.
- Standalone homepage checks: passed at all four requested widths.
- Standalone Contact and inquiry-widget browser regressions: passed, including validation, mocked success/error, retained inputs, focus/Escape, timing/session behavior and responsive checks. No real submissions or mail were sent.
- New presentation-image browser checks: passed at all four widths, including keyboard-opened menus, reserved image frames, every visible main-content image and horizontal overflow.
- Fresh-context performance assertions: passed for all three measured routes.

No existing test assertion or tolerance was weakened. All 90 original asset hashes captured before this batch match afterward.

Raw before/after measurements, current-baseline screenshots and geometry are saved locally under `test-results/performance/` (ignored test artifacts). Reproduce the probe with `node tests/performance.browser.mjs after` against a production server on port 3032, or supply `INQUIRY_TEST_URL`. Run derivative verification with `node --test tests/presentation-images.test.mjs` and loading checks with `node tests/presentation-images.browser.mjs`.
