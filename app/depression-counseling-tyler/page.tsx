import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "Depression Counseling in Tyler, TX | The Bridge",
  description:
    "Explore Christian depression counseling at The Bridge in Tyler, Texas. Meet counselors, learn what to expect, and contact our office to book an appointment.",
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
        {"\n"}
        <section
          className={"service-opening"}
          aria-labelledby={"depression-title"}
        >
          <p className={"service-breadcrumb"}>
            <a href={"/"}>{"Home"}</a>
            {" / "}
            <a href={"/individual-counseling-tyler/"}>
              {"Individual Counseling"}
            </a>
            {" / Depression Counseling"}
          </p>
          <div className={"service-hero"}>
            <div>
              <p className={"eyebrow"}>{"SUPPORT THROUGH DIFFICULT DAYS"}</p>
              <h1 id={"depression-title"}>
                {"Depression counseling in "}
                <span>{"Tyler, Texas."}</span>
              </h1>
              <p className={"service-lead"}>
                {"You don’t have to put on a brave face here."}
              </p>
              <p>
                {
                  "The Bridge offers Christian counseling for depression in Tyler and throughout East Texas. Talk with a counselor about how you’ve been feeling, what daily life has been like, and the support you’re looking for."
                }
              </p>
              <a className={"button"} href={"/contact/"}>
                {"Book an Appointment "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
              <p>
                <a
                  className={"service-text-link"}
                  href={"#depression-team-title"}
                >
                  {"Meet our depression counselors"}
                </a>
              </p>
            </div>
            <figure>
              <img
                src={"/assets/individual-care.jpg"}
                alt={"A woman taking a quiet moment by a window"}
                width={"900"}
                height={"600"}
              />
              <figcaption>{"Time to talk. Room to be honest."}</figcaption>
            </figure>
          </div>
        </section>
        {"\n"}
        <section
          className={"individual-concerns service-section"}
          aria-labelledby={"concerns-title"}
        >
          <div className={"service-section-heading"}>
            <p className={"eyebrow"}>{"BEGIN WITH WHAT YOU’RE EXPERIENCING"}</p>
            <h2 id={"concerns-title"}>{"When everyday life feels heavy."}</h2>
            <p>
              {
                "You may have a name for what you’re experiencing, or simply know that things haven’t felt like they used to. You can begin by describing what has changed for you."
              }
            </p>
          </div>
          <div className={"concern-grid"}>
            <article>
              <h3>{"Feeling low or disconnected"}</h3>
              <p>
                {
                  "Talk about sadness, discouragement, or feeling distant from people and activities that matter to you."
                }
              </p>
            </article>
            <article>
              <h3>{"Difficulty with daily routines"}</h3>
              <p>
                {
                  "Describe how you’ve been managing responsibilities, relationships, and the demands of everyday life."
                }
              </p>
            </article>
            <article>
              <h3>{"Not knowing how to explain it"}</h3>
              <p>
                {
                  "Make space for feelings that are hard to put into words and questions about what kind of support you need."
                }
              </p>
            </article>
          </div>
        </section>
        {"\n"}
        <section
          className={"service-process service-section"}
          aria-labelledby={"process-title"}
        >
          <div>
            <p className={"eyebrow"}>
              {"PERSONAL CARE · A CHRISTIAN PERSPECTIVE"}
            </p>
            <h2 id={"process-title"}>{"Start where you are."}</h2>
            <p>
              {
                "Your counselor can discuss your concerns and goals with you, along with an approach suited to your needs. The Bridge’s Christian perspective is part of its care, with room to talk about spiritual concerns and how faith relates to your experience."
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
              <h3>{"Describe what has changed"}</h3>
              <p>
                {
                  "Share what prompted you to seek support, how long things have felt difficult, and the impact on your life."
                }
              </p>
            </article>
            <article>
              <h3>{"Talk about your goals"}</h3>
              <p>
                {
                  "Discuss what you hope to understand or work toward, even if your first goal is simply finding a place to talk."
                }
              </p>
            </article>
            <article>
              <h3>{"Consider your care needs"}</h3>
              <p>
                {
                  "Ask your counselor what sessions may involve and whether other professional support may be appropriate alongside counseling."
                }
              </p>
            </article>
          </div>
        </section>
        {"\n"}
        <section
          className={"service-section individual-team"}
          aria-labelledby={"depression-team-title"}
        >
          <div className={"service-section-heading"}>
            <p className={"eyebrow"}>{"GET TO KNOW OUR COUNSELORS"}</p>
            <h2
              id={"depression-team-title"}
              tabIndex={-1}
              style={{ scrollMarginTop: "2rem" }}
            >
              {"Experience working with depression."}
            </h2>
            <p>
              {
                "These are two of the counselors whose experience includes depression. Contact our office to discuss your needs, age group, and appointment availability."
              }
            </p>
          </div>
          <div className={"individual-team-grid"}>
            <article>
              <img
                src={"/assets/jennifer.jpg"}
                alt={"Jennifer Wood"}
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
                    "Jennifer works with adults, families, and children. Her experience includes depression, grief and loss, relationship patterns, and spiritual concerns."
                  }
                </p>
                <a
                  className={"service-text-link"}
                  href={"/therapists/jennifer-wood/"}
                >
                  {"More about Jennifer →"}
                </a>
              </div>
            </article>
            <article>
              <img
                src={"/assets/denise.jpg"}
                alt={"Denise Santos"}
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
                    "Denise works with children, adolescents, and adults. Her experience includes depression, anxiety, grief, and unexpected life transitions."
                  }
                </p>
                <a
                  className={"service-text-link"}
                  href={"/therapists/denise-santos/"}
                >
                  {"More about Denise →"}
                </a>
              </div>
            </article>
          </div>
          <a className={"service-text-link"} href={"/therapists/"}>
            {"View All Therapists"}
          </a>
        </section>
        {"\n"}
        <section
          className={"service-section individual-faq"}
          aria-labelledby={"depression-faq-title"}
        >
          <h2 id={"depression-faq-title"}>
            {"Questions about depression counseling"}
          </h2>
          <details>
            <summary>{"Is depression the same as feeling sad?"}</summary>
            <p>
              {
                "Feeling sad sometimes is part of life. Depression can affect how a person feels, thinks, and manages daily activities. A qualified professional can help assess what you’re experiencing. "
              }
              <a
                href={"https://www.nimh.nih.gov/health/topics/depression"}
                target={"_blank"}
                rel={"noopener"}
              >
                {"Read more from the National Institute of Mental Health ↗"}
              </a>
              {"."}
            </p>
          </details>
          <details>
            <summary>{"Do I need a diagnosis before contacting you?"}</summary>
            <p>
              {
                "You can contact our office without knowing how to label your concerns. Ask about intake and insurance requirements when scheduling."
              }
            </p>
          </details>
          <details>
            <summary>
              {"Can a child or teen receive counseling for depression?"}
            </summary>
            <p>
              {
                "Several Bridge counselors work with young people and depression. Tell our office your child’s age so we can discuss fit and availability. Explore "
              }
              <a href={"/child-teen-counseling-tyler/"}>
                {"Child & Teen Counseling"}
              </a>
              {"."}
            </p>
          </details>
          <details>
            <summary>{"What if I’m also experiencing anxiety?"}</summary>
            <p>
              {
                "Tell your counselor about both concerns so you can discuss your needs together. You can also learn about "
              }
              <a href={"/anxiety-counseling-tyler/"}>{"Anxiety Counseling"}</a>
              {" at The Bridge."}
            </p>
          </details>
          <details>
            <summary>{"How do I book and check insurance?"}</summary>
            <p>
              <a href="/contact/">Contact our office</a> through the website
              inquiry form, conversational inquiry widget, phone, or email to
              ask about depression counseling and scheduling. Self-pay is
              available alongside insurance. Check with our office about
              participation for your counselor, plan, and appointment type.
            </p>
          </details>
        </section>
        {"\n"}
        <section
          className={"service-section"}
          aria-labelledby={"depression-related-title"}
        >
          <p className={"eyebrow"}>{"EXPLORE YOUR OPTIONS"}</p>
          <h2 id={"depression-related-title"}>
            {"Related counseling services."}
          </h2>
          <p>
            If you are experiencing depression during pregnancy or after
            childbirth, explore{" "}
            <a href="/pregnancy-postpartum-counseling-tyler/">
              Pregnancy and postpartum counseling
            </a>
            .
          </p>
          <div className={"related-care"}>
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
            <a
              className={"service-text-link"}
              href={"/child-teen-counseling-tyler/"}
            >
              {"Child & Teen Counseling →"}
            </a>
          </div>
        </section>
        {"\n"}
        <section
          className={"service-booking"}
          aria-labelledby={"depression-booking-title"}
        >
          <div>
            <p className={"eyebrow"}>{"REACH OUT WHEN YOU’RE READY"}</p>
            <h2 id={"depression-booking-title"}>
              {"A conversation can come first."}
            </h2>
            <p>
              {
                "Contact our Tyler office about depression counseling and scheduling."
              }
            </p>
          </div>
          <a className={"button"} href={"/contact/"}>
            {"Book an Appointment "}
            <span aria-hidden={"true"}>{"→"}</span>
          </a>
        </section>
        {"\n"}
      </main>
    </SiteShell>
  );
}
