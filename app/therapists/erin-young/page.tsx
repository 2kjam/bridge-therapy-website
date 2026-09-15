import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Erin Young, LCSW-S | Tyler, TX | The Bridge",
  description:
    "Meet Erin Young, LCSW-S, co-owner of The Bridge in Tyler, Texas. Her counseling experience includes trauma, anxiety, grief, and ADHD. Inquire about care.",
};

const services = [
  ["Anxiety Counseling", "/anxiety-counseling-tyler/"],
  ["Grief Counseling", "/grief-counseling-tyler/"],
  ["Trauma Therapy", "/trauma-therapy-tyler/"],
  ["EMDR Therapy", "/emdr-therapy-tyler/"],
  ["ADHD Counseling", "/adhd-counseling-tyler/"],
  ["Adoption & Foster Family Support", "/adoption-counseling-tyler/"],
];

export default function ErinYoungPage() {
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
            <li aria-current="page">Erin Young</li>
          </ol>
        </nav>
        <section className="profile-intro" aria-labelledby="erin-title">
          <img
            src="/assets/erin.jpg"
            alt="Erin Young, LCSW-S"
            width={500}
            height={750}
            fetchPriority="high"
          />
          <div>
            <p className="eyebrow">THE BRIDGE · TYLER, TEXAS</p>
            <h1 id="erin-title">Erin Young, LCSW-S</h1>
            <p className="profile-credential">
              Licensed Clinical Social Worker–Supervisor
            </p>
            <p className="profile-role">Co-owner</p>
            <h2>About Erin</h2>
            <p>
              Erin works with children, adolescents, individual adults, and
              families. Her background spans private counseling practice, foster
              care and adoption services, elementary education, and children’s
              healthcare.
            </p>
            <p>
              Whether you’re seeking support for yourself or your family, you
              can tell our office what brings you to counseling and ask about
              working with Erin.
            </p>
            <a className="button" href="/contact/">
              Ask About Working With Erin
            </a>
            <p className="profile-inquiry">
              Contacting our office is an inquiry, not a confirmed appointment.
            </p>
          </div>
        </section>
        <div className="profile-details">
          <section aria-labelledby="erin-focus">
            <h2 id="erin-focus">Areas of Focus</h2>
            <p>Erin’s counseling experience includes support for:</p>
            <ul className="profile-focus">
              <li>Post-traumatic stress disorder (PTSD) and complex trauma</li>
              <li>Anxiety and phobias</li>
              <li>Depression</li>
              <li>Grief, including complicated grief</li>
              <li>Dissociation</li>
              <li>Attention concerns, including ADD/ADHD</li>
              <li>Stress- and pain-related concerns</li>
              <li>Codependency</li>
              <li>Counseling support for non-epileptic concerns</li>
              <li>Counseling support related to fibromyalgia</li>
            </ul>
            <p>
              You don’t need to know which term describes your experience to
              make an inquiry. Share your concerns with the office so you can
              discuss an appropriate next step.
            </p>
          </section>
          <section aria-labelledby="erin-background">
            <h2 id="erin-background">Training &amp; Professional Background</h2>
            <p>
              Erin is trained in Eye Movement Desensitization and Reprocessing
              (EMDR), Brain Gym, trauma, and family therapy. Her professional
              background also includes leading a cognitive behavioral therapy
              (CBT) program associated with The Epilepsy Center at Northeast
              Texas Neurological Associates.
            </p>
            <ul>
              <li>
                Bachelor’s degree in Social Work, University of North Texas
              </li>
              <li>
                Master’s degree in Clinical Social Work, Temple University
              </li>
              <li>Licensed Clinical Social Worker–Supervisor (LCSW-S)</li>
            </ul>
          </section>
          <section aria-labelledby="erin-faith">
            <h2 id="erin-faith">Faith &amp; Counseling</h2>
            <p>
              Erin’s training includes Heart-Focused Biblical Counseling. Her
              personal faith statement draws on Jeremiah 29:11 and its message
              of hope and a future.
            </p>
          </section>
          <section aria-labelledby="erin-services">
            <h2 id="erin-services">Relevant Services</h2>
            <p>
              Learn more about these counseling options at The Bridge as you
              consider what kind of support you’re seeking.
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
        <section className="profile-contact" aria-labelledby="erin-contact">
          <h2 id="erin-contact">Ask About Working With Erin</h2>
          <p>
            Contact our office with your questions about Erin and the support
            you’re looking for. We can discuss the next steps for an appointment
            inquiry.
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
