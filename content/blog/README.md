# Legacy blog content

## Verified author profile links

All 19 article-page bylines now link to verified current therapist profiles:
15 retain Jennifer Wood, LPC-S from their captured item and page bylines; four
use Erin's owner-approved attribution below. See [the per-article audit](AUTHOR-LINK-AUDIT.md).
Each reviewed metadata record opts in with `authorProfilePath`; there is no
automatic topic/name matching or generic-directory fallback. The reusable
article template leaves records without that property as plain text.
An optional `bylinePrefix` preserves the exact owner-approved `Written by` for
Erin while other articles retain their historical `Written By` wording.
Dates stay separate. Index cards retain plain author text inside their existing
article link, with no nested anchors. All body/source preservation checks remain.

## Traumatic Memories presentation exception

For `/news/2019/2/3/traumatic-memories-and-treatment`, the article template omits
its added featured image because the preserved body already starts with that
same Erin image. The featured asset and metadata remain available to the blog
index. An article-specific CSS class resets the CBS19 image wrapper's inline
`padding-bottom:55.76407241821289%` to zero: the normal-flow image already provides
that height, so the inherited reservation otherwise doubles the wrapper height.
No body HTML, text, order, image, link, source snapshot or checksum is changed.
Other articles retain their existing template and CSS presentation.

## Owner-approved author corrections

Erin Young confirmed authorship of Traumatic Memories and Treatment, Storm Anxiety,
Simple Ways to Lower Stress During the Holidays, and The Bridge Community Spotlight
Featuring Beth Reed. Their `displayedByline` is now `Erin Young, LCSW-S`, with an
optional `authorProfilePath` linking to `/therapists/erin-young/` in the template.
The displayed byline is `Written by Erin Young, LCSW-S`. This overrides historical
display metadata only: all `source/` snapshots, source hashes, article bodies,
dates, titles, media and URLs remain unchanged. Preservation tests explicitly
allow these four corrections while continuing to verify the original evidence.

**All 19 published legacy articles are now imported.** See [the completed migration report](MIGRATION-REPORT.md) for the 18 new titles, every route/preservation result, image mappings, source discrepancies, Vimeo playback, validation and launch follow-up. The original Navigating Life Transitions content files and image remain unchanged.

The sections below document the established architecture and historical batch-one implementation; the completed migration report supersedes their one-article status and deferred-import notes.

Each article occupies one directory:

```
content/blog/<record-name>/
  metadata.json       exact original metadata + local asset mapping + capture hashes
  body.html           reviewed original content, without platform layout wrappers
  source/
    page.html         original full HTML response
    item.json         original article item, including author biography
    body.html         unmodified Squarespace body HTML
public/assets/blog/<record-name>/
  image-asset.jpeg    original downloaded image bytes
```

`lib/blog.ts` discovers record directories, validates identifying fields and duplicate paths, loads their HTML, and sorts by the original publication timestamp. The index and one catch-all article route use the same records. Both dated and undated `/news/...` paths are supported. Request parameters are matched against known records, never used as filesystem paths. Missing records are not published.

## Source preservation

Treat `source/` as immutable evidence, not editable content. The capture script refuses to overwrite an existing directory. SHA-256 hashes cover the captured page, original item, original body, rendered-body source, and JPEG. `.gitattributes` prevents Git newline conversion of those hashed files. Tests check every checksum.

Batch one extracts the exact inner-HTML substring of the sole `.sqs-html-content` element using parser source offsets. It does not reserialize the fragment. The original elements, attributes, empty paragraphs, seven H2 elements (including the empty H2), text, punctuation, capitalization, whitespace, and telephone link remain unchanged. Only outer Squarespace wrappers, platform asset attributes, and wrapper styling are omitted.

The rendered HTML is trusted **reviewed local content**, never arbitrary request data or runtime CMS input. Inspect any later article for scripts, event handlers, unsafe links, embeds, and image blocks before importing. Do not blindly apply this first article's text-block extractor to other layouts. Preserve untouched source evidence; record any mechanical asset/embed changes separately and verify their visible content and order.

## Images

Original: https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/1693490213078-EERIGYEIR8QGVAHRLVKN/image-asset.jpeg

Local: `/assets/blog/navigating-life-transitions/image-asset.jpeg`

2500 × 1667, original JPEG, 290,182 bytes. SHA-256: `dc43cf37d97a9e4b9e957dd125c719f7aca0ea7f135d833b11310ff3f0eb8e63`.

The CDN may negotiate WebP despite a `.jpeg` URL. The capture requires JPEG and verifies its signature. No image conversion/cropping is performed; CSS scales it proportionally. The source featured image has no supplied alt description; none was invented.

## Routing and staging

Content identity and every article link use `/news/navigating-life-transitions`. Existing `trailingSlash: true` is unchanged, so staging returns **308** to `/news/navigating-life-transitions/`, then **200**. Do not treat this as completed slashless production preservation.

