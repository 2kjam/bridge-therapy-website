import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  googleTagEnabled,
  GOOGLE_TAG_INITIALIZATION,
  GOOGLE_TAG_MANAGER_SRC,
} from "../lib/google-tag.mjs";

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
      <head>
        {googleTagEnabled(process.env) && (
          <>
            <script
              id="bridge-google-tag-init"
              dangerouslySetInnerHTML={{ __html: GOOGLE_TAG_INITIALIZATION }}
            />
            <script async src={GOOGLE_TAG_MANAGER_SRC} />
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
