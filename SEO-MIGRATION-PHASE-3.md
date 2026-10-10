# SEO Migration Phase 3: Structured Data

Prepared: October 10, 2026
Status: implemented and validated locally; not deployed

## Scope and evidence

Phase 3 adds JSON-LD to every indexable content route in the Phase 2 public-page inventory and to all 19 preserved articles. The implementation uses the production canonical origin and existing trailing-slash policy from `lib/seo/policy.ts`. It does not change indexing controls, redirects, canonicals, sitemap, robots rules, titles, headings, visible copy, service images, therapist mappings, the contact form, or the chatbot.

The facts in the graph come from the rendered site and approved repository content: the contact page for the practice identity, address, phone, email, and weekday hours; therapist profile pages for names, portraits, professional credentials, roles, and education; service-page counselor cards for provider relationships; and preserved article records for headlines, dates, images, and authors. The site does not publish Saturday or Sunday hours, so the graph does not infer them.

Implementation follows the [Next.js JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld), including escaping `<` in serialized data. Schema choices were checked against Google's [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization), [Local business](https://developers.google.com/search/docs/appearance/structured-data/local-business), [Breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb), and [structured-data policy](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) documentation, plus Schema.org's [Service](https://schema.org/Service), [provider](https://schema.org/provider), [areaServed](https://schema.org/areaServed), and [EducationalOccupationalCredential](https://schema.org/EducationalOccupationalCredential) definitions.

## Entity model

The canonical practice node is `https://www.thebridgetherapy.com/#organization`. It has both `Organization` and `LocalBusiness` types so all publisher, employer, practice, and provider relationships resolve to one identity. The generic `LocalBusiness` type is intentional: the available repository facts do not support a more specific business subtype without implying a classification that the site does not claim.

The homepage defines this practice node once with:

- The Bridge Therapeutic Services
- `https://www.thebridgetherapy.com/`
- `+1-903-283-8729`
- `info@thebridgetherapy.com`
- 3800 Paluxy Drive, Suite 240, Building 2, Tyler, TX 75703, US
- Monday through Friday, 08:00–19:00
- the existing 600 × 154 `/assets/logo.png`

The homepage also defines the canonical `WebSite` node at `https://www.thebridgetherapy.com/#website`. Child pages reference these stable IDs and do not redefine the practice. About and Contact use `AboutPage` and `ContactPage` nodes whose `mainEntity` is the practice.

No `SearchAction` is present because the site has no site search. No rating, review, price, offer, FAQ, or unsupported social-profile markup was added.

## People and staff

Ten therapist profile pages define `ProfilePage` and `Person` nodes with stable IDs, canonical URLs, existing portrait URLs, current job titles, verified professional credentials, and `worksFor` references to the practice. Erin Young and Jennifer Wood retain visible co-owner relationships in their person descriptions. Erin's University of North Texas and Temple University education is represented with `alumniOf`; training is not represented as certification.

The therapist directory is a `CollectionPage` with an `ItemList` containing exactly those ten therapists. Kalynne Arrick has a separate `ProfilePage` and `Person` node with the job title `Office Manager`; she is excluded from the therapist collection and is not described as clinical staff.

## Services

The repository contains 18 Tyler counseling service pages plus the statewide online-therapy page, for 19 `Service` nodes total. Each service uses its canonical URL, visible name, approved description, the practice as provider, and only the counselors displayed on that service page. Tyler services use `areaServed: Tyler, Texas`; online therapy uses `areaServed: Texas`.

The provider mappings are:

| Service | Counselors represented |
| --- | --- |
| ADHD Counseling & Support | Erin Young; Sarah Bell |
| Adoption & Foster Family Support | Erin Young; Kim Gonzales |
| Anxiety Counseling | Erin Young; Jill Kirkley |
| Child & Teen Counseling | Denise Santos; Kelley Bell |
| Christian Counseling | Jennifer Wood; Jill Kirkley |
| Depression Counseling | Jennifer Wood; Denise Santos |
| Divorce & Blended Family Counseling | Alyxandrah White; Jennifer Wood |
| EMDR Therapy | Erin Young; Sarah Bell |
| Family Counseling | Alyxandrah White; Jennifer Wood |
| Grief & Bereavement Counseling | Jennifer Wood; Erin Young |
| Individual Counseling | Jennifer Wood; Denise Santos |
| Life Transitions Counseling | Jill Kirkley; Denise Santos |
| Marriage & Couples Counseling | Alyxandrah White; Kelley Bell |
| Non-Epileptic Seizures Counseling Support | Erin Young only |
| Online Therapy & Telehealth Counseling | Practice only; no unverified individual mapping |
| Parenting Support | Kelley Bell; Alyxandrah White |
| Pregnancy & Postpartum Counseling | Practice only; no unverified individual mapping |
| Premarital & Marital Enrichment Counseling | Alyxandrah White; Kelley Bell |
| Trauma & PTSD Counseling | Erin Young; Sarah Bell |

The Non-Epileptic Seizures node deliberately uses counseling-support language, keeps Erin as the only individual provider, and makes no diagnostic, testing, treatment, emergency, or outcome claim.

## Articles and hierarchy

All 19 preserved article routes define a `BlogPosting` using the exact stored headline, original publication date, featured image when present, verified author identity, and the practice as publisher. No modification date was invented. The four articles attributed to Erin Young remain linked to Erin's person node; other bylines resolve to their verified therapist nodes.

Breadcrumbs reflect real routes only:

- service pages: Home → current service
- therapist profiles: Home → Our Therapists → current therapist
- articles: Home → Blog → current article
- About, Contact, Blog, staff, and directory pages use their corresponding real hierarchy

The last breadcrumb identifies the current page without an unnecessary `item` URL. No nonexistent service index or fabricated parent route is referenced.

## Safety and consistency controls

- JSON-LD serialization escapes `<`, U+2028, and U+2029 to prevent script termination or executable markup injection.
- Canonical URL generation accepts reviewed local content paths only and always emits the production HTTPS origin with trailing slashes.
- All assets use absolute production URLs.
- Focused tests parse the built HTML, require one valid JSON-LD script on every covered route, verify the stable entity IDs and relationships, and reject localhost, Netlify preview origins, unsupported ratings/reviews/prices/FAQs, and missing trailing slashes.
- The same tests confirm every rendered page remains `noindex, nofollow`, preserving the Phase 2 fail-closed state.

## Files changed for Phase 3

- `components/structured-data.tsx`
- `components/blog/article-template.tsx`
- `lib/seo/json-ld.mjs`
- `lib/seo/json-ld.d.mts`
- `lib/seo/schema-data.ts`
- `lib/seo/schema.ts`
- `tests/structured-data.test.mjs`
- `scripts/check-site.mjs`
- `package.json`
- the homepage, About, Contact, Blog, therapist directory, 10 therapist profiles, Kalynne's staff profile, and 19 service page components under `app/`

The service and profile page edits only mount the shared structured-data component. The dynamic article template mounts the corresponding article graph. Phase 1 and Phase 2 files already present in the working tree remain part of the same uncommitted launch-preparation work.

## Validation

| Check | Result |
| --- | --- |
| `npm run test:structured-data` | Pass: 8/8 focused tests across all 54 rendered content routes |
| Phase 1 + Phase 2 local HTTP suites | Pass: 10/10; 54 canonical routes, slash normalization, five confirmed redirects, unresolved 404s, all 19 articles, robots/sitemap, and alias guard |
| `tests/seo-policy.test.mjs` | Pass: 4/4 fail-closed policy and canonical-input tests |
| Article preservation suites | Pass: 24/24; all 19 bodies plus collection, source, metadata, and image-hash preservation |
| Presentation image tests | Pass: 2/2 |
| Therapist/service mappings | Pass in `npm run check` and focused schema tests; NES remains Erin only |
| `npm run check` | Pass: TypeScript plus 73 structural page records |
| `npm run lint` | Pass |
| `npm run build` | Pass: Next.js 16.3.5 compiled and generated 58 static pages |
| `git diff --check` | Pass; line-ending conversion notices only |

The navigation Playwright configuration could not complete in the tool environment. Its configured `msedge` channel initially could not locate Edge because the subprocess lacked the Windows `ProgramFiles` variable. After restoring that variable, the runner reached the tests but exceeded the tool's 120-second execution ceiling during server teardown, so no complete browser-suite pass is claimed. This was a runner/environment limitation; the route behavior is covered by the passing local HTTP suites, and the image budgets, hashes, dimensions, responsive metadata, and Grief/NES mappings are covered by the passing structural and focused Node suites. No test was weakened to hide this limitation.

No files were pushed or deployed. Production indexing and production-domain settings were not activated.
