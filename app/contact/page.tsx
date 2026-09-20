import { ContactInquiry } from "@/components/contact-inquiry";
import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "Book an Appointment | Contact The Bridge in Tyler, TX",
  description:
    "Contact The Bridge Therapeutic Services in Tyler, Texas. Call or email to book a counseling appointment, ask about insurance, or find our Paluxy Drive office.",
};
export default function Page() {
  return (
    <SiteShell
      styles={[
        "/style.css",
        "/homepage-ending.css",
        "/contact/contact.css",
        "/insurance.css",
        "/typography.css",
        "/team-menu.css",
        "/reference-palette.css",
        "/polish.css",
        "/ivory-design.css",
      ]}
      footerId="contact-footer"
    >
      <main id={"main"} className={"contact-page"}>

        <section className="contact-intro" aria-labelledby="contact-title">
          <p className="contact-breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span>Contact Us</p>
          <div className="contact-layout">
            <div className="contact-copy">
              <p className="eyebrow">CONTACT THE BRIDGE · TYLER, TEXAS</p>
              <h1 id="contact-title">Your next chapter can start with a conversation.</h1>
              <p>Ready to book an appointment? Reach out to our office to talk about counseling and find the right next step for you.</p>
              <p className="contact-reassurance">You don’t need to have everything figured out—or choose a counselor before you contact us.</p>
              <div className="contact-support"><span aria-hidden="true" /><p>Kalynne, our Office Manager, can help you get started.</p></div>
            </div>
            <div className="contact-portrait">
              <img src="/assets/presentation/contact/kalynne-720.webp" width="720" height="1080" alt="Kalynne Arrick, Office Manager at The Bridge Therapeutic Services" fetchPriority="high" decoding="async" />
            </div>
            <section className="contact-staff" aria-labelledby="contact-staff-title">
              <h2 id="contact-staff-title">Kalynne Arrick</h2>
              <p className="contact-staff-role">Office Manager</p>
              <p className="contact-staff-help">{"Kalynne, our Office Manager, can talk with you about what you're looking for and help connect you with a counselor who may be a good fit."}</p>
              <a href="/staff/kalynne-arrick/">Meet Kalynne <span aria-hidden="true">→</span></a>
            </section>
          </div>
        </section>
        <div className="contact-details-layout">
          <section className="contact-information" aria-labelledby="contact-information-title">
            <h2 id="contact-information-title">Contact Information</h2>
            <dl className="contact-information-rows">
              <div><dt>Phone</dt><dd><a href="tel:9032838729">(903) 283-8729</a></dd></div>
              <div><dt>Email</dt><dd><a href="mailto:info@thebridgetherapy.com">info@thebridgetherapy.com</a></dd></div>
              <div><dt>Office hours</dt><dd>Monday–Friday<br />8:00 AM–7:00 PM</dd><dd>Weekends<br />Based on availability</dd></div>
              <div id="location"><dt>Location</dt><dd><address>The Bridge Therapeutic Services<br />3800 Paluxy Drive, Suite 240<br />Building 2<br />Tyler, TX 75703</address><a className="contact-directions" href="https://www.google.com/maps/search/?api=1&query=The+Bridge+Therapeutic+Services+3800+Paluxy+Drive+Suite+240+Tyler+TX" target="_blank" rel="noopener">Get Directions <span aria-hidden="true">↗</span></a></dd></div>
            </dl>
            <div className="contact-office-notes">
              <h3>Let’s get you connected.</h3>
              <p>Call or email our office to ask about counselor availability. We typically respond to new inquiries within 24 hours.</p>
              <p>When emailing, a brief note that you’d like to get started is enough. You can discuss personal details with your counselor.</p>
              <h3>Before your first visit</h3>
              <p>Once you begin the scheduling process, the office will email intake paperwork for you to complete before your appointment. We can also help with questions about finding the office.</p>
            </div>
          </section>
          <ContactInquiry />
        </div>
        <section
          className={"contact-faq"}
          id={"questions"}
          aria-labelledby={"questions-title"}
        >
          {"\n    "}
          <p className={"eyebrow"}>{"A LITTLE CLARITY BEFORE YOU BEGIN"}</p>
          <h2 id={"questions-title"}>{"Questions about getting started?"}</h2>
          {"\n    "}
          <details>
            <summary>{"How do I book an appointment?"}</summary>
            <p>
              {"Call "}
              <a href={"tel:9032838729"}>{"(903) 283-8729"}</a>
              {" or email "}
              <a href={"mailto:info@thebridgetherapy.com"}>
                {"info@thebridgetherapy.com"}
              </a>
              {". Our office will help you with availability and scheduling."}
            </p>
          </details>
          {"\n    "}
          <details>
            <summary>{"Do I need to choose a therapist first?"}</summary>
            <p>
              No. You can <a href="/therapists/">get to know our counselors</a>{" "}
              first, or talk with Kalynne, our Office Manager, about what you
              are looking for. She can help connect you with a counselor who may
              be a good fit. If you already have someone in mind, mention their
              name when you reach out.
            </p>
          </details>
          {"\n    "}
          <details>
            <summary>{"Can I use my insurance?"}</summary>
            <p>
              Insurance and self-pay options are available. Insurance
              participation can vary by counselor, plan, and appointment type.
              Contact our office to confirm current coverage. You can also{" "}
              <a href="/#insurance">view our insurance logos on the homepage</a>
              .
            </p>
          </details>
          {"\n  "}

          <details>
            <summary>
              Do you offer in-person or telehealth appointments?
            </summary>
            <p>
              The Bridge offers both in-person and telehealth counseling.
              Contact our office about scheduling.
            </p>
          </details>
          <details>
            <summary>How long is a session?</summary>
            <p>Sessions are typically 50–60 minutes.</p>
          </details>
          <details>
            <summary>What payment methods do you accept?</summary>
            <p>
              The Bridge accepts check, cash, and credit card payments. The
              practice’s system requires a card to be kept on file. Contact our
              office about current fees and payment options.
            </p>
          </details>
          <details>
            <summary>What if my counselor is not in network?</summary>
            <p>
              The Bridge can provide a superbill that you may submit to your
              insurance company. Ask the office about a superbill if your
              counselor is not in network with your plan. Your insurance company
              determines any reimbursement; payment is not guaranteed.
            </p>
          </details>
          <details>
            <summary>What is the cancellation policy?</summary>
            <p>
              The Bridge requires at least 24 hours’ notice for cancellations.
              If less notice is provided, you are responsible for the full
              session fee.
            </p>
          </details>
        </section>
        {"\n"}
      </main>
    </SiteShell>
  );
}
