import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Therapists in Tyler, TX | The Bridge",
  description:
    "Meet the counselors at The Bridge Therapeutic Services in Tyler, Texas. Contact our office for help finding the right therapist.",
};

const therapists = [
  {
    name: "Jennifer Wood",
    credential: "LPC-S · Licensed Professional Counselor–Supervisor",
    image: "jennifer",
    width: 500,
    height: 750,
  },
  {
    name: "Erin Young",
    credential: "LCSW-S · Licensed Clinical Social Worker–Supervisor",
    image: "erin",
    width: 500,
    height: 750,
  },
  {
    name: "Jill Kirkley",
    credential: "LPC · Licensed Professional Counselor",
    image: "jill",
    width: 500,
    height: 601,
  },
  {
    name: "Alyxandrah “Alyx” White",
    credential: "LMFT, C-DBT · Licensed Marriage and Family Therapist",
    image: "alyx",
    width: 750,
    height: 1125,
  },
  {
    name: "Misty Shultz",
    credential: "LPC · Licensed Professional Counselor",
    image: "misty",
    width: 500,
    height: 707,
  },
  {
    name: "Kim Gonzales",
    credential:
      "LMSW · Licensed Master Social Worker · Supervised by Erin Young, LCSW-S",
    image: "kim",
    width: 500,
    height: 750,
  },
  {
    name: "Kelley Bell",
    credential: "LPC · Licensed Professional Counselor",
    image: "kelley",
    width: 750,
    height: 1125,
  },
  {
    name: "Denise Santos",
    credential: "LPC · Licensed Professional Counselor",
    image: "denise",
    width: 750,
    height: 1125,
  },
  {
    name: "Sarah Bell",
    credential:
      "LPC-A · Licensed Professional Counselor Associate · Supervised by Whitney Briggs, LPC-S",
    image: "sarah-bell",
    width: 500,
    height: 750,
  },
  {
    name: "Sarah Critzman",
    credential:
      "LMSW · Licensed Master Social Worker · Supervised by Christi Lawson, LCSW-S",
    image: "sarah-critzman",
    width: 500,
    height: 750,
  },
];

export default function TherapistsPage() {
  return (
    <SiteShell
      styles={[
        "/style.css",
        "/homepage-ending.css",
        "/typography.css",
        "/team-menu.css",
        "/reference-palette.css",
        "/polish.css",
        "/ivory-design.css",
        "/therapist-directory.css",
      ]}
    >
      <main id="main" className="therapist-directory">
        <div className="directory-intro">
          <p className="eyebrow">THE BRIDGE · TYLER, TEXAS</p>
          <h1>Meet Our Therapists</h1>
          <p>
            Our team at The Bridge includes counselors serving individuals,
            couples, children, teens, and families in Tyler, Texas. Our office
            can help you find a counselor who fits your needs.
          </p>
        </div>
        <ul className="directory-grid" aria-label="Our therapists">
          {therapists.map((therapist) => (
            <li key={therapist.image} className="directory-card">
              <img
                src={`/assets/${therapist.image}.jpg`}
                alt={therapist.name}
                width={therapist.width}
                height={therapist.height}
                loading="lazy"
              />
              <h2>
                {therapist.image === "jennifer" ? (
                  <a href="/therapists/jennifer-wood/">{therapist.name}</a>
                ) : therapist.image === "erin" ? (
                  <a href="/therapists/erin-young/">{therapist.name}</a>
                ) : therapist.image === "alyx" ? (
                  <a href="/therapists/alyxandrah-white/">{therapist.name}</a>
                ) : therapist.image === "kelley" ? (
                  <a href="/therapists/kelley-bell/">{therapist.name}</a>
                ) : therapist.image === "denise" ? (
                  <a href="/therapists/denise-santos/">{therapist.name}</a>
                ) : therapist.image === "jill" ? (
                  <a href="/therapists/jill-kirkley/">{therapist.name}</a>
                ) : therapist.name}
              </h2>
              <p>{therapist.credential}</p>
            </li>
          ))}
        </ul>
        <div className="directory-help">
          <h2>You don’t have to choose on your own.</h2>
          <p>Contact our office for help finding the right fit.</p>
          <a className="button" href="/contact/">
            Book an Appointment
          </a>
        </div>
      </main>
    </SiteShell>
  );
}
