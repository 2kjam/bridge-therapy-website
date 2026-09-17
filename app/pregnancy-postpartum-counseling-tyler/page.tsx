import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "Pregnancy & Postpartum Counseling in Tyler, TX | The Bridge",
  description:
    "Pregnancy and postpartum counseling at The Bridge in Tyler, Texas. Explore emotional support and changing family roles. Contact our office about an appointment.",
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
            {" / Pregnancy & Postpartum Counseling"}
          </p>
          <div className={"service-hero"}>
            <div>
              <p className={"eyebrow"}>
                {"PERSONAL CARE · A CHRISTIAN PERSPECTIVE"}
              </p>
              <h1 id={"page-title"}>
                {"Pregnancy & postpartum counseling in "}
                <span>{"Tyler, Texas."}</span>
              </h1>
              <p className={"service-lead"}>
                {"You deserve support in this season, too."}
              </p>
              <p>
                {
                  "The Bridge offers Christian counseling for pregnancy and postpartum concerns in Tyler and throughout East Texas. Make room to talk about your emotional well-being, changing relationships, and the adjustment to life before or after a baby arrives."
                }
              </p>
              <a className={"button"} href={"/contact/"}>
                {"Book an Appointment "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
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
            <h2 id={"concerns-title"}>{"Make room for your needs."}</h2>
            <p>
              {
                "You can begin with the parts of your experience that feel most important to talk about."
              }
            </p>
          </div>
          <div className={"concern-grid"}>
            <article>
              <h3>{"Emotions during pregnancy"}</h3>
              <p>
                {
                  "Talk about expectations, uncertainty, and the feelings that come with preparing for a baby."
                }
              </p>
            </article>
            <article>
              <h3>{"Life after birth"}</h3>
              <p>
                {
                  "Discuss your experience of the postpartum period, including feeling overwhelmed, disconnected, or unlike yourself."
                }
              </p>
            </article>
            <article>
              <h3>{"Relationships & support"}</h3>
              <p>
                {
                  "Explore changing responsibilities, communication with loved ones, and the practical and emotional support you need."
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
              {"Talk about how you feel."}
              <br />
              {"Explore the support you need."}
            </h2>
            <p>
              {
                "Your experience may be different from what you expected. Counseling offers time to talk about your concerns and priorities, with room for faith and personal values. For concerns about mood during pregnancy or after birth, also speak with your healthcare provider."
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
              <h3>{"Start with your experience"}</h3>
              <p>
                {
                  "Share what has felt difficult and what you hope to receive from counseling. You do not need to have the right words before reaching out."
                }
              </p>
            </article>
            <article>
              <h3>{"Discuss the changes"}</h3>
              <p>
                {
                  "Explore how this season is affecting your sense of self, relationships, and daily life."
                }
              </p>
            </article>
            <article>
              <h3>{"Consider care and support"}</h3>
              <p>
                {
                  "Talk about your goals and available support. Discuss medical symptoms and treatment questions with your healthcare provider alongside your counseling needs."
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
            <p className={"eyebrow"}>{"FIND YOUR STARTING POINT"}</p>
            <h2 id={"team-title"}>{"Let’s find the right support."}</h2>
            <p>
              {
                "Contact our office about pregnancy or postpartum counseling. Share the kind of support you’re looking for, and we can discuss counselor fit and current appointment options."
              }
            </p>
          </div>
          <a className={"button"} href={"/contact/"}>
            {"Contact Us "}
            <span aria-hidden={"true"}>{"→"}</span>
          </a>
        </section>
        {"\n "}
        <section
          className={"service-section individual-faq"}
          aria-labelledby={"faq-title"}
        >
          <h2 id={"faq-title"}>
            {"Questions about pregnancy & postpartum counseling"}
          </h2>
          <details>
            <summary>{"Can I start counseling during pregnancy?"}</summary>
            <p>
              {
                "You can contact our office during pregnancy or after birth. Tell us what kind of support you are seeking so we can discuss counselor fit and availability."
              }
            </p>
          </details>
          <details>
            <summary>
              {"Is postpartum depression the same as the baby blues?"}
            </summary>
            <p>
              {
                "Baby blues describes brief mood changes after birth. Severe feelings or symptoms lasting longer than two weeks may indicate postpartum depression. Contact a healthcare provider for assessment; you do not need to wait if you are concerned. "
              }
              <a
                href={
                  "https://www.nimh.nih.gov/health/publications/perinatal-depression"
                }
                target={"_blank"}
                rel={"noopener"}
              >
                {"Read NIMH’s guide to perinatal depression ↗"}
              </a>
            </p>
          </details>
          <details>
            <summary>{"Which counselor should I see?"}</summary>
            <p>
              {
                "Contact our office about your pregnancy or postpartum concerns. We can discuss the appropriate counselor and current appointment options for your needs."
              }
            </p>
          </details>
          <details>
            <summary>
              {
                "Can counseling replace my pregnancy or postpartum medical care?"
              }
            </summary>
            <p>
              {
                "Continue care with your medical provider. Discuss mood changes, physical symptoms, and medication questions with them; counseling can be one part of your support."
              }
            </p>
          </details>
          <details>
            <summary>{"What if I need urgent help?"}</summary>
            <p>
              {
                "For thoughts of suicide or a mental health crisis, call or text "
              }
              <a href={"tel:988"}>{"988"}</a>
              {". If you or your baby are in immediate danger, call "}
              <a href={"tel:911"}>{"911"}</a>
              {
                ". Hallucinations, delusions, or severe confusion after birth need emergency medical care. Do not wait for an office appointment."
              }
            </p>
          </details>
          <details>
            <summary>{"How do I book and check insurance?"}</summary>
            <p>
              <a href={"/contact/"}>{"Contact our office"}</a>
              {
                " through the website inquiry form, conversational inquiry widget, phone, or email to ask about pregnancy and postpartum counseling and scheduling. Ask about your counselor, specific insurance plan, and payment options before your visit."
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
              href={"/life-transitions-counseling-tyler/"}
            >
              {"Life Transitions Counseling →"}
            </a>
            <a
              className={"service-text-link"}
              href={"/individual-counseling-tyler/"}
            >
              {"Individual Counseling →"}
            </a>
            <a
              className={"service-text-link"}
              href={"/depression-counseling-tyler/"}
            >
              {"Depression Counseling →"}
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
            <p>
              {
                "Contact our Tyler office about pregnancy & postpartum counseling."
              }
            </p>
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
