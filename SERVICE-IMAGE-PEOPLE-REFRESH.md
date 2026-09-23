# People-focused service image refresh

**Latest owner override ? Parenting Support:** The page now uses the supplied image of a woman supporting a child working in a notebook. The full composition is retained. Earlier Parenting Unsplash details and measurements below are historical. The current collection has 14 Unsplash images and five owner-supplied images: ADHD, Anxiety, Depression, Parenting and Online Therapy. Build, lint, all 73 site checks, diff checks and four desktop/mobile image tests passed, including seven viewport widths. Current asset details are in the manifest and photo credits.

**Earlier owner override:** Depression now uses the supplied image of a woman sitting on a bed with her head resting against one hand. Its earlier Unsplash selection and measurements below are historical. At that stage, the collection had 15 Unsplash images and four owner-supplied images: ADHD, Anxiety, Depression and Online Therapy. The Depression replacement preserves the complete composition, and passed build, lint, the 73-page site check, diff checks and desktop/mobile image tests at seven widths. See the current manifest and photo credits for asset details.

**Later owner override:** Anxiety now uses the supplied September 22 image of a woman with clasped hands on a sofa. The Unsplash Anxiety selection and measurements below describe the earlier refresh and are historical. Current source, derivatives, alt text and hashes are in `content/service-images.json` and `PHOTO-CREDITS.md`. At that stage, the set had 16 Unsplash images plus owner-supplied ADHD, Anxiety and Online Therapy images. The Anxiety replacement passed build, lint, all 73 site checks, diff checks, and desktop/mobile image tests at seven widths.

## Scope and owner overrides

Seventeen service pages now use distinct, free Unsplash photos with people as the visual focus. The approved ADHD wooden-block image is unchanged byte for byte. The later owner request supersedes the Online Therapy Unsplash selection with the exact supplied `online therapy.avif` (500 × 333, 21,507 bytes). Anxiety is included in the Unsplash refresh because the revised brief explicitly excepted only ADHD. All 19 hero assets are unique.

Only hero image markup/assets and their records, credits, and regression expectations were changed in this batch. Existing page copy, titles, descriptions, headings, therapist mappings, CTAs, links, schema and indexing settings are preserved. Earlier stacked website work is retained. Nothing was pushed or deployed.

## Candidate review and final selections

Reviewed 15 free candidates per search across 16 human-experience searches, using source thumbnails and then full originals. The three plausible candidates for each service are linked below; they were not searched solely by diagnosis. Rejected generic search results included hands-only compositions, buried faces, dark silhouettes, high-rise interiors, distant people, posed portraits, and romantic engagement imagery. A park-bench photo and an older-man close-up were rejected during crop review because the head framing was too tight.

