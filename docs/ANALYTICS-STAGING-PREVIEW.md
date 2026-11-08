# No-popup Analytics design preview

Staging-only design preview requested by Adam. The footer has a native closed disclosure matching the proposed production design, with simulated turn-off/turn-on state. It never opens automatically or floats over content.

This component imports no analytics provider and performs no network, cookie or storage operations. It clearly labels its controls as a preview. The existing trusted staging build flag gates it; production and other site identities exclude it. Existing restrictive CSP, noindex, password protection, CMS integration and article content are unchanged.

This preview tests presentation, accessibility and local button behavior only. It does not test default-on production measurement, saved choices, cookie lifetime, outgoing GA payloads or Google receipt. Production publication remains on hold pending review.

Checks: eight preview/security tests, staging production build, TypeScript/site checks and ESLint. Hosted verification is a separate post-deploy step.
