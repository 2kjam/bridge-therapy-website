# The Bridge — local website

Open this folder in VS Code. Run `npm run dev` and open http://127.0.0.1:4322.

No dependencies or installation are required beyond Node.js. This project has no Sites integration. No publishing is configured.

Current slice: responsive header, three photo-rich navigation panels, homepage opening, service directory preview, contact destination and chatbot placeholder. Navigation opens on hover for mouse users and on click/touch/keyboard, closes with Escape/outside click, and becomes stacked disclosures on smaller screens.

Edit `public/index.html`, `public/style.css`, and `public/app.js`. The local server is for development only. Pages are intentionally noindex until the full site is reviewed and launched. Service selections show a clearly labeled preview; clinical descriptions, service pages, contact delivery, and real chatbot are future steps.

Photos and logo are from The Bridge's existing website. Portraits are Jennifer Wood and Erin Young from /meet-the-team. assets/team.jpg is actually the existing decorative bridge photograph, not a team photo or the practice's office.

## Insurance strip
The twelve logos are copied from the existing insurance-logo-gallery page, with source URLs in insurance-sources.json. Confirm current participation with the practice before launch; this gallery alone does not verify coverage. Original brand artwork has been retained.

## Contact page
The contact page uses the existing office phone/email scheduling workflow, with the shared navigation, address, directions, and short FAQs. No inquiry form, data collection, or email delivery service is implemented. Hours and insurance participation need practice confirmation before launch.

## Individual counseling
New service-page template: /individual-counseling-tyler/. Shared service-page.css, semantic headings, unique title/description, concern sections, counselor links, FAQs and contact CTAs. Linked from individual-care navigation and homepage cards. Provider summaries sourced from https://www.thebridgetherapy.com/meet-the-team (September 12, 2026). Content remains a noindex local draft for practice review. Dedicated specialty pages and production canonical URLs are later steps.

## Marriage and couples counseling
/marriage-counseling-tyler/ uses the approved service layout and typography. Connected across all current navigation menus and homepage relationship links. Alyx and Kelley summaries are based on the current practice team page, reviewed September 12, 2026. Local noindex draft; provider availability and final copy remain for practice review.

## Children and families overview
/children-families/ completes the three main homepage pathways. Its four sections introduce child, teen, parenting, and family care; dedicated specialty pages remain planned separately. Counselor summaries use the reviewed practice team bios. No age limits, consent rules, availability, or coverage are assumed. Local noindex draft for practice review.

## Separate family service pages
The combined Children & Families draft is retired. /child-teen-counseling-tyler/, /family-counseling-tyler/, and /parenting-support-tyler/ each have distinct content, providers, FAQs, and booking links. The homepage family card and menus link to them. Old /children-families/ preview bookmarks return to the homepage choices. Provider summaries use the previously reviewed practice bios.
`n## Therapist dropdown`nAll seven active pages now share a horizontal therapist carousel with five existing portraits, profile links, arrow controls, touch/trackpad scrolling, keyboard support, and reduced-motion handling. Additional team members remain accessible through View All Therapists.
Therapist carousel expanded to all ten clinicians listed on the current practice team page, including supervised credentials where stated. Office manager is not labeled as a therapist.

## Anxiety specialty page
/anxiety-counseling-tyler/ is connected from the homepage, shared menus, and Individual Counseling. Unique title, description, anxiety content, FAQs, and Erin/Jill profiles based on the practice team page reviewed September 12, 2026. Noindex local draft for practice review before launch.

## Depression specialty page
/depression-counseling-tyler/ has unique content, metadata, Jennifer/Denise profiles, practical FAQs, and booking links. Connected from homepage, all menus, Individual Counseling, and Anxiety Counseling. Provider summaries use reviewed practice bios; general depression explanation links to NIMH. Local noindex draft pending practice review.

## Trauma and EMDR pages
/trauma-therapy-tyler/ and /emdr-therapy-tyler/ distinguish a concern from an approach, cross-link, and replace relevant menu/homepage preview links. Erin and Sarah Bell profiles use the reviewed practice team information, including Sarah’s supervision. General explanations use NIMH PTSD and VA National Center for PTSD EMDR guidance. Clinical copy remains a noindex local draft for practice review.

## Grief and life transitions pages
/grief-counseling-tyler/ and /life-transitions-counseling-tyler/ provide separate content for bereavement and adjustment to change. Both have unique metadata, counselor profiles based on the reviewed practice bios, FAQs, related service links, and contact CTAs. Connected from shared menus, homepage, and Individual Counseling. Desktop and 390px mobile layouts, FAQ expansion, cross-page navigation, and appointment destination checked. Local noindex drafts pending practice review.


## Premarital and blended family pages
/premarital-counseling-tyler/ and /divorce-blended-family-counseling-tyler/ have distinct content, metadata, counselor profiles, FAQs, and contact CTAs. Homepage preview links and shared premarital navigation now route to the pages; marriage and family pages include related links. Provider summaries sourced from https://www.thebridgetherapy.com/meet-the-team on September 12, 2026. Prepare Enrich availability remains to be confirmed with the office. Verified responsive layouts, FAQ controls, cross-page navigation, and contact destination. Local noindex drafts pending practice review.


