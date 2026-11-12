# Bridge inquiry notifications

The contact page and chatbot still submit to the same Netlify form, `bridge-contact-inquiry`. Netlify stores the submission before its signed `formSubmitted` event invokes the server-only Resend notifier. Recipients are never included in browser code, hidden form fields, submission requests, or success/error responses. The source label appears only at the bottom of the email.

## Configuration

In **Netlify → Project configuration → Environment variables**, set these variables with **Functions** scope on each separate staging/production project:

- `RESEND_API_KEY`: a sending key for the verified sender domain; mark secret.
- `INQUIRY_NOTIFICATION_FROM`: the verified sender, optionally `The Bridge <address@verified-domain>`.
- `INQUIRY_NOTIFICATION_TO`: comma-separated receiving addresses. No website code change is needed when recipients change.
- `INQUIRY_NOTIFICATIONS_ENABLED`: `true` to send; absent/false keeps the new delivery path disabled.
- `INQUIRY_NOTIFICATION_TEST_MODE`: `true` only during synthetic validation. It discards all visitor fields and sends a fixed synthetic notice only to the owner's test mailbox. Remove or set false for normal delivery.

Redeploy after a settings change; runtime configuration is deployed with the functions. Do not prefix these settings with `NEXT_PUBLIC_`. Never put secrets into repository files.

## Rollout and verification

1. Deploy to staging with sending disabled. Keep existing Netlify email notifications unchanged.
2. Configure the verified sender and key. Use synthetic mode for delivery validation, only after checking the existing built-in notification path will not send synthetic content to unintended recipients.
3. Verify form capture, Resend delivery, contact/chat source labels, client-side confidentiality, and retries. A local mocked provider success is not proof of delivery.
4. Set intended recipient list, turn synthetic mode off, and switch off the equivalent built-in Netlify email notification when activating Resend to prevent duplicate notifications. Do not disable Forms itself.
5. Cherry-pick only this notification patch to production after staging passes. Staging and main contain unrelated differences and must not be merged wholesale.
6. Verify production deployment and retained form capture. Failure to send email never removes a stored Netlify submission.

Retries use one stable idempotency key per submission UUID and deployment site. Provider errors are not logged or shown to visitors. A disabled notifier intentionally sends nothing.

Local checks: `node --test tests/inquiry.test.mjs tests/inquiry-notification.test.mjs`, `npm run lint`, `npm run build`, `npm run check`. Run the existing local contact/chat browser tests before release.
