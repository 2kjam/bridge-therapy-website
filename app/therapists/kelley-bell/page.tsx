import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Kelley Bell, LPC | Tyler, TX | The Bridge",
  description:
    "Meet Kelley Bell, LPC, at The Bridge in Tyler, Texas. She supports teens, young adults, parents, and young married couples. Inquire about counseling.",
};

const services = [
  ["Marriage Counseling", "/marriage-counseling-tyler/"],
  ["Child & Teen Counseling", "/child-teen-counseling-tyler/"],
  ["Parenting Support", "/parenting-support-tyler/"],
  ["Premarital Counseling", "/premarital-counseling-tyler/"],
];

export default function KelleyBellPage() {
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
            <li aria-current="page">Kelley Bell</li>
          </ol>
        </nav>
        <section className="profile-intro" aria-labelledby="kelley-title">
          <img
            src="/assets/kelley.jpg"
            alt="Kelley Bell, LPC"
            width={750}
            height={1125}
            fetchPriority="high"
          />
          <div>
            <p className="eyebrow">THE BRIDGE · TYLER, TEXAS</p>
            <h1 id="kelley-title">Kelley Bell, LPC</h1>
            <p className="profile-credential">
              Licensed Professional Counselor
            </p>
            <h2>About Kelley</h2>
            <p>
              Kelley is passionate about supporting teens and young adults
              through emotional and family challenges. She also works with
              parents navigating the experience of raising children and with
              young married couples building their relationships.
            </p>
            <p>
              Her background in school counseling shapes her desire to encourage
              people to recognize their value. Tell our office what brings you
              to counseling and ask whether Kelley may be a fit.
            </p>
            <a className="button" href="/contact/">
              Ask About Working With Kelley
            </a>
            <p className="profile-inquiry">
              Contacting our office is an inquiry, not a confirmed appointment.
            </p>
          </div>
        </section>
        <div className="profile-details">
          <section aria-labelledby="kelley-focus">
            <h2 id="kelley-focus">Areas of Focus</h2>
            <p>
              Kelley’s experience supporting teens and young adults includes:
            </p>
            <ul className="profile-focus">
              <li>Anxiety</li>
              <li>Depression</li>
              <li>Stress</li>
              <li>Grief</li>
              <li>Self-harm</li>
              <li>Family concerns</li>
            </ul>
          </section>
          <section aria-labelledby="kelley-background">
            <h2 id="kelley-background">
              Training &amp; Professional Background
            </h2>
            <p>
              Kelley’s career in education includes professional school
              counseling in public and private Christian schools. She is trained
              in Cognitive Processing Therapy and uses various techniques in her
              counseling work.
            </p>
            <ul>
              <li>Bachelor of Science in Mathematics</li>
              <li>Master of Education in Guidance and Counseling</li>
              <li>Postgraduate Certificate in Mental Health Counseling</li>
              <li>Licensed Professional Counselor (LPC)</li>
            </ul>
          </section>
          <section aria-labelledby="kelley-faith">
            <h2 id="kelley-faith">Faith &amp; Counseling</h2>
            <p>
              Kelley approaches counseling from a biblical perspective. Her
              background includes prayer ministries for teens, young women, and
              mothers of teens, and her work with young married couples
              emphasizes healthy marriages centered around the Lord.
            </p>
          </section>
          <section aria-labelledby="kelley-services">
            <h2 id="kelley-services">Relevant Services</h2>
            <p>
              Explore these services to learn more about support for the
              concerns you’re bringing to counseling.
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
        <section className="profile-contact" aria-labelledby="kelley-contact">
          <h2 id="kelley-contact">Ask About Working With Kelley</h2>
          <p>
            Contact our office to discuss your questions about Kelley and the
            support you’re seeking. We can help you understand the next steps
            for an appointment inquiry.
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
