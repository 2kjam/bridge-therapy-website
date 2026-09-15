import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Kim Gonzales, LMSW | Tyler, TX | The Bridge",
  description:
    "Meet Kim Gonzales, LMSW, at The Bridge in Tyler, Texas. She supports women with stress, anxiety, parenting, and relationship concerns.",
};

const services = [
  ["Adoption & Foster Family Support", "/adoption-counseling-tyler/"],
];

export default function KimGonzalesPage() {
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
            <li aria-current="page">Kim Gonzales</li>
          </ol>
        </nav>
        <section className="profile-intro" aria-labelledby="kim-gonzales-title">
          <img
            src="/assets/kim.jpg"
            alt="Kim Gonzales, LMSW"
            width={500}
            height={750}
            fetchPriority="high"
          />
          <div>
            <p className="eyebrow">THE BRIDGE · TYLER, TEXAS</p>
            <h1 id="kim-gonzales-title">Kim Gonzales, LMSW</h1>
            <p className="profile-credential">Licensed Master Social Worker</p>
            <p className="profile-role">Supervised by Erin Young, LCSW-S</p>
            <h2>About Kim</h2>
            <p>
              Kim supports women in a compassionate, nonjudgmental space where
              they can feel heard and respectfully challenged. Her work makes
              room for the concerns you bring and the support you need.
            </p>
            <a className="button" href="/contact/?therapist=kim-gonzales">
              Ask About Working With Kim
            </a>
            <p className="profile-inquiry">
              Contacting our office is an inquiry, not a confirmed appointment.
            </p>
          </div>
        </section>
        <div className="profile-details">
          <section aria-labelledby="kim-gonzales-focus">
            <h2 id="kim-gonzales-focus">Areas of Focus</h2>
            <p>Kim’s counseling experience includes support with:</p>
            <ul className="profile-focus">
              <li>Stress and anxiety</li>
              <li>Self-esteem</li>
              <li>Relationship concerns</li>
              <li>Spiritual concerns</li>
              <li>Parenting</li>
              <li>Depression</li>
              <li>Trauma</li>
            </ul>
          </section>
          <section aria-labelledby="kim-gonzales-style">
            <h2 id="kim-gonzales-style">Counseling Style</h2>
            <p>
              Kim takes a solution-focused approach, working collaboratively
              with you to solve problems and build coping skills. She offers
              realistic feedback and tailors her work to the individual.
            </p>
          </section>
          <section aria-labelledby="kim-gonzales-background">
            <h2 id="kim-gonzales-background">Professional Background</h2>
            <p>
              Kim’s social-work background includes work in schools,
              mental-health leadership, and training social workers. She has
              also served on Jarvis Christian University’s social work board.
            </p>
            <p>
              Her Christian faith is reflected in church service as a youth
              director and teacher.
            </p>
          </section>
          <section aria-labelledby="kim-gonzales-foster">
            <h2 id="kim-gonzales-foster">Personal Foster-Parent Experience</h2>
            <p>
              Kim and her family have personal experience as foster parents.
              This is part of her lived experience, distinct from her
              professional social-work qualifications.
            </p>
          </section>
          <section aria-labelledby="kim-gonzales-services">
            <h2 id="kim-gonzales-services">Relevant Services</h2>
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
          aria-labelledby="kim-gonzales-contact"
        >
          <h2 id="kim-gonzales-contact">Ask About Working With Kim</h2>
          <p>
            Tell our office you’re interested in working with Kim. We can
            discuss your questions, your concerns, and the next steps for an
            appointment inquiry.
          </p>
          <a className="button" href="/contact/?therapist=kim-gonzales">
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
