import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "Christian Counseling in Tyler, TX | The Bridge",
  description:
    "Christian counseling in Tyler, Texas, at The Bridge. Learn about our faith-centered approach, meet counselors, and contact our office to book an appointment.",
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
      footerId="location"
    >
      <main id={"main"} className={"service-page"}>
        <section className={"service-opening"} aria-labelledby={"page-title"}>
          <p className={"service-breadcrumb"}>
            <a href={"/"}>{"Home"}</a>
            {" / Christian Counseling"}
          </p>
          <div className={"service-hero"}>
            <div>
              <p className={"eyebrow"}>
                {"PERSONAL CARE · A CHRISTIAN PERSPECTIVE"}
              </p>
              <h1 id={"page-title"}>
                {"Christian counseling in "}
                <span>{"Tyler, Texas."}</span>
              </h1>
              <p className={"service-lead"}>
                {"Care that makes room for faith and everyday life."}
              </p>
              <p>
                {
                  "The Bridge offers Christian counseling for individuals, couples, and families in Tyler and throughout East Texas. Bring your emotional, personal, or relationship concerns and talk about how faith connects with the support you are seeking."
                }
              </p>
              <a className={"button"} href={"/contact/"}>
                {"Book an Appointment "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
              <p><a className={"service-text-link"} href={"#team-title"}>{"Meet our Christian counselors"}</a></p>
            </div>
            <figure>
              <img
                src={"/assets/individual-care.jpg"}
                alt={"A woman taking a quiet moment beside a window"}
                width={"900"}
                height={"600"}
              />
              <figcaption>
                {"Time to reflect. Support for your next step."}
              </figcaption>
            </figure>
          </div>
        </section>
        {"\n "}
        <section
          className={"individual-concerns service-section"}
          aria-labelledby={"concerns-title"}
        >
          <div className={"service-section-heading"}>
            <p className={"eyebrow"}>{"START WITH WHAT BRINGS YOU HERE"}</p>
            <h2 id={"concerns-title"}>{"Bring what matters to you."}</h2>
            <p>
              {
                "You can begin with the parts of your experience that feel most important to talk about."
              }
            </p>
          </div>
          <div className={"concern-grid"}>
            <article>
              <h3>{"Emotional & personal concerns"}</h3>
              <p>
                {
                  "Discuss the experiences that brought you here, whether you are navigating worry, loss, a difficult transition, or another concern."
                }
              </p>
            </article>
            <article>
              <h3>{"Relationships & connection"}</h3>
              <p>
                {
                  "Talk about the relationships you want to understand and the changes you hope to work toward."
                }
              </p>
            </article>
            <article>
              <h3>{"Faith & spiritual questions"}</h3>
              <p>
                {
                  "Share questions about faith, purpose, or personal values and discuss what you hope to explore in counseling."
                }
              </p>
            </article>
          </div>
        </section>
        {"\n "}
        <section
          className={"service-process service-section"}
          aria-labelledby={"process-title"}
        >
          <div>
            <p className={"eyebrow"}>{"COUNSELING THAT STARTS WITH YOU"}</p>
            <h2 id={"process-title"}>
              {"A Christian perspective."}
              <br />
              {"A conversation about your needs."}
            </h2>
            <p>
              {
                "The Bridge describes its approach as Heart-Focused Christian Counseling: biblically grounded care that emphasizes hope, purpose, and connection with God, yourself, and others. The practice places this work within a trusting relationship between counselor and client."
              }
            </p>
          </div>
          <div className={"process-points"}>
            <article>
              <h3>{"Explain what brings you in"}</h3>
              <p>
                {
                  "Talk about your concerns and what you hope will be different with support."
                }
              </p>
            </article>
            <article>
              <h3>{"Discuss the approach"}</h3>
              <p>
                {
                  "Ask your counselor how Christian faith informs their work and how prayer, scripture, or spiritual conversation may be included. Share your questions and preferences."
                }
              </p>
            </article>
            <article>
              <h3>{"Agree on goals"}</h3>
              <p>
                {
                  "Discuss the areas you want to work on and how you and your counselor will review progress together."
                }
              </p>
            </article>
          </div>
        </section>
        {"\n "}
        <section
          className={"service-section individual-team"}
          aria-labelledby={"team-title"}
        >
          <div className={"service-section-heading"}>
            <p className={"eyebrow"}>{"GET TO KNOW OUR COUNSELORS"}</p>
            <h2 id={"team-title"} tabIndex={-1} style={{ scrollMarginTop: "2rem" }}>{"Find a counselor who fits."}</h2>
            <p>
              {
                "These counselors have relevant experience. Contact our office about your needs, age group, and current appointment availability."
              }
            </p>
          </div>
          <div className={"individual-team-grid"}>
            <article>
              <img
                src={"/assets/jennifer.jpg"}
                alt={"Jennifer Wood, LPC-S"}
                width={"300"}
                height={"360"}
                loading={"lazy"}
              />
              <div>
                <h3>{"Jennifer Wood, LPC-S"}</h3>
                <p className={"service-credential"}>
                  {"Licensed Professional Counselor–Supervisor"}
                </p>
                <p>
                  {
                    "Jennifer works with adults, families, and children. Her experience includes relationship concerns, grief, depression, and spiritual issues."
                  }
                </p>
                <a
                  className={"service-text-link"}
                  href={
                    "/therapists/jennifer-wood/"
                  }
                >
                  {"Read counselor profile →"}
                </a>
              </div>
            </article>
            <article>
              <img
                src={"/assets/jill.jpg"}
                alt={"Jill Kirkley, LPC"}
                width={"300"}
                height={"360"}
                loading={"lazy"}
              />
              <div>
                <h3>{"Jill Kirkley, LPC"}</h3>
                <p className={"service-credential"}>
                  {"Licensed Professional Counselor"}
                </p>
                <p>
                  {
                    "Jill works with individual adults, including those facing life transitions, relationship concerns, spiritual questions, and ministry issues."
                  }
                </p>
                <a
                  className={"service-text-link"}
                  href={
                    "/therapists/jill-kirkley/"
                  }
                >
                  {"Read counselor profile →"}
                </a>
              </div>
            </article>
          </div>
          <a
            className={"service-text-link"}
            href={"/therapists/"}
          >
            {"View All Therapists"}
          </a>
        </section>
        {"\n "}
        <section
          className={"service-section individual-faq"}
          aria-labelledby={"faq-title"}
        >
          <h2 id={"faq-title"}>{"Questions about christian counseling"}</h2>
          <details>
            <summary>
              {"What does Christian counseling mean at The Bridge?"}
            </summary>
            <p>
              {
                "The practice’s stated approach draws on the Bible and emphasizes relationships with God, yourself, and others. Ask your counselor how this perspective shapes sessions and the work you do together. "
              }
            </p>
          </details>
          <details>
            <summary>
              {"Will prayer or scripture be part of every session?"}
            </summary>
            <p>
              {
                "Ask your counselor how they incorporate prayer or scripture and discuss your expectations before beginning. The specific approach should be part of your conversation about counselor fit."
              }
            </p>
          </details>
          <details>
            <summary>
              {"Can I ask about fit if I have questions about faith?"}
            </summary>
            <p>
              {
                "Yes. Contact the office to explain what you are looking for and ask how the practice’s Christian approach would fit your needs. You can also discuss your questions directly with a counselor."
              }
            </p>
          </details>
          <details>
            <summary>{"How do I choose a counselor?"}</summary>
            <p>
              {
                "Consider the concerns you want to address, your age group, and the counselor’s experience and approach. Our office can discuss these factors along with current appointment availability."
              }
            </p>
          </details>
          <details>
            <summary>
              {"Can I seek help for a concern that is not spiritual?"}
            </summary>
            <p>
              {
                "You can contact The Bridge about emotional, personal, and relationship concerns. Christian counseling describes the practice’s perspective; you can begin by explaining the specific issue that brought you here."
              }
            </p>
          </details>
          <details>
            <summary>{"How do I book and check insurance?"}</summary>
            <p>
              <a href={"/contact/"}>{"Contact our office"}</a>
              {
                " through the website inquiry form, conversational inquiry widget, phone, or email to ask about Christian counseling and scheduling. Ask about your counselor, specific insurance plan, and payment options before your visit."
              }
            </p>
          </details>
        </section>
        {"\n "}
        <section
          className={"service-section"}
          aria-labelledby={"related-title"}
        >
          <p className={"eyebrow"}>{"EXPLORE RELATED SUPPORT"}</p>
          <h2 id={"related-title"}>{"Find the right starting point."}</h2>
          <div className={"related-care"}>
            <a
              className={"service-text-link"}
              href={"/marriage-counseling-tyler/"}
            >
              {"Marriage & Couples Counseling →"}
            </a>
            <a
              className={"service-text-link"}
              href={"/individual-counseling-tyler/"}
            >
              {"Individual Counseling →"}
            </a>
            <a
              className={"service-text-link"}
              href={"/child-teen-counseling-tyler/"}
            >
              {"Child & Teen Counseling →"}
            </a>
          </div>
        </section>
        {"\n "}
        <section
          className={"service-booking"}
          aria-labelledby={"booking-title"}
        >
          <div>
            <p className={"eyebrow"}>{"YOUR NEXT STEP"}</p>
            <h2 id={"booking-title"}>{"Start with a conversation."}</h2>
            <p>{"Contact our Tyler office about christian counseling."}</p>
          </div>
          <a className={"button"} href={"/contact/"}>
            {"Book an Appointment "}
            <span aria-hidden={"true"}>{"→"}</span>
          </a>
        </section>
      </main>
    </SiteShell>
  );
}
