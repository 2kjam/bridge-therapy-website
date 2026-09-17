# Office Manager implementation

Verified September 16, 2026: **Kalynne Arrick — Office Manager**.

## Sources and photograph

- Preserved `team-reference.html`, image immediately preceding the Kalynne Arrick heading and biography (approximately lines 4395–4417).
- Current public source: https://www.thebridgetherapy.com/meet-the-team — same identity, title, biography and portrait.
- `PHOTO-CREDITS.md` independently records the portrait source.
- Existing permanent asset: `/assets/kalynne.jpg`, 2500 × 3750. Reused without alteration, replacement, retouching or cropping.
- Original photograph: https://images.squarespace-cdn.com/content/v1/5b98eac23e2d0982a39619c2/17c9e0c8-24e3-467e-9ca2-3060b99a824e/IMG_9632.JPG

The source establishes her business degree, graduation year and photography business background. It does not establish specific administrative duties, personal contact details, insurance responsibilities or scheduling responsibilities. None were invented. Published counseling studies/interests and personal family/history details were intentionally left out to keep this a concise administrative profile, without implying clinical qualifications or services.

## Exact profile content

Route: `/staff/kalynne-arrick/`

Metadata title: **Kalynne Arrick, Office Manager | The Bridge**

Metadata description: “Meet Kalynne Arrick, Office Manager at The Bridge Therapeutic Services in Tyler, Texas.”

Breadcrumb: Home → Contact → Kalynne Arrick.

H1: **Kalynne Arrick**. Role: **Office Manager**.

### About Kalynne

Kalynne Arrick is the Office Manager at The Bridge. Her background as a photography business owner has shaped her appreciation for listening, building trust, and helping people feel valued.

She earned a bachelor’s degree in Business Administration from LeTourneau University in 2012.

CTA: **Contact The Bridge** → `/contact/`.

### Getting started at The Bridge

Contact our office with questions about getting started.

CTA: **Contact The Bridge** → `/contact/`.

## Contact and menu treatments

Contact feature sits between the existing introduction and inquiry form. Portrait, **Kalynne Arrick**, **Office Manager**, then:

“Kalynne’s background as a photography business owner has shaped her appreciation for listening, building trust, and helping people feel valued.”

**Meet Kalynne →** links to `/staff/kalynne-arrick/`.

Counseling Services help card retains **Not sure where to start?**, adds the portrait and **Kalynne Arrick · Office Manager**, then:

“Contact our office with questions about getting started.”

**Contact us →** retains `/contact/`. No nested or extra menu links were added.

Profile portrait has meaningful alt text; adjacent-name images in Contact and the menu use empty alt text. All render at their natural 2:3 aspect ratio, with bounded portrait sizes.

## Files in this change

Created:
- `app/staff/kalynne-arrick/page.tsx`
- `tests/staff.spec.ts`
- `OFFICE-MANAGER-IMPLEMENTATION.md`

Updated:
- `app/contact/page.tsx`
- `components/header.tsx`
- `public/contact/contact.css`
- `public/ivory-design.css`
- `public/therapist-profile.css`
- `scripts/check-site.mjs`
- `playwright.navigation.config.ts` (existing working-tree file from the previous cleanup)

Earlier uncommitted navigation/CTA cleanup changes were preserved.

## Validation results

- `npm run build`: passed; staff route prerendered.
- `npm run check`: passed, 70 route entries checked (including legacy aliases), with existing content/form checks retained and exact staff additions verified separately.
- `npm run lint`: passed.
- `git diff --check`: passed.
- `npm run test:navigation`: 21 passed; one existing desktop-hover test appropriately skipped in the mobile project. Includes staff/profile/contact/menu checks at 375, 390, 768 and 1440 pixels, keyboard/navigation behavior and widget suppression/state retention.
- `node tests/contact-inquiry.browser.mjs`: passed, including all 10 therapist options, validation, mocked success/error, retained input, FAQs, links and four widths.
- `node tests/inquiry-widget.browser.mjs`: passed, including all 10 provider contexts, retry/error/success, focus, privacy, four widths and reduced-height viewport.
- `node --test tests/inquiry.test.mjs`: 3 passed.
- Visual screenshot review confirmed the bounded, proportional portraits and readable staff/contact/menu layouts on mobile, tablet and desktop. No horizontal overflow in the four-width staff checks.
- Browser submissions were mocked; no real inquiry or email was sent. These checks do not establish production Netlify storage.

Screenshots are under `test-results/navigation/staff-*` in the local workspace.

## Boundaries

No Office Manager entry was added to the therapist directory, carousel, dropdown, clinical provider lists, service cards, mappings or counts. No new top-level navigation or staff directory. Contact form implementation, Netlify form definition, FAQs, office contact/location information and chatbot implementation/avatar are unchanged by this task. No schema, sitemap, canonical, redirect or production indexing changes. The staff route inherits staging `noindex, nofollow`. Nothing pushed or deployed.
