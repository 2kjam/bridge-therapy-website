import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "Divorce & Blended Family Counseling in Tyler, TX | The Bridge",
  description:
    "Divorce and blended family counseling in Tyler, Texas. Explore support for separation, co-parenting, and changing family roles. Contact The Bridge to book.",
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
            {" / Divorce & Blended Family Counseling"}
          </p>
          <div className={"service-hero"}>
            <div>
              <p className={"eyebrow"}>
                {"PERSONAL CARE · A CHRISTIAN PERSPECTIVE"}
              </p>
              <h1 id={"page-title"}>
                {"Divorce & blended family counseling in "}
                <span>{"Tyler, Texas."}</span>
              </h1>
              <p className={"service-lead"}>
                {"Find support as family life changes."}
              </p>
              <p>
                {
                  "The Bridge offers Christian counseling for divorce and blended family concerns in Tyler and throughout East Texas. Talk about separation, co-parenting, remarriage, or the adjustment to new family roles with a counselor who can help you explore your needs."
                }
              </p>
              <a className={"button"} href={"/contact/"}>
                {"Ask About an Appointment "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
              <p><a className={"service-text-link"} href={"#team-title"}>{"Meet our divorce & blended family counselors"}</a></p>
            </div>
            <figure>
              <img
                src={"/assets/family-care.jpg"}
                alt={"A family walking together outdoors"}
                width={"900"}
                height={"600"}
              />
              <figcaption>
                {"Support through changing family relationships."}
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
            <h2 id={"concerns-title"}>{"Navigate a changing family."}</h2>
            <p>
              {
                "You can begin with the parts of your experience that feel most important to talk about."
              }
            </p>
          </div>
          <div className={"concern-grid"}>
            <article>
              <h3>{"Separation & divorce"}</h3>
              <p>
                {
                  "Make room to discuss loss, uncertainty, and the effect of a changing relationship on your daily life."
                }
              </p>
            </article>
            <article>
              <h3>{"Co-parenting communication"}</h3>
              <p>
                {
                  "Explore communication about children, expectations, and boundaries as parenting responsibilities change."
                }
                {" You can also explore "}<a href="/parenting-support-tyler/">parenting support</a>{"."}
              </p>
            </article>
            <article>
              <h3>{"Blended family relationships"}</h3>
              <p>
                {
                  "Talk about stepparent roles, different household routines, and the time and conversations involved in building new relationships."
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
              {"Understand your needs."}
              <br />
              {"Consider your next steps."}
            </h2>
            <p>
              {
                "Family change can bring different concerns for each person involved. Counseling provides space to discuss those experiences and the relationships you want to work on, with room for questions about faith and personal values."
              }
              {" If a younger family member needs their own space to talk, explore "}<a href="/child-teen-counseling-tyler/">support for children and teens</a>{"."}
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
              <h3>{"Describe your situation"}</h3>
              <p>
                {
                  "Share what is changing and who is looking for support. Your counselor can discuss whether individual, couple, or family sessions fit your needs."
                }
              </p>
            </article>
            <article>
              <h3>{"Identify the difficult conversations"}</h3>
              <p>
                {
                  "Explore expectations, boundaries, and recurring disagreements, including concerns about how children are experiencing the change."
                }
              </p>
            </article>
            <article>
              <h3>{"Set practical goals"}</h3>
              <p>
                {
                  "Work with your counselor to choose priorities for communication, family roles, and your own support needs."
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
                src={"/assets/alyx.jpg"}
                alt={"Alyxandrah White, LMFT, C-DBT"}
                width={"300"}
                height={"360"}
                loading={"lazy"}
              />
              <div>
                <h3>{"Alyxandrah White, LMFT, C-DBT"}</h3>
                <p className={"service-credential"}>
                  {"Licensed Marriage and Family Therapist"}
                </p>
                <p>
                  {
                    "Alyx works with couples, co-parents, and family groups. Her profile lists Prepare Enrich certification and experience with communication and family conflict."
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
                    "Jennifer works with adults, families, and children. Her experience includes marriage and family concerns, relationship patterns, grief, and loss."
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
            {"Questions about divorce & blended family counseling"}
          </h2>
          <details>
            <summary>{"Can I seek support on my own?"}</summary>
            <p>
              {
                "You can contact our office about your own experience of divorce or family change. You do not need to arrange for the whole family to attend before asking about individual support."
              }
            </p>
          </details>
          <details>
            <summary>
              {"Who should attend family or co-parenting sessions?"}
            </summary>
            <p>
              {
                "Explain your circumstances when you contact the office. The counselor can discuss who should participate and what information is needed before arranging sessions."
              }
            </p>
          </details>
          <details>
            <summary>{"Can children and teens get their own support?"}</summary>
            <p>
              {
                "The Bridge has counselors who work with children and adolescents. Share your child’s age and concerns with our office and ask about Child & Teen Counseling."
              }
            </p>
          </details>
          <details>
            <summary>
              {"What if we are blending families without a recent divorce?"}
            </summary>
            <p>
              {
                "You can seek support for remarriage, stepparent roles, or changing household relationships regardless of when a previous relationship ended. Tell us what feels difficult in your family now."
              }
            </p>
          </details>
          <details>
            <summary>{"How do I book and check insurance?"}</summary>
            <p>
              <a href={"/contact/"}>{"Contact our office"}</a>
              {
                " through the website inquiry form, conversational inquiry widget, phone, or email to ask about divorce and blended family counseling and scheduling. Ask about your counselor, specific insurance plan, and payment options before your visit."
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
              href={"/premarital-counseling-tyler/"}
            >
              {"Premarital & Marital Enrichment Counseling →"}
            </a>
            <a
              className={"service-text-link"}
              href={"/marriage-counseling-tyler/"}
            >
              {"Marriage & Couples Counseling →"}
            </a>
            <a
              className={"service-text-link"}
              href={"/family-counseling-tyler/"}
            >
              {"Family Counseling →"}
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
                "Contact our Tyler office about divorce & blended family counseling."
              }
            </p>
          </div>
          <a className={"button"} href={"/contact/"}>
            {"Ask About an Appointment "}
            <span aria-hidden={"true"}>{"→"}</span>
          </a>
        </section>
      </main>
    </SiteShell>
  );
}
