import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Kalynne Arrick, Office Manager | The Bridge",
  description: "Meet Kalynne Arrick, Office Manager at The Bridge Therapeutic Services in Tyler, Texas.",
};

export default function KalynneArrickPage() {
  return (
    <SiteShell styles={["/style.css", "/homepage-ending.css", "/typography.css", "/team-menu.css", "/reference-palette.css", "/polish.css", "/ivory-design.css", "/therapist-profile.css", "/staff-profile.css"]}>
      <main id="main" className="staff-profile">
        <nav className="profile-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li>
            <li aria-current="page">Kalynne Arrick</li>
          </ol>
        </nav>
        <section className="profile-intro" aria-labelledby="kalynne-title">
          <img src="/assets/kalynne.jpg" width="2500" height="3750" alt="Portrait of Kalynne Arrick" />
          <div>
            <h1 id="kalynne-title">Kalynne Arrick</h1>
            <p className="profile-credential">Office Manager</p>
            <h2>Helping you get started at The Bridge</h2>
            <p>Kalynne is The Bridge’s Office Manager. If you have questions about getting started, our office is here to help you take the next step.</p>
            <a className="button" href="/contact/">Contact The Bridge</a>
          </div>
        </section>
        <div className="profile-details">
          <section aria-labelledby="kalynne-about-title">
            <h2 id="kalynne-about-title">About Kalynne</h2>
            <p>Kalynne graduated from LeTourneau University in 2012 with a Bachelor’s degree in Business Administration and is currently pursuing her Master’s in Clinical Mental Health Counseling at University of the Cumberlands.</p>
            <p>For over a decade, Kalynne has owned and operated her photography business, where she has worked closely with families, children, and individuals during meaningful and often vulnerable moments in their lives. Through those experiences, she developed a deep appreciation for listening well, building trust, and helping people feel seen, understood, and valued.</p>
            <p>Her desire to pursue counseling has been shaped not only by her professional experiences, but also by personal experiences with grief, hardship, healing, and growth. These experiences deepened her compassion for others, and she felt the Lord&apos;s calling to walk alongside people during difficult seasons of life.</p>
            <p>Kalynne is especially passionate about supporting children and families, with a particular interest in play therapy and relationship dynamics. She hopes to help create spaces where people feel safe to grow, process, and heal.</p>
            <p>Outside of work, Kalynne enjoys spending time with her husband and three sons, creative projects, gardening, and finding beauty in everyday life. Her faith, compassion, and genuine care for others remain at the heart of both her personal life and professional relationships.</p>
            <blockquote className="staff-scripture"><p>The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness. “The Lord is my portion,” says my soul, “therefore I will hope in him.” Lamentations 3:22-24</p></blockquote>
          </section>
        </div>
      </main>
    </SiteShell>
  );
}
