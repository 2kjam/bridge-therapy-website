export function Faith() {
  return (
    <section
      className={"ivory-faith"}
      id={"why-the-bridge"}
      aria-labelledby={"why-title"}
    >
      <div className={"faith-copy"}>
        <img
          src={"/assets/ivory-leaves.svg"}
          className={"faith-leaves"}
          alt={""}
        />
        <p className={"eyebrow"}>{"MORE THAN COUNSELING"}</p>
        <h2 id={"why-title"}>
          {"A Faith-Informed"}
          <br />
          {"Approach to Healing"}
        </h2>
        <p>
          {
            "Our counselors bring together a Christian perspective and practical, personal support, with attention to your needs and experiences."
          }
        </p>
        <a className={"button"} href={"/christian-counseling-tyler/"}>
          {"Learn More About Our Approach"}
        </a>
      </div>
      <div className={"faith-statement"}>
        <p className={"eyebrow"}>{"HOPE LOOKS DIFFERENT HERE"}</p>
        <p className={"faith-quote"}>
          {"Walking alongside you"}
          <br />
          {"with compassion, thoughtful care,"}
          <br />
          {"and hope rooted in Christ."}
        </p>
        <span className={"small-rule"}></span>
      </div>
    </section>
  );
}
