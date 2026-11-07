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
          {"Faith-informed"}
          <br />
          {" approach to therapy"}
        </h2>
        <p>
          {
            "Our counselors meet you with a Christian perspective and professional and compassionate care for your unique needs."
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
