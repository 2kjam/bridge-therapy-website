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
        {"\n  "}
        <section className={"contact-intro"} aria-labelledby={"contact-title"}>
          {"\n    "}
          <p className={"contact-breadcrumb"}>
            <a href={"/"}>{"Home"}</a>
            <span aria-hidden={"true"}>{"/"}</span>
            {"Contact Us"}
          </p>
          {"\n    "}
          <div className={"contact-layout"}>
            {"\n      "}
            <div className={"contact-copy"}>
              {"\n        "}
              <p className={"eyebrow"}>{"CONTACT THE BRIDGE · TYLER, TEXAS"}</p>
              {"\n        "}
              <h1 id={"contact-title"}>
                {"Your next chapter "}
                <br />
                {"can start with "}
                <br />
                <span>{"a conversation."}</span>
              </h1>
              {"\n        "}
              <p>
                {
                  "Ready to book an appointment? Reach out to our office to talk about counseling and find the right next step for you."
                }
              </p>
              {"\n        "}
              <p className={"contact-reassurance"}>
                {
                  "You don’t need to have everything figured out—or choose a counselor before you contact us."
                }
              </p>
              {"\n      "}
            </div>
            {"\n      "}
            <div className={"contact-options"}>
              {"\n        "}
              <h2>{"Let’s get you connected."}</h2>
              {"\n        "}
              <p>
                {
                  "Call or email our office to ask about therapist availability and schedule your first appointment."
                }
              </p>
              {"\n        "}
              <a className={"button"} href={"tel:9032838729"}>
                {"Call (903) 283-8729 "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
              {"\n        "}
              <a
                className={"contact-email"}
                href={"mailto:info@thebridgetherapy.com"}
              >
                {"Email info@thebridgetherapy.com"}
              </a>
              {"\n        "}
              <p className={"contact-note"}>
                {
                  "When emailing, a brief note that you’d like to get started is enough. You can discuss personal details with your counselor."
                }
              </p>
              {"\n      "}
            </div>
            {"\n    "}
          </div>
          {"\n  "}
        </section>
        {"\n  "}
        <section
          className={"contact-visit"}
          id={"location"}
          aria-labelledby={"visit-title"}
        >
          {"\n    "}
          <div>
            <p className={"eyebrow"}>{"HERE IN EAST TEXAS"}</p>
            <h2 id={"visit-title"}>{"Visit The Bridge."}</h2>
            <address>
              {"The Bridge Therapeutic Services"}
              <br />
              {"3800 Paluxy Drive, Suite 240"}
              <br />
              {"Building 2"}
              <br />
              {"Tyler, TX 75703"}
            </address>
            <a
              className={"contact-directions"}
              href={
                "https://www.google.com/maps/search/?api=1&query=The+Bridge+Therapeutic+Services+3800+Paluxy+Drive+Suite+240+Tyler+TX"
              }
              target={"_blank"}
              rel={"noopener"}
            >
              {"Get Directions "}
              <span aria-hidden={"true"}>{"↗"}</span>
            </a>
          </div>
          {"\n    "}
          <div className={"visit-note"}>
            <h3>{"Before your first visit"}</h3>
            <p>
              {
                "Contact our office to arrange your appointment and ask about anything you need to bring. We can also help with questions about finding the office."
              }
            </p>
          </div>
          {"\n  "}
        </section>
        {"\n  "}
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
              {"No. You can "}
              <a href={"/#therapists"}>{"get to know our counselors"}</a>
              {
                " first, or contact our office for help finding a fit. If you have someone in mind, mention their name when you reach out."
              }
            </p>
          </details>
          {"\n    "}
          <details>
            <summary>{"Can I use my insurance?"}</summary>
            <p>
              {
                "Contact our office about your specific plan before your appointment. We’ll help you clarify insurance participation and payment options. You can also "
              }
              <a href={"/#insurance"}>
                {"view our insurance logos on the homepage"}
              </a>
              {"."}
            </p>
          </details>
          {"\n    "}
          <details>
            <summary>{"What should I include in my first email?"}</summary>
            <p>
              {
                "Let us know you’re interested in counseling and how you’d prefer us to reach you. A short introduction is enough to begin the conversation."
              }
            </p>
          </details>
          {"\n  "}
        </section>
        {"\n"}
      </main>
    </SiteShell>
  );
}
