"use client";
import { useState } from "react";
import styles from "./analytics-preferences-preview.module.css";

// Design preview only. No provider import, script, network, cookie or storage access.
export function AnalyticsPreferencesPreview() {
  const [enabled, setEnabled] = useState(true);
  return <details className={styles.preferences}>
    <summary>Analytics preferences</summary>
    <section className={styles.panel} aria-labelledby="analytics-choice-title">
      <h2 id="analytics-choice-title">Website analytics</h2>
      <p>We use Google Analytics cookies to understand website traffic. Turn it off below.</p>
      <p><a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Privacy details</a></p>
      <div className={styles.actions}>
        <button onClick={() => setEnabled(false)}>Turn off analytics</button>
        <button onClick={() => setEnabled(true)}>Turn on analytics</button>
      </div>
      <p className={styles.status} role="status">Preview only: {enabled ? "on" : "off"}. No tracking.</p>

    </section>
  </details>;
}
