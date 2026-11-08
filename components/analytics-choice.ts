"use client";
import { useSyncExternalStore } from "react";

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
const serverChoice = () => "pending";
export function useAnalyticsChoice() {
  return useSyncExternalStore(subscribe, readChoice, serverChoice);
}
export function saveAnalyticsChoice(value: "granted" | "denied") {
  try { localStorage.setItem(key, value); } catch { /* readChoice fails closed. */ }
  window.dispatchEvent(new Event(changeEvent));
}
