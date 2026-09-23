import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Online Therapy in Texas | Telehealth Counseling | The Bridge",
  description:
    "Explore online therapy and telehealth counseling across Texas with The Bridge Therapeutic Services, including counseling that makes room for your Christian faith.",
};

const questions = [
  [
    "Can I see a therapist online if I live in Texas?",
    "The Bridge offers telehealth counseling to eligible clients across Texas. Contact the office with your location and the support you are seeking so we can discuss therapist availability and whether remote counseling is appropriate for you.",
  ],
  [
    "Does The Bridge offer Christian counseling online?",
    "If you want Christian faith included in online counseling, let the office know when you reach out. Ask about a therapist whose approach fits that preference and whose telehealth availability fits your needs. You can also discuss counseling without requesting a faith-based approach.",
  ],
  [
    "How does online therapy work?",
    "Start with an inquiry through our contact page, or call the office. Tell us you are interested in telehealth. Discuss therapist fit, availability, and scheduling with the office, then confirm the details for meeting remotely before your appointment.",
  ],
  [
    "Do I have to live near Tyler to work with The Bridge?",
    "No. Telehealth is available to eligible clients throughout Texas, beyond the area around our Tyler office. Your location, your needs, and the therapist’s availability help determine the right next step.",
  ],
  [
    "Is telehealth counseling private?",
    "Privacy is an important part of planning a remote session. Choose a place where you can speak without being overheard, and ask the office how remote appointments are conducted and what privacy arrangements to expect before scheduling.",
  ],
  [
    "What types of counseling can be provided online?",
    "The Bridge’s services include individual counseling and support for concerns such as anxiety, grief, and life transitions. Ask the office which options are available through telehealth for your situation; not every service or clinical need is suited to remote care.",
  ],
];

const services = [
  [
    "Individual counseling",
    "/individual-counseling-tyler/",
    "Space to talk about personal concerns and the support you are looking for.",
  ],
  [
    "Anxiety counseling",
    "/anxiety-counseling-tyler/",
    "Support for worries, stress, and the ways anxiety affects everyday life.",
  ],
  [
    "Grief counseling",
    "/grief-counseling-tyler/",
    "Room to talk about loss and what you are experiencing as you grieve.",
  ],
  [
    "Life transitions",
    "/life-transitions-counseling-tyler/",
    "Support as you navigate changing roles, relationships, or circumstances.",
  ],
];

