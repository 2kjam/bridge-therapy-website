# Non-Epileptic Seizures service page

## Source audit

Primary sources: the current owner instruction confirming a full service and Erin-only mapping; the approved specialty-dialog copy in components/site-interactions.tsx before this change; Erin's active profile at app/therapists/erin-young/page.tsx; the existing individual and Christian counseling pages for general counseling/faith positioning.

The dialog said: “For counseling and support with non-epileptic seizures, ask about Erin Young. Contact our office to discuss therapist fit and next steps.” Erin's active profile includes counseling support for non-epileptic concerns, her LCSW-S credential, co-owner role, client groups, and professional background.

Preserved team-reference.html (around line 2225) contains older “stress based psychogenic nonepileptic seizures” terminology, an Epilepsy Center relationship, a CBT program description, and seizure-control/quality-of-life claims. These historical claims were not imported as current clinical promises or partnerships. The public name remains Non-Epileptic Seizures. Searches of legacy, design backups and content did not find a separate service description. No general medical content was imported.

## Files created

- app/non-epileptic-seizures-counseling-tyler/page.tsx
- tests/non-epileptic-seizures.spec.ts
- NON-EPILEPTIC-SEIZURES-REPORT.md

## Files changed for this task

- components/header.tsx: same-position menu link replaces the specialty trigger.
- components/home/Services.tsx: one directory link replaces the specialty trigger.
- components/site-interactions.tsx: removed the now-unused specialty-dialog copy only.
- app/therapists/erin-young/page.tsx: linked the existing non-epileptic focus wording and added the approved Relevant Services entry; biography unchanged.
- scripts/expect-homepage-batch1.mjs: expected link instead of button, without editing preserved migration snapshots.
- scripts/check-site.mjs: new route validation, Erin-only provider checks, and exact updated Erin service associations.
- tests/homepage-batch1.browser.mjs: direct-service behavior replaces dialog assertions.
- tests/navigation.spec.ts: active service count 17 -> 18.
- BATCH1-REPORT.md: current-service update appended to the historical dialog entry.

No image files, shared CSS, Contact form, widget behavior, other provider mappings, historical blog/reference files, migration snapshots, SEO infrastructure or Batch 2 policies changed. Earlier approved homepage changes remain.

## Route, metadata and structure

Route: /non-epileptic-seizures-counseling-tyler/

Title: Non-Epileptic Seizures Counseling | Tyler, TX | The Bridge

Description: Counseling support for Non-Epileptic Seizures with Erin Young, LCSW-S at The Bridge in Tyler, Texas. Contact our office about an appointment.

H1: Non-Epileptic Seizures Counseling in Tyler, TX

Inherits noindex, nofollow. Uses SiteShell and the established service-page stylesheet sequence.

Sections: hero/introduction and early counselor jump; counseling support and medical boundary; single Erin provider section; four native FAQ disclosures; related counseling paths; closing appointment CTA.

## Provider, links and image

Erin Young, LCSW-S is the ONLY featured provider and the only specialty association. Existing portrait: /assets/erin.jpg. Profile link: /therapists/erin-young/. The profile retains its existing /contact/?therapist=erin-young inquiry mechanism. Both general Book an Appointment CTAs on the service page go to /contact/.

Early link: “Meet our Non-Epileptic Seizures counselor” -> #team-title, with the established tabIndex=-1 heading and 2rem scroll margin plus global sticky-header scroll padding.

Homepage directory: one normal same-tab service link, replacing its dialog. Shared mega menu: same label and What we help with group, same-tab link to the new route. Erin's existing non-epileptic focus wording and new Relevant Services entry link back. No other therapist received this association.

Related paths: /individual-counseling-tyler/ and /christian-counseling-tyler/, as general counseling/context links. No anxiety/trauma causal association was introduced.

Temporary hero: existing /assets/individual-care.jpg, the existing individual-counseling visual and alt text. It is illustrative, not a depiction of a seizure or a claim about the person's health. No asset created, edited, downloaded or generated; a unique specialty visual remains deferred.

## Complete page copy

Home / Counseling / Non-Epileptic Seizures

