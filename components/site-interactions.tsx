"use client";

import { flushSync } from "react-dom";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { InquiryWidget } from "./inquiry-widget";

type SiteUI = {
  openPanel: string | null;
  mobileOpen: boolean;
  setOpenPanel: (panel: string | null) => void;
  setMobileOpen: (open: boolean) => void;
  schedulePanel: (panel: string | null, delay: number) => void;
};
const SiteContext = createContext<SiteUI | null>(null);

export function useSiteUI() {
  const context = useContext(SiteContext);
  if (!context) throw new Error("Site interactions require SiteProvider");
  return context;
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [openPanel, updatePanel] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const setOpenPanel = useCallback((panel: string | null) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    updatePanel(panel);
  }, []);
  const schedulePanel = useCallback((panel: string | null, delay: number) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => updatePanel(panel), delay);
  }, []);
  useEffect(
    () => () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    },
    [],
  );

  return (
    <SiteContext.Provider
      value={{
        openPanel,
        mobileOpen,
        setOpenPanel,
        setMobileOpen,
        schedulePanel,
      }}
    >
      {children}
      <InquiryWidget />
    </SiteContext.Provider>
  );
}

export function FindTherapistButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { setOpenPanel, setMobileOpen } = useSiteUI();
  return (
    <button
      className={className}
      id="meet-team"
      onClick={() => {
        // The mobile navigation must be visible before its trigger can receive focus.
        flushSync(() => {
          if (window.matchMedia("(max-width:1050px)").matches)
            setMobileOpen(true);
          setOpenPanel("team-panel");
        });
        document
          .querySelector<HTMLButtonElement>('[aria-controls="team-panel"]')
          ?.focus();
      }}
    >
      {children}
    </button>
  );
}
