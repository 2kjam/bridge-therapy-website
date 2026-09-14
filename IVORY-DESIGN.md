# Reference redesign — September 14, 2026

Reference: user-provided `ChatGPT Image Sep 14, 2026, 08_47_59 AM.png`.

The homepage follows the supplied composition: compact header, full-width landscape hero, four care attributes, six service photo tiles, a split faith section, four real therapists beside local practice information, a landscape appointment banner, and a light compact footer. The serif and handwriting typography, forest green buttons, ivory backgrounds, restrained borders and botanical accents replace the former blue/coral direction.

`public/ivory-design.css` is the final shared design layer across every active page. The existing specialty URLs, page metadata, content, phone/email contact flow, FAQ disclosures, ten-person therapist menu and preview chatbot are retained. “Book an Appointment” remains the CTA. Insurance is on `/contact/#insurance`, with the existing `/#insurance` anchor pointing visitors toward it. No production publishing was performed; preview remains noindex.

## Reference adaptations

- Actual staff names, credentials, address, phone and email replace the different details pictured in the mockup.
- The real founders photograph fills the local section until an actual office photo is available. The mockup building is not represented as the practice's office.
- The faith statement is new unattributed display copy, not a quotation attributed to a staff member.
- The wordmark and emblem are a vector interpretation of the reference. The original logo asset remains available.
- Existing full specialty navigation is available in the menu and the service directory disclosure. Pending specialties still open the preview dialog.
- No unverified social accounts or nonexistent policy pages were added merely to copy the footer.

## Image assets and prompts

Generated with the built-in image tool; original outputs are retained in Codex generated_images. Optimized JPEG copies are in `public/assets/`. These scenes are illustrative and do not depict actual staff, clients, the office, or a verified local location. Staff portraits remain the original practice photographs.

| Asset | Final prompt |
| --- | --- |
| `ivory-hero.jpg` | Recreate only the reference hero background, 3:1: back of an anonymous woman with shoulder-length brown hair and oatmeal sweater in the right third, looking over gently rolling forest-covered hills in warm autumn sunlight; left 55% pale sky and hazy hills for dark text. Muted olive, ivory and amber. No typography, logos, site elements, or visible face. |
| `ivory-foliage.jpg` | Photorealistic olive branch with muted sage leaves on the right, sun through upper right, rich dark forest-green bokeh and empty dark left half for text. 2:1, no text or people. |
| `ivory-lake.jpg` | Peaceful lake with pine and deciduous trees, golden sunset sparkling from center-right, deep green shadows on left; very wide banner. No people, buildings, text or logo. |
| `ivory-relationships.jpg` | Young adult couple outdoors, foreheads gently touching, eyes softly closed, blue shirt and neutral clothes, warm late-afternoon light, green bokeh, reassuring connection. 4:3, no text. |
| `ivory-parenting.jpg` | Father kneeling to talk gently with young daughter in leafy park, eye contact, neutral casual clothes, warm reassuring connection and soft golden light. 4:3, no text. |
| `ivory-teen.jpg` | Adolescent boy with backpack outdoors in quiet leafy park, side/back view looking toward trees, warm gentle light and muted olive greens. 4:3, no text. |
| `ivory-anxiety.jpg` | Adult woman by softly lit window, hand near chin, thoughtful expression, oatmeal cardigan, ivory interior and plants, empathetic reflective mood. 4:3, no text. |
| `ivory-trauma.jpg` | Anonymous woman in grey sweater seated on rock at wooded mountain overlook, full body seen from behind, hazy layered hills and gentle natural light. 4:3, no text. |
| `ivory-grief.jpg` | Brown-haired woman in dark neutral sweater looking toward sunset, slight side/back profile, framed waist-up, blurred lake and wooded hills, quiet reflective mood, amber and olive tones. 4:3, no text. |

The Kristi handwriting font is self-hosted at `public/assets/fonts/kristi.ttf`; its SIL Open Font License is alongside it. The new emblem, icons and leaf illustration are SVG.

## Verification

- All 19 active routes checked at 390, 768 and 1440 pixels for horizontal overflow and failed image loads; no failures detected.
- Desktop and mobile homepage, main sections, menus, contact and service layouts visually inspected.
- Booking navigation, mobile menu, Escape dismissal, all ten therapist cards, carousel movement, and Find a Therapist checked.
- `npm run check` checks both browser scripts plus local links, assets, fragments, duplicate IDs, H1 presence and shared styles across all 20 HTML documents, including the retired redirect.
- Previous homepage retained in `design-backups/homepage-before-ivory.html`.

Remaining launch work: actual office photograph, review of final copy and branding, full chatbot implementation, and completion of pending specialty pages.