Next.js 16.3.5 performs its automatic slash redirect before ordinary route rendering. A page-specific component cannot suppress it. The installed `skipTrailingSlashRedirect` documentation describes disabling automatic normalization globally and reproducing selective slash behavior in Proxy. Defer that broader routing change to the migration/launch decision, preserving current site behavior in this batch. No legacy redirect map, production canonical, sitemap, or Open Graph delivery system is added. Original canonical/OG values are retained in metadata as source evidence. Global `noindex, nofollow` remains inherited.

## Template and presentation differences

`components/blog/article-template.tsx` wraps original content in the shared SiteShell, with breadcrumb, exact title and byline, original date, responsive original featured image, and an outside-body return link. No service links, marketing copy, or new CTA enters the original body. Header/footer and inquiry widget come from SiteShell.

The live Squarespace article does not display its featured image above the body; the new template does, as requested. There are no images within this article's original body. The same original photograph is used on the one index card. The date is displayed as “August 31, 2023” rather than the live template's “Aug 31”; the underlying original date and timestamp are preserved. The old shared author-profile biography, adjacent-post navigation, newsletter, and Squarespace footer are not reproduced; the full biography remains in the source item/page. The original displayed byline remains unchanged. Fonts, colors, line wrapping, spacing and site chrome intentionally use the new Bridge design. There are **no original body-content differences**.

## Adding subsequent records

Capture each additional live article, verify its layout and all media, localize images, add its metadata/body/source directory, and extend preservation fixtures and tests. Keep exact paths, dates, body attributions, and any existing anomalies. New records automatically create index cards and static article pages; no per-article React page is needed. Do not manufacture excerpts. Add no other articles until authorized.

## Validation commands

Run `npm run build` before checks that inspect production output:

```
npm run build
npm run check
npm run lint
npm run test:blog
node scripts/verify-legacy-post.mjs
git diff --check
```

`test:blog` covers record loading, immutable hashes, exact DOM/text preservation, metadata, index card, slash behavior, unknown-route 404, proportional images, overflow, navigation and inquiry interaction at 375/390/768/1440px. Its isolated production server uses port 3018 and never reuses a development server. Screenshots are written under ignored `test-results/blog/`. Live verification requires network access; deterministic tests do not.

## Batch-one files and verification

Created:

- `.gitattributes`
- `app/blog/page.tsx`
- `app/news/[...slug]/page.tsx`
- `components/blog/article-template.tsx`
- `lib/blog.ts`
- `public/blog.css`
- `public/assets/blog/navigating-life-transitions/image-asset.jpeg`
- `content/blog/README.md`
- `content/blog/navigating-life-transitions/metadata.json`
- `content/blog/navigating-life-transitions/body.html`
- `content/blog/navigating-life-transitions/source/page.html`
- `content/blog/navigating-life-transitions/source/item.json`
- `content/blog/navigating-life-transitions/source/body.html`
- `scripts/capture-legacy-post.mjs`
- `scripts/verify-legacy-post.mjs`
- `tests/blog.test.mjs`
- `tests/blog.spec.ts`
- `playwright.blog.config.ts`

Changed:

- `components/header.tsx`: Articles & resources links to `/blog/` in the same tab; external-arrow glyph becomes an internal-navigation arrow.
- `components/footer.tsx`: existing Resources link also points to `/blog/`.
- `package.json`: adds `test:blog` and includes its Playwright config in linting. No dependency changes.
- `scripts/check-site.mjs`: applies only the two approved shared-navigation changes to its in-memory comparison reference, asserts their counts, and includes blog routes in link/asset/widget checks. No historical reference files or existing test assertions were removed.

Verified September 16, 2026:

- Production build passes; only one `/news/...` article is generated.
- `npm run check`, `npm run lint`, and `git diff --check` pass.
- Four blog content tests pass, including all source and image SHA-256 checks.
- Ten production browser tests pass (desktop and mobile contexts; 375, 390, 768 and 1440px).
- The three existing inquiry unit tests and the unchanged comprehensive `tests/inquiry-widget.browser.mjs` suite pass against a fresh production server, including mocked submission/retry/errors, all ten therapist contexts, focus/Escape, session behavior, and responsive/reduced-height viewports. No real submissions were made.
- A fresh live page/feed/image comparison passes after implementation.
- Live and migrated screenshots were visually inspected; responsive article/index screenshots are in the ignored test output folder.
- Original title, byline, timestamp/date, empty excerpt, metadata title/description and original body nodes/attributes/text agree with the live source. All seven H2s, including the empty fourth H2, are retained.
- No horizontal overflow; the original 2500 × 1667 JPEG scales proportionally. Index card, breadcrumb, shared navigation and inquiry name/reply/focus/Escape flow pass at every requested width.
- Staging remains `noindex, nofollow`. Legacy path request returns 308 to its slash form, then 200. Unimported article returns 404. The installed Next.js version logs `NoFallbackError` for the intentionally ungenerated static-path test while correctly returning 404.
- No push, deployment, CMS, database, new dependencies, or migration of the other 18 articles.
