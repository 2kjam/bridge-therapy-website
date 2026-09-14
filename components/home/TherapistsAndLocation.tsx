export function TherapistsAndLocation() {
  return (
    <section className={"ivory-community"}>
      <div className={"ivory-team"} id={"therapists"}>
        <h2>{"Meet Our Therapists"}</h2>
        <p className={"team-intro"}>
          {"Experienced. Compassionate. Here for You."}
        </p>
        <div className={"ivory-people"}>
          <article className={"ivory-person"}>
            <a
              href={
                "https://www.thebridgetherapy.com/meet-the-team#:~:text=Jennifer%20Wood"
              }
            >
              <img
                src={"/assets/jennifer.jpg"}
                alt={"Jennifer Wood"}
                width={"500"}
                height={"750"}
                loading={"lazy"}
              />
            </a>
            <h3>{"Jennifer Wood, LPC-S"}</h3>
            <p>{"Practice co-owner"}</p>
            <a
              className={"person-link"}
              href={
                "https://www.thebridgetherapy.com/meet-the-team#:~:text=Jennifer%20Wood"
              }
            >
              {"Meet Jennifer "}
              <span aria-hidden={"true"}>{"→"}</span>
            </a>
          </article>
          <article className={"ivory-person"}>
            <a
              href={
                "https://www.thebridgetherapy.com/meet-the-team#:~:text=Erin%20Young"
              }
            >
              <img
                src={"/assets/erin.jpg"}
                alt={"Erin Young"}
                width={"500"}
                height={"750"}
                loading={"lazy"}
              />
            </a>
            <h3>{"Erin Young, LCSW-S"}</h3>
            <p>{"Practice co-owner"}</p>
            <a
              className={"person-link"}
              href={
                "https://www.thebridgetherapy.com/meet-the-team#:~:text=Erin%20Young"
              }
            >
              {"Meet Erin "}
              <span aria-hidden={"true"}>{"→"}</span>
            </a>
          </article>
          <article className={"ivory-person"}>
            <a
              href={
                "https://www.thebridgetherapy.com/meet-the-team#:~:text=Alyxandrah%20White"
              }
            >
              <img
                src={"/assets/alyx.jpg"}
                alt={"Alyxandrah White"}
                width={"500"}
                height={"750"}
                loading={"lazy"}
              />
            </a>
            <h3>{"Alyxandrah White, LMFT, C-DBT"}</h3>
            <p>{"Marriage & family therapist"}</p>
            <a
              className={"person-link"}
              href={
                "https://www.thebridgetherapy.com/meet-the-team#:~:text=Alyxandrah%20White"
              }
            >
              {"Meet Alyx "}
              <span aria-hidden={"true"}>{"→"}</span>
            </a>
          </article>
          <article className={"ivory-person"}>
            <a
              href={
                "https://www.thebridgetherapy.com/meet-the-team#:~:text=Kelley%20Bell"
              }
            >
              <img
                src={"/assets/kelley.jpg"}
                alt={"Kelley Bell"}
                width={"500"}
                height={"750"}
                loading={"lazy"}
              />
            </a>
            <h3>{"Kelley Bell, LPC"}</h3>
            <p>{"Professional counselor"}</p>
            <a
              className={"person-link"}
              href={
                "https://www.thebridgetherapy.com/meet-the-team#:~:text=Kelley%20Bell"
              }
            >
              {"Meet Kelley "}
              <span aria-hidden={"true"}>{"→"}</span>
            </a>
          </article>
        </div>
        <a
          className={"button"}
          href={"https://www.thebridgetherapy.com/meet-the-team"}
        >
          {"Meet Our Therapists"}
        </a>
      </div>
      <div className={"ivory-local"}>
        <figure>
          <img
            src={"/assets/our-story.jpg"}
            alt={"Erin Young and Jennifer Wood, co-owners of The Bridge"}
            width={"1000"}
            height={"664"}
            loading={"lazy"}
          />
          <figcaption>{"Jennifer & Erin · Co-owners"}</figcaption>
        </figure>
        <div>
          <p className={"eyebrow"}>{"ROOTED IN TYLER"}</p>
          <h2>
            {"Here for"}
            <br />
            {"East Texas."}
          </h2>
          <p>
            {
              "We’re honored to serve individuals, couples, and families in Tyler and throughout the East Texas community."
            }
          </p>
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
      </div>
    </section>
  );
}
