import assert from "node:assert/strict";
import { parseFragment } from "parse5";

const all = (n, predicate) => [...(predicate(n) ? [n] : []), ...(n.childNodes ?? []).flatMap(c => all(c, predicate))];
const attr = (n, name) => n.attrs?.find(a => a.name === name)?.value;

// The approved Resources-only structure. Other header elements retain their strict migration comparison.
export function expectResourcesMenu(doc) {
  const panel = all(doc, n => attr(n, "id") === "about-panel")[0];
  const destinations = n => [...new Set(all(n, n => n.tagName === "a").map(n => attr(n, "href")))].sort();
  const replacement = parseFragment(`<div class="resources-intro">
    <p class="eyebrow">THE BRIDGE</p><h2>Resources</h2>
    <p>Learn how faith and counseling come together at The Bridge.</p>
    <div class="resources-flourish" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
  </div>
  <section class="resources-links" aria-label="Resources">
    <a href="/blog/">Articles &amp; resources<span aria-hidden="true">›</span></a>
    <a href="/christian-counseling-tyler/">Christian Counseling<span aria-hidden="true">›</span></a>
    <a href="/contact/">Book an Appointment<span aria-hidden="true">›</span></a>
    <a href="/contact/#questions">Questions about getting started<span aria-hidden="true">›</span></a>
    <a href="/contact/#location">Location &amp; contact details<span aria-hidden="true">›</span></a>
    <a href="tel:9032838729">Call (903) 283-8729<span aria-hidden="true">›</span></a>
  </section>
  <div class="resources-feature">
    <img src="/assets/presentation/menu/resources-blog-720.webp" width="720" height="480" alt="" loading="lazy" decoding="async">
    <div class="resources-feature-panel"><h3>Insights for Real Life</h3><p>Explore articles and resources from The Bridge.</p><a href="/blog/">Visit the Blog<span aria-hidden="true">→</span></a></div>
  </div>`);
  assert.deepEqual(destinations(replacement), destinations(panel), "Every existing Resources destination must be retained");
  panel.childNodes = replacement.childNodes;
  for (const child of panel.childNodes) child.parentNode = panel;
}
