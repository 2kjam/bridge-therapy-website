import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { HomepageMain } from "@/components/home/homepage-main";
import { Hero } from "@/components/home/Hero";
import { InsuranceCarousel } from "@/components/insurance-carousel";
import { Services } from "@/components/home/Services";
import { Faith } from "@/components/home/Faith";
import { TherapistsAndLocation } from "@/components/home/TherapistsAndLocation";
import { NextSteps } from "@/components/home/NextSteps";
export const metadata: Metadata = {
  title: "Christian Counseling in Tyler, TX | The Bridge",
  description:
    "Meet The Bridge Therapeutic Services. Christian counseling for individuals, couples, children, and families in Tyler, Texas.",
};
export default function Page() {
  return (
    <SiteShell
      styles={[
        "/style.css",
        "/therapists.css",
        "/why-the-bridge.css",
        "/service-highlights.css",
        "/homepage-ending.css",
        "/insurance.css",
        "/typography.css",
        "/team-menu.css",
        "/homepage-design.css",
        "/reference-palette.css",
        "/polish.css",
        "/ivory-design.css",
      ]}
      footerId="location"
    >
      <HomepageMain>
        <Hero />
        <InsuranceCarousel />
        <Services />
        <Faith />
        <TherapistsAndLocation />
        <NextSteps />
      </HomepageMain>
    </SiteShell>
  );
}
