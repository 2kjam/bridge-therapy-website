import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "Anxiety Counseling in Tyler, TX | The Bridge",
  description:
    "Find Christian anxiety counseling at The Bridge in Tyler, Texas. Meet counselors, explore support for worry and stress, and contact our office to book.",
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
          aria-labelledby={"anxiety-title"}
        >
          <p className={"service-breadcrumb"}>
            <a href={"/"}>{"Home"}</a>
            {" / "}
            <a href={"/individual-counseling-tyler/"}>
              {"Individual Counseling"}
            </a>
            {" / Anxiety Counseling"}
          </p>
          <div className={"service-hero"}>
            <div>
              <p className={"eyebrow"}>
                {"SUPPORT FOR WORRY & EVERYDAY PRESSURES"}
              </p>
              <h1 id={"anxiety-title"}>
                {"Anxiety counseling in "}
                <span>{"Tyler, Texas."}</span>
              </h1>
              <p className={"service-lead"}>
                {"When worry takes up too much room."}
              </p>
              <p>
                {
                  "The Bridge offers Christian counseling for anxiety in Tyler and throughout East Texas. Talk with a counselor about the worries, pressures, and patterns affecting your daily life, and explore goals and approaches that fit your needs."
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
                {"A place to pause, talk, and feel heard."}
              </figcaption>
            </figure>
          </div>
        </section>
        {"\n"}
        <section
          className={"individual-concerns service-section"}
          aria-labelledby={"concerns-title"}
        >
          <div className={"service-section-heading"}>
            <p className={"eyebrow"}>{"START WITH YOUR EXPERIENCE"}</p>
            <h2 id={"concerns-title"}>
              {"Let’s talk about what’s weighing on you."}
            </h2>
            <p>
              {
                "You might be seeking support for a specific worry or feeling overwhelmed without knowing where to begin. You can describe your experience in your own words."
              }
            </p>
          </div>
          <div className={"concern-grid"}>
            {"\n"}
            <article>
              <h3>{"Worry that keeps returning"}</h3>
              <p>
                {
                  "Talk about the “what ifs,” second-guessing, or repeated concerns that occupy your thoughts."
                }
              </p>
            </article>
            <article>
              <h3>{"Pressure in daily life"}</h3>
              <p>
                {
                  "Explore how responsibilities, expectations, or changes at home, work, or school are affecting you."
                }
              </p>
            </article>
            <article>
              <h3>{"Feeling held back"}</h3>
              <p>
                {
                  "Discuss situations you find difficult to face and the ways worry may be influencing your choices."
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
            <p className={"eyebrow"}>
              {"PERSONAL CARE · A CHRISTIAN PERSPECTIVE"}
            </p>
            <h2 id={"process-title"}>
              {"Understand your concerns."}
              <br />
              {"Consider your next steps."}
            </h2>
            <p>
              {
                "Your counselor’s approach depends on their training and your individual needs. The Bridge’s Christian perspective is part of its care; you can discuss how faith and spiritual concerns relate to what you’re experiencing."
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
              <h3>{"Talk about the impact"}</h3>
              <p>
                {
                  "Describe what brings you in, when worry feels most difficult, and how it affects the things that matter to you."
                }
              </p>
            </article>
            <article>
              <h3>{"Explore patterns and goals"}</h3>
              <p>
                {
                  "Discuss your responses to stressful situations and what you hope to understand or approach differently."
                }
              </p>
            </article>
            <article>
              <h3>{"Ask about the approach"}</h3>
              <p>
                {
                  "Ask your counselor how they work with anxiety and what your sessions may involve. Our office can help you explore therapist fit and availability."
                }
              </p>
            </article>
          </div>
        </section>
        {"\n"}
        <section
          className={"service-section individual-team"}
          aria-labelledby={"anxiety-team-title"}
        >
          <div className={"service-section-heading"}>
            <p className={"eyebrow"}>{"GET TO KNOW OUR COUNSELORS"}</p>
            <h2 id={"anxiety-team-title"}>
              {"Experience working with anxiety."}
            </h2>
            <p>
              {
                "These are two of the counselors whose experience includes anxiety. Contact our office about your needs, age group, and current appointment availability."
              }
            </p>
          </div>
          <div className={"individual-team-grid"}>
            {"\n"}
            <article>
              <img
                src={"/assets/erin.jpg"}
                alt={"Erin Young"}
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
                    "Erin works with children, adolescents, individual adults, and families. Her areas of experience include anxiety disorders, trauma, depression, and grief."
                  }
                </p>
                <a
                  className={"service-text-link"}
                  href={
                    "/therapists/erin-young/"
                  }
                >
                  {"More about Erin →"}
                </a>
              </div>
            </article>
            {"\n"}
            <article>
              <img
                src={"/assets/jill.jpg"}
                alt={"Jill Kirkley"}
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
                    "Jill works with individual adults experiencing anxiety, life transitions, grief, relationship concerns, and spiritual issues. Her counseling is grounded in her Christian faith."
                  }
                </p>
                <a
                  className={"service-text-link"}
                  href={
                    "/therapists/jill-kirkley/"
                  }
                >
                  {"More about Jill →"}
                </a>
              </div>
            </article>
            {"\n"}
          </div>
          <a
            className={"service-text-link"}
            href={"/therapists/"}
            target={"_blank"}
            rel={"noopener"}
          >
            {"View All Therapists ↗"}
          </a>
        </section>
        {"\n"}
        <section
          className={"service-section individual-faq"}
          aria-labelledby={"anxiety-faq-title"}
        >
          <h2 id={"anxiety-faq-title"}>
            {"Questions about anxiety counseling"}
          </h2>
          <details>
            <summary>
              {"Do I need an anxiety diagnosis before contacting you?"}
            </summary>
            <p>
              {
                "You can contact our office to discuss your concerns without knowing how to label them. Ask about any intake or insurance requirements when scheduling."
              }
            </p>
          </details>
          <details>
            <summary>
              {"Is anxiety counseling available for children and teens?"}
            </summary>
            <p>
              {
                "Several Bridge counselors work with young people and anxiety. Tell our office your child’s age so we can discuss an appropriate counselor. Learn more about "
              }
              <a href={"/child-teen-counseling-tyler/"}>
                {"Child & Teen Counseling"}
              </a>
              {"."}
            </p>
          </details>
          <details>
            <summary>{"What happens in the first appointment?"}</summary>
            <p>
              {
                "Your first conversations are a chance to explain your concerns, ask questions, and discuss your goals. Ask your counselor what to expect and our office what paperwork to bring."
              }
            </p>
          </details>
          <details>
            <summary>{"How long will counseling take?"}</summary>
            <p>
              {
                "The number and frequency of sessions depend on your needs and the plan you discuss with your counselor. Talk together about your goals and how you will review progress."
              }
            </p>
          </details>
          <details>
            <summary>{"Can I use my insurance?"}</summary>
            <p>
              {
                "Contact our office to confirm your specific plan, counselor, and appointment type. Ask about payment options before your visit."
              }
            </p>
          </details>
        </section>
        {"\n"}
        <section
          className={"service-section"}
          aria-labelledby={"anxiety-related-title"}
        >
          <p className={"eyebrow"}>{"EXPLORE YOUR OPTIONS"}</p>
          <h2 id={"anxiety-related-title"}>
            {"Find the right starting point."}
          </h2>
          <div className={"related-care"}>
            <a
              className={"service-text-link"}
              href={"/depression-counseling-tyler/"}
            >
              {"Depression Counseling →"}
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
          aria-labelledby={"anxiety-booking-title"}
        >
          <div>
            <p className={"eyebrow"}>{"REACH OUT WHEN YOU’RE READY"}</p>
            <h2 id={"anxiety-booking-title"}>{"Start with a conversation."}</h2>
            <p>
              {
                "Contact our Tyler office to ask about anxiety counseling and scheduling."
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
