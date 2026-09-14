import { FindTherapistButton } from "../site-interactions";
export function Hero() {
  return (
    <section className={"ivory-hero"} aria-labelledby={"hero-title"}>
      <img
        className={"ivory-hero-photo"}
        src={"/assets/ivory-hero.jpg"}
        alt={""}
        width={"2172"}
        height={"724"}
        fetchPriority={"high"}
      />
      <div className={"ivory-hero-copy"}>
        <h1 id={"hero-title"}>
          Counseling &amp; Therapy in Tyler, Texas
        </h1>
        <p className="hero-brand">Real Help for Real Life</p>
        <p>
          {
            "Compassionate, professional counseling for individuals, couples, and families—grounded in hope and a Christian perspective."
          }
        </p>
        <p>
          Christian counseling for individuals, couples, children, and families in
          Tyler, Texas.
        </p>
        <div className={"ivory-actions"}>
          <a className={"button"} href={"/contact/"}>
            {"Book an Appointment"}
          </a>
          <FindTherapistButton className="button button-outline">
            {"Find a Therapist"}
          </FindTherapistButton>
        </div>
      </div>
      <p className={"hero-script"} aria-hidden={"true"}>
        {"Healing"}
        <br />
        <span>{"Hope"}</span>
        <br />
        {"What’s Next"}
      </p>
      <div className={"hero-side-note"} aria-hidden={"true"}>
        {"PEOPLE CHANGE"}
        <br />
        {"HERE."}
        <i></i>
        {"TYLER, TEXAS"}
      </div>
    </section>
  );
}
