# The Bridge Therapy — Next.js

The existing website now runs on Next.js 16.3.5, React 19, the App Router, and TypeScript. Its original CSS, images, copy, and responsive layout are retained.

## Local development

Use Node.js 24 (also set in `.nvmrc`).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. On Windows PowerShell, use `npm.cmd` if the local execution policy prevents running `npm.ps1`.

## Production and validation

```sh
npm run build
npm run start
npm run lint
npm run check
npm run test:e2e
```

`check` runs TypeScript and compares the production HTML with the archived site, so run `build` first. It checks all 19 pages, including content, element structure, metadata, CSS ordering, local links, images, anchors, and IDs.

The Playwright suite starts production and legacy comparison servers on ports 3000 and 4322. It uses installed Microsoft Edge with desktop and mobile emulation, verifies interactions and all content routes, and compares homepage screenshots against the original. Install Microsoft Edge on the test machine, or select an installed Playwright browser channel in `playwright.config.ts`. Test screenshots and traces are written under the ignored `test-results/` directory.

## Editing the application

- `app/page.tsx`: homepage composition and metadata.
- `app/<route>/page.tsx`: existing contact and counseling pages with individual metadata.
- `components/home/`: hero, services, faith section, therapists/location, next-step CTA, and homepage reveal behavior.
- `components/header.tsx`, `navigation.tsx`, `team-carousel.tsx`: shared navigation and therapist menu.
- `components/insurance-carousel.tsx`: the original 12 logos, continuous scrolling, interaction pauses, and reduced-motion behavior.
- `components/site-interactions.tsx`: existing specialty/chat preview dialogs and therapist CTA.
- `components/footer.tsx`, `site-shell.tsx`, `page-styles.tsx`: shared page framing.
- `public/`: unchanged CSS, images, logos, and local fonts. Stylesheets load in each page's original cascade order.

Ordinary image elements and full-page anchor navigation are intentional: they retain the original rendering, URL behavior, and per-page CSS isolation. There is no HTML-string renderer or globally injected legacy JavaScript.

The original `noindex,nofollow` setting is retained in `app/layout.tsx`. Titles and descriptions use Next.js metadata exports. This migration does not change the site's existing preview content or implement the future chatbot or specialty pages.

## Legacy reference

The original 20 HTML documents and two JavaScript files are preserved under `legacy/public/`, outside the public runtime directory. Run `npm run dev:legacy` to view them at http://127.0.0.1:4322 using the shared unchanged CSS and assets. `legacy/README-original.md` preserves the previous project notes.

The original root `server.cjs`, `check-site.cjs`, `build-*.cjs`, `apply-ivory-design.cjs`, and HTML source fragments are historical tools, unused by Next.js. Do not run the old generators against the migrated application. `legacy/migrate-markup.py` documents the one-time conversion; normal editing happens in the React source files.

## Netlify settings for a future deployment

The checked-in `netlify.toml` configures:

| Setting | Value |
| --- | --- |
| Framework | Next.js (auto-detected) |
| Base directory | Repository root; leave empty |
| Package directory | Leave empty |
| Build command | `npm run build` |
| Publish directory | `.next` |
| Node version | `24` (`NODE_VERSION` in `netlify.toml`) |
| Functions directory | Leave unset; managed by the adapter |
| Next.js adapter | Netlify's automatic OpenNext adapter; no manually pinned plugin |

No application secrets or backend environment variables are required. Do not add a static-site SPA fallback redirect or use `public` as the publish directory. Netlify manages the Next.js runtime; there is no custom start command to configure there.

References: [Netlify build settings](https://docs.netlify.com/build/frameworks/overview/#nextjs) and [Next.js on Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/).

No push or deployment was performed. See `MIGRATION.md` for the file inventory and validation results.
