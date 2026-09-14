export function Footer({ id = "location" }: { id?: string }) {
  return (
    <footer className={"site-footer ivory-footer"} id={id}>
      <div className={"ivory-footer-grid"}>
        <a
          className={"footer-wordmark"}
          href={"/"}
          aria-label={"The Bridge home"}
        >
          <img
            src={"/assets/ivory-logo.svg"}
            alt={"The Bridge Therapeutic Services"}
            width={"280"}
            height={"68"}
          />
        </a>
        <section>
          <h2>{"Counseling Services"}</h2>
          <a href={"/anxiety-counseling-tyler/"}>{"Anxiety"}</a>
          <a href={"/marriage-counseling-tyler/"}>{"Relationships"}</a>
          <a href={"/trauma-therapy-tyler/"}>{"Trauma"}</a>
          <a href={"/grief-counseling-tyler/"}>{"Grief & Loss"}</a>
          <a href={"/child-teen-counseling-tyler/"}>{"Teens & Adolescents"}</a>
          <a href={"/parenting-support-tyler/"}>{"Parenting"}</a>
          <a href={"/life-transitions-counseling-tyler/"}>
            {"Life Transitions"}
          </a>
        </section>
        <section>
          <h2>{"Our Practice"}</h2>
          <a href={"/#why-the-bridge"}>{"About"}</a>
          <a href={"/#therapists"}>{"Our Therapists"}</a>
          <a href={"https://www.thebridgetherapy.com/blog"}>{"Resources"}</a>
          <a href={"/contact/"}>{"Contact"}</a>
          <a href={"/contact/"}>{"Book an Appointment"}</a>
          <a href={"/#insurance"}>{"Insurance"}</a>
        </section>
        <section>
          <h2>{"Contact"}</h2>
          <address>
            {"3800 Paluxy Drive, Suite 240"}
            <br />
            {"Building 2 · Tyler, TX 75703"}
          </address>
          <a href={"tel:9032838729"}>{"(903) 283-8729"}</a>
          <a href={"mailto:info@thebridgetherapy.com"}>
            {"info@thebridgetherapy.com"}
          </a>
        </section>
      </div>
      <div className={"footer-fine-print"}>
        <p>{"© 2026 The Bridge Therapeutic Services. All rights reserved."}</p>
        <span>{"Local design preview"}</span>
      </div>
    </footer>
  );
}
