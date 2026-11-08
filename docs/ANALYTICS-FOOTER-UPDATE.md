# Analytics without popups — approved production update

Adam reviewed staging and approved updating production and testing it. The automatic Analytics panel and floating preferences button are removed. Tracking renders no visible UI. The footer contains only an ordinary Privacy link to /privacy/, with the disclosure and on-page turn-off/turn-on controls.

Measurement destination remains G-61RSPK36Y0. After saved preferences are read, unknown/granted choices enable ordinary analytics. Existing denied choices, GPC/DNT, storage errors, untrusted hosts and staging/previews keep it off. No default choice is stored as visitor consent. Analytics storage is enabled only when measurement is on, with a 90-day cookie lifetime and no automatic renewal. Advertising storage/data/personalization remain denied. Opt-out disables the destination and expires the two known GA cookies without reading their values.

Configured page views use a fixed home URL and business title, blank referrer and campaign fields. No treatment/article paths, query/hash data, forms/chat contents or custom user IDs are configured. Google still receives standard connection/device information and pseudonymous Analytics identifiers. Detailed page/source/campaign reports are intentionally unavailable. Enhanced Measurement was disabled in the verified GA stream before the earlier release. No claim of visitor consent, legal sufficiency or complete privacy compliance is made by this configuration.

Checks before release: 15 analytics/security tests; production build; TypeScript, 78-page content/metadata/link checks; ESLint. Hosted responsive/choice behavior, real outgoing payloads/cookies and Google receipt require independent post-release verification. Unit tests alone do not prove Google receipt.

Production source baseline: 10724f54ae1779ddd63ba7803e45f76bcdd095a3. Rollback is previous deploy 6af0e60ae2f91d352bc7de5b (which restores the former popup). No unrelated site content, draft publication, GTM setup or staging settings change is included.
