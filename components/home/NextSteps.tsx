export function NextSteps() {
  return (
    <section className={"ivory-next"} id={"getting-started"}>
      <div>
        <h2>{"Take the Next Step"}</h2>
        <p>
          {
            "It’s not always easy to reach out, but you don’t have to do this alone."
          }
          <br />
          {"We’re here to help."}
        </p>
        <div className={"ivory-actions"}>
          <a className={"button"} href={"/contact/"}>
            {"Book an Appointment"}
          </a>
          <a className={"button button-outline"} href={"tel:9032838729"}>
            {"Call (903) 283-8729"}
          </a>
        </div>
      </div>
      <p className={"next-script"} aria-hidden={"true"}>
        {"A Stronger You"}
        <br />
        {"Brighter Tomorrows"}
      </p>
    </section>
  );
}
