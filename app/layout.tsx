import { AnalyticsTracker } from "@/components/analytics-tracker";
import { publicContentUrls } from "@/lib/seo/inventory";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "The Bridge Therapeutic Services",
  // Fail closed for unknown/utility routes. Reviewed pages override this explicitly.
  robots: { index: false, follow: false },
  icons: {
    icon: [
      {
        url: "/assets/ivory-favicon.png",
        type: "image/png",
        sizes: "96x96",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}{process.env.BRIDGE_BUILD_ANALYTICS === "true" && <AnalyticsTracker allowedPaths={[...publicContentUrls().map(url => new URL(url).pathname), "/privacy/"]} />}</body>
    </html>
  );
}
