# Red-shirt photograph retirement

## Retired asset and scope

`public/assets/individual-care.jpg`: 900 × 601 JPEG, 49,915 bytes. Kampus Production, [Pexels 6948152](https://www.pexels.com/photo/a-woman-holding-a-cup-while-looking-out-the-window-6948152/). Previously rendered with 900 × 600 intrinsic attributes. All ten active references were service hero images, listed below. No active homepage, menu, About, Contact, therapist, Blog-index, CSS-background or image-config reference was found. A visual-similarity scan of public raster assets found no renamed duplicate.

Historical Blog bodies/source snapshots have no occurrence. Legacy migration HTML retains historical references, and the original JPEG is intentionally retained for those references. No preservation material was deleted.

## Candidate review

Reviewed the existing local imagery and Pexels candidates. Existing local hero/anxiety/grief/trauma pictures would duplicate homepage imagery and several show expansive mountain scenery. Gary Barnes 6231767 was selected for Individual: neutral everyday clothing, natural greenery, a quiet seated moment, no urban or luxury setting. The actual photograph is not represented as a verified Texas location. Its full head and face remain inside the final crops.

Rejected Zulfugar Karimov 39006214 (fashion-oriented patio pose); Liza Summer 6347756 (original head crop and poor ability to preserve both face and reading activity in the wide tablet crop). Candidates 13181997, 19058577 and 1154623 were not selected because their direct downloads were unavailable. Additional rejected search results favored urban cafes, luxury settings or strongly posed portraits.

The final purpose-specific selections are garden reflection for Individual, laptop/home for telehealth, Bible for Christian counseling, open woodland paths for Life Transitions and Trauma, seasonal lake for Grief, quiet lake for Non-Epileptic Seizures, garden bench for Anxiety, and distinct leaf compositions for Depression and EMDR. Nature scenes avoid implying a pictured person has a diagnosis.

## Final assets and attribution

| Page | Photographer/source | Original dimensions and bytes | Production path | Main production bytes | Alt text |
|---|---|---|---|---|---|
| /individual-counseling-tyler/ | [Gary Barnes](https://www.pexels.com/photo/woman-sitting-on-bench-in-green-garden-6231767/) | 3360 × 5040; 1,935,891 bytes | /assets/services/service-individual.webp | 103,706 bytes | A person in neutral-colored overalls resting on a bench beside a leafy garden path |
| /online-therapy-texas/ | [Teona Swift](https://www.pexels.com/photo/woman-working-on-laptop-at-home-6912829/) | 6000 × 4000; 4,067,102 bytes | /assets/services/service-online.webp | 60,588 bytes | A person using a laptop at a wooden table beside houseplants |
| /christian-counseling-tyler/ | [Nicole Finkel](https://www.pexels.com/photo/close-up-of-open-bible-on-table-11696719/) | 6000 × 4000; 1,841,985 bytes | /assets/services/service-christian.webp | 64,384 bytes | An open Bible on a wooden table in warm light |
| /emdr-therapy-tyler/ | [Cosmin ChiWu](https://www.pexels.com/photo/sunlight-through-green-leaves-12623891/) | 3511 × 2349; 1,258,342 bytes | /assets/services/service-emdr.webp | 115,724 bytes | Sunlight filtering through green leaves against a softly blurred background |
| /life-transitions-counseling-tyler/ | [Arnauld van Wambeke](https://www.pexels.com/photo/path-in-forest-in-sunlight-24706137/) | 3547 × 2365; 2,957,123 bytes | /assets/services/service-life-transitions.webp | 234,902 bytes | A sunlit path winding between green woodland trees |
| /grief-counseling-tyler/ | [Nikolett Emmert](https://www.pexels.com/photo/calm-lake-surrounded-by-trees-14310629/) | 3200 × 4000; 1,822,241 bytes | /assets/services/service-grief.webp | 236,738 bytes | Autumn trees reflected in the still surface of a lake |
| /non-epileptic-seizures-counseling-tyler/ | [Geoffrey Zhao](https://www.pexels.com/photo/serene-lakefront-view-with-reflections-and-trees-37254012/) | 8256 × 5504; 5,566,725 bytes | /assets/services/service-non-epileptic-seizures.webp | 230,320 bytes | A quiet lake framed by hanging branches and reflected trees |
| /trauma-therapy-tyler/ | [Vladimir Srajber](https://www.pexels.com/photo/serene-forest-pathway-with-sunlight-filtering-through-trees-28575452/) | 5304 × 7952; 6,899,964 bytes | /assets/services/service-trauma.webp | 215,896 bytes | A woodland trail surrounded by trees in dappled sunlight |
| /depression-counseling-tyler/ | [Chris John](https://www.pexels.com/photo/vibrant-green-leaves-in-sunlight-29061283/) | 3024 × 4032; 766,112 bytes | /assets/services/service-depression.webp | 68,570 bytes | Green leaves lit by sunlight against a soft woodland background |
| /anxiety-counseling-tyler/ | [MAG Photography](https://www.pexels.com/photo/serene-garden-bench-amidst-lush-greenery-38072124/) | 4105 × 6158; 3,252,582 bytes | /assets/services/service-anxiety.webp | 168,608 bytes | An empty wooden bench beneath a garden arbor surrounded by greenery |

All originals → 1440 × 1080 WebP plus 800 × 600 and 480 × 360 variants. Source files stay outside public production. The manifest records every variant byte count and hash. Reproduction: `node scripts/generate-service-retirement-images.mjs` with archived originals present.

## Before/after network and layout

Cold browser loads, device scale factor 1. Encoded image-body bytes below; observed transfer sizes add 300 bytes per image response. No retired-photo requests occurred after replacement. The before/after measurements cover every affected route at 375, 390, 768, 900, 1024 and 1440px.

| Page | Before at every width | After 390px | After 1440px |
|---|---:|---:|---:|
| /individual-counseling-tyler/ | 49,915 | 24,304 | 47,560 |
| /online-therapy-texas/ | 49,915 | 13,438 | 25,614 |
| /christian-counseling-tyler/ | 49,915 | 12,940 | 26,846 |
| /emdr-therapy-tyler/ | 49,915 | 17,960 | 37,646 |
| /life-transitions-counseling-tyler/ | 49,915 | 47,800 | 83,392 |
| /grief-counseling-tyler/ | 49,915 | 48,814 | 61,960 |
| /non-epileptic-seizures-counseling-tyler/ | 49,915 | 32,852 | 46,226 |
| /trauma-therapy-tyler/ | 49,915 | 47,938 | 83,000 |
| /depression-counseling-tyler/ | 49,915 | 14,670 | 30,578 |
| /anxiety-counseling-tyler/ | 49,915 | 28,400 | 33,866 |

Mobile downloads decrease for every replacement. Seven desktop replacements are smaller; Life Transitions, Grief and Trauma add approximately 12–33 KB because their detailed foliage needs more image data. Larger high-density candidates can increase transfer further; responsive selection avoids downloading full-resolution originals. This is not a claim that every image is smaller at every device pixel ratio. Shared menu lazy loading, Blog presentation derivatives and Contact optimization remain intact.

Rendered dimensions are identical before/after for all 60 page/viewport combinations: 311 × 320 at 375; 326 × 320 at 390; 659.84 × 320 at 768; 684 × 320 at 900; 384.92 × 390 at 1024; 519.86 × 390 at 1440. Images use proportional cover cropping, not stretching.

## Visual and duplicate review

All ten actual image containers were visually inspected at all six widths; Individual full head/face, laptop interaction, Bible and bench remain understandable. No horizontal overflow. Ten distinct replacements, each used once as a service hero. Full service-hero audit: 19 pages, 19 distinct image paths. No duplicate service heroes remain.

## Preservation and validation

All ten JSX files compare exactly to their pre-change copies outside the hero image tag. Metadata, H1, copy, captions, therapist mappings, CTAs, links, FAQs, robots and schema are unchanged. Built HTML is checked for zero retired path/source-ID references. Service-image tests check real requests, responsive loading, dimensions, checksums and overflow. Blog preservation tests remain intact. Validation results are reported with the completed task.

Completed validation: npm run build, npm run check (73 pages), npm run lint, and git diff --check passed. Service-page/image browser suite: 44 passed. Blog preservation and presentation-image tests: 26 passed. Existing performance browser probe completed successfully. No push or deployment performed.
