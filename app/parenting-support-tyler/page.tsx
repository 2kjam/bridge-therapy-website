import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "Parenting Support in Tyler, TX | The Bridge",
  description:
    "Parenting support at The Bridge in Tyler, Texas. Explore counseling for parenting stress, communication, changing roles, and co-parenting. Contact our office.",
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
            <a href={"/#family-services"}>{"Counseling"}</a>
            {" / Parenting Support"}
          </p>
          <div className={"service-hero"}>
            <div>
              <p className={"eyebrow"}>
                {"PERSONAL CARE · A CHRISTIAN PERSPECTIVE"}
              </p>
              <h1 id={"page-title"}>
                {"Parenting support in "}
                <span>{"Tyler, Texas."}</span>
              </h1>
              <p className={"service-lead"}>{"Support for you as a parent."}</p>
              <p>
                {
                  "Parenting support focuses on your experiences, concerns, and responses as a parent. At The Bridge in Tyler, Christian counseling offers room to discuss the challenges of raising children and the support you need along the way."
                }
              </p>
              <a className={"button"} href={"/contact/"}>
                {"Book an Appointment "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
              <p><a className={"service-text-link"} href={"#team-title"}>{"Meet our parenting counselors"}</a></p>
            </div>
            <figure>
              <img
                src={"/assets/services/service-parenting.webp"}
                alt={"An adult and child working on an activity together"}
                width={"1440"}
                height={"1080"}
                style={{ objectPosition: "50% 60%" }}
              />
              <figcaption>{"Support for you as a parent."}</figcaption>
            </figure>
          </div>
        </section>
        {"\n "}
        <section
          className={"individual-concerns service-section"}
          aria-labelledby={"concerns-title"}
        >
          <div className={"service-section-heading"}>
            <p className={"eyebrow"}>{"WHERE WOULD YOU LIKE TO BEGIN?"}</p>
            <h2 id={"concerns-title"}>{"You need support, too."}</h2>
            <p>
              {
                "You can start by describing what has been difficult and what prompted you to seek support."
              }
            </p>
          </div>
          <div className={"concern-grid"}>
            <article>
              <h3>{"Parenting stress"}</h3>
              <p>
                {
                  "Talk about feeling overwhelmed, competing responsibilities, and the emotional demands of parenting."
                }
              </p>
            </article>
            <article>
              <h3>{"Communication & expectations"}</h3>
              <p>
                {
                  "Explore how you respond to your child, communicate expectations, and navigate differences."
                }
              </p>
            </article>
            <article>
              <h3>{"Co-parenting & growing children"}</h3>
              <p>
                {
                  "Discuss changing needs as children grow and the challenges of parenting alongside others."
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
            <p className={"eyebrow"}>{"YOUR FIRST STEP"}</p>
            <h2 id={"process-title"}>
              {"Begin with what parenting feels like for you."}
            </h2>
            <p>
              {
                "Our office can help with counselor fit and current availability. You don’t need to choose a counselor before contacting us."
              }
            </p>
            <a className={"service-text-link"} href={"/contact/"}>
              {"Talk with our office →"}
            </a>
          </div>
          <div className={"process-points"}>
            <article>
              <h3>{"Share your concerns"}</h3>
              <p>
                {
                  "Tell our office you’re looking for support as a parent and describe the questions you hope to address."
                }
              </p>
            </article>
            <article>
              <h3>{"Choose the right format"}</h3>
              <p>
                {
                  "Ask whether parent-focused sessions, family sessions, or a separate appointment for your child best fits your needs."
                }
              </p>
            </article>
            <article>
              <h3>{"Talk about your goals"}</h3>
              <p>
                {
                  "Discuss the parenting situations you find difficult and what you hope to understand or approach differently."
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
                "Explore these counselors’ areas of experience, then contact our office about your needs and appointment availability."
              }
            </p>
          </div>
          <div className={"individual-team-grid"}>
            <article>
              <img
                src={"/assets/kelley.jpg"}
                alt={"Kelley Bell, LPC"}
                width={"300"}
                height={"360"}
                loading={"lazy"}
              />
              <div>
                <h3>{"Kelley Bell, LPC"}</h3>
                <p className={"service-credential"}>
                  {"Licensed Professional Counselor"}
                </p>
                <p>
                  {
                    "Kelley supports teens and young adults through anxiety, depression, stress, grief, and family concerns. She also works with parents on the challenges of raising children."
                  }
                </p>
                <a
                  className={"service-text-link"}
                  href={
                    "/therapists/kelley-bell/"
                  }
                >
                  {"Read counselor profile →"}
                </a>
              </div>
            </article>
            <article>
              <img
                src={"/assets/alyx.jpg"}
                alt={"Alyxandrah “Alyx” White"}
                width={"300"}
                height={"360"}
                loading={"lazy"}
              />
              <div>
                <h3>{"Alyxandrah “Alyx” White"}</h3>
                <p className={"service-credential"}>
                  {"LMFT, C-DBT · Licensed Marriage and Family Therapist"}
                </p>
                <p>
                  {
                    "Alyx works with families, parent-child pairs, couples, and individual adolescents and adults. Her experience includes co-parenting, communication, and family conflict."
                  }
                </p>
                <a
                  className={"service-text-link"}
                  href={
                    "/therapists/alyxandrah-white/"
                  }
                >
                  {"Read counselor profile →"}
                </a>
              </div>
            </article>
          </div>
        </section>
        {"\n "}
        <section
          className={"service-section individual-faq"}
          aria-labelledby={"faq-title"}
        >
          <h2 id={"faq-title"}>{"Questions about parenting support"}</h2>
          <details>
            <summary>{"Does my child need to be in counseling too?"}</summary>
            <p>
              {
                "Parenting support focuses on you. Tell our office whether you are seeking help for yourself, your child, or both so we can discuss appropriate options."
              }
            </p>
          </details>
          <details>
            <summary>{"Can both parents participate?"}</summary>
            <p>
              {
                "Ask about appointments involving both parents and which counselor may be a fit for your situation."
              }
            </p>
          </details>
          <details>
            <summary>{"Is this the same as family counseling?"}</summary>
            <p>
              {
                "Parenting support centers on your role and experiences as a parent. Family counseling focuses on relationships and concerns involving family members."
              }
            </p>
          </details>
          <details>
            <summary>{"How do I book and check insurance?"}</summary>
            <p>
              <a href={"/contact/"}>{"Contact our office"}</a>
              {
                " through the website inquiry form, conversational inquiry widget, phone, or email to ask about parenting support and scheduling. Ask about coverage for your specific plan, counselor, and appointment type before your visit."
              }
            </p>
          </details>
        </section>
        {"\n "}
        <section
          className={"service-section"}
          aria-labelledby={"related-title"}
        >
          <p className={"eyebrow"}>
            {"LOOKING FOR A DIFFERENT KIND OF SUPPORT?"}
          </p>
          <h2 id={"related-title"}>{"Explore related services."}</h2>
          <div className={"related-care"}>
            <a
              className={"service-text-link"}
              href={"/adoption-counseling-tyler/"}
            >
              {"Adoption & Foster Family Support →"}
            </a>
            <a
              className={"service-text-link"}
              href={"/child-teen-counseling-tyler/"}
            >
              {"Child & Teen Counseling →"}
            </a>
            <a
              className={"service-text-link"}
              href={"/family-counseling-tyler/"}
            >
              {"Family Counseling →"}
            </a>
            <a
              className={"service-text-link"}
              href={"/individual-counseling-tyler/"}
            >
              {"Individual Counseling →"}
            </a>
          </div>
        </section>
        {"\n "}
        <section
          className={"service-section"}
          aria-labelledby={"additional-support-title"}
        >
          <p className={"eyebrow"}>{"EXPLORE RELATED SUPPORT"}</p>
          <h2 id={"additional-support-title"}>
            {"More ways to find support."}
          </h2>
          <div className={"related-care"}>
            <a className={"service-text-link"} href={"/adhd-counseling-tyler/"}>
              {"ADHD Counseling & Support →"}
            </a>
          </div>
        </section>
        <section
          className={"service-booking"}
          aria-labelledby={"booking-title"}
        >
          <div>
            <p className={"eyebrow"}>{"LET’S GET STARTED"}</p>
            <h2 id={"booking-title"}>{"Start with a conversation."}</h2>
            <p>{"Contact our Tyler office about parenting support."}</p>
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
