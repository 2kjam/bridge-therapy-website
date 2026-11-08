"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { createAnalyticsController } from "@/lib/analytics-client.mjs";
import { analyticsEnabledForChoice, productionOrigin } from "@/lib/analytics-policy.mjs";
import { useAnalyticsChoice } from "./analytics-choice";

// No visible UI. The ordinary privacy page provides disclosure and choices.
export function AnalyticsTracker({ allowedPaths }: { allowedPaths: string[] }) {
  const choice = useAnalyticsChoice();
  const pathname = usePathname();
  const controller = useRef<ReturnType<typeof createAnalyticsController> | null>(null);
  useEffect(() => {
    if (window.location.origin !== productionOrigin || choice === "pending") return;
    controller.current ??= createAnalyticsController(window, document);
    if (analyticsEnabledForChoice(choice) && allowedPaths.includes(pathname)) controller.current.pageview(pathname);
    else controller.current.stop();
  }, [choice, pathname, allowedPaths]);
  return null;
}
