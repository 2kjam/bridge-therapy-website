import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "Grief & Bereavement Counseling in Tyler, TX | The Bridge",
  description:
    "Grief and bereavement counseling at The Bridge in Tyler, Texas. Explore support after loss, meet counselors, and contact our office to book an appointment.",
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
            {" / Grief & Bereavement Counseling"}
          </p>
          <div className={"service-hero"}>
            <div>
              <p className={"eyebrow"}>
                {"PERSONAL CARE · A CHRISTIAN PERSPECTIVE"}
              </p>
              <h1 id={"page-title"}>
                {"Grief & bereavement counseling in "}
                <span>{"Tyler, Texas."}</span>
              </h1>
              <p className={"service-lead"}>
                {"A place to talk about who and what you miss."}
              </p>
              <p>
                {
                  "The Bridge offers Christian grief counseling in Tyler and throughout East Texas. Whether a loss is recent or continues to affect your life years later, you can talk with a counselor about your experience and the support you need."
                }
              </p>
              <a className={"button"} href={"/contact/"}>
                {"Ask About an Appointment "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
              <p><a className={"service-text-link"} href={"#team-title"}>{"Meet our grief counselors"}</a></p>
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
            <h2 id={"concerns-title"}>{"Make room for your experience."}</h2>
            <p>
              {
                "You can begin with the parts of your experience that feel most important to talk about."
              }
            </p>
          </div>
          <div className={"concern-grid"}>
            <article>
              <h3>{"The death of someone important"}</h3>
              <p>
                {
                  "Talk about the person you miss, your relationship, and what life has been like since their death."
                }
              </p>
            </article>
            <article>
              <h3>{"Daily life after loss"}</h3>
              <p>
                {
                  "Discuss changing routines, responsibilities, and relationships alongside the practical demands of everyday life."
                }
              </p>
            </article>
            <article>
              <h3>{"Memories & meaningful dates"}</h3>
              <p>
                {
                  "Make space to talk about anniversaries, family occasions, and moments that bring your loss into focus."
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
              {"Your story matters."}
              <br />
              {"Your questions belong here."}
            </h2>
            <p>
              {
                "Grief counseling offers time to talk about loss and what it means in your life. The Bridge’s Christian perspective is part of its care, with room to discuss faith, spiritual questions, and the support you find meaningful."
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
              <h3>{"Start with what you want to share"}</h3>
              <p>
                {
                  "You can begin with the loss itself or with what feels most difficult today. Tell your counselor what you hope to talk about."
                }
              </p>
            </article>
            <article>
              <h3>{"Discuss the impact"}</h3>
              <p>
                {
                  "Explore how loss is affecting relationships, daily responsibilities, and your sense of what comes next."
                }
              </p>
            </article>
            <article>
              <h3>{"Consider your support needs"}</h3>
              <p>
                {
                  "Talk together about your goals, the people and resources you can turn to, and how counseling may fit into your life."
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
                    "Jennifer works with adults, families, and children. Her experience includes grief, bereavement, loss, depression, and spiritual concerns."
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
                    "Erin works with children, adolescents, individual adults, and families. Her areas of experience include complicated grief, trauma, anxiety, and depression."
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
            {"Questions about grief & bereavement counseling"}
          </h2>
          <details>
            <summary>{"Does my loss need to be recent?"}</summary>
            <p>
              {
                "You can contact our office about a recent loss or one that still weighs on you. Tell us what kind of support you’re looking for."
              }
            </p>
          </details>
          <details>
            <summary>{"Do I need to know what to say?"}</summary>
            <p>
              {
                "You can start with a short description of what brings you in. You don’t need to prepare a complete account before contacting the office."
              }
            </p>
          </details>
          <details>
            <summary>
              {"Can children and teens receive grief counseling?"}
            </summary>
            <p>
              {
                "Several Bridge counselors work with young people and grief. Share your child’s age with our office so we can discuss counselor fit and availability."
              }
            </p>
          </details>
          <details>
            <summary>
              {"What if my loss involves a change rather than a death?"}
            </summary>
            <p>
              {
                "Tell our office about your circumstances. Life Transitions Counseling may also be a useful starting point for changes in roles, relationships, or daily life."
              }
            </p>
          </details>
          <details>
            <summary>{"How do I book and check insurance?"}</summary>
            <p>
              <a href={"/contact/"}>{"Contact our office"}</a>
              {
                " through the website inquiry form, conversational inquiry widget, phone, or email to ask about grief counseling and scheduling. Ask about your counselor, specific insurance plan, and payment options before your visit."
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
              {"Contact our Tyler office about grief & bereavement counseling."}
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
