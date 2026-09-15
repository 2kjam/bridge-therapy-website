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

type Preview = { title: string; copy: string };
type SiteUI = {
  openPanel: string | null;
  mobileOpen: boolean;
  setOpenPanel: (panel: string | null) => void;
  setMobileOpen: (open: boolean) => void;
  showPreview: (preview: Preview) => void;
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
  const [preview, setPreview] = useState<Preview | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
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

  useEffect(() => {
    if (preview && !dialog.current?.open) dialog.current?.showModal();
  }, [preview]);

  function showPreview(value: Preview) {
    setOpenPanel(null);
    setMobileOpen(false);
    setPreview(value);
  }

  return (
    <SiteContext.Provider
      value={{
        openPanel,
        mobileOpen,
        setOpenPanel,
        setMobileOpen,
        showPreview,
        schedulePanel,
      }}
    >
      {children}
      <button
        className="chat-button"
        id="chat-open"
        aria-haspopup="dialog"
        onClick={() =>
          showPreview({
            title: "How can we help?",
            copy: "Chat preview: the custom assistant will be built in a later step. It will help visitors find practice information and connect with the office to schedule.",
          })
        }
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M20 11.5a8 8 0 0 1-8 8H5l-4 3 1.5-6A8 8 0 1 1 20 11.5Z" />
          <path d="M6 10h8M6 14h5" />
        </svg>
        {" How can we help?"}
      </button>
      <dialog
        ref={dialog}
        id="detail-dialog"
        aria-labelledby="detail-title"
        onClose={() => setPreview(null)}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            event.currentTarget.close();
        }}
      >
        <button
          className="close"
          aria-label="Close preview"
          onClick={() => dialog.current?.close()}
        >
          ×
        </button>
        <p className="eyebrow">THE BRIDGE</p>
        <h2 id="detail-title">{preview?.title}</h2>
        <p id="detail-copy">{preview?.copy}</p>
        <a className="button" href="/contact/">
          Contact Us →
        </a>
      </dialog>
    </SiteContext.Provider>
  );
}

const specialtyCopy: Record<string, string> = {
  "Anger Counseling": "For support with anger, ask about Jennifer Wood, Alyxandrah (Alyx) White, or Denise Santos. Contact our office to discuss therapist fit and next steps.",
  "Codependency Counseling": "For support with codependency, ask about Erin Young. Contact our office to discuss therapist fit and next steps.",
  "Eating Disorder Counseling": "For support with eating disorders, ask about Jennifer Wood. Contact our office to discuss therapist fit and next steps.",
};

export function PreviewTrigger({
  service,
  href,
  className,
  children,
}: {
  service: string;
  href?: string;
  className?: string;
  children: ReactNode;
}) {
  const { showPreview } = useSiteUI();
  const props = {
    className,
    "data-service": service,
    onClick: (event: React.MouseEvent) => {
      event.preventDefault();
      showPreview({
        title: service,
        copy: specialtyCopy[service] ?? "This specialty page is part of the planned website. For this design preview, you can continue to Contact Us. Our office will help with current services, therapist fit, and scheduling.",
      });
    },
  };
  return href ? (
    <a {...props} href={href}>
      {children}
    </a>
  ) : (
    <button {...props}>{children}</button>
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
