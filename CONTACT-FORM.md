# Contact inquiry: Netlify Forms

The full Contact form and sitewide conversational inquiry widget submit a URL-encoded AJAX POST to `/__forms.html`. Netlify detects the hidden definition in `public/__forms.html` during deployment and processes submissions. No custom email API, database, email SDK, secret environment variables, or sender-domain DNS setup is required.

Form name: `bridge-contact-inquiry`.

Fields: `first_name`, `last_name`, `email`, `phone`, `preferred_therapist`, `message`, `source_page`, `inquiry_source`. Transport also includes `form-name` and the empty `bot-field` honeypot. Source context is the pathname only, without query strings or fragments. `inquiry_source` is `contact_form` or `chat_widget`. No browser/debug data or extra intake fields are collected. Preferred therapist stores the allowlisted slug (or an empty value for help choosing); all ten profile query parameters continue to preselect the editable dropdown.

The static definition carries `data-netlify="true"` and `data-netlify-honeypot="bot-field"`. The visible form includes the same field names and honeypot, which is offscreen, excluded from keyboard navigation and hidden from assistive technology. Netlify performs spam filtering; local tests cannot establish its effectiveness. The site check enforces synchronization of both forms, their name and honeypot.

Names are required and limited to 80 characters each; email is required with basic format validation and a 254-character maximum. Phone is limited to 40 characters; message to 2,000. Therapist choices are allowlisted. These are client-side usability checks, not server-enforced validation against forged requests. Netlify is the submission backend.

Successful HTTP acceptance shows the existing success message on Contact. HTTP errors and network failures preserve entered values and show phone/email fallback. Acceptance does not prove that a notification reached the mailbox or that a submission passed spam filtering. No appointment is confirmed. The existing sensitive-health-information warning remains. The application does not log values, save them in browser storage, or put messages in URLs. Netlify stores submissions; restrict dashboard access and manage retention there.

## Manual Netlify setup (not performed yet)

1. In the correct staging project's **Forms** area, enable **form detection** before the next authorized deployment. Keep the existing Next.js build configuration and staging noindex behavior.
2. After deployment, open **Forms** and confirm `bridge-contact-inquiry` was detected. If absent, check detection settings and the deploy log, then redeploy when authorized. Do not consider the integration ready just because the page renders.
3. Open **Project configuration > Notifications > Emails and webhooks > Form submission notifications**. Add an email notification for `bridge-contact-inquiry`, set the recipient to `info@thebridgetherapy.com`, and save. Notification email has NOT been configured by this code change.
4. On the deployed staging Contact page, submit a controlled test with a monitored email address and a unique non-sensitive message such as `Staging form test <date-time>`. Verify therapist preselection, optionally change it, then submit. Use no client or health information.
5. Check the browser POST to `/__forms.html` succeeds and the Contact success state appears. Then open **Forms > bridge-contact-inquiry**, find the matching message/time and confirm all fields. If missing, inspect spam submissions and form detection. Browser success alone is insufficient proof of stored/verified submission.
6. Confirm the notification arrives at the office, including spam/junk folders, and that Reply-To contains the supplied test email. Resolve any mismatch before accepting real inquiries. Delete the synthetic test afterward as appropriate.

## Local validation

- `npm run build`, then `npm run check` and `npm run lint`.
- `node --test tests/inquiry.test.mjs` checks required fields, format, lengths and therapist allowlist.
- Run `npm run start -- --port 3011`, then `node tests/contact-inquiry.browser.mjs`. Uses installed Microsoft Edge. All POSTs are intercepted with synthetic responses; no submission or email leaves the machine. Checks all ten query selections, unknown fallback, editable selection, errors, success, payload/honeypot, FAQs, local links and 375/390/768/1440px layouts.
- Local Next.js does not process Netlify Forms. Real acceptance, storage, spam classification and notification delivery require the later authorized staging deployment and manual test above.

