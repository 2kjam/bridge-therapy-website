"use client";
import { useState } from "react";
import styles from "./analytics-preferences-preview.module.css";

// Design preview only. No provider import, script, network, cookie or storage access.
export function AnalyticsPreferencesPreview() {
  const [enabled, setEnabled] = useState(true);
  return <details className={styles.preferences}>
    <summary>Analytics preferences</summary>
    <section className={styles.panel} aria-labelledby="analytics-choice-title">
      <h2 id="analytics-choice-title">Optional website analytics</h2>
      <p>This website uses Google Analytics to understand general website use, with analytics cookies lasting up to 90 days. You can turn analytics off here. We exclude page topics, URL details, and form or chat contents. Advertising features are disabled. Google still receives connection information such as your IP address.</p>
      <p><a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">How Google uses data</a>. You can change your choice here at any time.</p>
      <div className={styles.actions}>
        <button onClick={() => setEnabled(false)}>Turn off analytics</button>
        <button onClick={() => setEnabled(true)}>Turn on analytics</button>
      </div>
      <p className={styles.status} role="status">Website analytics {enabled ? "on" : "off"} (preview only).</p>
      <p><strong>Staging preview:</strong> these buttons demonstrate the design only. No Google Analytics script, cookies or events are enabled here.</p>
    </section>
  </details>;
}
