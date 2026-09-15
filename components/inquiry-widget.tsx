"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { limits, therapists, therapistValue, validateInquiry, sendInquiry, type Inquiry } from "@/lib/inquiry";
import styles from "./inquiry-widget.module.css";

const welcome = "Hi! Welcome to The Bridge Therapeutic Services. If you'd like to ask about counseling or an appointment, I can help you send a quick inquiry to our team.";
const empty: Inquiry = { first_name: "", last_name: "", email: "", phone: "", preferred_therapist: "", message: "", "bot-field": "" };
const steps = ["welcome", "first_name", "last_name", "email", "phone", "preferred_therapist", "message_choice", "message", "review", "success"] as const;
type Step = typeof steps[number];
const sessionKey = "bridge-inquiry-prompt-shown";

export function InquiryWidget() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [step, setStep] = useState<Step>("welcome");
  const [answers, setAnswers] = useState<Inquiry>(empty);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const interacted = useRef(false);
  const initialized = useRef(false);
  const sourcePage = useRef("/");
  const busy = useRef(false);

  function rememberPrompt() {
    interacted.current = true;
    try { sessionStorage.setItem(sessionKey, "1"); } catch { /* UI remains usable without storage. */ }
  }
  useEffect(() => {
    try { if (sessionStorage.getItem(sessionKey)) return; } catch { /* Storage may be unavailable. */ }
    const timer = setTimeout(() => {
      if (interacted.current) return;
      setPrompt(true);
      try { sessionStorage.setItem(sessionKey, "1"); } catch { /* No contact information is stored. */ }
    }, 4000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => { if (open) heading.current?.focus(); }, [open, step]);

  function close() {
    rememberPrompt();
    setPrompt(false);
    setOpen(false);
    launcher.current?.focus();
  }
  function expand() {
    rememberPrompt();
    setPrompt(false);
    if (!initialized.current) {
      sourcePage.current = window.location.pathname;
      const match = sourcePage.current.match(/^\/therapists\/([^/]+)\/?$/);
      setAnswers({ ...empty, preferred_therapist: therapistValue(match?.[1] ?? null) });
      initialized.current = true;
    }
    setOpen(true);
  }
  function go(next: Step) { setError(""); setStep(next); }
  function next(event: FormEvent) {
    event.preventDefault();
    const checked = validateInquiry(answers);
    const fieldError = checked.errors[step as keyof Inquiry];
    if (fieldError) { setError(fieldError); return; }
    setAnswers(checked.data);
    go(steps[steps.indexOf(step) + 1]);
  }
  async function submit() {
    if (busy.current) return;
    const checked = validateInquiry(answers);
    const invalid = Object.keys(checked.errors)[0] as keyof Inquiry | undefined;
    if (invalid) {
      if (steps.includes(invalid as Step)) setStep(invalid as Step);
      setError(checked.errors[invalid]!);
      return;
    }
    busy.current = true;
    setPending(true);
    setError("");
    try {
      await sendInquiry(checked.data, sourcePage.current, "chat_widget");
      setAnswers({ ...empty, first_name: checked.data.first_name });
      go("success");
    } catch {
      setError("Something went wrong and your inquiry wasn't sent. Please try again, or contact The Bridge directly.");
    } finally { busy.current = false; setPending(false); }
  }
  const questions: Record<Step, string> = {
    welcome: "Welcome to The Bridge",
    first_name: "What is your first name?",
    last_name: "And your last name?",
    email: `Thanks, ${answers.first_name}. What's your email address?`,
    phone: "And what's the best phone number to reach you?",
    preferred_therapist: "Do you have a therapist in mind?",
    message_choice: "Would you like to add a short message for the office?",
    message: "What would you like the office to know?",
    review: "Ready to send your inquiry?",
    success: `Thanks, ${answers.first_name}. Your inquiry has been sent to The Bridge.`,
  };
  const fieldStep = ["first_name", "last_name", "email", "phone", "preferred_therapist", "message"].includes(step);
  const field = step as keyof Inquiry;
  return (
    <aside className={styles.widget} aria-label="Contact inquiry assistant">
      {prompt && !open && <div className={styles.prompt}>
        <button className={styles.close} aria-label="Dismiss welcome prompt" onClick={close}>×</button>
        <p>{welcome}</p>
        <button className={styles.primary} onClick={expand}>Start an inquiry</button>
      </div>}
      {open && <section id="inquiry-widget-panel" role="dialog" aria-labelledby="widget-title" className={styles.panel}
        onKeyDown={(event) => { if (event.key === "Escape") { event.stopPropagation(); close(); } }}>
        <header className={styles.header}>
          <strong id="widget-title">The Bridge · Inquiry Assistant</strong>
          <button className={styles.close} aria-label="Close inquiry assistant" onClick={close}>×</button>
        </header>
        <div className={styles.body}>
          <p className={styles.caption}>A step-by-step form to contact our office.</p>
          <h2 ref={heading} tabIndex={-1} className={styles.question}>{questions[step]}</h2>
          {step === "welcome" && <>
            <p>{welcome}</p>
            <p className={styles.notice}>Please don&apos;t include sensitive medical or personal health information here.</p>
            <div className={styles.actions}>
              <button className={styles.primary} onClick={() => go("first_name")}>Start</button>
              <a href="/contact/">Use the full Contact form</a>
            </div>
          </>}
          {fieldStep && <form onSubmit={next} noValidate>
            <label htmlFor="widget-answer" className={styles.label}>{questions[step]}</label>
            {step === "preferred_therapist" ? <select id="widget-answer" value={answers.preferred_therapist} aria-invalid={!!error} aria-describedby="widget-error" onChange={(e) => setAnswers({ ...answers, preferred_therapist: e.target.value })}>
              {therapists.map(([slug, name]) => <option key={slug} value={slug}>{name}</option>)}
            </select> : step === "message" ? <>
              <p id="widget-privacy" className={styles.notice}>Please don&apos;t include sensitive medical or personal health information.</p>
              <textarea id="widget-answer" rows={3} maxLength={limits.message} value={answers.message} aria-describedby="widget-privacy widget-error" onChange={(e) => setAnswers({ ...answers, message: e.target.value })} />
            </> : <input id="widget-answer" type={step === "email" ? "email" : step === "phone" ? "tel" : "text"}
              autoComplete={step === "first_name" ? "given-name" : step === "last_name" ? "family-name" : step === "phone" ? "tel" : "email"}
              required={step !== "phone"} maxLength={limits[field]} value={answers[field]} aria-invalid={!!error} aria-describedby="widget-error"
              onChange={(e) => setAnswers({ ...answers, [field]: e.target.value })} />}
            <div className={styles.actions}>
              <button className={styles.primary} type="submit">Continue</button>
              {(step === "phone" || step === "message") && <button type="button" onClick={() => { setAnswers({ ...answers, [field]: "" }); go(step === "phone" ? "preferred_therapist" : "review"); }}>Skip</button>}
              <button type="button" onClick={() => go(steps[steps.indexOf(step) - 1])}>Back</button>
            </div>
          </form>}
          {step === "message_choice" && <div className={styles.actions}>
            <button className={styles.primary} onClick={() => go("message")}>Add a message</button>
            <button onClick={() => { setAnswers({ ...answers, message: "" }); go("review"); }}>No message — review inquiry</button>
            <button onClick={() => go("preferred_therapist")}>Back</button>
          </div>}
          {step === "review" && <>
            <dl className={styles.review}>
              <dt>Name</dt><dd>{answers.first_name} {answers.last_name}</dd>
              <dt>Email</dt><dd>{answers.email}</dd>
              {answers.phone && <><dt>Phone</dt><dd>{answers.phone}</dd></>}
              <dt>Preferred therapist</dt><dd>{therapists.find(([slug]) => slug === answers.preferred_therapist)?.[1]}</dd>
            </dl>
            <p>{answers.message ? "Your message will be included." : "No message added."}</p>
            <div className={styles.actions}>
              <button className={styles.primary} disabled={pending} onClick={submit}>{pending ? "Sending…" : "Send Inquiry"}</button>
              <button disabled={pending} onClick={() => go("first_name")}>Edit answers</button>
            </div>
          </>}
          <div id="widget-error" role="alert" className={styles.error}>{error && <><p>{error}</p>{step === "review" && <p><a href="tel:9032838729">(903) 283-8729</a> or <a href="mailto:info@thebridgetherapy.com">info@thebridgetherapy.com</a></p>}</>}</div>
          <div role="status">{pending ? "Sending your inquiry…" : ""}</div>
          {step === "success" && <>
            <p>A member of the team will contact you about next steps.</p>
            <p>If you&apos;d rather call, you can reach the office at <a href="tel:9032838729">(903) 283-8729</a>.</p>
            <div className={styles.actions}><button className={styles.primary} onClick={close}>Close</button><a href="/contact/">View Contact Information</a></div>
          </>}
          <p className={styles.caption}>Submitting this inquiry does not confirm an appointment.</p>
          <div className={styles.honeypot} aria-hidden="true"><label htmlFor="widget-bot">Leave this field empty</label><input id="widget-bot" name="bot-field" tabIndex={-1} autoComplete="off" maxLength={limits["bot-field"]} value={answers["bot-field"]} onChange={(e) => setAnswers({ ...answers, "bot-field": e.target.value })} /></div>
        </div>
      </section>}
      <button ref={launcher} id="chat-open" className={styles.launcher} aria-label={open ? "Close inquiry assistant" : "Open inquiry assistant"} aria-haspopup="dialog" aria-expanded={open} aria-controls={open ? "inquiry-widget-panel" : undefined} onClick={open ? close : expand}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-8 8H5l-4 3 1.5-6A8 8 0 1 1 20 11.5Z"/><path d="M6 10h8M6 14h5"/></svg>
      </button>
    </aside>
  );
}
