import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "About The Bridge | The Bridge Therapeutic Services",
  description:
    "Get to know The Bridge Therapeutic Services in Tyler, Texas, co-owners Jennifer Wood and Erin Young, and our Christian perspective on professional, compassionate care.",
};

export default function AboutPage() {
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
        "/about.css",
      ]}
    >
      <main id="main" className="about-page">
        <section className="about-intro" aria-labelledby="about-title">
          <p className="eyebrow">THE BRIDGE THERAPEUTIC SERVICES</p>
          <h1 id="about-title">About The Bridge</h1>
          <p className="about-lead">
            The Bridge Therapeutic Services offers counseling and therapy for
            individuals, couples, families, and children in Tyler, Texas.
          </p>
        </section>

        <section className="about-owners" aria-labelledby="owners-title">
          <figure>
            <img
              src="/assets/our-story.jpg"
              alt="Erin Young and Jennifer Wood, co-owners of The Bridge"
              width={1000}
              height={664}
            />
            <figcaption>Jennifer &amp; Erin · Co-owners</figcaption>
          </figure>
          <div className="about-owners-copy">
            <p className="eyebrow">THE PEOPLE BEHIND THE PRACTICE</p>
            <h2 id="owners-title">Meet Jennifer &amp; Erin</h2>
            <p>
              Jennifer Wood and Erin Young are co-owners of The Bridge
              Therapeutic Services. Alongside their roles in the practice, both
              provide counseling. Their individual profiles share more about
              their backgrounds and areas of care.
            </p>
            <div className="about-owner-links">
              <div>
                <h3>Jennifer Wood, LPC-S</h3>
                <p>Co-owner</p>
                <a href="/therapists/jennifer-wood/">
                  Meet Jennifer <span aria-hidden="true">→</span>
                </a>
              </div>
              <div>
                <h3>Erin Young, LCSW-S</h3>
                <p>Co-owner</p>
                <a href="/therapists/erin-young/">
                  Meet Erin <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          className="about-perspective"
          aria-labelledby="perspective-title"
        >
          <div>
            <p className="eyebrow">FAITH &amp; EVERYDAY LIFE</p>
            <h2 id="perspective-title">A Christian perspective on care</h2>
            <p className="about-positioning">
              Bridging Christian Counseling with Whole Health Together
            </p>
          </div>
          <div>
            <p>
              Our counselors meet you with a Christian perspective and
              professional and compassionate care for your unique needs.
            </p>
            <p>
              Bring your emotional, personal, or relationship concerns and talk
              about how faith connects with the support you are seeking.
            </p>
            <a href="/christian-counseling-tyler/">
              Explore Christian counseling <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <section className="about-team" aria-labelledby="about-team-title">
          <div>
            <p className="eyebrow">THE BRIDGE TEAM</p>
            <h2 id="about-team-title">Get to know our team</h2>
          </div>
          <div>
            <p>
              Our counseling team includes licensed professional counselors, a
              licensed marriage and family therapist, social workers, and a
              counselor associate. Individual profiles describe each clinician’s
              credentials, experience, and supervision where applicable.
            </p>
            <p>
              <a href="/staff/kalynne-arrick/">
                Kalynne Arrick, Office Manager
              </a>
              , provides administrative support and can help with questions
              about getting started.
            </p>
            <a className="button button-outline" href="/therapists/">
              Meet Our Therapists
            </a>
          </div>
        </section>

        <section className="about-next" aria-labelledby="about-next-title">
          <div>
            <h2 id="about-next-title">Contact The Bridge</h2>
            <p>Our office can help you explore the next step.</p>
          </div>
          <a className="button" href="/contact/">
            Book an Appointment
          </a>
        </section>
      </main>
    </SiteShell>
  );
}
