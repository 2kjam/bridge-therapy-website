"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { limits, therapistValue, validateInquiry, sendInquiry, type ChatInquiry } from "@/lib/inquiry";
import styles from "./inquiry-widget.module.css";

const popupWelcome = "Hi. Welcome to The Bridge Therapeutic Services. Thank you for visiting our website. If you would like to make an appointment, or just have questions, please answer the following questions and we'll get back to you as soon as possible. Thank you.";
const greeting = popupWelcome;
const privacy = "Please don't include sensitive medical or personal health information here.";
const empty: ChatInquiry = { first_name: "", email: "", phone: "", preferred_therapist: "", message: "", "bot-field": "" };
const steps = ["first_name", "email", "phone", "message_choice", "message", "review", "success", "edit"] as const;
type Step = typeof steps[number];
type Message = { role: "assistant" | "visitor"; text: string; summary?: Pick<ChatInquiry, "first_name" | "email" | "phone"> };
const sessionKey = "bridge-inquiry-prompt-shown";
const labels = { first_name: "First name", email: "Email", phone: "Phone", message: "Message" };

function AssistantAvatar() {
  return <img className={styles.avatar} src="/assets/chat-assistant.webp" width={256} height={243} alt="" aria-hidden="true" />;
}

export function InquiryWidget() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [step, setStep] = useState<Step>("first_name");
  const [answers, setAnswers] = useState<ChatInquiry>(empty);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: greeting }, { role: "assistant", text: "Can I get your name?" },
  ]);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [typing, setTyping] = useState(false);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const replyCount = useRef(0);
  const launcher = useRef<HTMLButtonElement>(null);
  const widget = useRef<HTMLElement>(null);
  const transcript = useRef<HTMLDivElement>(null);
  const composer = useRef<HTMLDivElement>(null);
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
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => () => { if (replyTimer.current) clearTimeout(replyTimer.current); }, []);
  useEffect(() => {
    if (open && !typing) composer.current?.querySelector<HTMLElement>("input:not([type=hidden]), textarea, button, a")?.focus({ preventScroll: true });
    else if (!open && initialized.current) launcher.current?.focus();
  }, [open, step, typing]);
  useEffect(() => {
    if (open && transcript.current) transcript.current.scrollTop = transcript.current.scrollHeight;
  }, [open, messages, error, pending, typing]);
  useEffect(() => {
    const viewport = window.visualViewport;
    function resize() {
      widget.current?.style.setProperty("--chat-height", `${viewport?.height ?? window.innerHeight}px`);
      widget.current?.style.setProperty("--chat-lift", `${Math.max(0, window.innerHeight - ((viewport?.height ?? window.innerHeight) + (viewport?.offsetTop ?? 0)))}px`);
      if (transcript.current) transcript.current.scrollTop = transcript.current.scrollHeight;
    }
    resize();
    viewport?.addEventListener("resize", resize);
    viewport?.addEventListener("scroll", resize);
    window.addEventListener("resize", resize);
    return () => { viewport?.removeEventListener("resize", resize); viewport?.removeEventListener("scroll", resize); window.removeEventListener("resize", resize); };
  }, []);

  function close() { rememberPrompt(); setPrompt(false); setOpen(false); launcher.current?.focus(); }
  function expand() {
    rememberPrompt(); setPrompt(false);
    if (!initialized.current) {
      sourcePage.current = window.location.pathname;
      const match = sourcePage.current.match(/^\/therapists\/([^/]+)\/?$/);
      const selected = therapistValue(match?.[1] ?? null);
      setAnswers({ ...empty, preferred_therapist: selected });

      initialized.current = true;
    }
    setOpen(true);
  }
  function question(next: Step) {
    const questions: Record<Step, string> = {
      first_name: "Can I get your name?",
      email: "What is your email address?",
      phone: "And your phone number?",
      message_choice: "Would you like to add a short message for the office?",
      message: "Sure. Please keep it brief and don't include sensitive medical or personal health information.",
      review: "Here's what I'll send to The Bridge:",
      success: "Perfect. Thank you. We'll have someone contact you as soon as possible.  If it's currently during business hours, you can call us directly at 903-283-8729",
      edit: "What would you like to change?",
    };
    return questions[next];
  }
  function assistantReply(message: Message, next: Step) {
    if (replyTimer.current) clearTimeout(replyTimer.current);
    setTyping(true);
    const delay = [560, 680, 740][replyCount.current++ % 3];
    replyTimer.current = setTimeout(() => {
      replyTimer.current = null;
      setMessages(previous => [...previous, message]);
      setStep(next);
      setTyping(false);
    }, delay);
  }
  function restart() {
    if (busy.current) return;
    if (replyTimer.current) clearTimeout(replyTimer.current);
    replyTimer.current = null;
    replyCount.current = 0;
    rememberPrompt();
    setTyping(false); setError(""); setPending(false); setEditing(false);
    sourcePage.current = window.location.pathname;
    const match = sourcePage.current.match(/^\/therapists\/([^/]+)\/?$/);
    const selected = therapistValue(match?.[1] ?? null);

    setAnswers({ ...empty, preferred_therapist: selected });
    setMessages([{role:"assistant", text:greeting}, {role:"assistant", text:"Can I get your name?"}]);
    setStep("first_name");
  }
  function go(next: Step, reply?: string, data = answers) {
    setError("");
    if (reply) setMessages(previous => [...previous, { role: "visitor", text: reply }]);
    const message: Message = { role: "assistant", text: question(next), ...(next === "review" ? { summary: { first_name: data.first_name, email: data.email, phone: data.phone } } : {}) };
    if (next === "success") { setStep(next); setMessages(previous => [...previous, message]); }
    else assistantReply(message, next);
  }
  function respond(data: ChatInquiry, reply: string, next: Step) {
    setAnswers(data);
    go(editing ? "review" : next, reply, data);
    if (editing) setEditing(false);
  }
  function next(event: FormEvent) {
    event.preventDefault();
    const checked = validateInquiry(answers, "chat_widget");
    const fieldError = checked.errors[step as keyof ChatInquiry];
    if (fieldError) { setError(fieldError); return; }
    respond(checked.data, checked.data[step as keyof ChatInquiry] || "Skip", steps[steps.indexOf(step) + 1]);
  }
  async function submit() {
    if (busy.current) return;
    const checked = validateInquiry(answers, "chat_widget");
    const invalid = Object.keys(checked.errors)[0] as keyof ChatInquiry | undefined;
    if (invalid) {
      if (steps.includes(invalid as Step)) setStep(invalid as Step);
      setError(checked.errors[invalid]!); return;
    }
    busy.current = true; setPending(true); setError("");
    try {
      await sendInquiry(checked.data, sourcePage.current, "chat_widget");
      setAnswers({ ...empty, first_name: checked.data.first_name });
      go("success", undefined, checked.data);
    } catch {
      setError("Something went wrong and your inquiry wasn't sent. Please try again, or contact The Bridge directly.");
    } finally { busy.current = false; setPending(false); }
  }
  const textStep = ["first_name", "email", "phone", "message"].includes(step);
  const field = step as keyof ChatInquiry;
  return (
    <aside ref={widget} className={styles.widget} data-open={open} aria-label="Contact inquiry assistant">
      {prompt && !open && <div className={styles.prompt}>
        <button className={styles.close} aria-label="Dismiss welcome prompt" onClick={close}>×</button>
        <button className={styles.welcomeBubble} onClick={expand}><AssistantAvatar /><span>{popupWelcome}</span></button>
      </div>}
      {open && <section id="inquiry-widget-panel" role="dialog" aria-labelledby="widget-title" className={styles.panel}
        onKeyDown={event => { if (event.key === "Escape") { event.stopPropagation(); close(); } }}>
        <header className={styles.header}>
          <AssistantAvatar />
          <div><strong id="widget-title">The Bridge</strong><span className={styles.subtitle}>Automated inquiry assistant</span></div>
          <button className={styles.restart} aria-label="Restart conversation" disabled={pending} onClick={restart}><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 10a8 8 0 1 1 1 8M4 4v6h6" /></svg></button>
          <button className={styles.close} aria-label="Close inquiry assistant" onClick={close}>×</button>
        </header>
        <div ref={transcript} className={styles.transcript} role="log" aria-label="Inquiry conversation" aria-live="polite" aria-relevant="additions" aria-atomic="false" tabIndex={0}>
          {messages.map((message, index) => <div key={index} className={message.role === "visitor" ? styles.visitor : styles.assistant} data-speaker={message.role}>
            {message.role === "assistant" && <AssistantAvatar />}
            <span className={styles.srOnly}>{message.role === "visitor" ? "You: " : "The Bridge: "}</span>
            <p>{message.text}</p>
            {message.summary && <dl className={styles.summary}>
              <dt>Name</dt><dd>{message.summary.first_name}</dd>
              <dt>Email</dt><dd>{message.summary.email}</dd>
              <dt>Phone</dt><dd>{message.summary.phone || "Not provided"}</dd>

            </dl>}
          </div>)}
          {typing && <div className={styles.assistant} data-typing="true"><AssistantAvatar /><span className={styles.srOnly}>Preparing the next question</span><span className={styles.dots} aria-hidden="true"><i /><i /><i /></span></div>}
          {pending && <p className={styles.assistant}><AssistantAvatar />Sending your inquiry…</p>}
          {error && step === "review" && <div className={styles.assistant}><AssistantAvatar /><p>{error}</p><p><a href="tel:9032838729">(903) 283-8729</a> or <a href="mailto:info@thebridgetherapy.com">info@thebridgetherapy.com</a></p></div>}
        </div>
        <div ref={composer} className={styles.composer} aria-busy={typing}>
          {!typing && <>
          {textStep && <form onSubmit={next} noValidate>
            <label htmlFor="widget-answer" className={styles.srOnly}>{labels[step as keyof typeof labels]}</label>
            {step === "message" && <p id="widget-privacy" className={styles.privacy}>{privacy}</p>}
            <div className={styles.inputRow}>
              {step === "message" ? <textarea id="widget-answer" rows={2} placeholder="Type a short message…" maxLength={limits.message} value={answers.message} aria-describedby="widget-privacy widget-error" onChange={e => setAnswers({ ...answers, message: e.target.value })} />
                : <input id="widget-answer" type={step === "email" ? "email" : step === "phone" ? "tel" : "text"}
                  placeholder={step === "first_name" ? "Type an answer" : step === "phone" ? "Type phone number" : `Type your ${labels[step as keyof typeof labels].toLowerCase()}…`}
                  autoComplete={step === "first_name" ? "given-name" : step === "phone" ? "tel" : "email"}
                  required={step !== "phone"} maxLength={limits[field]} value={answers[field]} aria-invalid={!!error} aria-describedby="widget-error"
                  onChange={e => setAnswers({ ...answers, [field]: e.target.value })} />}
              <button className={styles.send} type="submit" aria-label="Send answer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 4 17 8-17 8 3-8-3-8Zm3 8h14" /></svg></button>
            </div>
            {(step === "phone" || step === "message") && <button className={styles.chip} type="button" onClick={() => respond({ ...answers, [field]: "" }, "Skip", step === "phone" ? "message_choice" : "review")}>Skip</button>}
          </form>}
          {step === "message_choice" && <div className={styles.actions}><button className={styles.chip} onClick={() => go("message", "Add a message")}>Add a message</button><button className={styles.chip} onClick={() => { const data = { ...answers, message: "" }; setAnswers(data); go("review", "No message", data); }}>No, send my inquiry</button></div>}
          {step === "review" && <div className={styles.actions}>
            <button className={styles.primary} disabled={pending} onClick={submit}>{error ? "Try Again" : "Send Inquiry"}</button>
            {error ? <a href="/contact/">View Contact Information</a> : <button className={styles.chip} disabled={pending} onClick={() => go("edit", "Make a Change")}>Make a Change</button>}
          </div>}
          {step === "edit" && <div className={styles.choices}>{Object.entries(labels).map(([key, label]) => <button className={styles.chip} key={key} onClick={() => { setEditing(true); go(key as Step, label); }}>{label}</button>)}</div>}
          {step === "success" && <div className={styles.actions}><button className={styles.primary} onClick={close}>Close</button><a href="/contact/">View Contact Information</a></div>}
          <div id="widget-error" role="alert" className={styles.error}>{step !== "review" ? error : ""}</div>
          </>}
        </div>
        <div className={styles.honeypot} aria-hidden="true"><label htmlFor="widget-bot">Leave this field empty</label><input id="widget-bot" name="bot-field" tabIndex={-1} autoComplete="off" maxLength={limits["bot-field"]} value={answers["bot-field"]} onChange={e => setAnswers({ ...answers, "bot-field": e.target.value })} /></div>
      </section>}
      <button ref={launcher} id="chat-open" className={styles.launcher} aria-label={open ? "Close inquiry assistant" : "Open inquiry assistant"} aria-haspopup="dialog" aria-expanded={open} aria-controls={open ? "inquiry-widget-panel" : undefined} onClick={open ? close : expand}>
        <AssistantAvatar />
      </button>
    </aside>
  );
}
