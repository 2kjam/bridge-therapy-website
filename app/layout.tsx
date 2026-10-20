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
      <body>{children}</body>
    </html>
  );
}
