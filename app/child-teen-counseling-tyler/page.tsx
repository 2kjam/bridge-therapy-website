import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "Child & Teen Counseling in Tyler, TX | The Bridge",
  description:
    "Explore child and teen counseling at The Bridge in Tyler, Texas. Meet counselors and ask about support for emotional, behavioral, and school-related concerns.",
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
            {" / Child & Teen Counseling"}
          </p>
          <div className={"service-hero"}>
            <div>
              <p className={"eyebrow"}>
                {"PERSONAL CARE · A CHRISTIAN PERSPECTIVE"}
              </p>
              <h1 id={"page-title"}>
                {"Child & teen counseling in "}
                <span>{"Tyler, Texas."}</span>
              </h1>
              <p className={"service-lead"}>
                {"A place for your child to be heard."}
              </p>
              <p>
                {
                  "The Bridge offers Christian counseling for children and adolescents in Tyler and throughout East Texas. Sessions focus on the young person’s emotional and behavioral concerns, with caregiver involvement discussed with their counselor."
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
                alt={"Parents and their child walking outdoors"}
                width={"900"}
                height={"600"}
              />
              <figcaption>{"A place for your child to be heard."}</figcaption>
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
            <h2 id={"concerns-title"}>{"Support through growing up."}</h2>
            <p>
              {
                "You can start by describing what has been difficult and what prompted you to seek support."
              }
            </p>
          </div>
          <div className={"concern-grid"}>
            <article>
              <h3>{"Emotions & behavior"}</h3>
              <p>
                {
                  "Talk about worry, sadness, anger, and changes you’ve noticed in your child’s behavior."
                }
              </p>
            </article>
            <article>
              <h3>{"School & social pressures"}</h3>
              <p>
                {
                  "Discuss stress, relationships, and the challenges your child or teen encounters while growing up."
                }
              </p>
            </article>
            <article>
              <h3>{"Grief & changes at home"}</h3>
              <p>
                {
                  "Find a place to talk about loss, transitions, and changes affecting your child."
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
              {"Begin with your child’s age and what you’ve noticed."}
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
              <h3>{"Find an age-appropriate fit"}</h3>
              <p>
                {
                  "Tell our office your child’s age and the concerns prompting you to reach out. Counselors work with different age groups."
                }
              </p>
            </article>
            <article>
              <h3>{"Prepare for the first visit"}</h3>
              <p>
                {
                  "Ask who should attend, what information to bring, and what consent or paperwork is needed."
                }
              </p>
            </article>
            <article>
              <h3>{"Discuss caregiver involvement"}</h3>
              <p>
                {
                  "Ask the counselor how you will be involved, how progress is discussed, and how privacy works for your child or teen."
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
                src={"/assets/denise.jpg"}
                alt={"Denise Santos, LPC"}
                width={"300"}
                height={"360"}
                loading={"lazy"}
              />
              <div>
                <h3>{"Denise Santos, LPC"}</h3>
                <p className={"service-credential"}>
                  {"Licensed Professional Counselor"}
                </p>
                <p>
                  {
                    "Denise works with children, adolescents, and adults. Her experience includes anxiety, depression, anger, grief, and unexpected life transitions."
                  }
                </p>
                <a
                  className={"service-text-link"}
                  href={
                    "/therapists/denise-santos/"
                  }
                >
                  {"Read counselor profile →"}
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
          </div>
        </section>
        {"\n "}
        <section
          className={"service-section individual-faq"}
          aria-labelledby={"faq-title"}
        >
          <h2 id={"faq-title"}>{"Questions about child & teen counseling"}</h2>
          <details>
            <summary>{"What ages do your counselors see?"}</summary>
            <p>
              {
                "Age ranges vary by counselor. Contact our office with your child’s age so we can discuss fit and current availability."
              }
            </p>
          </details>
          <details>
            <summary>{"Will I attend sessions with my child?"}</summary>
            <p>
              {
                "Ask the counselor how caregiver involvement will work for your child’s age, needs, and appointment type."
              }
            </p>
          </details>
          <details>
            <summary>{"Do you use play or art in sessions?"}</summary>
            <p>
              {
                "Ask our office whether a counselor uses play or art techniques appropriate to your child’s needs. Our office can help you find out which approaches a counselor offers."
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
              href={"/family-counseling-tyler/"}
            >
              {"Family Counseling →"}
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
            <p>{"Contact our Tyler office about child & teen counseling."}</p>
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
