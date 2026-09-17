# Office Manager implementation

## Staff layout refinement — September 16, 2026

This refinement changes only Kalynne's page presentation. A page-only stylesheet (`public/staff-profile.css`) replaces the sparse introduction with a compact 240 × 360 desktop portrait beside her name, Office Manager role, introductory heading, short administrative copy and a single Contact CTA. Previously the portrait measured 320 × 480 with only name, role and button beside it. The redundant bottom CTA section is removed.

Intro heading: **Helping you get started at The Bridge**.

Exact intro: “Kalynne is The Bridge’s Office Manager. If you have questions about getting started, our office is here to help you take the next step.” This directs workflow questions to the office without assigning unverified individual responsibilities.

Mobile order: name, role, introductory heading/copy, Contact CTA, proportional 180 × 270 portrait, About Kalynne. Biography reading width is capped at 740px. All six approved paragraphs remain verbatim and in order. Scripture uses a restrained ivory block with a thin green rule, retaining its exact wording and reference without a translation label. Breadcrumb is now **Home → Kalynne Arrick**.

Files for this refinement: `app/staff/kalynne-arrick/page.tsx`, new `public/staff-profile.css`, `tests/staff.spec.ts`, and this report. Shared CSS, all other pages, Contact/menu content, photograph, metadata and therapist mappings are unchanged. Earlier sections below record prior designs.

Refinement validation: build, check, lint and diff check passed. All eight staff browser regressions passed across desktop/mobile projects and widths 375, 390, 768 and 1440px. Screenshots reviewed at each width. Tests verify exact biography/scripture/introduction, proportional smaller portraits, mobile ordering, simplified breadcrumb, one Contact CTA, working links, no overflow and exclusion from therapist listings. Existing site checks confirm unchanged clinical mappings and staging behavior. No push or deployment.

## Approved biography update — September 16, 2026

The newly supplied user biography supersedes the original shortened profile and the original omission decisions recorded below. All six approved paragraphs, including the education in progress, counseling interests and scripture, now appear verbatim under **About Kalynne**. The exact approved text is preserved in `tests/fixtures/kalynne-approved-biography.txt` and checked against the rendered page at all four requested widths.

Current structure: breadcrumb; unchanged portrait, H1 **Kalynne Arrick**, role **Office Manager**, and Contact CTA; readable full-width biography using the existing profile-details design; unchanged getting-started Contact section. No Bible translation label added. Metadata, photo, route, Contact feature, administrative menu card, therapist mappings and all other site content remain unchanged by this update. The historical implementation record below describes the initial version rather than the current biography.

Files changed for this update: `app/staff/kalynne-arrick/page.tsx`, `tests/staff.spec.ts`, this report. Created: `tests/fixtures/kalynne-approved-biography.txt`.

Update validation: build, check (including exact therapist specialty mappings), lint and diff check passed. Staff/navigation suite: 21 passed, one desktop-hover test skipped on mobile. Existing Contact browser regressions passed with mocked submissions. All six rendered paragraphs match the approved fixture at 375, 390, 768 and 1440 pixels; screenshots visually reviewed at each width. Sarah Critzman's Play Therapy mapping remains unchanged. Nothing pushed or deployed.

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
