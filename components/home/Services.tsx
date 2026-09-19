export function Services() {
  return (
    <section
      className={"ivory-services"}
      id={"services"}
      aria-labelledby={"services-title"}
    >
      <h2 id={"services-title"}>{"You Don’t Have to Face This Alone"}</h2>
      <p>
        {
          "We help individuals, couples, families, and children find hope, healing, and a healthier path forward."
        }{" "}
        <a
          className="individual-counseling-link"
          href="/individual-counseling-tyler/"
        >
          Explore individual counseling <span aria-hidden="true">→</span>
        </a>
      </p>
      <div className={"ivory-service-grid"}>
        <a
          className={"ivory-service tile-0"}
          href={"/anxiety-counseling-tyler/"}
        >
          <img
            src={"/assets/presentation/home/anxiety-800.webp"}
            alt={""}
            width={"640"}
            height={"480"}
            loading={"lazy"}
          />
          <span>
            {"Anxiety"}
            <b aria-hidden={"true"}>{"→"}</b>
          </span>
        </a>
        <a
          className={"ivory-service tile-1"}
          href={"/marriage-counseling-tyler/"}
        >
          <img
            src={"/assets/presentation/home/relationships-800.webp"}
            alt={""}
            width={"640"}
            height={"480"}
            loading={"lazy"}
          />
          <span>
            {"Relationships"}
            <b aria-hidden={"true"}>{"→"}</b>
          </span>
        </a>
        <a className={"ivory-service tile-2"} href={"/trauma-therapy-tyler/"}>
          <img
            src={"/assets/presentation/home/trauma-800.webp"}
            alt={""}
            width={"640"}
            height={"480"}
            loading={"lazy"}
          />
          <span>
            {"Trauma"}
            <b aria-hidden={"true"}>{"→"}</b>
          </span>
        </a>
        <a
          className={"ivory-service tile-3"}
          href={"/parenting-support-tyler/"}
          id={"family-services"}
        >
          <img
            src={"/assets/presentation/home/parenting-800.webp"}
            alt={""}
            width={"640"}
            height={"480"}
            loading={"lazy"}
          />
          <span>
            {"Parenting"}
            <b aria-hidden={"true"}>{"→"}</b>
          </span>
        </a>
        <a className={"ivory-service tile-4"} href={"/grief-counseling-tyler/"}>
          <img
            src={"/assets/presentation/home/grief-800.webp"}
            alt={""}
            width={"640"}
            height={"480"}
            loading={"lazy"}
          />
          <span>
            {"Grief & Loss"}
            <b aria-hidden={"true"}>{"→"}</b>
          </span>
        </a>
        <a
          className={"ivory-service tile-5"}
          href={"/child-teen-counseling-tyler/"}
        >
          <img
            src={"/assets/presentation/home/teen-800.webp"}
            alt={""}
            width={"640"}
            height={"480"}
            loading={"lazy"}
          />
          <span>
            {"Teens & Adolescents"}
            <b aria-hidden={"true"}>{"→"}</b>
          </span>
        </a>
      </div>
      <details className={"specialty-directory"}>
        <summary>
          {"View All Counseling Services "}
          <span aria-hidden={"true"}>{"+"}</span>
        </summary>
        <div className={"directory-content"}>
          <p>
            {
              "Explore more of the concerns and approaches listed by The Bridge."
            }
          </p>
          <div className={"service-list"}>
            <a href={"/anxiety-counseling-tyler/"}>{"Anxiety & stress"}</a>
            <a href={"/depression-counseling-tyler/"}>{"Depression"}</a>
            <a href={"/marriage-counseling-tyler/"}>{"Marriage & couples"}</a>
            <a href={"/family-counseling-tyler/"}>{"Family counseling"}</a>
            <a href={"/child-teen-counseling-tyler/"}>{"Children & teens"}</a>
            <a href={"/trauma-therapy-tyler/"}>{"Trauma & PTSD"}</a>
            <a href={"/emdr-therapy-tyler/"}>{"EMDR therapy"}</a>
            <a href={"/grief-counseling-tyler/"}>{"Grief & loss"}</a>
            <a href={"/premarital-counseling-tyler/"}>
              {"Premarital counseling"}
            </a>
            <a href={"/pregnancy-postpartum-counseling-tyler/"}>
              {"Pregnancy & postpartum"}
            </a>
            <a href={"/adhd-counseling-tyler/"}>{"ADHD support"}</a>
            <a href={"/life-transitions-counseling-tyler/"}>
              {"Life transitions"}
            </a>
            <a href={"/adoption-counseling-tyler/"}>{"Adoption"}</a>
            <a href={"/parenting-support-tyler/"}>{"Parenting"}</a>
            <a href={"/divorce-blended-family-counseling-tyler/"}>
              {"Divorce & blended families"}
            </a>
            <a href={"/christian-counseling-tyler/"}>
              {"Christian counseling"}
            </a>
            <a href="/non-epileptic-seizures-counseling-tyler/">
              Non-Epileptic Seizures
            </a>
          </div>
        </div>
      </details>
    </section>
  );
}
