import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "Individual Counseling in Tyler, TX | The Bridge",
  description:
    "Explore individual counseling at The Bridge in Tyler, Texas. Find support for anxiety, depression, grief, relationships, and life changes. Contact us to book.",
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
          aria-labelledby={"individual-title"}
        >
          {"\n"}
          <p className={"service-breadcrumb"}>
            <a href={"/"}>{"Home"}</a>
            {" / "}
            <a href={"/#services"}>{"Counseling"}</a>
            {" / Individual Counseling"}
          </p>
          {"\n"}
          <div className={"service-hero"}>
            <div>
              <p className={"eyebrow"}>
                {"PERSONAL SUPPORT · A CHRISTIAN PERSPECTIVE"}
              </p>
              <h1 id={"individual-title"}>
                {"Individual counseling"}
                <br />
                {"in "}
                <span>{"Tyler, Texas."}</span>
              </h1>
              <p className={"service-lead"}>
                {"A place to talk about what’s weighing on you."}
              </p>
              <p>
                {
                  "Individual counseling is one-on-one time with a counselor to explore your concerns, understand patterns, and work toward goals that matter to you. The Bridge offers Christian counseling for people in Tyler and throughout East Texas."
                }
              </p>
              <a className={"button"} href={"/contact/"}>
                {"Book an Appointment "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
              <p>
                <a
                  className={"service-text-link"}
                  href={"#individual-team-title"}
                >
                  {"Meet our individual counselors"}
                </a>
              </p>
            </div>
            <figure>
              <img
                src="/assets/services/service-individual.webp"
                srcSet="/assets/services/service-individual-480.webp 480w, /assets/services/service-individual-800.webp 800w, /assets/services/service-individual.webp 1440w"
                sizes="(max-width: 900px) 90vw, 45vw"
                alt="A woman sitting thoughtfully on a wooden dock beside a lake"
                width="1440"
                height="1080"
                style={{ objectPosition: "50% 50%", height: "auto" }}
              />
              <figcaption>
                {"Room to reflect. Support for your next step."}
              </figcaption>
            </figure>
          </div>
          {"\n"}
        </section>
        {"\n"}
        <section
          className={"individual-concerns service-section"}
          aria-labelledby={"concerns-title"}
        >
          <div className={"service-section-heading"}>
            <p className={"eyebrow"}>{"START WITH WHAT YOU’RE EXPERIENCING"}</p>
            <h2 id={"concerns-title"}>
              {"You don’t have to sort it out alone."}
            </h2>
            <p>
              {
                "You might have a specific concern, or simply know that something feels difficult. Our counselors work with a range of emotional, personal, and relationship concerns."
              }
            </p>
          </div>
          {"\n"}
          <div className={"concern-grid"}>
            {"\n"}
            <article id={"anxiety"}>
              <h3>
                <a href={"/anxiety-counseling-tyler/"}>
                  {"Anxiety & stress →"}
                </a>
              </h3>
              <p>
                {
                  "Space to talk about persistent worry, feeling overwhelmed, and the pressures of everyday life."
                }
              </p>
            </article>
            {"\n"}
            <article id={"depression"}>
              <h3>
                <a href={"/depression-counseling-tyler/"}>{"Depression →"}</a>
              </h3>
              <p>
                {
                  "Support when sadness, discouragement, or a loss of interest is affecting your daily life."
                }
              </p>
            </article>
            {"\n"}
            <article id={"grief"}>
              <h3>
                <a href={"/grief-counseling-tyler/"}>{"Grief & loss →"}</a>
              </h3>
              <p>
                {
                  "A place to talk about bereavement, loss, and the changes that follow."
                }
              </p>
            </article>
            {"\n"}
            <article id={"transitions"}>
              <h3>
                <a href={"/life-transitions-counseling-tyler/"}>
                  {"Life transitions →"}
                </a>
              </h3>
              <p>
                {
                  "Time to work through unexpected changes, shifting roles, and uncertainty about what comes next."
                }
              </p>
            </article>
            {"\n"}
            <article id={"relationships"}>
              <h3>{"Relationship patterns"}</h3>
              <p>
                {
                  "Individual support for exploring communication, boundaries, and patterns in your relationships."
                }
              </p>
            </article>
            {"\n"}
            <article id={"faith"}>
              <h3>{"Faith & personal growth"}</h3>
              <p>
                {
                  "Room to discuss spiritual concerns and how your faith relates to the challenges you’re facing."
                }
              </p>
            </article>
            {"\n"}
          </div>
        </section>
        {"\n"}
        <section
          className={"service-process service-section"}
          aria-labelledby={"process-title"}
        >
          <div>
            <p className={"eyebrow"}>{"COUNSELING THAT STARTS WITH YOU"}</p>
            <h2 id={"process-title"}>
              {"A conversation."}
              <br />
              {"A relationship."}
              <br />
              {"A way forward."}
            </h2>
            <p>
              {
                "At The Bridge, a Christian perspective is part of our approach to care. Talk with your counselor about your goals and how you would like to discuss faith in your sessions."
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
              <h3>{"Share what brings you in"}</h3>
              <p>
                {
                  "Your first conversations are a chance to explain your concerns, ask questions, and begin getting to know your counselor."
                }
              </p>
            </article>
            <article>
              <h3>{"Talk about your goals"}</h3>
              <p>
                {
                  "Discuss what you hope to understand or change. Your experiences and priorities help shape the focus of counseling."
                }
              </p>
            </article>
            <article>
              <h3>{"Find an approach that fits"}</h3>
              <p>
                {
                  "Different counselors bring different training and areas of focus. Our office can help you explore therapist fit and current availability."
                }
              </p>
            </article>
          </div>
        </section>
        {"\n"}
        <section
          className={"service-section individual-team"}
          aria-labelledby={"individual-team-title"}
        >
          <div className={"service-section-heading"}>
            <p className={"eyebrow"}>{"PEOPLE YOU CAN GET TO KNOW"}</p>
            <h2
              id={"individual-team-title"}
              tabIndex={-1}
              style={{ scrollMarginTop: "2rem" }}
            >
              {"Meet a few of our counselors."}
            </h2>
            <p>
              {
                "These counselors work with individual adults. Contact our office to discuss your needs and appointment availability."
              }
            </p>
          </div>
          <div className={"individual-team-grid"}>
            {"\n"}
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
                    "Jennifer works with adults, families, and children. Her areas of experience include depression, grief and loss, relationship patterns, and spiritual concerns."
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
            {"\n"}
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
                    "Denise works with children, adolescents, and adults. Her experience includes anxiety, depression, grief, and unexpected life transitions."
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
            {"\n"}
          </div>
          <a className={"service-text-link"} href={"/therapists/"}>
            {"View All Therapists"}
          </a>
        </section>
        {"\n"}
        <section
          className={"service-section individual-faq"}
          aria-labelledby={"individual-faq-title"}
        >
          <h2 id={"individual-faq-title"}>
            {"Questions about individual counseling"}
          </h2>
          <details>
            <summary>
              {"Is individual counseling different from couples counseling?"}
            </summary>
            <p>
              {
                "Individual counseling focuses on your own experiences and goals. You can discuss relationship concerns in individual sessions; couples counseling involves working with both partners together."
              }
            </p>
          </details>
          <details>
            <summary>{"Do I need to know exactly what’s wrong?"}</summary>
            <p>
              {
                "You can start by describing what has been difficult or what prompted you to reach out. Our office can help you consider which counselor may be a fit."
              }
            </p>
          </details>
          <details>
            <summary>{"Can I use insurance?"}</summary>
            <p>
              Insurance and self-pay options are available. Insurance
              participation can vary by counselor, plan, and appointment type.
              Contact our office to confirm current coverage and discuss payment
              options.
            </p>
          </details>
          <details>
            <summary>{"How do I get started?"}</summary>
            <p>
              {" "}
              <a href="/contact/">Contact The Bridge</a> through the website
              inquiry form, conversational inquiry widget, phone, or email to
              ask about individual counseling and scheduling. Our office is at
              3800 Paluxy Drive, Suite 240, Building 2, Tyler, Texas. Once you
              begin scheduling, the office will email intake paperwork for you
              to complete before your appointment.
            </p>
          </details>
        </section>
        {"\n"}
        <section
          className={"service-section"}
          aria-labelledby={"additional-support-title"}
        >
          <p className={"eyebrow"}>{"EXPLORE RELATED SUPPORT"}</p>
          <h2 id={"additional-support-title"}>
            {"More ways to find support."}
          </h2>
          <div className={"related-care"}>
            <a className="service-text-link" href="/trauma-therapy-tyler/">
              Trauma counseling
            </a>
            <a
              className={"service-text-link"}
              href={"/pregnancy-postpartum-counseling-tyler/"}
            >
              {"Pregnancy & Postpartum Counseling →"}
            </a>
            <a className={"service-text-link"} href={"/adhd-counseling-tyler/"}>
              {"ADHD Counseling & Support →"}
            </a>
          </div>
        </section>
        <section
          className={"service-booking"}
          aria-labelledby={"individual-booking-title"}
        >
          <div>
            <p className={"eyebrow"}>{"YOUR NEXT STEP"}</p>
            <h2 id={"individual-booking-title"}>
              {"Let’s find support that fits you."}
            </h2>
            <p>
              {
                "Talk with our office about individual counseling and scheduling."
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