PERSONAL SUPPORT · A CHRISTIAN PERSPECTIVE

## Non-Epileptic Seizures Counseling in Tyler, TX

A place to talk. Support for your next step.

The Bridge offers counseling support related to Non-Epileptic Seizures in Tyler, Texas. Erin Young, LCSW-S is the counselor for this specialty. Contact our office to discuss your concerns and ask about working with Erin.

Meet our Non-Epileptic Seizures counselor

Room to reflect. Support for your next step.

COUNSELING THAT STARTS WITH YOU

### Start with what brings you here.

You can tell Erin about the personal concerns and questions you want to bring to counseling. Contact our office to discuss counselor fit and the next steps for an appointment.

The Bridge offers a Christian perspective on counseling. You can discuss how faith and personal values connect with the support you are seeking.

#### Counseling and medical care

This service provides counseling support. Counseling is not a substitute for appropriate medical evaluation or emergency care. Questions about diagnosis, seizure type, testing, or medication belong with appropriate healthcare professionals.

GET TO KNOW YOUR COUNSELOR

### Meet Erin Young.

#### Erin Young, LCSW-S

Licensed Clinical Social Worker–Supervisor · Co-owner

Erin provides counseling support for Non-Epileptic Seizures. She works with children, adolescents, individual adults, and families. Her profile shares more about her professional background and Christian perspective.

### Questions about getting started

**Does The Bridge offer counseling for Non-Epileptic Seizures?**

Yes. Erin Young, LCSW-S provides counseling support for this specialty. Contact our office about your concerns and current appointment availability.

**Is counseling a replacement for medical care?**

No. This is a counseling service, not medical evaluation or emergency care. Medical questions should be discussed with appropriate healthcare professionals.

**Can Christian faith be part of counseling?**

The Bridge is a Christian counseling practice. You can talk with Erin about your faith and the support you are seeking. Faith-based support does not replace medical care.

**How do I get started?**

Contact our office and mention that you are interested in Non-Epileptic Seizures counseling with Erin Young. An inquiry starts a conversation about next steps; it does not confirm an appointment.

EXPLORE COUNSELING AT THE BRIDGE

### More about our approach

YOUR NEXT STEP

### Start with a conversation.

Contact our Tyler office about Non-Epileptic Seizures counseling with Erin Young.

Additional link labels: Read Erin's profile; Individual Counseling; Christian Counseling; Book an Appointment (closing CTA). Existing decorative arrows remain.

## Validation

- Build: passed; 55 static pages generated, including the new service.
- Check: passed; 72 validated page entries (previously 71), including existing historical route variants. Active Tyler service count is 18 (previously 17).
- Lint: passed.
- git diff --check: passed.
- New service browser tests: 4 passed at 375, 390, 768 and 1440px. Verified one H1, metadata/indexing, only Erin, both direct entry points, reciprocal profile links, all page links, Contact CTAs, FAQ keyboard toggles, focus and sticky-header jump clearance, image loading and no horizontal overflow.
- Visually reviewed full page at all four widths: natural hero wrapping, existing image treatment, one provider card without an empty second grid cell, readable FAQ/CTA, consistent service design.
- Homepage/navigation regression selection: 27 passed and 1 expected mobile skip for desktop hover, after updating the exact service count. Both unchanged homepage visual references passed with zero changed pixels; no migration snapshots were edited.
- Four-width homepage checks: passed, including all ten therapist links/order, swipe, arrows, keyboard navigation, approved copy, insurance, location and direct specialty navigation.
- Contact browser regressions: passed, all ten therapist preselection contexts, unknown fallback, validation, mocked submission success/error, links and all four widths.
- Chatbot browser regressions: passed, all ten profile contexts, prompt/menu suppression, keyboard focus, validation, storage/privacy, mocked success/error, and responsive/reduced-height checks. No real inquiry was sent.

Initial failures were limited to the now-outdated service-count expectation, a directory-link test that omitted the existing CSS arrow in its accessible name, and an unescaped JSX apostrophe. These were corrected and the affected checks passed. No test thresholds or unrelated expectations were weakened.

No push. No deployment.