| Service | Selected photo / photographer | Other plausible candidates reviewed | Selection rationale |
|---|---|---|---|
| /marriage-counseling-tyler/ | [Vitaly Gariev](https://unsplash.com/photos/a-man-sitting-at-a-table-talking-to-a-woman-yrSta3T5GDs) | [Matheus Câmara da Silva — rjzW_IIjBJc](https://unsplash.com/photos/a-man-and-a-woman-standing-next-to-each-other-rjzW_IIjBJc); [Iwaria Inc. — U7zb_4mTVPQ](https://unsplash.com/photos/a-man-and-a-woman-sitting-on-a-couch-U7zb_4mTVPQ) | Quiet conversation with serious expressions and no hostile or romantic staging. |
| /premarital-counseling-tyler/ | [Wright Brand Bacon](https://unsplash.com/photos/woman-in-gray-crew-neck-t-shirt-and-blue-denim-jeans-sitting-on-black-chair-NVBL6aulKBY) | [Allen Taylor — 21H2_zcDEhc](https://unsplash.com/photos/man-in-white-dress-shirt-and-woman-in-orange-long-sleeve-shirt-standing-on-green-grass-21H2_zcDEhc); [Tim Mossholder — eJ4ZAswgHiU](https://unsplash.com/photos/man-and-woman-walking-on-road-during-daytime-eJ4ZAswgHiU) | More optimistic interaction in a normal home, without wedding props. |
| /family-counseling-tyler/ | [National Cancer Institute](https://unsplash.com/photos/group-of-people-beside-coffee-table-xDSD3Vmzh70) | [Jonathan Borba — DUrU_bZV8So](https://unsplash.com/photos/family-on-bed-holding-baby-and-phone-DUrU_bZV8So); [National Cancer Institute — BQPi8F_UON0](https://unsplash.com/photos/family-eating-at-the-table-BQPi8F_UON0) | Shared activity and natural interaction rather than a posed portrait. |
| /parenting-support-tyler/ | [Vitaly Gariev](https://unsplash.com/photos/father-and-son-reading-a-book-together-on-couch-Z-7Yz6_f1ZQ) | [Mark Zamora — mFqAeaZgWO8](https://unsplash.com/photos/womens-white-long-sleeve-dress-mFqAeaZgWO8); [Adam Winger — 7fF0iei80AQ](https://unsplash.com/photos/woman-and-child-reading-in-library-7fF0iei80AQ) | A close shared activity centers the parent-child relationship. |
| /child-teen-counseling-tyler/ | [Samantha Hentosh](https://unsplash.com/photos/man-reading-book-akocAO9QCHM) | [Kelly Sikkema — tp_AlXyMPdE](https://unsplash.com/photos/woman-in-red-and-black-striped-long-sleeve-shirt-and-blue-denim-jeans-sitting-on-brown-tp_AlXyMPdE); [Josh Applegate — cwGk-u9PHOo](https://unsplash.com/photos/girl-reading-book-sitting-on-sofa-cwGk-u9PHOo) | An ordinary reading moment with a visible face and quiet concentration. |
| /pregnancy-postpartum-counseling-tyler/ | [Kelly Sikkema](https://unsplash.com/photos/mother-carrying-baby-Z4GKcFAGck4) | [Isaac Quesada — DMcNqigMn1c](https://unsplash.com/photos/woman-in-white-crew-neck-t-shirt-carrying-baby-DMcNqigMn1c); [Ana Curcan — I3hjsBeZa6Y](https://unsplash.com/photos/a-woman-breastfeeding-her-baby-in-a-cozy-room-I3hjsBeZa6Y) | A quiet caregiving moment in a residential setting, not a polished celebration or hospital scene. |
| /adoption-counseling-tyler/ | [Vitaly Gariev](https://unsplash.com/photos/a-man-reading-a-book-to-a-little-girl-44Nf2vzIhQ8) | [Adam Winger — 7fF0iei80AQ](https://unsplash.com/photos/woman-and-child-reading-in-library-7fF0iei80AQ); [Vitaly Gariev — xKRrjOORL6E](https://unsplash.com/photos/mother-and-daughter-reading-a-book-in-bed-xKRrjOORL6E) | Connection and belonging represented by a shared activity; no claim about adoption or foster status. |
| /divorce-blended-family-counseling-tyler/ | [Jimmy Dean](https://unsplash.com/photos/man-in-yellow-crew-neck-t-shirt-sitting-on-white-couch-e5Kv2YZywUY) | [National Cancer Institute — VJVsEnR_vNE](https://unsplash.com/photos/family-playing-board-games-VJVsEnR_vNE); [Tyson — gorbBYbo6KM](https://unsplash.com/photos/family-eating-dinner-at-home-gorbBYbo6KM) | Everyday parent-child connection without implying the photographed family is divorced or blended. |
| /individual-counseling-tyler/ | [Austin Schultz](https://unsplash.com/photos/woman-in-black-and-red-plaid-long-sleeve-shirt-and-white-pants-sitting-on-brown-wooden-c4KRQ7po_zg) | [@invadingkingdom — D6Hkl-wot_E](https://unsplash.com/photos/man-in-red-and-black-plaid-dress-shirt-D6Hkl-wot_E); [DESIGNECOLOGIST — M_ajTtNalSA](https://unsplash.com/photos/man-sitting-on-bench-M_ajTtNalSA) | Casual clothing, warm daylight and a quiet lakeside setting; no urban architecture. |
| /christian-counseling-tyler/ | [Declan Sun](https://unsplash.com/photos/a-woman-in-a-white-dress-standing-in-the-street-x4_TKde1_gs) | [Declan Sun — XcUvZFaqV3Q](https://unsplash.com/photos/a-woman-sitting-in-a-field-of-grass-XcUvZFaqV3Q); [Priscilla Du Preez 🇨🇦 — Nizkb3kT4cs](https://unsplash.com/photos/woman-sitting-on-grass-beside-concrete-road-at-daytime-Nizkb3kT4cs) | A full visible profile keeps the person central; faith is conveyed without giant religious props. |
| /emdr-therapy-tyler/ | [LinkedIn Sales Solutions](https://unsplash.com/photos/two-men-talking-W3Jl3jREpDY) | [Vitaly Gariev — m-82PNzgFq4](https://unsplash.com/photos/a-woman-sitting-on-a-couch-talking-to-another-woman-m-82PNzgFq4); [Vitaly Gariev — irqy6S6IFak](https://unsplash.com/photos/man-relaxing-at-desk-with-laptop-and-bicycle-irqy6S6IFak) | An understated conversation with greenery outside, no clipboard or treatment gimmicks. |
| /life-transitions-counseling-tyler/ | [Frank Myrland](https://unsplash.com/photos/man-walking-under-forest-edChB35Hj04) | [Chaewool Kim — S-AM2mYIqtU](https://unsplash.com/photos/a-person-with-a-backpack-walking-through-a-forest-S-AM2mYIqtU); [Zoë Gayah Jonker — Cj_WTYpoVso](https://unsplash.com/photos/gray-t-shirt-Cj_WTYpoVso) | The person is prominent, with forward movement and an everyday wooded setting. |
| /grief-counseling-tyler/ | [Sergiu Vălenaș](https://unsplash.com/photos/man-in-brown-coat-YrE_uZnTPQU) | [Jacki Drexler — xyrnwzVBuAI](https://unsplash.com/photos/woman-in-black-shirt-sitting-on-bench-xyrnwzVBuAI); [Vitaly Gariev — eJ73iS86XNQ](https://unsplash.com/photos/elderly-man-with-hand-on-chin-deep-in-thought-eJ73iS86XNQ) | A reflective older adult in a quiet outdoor setting; allows seriousness without funeral imagery. |
| /non-epileptic-seizures-counseling-tyler/ | [@invadingkingdom](https://unsplash.com/photos/man-in-red-and-black-plaid-dress-shirt-D6Hkl-wot_E) | [Vitaly Gariev — irqy6S6IFak](https://unsplash.com/photos/man-relaxing-at-desk-with-laptop-and-bicycle-irqy6S6IFak); [Sergiu Vălenaș — YrE_uZnTPQU](https://unsplash.com/photos/man-in-brown-coat-YrE_uZnTPQU) | A calm, reflective adult with no medical equipment or suggestion of an active seizure. |
| /trauma-therapy-tyler/ | [Andrei Pana](https://unsplash.com/photos/man-in-black-hoodie-and-black-pants-sitting-on-concrete-bench-4j1ZPD7ZAmc) | [Clay Banks — id7bBpJWfmY](https://unsplash.com/photos/a-man-sitting-on-a-rock-next-to-a-body-of-water-id7bBpJWfmY); [DESIGNECOLOGIST — M_ajTtNalSA](https://unsplash.com/photos/man-sitting-on-bench-M_ajTtNalSA) | An everyday outdoor pause with a visible face and a grounded, serious mood. |
| /depression-counseling-tyler/ | [Joice Kelly](https://unsplash.com/photos/woman-in-orange-sweater-and-skirt-rXrMy7mXUEs) | [Ivonne Lecou — 9nJ6Y-ZHC0Y](https://unsplash.com/photos/woman-in-white-long-sleeve-shirt-sitting-on-black-couch-9nJ6Y-ZHC0Y); [Vitaly Gariev — eJ73iS86XNQ](https://unsplash.com/photos/elderly-man-with-hand-on-chin-deep-in-thought-eJ73iS86XNQ) | Subdued body language and warm household surroundings without sensational despair. |
| /anxiety-counseling-tyler/ | [Ivonne Lecou](https://unsplash.com/photos/woman-in-white-long-sleeve-shirt-sitting-on-black-couch-9nJ6Y-ZHC0Y) | [Anthony Tran — 2IeMNmr3mc8](https://unsplash.com/photos/woman-in-gray-long-sleeve-shirt-sitting-on-window-2IeMNmr3mc8); [Dylan Ferreira — WEuQ5UvLmyU](https://unsplash.com/photos/man-in-red-crew-neck-shirt-standing-beside-white-curtain-WEuQ5UvLmyU) | A quiet, concerned posture in an ordinary home, without exaggerated distress. |

Individual Counseling uses a casually dressed adult beside a quiet lake, with natural light and no urban architecture. This supports the requested grounded visual character without claiming the photo was taken in Texas. The collection includes men, women, a young reader, an older adult, couples and family interactions, with indoor/outdoor and seated/walking variety. Photographed family or medical histories are not asserted.

## Assets, optimization and alt text

| Service | Photographer / source | Original dimensions; bytes | Local production path | Production dimensions; bytes |
|---|---|---|---|---|
| /marriage-counseling-tyler/ | [Vitaly Gariev](https://unsplash.com/photos/a-man-sitting-at-a-table-talking-to-a-woman-yrSta3T5GDs) | 6000 × 4000; 2,703,756 | /assets/services/service-marriage.webp | 1440 × 1080; 47,626 |
| /premarital-counseling-tyler/ | [Wright Brand Bacon](https://unsplash.com/photos/woman-in-gray-crew-neck-t-shirt-and-blue-denim-jeans-sitting-on-black-chair-NVBL6aulKBY) | 3890 × 5835; 3,862,122 | /assets/services/service-premarital.webp | 1440 × 1080; 66,738 |
| /family-counseling-tyler/ | [National Cancer Institute](https://unsplash.com/photos/group-of-people-beside-coffee-table-xDSD3Vmzh70) | 12000 × 8820; 9,822,423 | /assets/services/service-family.webp | 1440 × 1080; 66,112 |
| /parenting-support-tyler/ | [Vitaly Gariev](https://unsplash.com/photos/father-and-son-reading-a-book-together-on-couch-Z-7Yz6_f1ZQ) | 3840 × 2160; 991,193 | /assets/services/service-parenting.webp | 1440 × 1080; 84,984 |
| /child-teen-counseling-tyler/ | [Samantha Hentosh](https://unsplash.com/photos/man-reading-book-akocAO9QCHM) | 3840 × 5010; 4,605,429 | /assets/services/service-child-teen.webp | 1440 × 1080; 115,578 |
| /pregnancy-postpartum-counseling-tyler/ | [Kelly Sikkema](https://unsplash.com/photos/mother-carrying-baby-Z4GKcFAGck4) | 3391 × 5068; 2,698,751 | /assets/services/service-pregnancy-postpartum.webp | 1440 × 1080; 46,628 |
| /adoption-counseling-tyler/ | [Vitaly Gariev](https://unsplash.com/photos/a-man-reading-a-book-to-a-little-girl-44Nf2vzIhQ8) | 3840 × 2160; 1,093,921 | /assets/services/service-adoption.webp | 1440 × 1080; 92,330 |
| /divorce-blended-family-counseling-tyler/ | [Jimmy Dean](https://unsplash.com/photos/man-in-yellow-crew-neck-t-shirt-sitting-on-white-couch-e5Kv2YZywUY) | 6720 × 4480; 6,778,899 | /assets/services/service-divorce-blended-family.webp | 1440 × 960; 80,538 |
| /individual-counseling-tyler/ | [Austin Schultz](https://unsplash.com/photos/woman-in-black-and-red-plaid-long-sleeve-shirt-and-white-pants-sitting-on-brown-wooden-c4KRQ7po_zg) | 5184 × 3456; 3,428,075 | /assets/services/service-individual.webp | 1440 × 1080; 56,552 |
| /christian-counseling-tyler/ | [Declan Sun](https://unsplash.com/photos/a-woman-in-a-white-dress-standing-in-the-street-x4_TKde1_gs) | 8190 × 5257; 2,606,456 | /assets/services/service-christian.webp | 1440 × 1080; 42,000 |
| /emdr-therapy-tyler/ | [LinkedIn Sales Solutions](https://unsplash.com/photos/two-men-talking-W3Jl3jREpDY) | 5184 × 3456; 1,672,999 | /assets/services/service-emdr.webp | 1440 × 1080; 34,354 |
| /life-transitions-counseling-tyler/ | [Frank Myrland](https://unsplash.com/photos/man-walking-under-forest-edChB35Hj04) | 5685 × 3790; 4,884,550 | /assets/services/service-life-transitions.webp | 1440 × 1080; 136,106 |
| /grief-counseling-tyler/ | [Sergiu Vălenaș](https://unsplash.com/photos/man-in-brown-coat-YrE_uZnTPQU) | 4093 × 2729; 1,529,626 | /assets/services/service-grief.webp | 1440 × 1080; 121,126 |
| /non-epileptic-seizures-counseling-tyler/ | [@invadingkingdom](https://unsplash.com/photos/man-in-red-and-black-plaid-dress-shirt-D6Hkl-wot_E) | 3644 × 2918; 2,247,413 | /assets/services/service-non-epileptic-seizures.webp | 1440 × 1080; 120,676 |
| /trauma-therapy-tyler/ | [Andrei Pana](https://unsplash.com/photos/man-in-black-hoodie-and-black-pants-sitting-on-concrete-bench-4j1ZPD7ZAmc) | 4000 × 6000; 2,543,412 | /assets/services/service-trauma.webp | 1440 × 1080; 45,220 |
| /depression-counseling-tyler/ | [Joice Kelly](https://unsplash.com/photos/woman-in-orange-sweater-and-skirt-rXrMy7mXUEs) | 3000 × 2000; 394,078 | /assets/services/service-depression.webp | 1440 × 1080; 35,520 |
| /anxiety-counseling-tyler/ | [Ivonne Lecou](https://unsplash.com/photos/woman-in-white-long-sleeve-shirt-sitting-on-black-couch-9nJ6Y-ZHC0Y) | 2624 × 3936; 1,794,449 | /assets/services/service-anxiety.webp | 1440 × 1080; 54,828 |

All Unsplash replacements have 480px, 800px and 1440px WebP derivatives. Source originals are not served. Most derivatives use 4:3; Divorce & Blended Family retains 3:2 to keep all participants visible. Explicit intrinsic dimensions and `height: auto` preserve the reviewed composition at every viewport instead of recropping faces in the old fixed-height container. Shared CSS and text layout are unchanged. The source files remain unedited; derivative crop coordinates are in the manifest. The owner-supplied Online Therapy AVIF is served unchanged, without unnecessary upscaling or duplicate derivatives.

| Service | Final alt text |
|---|---|
| /marriage-counseling-tyler/ | Two adults having a serious conversation across a table |
| /premarital-counseling-tyler/ | A couple talking together in a kitchen |
| /family-counseling-tyler/ | Adults and children playing a board game together at home |
| /parenting-support-tyler/ | A man and a child reading a book together on a sofa |
| /child-teen-counseling-tyler/ | A young person wearing glasses reading a book beside library shelves |
| /pregnancy-postpartum-counseling-tyler/ | A woman holding a newborn against her shoulder at home |
| /adoption-counseling-tyler/ | A woman and a girl reading together on the floor |
| /divorce-blended-family-counseling-tyler/ | A family sharing a snack in a bright living room |
| /adhd-counseling-tyler/ | A hand placing a wooden letter D beside blocks spelling ADHD |
| /individual-counseling-tyler/ | A woman sitting thoughtfully on a wooden dock beside a lake |
| /online-therapy-texas/ | A man talking with a woman on a laptop video call at a table beside houseplants |
| /christian-counseling-tyler/ | A woman holding her hands together in quiet prayer outdoors |
| /emdr-therapy-tyler/ | Two men seated across a table in conversation near a sunlit window |
| /life-transitions-counseling-tyler/ | A man walking along a wooded path |
| /grief-counseling-tyler/ | An older man sitting quietly outdoors beneath trees |
| /non-epileptic-seizures-counseling-tyler/ | A man in a plaid shirt sitting with his chin resting on his hand |
| /trauma-therapy-tyler/ | A young man in a dark hoodie sitting quietly outdoors |
| /depression-counseling-tyler/ | A woman sitting beside a sofa with her head lowered |
| /anxiety-counseling-tyler/ | A woman sitting in an armchair beside a window with her knees drawn up |

## Retired photograph and preservation

The rejected red-shirt-by-window photo is `public/assets/individual-care.jpg` (900 × 601 JPEG, 49,915 bytes), Kampus Production / Pexels 6948152. Its ten former active hero locations were Individual, Online Therapy, Christian, EMDR, Life Transitions, Grief, Non-Epileptic Seizures, Trauma, Depression and Anxiety. It remains only as a historical asset/reference for legacy preservation. No historical Blog body occurrence was found in the earlier retirement audit. All built active HTML is checked for both its filename and source ID, and every service-page browser test checks that it is never requested. See `SERVICE-IMAGE-RETIREMENT.md` for the original retirement history.

## Reproduction and changed files

`node scripts/generate-service-retirement-images.mjs` reproduces the current responsive WebP derivatives when the locally archived originals are present. Owner-supplied ADHD and Online Therapy assets have no generated variants and are skipped.

Changed in the image refresh: 18 service `page.tsx` files (all except ADHD), `content/service-images.json`, local service assets, `PHOTO-CREDITS.md`, this report, `tests/service-images.spec.ts`, and the generation script comment. The latest Online Therapy override specifically updates `app/online-therapy-texas/page.tsx`, adds `public/assets/services/service-online.avif`, archives/removes its three superseded WebP derivatives, and updates its manifest/credits and test expectations.

## Measured before/after image delivery

Fresh browser contexts, device-pixel ratio 1, local production server. Values include the browser-reported transfer overhead; higher-density screens may select larger variants. The complete six-width measurements are archived in `design-backups/unsplash-people/baseline.json` and `after.json`.

| Service | Hero transfer at 390px: before → after | Hero transfer at 1440px: before → after | Rendered dimensions at 390px: before → after |
|---|---|---|---|
| /marriage-counseling-tyler/ | 101.4 KB → 11.9 KB | 101.4 KB → 22.1 KB | 326 × 320 → 326 × 245 |
| /premarital-counseling-tyler/ | 215.2 KB → 13.8 KB | 215.2 KB → 27.7 KB | 326 × 320 → 326 × 245 |
| /family-counseling-tyler/ | 190.0 KB → 17.3 KB | 190.0 KB → 32.3 KB | 326 × 320 → 326 × 245 |
| /parenting-support-tyler/ | 89.5 KB → 18.7 KB | 89.5 KB → 36.9 KB | 326 × 320 → 326 × 245 |
| /child-teen-counseling-tyler/ | 98.6 KB → 24.3 KB | 98.6 KB → 45.9 KB | 326 × 320 → 326 × 245 |
| /pregnancy-postpartum-counseling-tyler/ | 72.7 KB → 8.7 KB | 72.7 KB → 18.2 KB | 326 × 320 → 326 × 245 |
| /adoption-counseling-tyler/ | 65.7 KB → 21.5 KB | 65.7 KB → 44.0 KB | 326 × 320 → 326 × 245 |
| /divorce-blended-family-counseling-tyler/ | 140.0 KB → 20.0 KB | 140.0 KB → 39.2 KB | 326 × 320 → 326 × 217 |
| /adhd-counseling-tyler/ | 13.0 KB → 13.0 KB | 13.0 KB → 13.0 KB | 326 × 217 → 326 × 217 |
| /individual-counseling-tyler/ | 24.6 KB → 11.4 KB | 47.9 KB → 23.3 KB | 326 × 320 → 326 × 245 |
| /online-therapy-texas/ | 13.7 KB → 21.8 KB | 25.9 KB → 21.8 KB | 326 × 320 → 326 × 217 |
| /christian-counseling-tyler/ | 13.2 KB → 9.1 KB | 27.1 KB → 18.3 KB | 326 × 320 → 326 × 245 |
| /emdr-therapy-tyler/ | 18.3 KB → 7.7 KB | 37.9 KB → 14.2 KB | 326 × 320 → 326 × 245 |
| /life-transitions-counseling-tyler/ | 48.1 KB → 22.9 KB | 83.7 KB → 55.4 KB | 326 × 320 → 326 × 245 |
| /grief-counseling-tyler/ | 49.1 KB → 23.8 KB | 62.3 KB → 54.0 KB | 326 × 320 → 326 × 245 |
| /non-epileptic-seizures-counseling-tyler/ | 33.2 KB → 17.3 KB | 46.5 KB → 32.9 KB | 326 × 320 → 326 × 245 |
| /trauma-therapy-tyler/ | 48.2 KB → 9.2 KB | 83.3 KB → 18.8 KB | 326 × 320 → 326 × 245 |
| /depression-counseling-tyler/ | 15.0 KB → 8.0 KB | 30.9 KB → 15.6 KB | 326 × 320 → 326 × 245 |
| /anxiety-counseling-tyler/ | 29.2 KB → 9.3 KB | 29.2 KB → 19.4 KB | 326 × 217 → 326 × 245 |

Combined hero transfers across 19 pages at 375px: 1278.7 KB → 289.7 KB (77.3% reduction).

Combined hero transfers across 19 pages at 390px: 1278.7 KB → 289.7 KB (77.3% reduction).

Combined hero transfers across 19 pages at 768px: 1460.9 KB → 553.0 KB (62.1% reduction).

Combined hero transfers across 19 pages at 900px: 2348.9 KB → 1286.8 KB (45.2% reduction).

Combined hero transfers across 19 pages at 1024px: 1278.7 KB → 289.7 KB (77.3% reduction).

Combined hero transfers across 19 pages at 1440px: 1460.9 KB → 553.0 KB (62.1% reduction).

The old fixed image heights were intentionally replaced by proportional height on the 17 Unsplash replacements. At 768px, a typical 4:3 hero is about 660 × 495 instead of 660 × 320, avoiding a wide crop that loses heads or interactions. At 390px it is 326 × 245 instead of 326 × 320; at 1440px it remains about 520 × 390. Online Therapy uses its supplied 500:333 ratio. ADHD sizing is unchanged.

## Validation results

- Production build: passed.
- npm run check: passed; 73 built pages checked for preserved content, metadata, links, structure and assets.
- npm run lint: passed; targeted lint passed after the test rounding correction.
- git diff --check: passed.
- Service-image and Non-Epileptic Seizures browser suite: 47 passed on the initial run; one high-DPR natural-dimension rounding assertion was corrected and its targeted rerun passed. All 48 cases now pass across the completed runs. Asset hashes/dimensions and actual rendered aspect ratios remain checked.
- Service images checked at 375, 390, 768, 900, 901, 1024 and 1440 pixels in desktop and mobile browser configurations; actual six-width image screenshots visually reviewed for all 19 pages. Faces/interactions remain visible with no added cropping or horizontal overflow. The owner's Online Therapy photograph retains its original source framing.
- Online Therapy browser suite: passed all seven widths (375, 390, 768, 1024, 1100, 1280, 1440), metadata, FAQ keyboard controls, overflow, local destinations, contact flow and both inbound links. Desktop/mobile page screenshots visually reviewed.
- Performance request assertions: passed. This is not a blanket Core Web Vitals certification; the broader probe still recorded CLS around 0.12 on the untouched homepage/contact layouts.
- No retired red-shirt filename/source ID in active built HTML or service-page requests.
- All 19 service-page sources compared against the pre-task snapshots after excluding the hero image tag: no other page changes. ADHD hash unchanged; Online Therapy production file byte-for-byte identical to the supplied AVIF.
- No push or deployment.
