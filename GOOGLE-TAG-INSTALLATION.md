# Google Tag Manager installation preparation

Container: `GTM-W4PHT6RP`.

Google's current installation instructions use `gtm.js` with a data-layer
initialization and `gtag('js', new Date())`. The supplied snippet matches those
instructions. The previous two-part loader and noscript iframe are still
supported but are not needed in addition to this snippet.

Source: https://support.google.com/tagmanager/answer/14847097?hl=en

## Current state

The shared root layout includes one copy, gated by the trusted deployment
variable `BRIDGE_ENABLE_GOOGLE_TAG=true`. The default is disabled. No CSP,
Netlify environment, indexing controls, production branch, or live container
settings are changed by this preparation. The current CSP deliberately blocks
external scripts, so setting the flag alone is not a completed installation.

## Before activation

1. Review the actual container in Google Tag Manager, including existing tags,
   triggers and Custom HTML. Container installation permits its configured
   JavaScript to execute on pages; absence of form-event code in this repository
   does not prove that the container will not read form fields or URLs.
2. Review privacy disclosures and consent requirements for this therapy site.
   The repository has a warning against submitting health information in the
   contact form, but no general privacy policy or consent manager was found.
   Do not enable form tracking, enhanced conversions, user-provided data,
   remarketing or patient identifiers without a separately approved design.
3. Obtain approval for the security-policy change permitting the exact Google
   Tag Manager script origin. Do not loosen CSP to a wildcard, or enable other
   analytics/advertising destinations without reviewing the actual tags.
4. Enable and verify only on isolated staging first. Keep
   `BRIDGE_ENABLE_INDEXING=false`. Use synthetic inputs, never live inquiries.
5. Verify one loader, startup ordering, console/CSP errors, consent behavior,
   navigation, and Tag Assistant. Confirm no form values or health information
   in network requests. Container publication and analytics destination setup
   are separate from the site's loader installation.
6. Obtain explicit production release approval before any main-branch merge.

Tests: `node --test tests/google-tag.test.mjs`, `npm run lint`,
`npm run build -- --webpack`, `npm run check`.
