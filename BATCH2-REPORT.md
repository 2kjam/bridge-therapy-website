# Batch 2 implementation report

Implemented the owners' verified operational answers in the existing site. No dedicated Getting Started / Insurance & Fees page was created. No push or deployment.

## Scope and audit findings

Audited Contact, all 18 active Tyler service pages (including Non-Epileptic Seizures), relevant staff/provider content, current insurer displays and project mapping notes.

- No active counseling/session dollar amounts or negative sliding-scale/reduced-fee statements were found. No prices or affordability restrictions were added.
- The homepage is the only current insurer display. It already includes TRICARE and UnitedHealthcare and excludes Cigna and Meritain/Meritan. Other displayed insurers were retained; no conflicting active list was found.
- Historical blog articles and preserved/reference content were not edited.
- The pasted instructions ended after “The 19” in the historical-blog section. The clear instruction to preserve the historical articles was followed.

## Homepage wording conflict

Batch 2 repeats an older instruction to preserve “Our Office Accepts Self-Pay and Insurance.” The user had explicitly removed that sentence in the intervening conversation. A clarification was requested; absent a reply, the recent text-free ticker treatment was preserved. The ticker, its logos, speed, dimensions, placement, automatic scrolling, and reduced-motion behavior were unchanged. Contact and relevant service FAQs clearly state that self-pay is available.

## Verified information now presented

Contact remains the primary practical-information page. The inquiry form remains before the practical FAQs, and its fields, validation, Netlify configuration, preselection and success/error behavior are unchanged.

- Response: “We typically respond to new inquiries within 24 hours.”
- Hours: Monday–Friday, 8:00 AM–7:00 PM; weekends based on availability. Presented as office hours, without implying continuous telephone coverage.
- Intake: paperwork is emailed once scheduling begins, to complete before the appointment. An inquiry does not confirm an appointment.
- Formats: both in-person and telehealth counseling.
- Session length: typically 50–60 minutes.
- Payment: check, cash and credit card; the system requires a card on file. Fees are discussed with the office, without amounts.
- Insurance: self-pay is available; participation varies by counselor, plan and appointment type. The office confirms current coverage.
- Out-of-network: superbills can be provided for clients to submit. The insurer determines reimbursement; payment is not guaranteed.
- Cancellation: at least 24 hours' notice; with less notice, the client is responsible for the full session fee. No amount is published.
- Minors: the Child & Teen, Parenting and Family FAQs explain that the practice generally meets with the parent or parents during the first session. No new age, consent, custody, confidentiality or child-attendance claims were added.

## Kalynne and provider safeguards

Contact's existing Kalynne feature and her separate staff introduction explain her administrative role helping prospective clients connect with a counselor who may be a good fit. The menu remains concise: “Kalynne can help you find a counselor who may be a good fit.” Name, Office Manager title, Contact destination and portrait treatment remain.

Kalynne's six approved biography paragraphs remain verbatim, verified against the existing biography fixture. She remains excluded from therapist cards and clinical mappings. No diagnosis, clinical assessment, treatment recommendation or guaranteed fit is implied.

Kim Gonzales -> Adoption/Foster Family Support is now owner-confirmed and approved. Her existing /adoption-counseling-tyler/ association and profile link remain. The implementation-check comment records the confirmation. Her foster-parent experience remains personal experience; no certification or credential was added. No active provisional/pending-confirmation note was found to replace.

Non-Epileptic Seizures remains Erin-only. Only its “How do I get started?” answer gained the approved emailed-intake step. The rest of that page, including its medical boundaries, is protected by a source-comparison test. No clinical wording, provider fit, image, metadata or service links were changed there.

## Files changed for this batch

- app/adhd-counseling-tyler/page.tsx
- app/adoption-counseling-tyler/page.tsx
- app/child-teen-counseling-tyler/page.tsx
- app/christian-counseling-tyler/page.tsx
- app/depression-counseling-tyler/page.tsx
- app/divorce-blended-family-counseling-tyler/page.tsx
- app/emdr-therapy-tyler/page.tsx
- app/family-counseling-tyler/page.tsx
- app/grief-counseling-tyler/page.tsx
- app/life-transitions-counseling-tyler/page.tsx
- app/parenting-support-tyler/page.tsx
- app/pregnancy-postpartum-counseling-tyler/page.tsx
- app/premarital-counseling-tyler/page.tsx
- app/trauma-therapy-tyler/page.tsx
- app/individual-counseling-tyler/page.tsx
- app/anxiety-counseling-tyler/page.tsx
- app/marriage-counseling-tyler/page.tsx
- app/non-epileptic-seizures-counseling-tyler/page.tsx
- app/contact/page.tsx
- app/staff/kalynne-arrick/page.tsx
- components/header.tsx
- scripts/check-site.mjs
- tests/staff.spec.ts

