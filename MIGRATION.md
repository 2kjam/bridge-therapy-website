# Next.js migration report

The Bridge website now runs as a standard Next.js 16.3.5 App Router application with React 19.3.0 and TypeScript. All 19 content pages are prerendered. The existing children-families redirect is configured in Next.js, and old index.html URLs redirect to their matching routes.

## Validation

- Production build: passed; all 19 content routes prerendered.
- ESLint: passed with no warnings or errors.
- TypeScript and migration check: passed across all 19 pages. Checks cover original element structure, wording, metadata, exact stylesheet order, links, image references, anchors, unique IDs, and removal of legacy script loading.
- Browser suite: 17 passed, 1 intentionally skipped (desktop hover on a mobile device).
- Homepage screenshot comparison: no detected pixel differences at 1440 ? 1000 desktop and 390 ? 664 mobile viewports. Full-page geometry matched exactly. The comparison uses the same installed Edge/Chromium browser and reduced motion on both versions; separate tests verify active animations.
- After archiving the legacy HTML/JS, both desktop/mobile visual comparisons passed again with zero detected pixel differences (3,369,600 desktop pixels and 1,647,360 mobile pixels).
- Navigation, mobile menu, keyboard focus, Escape/outside dismissal, therapist scrolling, specialty/chat previews, insurance animation and interaction pauses, reduced motion, scroll reveals, contact navigation, FAQ disclosures, all content routes, legacy redirects, and no-JavaScript content were tested.
- Both next dev and next start ran locally. The development homepage returned HTTP 200.
- No source CSS, image, logo, or font asset was altered.
- No pushes or deployments were performed.

## Preserved behavior and implementation choices

There is no known functionality that could not be migrated. The original preview dialogs remain previews; no backend, form processing, analytics, database, or chatbot service was added. Each page keeps its original title and description through Next.js metadata exports. The existing noindex/nofollow indexing policy is preserved.

Original image elements, full-page anchors, and stylesheet files are intentional to preserve rendering and page-specific CSS behavior. React components implement the interactive behavior; no legacy scripts or raw HTML-string rendering are used. Client effects clean up observers, animation frames, media-query listeners, and global keyboard/focus handlers.

The migration fixed the React-specific timing needed to focus the therapist menu after opening the mobile navigation. Mobile and desktop behavior now passes the regression tests.

TypeScript 6 and ESLint 9 are pinned to versions accepted by Next.js's current lint-plugin dependency ranges. The npm lockfile records all exact installed versions.

## Changed files

- package.json: Next.js/React dependencies, dev/build/start/lint/check/test scripts, and Node 24 engine.
- .gitignore: generated Next.js typing file and Netlify output ignored.
- README.md: application structure, development, testing, archive, and Netlify instructions. The previous text is preserved in legacy/README-original.md.
- The following old runtime files moved to the same relative paths under legacy/public after validation; their bytes were checked before moving:

- `public/adhd-counseling-tyler/index.html`
- `public/adoption-counseling-tyler/index.html`
- `public/anxiety-counseling-tyler/index.html`
- `public/app.js`
- `public/child-teen-counseling-tyler/index.html`
- `public/children-families/index.html`
- `public/christian-counseling-tyler/index.html`
- `public/contact/index.html`
- `public/depression-counseling-tyler/index.html`
- `public/divorce-blended-family-counseling-tyler/index.html`
- `public/emdr-therapy-tyler/index.html`
- `public/family-counseling-tyler/index.html`
- `public/grief-counseling-tyler/index.html`
- `public/homepage-motion.js`
- `public/index.html`
- `public/individual-counseling-tyler/index.html`
- `public/life-transitions-counseling-tyler/index.html`
- `public/marriage-counseling-tyler/index.html`
- `public/parenting-support-tyler/index.html`
- `public/pregnancy-postpartum-counseling-tyler/index.html`
- `public/premarital-counseling-tyler/index.html`
- `public/trauma-therapy-tyler/index.html`

## Created application/configuration/test files

