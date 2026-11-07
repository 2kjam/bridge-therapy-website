# Service image batch 1

Completed locally on 2026-09-16. All nine exact Pexels source pages, photographer credits, linked original downloads and Free to use license links were verified. Seven imported; two rejected for crop limitations. No substitutions, generation, retouching, filters, layout changes, push or deployment.

## Imported images

All production files are 1440 x 1080 WebP, quality 85, without upscaling. Premarital is above the approximate 180 KB soft target to preserve greenhouse detail; every file is below 250 KB. Original acquisitions stay in ignored design-backups/service-image-batch-1/, outside public assets.

| Service | Photographer / exact source | Original pixels | Production path | Bytes | Exact alt | Focal position |
|---|---|---|---|---:|---|---|
| Premarital | [Vitaly Gariev - Pexels](https://www.pexels.com/photo/couple-enjoying-gardening-together-in-greenhouse-36812124/) | 3840 x 2160 | /assets/services/service-premarital.webp | 214932 | Two adults working with plants together | 50% 50% |
| Parenting | [Vitaly Gariev - Pexels](https://www.pexels.com/photo/mother-and-son-playing-at-table-23224897/) | 3840 x 2160 | /assets/services/service-parenting.webp | 89206 | An adult and child working on an activity together | 50% 60% |
| Child & Teen | [Sóc Năng Động - Pexels](https://www.pexels.com/photo/focused-teen-working-on-creative-project-indoors-36277511/) | 5520 x 3680 | /assets/services/service-child-teen.webp | 98294 | A teenager working on a creative project | 50% 60% |
| Pregnancy/Postpartum | [Helena Lopes - Pexels](https://www.pexels.com/photo/mother-and-baby-at-home-in-cozy-setting-27175810/) | 5472 x 3648 | /assets/services/service-pregnancy-postpartum.webp | 72372 | A parent holding a baby at home | 50% 60% |
| Adoption | [Ksenia Chernaya - Pexels](https://www.pexels.com/photo/a-mother-reading-a-book-with-her-child-in-bed-7299819/) | 4000 x 2670 | /assets/services/service-adoption.webp | 65428 | An adult and child reading together | 50% 50% |
| Divorce & Blended Family | [Kampus Production - Pexels](https://www.pexels.com/photo/family-doing-picnic-together-7669175/) | 6016 x 4016 | /assets/services/service-divorce-blended-family.webp | 139736 | Two adults and a child spending time together outdoors | 50% 60% |
| ADHD | [3B - Pexels](https://www.pexels.com/photo/hands-crafting-pottery-on-a-potter-s-wheel-36738895/) | 6597 x 4398 | /assets/services/service-adhd.webp | 105908 | Hands shaping clay on a pottery wheel | 50% 65% |

## Rejected candidates

- Marriage: [Gary Barnes - Pexels](https://www.pexels.com/photo/focused-diverse-spouses-cooking-in-kitchen-at-home-6248800/), original 6000 x 4000. Wide tablet crop loses the food-preparation hand/counter interaction; retaining it would cut into the faces. Existing image left unchanged.
- Family: [Artem Podrez - Pexels](https://www.pexels.com/photo/two-children-and-their-mother-playing-together-at-home-6951906/), original 2126 x 3780. The three participants span too much of the portrait source width; the 901px crop cuts a child's face. Repositioning trades one cropped participant for another. Existing image left unchanged.

## Crop review

All nine candidates were tried in the existing component at 375, 390, 768, 900, 901 and 1440px before final selection. All seven imported images were then recaptured in the production build at all six widths (42 final crops) and visually reviewed. Faces, essential participants and activities remain visible; the wide crops trim peripheral hair/body/environment but do not remove a face or the central activity. Object-fit remains cover, with no stretching or layout change. No horizontal overflow. Parenting uses a left-biased source crop to preserve both participants; several images use a restrained downward focal position to preserve working hands in the wide crop.

| Imported service | 375 | 390 | 768 | 900 | 901 | 1440 |
|---|---|---|---|---|---|---|
| Premarital | Pass | Pass | Pass | Pass | Pass | Pass |
| Parenting | Pass | Pass | Pass | Pass | Pass | Pass |
| Child & Teen | Pass | Pass | Pass | Pass | Pass | Pass |
| Pregnancy/Postpartum | Pass | Pass | Pass | Pass | Pass | Pass |
| Adoption | Pass | Pass | Pass | Pass | Pass | Pass |
| Divorce & Blended Family | Pass | Pass | Pass | Pass | Pass | Pass |
| ADHD | Pass | Pass | Pass | Pass | Pass | Pass |

Cross-page review: seven distinct settings/activities, including a greenhouse, crafts, an adolescent project, parent/baby, reading, picnic and pottery. No added kitchen repetition. Human age/appearance and composition vary; several caregiver scenes still feature women, so this is not a claim of complete demographic balance. Pottery has stronger warm sunlight, while reading and parent/baby are pale interiors; natural variation retained without filters. The accepted greenery, neutral interiors and hands-on scenes are coherent with the existing ivory/green site.

## Preservation and validation

- Only illustrative image src, alt, intrinsic dimensions and image-specific object-position changed on seven pages. A before/after source comparison (normalizing line endings) confirmed all remaining page code is identical; the other ten service pages are unchanged.
- Individual, EMDR and all Priority 2 imagery remain unchanged. Marriage and Family keep their previous assets. individual-care.jpg now appears on eight rather than eleven service pages.
- Page copy, captions, headings, metadata, CTAs, links, FAQs, therapist cards/mappings, Contact form and chatbot are unchanged. No layout CSS changed.
- PHOTO-CREDITS.md appended attribution, exact source URLs, original and production dimensions/sizes, license/access date, archival location and the two rejection reasons. Existing credits retained.
- content/service-images.json records all nine source outcomes, download URLs, original hashes, approved crop rectangles, production hashes and dimensions, alt text and focal positions.
- npm run build: passed.
- npm run check: passed, all 70 route entries including frozen content/structure, metadata, assets and therapist mappings. The checker accepts only the precise approved image attribute changes.
- npm run lint: passed.
- npm run test:navigation -- --grep "service images" --project desktop: 8 passed; file integrity/scope plus seven pages at six viewport widths. Includes one H1, noindex/nofollow, resolved images, actual/intrinsic dimensions, cover rendering and overflow checks.
- git diff --check: passed.

Browser screenshots: test-results/navigation/service-images-*. Original/trial material: design-backups/service-image-batch-1/.

Two replacement slots remain intentionally unimplemented because the supplied candidates fail the user-required crop criteria. No replacement candidates were selected without approval.
