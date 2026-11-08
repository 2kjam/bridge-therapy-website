# Approved article release

Adam approved production publication of the two reviewed staging articles on November 8, 2026 at 01:12 UTC and requested optimization. Their publication date is November 7 in the practice's America/Chicago timezone.

Only two static records were added to the established native blog collection. No vendor client, API key, dynamic feed, CMS media endpoint, or staging integration is included in production. Future vendor changes require a new individual review and committed snapshot. Existing production content, security headers, indexing guards, and staging configuration are unchanged. The unrelated Google tag branch is excluded.

Authenticated staging DOM captures match these SHA-256 hashes after trimming outer whitespace:

- Religious trauma (vendor 1069962): `ede6d7af8ff592b7a2c4aad7b3d506e2827ceeaf16bcb043e868aaccb3fe8934`
- Online couples (vendor 1069980): `b76b26b8791173b6ff42f394c809d13e792bee50f6365565cc7ea03e689c9cd4`

Capture origin: staging deploy `6aef6e1a4102a969d4e02735`. Individual source timestamps and original image URLs, hashes, dimensions, and byte sizes are in each article's source.json. Source IDs above were verified from rendered article attributes; initial handoff notes had them reversed.

## Optimizations

- Reuse the native article template: organization byline, BlogPosting/WebPage/BreadcrumbList schema, canonical, Open Graph/Twitter metadata, normal collection cards, sitemap, article navigation.
- Concise unique search titles and descriptions; preserve the substantive reviewed guide, summary, table of contents, FAQs, citations, headings and images.
- Remove empty attribution paragraphs and the remaining religious article vendor credit; neither article includes Adam in rendered copy or metadata.
- Replace flattened nested vendor cards with semantic, mobile-readable support cards and relevant service links. Normalize internal links to their final slash URLs; remove nofollow from reviewed editorial and jump links.
- Copy only the six approved public images into local uncropped WebP variants with intrinsic dimensions, responsive srcset, lazy inline images, and a high-priority hero.
- Clarify EMDR evidence applies to PTSD when clinically appropriate and memory-processing estimates are not a guaranteed religious-trauma treatment timeline.
- Clarify HIPAA scope, that quoted national costs are not The Bridge fees, and that both partners' physical session locations determine telehealth authorization. Add the official Texas BHEC source.

## Sources checked

- https://pubmed.ncbi.nlm.nih.gov/37703549/
- https://pubmed.ncbi.nlm.nih.gov/32134290/
- https://pmc.ncbi.nlm.nih.gov/articles/PMC8855148/
- https://pmc.ncbi.nlm.nih.gov/articles/PMC8127847/
- https://www.ptsd.va.gov/professional/treat/txessentials/overview_therapy.asp
- https://www.apa.org/ptsd-guideline/treatments/eye-movement-reprocessing
- https://www.counseling.org/publications/counseling-today-magazine/article-archive/article/legacy/helping-clients-navigate-religious-trauma
- https://telehealth.hhs.gov/providers/best-practice-guides/privacy-and-security-telehealth/privacy-laws-and-policy-guidance
- https://bhec.texas.gov/tbhec/virtual-practice-and-mobility-faqs/

## Recovery

If the published release needs removal, revert this release commit on main and let Netlify Git continuous deployment build it. Do not restore a detached historical deploy. A failed build leaves the previous production deploy live.

## Validation

The candidate passed Next.js build, TypeScript, lint, all 76 page integrity checks, historical blog preservation, and structured-data tests. Authenticated staging captures were visually inspected and SHA-256 matched exactly before the documented transformations. The public production blog was independently inspected before release and contained the original 20 posts.

System Chromium could not launch in this execution environment (`socket() failed: Operation not permitted`). The Playwright fallback headless-shell download returned an invalid/truncated ZIP. Consequently the automated browser suite cannot complete here; its HTTP route tests passed, and responsive assertions were extended for the two new articles for future runs. Live browser and HTTP checks follow deployment.