- `.nvmrc`
- `AGENTS.md`
- `CLAUDE.md`
- `app/adhd-counseling-tyler/page.tsx`
- `app/adoption-counseling-tyler/page.tsx`
- `app/anxiety-counseling-tyler/page.tsx`
- `app/child-teen-counseling-tyler/page.tsx`
- `app/christian-counseling-tyler/page.tsx`
- `app/contact/page.tsx`
- `app/depression-counseling-tyler/page.tsx`
- `app/divorce-blended-family-counseling-tyler/page.tsx`
- `app/emdr-therapy-tyler/page.tsx`
- `app/family-counseling-tyler/page.tsx`
- `app/grief-counseling-tyler/page.tsx`
- `app/individual-counseling-tyler/page.tsx`
- `app/layout.tsx`
- `app/life-transitions-counseling-tyler/page.tsx`
- `app/marriage-counseling-tyler/page.tsx`
- `app/page.tsx`
- `app/parenting-support-tyler/page.tsx`
- `app/pregnancy-postpartum-counseling-tyler/page.tsx`
- `app/premarital-counseling-tyler/page.tsx`
- `app/trauma-therapy-tyler/page.tsx`
- `components/footer.tsx`
- `components/header.tsx`
- `components/home/Faith.tsx`
- `components/home/Hero.tsx`
- `components/home/NextSteps.tsx`
- `components/home/Services.tsx`
- `components/home/TherapistsAndLocation.tsx`
- `components/home/homepage-main.tsx`
- `components/insurance-carousel.tsx`
- `components/navigation.tsx`
- `components/page-styles.tsx`
- `components/site-interactions.tsx`
- `components/site-shell.tsx`
- `components/team-carousel.tsx`
- `eslint.config.mjs`
- `lib/use-reduced-motion.ts`
- `netlify.toml`
- `next.config.ts`
- `package-lock.json`
- `playwright.config.ts`
- `scripts/check-site.mjs`
- `tests/migration.spec.ts`
- `tsconfig.json`
- MIGRATION.md (this report)

Next.js also generates the ignored next-env.d.ts file during development/build. AGENTS.md and CLAUDE.md were generated by next dev as standard Next.js agent guidance.

## Archived files and comparison tools

- `legacy/README-original.md`
- `legacy/check-site.cjs`
- `legacy/migrate-markup.py`
- `legacy/package.json`
- `legacy/preview-server.cjs`
- `legacy/public/adhd-counseling-tyler/index.html`
- `legacy/public/adoption-counseling-tyler/index.html`
- `legacy/public/anxiety-counseling-tyler/index.html`
- `legacy/public/app.js`
- `legacy/public/child-teen-counseling-tyler/index.html`
- `legacy/public/children-families/index.html`
- `legacy/public/christian-counseling-tyler/index.html`
- `legacy/public/contact/index.html`
- `legacy/public/depression-counseling-tyler/index.html`
- `legacy/public/divorce-blended-family-counseling-tyler/index.html`
- `legacy/public/emdr-therapy-tyler/index.html`
- `legacy/public/family-counseling-tyler/index.html`
- `legacy/public/grief-counseling-tyler/index.html`
- `legacy/public/homepage-motion.js`
- `legacy/public/index.html`
- `legacy/public/individual-counseling-tyler/index.html`
- `legacy/public/life-transitions-counseling-tyler/index.html`
- `legacy/public/marriage-counseling-tyler/index.html`
- `legacy/public/parenting-support-tyler/index.html`
- `legacy/public/pregnancy-postpartum-counseling-tyler/index.html`
- `legacy/public/premarital-counseling-tyler/index.html`
- `legacy/public/trauma-therapy-tyler/index.html`
- `legacy/routes.json`
- `legacy/server.cjs`

The archived HTML and JavaScript are not served by Next.js. The legacy preview server is explicitly available only through npm run dev:legacy for comparisons.

The original root server.cjs, check-site.cjs, build-*.cjs, apply-ivory-design.cjs, and root HTML fragments are retained but unused by the new runtime and build. They should not be used to edit the migrated application.

## Netlify settings for later

| Setting | Exact value |
| --- | --- |
| Framework preset | Next.js |
| Base directory | Leave empty (repository root) |
| Package directory | Leave empty |
| Build command | npm run build |
| Publish directory | .next |
| Node version | 24 |
| Environment | NODE_VERSION=24, already in netlify.toml |
| Functions directory | Leave unset; managed automatically |
| Adapter | Automatic Netlify OpenNext adapter; no manual plugin pin |
| Application secrets | None required |
| Custom start command | None on Netlify |

netlify.toml contains the build command, publish directory, and Node version. Retain the automatic Next.js integration; do not publish public or add a static SPA fallback.

Settings verified against [Netlify's framework build settings](https://docs.netlify.com/build/frameworks/overview/#nextjs) and [Next.js adapter documentation](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/).
