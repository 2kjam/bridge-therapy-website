import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Alyxandrah White, LMFT | Tyler, TX | The Bridge",
  description:
    "Meet Alyxandrah “Alyx” White, LMFT, at The Bridge in Tyler, Texas. Her experience includes couples, family communication, co-parenting, and life changes.",
};

const services = [
  ["Marriage Counseling", "/marriage-counseling-tyler/"],
  ["Family Counseling", "/family-counseling-tyler/"],
  ["Parenting Support", "/parenting-support-tyler/"],
  ["Premarital Counseling", "/premarital-counseling-tyler/"],
  [
    "Divorce & Blended Family Counseling",
    "/divorce-blended-family-counseling-tyler/",
  ],
];

export default function AlyxandrahWhitePage() {
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
            <li aria-current="page">Alyxandrah White</li>
          </ol>
        </nav>
        <section className="profile-intro" aria-labelledby="alyx-title">
          <img
            src="/assets/alyx.jpg"
            alt="Alyxandrah “Alyx” White, LMFT"
            width={750}
            height={1125}
            fetchPriority="high"
          />
          <div>
            <p className="eyebrow">THE BRIDGE · TYLER, TEXAS</p>
            <h1 id="alyx-title">Alyxandrah “Alyx” White, LMFT</h1>
            <p className="profile-credential">
              Licensed Marriage and Family Therapist
            </p>
            <p className="profile-role">LMFT, C-DBT</p>
            <h2>About Alyx</h2>
            <p>
              Alyx works with couples, families, co-parents, and parent-child
              pairs, as well as individual adolescents and adults.
            </p>
            <p>
              Her experience includes helping people with communication,
              conflict, and estrangement in families. If changes in your
              relationships are part of what brings you to counseling, our
              office can help you consider whether working with Alyx may be a
              fit.
            </p>
            <a className="button" href="/contact/">
              Ask About Working With Alyx
            </a>
            <p className="profile-inquiry">
              Contacting our office is an inquiry, not a confirmed appointment.
            </p>
          </div>
        </section>
        <div className="profile-details">
          <section aria-labelledby="alyx-focus">
            <h2 id="alyx-focus">Areas of Focus</h2>
            <p>
              Alongside her relationship and family work, Alyx has experience
              supporting people through life adjustments and post-traumatic
              stress disorder (PTSD).
            </p>
            <p>
              Her background also includes work with severe and persistent
              mental illness and emotional concerns that occur alongside
              addictive disorders. When you inquire, describe the support you’re
              seeking so the office can discuss an appropriate next step.
            </p>
          </section>
          <section aria-labelledby="alyx-background">
            <h2 id="alyx-background">Training &amp; Professional Background</h2>
            <ul>
              <li>
                Professional license: Licensed Marriage and Family Therapist
                (LMFT)
              </li>
              <li>
                Education: Degree in Marriage and Family, Oklahoma Baptist
                University
              </li>
              <li>Certificate: Dialectical Behavior Therapy (DBT)</li>
              <li>Certifications: Trauma-Focused CBT and Prepare Enrich</li>
            </ul>
          </section>
          <section aria-labelledby="alyx-faith">
            <h2 id="alyx-faith">Faith &amp; Counseling</h2>
            <p>
              Alyx’s Christian faith is part of her counseling work. She values
              being able to draw on scripture and prayer to encourage others,
              and her personal faith statement reflects finding strength in
              God’s grace.
            </p>
          </section>
          <section aria-labelledby="alyx-services">
            <h2 id="alyx-services">Relevant Services</h2>
            <p>
              Explore these services as you consider support for yourself or
              your relationships.
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
        <section className="profile-contact" aria-labelledby="alyx-contact">
          <h2 id="alyx-contact">Ask About Working With Alyx</h2>
          <p>
            Tell our office you’re interested in working with Alyx and what
            brings you to counseling. We can discuss your questions and the next
            steps for an appointment inquiry.
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