## Pregnancy/postpartum and ADHD pages
/pregnancy-postpartum-counseling-tyler/ and /adhd-counseling-tyler/ include unique metadata, content, FAQs, related services, and contact CTAs. Homepage and shared menu preview links now resolve to these pages. Individual Counseling links to both; Parenting Support and Child & Teen link to ADHD; Life Transitions links to pregnancy/postpartum.
The practice homepage lists pregnancy/postpartum but the team bios do not identify a specific provider. Confirm provider, training, scope, and availability before launch; this page uses office matching instead of assigning a clinician. ADHD profiles feature Erin Young and Sarah Bell with her supervised credential. Sources reviewed September 12, 2026: https://www.thebridgetherapy.com/ and /meet-the-team; NIMH perinatal depression and ADHD pages linked in FAQs. Counseling is distinguished from testing and prescribing. Desktop/mobile layouts, FAQs, incoming links, and appointment destination checked; JavaScript check passed. Both remain noindex local drafts.


## Adoption and Christian counseling pages
/adoption-counseling-tyler/ and /christian-counseling-tyler/ include distinct content, metadata, counselor profiles, FAQs, related services, and contact CTAs. Adoption preview links now open its page; family, parenting, and child/teen pages link to it. Christian Counseling is connected through shared navigation and Individual/Marriage Counseling. Sources reviewed September 12, 2026: https://www.thebridgetherapy.com/meet-the-team and https://www.thebridgetherapy.com/what-we-believe. Erin has professional adoption/foster-care experience; Kim's personal foster-parent background is distinguished from her clinical work and her supervision is listed. Christian content summarizes the stated faith perspective without promising specific session practices or outcomes. Confirm final scope, availability, and clinical copy before launch. Desktop/mobile layouts, FAQs, incoming navigation, and contact destination checked; JavaScript check passed. Pages remain noindex local drafts.


## Homepage contrast and motion — September 13, 2026
Added homepage-only homepage-design.css and homepage-motion.js. Coral service band, dark teal Why The Bridge band with light text, cream therapist band, and stronger mint Getting Started band distinguish sections. Below-fold headings, copy groups, cards, and final CTAs rise/fade once on entry. Initial hero remains visible; reduced-motion and print disable animation, keyboard focus reveals targets, and no-JS content remains visible. Desktop/mobile layouts and reveal behavior checked; JavaScript syntax checks passed. Reference: https://friscocounselingandwellness.com/ uses fadeInUp entrances. Existing wording and service pages preserved.


Photo hero: replaced overlapping homepage founder portraits with a full-width generated woodland/footbridge image, warm gradient overlay, existing copy and CTAs. Founder image remains in Why The Bridge. Responsive crop and overlay, decorative empty alt, high-priority JPEG. Asset and full prompt documented in PHOTO-CREDITS.md.


Staff hero draft: replaced woodland-only hero with eleven-person AI composite based on ten therapist portraits plus Kalynne. Desktop text stays left of faces; mobile displays full group beneath copy within the hero. Verified desktop and 390px mobile layout with no horizontal overflow. Source woodland asset preserved. Review likenesses before launch.


Reference palette — September 13, 2026: sampled supplied Desktop/2323232.png at solid card interiors: terracotta #D97B66, blue #264E76, teal #3D7C7C. Shared reference-palette.css loads last across all local pages. Cream surfaces, blue main headings/footer/logo plaque, teal secondary accents, terracotta frames and deeper terracotta CTA gradients for white lettering. Getting Started cards use three reference colors, dark text on terracotta and white on blue/teal. Favicon background matches blue. Slow 1.4s reveal preserved.


### Visual polish — September 13, 2026
- Shared `public/polish.css` is loaded after the existing brand styles across all active pages. It refines heading scale, reading widths, section spacing, cards, CTAs, contact details, FAQs, and navigation without new dependencies.
- The homepage hero is more compact; tablet service heroes stack sooner. The mobile header fits at 320px, and the chat launcher becomes a compact icon and hides while the mobile menu or dialog is open.
- Mobile navigation closes on outside click and resets when crossing the desktop breakpoint. Existing slow scroll reveals, hover lifts, phone/email contact flow, content, and blue buttons with white lettering remain.
- Verified all 19 active pages at 390px, 768px, and 1280px for horizontal overflow and broken images; visually reviewed main page layouts and checked the 320px homepage header. Checked therapist carousel (10 profiles), mobile menu/Escape, keyboard focus, specialty disclosure, FAQ, chat preview dismissal, and appointment navigation.
- `npm run check` validates both browser scripts and checks all 20 HTML documents (including the retired redirect) for local links/assets/anchors, duplicate IDs, main headings, and the shared stylesheet.
- Existing launch work remains: chatbot implementation, staff/clinical review, and approval of the generated staff hero image. Preview remains noindex.

Hero update: Replaced the rejected generated group photo with a responsive gallery of all 11 original staff portraits. Desktop uses text beside the gallery; mobile stacks the text and booking CTA above it. Verified all portraits load and mobile has no horizontal overflow. Generated staff-image approval is no longer a launch requirement for the active homepage.

September 14 redesign: The active design now follows the supplied ivory/forest-green reference. See IVORY-DESIGN.md for current layout, asset prompts, preserved routes and validation. Previous hero directions in earlier notes are superseded.
