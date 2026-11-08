// Public configuration. GA4 measurement IDs and GTM container IDs are different.
export const measurementId = 'G-61RSPK36Y0';
export const productionOrigin = 'https://www.thebridgetherapy.com';
export const tagSource = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
// Approved production setup; Enhanced Measurement is disabled in the verified stream.
export const analyticsReleaseApproved = true;
export function analyticsBuildAllowed(env, phase, approved = analyticsReleaseApproved) {
  return approved && ['phase-production-build','phase-production-server'].includes(phase) &&
    env.NETLIFY === 'true' && env.NODE_ENV === 'production' && env.CONTEXT === 'production' &&
    env.SITE_ID === '1c0ce777-b889-4f6b-8292-ef7590a4a25e' && env.BRANCH === 'main' &&
    env.URL === productionOrigin && !env.NETLIFY_PREVIEW_SERVER && !env.REVIEW_ID && env.PULL_REQUEST !== 'true';
}
// Aggregate visits only: never expose treatment/article topics, search/hash,
// campaign parameters, document title, external referrers or form/chat content.
export function safePageView() {
  return { page_location: productionOrigin + '/', page_title: 'The Bridge Therapeutic Services', page_referrer: '', content_group: 'Website' };
}
export function analyticsConfiguration() {
  return {
    ...safePageView(), send_page_view: false, allow_google_signals: false,
    allow_ad_personalization_signals: false, allow_interest_groups: false,
    ignore_referrer: true, cookie_expires: 60 * 60 * 24 * 90, cookie_update: false,
    campaign_id: '', campaign_source: '', campaign_medium: '', campaign_name: '', campaign_term: '', campaign_content: '',
  };
}
export const deniedConsent = { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };

// Site-owner configuration, not an assertion of visitor consent. Preserve any
// existing opt-out and wait until the saved preference has been read.
export const measurementConsent = { ...deniedConsent, analytics_storage: 'granted' };
export function analyticsEnabledForChoice(choice) {
  return choice === 'unknown' || choice === 'granted';
}
