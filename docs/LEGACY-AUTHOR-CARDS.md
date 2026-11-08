# Legacy author-card audit

Publication scope: 19 existing live legacy articles. Existing bylines remain authoritative; no attribution is inferred from article subjects, photos, quotations, or body signatures.

- Legacy cards added: 15 Jennifer Wood, LPC-S; 4 Erin Young, LCSW-S.
- Two native Jennifer cards remain unchanged, for 17 Jennifer / 4 Erin cards overall.
- The organization-authored website announcement keeps its team byline and no therapist card.
- No ambiguous primary bylines were found among the 19 existing records.
- Big News! keeps its verified Jennifer primary byline; its historical joint body signature does not create a new coauthor attribution.
- Unknown, combined, mismatched or missing attribution, organization authors, and drafts do not receive a guessed card.
- Credentials, roles, portraits and profile destinations come from existing verified profile records. No clinical-review claim or new qualification is added.
- Existing article bodies, dates, byline prefixes, metadata, schema and source snapshots are untouched.

Evidence: [existing author-link audit](../content/blog/AUTHOR-LINK-AUDIT.md), current article metadata, and verified therapist records in lib/seo/schema-data.ts.

| Article | Existing byline | Card profile | Evidence |
|---|---|---|---|
| [Online Couples Counseling: How It Works and What to Expect](/blog/online-couples-counseling/) | Jennifer Wood LPC-S | /therapists/jennifer-wood/ | Previously approved native article byline |
| [Religious Trauma Therapy: How Healing Works and What to Expect](/blog/religious-trauma-therapy/) | Jennifer Wood LPC-S | /therapists/jennifer-wood/ | Previously approved native article byline |
| [Welcome to Our New Website!](/blog/welcome-to-our-new-website/) | The Bridge Therapeutic Services Team | None — organization/team | Previously approved native article byline |
| [How to Calm an Anxious Mind: Learning to Quiet Your Soul with God](/news/2026/8/21/how-to-calm-an-anxious-mind-learning-to-quiet-your-soul-with-god) | Jennifer Wood, LPC-S | /therapists/jennifer-wood/ | Captured item author and source-page byline in AUTHOR-LINK-AUDIT.md |
| [Anxiety Therapy vs Medication: What’s the Difference?](/news/2026/1/19/anxiety-therapy-vs-medication-whats-the-difference) | Jennifer Wood, LPC-S | /therapists/jennifer-wood/ | Captured item author and source-page byline in AUTHOR-LINK-AUDIT.md |
| [What Is Anxiety Therapy?](/news/2026/1/19/what-is-anxiety-therapy) | Jennifer Wood, LPC-S | /therapists/jennifer-wood/ | Captured item author and source-page byline in AUTHOR-LINK-AUDIT.md |
| [Anxiety Therapy in Tyler, TX](/news/2026/1/19/anxiety-therapy-in-tyler-tx) | Jennifer Wood, LPC-S | /therapists/jennifer-wood/ | Captured item author and source-page byline in AUTHOR-LINK-AUDIT.md |
| [Can EMDR Be Integrated with Christian Counseling?](/news/2026/1/19/can-emdr-be-integrated-with-christian-counseling) | Jennifer Wood, LPC-S | /therapists/jennifer-wood/ | Captured item author and source-page byline in AUTHOR-LINK-AUDIT.md |
| [EMDR Therapy for Anxiety, Panic, and Trauma Responses](/news/2026/1/19/emdr-therapy-for-anxiety-panic-and-trauma-responses) | Jennifer Wood, LPC-S | /therapists/jennifer-wood/ | Captured item author and source-page byline in AUTHOR-LINK-AUDIT.md |
| [Is EMDR Therapy Safe and Effective?](/news/2026/1/18/is-emdr-therapy-safe-and-effective) | Jennifer Wood, LPC-S | /therapists/jennifer-wood/ | Captured item author and source-page byline in AUTHOR-LINK-AUDIT.md |
| [What to Expect in EMDR Therapy Sessions](/news/2026/1/18/what-to-expect-in-emdr-therapy-sessions) | Jennifer Wood, LPC-S | /therapists/jennifer-wood/ | Captured item author and source-page byline in AUTHOR-LINK-AUDIT.md |
| [How EMDR Therapy Helps Heal Trauma and PTSD](/news/2026/1/18/how-emdr-therapy-helps-heal-trauma-and-ptsd) | Jennifer Wood, LPC-S | /therapists/jennifer-wood/ | Captured item author and source-page byline in AUTHOR-LINK-AUDIT.md |
| [What Is EMDR Therapy and How Does It Work?](/news/2026/1/18/what-is-emdr-therapy-and-how-does-it-work) | Jennifer Wood, LPC-S | /therapists/jennifer-wood/ | Captured item author and source-page byline in AUTHOR-LINK-AUDIT.md |
| [EMDR Therapy for Trauma and PTSD in Tyler, TX](/news/2026/1/18/emdr-therapy-for-trauma-and-ptsd-in-tyler-tx) | Jennifer Wood, LPC-S | /therapists/jennifer-wood/ | Captured item author and source-page byline in AUTHOR-LINK-AUDIT.md |
| [Navigating Life Transitions: How Counseling Can Guide You Through Change](/news/navigating-life-transitions) | Jennifer Wood, LPC-S | /therapists/jennifer-wood/ | Captured item author and source-page byline in AUTHOR-LINK-AUDIT.md |
| [Screen Time Recommendations for Children](/news/2021/12/8/screen-time-recommendations) | Jennifer Wood, LPC-S | /therapists/jennifer-wood/ | Captured item author and source-page byline in AUTHOR-LINK-AUDIT.md |
| [The Bridge Community Spotlight featuring Beth Reed with Sight.org](/news/2021/4/11/the-bridge-community-spotlight-featuring-beth-reed-with-sightorg) | Erin Young, LCSW-S | /therapists/erin-young/ | Existing owner-confirmed byline in AUTHOR-LINK-AUDIT.md |
| [Simple Ways to Lower Stress During the Holidays](/news/2019/11/30/simple-ways-to-lower-stress-during-the-holidays) | Erin Young, LCSW-S | /therapists/erin-young/ | Existing owner-confirmed byline in AUTHOR-LINK-AUDIT.md |
| [Storm Anxiety](/news/2019/5/21/storm-anxiety) | Erin Young, LCSW-S | /therapists/erin-young/ | Existing owner-confirmed byline in AUTHOR-LINK-AUDIT.md |
| [Take heart, and be courageous, because He has overcome the world.](/news/take-heart) | Jennifer Wood, LPC-S | /therapists/jennifer-wood/ | Captured item author and source-page byline in AUTHOR-LINK-AUDIT.md |
| [Traumatic Memories and Treatment](/news/2019/2/3/traumatic-memories-and-treatment) | Erin Young, LCSW-S | /therapists/erin-young/ | Existing owner-confirmed byline in AUTHOR-LINK-AUDIT.md |
| [Big News!](/news/2019/1/2/big-news) | Jennifer Wood, LPC-S | /therapists/jennifer-wood/ | Captured item author and source-page byline in AUTHOR-LINK-AUDIT.md |

Validation: Next.js build, type/site checks for 76 pages, lint, and 59 node blog/card/schema tests pass. All 57 existing schemas are byte-equivalent; removing only the new card reproduces all 19 legacy main regions exactly, and the other 38 page main regions are unchanged. Native future-author coverage remains intact. Live browser verification follows release; this environment cannot launch the automated Chromium suite.
