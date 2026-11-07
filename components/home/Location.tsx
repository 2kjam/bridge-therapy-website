export function Location() {
  return (
    <section className={"ivory-local"}>
      <div>
        <p className={"eyebrow"}>{"ROOTED IN TYLER"}</p>
        <h2>Here for East Texas. Available across Texas.</h2>
        <p>
          {
            "We’re honored to serve individuals, couples, families, and children in Tyler and throughout East Texas, with telehealth counseling available across Texas."
          }
        </p>
        <a className="button button-outline" href="/online-therapy-texas/">Explore online counseling across Texas →</a>
      </div>
      <div className="local-details">
        <address>
          <svg
            className={"line-icon"}
            viewBox={"0 0 40 40"}
            fill={"none"}
            stroke={"currentColor"}
            strokeWidth={"1.6"}
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
            aria-hidden={"true"}
          >
            <path
              d={"M32 15c0 10-12 22-12 22S8 25 8 15a12 12 0 0 1 24 0Z"}
            ></path>
            <circle cx={"20"} cy={"15"} r={"4"}></circle>
          </svg>
          <span>
            {"3800 Paluxy Drive, Suite 240"}
            <br />
            {"Building 2"}
            <br />
            {"Tyler, TX 75703"}
          </span>
        </address>
        <a className={"local-phone"} href={"tel:9032838729"}>
          <svg
            className={"line-icon"}
            viewBox={"0 0 40 40"}
            fill={"none"}
            stroke={"currentColor"}
            strokeWidth={"1.6"}
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
            aria-hidden={"true"}
          >
            <path
              d={
                "m10 5 6 8-5 5c3 6 6 9 12 12l5-5 8 6c-2 6-7 7-12 5C12 32 4 22 3 12c0-4 3-7 7-7Z"
              }
            ></path>
          </svg>
          {"(903) 283-8729"}
        </a>
        <a
          className={"local-directions"}
          href={
            "https://www.google.com/maps/search/?api=1&query=The+Bridge+Therapeutic+Services+3800+Paluxy+Drive+Suite+240+Tyler+TX"
          }
        >
          {"Get Directions "}
          <span aria-hidden={"true"}>{"→"}</span>
        </a>
      </div>
      <span className="local-watermark" aria-hidden="true">EAST TEXAS</span>
    </section>
  );
}
