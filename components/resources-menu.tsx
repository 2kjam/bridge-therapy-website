export function ResourcesMenu() {
  return (
    <>
      <div className="resources-intro">
        <p className="eyebrow">THE BRIDGE</p>
        <h2>Resources</h2>
        <p>Learn how faith and counseling come together at The Bridge.</p>
        <div className="resources-flourish" aria-hidden="true"><i /><i /><i /><i /></div>
      </div>
      <section className="resources-links" aria-label="Resources">
        <a href="/blog/">Articles &amp; resources<span aria-hidden="true">›</span></a>
        <a href="/christian-counseling-tyler/">Christian Counseling<span aria-hidden="true">›</span></a>
        <a href="/contact/">Book an Appointment<span aria-hidden="true">›</span></a>
        <a href="/contact/#questions">Questions about getting started<span aria-hidden="true">›</span></a>
        <a href="/contact/#location">Location &amp; contact details<span aria-hidden="true">›</span></a>
        <a href="tel:9032838729">Call (903) 283-8729<span aria-hidden="true">›</span></a>
        <a href="/online-therapy-texas/">Online Therapy in Texas<span aria-hidden="true">›</span></a>
      </section>
      <div className="resources-feature">
        <img src="/assets/presentation/menu/resources-blog-720.webp" width="720" height="480" alt="" loading="lazy" decoding="async" />
        <div className="resources-feature-panel">
          <h3>Insights for Real Life</h3>
          <p>Explore articles and resources from The Bridge.</p>
          <a href="/blog/">Visit the Blog<span aria-hidden="true">→</span></a>
        </div>
      </div>
    </>
  );
}
