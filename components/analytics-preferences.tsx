"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { createAnalyticsController } from "@/lib/analytics-client.mjs";
import { productionOrigin } from "@/lib/analytics-policy.mjs";
import styles from "./analytics-preferences.module.css";

const key = "bridge.analytics-choice.v1";
const changeEvent = "bridge-analytics-choice";
function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(changeEvent, listener);
  return () => { window.removeEventListener("storage", listener); window.removeEventListener(changeEvent, listener); };
}
function browserOptOut() {
  return navigator.doNotTrack === "1" || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}
function readChoice() {
  if (browserOptOut()) return "blocked";
  try { const choice = localStorage.getItem(key); return choice === "granted" || choice === "denied" ? choice : "unknown"; } catch { return "denied"; }
}
const serverChoice = () => "unknown";
export function AnalyticsPreferences({ allowedPaths }: { allowedPaths: string[] }) {
  const choice = useSyncExternalStore(subscribe, readChoice, serverChoice);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const controller = useRef<ReturnType<typeof createAnalyticsController> | null>(null);
  useEffect(() => {
    if (window.location.origin !== productionOrigin) return;
    controller.current ??= createAnalyticsController(window, document);
    if (choice === "granted" && allowedPaths.includes(pathname)) controller.current.pageview(pathname);
    else controller.current.stop();
  }, [choice, pathname, allowedPaths]);
  function choose(value: "granted" | "denied") {
    try { localStorage.setItem(key, value); } catch { controller.current?.stop(); }
    window.dispatchEvent(new Event(changeEvent)); setOpen(false);
  }
  if (choice !== "unknown" && !open) return <button className={styles.reopen} onClick={() => setOpen(true)}>Analytics preferences</button>;
  return <section className={styles.panel} aria-labelledby="analytics-choice-title">
    <h2 id="analytics-choice-title">Optional website analytics</h2>
    <p>May we use Google Analytics to understand general website use? Analytics cookies remain disabled. We exclude page topics, URL details, and form or chat contents. Advertising features are disabled. Google still receives connection information such as your IP address.</p>
    <p><a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">How Google uses data</a>. You can change your choice here at any time.</p>
    {choice === "blocked" && <p>Your browser’s privacy signal keeps optional analytics disabled.</p>}
    <div className={styles.actions}>
      <button onClick={() => choose("denied")}>Decline analytics</button>
      <button disabled={choice === "blocked"} onClick={() => choose("granted")}>Allow analytics</button>
    </div>
    {open && <button className={styles.close} onClick={() => setOpen(false)}>Close preferences</button>}
  </section>;
}
