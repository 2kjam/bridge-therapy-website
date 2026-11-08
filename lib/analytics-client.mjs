import { measurementId, productionOrigin, tagSource, deniedConsent, measurementConsent, safePageView, analyticsConfiguration } from './analytics-policy.mjs';
// No DOM listeners or value extraction. The GA property must have Enhanced
// Measurement disabled before activation; send_page_view alone is insufficient.
export function createAnalyticsController(win, doc) {
  let initialized = false;
  let previousPath;
  function pageview(pathname) {
    if (win.location.origin !== productionOrigin) return;
    win[`ga-disable-${measurementId}`] = false;
    if (!initialized) {
      win.dataLayer = win.dataLayer || [];
      win.gtag = function () { win.dataLayer.push(arguments); };
      win.gtag('consent', 'default', { ...measurementConsent });
      win.gtag('set', { ...safePageView(), ads_data_redaction: true, url_passthrough: false, allow_google_signals: false, allow_ad_personalization_signals: false, allow_interest_groups: false });
      win.gtag('js', new Date());
      win.gtag('config', measurementId, analyticsConfiguration());
      const script = doc.createElement('script');
      script.id = 'bridge-ga4-loader'; script.async = true; script.referrerPolicy = 'no-referrer'; script.src = tagSource;
      doc.head.appendChild(script);
      initialized = true;
    }
    win.gtag('consent', 'update', { ...measurementConsent });
    if (pathname === previousPath) return;
    previousPath = pathname; // Local deduplication only; never sent to Google.
    win.gtag('event', 'page_view', { send_to: measurementId, ...safePageView() });
  }
  function stop() {
    win[`ga-disable-${measurementId}`] = true;
    if (initialized) win.gtag('consent', 'update', { ...deniedConsent });
    previousPath = undefined;
    // Delete only GA's two known cookie names, without reading their values.
    for (const name of ['_ga', '_ga_61RSPK36Y0']) for (const domain of ['', '; Domain=www.thebridgetherapy.com', '; Domain=thebridgetherapy.com']) {
      doc.cookie = `${name}=; Max-Age=0; Path=/; Secure; SameSite=Lax${domain}`;
    }
  }
  return { pageview, stop };
}
