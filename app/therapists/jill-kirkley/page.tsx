import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Jill Kirkley, LPC | Tyler, TX | The Bridge",
  description:
    "Meet Jill Kirkley, LPC, at The Bridge in Tyler, Texas. She counsels individual adults with a Christian perspective and experience in anxiety, grief, and change.",
};

const services = [
  ["Anxiety Counseling", "/anxiety-counseling-tyler/"],
  ["Life Transitions Counseling", "/life-transitions-counseling-tyler/"],
  ["Christian Counseling", "/christian-counseling-tyler/"],
];

export default function JillKirkleyPage() {
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
            <li aria-current="page">Jill Kirkley</li>
          </ol>
        </nav>
        <section className="profile-intro" aria-labelledby="jill-title">
          <img
            src="/assets/jill.jpg"
            alt="Jill Kirkley, LPC"
            width={500}
            height={601}
            fetchPriority="high"
          />
          <div>
            <p className="eyebrow">THE BRIDGE · TYLER, TEXAS</p>
            <h1 id="jill-title">Jill Kirkley, LPC</h1>
            <p className="profile-credential">
              Licensed Professional Counselor
            </p>
            <h2>About Jill</h2>
            <p>
              Jill works with individual adults and brings an explicitly
              Christian perspective to counseling. She encourages people to seek
              hope in God as they face life’s challenges.
            </p>
            <p>
              If you’re looking for support that makes room for both personal
              and spiritual concerns, our office can help you consider whether
              Jill may be a fit.
            </p>
            <a className="button" href="/contact/">
              Ask About Working With Jill
            </a>
            <p className="profile-inquiry">
              Contacting our office is an inquiry, not a confirmed appointment.
            </p>
          </div>
        </section>
        <div className="profile-details">
          <section aria-labelledby="jill-focus">
            <h2 id="jill-focus">Areas of Focus</h2>
            <p>Jill’s counseling experience includes support with:</p>
            <ul className="profile-focus">
              <li>Relationship concerns</li>
              <li>Life transitions</li>
              <li>Trauma and abuse recovery</li>
              <li>Grief and loss</li>
              <li>Guilt, anger, and shame</li>
              <li>Depression and anxiety</li>
              <li>Spiritual and ministry-related concerns</li>
            </ul>
          </section>
          <section aria-labelledby="jill-background">
            <h2 id="jill-background">Training &amp; Professional Background</h2>
            <p>
              Jill is trained in focused relaxation and Multi-channel Eye
              Movement Integration (MEMI). Her background includes using this
              training to help individuals process traumatic experiences.
            </p>
            <ul>
              <li>
                Bachelor of Science in Rehabilitation, Stephen F. Austin State
                University
              </li>
              <li>
                Master’s degree in Counseling, Stephen F. Austin State
                University
              </li>
              <li>Licensed Professional Counselor (LPC)</li>
            </ul>
          </section>
          <section aria-labelledby="jill-faith">
            <h2 id="jill-faith">Faith &amp; Counseling</h2>
            <p>
              For Jill, faith in Christ provides a foundation for
              decision-making, and biblical guidance offers wisdom for
              navigating difficult circumstances. She understands meaningful
              change as a work of the Holy Spirit, whom she describes as a
              source of comfort and guidance.
            </p>
          </section>
          <section aria-labelledby="jill-services">
            <h2 id="jill-services">Relevant Services</h2>
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
        <section className="profile-contact" aria-labelledby="jill-contact">
          <h2 id="jill-contact">Ask About Working With Jill</h2>
          <p>
            Tell our office you’re interested in working with Jill. We can
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
