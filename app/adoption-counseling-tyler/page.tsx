import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "Adoption & Foster Family Support in Tyler, TX | The Bridge",
  description:
    "Adoption counseling and foster family support in Tyler, Texas. Explore family adjustment, relationships, and parent support. Contact The Bridge about counseling.",
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
            <a href={"/family-counseling-tyler/"}>{"Family Counseling"}</a>
            {" / Adoption & Foster Family Support"}
          </p>
          <div className={"service-hero"}>
            <div>
              <p className={"eyebrow"}>
                {"PERSONAL CARE · A CHRISTIAN PERSPECTIVE"}
              </p>
              <h1 id={"page-title"}>
                {"Adoption & foster family support in "}
                <span>{"Tyler, Texas."}</span>
              </h1>
              <p className={"service-lead"}>
                {"Space for every part of your family’s story."}
              </p>
              <p>
                {
                  "The Bridge offers Christian counseling for adoption concerns in Tyler and throughout East Texas. Families navigating adoption or foster care can contact our office about emotional support, changing relationships, and counselor fit for their circumstances."
                }
              </p>
              <a className={"button"} href={"/contact/"}>
                {"Book an Appointment "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
            </div>
            <figure>
              <img
                src="/assets/services/service-adoption.webp"
                srcSet="/assets/services/service-adoption-480.webp 480w, /assets/services/service-adoption-800.webp 800w, /assets/services/service-adoption.webp 1440w"
                sizes="(max-width: 900px) 90vw, 45vw"
                alt="A woman and a girl reading together on the floor"
                width="1440"
                height="1080"
                style={{ objectPosition: "50% 50%", height: "auto" }}
              />
              <figcaption>
                {"Support for changing family relationships."}
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
            <h2 id={"concerns-title"}>{"Your family’s story matters."}</h2>
            <p>
              {
                "You can begin with the parts of your experience that feel most important to talk about."
              }
            </p>
          </div>
          <div className={"concern-grid"}>
            <article>
              <h3>{"Family changes & adjustment"}</h3>
              <p>
                {
                  "Discuss new routines, changing responsibilities, and the expectations each person brings to family life."
                }
              </p>
            </article>
            <article>
              <h3>{"Identity, belonging & loss"}</h3>
              <p>
                {
                  "Make room for questions about personal history, important relationships, and the feelings you or your child want to explore."
                }
              </p>
            </article>
            <article>
              <h3>{"Support for parents & caregivers"}</h3>
              <p>
                {
                  "Talk about your own concerns, communication, and the support you need as you care for your family."
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
              {"Begin with your story."}
              <br />
              {"Discuss what your family needs."}
            </h2>
            <p>
              {
                "Adoption and foster care experiences differ from one person and family to another. Tell your counselor what matters in your circumstances, including the relationships and questions you want to discuss. Our Christian perspective also makes room for faith and personal values."
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
              <h3>{"Share your circumstances"}</h3>
              <p>
                {
                  "Describe who is seeking support and the changes or concerns that brought you here."
                }
              </p>
            </article>
            <article>
              <h3>{"Consider who should attend"}</h3>
              <p>
                {
                  "Discuss individual, parent, or family counseling with the office and counselor. Ask what information is needed before arranging a child’s sessions."
                }
              </p>
            </article>
            <article>
              <h3>{"Choose a starting point"}</h3>
              <p>
                {
                  "Work with your counselor to identify the conversations and goals that are most useful for your family now."
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
            <h2 id={"team-title"}>{"Find a counselor who fits."}</h2>
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
                    "Erin has professional experience in foster care and adoption services. She works with children, adolescents, individual adults, and families."
                  }
                </p>
                <a
                  className={"service-text-link"}
                  href={"/therapists/erin-young/"}
                >
                  {"Read counselor profile →"}
                </a>
              </div>
            </article>
            <article>
              <img
                src={"/assets/kim.jpg"}
                alt={"Kim Gonzales, LMSW"}
                width={"300"}
                height={"360"}
                loading={"lazy"}
              />
              <div>
                <h3>{"Kim Gonzales, LMSW"}</h3>
                <p className={"service-credential"}>
                  {
                    "Licensed Master Social Worker · Supervised by Erin Young, LCSW-S"
                  }
                </p>
                <p>
                  {
                    "Kim supports women with parenting and relationship concerns. Her background includes personal experience as a foster parent."
                  }
                </p>
                <a
                  className={"service-text-link"}
                  href={"/therapists/kim-gonzales/"}
                >
                  {"Read counselor profile →"}
                </a>
              </div>
            </article>
          </div>
          <a className={"service-text-link"} href={"/therapists/"}>
            {"View All Therapists"}
          </a>
        </section>
        {"\n "}
        <section
          className={"service-section individual-faq"}
          aria-labelledby={"faq-title"}
        >
          <h2 id={"faq-title"}>
            {"Questions about adoption & foster family support"}
          </h2>
          <details>
            <summary>{"Can foster families contact The Bridge?"}</summary>
            <p>
              {
                "Yes. Erin’s professional background includes foster care and adoption services. Contact the office about your family’s needs, counselor fit, and current availability."
              }
            </p>
          </details>
          <details>
            <summary>{"Can a parent receive support on their own?"}</summary>
            <p>
              {
                "You can ask about counseling for your own experience as a parent or caregiver. Tell the office whether you are looking for support for yourself, a child, or the family."
              }
            </p>
          </details>
          <details>
            <summary>{"Do you work with children and teens?"}</summary>
            <p>
              {
                "Erin works with children and adolescents as well as adults and families. Share your child’s age and circumstances with the office so we can discuss appropriate next steps."
              }
            </p>
          </details>
          <details>
            <summary>
              {"Does this include home studies or adoption placement?"}
            </summary>
            <p>
              {
                "This page describes counseling support. If you need a home study, placement service, or agency-required evaluation, ask about that specific service before scheduling; a counseling appointment does not establish that it is provided."
              }
            </p>
          </details>
          <details>
            <summary>{"What should I mention when booking?"}</summary>
            <p>
              {
                "Tell us who needs support, their age, and whether you are seeking individual or family counseling. For a child in foster care, ask the office what authorization and documentation it needs before scheduling."
              }
            </p>
          </details>
          <details>
            <summary>{"How do I book and check insurance?"}</summary>
            <p>
              <a href="/contact/">Contact our office</a> through the website
              inquiry form, conversational inquiry widget, phone, or email to
              ask about adoption and foster family support and scheduling.
              Self-pay is available alongside insurance. Check with our office
              about participation for your counselor, plan, and appointment
              type.
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
              href={"/family-counseling-tyler/"}
            >
              {"Family Counseling →"}
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
            <p>
              {
                "Contact our Tyler office about adoption & foster family support."
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
