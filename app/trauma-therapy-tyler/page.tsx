import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "Trauma & PTSD Counseling in Tyler, TX | The Bridge",
  description:
    "Explore trauma and PTSD counseling at The Bridge in Tyler, Texas. Meet counselors, learn about care options including EMDR, and contact our office to book.",
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
            {" / Trauma & PTSD Counseling"}
          </p>
          <div className={"service-hero"}>
            <div>
              <p className={"eyebrow"}>
                {"PERSONAL CARE · A CHRISTIAN PERSPECTIVE"}
              </p>
              <h1 id={"page-title"}>
                {"Trauma & PTSD counseling in "}
                <span>{"Tyler, Texas."}</span>
              </h1>
              <p className={"service-lead"}>
                {"Support for the impact of difficult experiences."}
              </p>
              <p>
                {
                  "The Bridge offers Christian counseling for trauma and PTSD in Tyler and throughout East Texas. Talk with a counselor about how past experiences are affecting your life now and explore support suited to your needs."
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
                {"Room for your questions. Support for your next step."}
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
            <p className={"eyebrow"}>{"LEARN ABOUT YOUR OPTIONS"}</p>
            <h2 id={"concerns-title"}>{"Begin with what you need today."}</h2>
            <p>
              {
                "You can begin by talking about what has changed for you and the support you’re looking for."
              }
            </p>
          </div>
          <div className={"concern-grid"}>
            <article>
              <h3>{"Memories & reminders"}</h3>
              <p>
                {
                  "Talk about distressing memories or reminders of what happened and their impact on daily life."
                }
              </p>
            </article>
            <article>
              <h3>{"Feeling on edge or disconnected"}</h3>
              <p>
                {
                  "Describe changes in how you feel, respond to others, or experience your surroundings."
                }
              </p>
            </article>
            <article>
              <h3>{"Relationships & routines"}</h3>
              <p>
                {
                  "Explore concerns about trust, connection, and the routines that have become difficult."
                }
              </p>
            </article>
          </div>
          <a
            className={"service-text-link"}
            href={
              "https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd"
            }
            target={"_blank"}
            rel={"noopener"}
          >
            {"Learn about trauma and PTSD from NIMH ↗"}
          </a>
        </section>
        {"\n "}
        <section
          className={"service-process service-section"}
          aria-labelledby={"process-title"}
        >
          <div>
            <p className={"eyebrow"}>{"A STARTING POINT THAT FITS"}</p>
            <h2 id={"process-title"}>
              {"Understand the impact."}
              <br />
              {"Explore your options."}
            </h2>
            <p>
              {
                "A traumatic experience does not automatically mean someone has PTSD. A qualified professional can assess your concerns and discuss appropriate care. Our Christian perspective is part of how we approach support, with room for spiritual questions as well."
              }
            </p>
            <a className={"service-text-link"} href={"/emdr-therapy-tyler/"}>
              {"Explore EMDR Therapy →"}
            </a>
          </div>
          <div className={"process-points"}>
            <article>
              <h3>{"Share your current concerns"}</h3>
              <p>
                {
                  "Start by describing what brings you in and what feels difficult now. Discuss your questions about talking through past experiences."
                }
              </p>
            </article>
            <article>
              <h3>{"Consider the approach"}</h3>
              <p>
                {
                  "Ask your counselor about their experience, recommended approach, and whether EMDR or another form of counseling may fit your needs."
                }
              </p>
            </article>
            <article>
              <h3>{"Review goals together"}</h3>
              <p>
                {
                  "Discuss what you hope to work toward and how you and your counselor will review your needs and progress."
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
            <h2 id={"team-title"}>{"Experience you can ask about."}</h2>
            <p>
              {
                "These counselors have experience with trauma and training in EMDR. Contact our office to discuss your needs and current availability."
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
                    "Erin is trained in EMDR and works with children, adolescents, individual adults, and families. Her areas of experience include PTSD, complex trauma, anxiety, and depression."
                  }
                </p>
                <a
                  className={"service-text-link"}
                  href={
                    "https://www.thebridgetherapy.com/meet-the-team#:~:text=Erin%20Young"
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
                    "Licensed Professional Counselor Associate · Supervised by Whitney Briggs, LPC-S"
                  }
                </p>
                <p>
                  {
                    "Sarah is trained in EMDR and works with individuals and couples ages 13 and up. Her experience includes trauma, anxiety, depression, and relationship concerns."
                  }
                </p>
                <a
                  className={"service-text-link"}
                  href={
                    "https://www.thebridgetherapy.com/meet-the-team#:~:text=Sarah%20Bell"
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
          <h2 id={"faq-title"}>{"Questions about Trauma & PTSD Counseling"}</h2>
          <details>
            <summary>
              {"Do I need a PTSD diagnosis before reaching out?"}
            </summary>
            <p>
              {
                "You can contact our office without knowing how to label your experience. Ask about intake and insurance requirements when scheduling."
              }
            </p>
          </details>
          <details>
            <summary>{"Is every response to trauma PTSD?"}</summary>
            <p>
              {
                "No. People can have different reactions after traumatic experiences, and many do not develop PTSD. A qualified professional can help assess persistent concerns affecting daily life."
              }
            </p>
          </details>
          <details>
            <summary>{"Is EMDR the only option?"}</summary>
            <p>
              {
                "EMDR is one approach to treating PTSD. Talk with your counselor about available options and what may fit your needs."
              }
            </p>
          </details>
          <details>
            <summary>{"Can children and teens receive support?"}</summary>
            <p>
              {
                "Several Bridge counselors work with young people and trauma. Tell our office the young person’s age so we can discuss provider fit and availability."
              }
            </p>
          </details>
          <details>
            <summary>{"How do I book and check coverage?"}</summary>
            <p>
              <a href={"/contact/"}>{"Contact our office"}</a>
              {
                " by phone or email. Ask about your counselor, insurance plan, appointment type, and payment options before your visit."
              }
            </p>
          </details>
        </section>
        {"\n "}
        <section
          className={"service-section"}
          aria-labelledby={"related-title"}
        >
          <p className={"eyebrow"}>{"EXPLORE RELATED CARE"}</p>
          <h2 id={"related-title"}>{"Find the right starting point."}</h2>
          <div className={"related-care"}>
            <a className={"service-text-link"} href={"/emdr-therapy-tyler/"}>
              {"EMDR Therapy →"}
            </a>
            <a
              className={"service-text-link"}
              href={"/anxiety-counseling-tyler/"}
            >
              {"Anxiety Counseling →"}
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
          className={"service-booking"}
          aria-labelledby={"booking-title"}
        >
          <div>
            <p className={"eyebrow"}>{"YOUR NEXT STEP"}</p>
            <h2 id={"booking-title"}>{"Start with a conversation."}</h2>
            <p>{"Contact our Tyler office about trauma & PTSD counseling."}</p>
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