Created:

- scripts/expect-batch2.mjs
- tests/batch2.spec.ts
- tests/fixtures/batch2-copy.json
- tests/fixtures/batch2-protected.json
- BATCH2-REPORT.md

The expectation helper applies only these explicit changes to the in-memory migration reference. Frozen migration files and homepage screenshot fixtures were not changed. Form/widget source hashes are pinned to their pre-Batch-2 values. Existing unrelated uncommitted work remains preserved.

## Exact revised operational paragraphs

### /adhd-counseling-tyler/

Contact our office through the website inquiry form, conversational inquiry widget, phone, or email to ask about ADHD counseling and support and scheduling. Insurance and self-pay are available. Participation varies by counselor, plan, and appointment type; our office can confirm current coverage.

### /adoption-counseling-tyler/

Contact our office through the website inquiry form, conversational inquiry widget, phone, or email to ask about adoption and foster family support and scheduling. Self-pay is available alongside insurance. Check with our office about participation for your counselor, plan, and appointment type.

### /child-teen-counseling-tyler/

Contact our office through the website inquiry form, conversational inquiry widget, phone, or email to ask about child and teen counseling and scheduling. You can use self-pay or ask about insurance. Coverage depends on your plan, counselor, and appointment type; contact the office to confirm participation.

When counseling involves a minor, The Bridge generally begins by meeting with the parent or parents during the first session.

### /christian-counseling-tyler/

Contact our office through the website inquiry form, conversational inquiry widget, phone, or email to ask about Christian counseling and scheduling. Insurance and self-pay are available. Participation varies by counselor, plan, and appointment type; our office can confirm current coverage.

### /depression-counseling-tyler/

Contact our office through the website inquiry form, conversational inquiry widget, phone, or email to ask about depression counseling and scheduling. Self-pay is available alongside insurance. Check with our office about participation for your counselor, plan, and appointment type.

### /divorce-blended-family-counseling-tyler/

Contact our office through the website inquiry form, conversational inquiry widget, phone, or email to ask about divorce and blended family counseling and scheduling. You can use self-pay or ask about insurance. Coverage depends on your plan, counselor, and appointment type; contact the office to confirm participation.

### /emdr-therapy-tyler/

Contact our office through the website inquiry form, conversational inquiry widget, phone, or email to ask about EMDR therapy and scheduling. Insurance and self-pay are available. Participation varies by counselor, plan, and appointment type; our office can confirm current coverage.

### /family-counseling-tyler/

Contact our office through the website inquiry form, conversational inquiry widget, phone, or email to ask about family counseling and scheduling. Self-pay is available alongside insurance. Check with our office about participation for your counselor, plan, and appointment type.

The participants depend on your concerns and the counselor’s approach. When counseling involves a minor, The Bridge generally begins by meeting with the parent or parents during the first session.

### /grief-counseling-tyler/

Contact our office through the website inquiry form, conversational inquiry widget, phone, or email to ask about grief counseling and scheduling. You can use self-pay or ask about insurance. Coverage depends on your plan, counselor, and appointment type; contact the office to confirm participation.

### /life-transitions-counseling-tyler/

Contact our office through the website inquiry form, conversational inquiry widget, phone, or email to ask about life transitions counseling and scheduling. Insurance and self-pay are available. Participation varies by counselor, plan, and appointment type; our office can confirm current coverage.

### /parenting-support-tyler/

Contact our office through the website inquiry form, conversational inquiry widget, phone, or email to ask about parenting support and scheduling. Self-pay is available alongside insurance. Check with our office about participation for your counselor, plan, and appointment type.

Parenting support focuses on you. Tell our office whether you are seeking help for yourself, your child, or both. When counseling involves a minor, The Bridge generally begins by meeting with the parent or parents during the first session.

### /pregnancy-postpartum-counseling-tyler/

Contact our office through the website inquiry form, conversational inquiry widget, phone, or email to ask about pregnancy and postpartum counseling and scheduling. You can use self-pay or ask about insurance. Coverage depends on your plan, counselor, and appointment type; contact the office to confirm participation.

### /premarital-counseling-tyler/

Contact our office through the website inquiry form, conversational inquiry widget, phone, or email to ask about premarital or marital enrichment counseling and scheduling. Insurance and self-pay are available. Participation varies by counselor, plan, and appointment type; our office can confirm current coverage.

### /trauma-therapy-tyler/

Contact our office through the website inquiry form, conversational inquiry widget, phone, or email to ask about trauma and PTSD counseling and scheduling. Self-pay is available alongside insurance. Check with our office about participation for your counselor, plan, and appointment type.

### /individual-counseling-tyler/

