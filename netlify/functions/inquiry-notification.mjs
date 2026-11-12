import { createNotifier } from '../lib/inquiry-notification.mjs';
// Netlify verifies its signed platform event before invoking this handler.
// No public HTTP handler; submissions retain the existing Netlify response.
export default { formSubmitted: createNotifier() };
