import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "Family Counseling in Tyler, TX | The Bridge",
  description:
    "Family counseling at The Bridge in Tyler, Texas. Explore support for communication, family conflict, co-parenting, and life changes, and contact us to book.",
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
            {" / Family Counseling"}
          </p>
          <div className={"service-hero"}>
            <div>
              <p className={"eyebrow"}>
                {"PERSONAL CARE · A CHRISTIAN PERSPECTIVE"}
              </p>
              <h1 id={"page-title"}>
                {"Family counseling in "}
                <span>{"Tyler, Texas."}</span>
              </h1>
              <p className={"service-lead"}>
                {"Make room for each other’s perspective."}
              </p>
              <p>
                {
                  "Family counseling focuses on relationships and concerns involving family members. The Bridge offers Christian family counseling in Tyler, serving families throughout East Texas who want support with communication, conflict, and changes in family life."
                }
              </p>
              <a className={"button"} href={"/contact/"}>
                {"Book an Appointment "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
            </div>
            <figure>
              <img
                src={"/assets/family-care.jpg"}
                alt={"A family walking together outdoors"}
                width={"900"}
                height={"600"}
              />
              <figcaption>
                {"Make room for each other’s perspective."}
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
            <p className={"eyebrow"}>{"WHERE WOULD YOU LIKE TO BEGIN?"}</p>
            <h2 id={"concerns-title"}>{"Work through family concerns."}</h2>
            <p>
              {
                "You can start by describing what has been difficult and what prompted you to seek support."
              }
            </p>
          </div>
          <div className={"concern-grid"}>
            <article>
              <h3>{"Communication & conflict"}</h3>
              <p>
                {
                  "Talk about misunderstandings, recurring disagreements, and how family members respond to each other."
                }
              </p>
            </article>
            <article>
              <h3>{"Changing family roles"}</h3>
              <p>
                {
                  "Explore expectations, responsibilities, and relationships as your family moves through different seasons."
                }
              </p>
            </article>
            <article>
              <h3>{"Co-parenting & transitions"}</h3>
              <p>
                {
                  "Discuss family changes and the challenges of coordinating parenting and maintaining relationships."
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
              {"Start with the relationships you want to work on."}
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
              <h3>{"Describe the concern"}</h3>
              <p>
                {
                  "Tell our office who is seeking support and what has been difficult within the family."
                }
              </p>
            </article>
            <article>
              <h3>{"Clarify who will participate"}</h3>
              <p>
                {
                  "Discuss with the counselor which family members should attend and how appointments will be structured."
                }
              </p>
            </article>
            <article>
              <h3>{"Discuss shared and individual goals"}</h3>
              <p>
                {
                  "Make room for different perspectives while considering the changes family members hope to work toward."
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
                "Explore these counselors’ areas of experience, then contact our office about your needs and appointment availability."
              }
            </p>
          </div>
          <div className={"individual-team-grid"}>
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
                    "https://www.thebridgetherapy.com/meet-the-team#:~:text=Alyxandrah%20White"
                  }
                  target={"_blank"}
                  rel={"noopener"}
                >
                  {"Read counselor profile ↗"}
                </a>
              </div>
            </article>
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
                    "Jennifer works with adults, families, and children. Her experience includes marriage and family concerns, grief, relationship patterns, and spiritual issues."
                  }
                </p>
                <a
                  className={"service-text-link"}
                  href={
                    "https://www.thebridgetherapy.com/meet-the-team#:~:text=Jennifer%20Wood"
                  }
                  target={"_blank"}
                  rel={"noopener"}
                >
                  {"Read counselor profile ↗"}
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
          <h2 id={"faq-title"}>{"Questions about family counseling"}</h2>
          <details>
            <summary>{"Does everyone in the family need to attend?"}</summary>
            <p>
              {
                "The participants depend on your concerns and the counselor’s approach. Ask our office who should attend the first appointment."
              }
            </p>
          </details>
          <details>
            <summary>
              {"How is this different from couples counseling?"}
            </summary>
            <p>
              {
                "Couples counseling focuses on the partnership. Family counseling addresses relationships involving family members, such as parents and children."
              }
            </p>
          </details>
          <details>
            <summary>
              {"What if only one family member wants counseling?"}
            </summary>
            <p>
              {
                "Contact our office to discuss options. Individual counseling can provide a separate space for your own experiences and goals."
              }
            </p>
          </details>
          <details>
            <summary>{"How do I book and check insurance?"}</summary>
            <p>
              <a href={"/contact/"}>{"Contact our office"}</a>
              {
                " by phone or email to discuss scheduling. Ask about coverage for your specific plan, counselor, and appointment type before your visit."
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
          </div>
        </section>
        {"\n "}
        <section
          className={"service-section"}
          aria-labelledby={"relationship-related-title"}
        >
          <p className={"eyebrow"}>{"EXPLORE RELATED SUPPORT"}</p>
          <h2 id={"relationship-related-title"}>
            {"Support for your next chapter."}
          </h2>
          <div className={"related-care"}>
            <a
              className={"service-text-link"}
              href={"/premarital-counseling-tyler/"}
            >
              {"Premarital & Marital Enrichment Counseling →"}
            </a>
            <a
              className={"service-text-link"}
              href={"/divorce-blended-family-counseling-tyler/"}
            >
              {"Divorce & Blended Family Counseling →"}
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
            <p>{"Contact our Tyler office about family counseling."}</p>
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
