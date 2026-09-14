import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
export const metadata: Metadata = {
  title: "Marriage & Couples Counseling in Tyler, TX | The Bridge",
  description:
    "Explore Christian marriage and couples counseling at The Bridge in Tyler, Texas. Meet counselors, explore relationship support, and contact us to book an appointment.",
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
          aria-labelledby={"couples-title"}
        >
          {"\n"}
          <p className={"service-breadcrumb"}>
            <a href={"/"}>{"Home"}</a>
            {" / "}
            <a href={"/#services"}>{"Counseling"}</a>
            {" / Marriage & Couples Counseling"}
          </p>
          {"\n"}
          <div className={"service-hero"}>
            <div>
              <p className={"eyebrow"}>
                {"RELATIONSHIP SUPPORT · A CHRISTIAN PERSPECTIVE"}
              </p>
              <h1 id={"couples-title"}>
                {"Marriage & couples counseling in "}
                <span>{"Tyler, Texas."}</span>
              </h1>
              <p className={"service-lead"}>
                {"Make space to hear each other."}
              </p>
              <p>
                {
                  "Marriage and couples counseling brings partners together with a counselor to explore relationship concerns, communication, and shared goals. The Bridge offers Christian counseling for couples in Tyler and throughout East Texas."
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
                alt={"Two people talking together on a sofa"}
                width={"900"}
                height={"600"}
              />
              <figcaption>
                {"Time for honest conversations and understanding."}
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
            <p className={"eyebrow"}>{"ROOM FOR BOTH OF YOUR EXPERIENCES"}</p>
            <h2 id={"concerns-title"}>{"Find a way to talk it through."}</h2>
            <p>
              {
                "Whether you’re facing a recurring disagreement or adjusting to a new season together, counseling offers time to examine what’s happening in your relationship and what you each hope will change."
              }
            </p>
          </div>
          <div className={"concern-grid"}>
            {"\n"}
            <article>
              <h3>{"Communication"}</h3>
              <p>
                {
                  "Talk about feeling unheard, misunderstandings, and conversations that seem to go in circles."
                }
              </p>
            </article>
            {"\n"}
            <article>
              <h3>{"Recurring conflict"}</h3>
              <p>
                {
                  "Explore the patterns behind disagreements and how each of you responds when tension rises."
                }
              </p>
            </article>
            {"\n"}
            <article>
              <h3>{"Emotional distance"}</h3>
              <p>
                {
                  "Make room to discuss disconnection, unmet expectations, and what closeness means to each of you."
                }
              </p>
            </article>
            {"\n"}
            <article>
              <h3>{"Parenting & family roles"}</h3>
              <p>
                {
                  "Work through differing expectations about parenting, responsibilities, and relationships with extended family."
                }
              </p>
            </article>
            {"\n"}
            <article>
              <h3>{"Life changes"}</h3>
              <p>
                {
                  "Discuss how changes in work, family, or daily life are affecting your relationship."
                }
              </p>
            </article>
            {"\n"}
            <article id={"premarital"}>
              <h3>{"Preparing for marriage"}</h3>
              <p>
                {
                  "Ask our office about premarital counseling to explore expectations, communication, and the life you hope to build together."
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
            <p className={"eyebrow"}>{"A CONVERSATION WITH PURPOSE"}</p>
            <h2 id={"process-title"}>
              {"Understand the pattern."}
              <br />
              {"Discuss what comes next."}
            </h2>
            <p>
              {
                "Our Christian perspective shapes how we approach relationships and care. Your counselor can discuss how faith, personal values, and your goals fit into the counseling process."
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
            <a
              className={"service-text-link"}
              href={"/christian-counseling-tyler/"}
            >
              {"Explore Christian Counseling →"}
            </a>
          </div>
          <div className={"process-points"}>
            {"\n"}
            <article>
              <h3>{"Share both perspectives"}</h3>
              <p>
                {
                  "Your first conversations are an opportunity to describe your concerns and ask questions about working together."
                }
              </p>
            </article>
            {"\n"}
            <article>
              <h3>{"Clarify your goals"}</h3>
              <p>
                {
                  "Discuss what each of you hopes to address, where your priorities overlap, and where you see things differently."
                }
              </p>
            </article>
            {"\n"}
            <article>
              <h3>{"Consider therapist fit"}</h3>
              <p>
                {
                  "Our office can help you find a counselor whose experience fits your needs and discuss current appointment availability."
                }
              </p>
            </article>
            {"\n"}
          </div>
        </section>
        {"\n"}
        <section
          className={"service-section individual-team"}
          aria-labelledby={"couples-team-title"}
        >
          <div className={"service-section-heading"}>
            <p className={"eyebrow"}>{"GET TO KNOW OUR COUNSELORS"}</p>
            <h2 id={"couples-team-title"}>
              {"Support for your relationship."}
            </h2>
            <p>
              {
                "These counselors have experience working with couples. Contact our office to discuss fit and scheduling."
              }
            </p>
          </div>
          <div className={"individual-team-grid"}>
            {"\n"}
            <article>
              <img
                src={"/assets/alyx.jpg"}
                alt={"Alyxandrah White"}
                width={"300"}
                height={"360"}
                loading={"lazy"}
              />
              <div>
                <h3>{"Alyxandrah “Alyx” White"}</h3>
                <p className={"service-credential"}>
                  {"LMFT, C-DBT · Licensed Marriage and Family Therapist"}
                </p>
                <p>
                  {
                    "Alyx works with couples, families, and individuals. Her experience includes communication, family conflict, co-parenting, and life adjustments."
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
                  {"More about Alyx ↗"}
                </a>
              </div>
            </article>
            {"\n"}
            <article>
              <img
                src={"/assets/kelley.jpg"}
                alt={"Kelley Bell"}
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
                    "Kelley works with young married couples on building marriages centered around the Lord. She also supports parents, teens, and young adults."
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
                  {"More about Kelley ↗"}
                </a>
              </div>
            </article>
            {"\n"}
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
        {"\n"}
        <section
          className={"service-section individual-faq"}
          aria-labelledby={"couples-faq-title"}
        >
          <h2 id={"couples-faq-title"}>
            {"Questions about couples counseling"}
          </h2>
          {"\n"}
          <details>
            <summary>{"Do we need to be married?"}</summary>
            <p>
              {
                "Tell our office about your relationship and the support you’re looking for. We can help you explore couples or premarital counseling and find an appropriate counselor."
              }
            </p>
          </details>
          {"\n"}
          <details>
            <summary>{"What if my partner isn’t ready?"}</summary>
            <p>
              {"You can contact our office to discuss your options. "}
              <a href={"/individual-counseling-tyler/"}>
                {"Individual counseling"}
              </a>
              {
                " provides a separate space to explore your own experiences and goals."
              }
            </p>
          </details>
          {"\n"}
          <details>
            <summary>{"Can we use insurance for couples counseling?"}</summary>
            <p>
              {
                "Ask our office about payment options for couples sessions and check your specific plan’s benefits. A logo on our insurance list does not establish coverage for couples counseling."
              }
            </p>
          </details>
          {"\n"}
          <details>
            <summary>{"How do we book our first appointment?"}</summary>
            <p>
              <a href={"/contact/"}>{"Contact The Bridge"}</a>
              {
                " by phone or email and let us know you’re interested in couples counseling. Our office will help with availability and scheduling at our Tyler office."
              }
            </p>
          </details>
          {"\n"}
        </section>
        {"\n"}
        <section
          className={"service-section"}
          aria-labelledby={"relationship-related-title"}
        >
          <p className={"eyebrow"}>{"EXPLORE RELATED SUPPORT"}</p>
          <h2 id={"relationship-related-title"}>
            {"Support for your next chapter."}
          </h2>
          <div className={"related-care"}>
            <a
              className={"service-text-link"}
              href={"/premarital-counseling-tyler/"}
            >
              {"Premarital & Marital Enrichment Counseling →"}
            </a>
            <a
              className={"service-text-link"}
              href={"/divorce-blended-family-counseling-tyler/"}
            >
              {"Divorce & Blended Family Counseling →"}
            </a>
          </div>
        </section>
        <section
          className={"service-booking"}
          aria-labelledby={"couples-booking-title"}
        >
          <div>
            <p className={"eyebrow"}>{"TAKE THE NEXT STEP"}</p>
            <h2 id={"couples-booking-title"}>{"Start with a conversation."}</h2>
            <p>{"Contact our office about marriage and couples counseling."}</p>
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
