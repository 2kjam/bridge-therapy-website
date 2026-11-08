import { optimizedImageProps, heroImageSizes, backgroundAvifProps } from "@/lib/optimized-images";
import { FindTherapistButton } from "../site-interactions";
export function Hero() {
  return (
    <section className={"ivory-hero"} aria-labelledby={"hero-title"}>
      <picture style={{ display: "contents" }}>
      <source style={{ display: "none" }} type="image/avif" {...backgroundAvifProps("/assets/ivory-hero.jpg", heroImageSizes)} />
      <img
        className={"ivory-hero-photo"}
        src={"/assets/presentation/delivery/hero-1448.webp"}
        {...optimizedImageProps("/assets/ivory-hero.jpg", heroImageSizes)}
        alt={""}
        width={"2172"}
        height={"724"}
        fetchPriority={"high"}
      />
      </picture>
      <div className={"ivory-hero-copy"}>
        <h1 id={"hero-title"}>Counseling and Therapy in Tyler, TX</h1>
        <p className="hero-brand">Real Help for Real Life</p>
        <p>
          {
            "Compassionate, professional counseling for individuals, couples, families, and children—grounded in hope and a Christian perspective."
          }
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
        {"Heart."}
        <br />
        <span>{"Hope."}</span>
        <br />
        {"Here."}
      </p>
      <div className={"hero-side-note"} aria-hidden={"true"}>
        {"People grow"}
        <br />
        {"here"}
        <i></i>
        {"TYLER, TEXAS"}
      </div>
    </section>
  );
}
