# Staging article presentation alignment

Staging selectively reuses production d0b800cf7f952d79c4734c721bcccc663460c5bb article template, author resolver/cards, native reviewed snapshots and image variants, author metadata/schema support, and blog CSS. The CMS gate, API, pagination, cache, media proxy, password protection, indexing rules and production branch remain unchanged.

Coverage: 22 local published articles (19 legacy, two reviewed guides, one team announcement). Verified cards: 17 Jennifer, four Erin, none for the team announcement. Existing native snapshots, author credentials, bodies and dates are copied exactly from production. The blog listing reserves local paths so CMS counterparts are not duplicated.

Generated staging drafts share production typography, breadcrumbs and callout proportions. Safe vendor card divs become semantic headings/paragraphs with the same text, links and images. First inline image loads eagerly; later images remain lazy. CMS drafts are clearly marked as awaiting publication approval. No author is inferred from a quotation, subject or image. The vendor API provides no author field; Blended Family Counseling (1077552) retains its body signature but has no invented author/card or schema assertion. It remains staging-only.

Validation: Next build, TypeScript/site checks (76 pages), lint and 71 focused node tests pass. Because staging routes are dynamic, four local HTTP responses were captured to ignored .next artifacts before static HTML assertions. These artifacts are validation output only. Hosted verification follows the staging deployment.
