import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Kalynne Arrick, Office Manager | The Bridge",
  description: "Meet Kalynne Arrick, Office Manager at The Bridge Therapeutic Services in Tyler, Texas.",
};

export default function KalynneArrickPage() {
  return (
    <SiteShell styles={["/style.css", "/homepage-ending.css", "/typography.css", "/team-menu.css", "/reference-palette.css", "/polish.css", "/ivory-design.css", "/therapist-profile.css"]}>
      <main id="main" className="staff-profile">
        <nav className="profile-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li>
            <li><a href="/contact/">Contact</a></li>
            <li aria-current="page">Kalynne Arrick</li>
          </ol>
        </nav>
        <section className="profile-intro" aria-labelledby="kalynne-title">
          <img src="/assets/kalynne.jpg" width="2500" height="3750" alt="Portrait of Kalynne Arrick" />
          <div>
            <h1 id="kalynne-title">Kalynne Arrick</h1>
            <p className="profile-credential">Office Manager</p>
            <h2>About Kalynne</h2>
            <p>Kalynne Arrick is the Office Manager at The Bridge. Her background as a photography business owner has shaped her appreciation for listening, building trust, and helping people feel valued.</p>
            <p>She earned a bachelor’s degree in Business Administration from LeTourneau University in 2012.</p>
            <a className="button" href="/contact/">Contact The Bridge</a>
          </div>
        </section>
        <section className="profile-contact" aria-labelledby="staff-contact-title">
          <h2 id="staff-contact-title">Getting started at The Bridge</h2>
          <p>Contact our office with questions about getting started.</p>
          <a className="button" href="/contact/">Contact The Bridge</a>
        </section>
      </main>
    </SiteShell>
  );
}
