import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "Life Transitions Counseling in Tyler, TX | The Bridge",
  description:
    "Life transitions counseling at The Bridge in Tyler, Texas. Explore support for adjustment difficulties, changing roles, and unexpected events. Contact us to book.",
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
            {" / Life Transitions Counseling"}
          </p>
          <div className={"service-hero"}>
            <div>
              <p className={"eyebrow"}>
                {"PERSONAL CARE · A CHRISTIAN PERSPECTIVE"}
              </p>
              <h1 id={"page-title"}>
                {"Life transitions counseling in "}
                <span>{"Tyler, Texas."}</span>
              </h1>
              <p className={"service-lead"}>
                {"Support when life changes faster than you can adjust."}
              </p>
              <p>
                {
                  "The Bridge offers Christian counseling for life transitions and adjustment difficulties in Tyler and throughout East Texas. Talk with a counselor about changing circumstances, unfamiliar responsibilities, and the questions you have about what comes next."
                }
              </p>
              <a className={"button"} href={"/contact/"}>
                {"Book an Appointment "}
                <span aria-hidden={"true"}>{"→"}</span>
              </a>
              <p>
                <a className={"service-text-link"} href={"#team-title"}>
                  {"Meet our life transitions counselors"}
                </a>
              </p>
            </div>
            <figure>
              <img
                src="/assets/services/service-life-transitions.webp"
                srcSet="/assets/services/service-life-transitions-480.webp 480w, /assets/services/service-life-transitions-800.webp 800w, /assets/services/service-life-transitions.webp 1440w"
                sizes="(max-width: 900px) 90vw, 45vw"
                alt="A man walking along a wooded path"
                width="1440"
                height="1080"
                style={{ objectPosition: "50% 50%", height: "auto" }}
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
            <h2 id={"concerns-title"}>{"Find your footing through change."}</h2>
            <p>
              {
                "You can begin with the parts of your experience that feel most important to talk about."
              }
            </p>
          </div>
          <div className={"concern-grid"}>
            <article>
              <h3>{"A different season of life"}</h3>
              <p>
                {
                  "Discuss the expectations and emotions that come with a new chapter, whether it was planned or unexpected."
                }
              </p>
            </article>
            <article>
              <h3>{"Changes in roles & routines"}</h3>
              <p>
                {
                  "Talk about shifts in work, school, home, or family responsibilities and how you’re responding to them."
                }
              </p>
            </article>
            <article>
              <h3>{"Uncertainty about what comes next"}</h3>
              <p>
                {
                  "Explore competing priorities, difficult decisions, and the support you need while finding your direction."
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
              {"Understand what has changed."}
              <br />
              {"Consider what matters now."}
            </h2>
            <p>
              {
                "A transition can affect several parts of life at once. Counseling offers space to sort through your concerns and priorities. Our Christian perspective also makes room for questions about faith, purpose, and personal values."
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
              <h3>{"Describe the transition"}</h3>
              <p>
                {
                  "Talk about what changed, what you expected, and what has been more difficult than you anticipated."
                }
              </p>
            </article>
            <article>
              <h3>{"Explore your response"}</h3>
              <p>
                {
                  "Discuss your feelings, relationships, and routines, including the parts of life where you would like more support."
                }
              </p>
            </article>
            <article>
              <h3>{"Identify your next steps"}</h3>
              <p>
                {
                  "Consider goals you want to work toward and ways to approach decisions and responsibilities with your counselor."
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
            <h2
              id={"team-title"}
              tabIndex={-1}
              style={{ scrollMarginTop: "2rem" }}
            >
              {"Find a counselor who fits."}
            </h2>
            <p>
              {
                "These counselors have relevant experience. Contact our office about your needs, age group, and current appointment availability."
              }
            </p>
          </div>
          <div className={"individual-team-grid"}>
            <article>
              <img
                src={"/assets/jill.jpg"}
                alt={"Jill Kirkley, LPC"}
                width={"300"}
                height={"360"}
                loading={"lazy"}
              />
              <div>
                <h3>{"Jill Kirkley, LPC"}</h3>
                <p className={"service-credential"}>
                  {"Licensed Professional Counselor"}
                </p>
                <p>
                  {
                    "Jill works with individual adults. Her experience includes life transitions, grief and loss, relationship concerns, and spiritual issues."
                  }
                </p>
                <a
                  className={"service-text-link"}
                  href={"/therapists/jill-kirkley/"}
                >
                  {"Read counselor profile →"}
                </a>
              </div>
            </article>
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
                    "Denise works with children, adolescents, and adults. Her experience includes unexpected life transitions, anxiety, depression, and grief."
                  }
                </p>
                <a
                  className={"service-text-link"}
                  href={"/therapists/denise-santos/"}
                >
                  {"Read counselor profile →"}
                </a>
              </div>
            </article>
          </div>
          <a className={"service-text-link"} href={"/therapists/"}>
            {"View All Therapists"}
          </a>
        </section>
        {"\n "}
        <section
          className={"service-section individual-faq"}
          aria-labelledby={"faq-title"}
        >
          <h2 id={"faq-title"}>
            {"Questions about life transitions counseling"}
          </h2>
          <details>
            <summary>{"Can I seek counseling for a positive change?"}</summary>
            <p>
              {
                "Yes. You can contact our office about changes you welcomed as well as changes you did not choose. Explain what has felt difficult about the adjustment."
              }
            </p>
          </details>
          <details>
            <summary>
              {"Does adjustment difficulty mean I have a disorder?"}
            </summary>
            <p>
              {
                "The phrase here describes difficulty adapting to change; it is not a diagnosis. A qualified professional can assess your concerns and discuss appropriate care."
              }
            </p>
          </details>
          <details>
            <summary>{"How is this different from grief counseling?"}</summary>
            <p>
              {
                "Life transitions counseling focuses on adapting to changing circumstances and roles. Grief counseling focuses on the experience of loss. Your concerns may overlap, and our office can help you consider a starting point."
              }
            </p>
          </details>
          <details>
            <summary>{"Can I talk about more than one change?"}</summary>
            <p>
              {
                "Yes. Describe the concerns that are connected for you, rather than feeling you need to choose just one issue before reaching out."
              }
            </p>
          </details>
          <details>
            <summary>{"How do I book and check insurance?"}</summary>
            <p>
              <a href="/contact/">Contact our office</a> through the website
              inquiry form, conversational inquiry widget, phone, or email to
              ask about life transitions counseling and scheduling. Insurance
              and self-pay are available. Participation varies by counselor,
              plan, and appointment type; our office can confirm current
              coverage.
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
              href={"/grief-counseling-tyler/"}
            >
              {"Grief & Bereavement Counseling →"}
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
          className={"service-section"}
          aria-labelledby={"additional-support-title"}
        >
          <p className={"eyebrow"}>{"EXPLORE RELATED SUPPORT"}</p>
          <h2 id={"additional-support-title"}>
            {"More ways to find support."}
          </h2>
          <div className={"related-care"}>
            <a
              className={"service-text-link"}
              href={"/pregnancy-postpartum-counseling-tyler/"}
            >
              {"Pregnancy & Postpartum Counseling →"}
            </a>
          </div>
        </section>
        <section
          className={"service-booking"}
          aria-labelledby={"booking-title"}
        >
          <div>
            <p className={"eyebrow"}>{"YOUR NEXT STEP"}</p>
            <h2 id={"booking-title"}>{"Start with a conversation."}</h2>
            <p>
              {"Contact our Tyler office about life transitions counseling."}
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
