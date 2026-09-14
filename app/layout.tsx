import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "The Bridge Therapeutic Services",
  // Keep the existing preview indexing policy until a separate launch review.
  robots: { index: false, follow: false },
  icons: {
    icon: [
      {
        url: "/assets/ivory-favicon.svg?v=3",
        type: "image/svg+xml",
        sizes: "any",
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
