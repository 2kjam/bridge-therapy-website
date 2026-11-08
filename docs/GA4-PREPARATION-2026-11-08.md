# GA4 release — 2026-11-08

Destination: G-61RSPK36Y0, verified in the signed-in Bridge property (bandflix), stream 16288749629. Enhanced Measurement was turned off and the off state verified before release. No connected site tags were present.

Production-only direct GA4 loader; the separate GTM-W4PHT6RP preparation is not merged. Visitor opt-in precedes script loading; browser privacy signals override opt-in. All consent storage remains denied, advertising features are disabled, and only aggregate page views with fixed origin/title and blank referrer/campaign fields are queued. No form/chat contents, topic paths or URL parameters are read. The saved local preference is not a visitor ID. Google still receives connection information and may use transient identifiers. Detailed page/source/user reporting is intentionally unavailable.

CSP adds only the exact gtag/js script and www/region1.google-analytics.com/g/collect endpoints. Staging/previews and noncanonical hosts fail closed. No security directive is removed.

Verification: 13 focused analytics/security tests; production build, TypeScript/site checks and ESLint. Actual hosted tag requests and property receipt require separate post-deploy verification and are not proven by unit tests.

Rollback: revert this release commit or restore the previous production deploy. Enhanced Measurement can remain off safely.
