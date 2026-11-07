# Batch 1 implementation report

Implemented locally. No push or deployment.

## Files changed

Product files:
- `app/page.tsx`
- `components/header.tsx`
- `components/home/Hero.tsx`
- `components/home/Services.tsx`
- `components/home/Faith.tsx`
- `components/home/TherapistsAndLocation.tsx`
- `components/home/NextSteps.tsx`
- `components/insurance-carousel.tsx`
- `components/team-carousel.tsx`
- `components/site-interactions.tsx`
- `public/ivory-design.css`

Validation files:
- `scripts/check-site.mjs`
- `scripts/expect-homepage-batch1.mjs`
- `tests/migration.spec.ts`
- `tests/homepage-batch1.browser.mjs`
- `tests/fixtures/homepage-batch1-desktop.json`
- `tests/fixtures/homepage-batch1-desktop.png`
- `tests/fixtures/homepage-batch1-mobile.json`
- `tests/fixtures/homepage-batch1-mobile.png`

Report: `BATCH1-REPORT.md`.

## Approved copy and layout

1. Header logo CSS width: desktop 245 -> 260px; compact desktop 215 -> 228px; tablet 225 -> 239px; mobile 195 -> 207px; smallest breakpoint 175 -> 186px. Height remains automatic and preserves aspect ratio. Measured header height increases approximately 3-4px at the requested widths; navigation remains aligned.
2. H1 is exactly **Counseling and Therapy in Tyler, TX**. The starting source actually said "Counseling & Therapy in Tyler, Texas"; it was corrected to the explicitly required wording.
3. Hero audience sentence: **Compassionate, professional counseling for individuals, couples, families, and children—grounded in hope and a Christian perspective.** The service introduction also includes children.
4. **People grow here** replaces the old phrase, retaining the uppercase visual treatment and placement.
5. **Heart. Hope. Here.** uses the existing script font and three-line treatment, with exactly three periods. Existing responsive visibility is preserved.
6. **Explore individual counseling** retains `/individual-counseling-tyler/`, with a visible arrow, underline, stronger weight, hover treatment and visible keyboard focus.
7. Faith heading: **Faith-informed approach to therapy**.
8. Faith paragraph: **Our counselors meet you with a Christian perspective and professional and compassionate care for your unique needs.**
9. **Bridging Christian counseling with whole health together** sits directly beneath the hero in the former insurance position: centered serif text on a restrained warm background.
10. The insurance ticker moves from directly below the hero to directly before **Take the Next Step**, after the therapist/local section. Vertical padding reduces from 34px desktop / 28px mobile to 18px. Logo slots reduce from 180x72px desktop / 150x72px mobile to 140x44px. Measured reduced-motion strip heights: approximately 215 -> 158px at 1440px; 203 -> 158px at 768px; 206 -> 180px at 375/390px, including the new payment-option sentence. Normal-motion presentation also includes a compact pause/resume button. Horizontal marquee, touch scrolling, hover/focus pause and reduced-motion behavior remain intact.
11. Cigna and Meritain Health are removed from the homepage ticker. TRICARE and UnitedHealthcare are added using plain text. Verified replacement logo files were unavailable locally; no logo artwork was fabricated. Existing insurer assets remain on disk.
12. Added: **Insurance is one payment option. Self-pay is also available.**
13. Removed the bottom "A Stronger You / Brighter Tomorrows" script phrase without replacement.

## Therapists and specialty navigation

14. The homepage uses the existing carousel component with a separate, unique track ID. All ten therapists appear once within its list, in the established shared-menu order: Jennifer Wood, Erin Young, Jill Kirkley, Alyxandrah White, Misty Shultz, Kim Gonzales, Kelley Bell, Denise Santos, Sarah Bell, Sarah Critzman. The cards retain the menu's credentials and supervision wording and link to existing local profiles. Previous/next buttons, native horizontal swipe, focusable track, Left/Right arrow scrolling and tab-accessible cards are available. There is no autoplay or infinite motion. **View All Therapists** links to `/therapists/`.
15. Counseling Services: **Children and Teens** under Who we help; **Relationships** under What we help with; Pregnancy & postpartum and Premarital counseling moved into What we help with, without duplicates. All existing destinations are retained.
16. **Non-Epileptic Seizures** appears in the homepage specialty directory and the menu's What we help with group. No dedicated local page existed. Both buttons use the established specialty dialog. The dialog says: **For counseling and support with non-epileptic seizures, ask about Erin Young. Contact our office to discuss therapist fit and next steps.** Its existing Contact Us action goes to `/contact/`. No other therapists or medical-treatment claims were added.

## Scope and verification

17. No prices, sliding-scale statements or reduced-fee statements added.
18. No Getting Started / Insurance & Fees page created. The existing homepage next-step section remains. Batch 2 policy content is untouched.
19. Reviewed screenshots and browser behavior at 375, 390, 768 and 1440px: hero hierarchy, positioning line, logo alignment, ticker, carousel, long menu, mobile scrolling and visible focus. No document horizontal overflow. Native touch gestures passed at 375, 390 and 768px. All ten local profile links returned 200. Keyboard navigation exposes offscreen cards. The chatbot remains usable; carousel/menu controls are reachable without launcher obstruction. Existing mobile navigation and chatbot tests also cover short viewports.
20. `npm run check`, `npm run lint`, `npm run build`, and `git diff --check` passed (invoked through `npm.cmd` on Windows). The site checker validates 70 pages. Homepage/navigation regression suite: 27 passed, one desktop-hover test intentionally skipped on mobile. New four-width homepage browser checks passed. Desktop/mobile screenshot comparisons report zero changed pixels. Inquiry unit tests: three passed. Contact and chatbot browser regressions passed with mocked submissions; no real inquiries sent. Additional staff and service-image tests passed during the navigation run.

The migration checker now applies only the explicit Batch 1 changes to its frozen expectations before retaining full element, attribute and text comparisons. Visual baselines were refreshed for the reviewed layout; the original geometry assertion and <0.1% pixel-difference threshold remain. The menu-arrow test is scoped to its menu carousel; the JavaScript-disabled test uses the configured server and the approved H1 instead of its obsolete hard-coded port/heading.

No Contact form, Netlify form definition, chatbot flow, blog, therapist profile, Kalynne staff page, service-page body, redirects, robots configuration or production SEO configuration was modified. No push or deployment was performed.


## Non-Epileptic Seizures service update

The historical dialog-only implementation described above is superseded by the owner-approved full service at /non-epileptic-seizures-counseling-tyler/. Homepage and mega-menu entries now link directly to it. Erin Young remains the only provider. See [NON-EPILEPTIC-SEIZURES-REPORT.md](NON-EPILEPTIC-SEIZURES-REPORT.md) for the source audit, exact copy, and validation.
