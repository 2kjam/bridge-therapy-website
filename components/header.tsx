import { HeaderFrame, MobileToggle, Navigation, NavMenu } from "./navigation";
import { TeamCarousel } from "./team-carousel";
export function Header() {
  return (
    <HeaderFrame>
      <div className={"header-inner"}>
        <a className={"brand"} href={"/"} aria-label={"The Bridge home"}>
          <img
            src={"/assets/ivory-logo.svg"}
            width={"280"}
            height={"68"}
            alt={"The Bridge Therapeutic Services"}
          />
        </a>
        <MobileToggle />
        {"\n"}
        <Navigation>
          <a className={"nav-direct"} href={"/about/"}>
            {"About"}
          </a>
          {"\n"}
          <NavMenu
            id="care-panel"
            panelClassName="mega"
            label={
              <>
                {"Counseling Services "}
                <span aria-hidden={"true"}>{"⌄"}</span>
              </>
            }
          >
            <div className={"mega-columns"}>
              <section>
                <h2>{"Who we help"}</h2>
                <a href={"/individual-counseling-tyler/"}>{"Individuals"}</a>
                <a href={"/marriage-counseling-tyler/"}>{"Couples"}</a>
                <a href={"/family-counseling-tyler/"}>{"Families"}</a>
                <a href={"/child-teen-counseling-tyler/"}>
                  {"Children and Teens"}
                </a>
                <a href={"/parenting-support-tyler/"}>{"Parents"}</a>
              </section>
              <section>
                <h2>{"What we help with"}</h2>
                <a href={"/anxiety-counseling-tyler/"}>{"Anxiety & stress"}</a>
                <a href={"/depression-counseling-tyler/"}>{"Depression"}</a>
                <a href={"/trauma-therapy-tyler/"}>{"Trauma & PTSD"}</a>
                <a href={"/grief-counseling-tyler/"}>{"Grief & loss"}</a>
                <a href={"/marriage-counseling-tyler/"}>{"Relationships"}</a>
                <a href={"/life-transitions-counseling-tyler/"}>
                  {"Life transitions"}
                </a>
                <a href={"/adhd-counseling-tyler/"}>{"ADHD"}</a>
                <a href={"/premarital-counseling-tyler/"}>
                  {"Premarital counseling"}
                </a>
                <a href={"/pregnancy-postpartum-counseling-tyler/"}>
                  {"Pregnancy & postpartum"}
                </a>
                <a href="/non-epileptic-seizures-counseling-tyler/">
                  Non-Epileptic Seizures
                </a>
              </section>
              <section>
                <h2>{"Our approach"}</h2>
                <a href={"/christian-counseling-tyler/"}>
                  {"Christian counseling"}
                </a>
                <a href={"/emdr-therapy-tyler/"}>{"EMDR therapy"}</a>
                <a className={"view-all"} href={"/#services"}>
                  {"View all specialties →"}
                </a>
              </section>
            </div>
            <a className={"menu-feature office-help"} href={"/contact/"}>
              <div className="office-help-portrait">
                <img loading="lazy"
                  src={"/assets/presentation/menu/kalynne-480.webp"}
                  width="480"
                  height="720"
                  alt=""
                />
              </div>
              <span>
                <strong>{"Not sure where to start?"}</strong>
                <span className="office-help-name">
                  Kalynne Arrick · Office Manager
                </span>
                {"Kalynne can help you find a counselor who may be a good fit."}
                <b>{"Contact us →"}</b>
              </span>
            </a>
            <div className={"mega-bottom"}>
              {"Support starts with a conversation."}
              <a href={"/contact/"}>{"Book an Appointment →"}</a>
            </div>
          </NavMenu>
          {"\n"}
          <NavMenu
            id="team-panel"
            panelClassName="mega team-menu"
            label={
              <>
                {"Our Therapists "}
                <span aria-hidden={"true"}>{"⌄"}</span>
              </>
            }
          >
            <div className={"menu-intro"}>
              <p className={"eyebrow"}>{"MEET THE BRIDGE"}</p>
              <h2>
                {"Real people. "}
                <br />
                {"Personal care."}
              </h2>
              <p>
                {
                  "Get to know our counselors and find a connection that feels right."
                }
              </p>
              <a className={"view-all"} href={"/therapists/"}>
                {"View All Therapists →"}
              </a>
            </div>
            <TeamCarousel>
              <li>
                <a
                  className={"portrait-card"}
                  href={"/therapists/jennifer-wood/"}
                >
                  <img loading="lazy"
                    src={"/assets/presentation/menu/jennifer-500.webp"}
                    alt={"Jennifer Wood, LPC-S"}
                    width={"240"}
                    height={"280"}
                  />
                  <strong>{"Jennifer Wood, LPC-S"}</strong>
                  <span>{"Co-owner · Counselor–Supervisor"}</span>
                </a>
              </li>
              <li>
                <a className={"portrait-card"} href={"/therapists/erin-young/"}>
                  <img loading="lazy"
                    src={"/assets/presentation/menu/erin-500.webp"}
                    alt={"Erin Young, LCSW-S"}
                    width={"240"}
                    height={"280"}
                  />
                  <strong>{"Erin Young, LCSW-S"}</strong>
                  <span>{"Co-owner · Social Worker–Supervisor"}</span>
                </a>
              </li>
              <li>
                <a
                  className={"portrait-card"}
                  href={"/therapists/jill-kirkley/"}
                >
                  <img loading="lazy"
                    src={"/assets/presentation/menu/jill-500.webp"}
                    alt={"Jill Kirkley, LPC"}
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
                  <img loading="lazy"
                    src={"/assets/presentation/menu/alyx-500.webp"}
                    alt={"Alyxandrah “Alyx” White"}
                    width={"240"}
                    height={"280"}
                  />
                  <strong>{"Alyxandrah “Alyx” White"}</strong>
                  <span>{"LMFT, C-DBT · Marriage & Family Therapist"}</span>
                </a>
              </li>
              <li>
                <a
                  className={"portrait-card"}
                  href={"/therapists/misty-shultz/"}
                >
                  <img loading="lazy"
                    src={"/assets/presentation/menu/misty-500.webp"}
                    alt={"Misty Shultz, LPC"}
                    width={"240"}
                    height={"280"}
                  />
                  <strong>{"Misty Shultz, LPC"}</strong>
                  <span>{"Licensed Professional Counselor"}</span>
                  <span>{"Mentoring and discipleship"}</span>
                </a>
              </li>
              <li>
                <a
                  className={"portrait-card"}
                  href={"/therapists/kim-gonzales/"}
                >
                  <img loading="lazy"
                    src={"/assets/presentation/menu/kim-500.webp"}
                    alt={"Kim Gonzales, LMSW"}
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
                <a
                  className={"portrait-card"}
                  href={"/therapists/kelley-bell/"}
                >
                  <img loading="lazy"
                    src={"/assets/presentation/menu/kelley-500.webp"}
                    alt={"Kelley Bell, LPC"}
                    width={"240"}
                    height={"280"}
                  />
                  <strong>{"Kelley Bell, LPC"}</strong>
                  <span>{"Licensed Professional Counselor"}</span>
                </a>
              </li>
              <li>
                <a
                  className={"portrait-card"}
                  href={"/therapists/denise-santos/"}
                >
                  <img loading="lazy"
                    src={"/assets/presentation/menu/denise-500.webp"}
                    alt={"Denise Santos, LPC"}
                    width={"240"}
                    height={"280"}
                  />
                  <strong>{"Denise Santos, LPC"}</strong>
                  <span>{"Licensed Professional Counselor"}</span>
                </a>
              </li>
              <li>
                <a className={"portrait-card"} href={"/therapists/sarah-bell/"}>
                  <img loading="lazy"
                    src={"/assets/presentation/menu/sarah-bell-500.webp"}
                    alt={"Sarah Bell, LPC-A"}
                    width={"240"}
                    height={"280"}
                  />
                  <strong>{"Sarah Bell, LPC-A"}</strong>
                  <span>
                    {
                      "Counselor Associate · Supervised by Whitney Briggs, LPC-S"
                    }
                  </span>
                </a>
              </li>
              <li>
                <a
                  className={"portrait-card"}
                  href={"/therapists/sarah-critzman/"}
                >
                  <img loading="lazy"
                    src={"/assets/presentation/menu/sarah-critzman-500.webp"}
                    alt={"Sarah Critzman, LMSW"}
                    width={"240"}
                    height={"280"}
                  />
                  <strong>{"Sarah Critzman, LMSW"}</strong>
                  <span>
                    {
                      "Master Social Worker · Supervised by Christi Lawson, LCSW-S"
                    }
                  </span>
                </a>
              </li>
            </TeamCarousel>
            <div className={"mega-bottom"}>
              {"Find someone you feel comfortable talking to."}
              <a href={"/contact/"}>{"Let us help you choose →"}</a>
            </div>
          </NavMenu>
          {"\n"}
          <NavMenu
            id="about-panel"
            panelClassName="mega about-menu"
            label={
              <>
                {"Resources "}
                <span aria-hidden={"true"}>{"⌄"}</span>
              </>
            }
          >
            <section>
              <h2>{"About The Bridge"}</h2>
              <a href={"/blog/"}>{"Articles & resources →"}</a>
            </section>
            <section>
              <h2>{"Your first step"}</h2>
              <a href={"/contact/"}>{"Book an Appointment"}</a>
              <a href={"/contact/#questions"}>
                {"Questions about getting started"}
              </a>
              <a href={"/contact/#location"}>{"Location & contact details"}</a>
              <a href={"tel:9032838729"}>{"Call (903) 283-8729"}</a>
            </section>
            <a
              className={"menu-feature wide"}
              href={"/christian-counseling-tyler/"}
            >
              <img width="1200" height="800" loading="lazy"
                src={"/assets/presentation/menu/team-1200.webp"}
                alt={"A stone bridge surrounded by greenery"}
              />
              <span>
                <strong>{"Christian Counseling"}</strong>
                {"Learn how faith and counseling come together at The Bridge."}
                <b>{"Learn more"}</b>
              </span>
            </a>
          </NavMenu>
          {"\n"}
          <a className={"nav-direct"} href={"/contact/"}>
            {"Contact"}
          </a>
          <a className={"button header-cta"} href={"/contact/"}>
            {"Book an Appointment"}
          </a>
        </Navigation>
      </div>
    </HeaderFrame>
  );
}
