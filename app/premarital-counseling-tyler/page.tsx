import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "Premarital & Marital Enrichment Counseling in Tyler, TX | The Bridge",
  description:
    "Christian premarital and marital enrichment counseling in Tyler, Texas. Explore expectations, communication, and shared goals. Book an appointment at The Bridge.",
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
            <a href={"/marriage-counseling-tyler/"}>
              {"Marriage & Couples Counseling"}
            </a>
            {" / Premarital & Marital Enrichment Counseling"}
          </p>
          <div className={"service-hero"}>
            <div>
              <p className={"eyebrow"}>
                {"PERSONAL CARE · A CHRISTIAN PERSPECTIVE"}
              </p>
              <h1 id={"page-title"}>
                {"Premarital & marital enrichment counseling in "}
                <span>{"Tyler, Texas."}</span>
              </h1>
              <p className={"service-lead"}>
                {"Build a marriage with intention."}
              </p>
              <p>
                {
                  "The Bridge offers Christian premarital and marital enrichment counseling for couples in Tyler and throughout East Texas. Whether you’re preparing for marriage or investing in the relationship you already share, make time to discuss your expectations, priorities, and life together."
                }
              </p>
              <a className={"button"} href={"/contact/"}>
                {"Book an Appointment "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
            </div>
            <figure>
              <img
                src={"/assets/couples-care.jpg"}
                alt={"Two people sitting together on a sofa"}
                width={"900"}
                height={"600"}
              />
              <figcaption>{"Make time for your relationship."}</figcaption>
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
            <h2 id={"concerns-title"}>{"Make space for each other."}</h2>
            <p>
              {
                "You can begin with the parts of your experience that feel most important to talk about."
              }
            </p>
          </div>
          <div className={"concern-grid"}>
            <article>
              <h3>{"Preparing for marriage"}</h3>
              <p>
                {
                  "Talk about the expectations each of you brings to marriage, including money, family relationships, responsibilities, and faith."
                }
              </p>
            </article>
            <article>
              <h3>{"Investing in your connection"}</h3>
              <p>
                {
                  "Set aside time to discuss what is working, where you feel distant, and how you want to care for your relationship."
                }
              </p>
            </article>
            <article>
              <h3>{"Planning a shared future"}</h3>
              <p>
                {
                  "Explore decisions about work, home, parenting, and changing priorities while making room for both perspectives."
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
              {"Talk openly."}
              <br />
              {"Plan together."}
            </h2>
            <p>
              {
                "Counseling offers a setting for conversations that can be easy to postpone. With a Christian perspective, you and your counselor can explore your values and the relationship you want to build."
              }
            </p>
            <a
              className={"service-text-link"}
              href={"https://www.thebridgetherapy.com/what-we-believe"}
              target={"_blank"}
              rel={"noopener"}
            >
              {"Read about our beliefs ↗"}
            </a>
          </div>
          <div className={"process-points"}>
            <article>
              <h3>{"Share your expectations"}</h3>
              <p>
                {
                  "Each partner can describe what they hope for and the topics they would like to discuss."
                }
              </p>
            </article>
            <article>
              <h3>{"Explore how you communicate"}</h3>
              <p>
                {
                  "Look at how you listen, express needs, and respond when you disagree. Discuss patterns you want to understand."
                }
              </p>
            </article>
            <article>
              <h3>{"Choose goals together"}</h3>
              <p>
                {
                  "Identify priorities for your relationship and conversations you want to continue between sessions."
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
                    "Kelley works with young married couples on marriages centered around the Lord. Her experience also includes supporting parents, teens, and young adults."
                  }
                </p>
                <a
                  className={"service-text-link"}
                  href={
                    "https://www.thebridgetherapy.com/meet-the-team#:~:text=Kelley%20Bell"
                  }
                  target={"_blank"}
                  rel={"noopener"}
                >
                  {"Read counselor profile ↗"}
                </a>
              </div>
            </article>
          </div>
          <a
            className={"service-text-link"}
            href={"https://www.thebridgetherapy.com/meet-the-team"}
            target={"_blank"}
            rel={"noopener"}
          >
            {"View All Therapists ↗"}
          </a>
        </section>
        {"\n "}
        <section
          className={"service-section individual-faq"}
          aria-labelledby={"faq-title"}
        >
          <h2 id={"faq-title"}>
            {"Questions about premarital & marital enrichment counseling"}
          </h2>
          <details>
            <summary>{"Is this only for engaged couples?"}</summary>
            <p>
              {
                "Premarital counseling focuses on preparing for marriage. Marital enrichment offers existing married couples time to reflect on and invest in their relationship. Tell our office which type of support you’re seeking."
              }
            </p>
          </details>
          <details>
            <summary>{"Do we need to be having serious problems?"}</summary>
            <p>
              {
                "You can reach out to prepare for marriage or strengthen your connection without waiting for a particular problem. If ongoing conflict is your main concern, you can also explore our Marriage & Couples Counseling page."
              }
            </p>
          </details>
          <details>
            <summary>{"Does The Bridge offer Prepare Enrich?"}</summary>
            <p>
              {
                "Alyx’s current counselor profile lists Prepare Enrich certification. Ask our office about working with her and whether this approach is available and appropriate for your goals."
              }
            </p>
          </details>
          <details>
            <summary>{"How many sessions should we plan for?"}</summary>
            <p>
              {
                "Discuss your goals, wedding timeline if relevant, and scheduling needs with the office and counselor. The number and frequency of sessions depend on the care you arrange."
              }
            </p>
          </details>
          <details>
            <summary>{"How do I book and check insurance?"}</summary>
            <p>
              <a href={"/contact/"}>{"Contact our office"}</a>
              {
                " by phone or email to discuss scheduling. Ask about your counselor, specific insurance plan, and payment options before your visit."
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
              href={"/divorce-blended-family-counseling-tyler/"}
            >
              {"Divorce & Blended Family Counseling →"}
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
                "Contact our Tyler office about premarital & marital enrichment counseling."
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
