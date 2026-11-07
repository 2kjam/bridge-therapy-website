# Priority 1 image batch 2: crop review and blocked inputs

Reviewed 2026-09-16. **No production replacements made in this batch.** The two tested Marriage candidates and the first Family candidate fail the required responsive crop constraints. The Family fallback source pages could not be verified, and the approved EMDR PNG is not available in this Windows workspace. No push or deployment.

## Marriage

| Candidate | Verified source | Original dimensions | Result |
| --- | --- | --- | --- |
| 36812175, Vitaly Gariev | [Pexels](https://www.pexels.com/photo/couple-cooking-together-in-modern-kitchen-36812175/) | 3840 x 2160 | Rejected. At 768/900px the man's face is cut and food/hand activity disappears. At 901px the woman's face is cut at the right edge. |
| 6248800, Gary Barnes | [Pexels](https://www.pexels.com/photo/focused-diverse-spouses-cooking-in-kitchen-at-home-6248800/) | 6000 x 4000 | Previous candidate retested. At 768/900px the counter-level hand interaction is lost. Shifting downward to retain it compromises the faces. |

For 36812175, downloaded the original linked by the verified source page. Temporary crop: left 600, top 0, width 2880, height 2160; resized to 1440 x 1080 WebP, quality 85, object-position 50% 50%. The 6248800 retest used the Batch 1 temporary 1440 x 1080 derivative, whose source crop is left 334, top 0, width 5332, height 3999. These are review derivatives only. No `service-marriage.webp` was published and no new alt text was applied. The current `/assets/couples-care.jpg` remains.

These are the two Marriage candidates identifiable from the supplied requests and repository records. No additional photograph was selected without authorization.

## Family

| Candidate | Source verification | Original dimensions | Result |
| --- | --- | --- | --- |
| 6951916, Artem Podrez | [Exact Pexels page verified](https://www.pexels.com/photo/a-woman-and-children-sitting-at-a-table-6951916/) | 2152 x 3826 | Rejected. The 901px crop materially cuts the left child's face. The compact 375/390px crops also crowd the outside participants. Moving the crop horizontally trades the child against the adult on the opposite side. |
| 7982826, supplied attribution RDNE Stock project | Pexels page requests returned a security verification screen; canonical page and attribution not verified | Not downloaded | Blocked before crop testing, not a crop failure. |
| 8120333, supplied attribution Mikhail Nilov | Pexels page requests returned a security verification screen; canonical page and attribution not verified | Not downloaded | Blocked before crop testing, not a crop failure. |

For 6951916, downloaded the original linked by the verified source page. Temporary crop: left 0, top 1200, width 2152, height 1614; resized to 1440 x 1080 WebP, quality 85, object-position 50% 40%. The wide crop keeps the tabletop activity recognizable, but the 901px crop fails. No `service-family.webp` was published and no new alt text was applied. The current `/assets/family-care.jpg` remains.

The fallback photos were deliberately not downloaded before source and attribution verification, as required by the request. Their supplied photographer names are not presented as verified credits.

## EMDR

Requested approved source: `/mnt/data/a_serene_close_up_nature_focused_scene_of_a_calm.png`.

The path does not exist in this Windows environment. No matching file was found in the attachments, Downloads, Documents, Pictures, Desktop or Codex generated-image directory. A Windows source path has been requested. No substitute image was generated or selected.

Consequently `public/assets/services/service-emdr.webp` has not been created. Production dimensions, file size and ripple crop results are pending the actual source. The current EMDR image and alt text remain unchanged; **the requested decorative `alt=""` is not implemented yet**. When supplied, the approved image should be credited separately as generated specifically for the new Bridge website, with no photographer/stock-provider attribution and no claim that ripples illustrate EMDR's mechanism.

## Responsive evidence

All three tested stock candidates were rendered through the existing production service-page component at **375, 390, 768, 900, 901 and 1440px**. Browser response interception supplied temporary candidate bytes; no application code or CSS was changed. Manual review covered all 18 screenshots, particularly the 900/901px transition. The first two candidate trials had no horizontal overflow at any width.

The actual image boxes are approximately 311 x 320, 326 x 320, 660 x 320, 684 x 320, 337 x 390 and 520 x 390 respectively. The wide tablet crop removes vertical information; the narrow desktop column removes substantial information from the sides. A tighter source crop cannot restore missing faces or activity.

Ignored local evidence: `design-backups/service-image-batch-2/` contains downloaded originals, temporary derivatives, all 18 candidate screenshots, crop/measurement records in `trials.json`, ten current production-image screenshots, and `priority-1-current.png`. Rejected assets are not in `public/`.

## Cross-page Priority 1 review

Reviewed Marriage, Premarital, Family, Parenting, Child & Teen, Pregnancy/Postpartum, Adoption, Divorce & Blended Family, ADHD and EMDR together in their actual 1440px page crops.

- All ten current photographs are distinct within this group. EMDR still repeats the Individual-care photograph used outside this group; the intended replacement remains outstanding.
- The seven Batch 1 replacements retain distinct concepts: gardening, a shared tabletop activity, an individual creative project, infant care, reading, outdoor time and pottery.
- Parenting and Child & Teen both use tabletop compositions, but differ in participants, scale and activity. The reading, greenhouse, infant and outdoor scenes provide variety.
- Greens, warm natural tones and light interiors fit the existing ivory design. The amber pottery photograph is more saturated, but its practical activity and natural materials remain compatible. No universal filter was applied.
- The intended non-human water image is absent. This is a review of the current incomplete set, not approval of a completed ten-image migration.

## Scope and validation

Production pages, image assets, alt text, intrinsic dimensions, copy, H1s, metadata, CTAs, therapist cards/mappings, FAQs, internal links and layout were not changed in this batch. Individual, all six Priority 2 pages and the seven Batch 1 replacements remain untouched.

Files added/updated by this batch: this report and `PHOTO-CREDITS.md`. Existing uncommitted changes from earlier work were preserved.

- `npm.cmd run check`: passed; 70 route entries checked, including legacy content/structure, metadata, links, assets and therapist mappings.
- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed; 53 static pages generated.
- `npm.cmd run test:navigation -- --grep 'service images' --project desktop`: all 8 tests passed. Verified the seven existing production WebPs, accurate 1440 x 1080 intrinsic/natural dimensions, asset responses, hashes, alt text, one H1, noindex/nofollow and no horizontal overflow across all six widths (42 production screenshots). This does not count blocked or rejected images as implemented.
- `git diff --check`: passed. Existing LF/CRLF conversion warnings are informational.

## Required inputs to finish

1. The approved EMDR PNG as an accessible Windows file or attachment.
2. Verifiable exact Pexels source pages/attribution for the two authorized Family fallbacks, so crop testing can proceed.
3. Any additional previously approved Marriage candidates not included in the supplied requests; otherwise Marriage remains unchanged under the explicit crop-failure rule.
