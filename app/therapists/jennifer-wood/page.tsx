import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Jennifer Wood, LPC-S | Tyler, TX | The Bridge",
  description:
    "Jennifer Wood, LPC-S, is co-owner of The Bridge in Tyler, Texas. Her experience includes family concerns, grief, depression, and spiritual issues.",
};

const services = [
  ["Individual Counseling", "/individual-counseling-tyler/"],
  ["Depression Counseling", "/depression-counseling-tyler/"],
  ["Family Counseling", "/family-counseling-tyler/"],
  ["Grief Counseling", "/grief-counseling-tyler/"],
  ["Christian Counseling", "/christian-counseling-tyler/"],
  [
    "Divorce & Blended Family Counseling",
    "/divorce-blended-family-counseling-tyler/",
  ],
];

export default function JenniferWoodPage() {
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
            <li aria-current="page">Jennifer Wood</li>
          </ol>
        </nav>
        <section className="profile-intro" aria-labelledby="jennifer-title">
          <img
            src="/assets/jennifer.jpg"
            alt="Jennifer Wood, LPC-S"
            width={500}
            height={750}
            fetchPriority="high"
          />
          <div>
            <p className="eyebrow">THE BRIDGE · TYLER, TEXAS</p>
            <h1 id="jennifer-title">Jennifer Wood, LPC-S</h1>
            <p className="profile-credential">
              Licensed Professional Counselor–Supervisor
            </p>
            <p className="profile-role">Co-owner</p>
            <h2>About Jennifer</h2>
            <p>
              Jennifer has experience counseling adults, families, and children.
              Her passion is helping people connect with others and build
              meaningful, healthy relationships.
            </p>
            <p>
              You may be looking for support with a relationship, a loss, or
              depression. Jennifer’s experience includes these concerns, and our
              office can help you consider whether working with her may be a fit.
            </p>
            <a className="button" href="/contact/">
              Ask About Working With Jennifer
            </a>
            <p className="profile-inquiry">
              Contacting our office is an inquiry, not a confirmed appointment.
            </p>
          </div>
        </section>
        <div className="profile-details">
          <section aria-labelledby="jennifer-focus">
            <h2 id="jennifer-focus">Areas of Focus</h2>
            <p>
              Jennifer has experience supporting people with these concerns:
            </p>
            <ul className="profile-focus">
              <li>Marriage and family concerns</li>
              <li>Grief, bereavement, and loss</li>
              <li>
                Hurts in close relationships (attachment wounds) and
                relationship patterns
              </li>
              <li>
                Understanding emotions (emotional intelligence development)
              </li>
              <li>Eating disorders</li>
              <li>Depression</li>
              <li>Personality disorders</li>
              <li>Anger</li>
              <li>Mentoring and discipleship</li>
              <li>Spiritual issues</li>
            </ul>
          </section>
          <section aria-labelledby="jennifer-faith">
            <h2 id="jennifer-faith">Faith &amp; Counseling</h2>
            <p>
              Jennifer believes in God’s sovereignty and that He created people
              to experience joy, hope, and peace. Her calling to serve those who
              are hurting is an important part of her perspective, and spiritual
              issues are among her areas of counseling experience.
            </p>
          </section>
          <section aria-labelledby="jennifer-education">
            <h2 id="jennifer-education">
              Education &amp; Professional Background
            </h2>
            <ul>
              <li>
                Bachelor of Arts in Psychology, East Texas Baptist University
              </li>
              <li>
                Master of Arts in Marriage and Family Therapy, University of
                Louisiana at Monroe
              </li>
              <li>Licensed Professional Counselor–Supervisor (LPC-S)</li>
            </ul>
            <p>
              Her professional background includes private practice and
              counseling in a variety of settings.
            </p>
          </section>
          <section aria-labelledby="jennifer-services">
            <h2 id="jennifer-services">Relevant Services</h2>
            <p>
              Explore these services to learn more about counseling for the
              concerns that brought you here.
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
        <section className="profile-contact" aria-labelledby="jennifer-contact">
          <h2 id="jennifer-contact">Ask About Working With Jennifer</h2>
          <p>
            Tell our office that you’re interested in working with Jennifer. We
            can discuss your needs and the next steps for an appointment
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
