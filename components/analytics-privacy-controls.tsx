"use client";
import { analyticsEnabledForChoice } from "@/lib/analytics-policy.mjs";
import { saveAnalyticsChoice, useAnalyticsChoice } from "./analytics-choice";

export function AnalyticsPrivacyControls() {
  const choice = useAnalyticsChoice();
  return <div className="privacy-analytics-controls">
    <p role="status">{choice === "pending" ? "Checking your preference…" : analyticsEnabledForChoice(choice) ? "Website analytics is on." : "Website analytics is off."}</p>
    {choice === "blocked" && <p>Your browser’s privacy signal keeps analytics off.</p>}
    <div className="privacy-analytics-actions">
      <button onClick={() => saveAnalyticsChoice("denied")}>Turn off analytics</button>
      <button disabled={choice === "blocked" || choice === "pending"} onClick={() => saveAnalyticsChoice("granted")}>Turn on analytics</button>
    </div>
  </div>;
}