References: [OpenNext Forms integration](https://opennext.js.org/netlify/forms), [Netlify setup](https://docs.netlify.com/manage/forms/setup/), [notifications](https://docs.netlify.com/manage/forms/notifications/).

## Conversational inquiry widget

The widget replaces the old chat-preview launcher inside the shared SiteProvider. Specialty preview dialogs are preserved. This is a deterministic form, with no AI or live staff connection.

Flow: welcome/privacy warning -> first name -> last name -> email -> optional phone -> preferred therapist -> optional message -> review/edit -> submit -> accepted/error. It uses the same shared validator, field limits, honeypot and submission helper as Contact. Answers stay in component memory, including when closed/reopened or retrying; page navigation/reload discards them. After success only the first name remains for the thank-you. There is no saved transcript.

A small prompt appears after four seconds, without moving focus or opening the panel. One sessionStorage flag prevents repeat automatic prompts after showing, opening or dismissing it. Storage contains no answers. Manual reopening remains available. If browser storage is blocked, the widget remains usable but suppression cannot survive page navigation.

On first opening, a therapist profile pathname preselects the matching allowlisted therapist; all other paths default to help choosing. Selection remains editable. No clinical inference is made. source_page records that opening pathname only.

The panel is non-modal, keyboard accessible, returns focus to the launcher on closing, and closes with Escape while focus is inside. Each new question receives focus; submission status and errors use live regions. The panel uses dynamic viewport height, safe-area spacing and internal scrolling; it adds no motion effects.

Run node tests/inquiry-widget.browser.mjs against the same local port 3011 for controlled widget tests. All POSTs are mocked. This includes prompt timing, session dismissal, keyboard/focus, validation, all ten profile selections, editing, phone/message skips, failure/retry, payload/storage checks and responsive sizes.

The existing backend is reported proven on staging. After the next authorized deployment, confirm Netlify re-detects the additional source_page and inquiry_source fields. Send one non-sensitive widget test and one Contact test, confirm both appear under bridge-contact-inquiry with the correct source values, and verify the existing office notification still arrives. These new widget submissions and additional fields have not yet been verified on Netlify. Do not create a second form or notification if the existing one already covers this form.

## Submission comparison and false-success debugging

Current source comparison: Contact and widget both call sendInquiry in lib/inquiry.ts. Both use POST /__forms.html with application/x-www-form-urlencoded, the same form-name, URLSearchParams encoding, the same ten field names, and the same empty-field behavior. The only intended differences are entered answers, source_page (pathname), and inquiry_source (contact_form/chat_widget). Contact reads native FormData before shared validation; the widget validates in-memory answers. Both pass the validator's normalized data to the helper. Widget fields do not need to be simultaneously rendered in a native form for this AJAX request to work.

The local public/__forms.html includes every sent field. No field-definition or endpoint change was needed. This source inspection does not establish which assets or detected fields are deployed on Netlify.

The previous helper treated response.ok alone as success. It now also rejects an HTML response containing the bridge-contact-inquiry form definition, including a post-processed definition with detection attributes removed. A populated or missing honeypot fails before sending rather than being silently discarded upstream. Both forms use these guards and retain their existing error/retry behavior.

These guards detect known false-success conditions; they do NOT provide a storage receipt. An ordinary HTTP response cannot establish Netlify's spam decision, persisted submission, or notification delivery. Do not interpret the mocked HTTP-success tests as end-to-end Netlify verification. The exact cause of the reported deployed widget failure has not been established from local source alone.

For the next staging investigation (no notification changes):

1. Record the staging URL and deployed commit. Fetch /__forms.html with GET and confirm the deployed definition still lists all ten names, including source_page and inquiry_source. Also confirm Netlify detected this form on that deployment.
2. With DevTools Network open, submit one non-sensitive inquiry through Contact and one through the widget, using a monitored real email address and distinguishable messages. Avoid repeated rapid test submissions. Keep the honeypot empty.
3. Compare request URL, POST method, Content-Type, decoded fields, redirect chain, final response URL/status and response body. Do not share client contact details or a raw HAR containing personal information. Compare the widget response against GET /__forms.html; the definition being returned is not form processing.
4. Check both Verified and Spam submissions under bridge-contact-inquiry. A filled honeypot can be silently rejected without appearing in either list; inspect its request value without disabling protection. Netlify's Akismet filter is another possible cause, not a confirmed diagnosis here.
5. Match each unique message and source fields to a stored record and verify office notification receipt. A browser success alone is insufficient. If one still fails, retain only sanitized request/response evidence and the deployment identifier for diagnosis.

Reference: https://docs.netlify.com/manage/forms/spam-filters/
