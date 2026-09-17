import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "ADHD Counseling & Support in Tyler, TX | The Bridge",
  description:
    "ADHD counseling and support in Tyler, Texas. Meet Bridge counselors and explore support for attention, routines, and relationships. Contact us to book an appointment.",
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
            {" / "}
            <a href={"/individual-counseling-tyler/"}>
              {"Individual Counseling"}
            </a>
            {" / ADHD Counseling & Support"}
          </p>
          <div className={"service-hero"}>
            <div>
              <p className={"eyebrow"}>
                {"PERSONAL CARE · A CHRISTIAN PERSPECTIVE"}
              </p>
              <h1 id={"page-title"}>
                {"ADHD counseling & support in "}
                <span>{"Tyler, Texas."}</span>
              </h1>
              <p className={"service-lead"}>
                {"Support for the demands of everyday life."}
              </p>
              <p>
                {
                  "The Bridge offers Christian counseling and support for ADHD concerns in Tyler and throughout East Texas. Talk about attention, organization, follow-through, and the impact these difficulties can have at home, school, work, or in relationships."
                }
              </p>
              <a className={"button"} href={"/contact/"}>
                {"Book an Appointment "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
              <p><a className={"service-text-link"} href={"#team-title"}>{"Meet our ADHD counselors"}</a></p>
            </div>
            <figure>
              <img
                src={"/assets/services/service-adhd.webp"}
                alt={"Hands shaping clay on a pottery wheel"}
                width={"1440"}
                height={"1080"}
                style={{ objectPosition: "50% 65%" }}
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
            <h2 id={"concerns-title"}>{"Start with everyday challenges."}</h2>
            <p>
              {
                "You can begin with the parts of your experience that feel most important to talk about."
              }
            </p>
          </div>
          <div className={"concern-grid"}>
            <article>
              <h3>{"Attention & follow-through"}</h3>
              <p>
                {
                  "Discuss tasks that are hard to begin, stay with, or finish, and the situations where you most want support."
                }
              </p>
            </article>
            <article>
              <h3>{"Routines & responsibilities"}</h3>
              <p>
                {
                  "Explore everyday challenges with organizing tasks, managing time, and keeping up with expectations."
                }
              </p>
            </article>
            <article>
              <h3>{"Relationships & frustration"}</h3>
              <p>
                {
                  "Talk about misunderstandings, frustration, and how these experiences affect the way you see yourself and relate to others."
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
              {"Understand your challenges."}
              <br />
              {"Work toward practical goals."}
            </h2>
            <p>
              {
                "ADHD can involve persistent difficulties with attention, hyperactivity, or impulsivity that interfere with daily life. Similar difficulties can have other causes, so a qualified professional should assess them. Counseling support can focus on the challenges and goals that matter to you."
              }
            </p>
            <a
              className={"service-text-link"}
              href={"/christian-counseling-tyler/"}
            >
              {"Learn about Christian counseling"}
            </a>
          </div>
          <div className={"process-points"}>
            <article>
              <h3>{"Describe what gets in the way"}</h3>
              <p>
                {
                  "Share examples from home, school, work, or relationships, along with any previous diagnosis or care."
                }
              </p>
            </article>
            <article>
              <h3>{"Choose a starting point"}</h3>
              <p>
                {
                  "Work with your counselor to identify the routines, responsibilities, or relationship concerns you want to address."
                }
              </p>
            </article>
            <article>
              <h3>{"Review what is helping"}</h3>
              <p>
                {
                  "Discuss approaches to daily challenges, reflect on your progress, and adjust your goals together."
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
                src={"/assets/erin.jpg"}
                alt={"Erin Young, LCSW-S"}
                width={"300"}
                height={"360"}
                loading={"lazy"}
              />
              <div>
                <h3>{"Erin Young, LCSW-S"}</h3>
                <p className={"service-credential"}>
                  {"Licensed Clinical Social Worker–Supervisor"}
                </p>
                <p>
                  {
                    "Erin’s areas of experience include ADD/ADHD. She works with children, adolescents, individual adults, and families."
                  }
                </p>
                <a
                  className={"service-text-link"}
                  href={
                    "/therapists/erin-young/"
                  }
                >
                  {"Read counselor profile →"}
                </a>
              </div>
            </article>
            <article>
              <img
                src={"/assets/sarah-bell.jpg"}
                alt={"Sarah Bell, LPC-A"}
                width={"300"}
                height={"360"}
                loading={"lazy"}
              />
              <div>
                <h3>{"Sarah Bell, LPC-A"}</h3>
                <p className={"service-credential"}>
                  {
                    "Licensed Professional Counselor–Associate · Supervised by Whitney Briggs, LPC-S"
                  }
                </p>
                <p>
                  {
                    "Sarah works with people ages 13 and older. Her experience includes ADHD, anxiety, and relationship concerns."
                  }
                </p>
                <a
                  className={"service-text-link"}
                  href={
                    "/therapists/sarah-bell/"
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
          <h2 id={"faq-title"}>
            {"Questions about adhd counseling & support"}
          </h2>
          <details>
            <summary>{"Do you work with adults as well as children?"}</summary>
            <p>
              {
                "Erin works with children, adolescents, individual adults, and families. Sarah Bell works with people ages 13 and older. Contact our office about age, counselor fit, and availability."
              }
            </p>
          </details>
          <details>
            <summary>
              {"Do I need an ADHD diagnosis before reaching out?"}
            </summary>
            <p>
              {
                "You can contact the office to discuss your concerns and ask about appropriate next steps. Attention difficulties alone do not establish an ADHD diagnosis."
              }
            </p>
          </details>
          <details>
            <summary>
              {"Is this the same as ADHD testing or a diagnostic evaluation?"}
            </summary>
            <p>
              {
                "This page describes counseling support. If you need a diagnostic evaluation, formal testing, or documentation, ask our office specifically about the service and professional required before scheduling."
              }
            </p>
          </details>
          <details>
            <summary>{"Does this include medication management?"}</summary>
            <p>
              {
                "Discuss medication decisions with a qualified prescribing healthcare professional. When contacting The Bridge, explain whether you are seeking counseling, an evaluation, or medication care so the next step is clear."
              }
            </p>
          </details>
          <details>
            <summary>{"Where can I learn more about ADHD?"}</summary>
            <p>
              {"The "}
              <a
                href={
                  "https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd"
                }
                target={"_blank"}
                rel={"noopener"}
              >
                {"National Institute of Mental Health’s ADHD overview ↗"}
              </a>
              {
                " explains symptoms, assessment, and care options. Your care needs should be discussed with a qualified professional."
              }
            </p>
          </details>
          <details>
            <summary>{"How do I book and check insurance?"}</summary>
            <p>
              <a href={"/contact/"}>{"Contact our office"}</a>
              {
                " through the website inquiry form, conversational inquiry widget, phone, or email to ask about ADHD counseling and support and scheduling. Ask about your counselor, specific insurance plan, and payment options before your visit."
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
              href={"/parenting-support-tyler/"}
            >
              {"Parenting Support →"}
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
            <p>{"Contact our Tyler office about adhd counseling & support."}</p>
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
