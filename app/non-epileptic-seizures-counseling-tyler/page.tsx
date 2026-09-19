import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Non-Epileptic Seizures Counseling | Tyler, TX | The Bridge",
  description:
    "Counseling support for Non-Epileptic Seizures with Erin Young, LCSW-S at The Bridge in Tyler, Texas. Contact our office about an appointment.",
};

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
    >
      <main id="main" className="service-page">
        <section className="service-opening" aria-labelledby="page-title">
          <p className="service-breadcrumb">
            <a href="/">Home</a> / <a href="/#services">Counseling</a> /
            Non-Epileptic Seizures
          </p>
          <div className="service-hero">
            <div>
              <p className="eyebrow">
                PERSONAL SUPPORT &middot; A CHRISTIAN PERSPECTIVE
              </p>
              <h1 id="page-title">
                Non-Epileptic Seizures Counseling in <span>Tyler, TX</span>
              </h1>
              <p className="service-lead">
                A place to talk. Support for your next step.
              </p>
              <p>
                The Bridge offers counseling support related to Non-Epileptic
                Seizures in Tyler, Texas. Erin Young, LCSW-S is the counselor
                for this specialty. Contact our office to discuss your concerns
                and ask about working with Erin.
              </p>
              <a className="button" href="/contact/">
                Book an Appointment <span aria-hidden="true">&rarr;</span>
              </a>
              <p>
                <a className="service-text-link" href="#team-title">
                  Meet our Non-Epileptic Seizures counselor
                </a>
              </p>
            </div>
            <figure>
              <img
                src="/assets/individual-care.jpg"
                alt="A woman taking a quiet moment beside a window"
                width={900}
                height={600}
              />
              <figcaption>
                Room to reflect. Support for your next step.
              </figcaption>
            </figure>
          </div>
        </section>
        <section
          className="service-process service-section"
          aria-labelledby="support-title"
        >
          <div>
            <p className="eyebrow">COUNSELING THAT STARTS WITH YOU</p>
            <h2 id="support-title">Start with what brings you here.</h2>
            <p>
              You can tell Erin about the personal concerns and questions you
              want to bring to counseling. Contact our office to discuss
              counselor fit and the next steps for an appointment.
            </p>
            <p>
              The Bridge offers a Christian perspective on counseling. You can
              discuss how faith and personal values connect with the support you
              are seeking.
            </p>
            <a
              className="service-text-link"
              href="/christian-counseling-tyler/"
            >
              Learn about Christian counseling
            </a>
          </div>
          <div className="process-points">
            <article>
              <h3>Counseling and medical care</h3>
              <p>
                This service provides counseling support. Counseling is not a
                substitute for appropriate medical evaluation or emergency care.
                Questions about diagnosis, seizure type, testing, or medication
                belong with appropriate healthcare professionals.
              </p>
            </article>
          </div>
        </section>
        <section
          className="service-section individual-team"
          aria-labelledby="team-title"
        >
          <div className="service-section-heading">
            <p className="eyebrow">GET TO KNOW YOUR COUNSELOR</p>
            <h2
              id="team-title"
              tabIndex={-1}
              style={{ scrollMarginTop: "2rem" }}
            >
              Meet Erin Young.
            </h2>
          </div>
          <div
            className="individual-team-grid"
            style={{ gridTemplateColumns: "minmax(0, 1fr)", maxWidth: "760px" }}
          >
            <article>
              <img
                src="/assets/erin.jpg"
                alt="Erin Young, LCSW-S"
                width={300}
                height={360}
                loading="lazy"
              />
              <div>
                <h3>Erin Young, LCSW-S</h3>
                <p className="service-credential">
                  Licensed Clinical Social Worker&ndash;Supervisor &middot;
                  Co-owner
                </p>
                <p>
                  Erin provides counseling support for Non-Epileptic Seizures.
                  She works with children, adolescents, individual adults, and
                  families. Her profile shares more about her professional
                  background and Christian perspective.
                </p>
                <a className="service-text-link" href="/therapists/erin-young/">
                  Read Erin&apos;s profile <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </article>
          </div>
        </section>
        <section
          className="service-section individual-faq"
          aria-labelledby="faq-title"
        >
          <h2 id="faq-title">Questions about getting started</h2>
          <details>
            <summary>
              Does The Bridge offer counseling for Non-Epileptic Seizures?
            </summary>
            <p>
              Yes. Erin Young, LCSW-S provides counseling support for this
              specialty. Contact our office about your concerns and current
              appointment availability.
            </p>
          </details>
          <details>
            <summary>Is counseling a replacement for medical care?</summary>
            <p>
              No. This is a counseling service, not medical evaluation or
              emergency care. Medical questions should be discussed with
              appropriate healthcare professionals.
            </p>
          </details>
          <details>
            <summary>Can Christian faith be part of counseling?</summary>
            <p>
              The Bridge is a Christian counseling practice. You can talk with
              Erin about your faith and the support you are seeking. Faith-based
              support does not replace medical care.
            </p>
          </details>
          <details>
            <summary>How do I get started?</summary>
            <p>
              {" "}
              <a href="/contact/">Contact our office</a> and mention that you
              are interested in Non-Epileptic Seizures counseling with Erin
              Young. An inquiry starts a conversation about next steps; it does
              not confirm an appointment. Once you begin scheduling, the office
              will email intake paperwork for you to complete before your
              appointment.
            </p>
          </details>
        </section>
        <section className="service-section" aria-labelledby="related-title">
          <p className="eyebrow">EXPLORE COUNSELING AT THE BRIDGE</p>
          <h2 id="related-title">More about our approach</h2>
          <div className="related-care">
            <a
              className="service-text-link"
              href="/individual-counseling-tyler/"
            >
              Individual Counseling <span aria-hidden="true">&rarr;</span>
            </a>
            <a
              className="service-text-link"
              href="/christian-counseling-tyler/"
            >
              Christian Counseling <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </section>
        <section className="service-booking" aria-labelledby="booking-title">
          <div>
            <p className="eyebrow">YOUR NEXT STEP</p>
            <h2 id="booking-title">Start with a conversation.</h2>
            <p>
              Contact our Tyler office about Non-Epileptic Seizures counseling
              with Erin Young.
            </p>
          </div>
          <a className="button" href="/contact/">
            Book an Appointment <span aria-hidden="true">&rarr;</span>
          </a>
        </section>
      </main>
    </SiteShell>
  );
}
