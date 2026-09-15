import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Sarah Bell, LPC-A | Tyler, TX | The Bridge",
  description:
    "Meet Sarah Bell, LPC-A, at The Bridge in Tyler, Texas. She works with individuals and couples ages 13 and up and is trained in EMDR.",
};

const services = [
  ["Trauma Therapy", "/trauma-therapy-tyler/"],
  ["EMDR Therapy", "/emdr-therapy-tyler/"],
  ["ADHD Counseling", "/adhd-counseling-tyler/"],
];

export default function SarahBellPage() {
  return (
    <SiteShell
      styles={[
        "/style.css",
        "/homepage-ending.css",
        "/typography.css",
        "/team-menu.css",
        "/reference-palette.css",
        "/polish.css",
        "/ivory-design.css",
        "/therapist-profile.css",
      ]}
    >
      <main id="main" className="therapist-profile">
        <nav className="profile-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/therapists/">Therapists</a>
            </li>
            <li aria-current="page">Sarah Bell</li>
          </ol>
        </nav>
        <section className="profile-intro" aria-labelledby="sarah-bell-title">
          <img
            src="/assets/sarah-bell.jpg"
            alt="Sarah Bell, LPC-A"
            width={500}
            height={750}
            fetchPriority="high"
          />
          <div>
            <p className="eyebrow">THE BRIDGE · TYLER, TEXAS</p>
            <h1 id="sarah-bell-title">Sarah Bell, LPC-A</h1>
            <p className="profile-credential">
              Licensed Professional Counselor Associate
            </p>
            <p className="profile-role">Supervised by Whitney Briggs, LPC-S</p>
            <h2>About Sarah</h2>
            <p>
              Sarah works with individuals and couples ages 13 and up. She
              believes you should have a space to share without fear of judgment
              or shame, and offers support as you seek mental wellness.
            </p>
            <p>
              Her Christian perspective is reflected in Proverbs 20:5, a passage
              about the depth of a person’s heart and the value of
              understanding.
            </p>
            <a className="button" href="/contact/">
              Ask About Working With Sarah
            </a>
            <p className="profile-inquiry">
              Contacting our office is an inquiry, not a confirmed appointment.
            </p>
          </div>
        </section>
        <div className="profile-details">
          <section aria-labelledby="sarah-bell-focus">
            <h2 id="sarah-bell-focus">Areas of Focus</h2>
            <p>Sarah’s counseling experience includes support with:</p>
            <ul className="profile-focus">
              <li>Anxiety and depression</li>
              <li>Self-harm and thoughts of suicide</li>
              <li>Trauma</li>
              <li>Relationship concerns</li>
              <li>ADHD-related concerns</li>
            </ul>
          </section>
          <section aria-labelledby="sarah-bell-background">
            <h2 id="sarah-bell-background">
              Training &amp; Professional Background
            </h2>
            <p>Sarah is trained in EMDR.</p>
            <ul>
              <li>
                Bachelor’s degree in Psychology, East Texas Baptist University
              </li>
              <li>
                Master’s degree in Clinical Mental Health Counseling, Tarleton
                State University
              </li>
            </ul>
          </section>
          <section aria-labelledby="sarah-bell-services">
            <h2 id="sarah-bell-services">Relevant Services</h2>
            <p>
              Learn more about these counseling services as you consider the
              support you’re seeking.
            </p>
            <ul className="profile-services">
              {services.map(([label, href]) => (
                <li key={href}>
                  <a href={href}>
                    {label}
                    <span aria-hidden="true"> →</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <section
          className="profile-contact"
          aria-labelledby="sarah-bell-contact"
        >
          <h2 id="sarah-bell-contact">Ask About Working With Sarah</h2>
          <p>
            Tell our office you’re interested in working with Sarah. We can
            discuss your questions, your concerns, and the next steps for an
            appointment inquiry.
          </p>
          <a className="button" href="/contact/">
            Contact Our Office
          </a>
          <p className="profile-inquiry">
            An inquiry does not confirm a booking.
          </p>
          <a href="/therapists/">Back to all therapists</a>
        </section>
      </main>
    </SiteShell>
  );
}