export default function Page() {
  return (
    <SiteShell
      styles={[
        "/style.css",
        "/homepage-ending.css",
        "/service-page.css",
        "/typography.css",
        "/team-menu.css",
        "/reference-palette.css",
        "/polish.css",
        "/ivory-design.css",
      ]}
      footerId="location"
    >
      <main id="main" className="service-page">
        <section className="service-opening" aria-labelledby="page-title">
          <p className="service-breadcrumb">
            <a href="/">Home</a> / Online Therapy in Texas
          </p>
          <div className="service-hero">
            <div>
              <p className="eyebrow">
                ROOTED IN TYLER · AVAILABLE ACROSS TEXAS
              </p>
              <h1 id="page-title">
                Online Therapy &amp; Telehealth Counseling{" "}
                <span>Across Texas</span>
              </h1>
              <p className="service-lead">
                A connection to care, wherever you call home in Texas.
              </p>
              <p>
                The Bridge Therapeutic Services offers telehealth counseling so
                eligible clients across Texas can connect with a therapist
                remotely. Tell us what brings you here, and we can help you
                explore whether online counseling fits your needs.
              </p>
              <a className="button" href="/contact/">
                Book an Appointment <span aria-hidden="true">→</span>
              </a>
              <p>
                <a className="service-text-link" href="/therapists/">
                  Meet our therapists
                </a>
              </p>
            </div>
            <figure>
              <img
                src="/assets/services/service-online.avif"
                alt="A man talking with a woman on a laptop video call at a table beside houseplants"
                width="500"
                height="333"
                style={{ objectPosition: "50% 50%", height: "auto" }}
              />
              <figcaption>Time to reflect. A place to begin.</figcaption>
            </figure>
          </div>
        </section>

        <section
          className="service-section"
          aria-labelledby="without-drive-title"
        >
          <div className="service-section-heading">
            <p className="eyebrow">MAKE ROOM FOR SUPPORT</p>
            <h2 id="without-drive-title">Therapy without the drive.</h2>
            <p>
              Travel can make it harder to fit counseling into an already full
              week. For parents balancing family responsibilities, working
              professionals, or people who live outside Tyler, meeting remotely
              can remove the trip to the office.
            </p>
            <p>
              You may live in a smaller Texas community, have a busy schedule,
              or simply prefer to meet from home. Virtual therapy offers another
              way to connect, provided you have a suitable place to talk and
              remote care is appropriate for your situation.
            </p>
          </div>
        </section>

        <section
          className="individual-concerns service-section"
          aria-labelledby="services-title"
        >
          <div className="service-section-heading">
            <p className="eyebrow">START WITH WHAT BRINGS YOU HERE</p>
            <h2 id="services-title">Explore online counseling options.</h2>
            <p>
              You do not need to know exactly what kind of help to ask for.
              These are some of the counseling areas offered at The Bridge. Talk
              with our office about which can be provided through telehealth for
              your needs and with an available therapist.
            </p>
          </div>
          <div className="concern-grid family-paths">
            {services.map(([title, href, description]) => (
              <article key={href}>
                <h3>{title}</h3>
                <p>{description}</p>
                <a className="service-text-link" href={href}>
                  Explore {title.toLowerCase()}{" "}
                  <span aria-hidden="true">→</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="service-section" aria-labelledby="faith-title">
          <div className="service-section-heading">
            <p className="eyebrow">CARE THAT MAKES ROOM FOR FAITH</p>
            <h2 id="faith-title">Christian online counseling in Texas.</h2>
            <p>
              For many people, faith is part of how they understand hardship,
              relationships, and hope. If you want to bring your Christian faith
              into online counseling, share that preference when you contact The
              Bridge.
            </p>
            <p>
              Finding a therapist includes finding an approach you feel
              comfortable with. Ask about a Christian therapist available for
              online sessions and discuss how you would like faith included. You
              are also welcome to seek support without requesting a faith-based
              approach.
            </p>
            <a
              className="service-text-link"
              href="/christian-counseling-tyler/"
            >
              Learn about Christian counseling <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <section
          className="service-section service-process"
          aria-labelledby="process-title"
        >
          <div>
            <p className="eyebrow">YOUR FIRST STEPS</p>
            <h2 id="process-title">How online counseling works.</h2>
            <p>
              Begin with a conversation about what you need. Our existing
              inquiry process is the starting point for telehealth, too.
            </p>
          </div>
          <div className="process-points">
            <article>
              <h3>1. Contact The Bridge</h3>
              <p>
                Use our <a href="/contact/">contact page</a> or call{" "}
                <a href="tel:9032838729">(903) 283-8729</a>. Mention your
                interest in online counseling and where in Texas you would be
                attending sessions.
              </p>
            </article>
            <article>
              <h3>2. Discuss the right fit</h3>
              <p>
                Share what you are seeking help with and any preferences,
                including whether you want faith incorporated. Ask about a
                suitable therapist and current telehealth availability.
              </p>
            </article>
            <article>
              <h3>3. Confirm your appointment</h3>
              <p>
                Work with the office on scheduling. Before meeting remotely,
                confirm the session arrangements and what you will need,
                including a place where you can talk privately.
              </p>
            </article>
          </div>
        </section>

        <section className="service-section" aria-labelledby="texas-title">
          <div className="service-section-heading">
            <p className="eyebrow">BEYOND THE TYLER OFFICE</p>
            <h2 id="texas-title">Telehealth throughout Texas.</h2>
            <p>
              Our office is in Tyler, and telehealth extends the conversation
              beyond East Texas. Whether you live in Dallas–Fort Worth, Houston,
              Austin, San Antonio, West Texas, or a rural community, you can
              contact us about remote counseling.
            </p>
            <p>
              These are areas clients may connect from online, not additional
              Bridge office locations. Availability depends on therapist fit and
              whether telehealth is appropriate for your needs and location.
            </p>
            <a className="service-text-link" href="/contact/#location">
              Find our Tyler office information{" "}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <section
          className="service-section individual-faq"
          aria-labelledby="faq-title"
        >
          <p className="eyebrow">QUESTIONS BEFORE YOU BEGIN</p>
          <h2 id="faq-title">Online counseling questions.</h2>
          {questions.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </section>
        <section className="service-booking" aria-labelledby="booking-title">
          <div>
            <p className="eyebrow">YOUR NEXT STEP</p>
            <h2 id="booking-title">Looking for online counseling in Texas?</h2>
            <p>
              You don’t have to live near our Tyler office to start a
              conversation. Contact The Bridge to learn about telehealth options
              and finding a therapist who fits your needs.
            </p>
          </div>
          <a className="button" href="/contact/">
            Book an Appointment <span aria-hidden="true">→</span>
          </a>
        </section>
      </main>
    </SiteShell>
  );
}
