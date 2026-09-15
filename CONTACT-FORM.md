# Contact inquiry: Netlify Forms

The existing Contact UI submits a URL-encoded AJAX POST to `/__forms.html`. Netlify detects the hidden definition in `public/__forms.html` during deployment and processes submissions. No custom email API, database, email SDK, secret environment variables, or sender-domain DNS setup is required.

Form name: `bridge-contact-inquiry`.

Fields: `first_name`, `last_name`, `email`, `phone`, `preferred_therapist`, `message`. Transport also includes `form-name` and the empty `bot-field` honeypot. No source URL, query string, browser/debug data or extra intake fields are collected. Preferred therapist stores the allowlisted slug (or an empty value for help choosing); all ten profile query parameters continue to preselect the editable dropdown.

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
