# Staging article reconciliation — November 16, 2026

Production is authoritative for published articles. Its current Netlify deploy
`6af8be346b094d3dd3869d24` uses main commit
`475db7d0cd26a128b5b3724f37ae013080dcc25b`.

Restored the two missing durable articles (Adjustment Disorder Therapy and Therapy
Cost in Texas), their original BabyLoveGrowth assets and responsive-image mapping
from that production commit. All historical/new blog content and blog assets now
match production exactly. The local-post-first routes prevent older CMS versions
from overriding reviewed published articles. Unrelated staging features remain.

Per Adam's November 16 direction, new validated CMS articles default to Jennifer
Wood LPC-S unless he specifies otherwise. Historical local authorship is unchanged.
The existing paginated draft feed remains staging-only, retains original vendor
images, and lists unpublished review content in the main blog with draft labels.
No production branch, publication status, access setting or credential changed.

Verified: production source identity, build, lint, TypeScript, aggregate 82-page
site check and 19 CMS/authorship tests. Article source/image parity is exact.
Browser tests could not launch because this executor denies Chromium's socket;
legacy static-artifact tests assume prerendered blog HTML whereas staging's CMS
routes are dynamic. Neither limitation is reported as a passed visual test.

Pending: authenticated hosted desktop/mobile review, fresh BabyLoveGrowth inventory,
and correction of vendor draft labels only for articles independently verified live.
The notification integration returned upstream HTTP 403; staging HTTP is protected
by password. Account access is required to verify those remaining items.
