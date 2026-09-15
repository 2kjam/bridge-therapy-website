import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "EMDR Therapy in Tyler, TX | The Bridge",
  description:
    "Learn about EMDR therapy at The Bridge in Tyler, Texas. Meet EMDR-trained counselors, explore what sessions may involve, and contact our office about scheduling.",
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
            {" / EMDR Therapy"}
          </p>
          <div className={"service-hero"}>
            <div>
              <p className={"eyebrow"}>
                {"PERSONAL CARE · A CHRISTIAN PERSPECTIVE"}
              </p>
              <h1 id={"page-title"}>
                {"EMDR therapy in "}
                <span>{"Tyler, Texas."}</span>
              </h1>
              <p className={"service-lead"}>
                {"Understand the approach before you begin."}
              </p>
              <p>
                {
                  "EMDR stands for Eye Movement Desensitization and Reprocessing. It is a structured therapy used to treat PTSD. At The Bridge in Tyler, you can ask about working with an EMDR-trained counselor and whether this approach fits your care needs."
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
            <h2 id={"concerns-title"}>{"What does EMDR involve?"}</h2>
            <p>
              {
                "EMDR follows a structured process. These are some of the elements you can discuss with a trained counselor."
              }
            </p>
          </div>
          <div className={"concern-grid"}>
            <article>
              <h3>{"A focus on distressing memories"}</h3>
              <p>
                {
                  "EMDR involves bringing a troubling memory to mind while attending to a back-and-forth movement or sound."
                }
              </p>
            </article>
            <article>
              <h3>{"Preparation before processing"}</h3>
              <p>
                {
                  "The process includes discussing readiness and developing coping skills before working directly with trauma memories."
                }
              </p>
            </article>
            <article>
              <h3>{"An individual care plan"}</h3>
              <p>
                {
                  "Your counselor assesses fit and discusses the process with you. EMDR is one therapy option, and no single approach fits every person."
                }
              </p>
            </article>
          </div>
          <a
            className={"service-text-link"}
            href={"https://www.ptsd.va.gov/understand_tx/emdr.asp"}
            target={"_blank"}
            rel={"noopener"}
          >
            {"Read the National Center for PTSD’s guide to EMDR ↗"}
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
              {"Ask questions."}
              <br />
              {"Make an informed choice."}
            </h2>
            <p>
              {
                "Our EMDR-trained counselors can explain how they use the approach and discuss its place in your care. The Bridge’s Christian perspective remains part of the practice, and you can discuss faith and personal values with your counselor."
              }
            </p>
            <a className={"service-text-link"} href={"/trauma-therapy-tyler/"}>
              {"Explore Trauma & PTSD Counseling →"}
            </a>
          </div>
          <div className={"process-points"}>
            <article>
              <h3>{"Discuss your history and goals"}</h3>
              <p>
                {
                  "Your counselor considers your concerns and readiness for memory-focused work."
                }
              </p>
            </article>
            <article>
              <h3>{"Learn what to expect"}</h3>
              <p>
                {
                  "Ask about preparation, the session format, and how you can communicate discomfort or questions."
                }
              </p>
            </article>
            <article>
              <h3>{"Review your response"}</h3>
              <p>
                {
                  "Your counselor checks in during the process and reviews your symptoms and further care needs."
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
                    "/therapists/sarah-bell/"
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
          <h2 id={"faq-title"}>{"Questions about EMDR Therapy"}</h2>
          <details>
            <summary>{"Is EMDR the same as trauma counseling?"}</summary>
            <p>
              {
                "Trauma counseling describes the broader area of care. EMDR is a specific therapy approach that may be used within a treatment plan."
              }
            </p>
          </details>
          <details>
            <summary>
              {"Do I have to describe every detail of what happened?"}
            </summary>
            <p>
              {
                "EMDR generally does not require a detailed verbal account of the trauma, but it does involve thinking about distressing memories. Ask your counselor what that would mean for you."
              }
            </p>
          </details>
          <details>
            <summary>{"Can EMDR feel uncomfortable?"}</summary>
            <p>
              {
                "Focusing on distressing memories can bring up uncomfortable feelings. Discuss preparation, potential benefits and risks, and how your counselor will support you during sessions."
              }
            </p>
          </details>
          <details>
            <summary>{"How many sessions will I need?"}</summary>
            <p>
              {
                "Ask your counselor about a plan based on your needs. The length of treatment varies; discuss how you will review progress and decide on further sessions together."
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
            <a className={"service-text-link"} href={"/trauma-therapy-tyler/"}>
              {"Trauma & PTSD Counseling →"}
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
            <p>{"Contact our Tyler office about EMDR therapy."}</p>
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
