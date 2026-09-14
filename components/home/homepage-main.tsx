"use client";

import { useEffect, useRef, type ReactNode } from "react";

const targetsSelector =
  ".ivory-service, .ivory-person, .faith-copy > :not(.faith-leaves), .ivory-next > div, .services-heading > *, .highlight-card, .why-copy > .eyebrow, .why-copy > h2, .why-intro, .why-values > section, .why-links, .why-copy > .button, .founders-story, .therapist-heading > *, .therapist-card, .therapist-bottom, .getting-started-heading > *, .starting-steps > li, .getting-started-actions";

export function HomepageMain({ children }: { children: ReactNode }) {
  const main = useRef<HTMLElement>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;
    const targets = [
      ...(main.current?.querySelectorAll<HTMLElement>(targetsSelector) ?? []),
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("scroll-pending");
          observer.unobserve(entry.target);
          if (!preference.matches) entry.target.classList.add("scroll-enter");
        });
      },
      { threshold: 0, rootMargin: "0px 0px -35px 0px" },
    );
    function animationEnd(event: Event) {
      (event.currentTarget as HTMLElement).classList.remove("scroll-enter");
    }
    targets.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight) return;
      if (
        element.matches(
          ".highlight-card,.therapist-card,.starting-steps > li",
        ) &&
        element.parentElement
      ) {
        const index = [...element.parentElement.children].indexOf(element);
        element.style.setProperty("--rise-delay", `${index * 140}ms`);
      }
      element.classList.add("scroll-pending");
      observer.observe(element);
      element.addEventListener("animationend", animationEnd, { once: true });
    });
    function focus(event: FocusEvent) {
      const target =
        event.target instanceof Element
          ? event.target.closest(".scroll-pending,.scroll-enter")
          : null;
      if (target) {
        target.classList.remove("scroll-pending", "scroll-enter");
        observer.unobserve(target);
      }
    }
    function reduce() {
      if (preference.matches) {
        observer.disconnect();
        targets.forEach((element) =>
          element.classList.remove("scroll-pending", "scroll-enter"),
        );
      }
    }
    document.addEventListener("focusin", focus);
    preference.addEventListener("change", reduce);
    return () => {
      observer.disconnect();
      document.removeEventListener("focusin", focus);
      preference.removeEventListener("change", reduce);
      targets.forEach((element) => {
        element.classList.remove("scroll-pending", "scroll-enter");
        element.style.removeProperty("--rise-delay");
        element.removeEventListener("animationend", animationEnd);
      });
    };
  }, []);
  return (
    <main id="main" className="ivory-home" ref={main}>
      {children}
    </main>
  );
}
