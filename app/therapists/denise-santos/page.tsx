import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Denise Santos, LPC | Tyler, TX | The Bridge",
  description:
    "Meet Denise Santos, LPC, at The Bridge in Tyler, Texas. She counsels children, adolescents, and adults with experience in anxiety, depression, grief, and change.",
};

const services = [
  ["Individual Counseling", "/individual-counseling-tyler/"],
  ["Depression Counseling", "/depression-counseling-tyler/"],
  ["Child & Teen Counseling", "/child-teen-counseling-tyler/"],
  ["Life Transitions Counseling", "/life-transitions-counseling-tyler/"],
];

export default function DeniseSantosPage() {
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
            <li aria-current="page">Denise Santos</li>
          </ol>
        </nav>
        <section className="profile-intro" aria-labelledby="denise-title">
          <img
            src="/assets/denise.jpg"
            alt="Denise Santos, LPC"
            width={750}
            height={1125}
            fetchPriority="high"
          />
          <div>
            <p className="eyebrow">THE BRIDGE · TYLER, TEXAS</p>
            <h1 id="denise-title">Denise Santos, LPC</h1>
            <p className="profile-credential">
              Licensed Professional Counselor
            </p>
            <h2>About Denise</h2>
            <p>
              Denise counsels children, adolescents, and adults. She views
              counseling as a calling rooted in compassion and connection, and
              believes everyone deserves a safe space to be heard and supported.
            </p>
            <p>
              Her experience has shaped an individualized, client-centered
              approach. She is passionate about helping people rebuild
              confidence and rediscover purpose through life’s challenges and
              changes.
            </p>
            <a className="button" href="/contact/?therapist=denise-santos">
              Ask About Working With Denise
            </a>
            <p className="profile-inquiry">
              Contacting our office is an inquiry, not a confirmed appointment.
            </p>
          </div>
        </section>
        <div className="profile-details">
          <section aria-labelledby="denise-focus">
            <h2 id="denise-focus">Areas of Focus</h2>
            <p>Denise’s counseling experience includes support with:</p>
            <ul className="profile-focus">
              <li>Anxiety</li>
              <li>Depression</li>
              <li>Anger</li>
              <li>Grief and bereavement</li>
              <li>Unexpected life transitions</li>
              <li>Personal concerns related to infidelity</li>
            </ul>
            <p>
              Her background also includes counseling brain-injury and stroke
              survivors. Contact the office to discuss the support you’re
              seeking and whether Denise may be a fit.
            </p>
          </section>
          <section aria-labelledby="denise-background">
            <h2 id="denise-background">Professional Background</h2>
            <p>
              Denise’s background includes private practice, community mental
              health, and rehabilitation settings. She has experience
              collaborating with physical therapy, occupational therapy, and
              speech therapy teams to provide client-centered care.
            </p>
            <ul>
              <li>
                Bachelor of Arts in Psychology, Texas A&amp;M International
                University
              </li>
              <li>
                Master of Arts in Counseling Psychology, Texas A&amp;M
                International University
              </li>
              <li>Licensed Professional Counselor (LPC)</li>
            </ul>
          </section>
          <section aria-labelledby="denise-services">
            <h2 id="denise-services">Relevant Services</h2>
            <p>
              Explore these services as you consider what kind of counseling
              support you need.
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
        <section className="profile-contact" aria-labelledby="denise-contact">
          <h2 id="denise-contact">Ask About Working With Denise</h2>
          <p>
            Tell our office you’re interested in working with Denise. Share your
            questions and what brings you to counseling so we can discuss the
            next steps for an appointment inquiry.
          </p>
          <a className="button" href="/contact/?therapist=denise-santos">
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
