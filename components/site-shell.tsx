import type { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { PageStyles } from "./page-styles";
import { SiteProvider } from "./site-interactions";

export function SiteShell({
  children,
  styles,
  footerId = "location",
}: {
  children: ReactNode;
  styles: readonly string[];
  footerId?: string;
}) {
  return (
    <>
      <PageStyles files={styles} />
      <SiteProvider>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer id={footerId} />
      </SiteProvider>
    </>
  );
}
