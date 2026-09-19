"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function TeamCarousel({
  children,
  id = "team-track",
  className = "",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  function updateArrows() {
    const element = track.current;
    if (!element) return;
    const end = element.scrollWidth - element.clientWidth;
    const start = element.scrollLeft <= 2;
    const atEnd = element.scrollLeft >= end - 2;
    setEdges((previous) =>
      previous.start === start && previous.end === atEnd
        ? previous
        : { start, end: atEnd },
    );
  }
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const observer = new ResizeObserver(updateArrows);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  function scroll(direction: number) {
    const element = track.current;
    const card = element?.querySelector("li");
    if (!element || !card) return;
    element.scrollBy({
      left: direction * (card.getBoundingClientRect().width + 20),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <div className={["team-carousel", className].filter(Boolean).join(" ")}>
      <div className="team-carousel-controls">
        <span>Explore our counselors</span>
        <div>
          <button
            className="team-scroll-button"
            type="button"
            data-team-direction="-1"
            aria-label="Previous therapists"
            aria-controls={id}
            aria-disabled={edges.start}
            onClick={() => {
              if (!edges.start) scroll(-1);
            }}
          >
            ←
          </button>
          <button
            className="team-scroll-button"
            type="button"
            data-team-direction="1"
            aria-label="Next therapists"
            aria-controls={id}
            aria-disabled={edges.end}
            onClick={() => {
              if (!edges.end) scroll(1);
            }}
          >
            →
          </button>
        </div>
      </div>
      <ul
        className="team-track"
        id={id}
        ref={track}
        tabIndex={0}
        aria-label="Therapists. Scroll sideways to explore."
        onScroll={updateArrows}
        onKeyDown={(event) => {
          if (
            event.target === event.currentTarget &&
            (event.key === "ArrowLeft" || event.key === "ArrowRight")
          ) {
            event.preventDefault();
            scroll(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        {children}
      </ul>
    </div>
  );
}
