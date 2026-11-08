import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { AnalyticsPrivacyControls } from "@/components/analytics-privacy-controls";

export const metadata: Metadata = {
  title: "Website Privacy | The Bridge Therapeutic Services",
  description: "How The Bridge uses website analytics and how to turn analytics off.",
  alternates: { canonical: "https://www.thebridgetherapy.com/privacy/" },
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return <SiteShell styles={["/style.css", "/homepage-ending.css", "/typography.css", "/team-menu.css", "/reference-palette.css", "/polish.css", "/ivory-design.css", "/privacy.css"]}>
    <main id="main" className="privacy-page">
      <h1>Website privacy</h1>
      <p>We use Google Analytics cookies to understand website traffic.</p>
      <h2>Website analytics</h2>
      <p>Google receives connection and device information, including your IP address, and pseudonymous cookie identifiers. Analytics cookies last up to 90 days. Advertising features are disabled.</p>
      <p>Analytics is configured to exclude detailed page addresses, URL parameters, external referrers, and form or chat contents. Page views use the website’s home address and business name. We do not configure customer names, email addresses or custom user IDs for analytics.</p>
      <p><a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">How Google collects and uses information</a></p>
      <h2>Your analytics choice</h2>
      <p>You can turn analytics off for this browser. We preserve saved opt-outs and honor Global Privacy Control and Do Not Track. Your choice is saved on this device; clearing browser storage removes that saved choice.</p>
      <AnalyticsPrivacyControls />
      <h2>Contacting us</h2>
      <p>For questions about website privacy, contact <a href="mailto:info@thebridgetherapy.com">info@thebridgetherapy.com</a> or <a href="tel:9032838729">(903) 283-8729</a>. Please avoid sending sensitive personal or medical information through the website’s contact form or chat.</p>
    </main>
  </SiteShell>;
}
