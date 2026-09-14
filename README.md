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
| Base directory | Repository root (`base = "."` in `netlify.toml`); leave the UI field empty |
| Package directory | Leave empty |
| Build command | `npm run build` |
| Publish directory | `.next` |
| Node version | `24` (`NODE_VERSION` in `netlify.toml`) |
| Functions directory | Leave unset; managed by the adapter |
| Next.js adapter | Netlify's automatic OpenNext adapter; no manually pinned plugin |

No application secrets or backend environment variables are required. Do not add a static-site SPA fallback redirect or use `public` as the publish directory. Netlify manages the Next.js runtime; there is no custom start command to configure there.

References: [Netlify build settings](https://docs.netlify.com/build/frameworks/overview/#nextjs) and [Next.js on Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/).

### Successful build but Netlify returns a generic 404

The `.next` directory is Next.js build output, not a deploy-ready static site.
Netlify must automatically run its OpenNext adapter after `npm run build` to
generate the functions and routing configuration. Keep `publish = ".next"`;
changing it to `public`, `out`, or `.next/server/app` does not fix a missing adapter.

The repository has Next.js 16.3.5 in both `package.json` and `package-lock.json`,
Node 24 in `.nvmrc` and the build environment, and no manual adapter dependency,
static export, `_redirects`, `_headers`, or Netlify catch-all rewrite. The redirects
in `next.config.ts` only preserve legacy URLs and do not intercept `/`.

If a hosted build has no Next.js Runtime/OpenNext events:

1. Confirm the deployed commit includes the root Next.js `package.json` and this
   `netlify.toml`. Leave the package directory empty; `legacy/` is only an archived
   comparison site, not the application package.
2. Remove `NETLIFY_NEXT_PLUGIN_SKIP` from project/shared environment variables in
   every applicable deploy context if present. Do not set it to the string `false`:
   Netlify's current framework detector treats any nonempty value as a skip.
3. Under **Project configuration > Build & deploy > Build plugins**, ensure the
   Next.js integration has not been disabled. Use Netlify's automatically updated
   integration; do not pin a legacy runtime in `package.json` or `netlify.toml`.
4. On the next separately authorized deployment, verify the log contains
   `Using Next.js Runtime` and adapter `onBuild` / `onPostBuild` events. A successful
   `next build` by itself does not verify that Netlify routing was generated.

For local inspection without deploying, run `netlify build --dry --offline` with
the current Netlify CLI. During the September 2026 repository audit, CLI 27.6.0
detected this root application and automatically selected Next.js Runtime 5.15.13.
Its internal package name is still `@netlify/plugin-nextjs`; seeing that name in
the log does not mean a legacy version was manually installed. The dry run
scheduled the adapter's pre-build, build, and post-build hooks without adding it
to the application's dependencies. A full `netlify build --offline` also passed
and bundled `___netlify-server-handler` with a `/*` route. Stop local Next.js
preview servers before this command on Windows: they can hold `.next` open and
prevent the adapter from swapping its static publish directory. Hosted
configuration was not available to confirm which external setting caused the
reported missing-adapter deployment.

No push or deployment was performed. See `MIGRATION.md` for the file inventory and validation results.
