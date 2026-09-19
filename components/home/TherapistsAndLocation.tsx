import { TeamCarousel } from "../team-carousel";
export function TherapistsAndLocation() {
  return (
    <section className={"ivory-community"}>
      <div className={"ivory-team"} id={"therapists"}>
        <h2>{"Meet Our Therapists"}</h2>
        <p className={"team-intro"}>
          {"Experienced. Compassionate. Here for You."}
        </p>
        <TeamCarousel
          id="homepage-team-track"
          className="homepage-team-carousel"
        >
          <li>
            <a className={"portrait-card"} href={"/therapists/jennifer-wood/"}>
              <img
                src={"/assets/jennifer.jpg"}
                alt={"Jennifer Wood, LPC-S"}
                loading="lazy"
                width={"240"}
                height={"280"}
              />
              <strong>{"Jennifer Wood, LPC-S"}</strong>
              <span>{"Co-owner · Counselor–Supervisor"}</span>
            </a>
          </li>
          <li>
            <a className={"portrait-card"} href={"/therapists/erin-young/"}>
              <img
                src={"/assets/erin.jpg"}
                alt={"Erin Young, LCSW-S"}
                loading="lazy"
                width={"240"}
                height={"280"}
              />
              <strong>{"Erin Young, LCSW-S"}</strong>
              <span>{"Co-owner · Social Worker–Supervisor"}</span>
            </a>
          </li>
          <li>
            <a className={"portrait-card"} href={"/therapists/jill-kirkley/"}>
              <img
                src={"/assets/jill.jpg"}
                alt={"Jill Kirkley, LPC"}
                loading="lazy"
                width={"240"}
                height={"280"}
              />
              <strong>{"Jill Kirkley, LPC"}</strong>
              <span>{"Licensed Professional Counselor"}</span>
            </a>
          </li>
          <li>
            <a
              className={"portrait-card"}
              href={"/therapists/alyxandrah-white/"}
            >
              <img
                src={"/assets/alyx.jpg"}
                alt={"Alyxandrah “Alyx” White"}
                loading="lazy"
                width={"240"}
                height={"280"}
              />
              <strong>{"Alyxandrah “Alyx” White"}</strong>
              <span>{"LMFT, C-DBT · Marriage & Family Therapist"}</span>
            </a>
          </li>
          <li>
            <a className={"portrait-card"} href={"/therapists/misty-shultz/"}>
              <img
                src={"/assets/misty.jpg"}
                alt={"Misty Shultz, LPC"}
                loading="lazy"
                width={"240"}
                height={"280"}
              />
              <strong>{"Misty Shultz, LPC"}</strong>
              <span>{"Licensed Professional Counselor"}</span>
              <span>{"Mentoring and discipleship"}</span>
            </a>
          </li>
          <li>
            <a className={"portrait-card"} href={"/therapists/kim-gonzales/"}>
              <img
                src={"/assets/kim.jpg"}
                alt={"Kim Gonzales, LMSW"}
                loading="lazy"
                width={"240"}
                height={"280"}
              />
              <strong>{"Kim Gonzales, LMSW"}</strong>
              <span>
                {"Master Social Worker · Supervised by Erin Young, LCSW-S"}
              </span>
            </a>
          </li>
          <li>
            <a className={"portrait-card"} href={"/therapists/kelley-bell/"}>
              <img
                src={"/assets/kelley.jpg"}
                alt={"Kelley Bell, LPC"}
                loading="lazy"
                width={"240"}
                height={"280"}
              />
              <strong>{"Kelley Bell, LPC"}</strong>
              <span>{"Licensed Professional Counselor"}</span>
            </a>
          </li>
          <li>
            <a className={"portrait-card"} href={"/therapists/denise-santos/"}>
              <img
                src={"/assets/denise.jpg"}
                alt={"Denise Santos, LPC"}
                loading="lazy"
                width={"240"}
                height={"280"}
              />
              <strong>{"Denise Santos, LPC"}</strong>
              <span>{"Licensed Professional Counselor"}</span>
            </a>
          </li>
          <li>
            <a className={"portrait-card"} href={"/therapists/sarah-bell/"}>
              <img
                src={"/assets/sarah-bell.jpg"}
                alt={"Sarah Bell, LPC-A"}
                loading="lazy"
                width={"240"}
                height={"280"}
              />
              <strong>{"Sarah Bell, LPC-A"}</strong>
              <span>
                {"Counselor Associate · Supervised by Whitney Briggs, LPC-S"}
              </span>
            </a>
          </li>
          <li>
            <a className={"portrait-card"} href={"/therapists/sarah-critzman/"}>
              <img
                src={"/assets/sarah-critzman.jpg"}
                alt={"Sarah Critzman, LMSW"}
                loading="lazy"
                width={"240"}
                height={"280"}
              />
              <strong>{"Sarah Critzman, LMSW"}</strong>
              <span>
                {"Master Social Worker · Supervised by Christi Lawson, LCSW-S"}
              </span>
            </a>
          </li>
        </TeamCarousel>
        <a className={"button"} href={"/therapists/"}>
          {"View All Therapists"}
        </a>
      </div>
    </section>
  );
}
