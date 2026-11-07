# BabyLoveGrowth staging integration

The existing `/blog/`, `/blog/[slug]/`, 19 migrated articles, original templates,
sitemap, indexing guards and production settings are unchanged.

## Implemented

- Official `babylovegrowth-next-js-blog` 0.2.4 server-side read client.
- Isolated `/blog/cms-preview/` list and `/blog/cms-preview/[slug]/` article previews.
- Disabled unless `BRIDGE_BABYLOVE_PREVIEW=true` and a server-side
  `BABYLOVEGROWTH_BLOG_API_KEY` exist. On Netlify, also requires the exact staging
  site ID `c9ac64dc-b248-4666-bc90-6219f2b483a4` and `BRANCH=staging`; local access requires development mode.
- Always noindex/nofollow. Not linked from public navigation or the sitemap.
- Published-only content, matching The Bridge website, validated slugs, one-hour
  response caching, 15-second timeout, fixed official API destination and no redirects.
- Only the newest 50 articles are previewed. This is a bounded trial preview.
- HTML is parsed using parse5 and rebuilt with a small formatting-only tag allowlist.
  No attributes, images, scripts, forms, embeds, external styles or upstream JSON-LD
  are rendered. It is deliberately not a pixel-identical article preview.

## Pending owner-controlled setup

1. In the correct BabyLoveGrowth website account, open Settings → Publishing →
   Next.js Blog. Reuse the existing site key if present; do not rotate blindly,
   because other integrations share it.
2. Obtain action-time approval before creating a key or configuring ongoing access.
   Store it as a secret environment variable on **bridge-therapy-staging only**.
   Never put it in Git, chat, client code, or a NEXT_PUBLIC variable.
3. Set the staging preview flag, deploy the reviewed staging commit, and verify a
   published test article belongs to `thebridgetherapy.com` or its www host.
4. Confirm disabled routes return 404, preview robots are noindex, the existing
   blog still works, and production's commit/deploy is unchanged.

The preview is not password-protected. Once explicitly enabled, already-published
vendor articles can be read at its staging URL; noindex is not access control.

## Production is not connected

This change does not enable automatic publishing, add imported articles to the
public blog, create credentials, alter the BabyLoveGrowth account, or change
production. After editorial/clinical review and explicit publication approval,
implement a durable content/image sync into the existing blog model, including
slug collisions, removal handling, sitemap updates, image checks and error recovery.
Do not use the package scaffold over the existing blog or loosen CSP to all hosts.

Official instructions: https://www.babylovegrowth.ai/docs/integrations/nextjs-blog
API instructions: https://www.babylovegrowth.ai/docs/integrations/api
