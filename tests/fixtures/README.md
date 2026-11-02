# Reviewed regression references

`homepage-batch1-*` remains historical evidence of the September 19 design. It
predates approved fluid navigation/header sizing in `3efa91d`, updated copy and
service photos. Do not shrink the current logo or revert those changes to satisfy
that older image.

`homepage-reviewed-linux-*` is the reviewed current design. Its provenance and
capture environment are recorded in `homepage-reviewed.json`. Capture came from
an untouched staging build, not the test-fix candidate; independent candidate
screenshots matched every pixel and section rectangle before acceptance. Tests
retain exact geometry, screenshot dimensions and the original <0.1% pixel
threshold. No update-snapshots flag is used.

For another OS/browser, build the immutable capture-source commit from the
manifest separately and set `PLAYWRIGHT_VISUAL_REFERENCE_URL` to its localhost
server. The test compares reference and candidate in the same browser context,
with the same strict thresholds. Never point it at the candidate's server. To
refresh durable fixtures, first identify approved source changes, independently
review reference and candidate pixels, then record the source/tree/browser in the
manifest. Missing or mismatched references should fail, not skip.

`batch2-protected.json` still protects the unchanged contact form and hidden form
sources. Its NES checksum now pins the current approved source (staging
`366075a`, source blob `4640664`), excluding only the original getting-started FAQ
exception. Changes since the former checksum are approved service imagery in
`3efa91d`/`c876e6a`, SEO/schema additions in `b99036f`, and JSX whitespace;
clinical prose is unchanged. Independent NES tests retain the Erin-only provider
and medical-boundary assertions. Do not update this checksum for unreviewed copy.

The widget's obsolete whole-source checksum is replaced by
`inquiry-widget.spec.ts`: Escape must restore launcher focus, preserve drafts and
conversation while typing or pending, and never resubmit. Delivery is mocked;
no real inquiries or provider calls are made.
