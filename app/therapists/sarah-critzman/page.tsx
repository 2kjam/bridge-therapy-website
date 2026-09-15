import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Sarah Critzman, LMSW | Tyler, TX | The Bridge",
  description:
    "Meet Sarah Critzman, LMSW, at The Bridge in Tyler, Texas. She works with children, teens, and young women and brings a background in Deaf Education.",
};

export default function SarahCritzmanPage() {
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
            <li aria-current="page">Sarah Critzman</li>
          </ol>
        </nav>
        <section
          className="profile-intro"
          aria-labelledby="sarah-critzman-title"
        >
          <img
            src="/assets/sarah-critzman.jpg"
            alt="Sarah Critzman, LMSW"
            width={500}
            height={750}
            fetchPriority="high"
          />
          <div>
            <p className="eyebrow">THE BRIDGE · TYLER, TEXAS</p>
            <h1 id="sarah-critzman-title">Sarah Critzman, LMSW</h1>
            <p className="profile-credential">Licensed Master Social Worker</p>
            <p className="profile-role">Supervised by Christi Lawson, LCSW-S</p>
            <h2>About Sarah</h2>
            <p>
              Sarah works with children, teens, and young women. Her
              compassionate, collaborative style makes room for you to be
              yourself, with support shaped around your individual needs.
            </p>
            <p>
              She believes a trusting counseling relationship is the starting
              point for meaningful change. Her Christian perspective includes a
              hope for growth rooted in grace.
            </p>
            <a className="button" href="/contact/">
              Ask About Working With Sarah
            </a>
            <p className="profile-inquiry">
              Contact our office about Sarah Critzman. This is an inquiry, not a
              confirmed appointment.
            </p>
          </div>
        </section>
        <div className="profile-details">
          <section aria-labelledby="sarah-critzman-focus">
            <h2 id="sarah-critzman-focus">Areas of Focus</h2>
            <p>Sarah’s counseling experience includes support with:</p>
            <ul className="profile-focus">
              <li>Anxiety</li>
              <li>Trauma</li>
              <li>Grief</li>
              <li>Understanding and managing emotions</li>
              <li>Life transitions</li>
              <li>Relationship concerns</li>
            </ul>
          </section>
          <section aria-labelledby="sarah-critzman-deaf-community">
            <h2 id="sarah-critzman-deaf-community">
              Deaf Education &amp; Community
            </h2>
            <p>
              Sarah is fluent in American Sign Language (ASL) and is committed
              to increasing access to mental health care for the Deaf community.
              She spent five years teaching in Deaf Education, an experience
              that continues to shape her work with clients.
            </p>
            <p>
              Contact the office to discuss your communication needs and whether
              working with Sarah Critzman may be a fit.
            </p>
          </section>
          <section aria-labelledby="sarah-critzman-play">
            <h2 id="sarah-critzman-play">Play Therapy</h2>
            <p>Play therapy is one of Sarah’s areas of work. Contact the office to discuss whether this support may fit your child’s needs.</p>
          </section>
          <section aria-labelledby="sarah-critzman-background">
            <h2 id="sarah-critzman-background">Professional Background</h2>
            <ul>
              <li>
                Bachelor’s degree in Deaf Education, Stephen F. Austin State
                University
              </li>
              <li>
                Master’s degree in Social Work, University of Texas at Arlington
              </li>
            </ul>
          </section>
        </div>
        <section
          className="profile-contact"
          aria-labelledby="sarah-critzman-contact"
        >
          <h2 id="sarah-critzman-contact">Ask About Working With Sarah</h2>
          <p>
            Tell our office you’re interested in working with Sarah Critzman. We
            can discuss your questions, your concerns, and the next steps for an
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