Insurance and self-pay options are available. Insurance participation can vary by counselor, plan, and appointment type. Contact our office to confirm current coverage and discuss payment options.

Contact The Bridge through the website inquiry form, conversational inquiry widget, phone, or email to ask about individual counseling and scheduling. Our office is at 3800 Paluxy Drive, Suite 240, Building 2, Tyler, Texas. Once you begin scheduling, the office will email intake paperwork for you to complete before your appointment.

### /anxiety-counseling-tyler/

Self-pay is available, and you can also ask about insurance. Our office can confirm participation for your specific counselor, plan, and appointment type before you schedule.

Your first conversations are a chance to explain your concerns, ask questions, and discuss your goals. Once scheduling begins, the office will email intake paperwork to complete before your appointment.

### /marriage-counseling-tyler/

Self-pay is available for couples counseling. Insurance participation varies by counselor, plan, and appointment type. A listed insurer does not establish coverage for couples sessions; contact our office to confirm your options.

Contact The Bridge through the website inquiry form, the conversational inquiry widget, phone, or email to ask about couples counseling and scheduling at our Tyler office. Once you begin scheduling, the office will email intake paperwork for you to complete before your appointment.

### /non-epileptic-seizures-counseling-tyler/

Contact our office and mention that you are interested in Non-Epileptic Seizures counseling with Erin Young. An inquiry starts a conversation about next steps; it does not confirm an appointment. Once you begin scheduling, the office will email intake paperwork for you to complete before your appointment.

### /contact/

Call or email our office to ask about counselor availability. We typically respond to new inquiries within 24 hours.

If you are not sure which counselor to contact, Kalynne, our Office Manager, can talk with you about what you are looking for and help connect you with a counselor who may be a good fit.

Once you begin the scheduling process, the office will email intake paperwork for you to complete before your appointment. We can also help with questions about finding the office.

No. You can get to know our counselors first, or talk with Kalynne, our Office Manager, about what you are looking for. She can help connect you with a counselor who may be a good fit. If you already have someone in mind, mention their name when you reach out.

Insurance and self-pay options are available. Insurance participation can vary by counselor, plan, and appointment type. Contact our office to confirm current coverage. You can also view our insurance logos on the homepage .

### /staff/kalynne-arrick/

Kalynne is The Bridge’s Office Manager. If you are not sure which counselor to contact, she can talk with you about what you are looking for and help connect you with a counselor who may be a good fit.

## Additional Contact FAQ answers

**What happens after I contact The Bridge?**

An inquiry does not confirm an appointment. Once you begin the scheduling process, our office will email intake paperwork for you to complete before your appointment.

**Do you offer in-person or telehealth appointments?**

The Bridge offers both in-person and telehealth counseling. Contact our office about scheduling.

**How long is a session?**

Sessions are typically 50–60 minutes.

**What payment methods do you accept?**

The Bridge accepts check, cash, and credit card payments. The practice’s system requires a card to be kept on file. Contact our office about current fees and payment options.

**What if my counselor is not in network?**

The Bridge can provide a superbill that you may submit to your insurance company. Ask the office about a superbill if your counselor is not in network with your plan. Your insurance company determines any reimbursement; payment is not guaranteed.

**What is the cancellation policy?**

The Bridge requires at least 24 hours’ notice for cancellations. If less notice is provided, you are responsible for the full session fee.

## Validation

- Build: passed; 55 generated static pages. No new route was introduced for Batch 2.
- Check: passed, 72 validated page entries; exact existing route/content/link/metadata/form checks retained.
- Lint: passed.
- git diff --check: passed.
- Batch 2 tests: 6 passed, including exact operational paragraphs, prohibited-content audit, source preservation and Contact/menu at 375, 390, 768 and 1440px.
- Staff biography/admin tests: 4 passed across the requested widths.
- Non-Epileptic Seizures page/link/provider tests: 4 passed across the requested widths.
- Homepage/navigation regression selection: 27 passed, 1 expected mobile skip for desktop hover. Both homepage visual tests passed with zero changed pixels against the existing references.
- Contact form browser regression: passed for all ten therapist preselection contexts, unknown fallback, validation, mocked success/error, links and four widths.
- Chatbot browser regression: passed for all ten profile contexts, conversation flow, prompt/menu suppression, keyboard focus, validation, privacy/storage, mocked submission behavior and responsive/reduced-height layouts.

Reviewed Contact and the concise menu help card visually at all four widths: form remains prominent, practical content stays below it, FAQs expand by keyboard, office details are readable, and there is no horizontal overflow. No actual inquiry or email was sent.

A preservation check caught a formatter-only change outside the NES FAQ; that line was restored rather than weakening the check. Final preservation checks pass.

No push. No deployment.
