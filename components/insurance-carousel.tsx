"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const logos = [
  ["aetna.png", "Aetna"],
  ["allied.png", "Allied Healthcare"],
  ["blue-cross.jpg", "Blue Cross Blue Shield"],
  ["christus.png", "CHRISTUS Health"],
  ["cigna.jpg", "Cigna"],
  ["healthfirst.jpg", "HealthFirst"],
  ["humana.png", "Humana"],
  ["meritain.jpg", "Meritain Health"],
  ["multiplan.png", "MultiPlan"],
  ["umr.png", "UMR"],
  ["webtpa.png", "WebTPA"],
  ["magellan.png", "Magellan Health"],
] as const;

export function InsuranceCarousel() {
  const viewport = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const interaction = useRef({
    hovered: false,
    focused: false,
    touched: false,
  });
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const element = viewport.current;
    const track = list.current;
    if (!element || !track) return;
    element.scrollLeft = 0;
    if (reducedMotion) return;
    let position = 0;
    let last = 0;
    let frame = 0;
    function advance(time: number) {
      if (!element || !track) return;
      const elapsed = last ? Math.min(time - last, 50) : 0;
      last = time;
      const { hovered, focused, touched } = interaction.current;
      if (!touched && !hovered && !focused && !document.hidden) {
        const first = track.children[0] as HTMLElement;
        const duplicate = track.children[logos.length] as HTMLElement;
        const cycle = duplicate.offsetLeft - first.offsetLeft;
        position += elapsed * 0.025;
        if (cycle > 0 && position >= cycle) position %= cycle;
        element.scrollLeft = position;
      } else position = element.scrollLeft;
      frame = requestAnimationFrame(advance);
    }
    frame = requestAnimationFrame(advance);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);
  return (
    <section
      className="insurance-strip"
      id="insurance"
      aria-labelledby="insurance-title"
    >
      <div className="insurance-heading">
        <h2 id="insurance-title">Let’s talk insurance.</h2>
      </div>
      <div
        className="insurance-window"
        id="insurance-logos"
        ref={viewport}
        tabIndex={0}
        role="region"
        aria-label="Insurance logos. Scroll horizontally to explore."
        onPointerEnter={() => {
          interaction.current.hovered = true;
        }}
        onPointerLeave={() => {
          interaction.current.hovered = false;
        }}
        onFocus={() => {
          interaction.current.focused = true;
        }}
        onBlur={() => {
          interaction.current.focused = false;
        }}
        onTouchStart={() => {
          interaction.current.touched = true;
        }}
      >
        <ul className="insurance-logos" ref={list}>
          {[false, true].map((duplicate) =>
            logos.map(([file, name]) => (
              <li
                key={`${file}-${duplicate}`}
                aria-hidden={duplicate ? true : undefined}
                data-duplicate={duplicate ? "" : undefined}
                hidden={duplicate && reducedMotion}
              >
                <img
                  src={`/assets/insurance/${file}`}
                  alt={duplicate ? "" : name}
                  width="180"
                  height="72"
                  decoding="async"
                />
              </li>
            )),
          )}
        </ul>
      </div>
    </section>
  );
}
