"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useSiteUI } from "./site-interactions";

export function HeaderFrame({ children }: { children: ReactNode }) {
  const header = useRef<HTMLElement>(null);
  const { openPanel, mobileOpen, setOpenPanel, setMobileOpen } = useSiteUI();
  useEffect(() => {
    function close() {
      setOpenPanel(null);
      setMobileOpen(false);
    }
    function outside(event: MouseEvent) {
      if (
        event.target instanceof Element &&
        !event.target.closest(".header, #meet-team")
      )
        close();
    }
    function focus(event: FocusEvent) {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setOpenPanel(null);
    }
    function keyboard(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (openPanel) {
        setOpenPanel(null);
        header.current
          ?.querySelector<HTMLButtonElement>(`[aria-controls="${openPanel}"]`)
          ?.focus();
      } else if (mobileOpen) {
        setMobileOpen(false);
        header.current
          ?.querySelector<HTMLButtonElement>(".mobile-toggle")
          ?.focus();
      }
    }
    const desktop = window.matchMedia("(min-width:1051px)");
    desktop.addEventListener("change", close);
    document.addEventListener("click", outside);
    document.addEventListener("focusin", focus);
    document.addEventListener("keydown", keyboard);
    return () => {
      desktop.removeEventListener("change", close);
      document.removeEventListener("click", outside);
      document.removeEventListener("focusin", focus);
      document.removeEventListener("keydown", keyboard);
    };
  }, [openPanel, mobileOpen, setOpenPanel, setMobileOpen]);
  return (
    <header className="header" ref={header}>
      {children}
    </header>
  );
}

export function MobileToggle() {
  const { mobileOpen, setMobileOpen, setOpenPanel } = useSiteUI();
  return (
    <button
      className="mobile-toggle"
      aria-controls="navigation"
      aria-expanded={mobileOpen}
      onClick={() => {
        setMobileOpen(!mobileOpen);
        if (mobileOpen) setOpenPanel(null);
      }}
    >
      Menu <span aria-hidden="true">☰</span>
    </button>
  );
}

export function Navigation({ children }: { children: ReactNode }) {
  const { mobileOpen, setOpenPanel, setMobileOpen } = useSiteUI();
  return (
    <nav
      id="navigation"
      aria-label="Main navigation"
      className={mobileOpen ? "mobile-open" : undefined}
      onClick={(event) => {
        if (event.target instanceof Element && event.target.closest("a")) {
          setOpenPanel(null);
          setMobileOpen(false);
        }
      }}
    >
      {children}
    </nav>
  );
}

export function NavMenu({
  id,
  label,
  panelClassName,
  children,
}: {
  id: string;
  label: ReactNode;
  panelClassName: string;
  children: ReactNode;
}) {
  const { openPanel, setOpenPanel, schedulePanel } = useSiteUI();
  const panel = useRef<HTMLDivElement>(null);
  const focusFirst = useRef(false);
  useEffect(() => {
    if (openPanel === id && focusFirst.current) {
      panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
      focusFirst.current = false;
    }
  }, [openPanel, id]);
  return (
    <div
      className="nav-item"
      onPointerEnter={(event) => {
        if (
          event.pointerType === "mouse" &&
          window.matchMedia("(min-width:1051px)").matches
        ) {
          schedulePanel(id, 140);
        }
      }}
      onPointerLeave={(event) => {
        if (
          event.pointerType === "mouse" &&
          window.matchMedia("(min-width:1051px)").matches
        ) {
          schedulePanel(null, 220);
        }
      }}
    >
      <button
        className="nav-trigger"
        aria-expanded={openPanel === id}
        aria-controls={id}
        onClick={() => {
          setOpenPanel(openPanel === id ? null : id);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            if (openPanel === id)
              panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
            else {
              focusFirst.current = true;
              setOpenPanel(id);
            }
          }
        }}
      >
        {label}
      </button>
      <div
        className={panelClassName}
        id={id}
        hidden={openPanel !== id}
        ref={panel}
      >
        {children}
      </div>
    </div>
  );
}
