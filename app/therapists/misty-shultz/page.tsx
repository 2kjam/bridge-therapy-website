import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Misty Shultz, LPC | Tyler, TX | The Bridge",
  description:
    "Meet Misty Shultz, LPC, at The Bridge in Tyler, Texas. Her Christian perspective informs support with grief, discouragement, and spiritual concerns.",
};

export default function MistyShultzPage() {
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
            <li aria-current="page">Misty Shultz</li>
          </ol>
        </nav>
        <section className="profile-intro" aria-labelledby="misty-shultz-title">
          <img
            src="/assets/misty.jpg"
            alt="Misty Shultz, LPC"
            width={500}
            height={707}
            fetchPriority="high"
          />
          <div>
            <p className="eyebrow">THE BRIDGE · TYLER, TEXAS</p>
            <h1 id="misty-shultz-title">Misty Shultz, LPC</h1>
            <p className="profile-credential">
              Licensed Professional Counselor
            </p>
            <h2>About Misty</h2>
            <p>
              Misty brings a deeply Christian perspective to counseling. Her own
              experiences of loss, grief, and illness have shaped her compassion
              for people facing difficult seasons.
            </p>
            <p>
              She hopes to help people move beyond discouragement toward a
              greater sense of purpose, joy, and peace.
            </p>
            <a className="button" href="/contact/">
              Ask About Working With Misty
            </a>
            <p className="profile-inquiry">
              Contacting our office is an inquiry, not a confirmed appointment.
            </p>
          </div>
        </section>
        <div className="profile-details">
          <section aria-labelledby="misty-shultz-focus">
            <h2 id="misty-shultz-focus">Areas of Focus</h2>
            <p>Misty’s counseling experience includes support with:</p>
            <ul className="profile-focus">
              <li>Grief and loss</li>
              <li>Trauma</li>
              <li>Discouragement and anxiety</li>
              <li>Emotional concerns related to illness</li>
              <li>Emotional wellbeing</li>
              <li>Spiritual concerns</li>
            </ul>
          </section>
          <section aria-labelledby="misty-shultz-faith">
            <h2 id="misty-shultz-faith">Faith &amp; Counseling</h2>
            <p>
              Misty sees people as whole persons whose physical experiences,
              emotions, and spiritual lives are connected. Her faith is shaped
              by biblical themes of trusting God, finding peace in Christ, and
              living with purpose.
            </p>
            <p>
              These convictions inform her desire to help people move from
              surviving to thriving. Her counseling support for emotional and
              spiritual wellbeing is not medical care.
            </p>
          </section>
          <section aria-labelledby="misty-shultz-mentoring">
            <h2 id="misty-shultz-mentoring">
              Christian Mentoring &amp; Discipleship
            </h2>
            <p>
              Misty is also a contact for Christian mentoring and discipleship
              at The Bridge. Ask the office about this support and how it
              differs from Licensed Professional Counseling.
            </p>
          </section>
          <section aria-labelledby="misty-shultz-background">
            <h2 id="misty-shultz-background">
              Education &amp; Professional Background
            </h2>
            <ul>
              <li>
                Bachelor of Science in Psychology and Behavioral Analysis,
                University of North Texas
              </li>
              <li>
                Master’s degree in Marriage and Family Counseling, Southwestern
                Baptist Theological Seminary
              </li>
              <li>
                Master’s degree in Christian Education, Southwestern Baptist
                Theological Seminary
              </li>
              <li>Licensed Professional Counselor (LPC)</li>
            </ul>
          </section>
        </div>
        <section
          className="profile-contact"
          aria-labelledby="misty-shultz-contact"
        >
          <h2 id="misty-shultz-contact">Ask About Working With Misty</h2>
          <p>
            Tell our office you’re interested in working with Misty. We can
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
