"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { limits, therapists, therapistValue, validateInquiry, sendInquiry, type Inquiry } from "@/lib/inquiry";
import styles from "./inquiry-widget.module.css";

const popupWelcome = "Hi! Welcome to The Bridge Therapeutic Services. If you have any questions, or would like to schedule an appointment, please answer the following questions and we'll get back to you as soon as possible!";
const greeting = "Hi! Welcome to The Bridge Therapeutic Services.";
const welcome = "If you'd like to ask about counseling or an appointment, I can help you send a quick inquiry to our team.";
const privacy = "Please don't include sensitive medical or personal health information here.";
const empty: Inquiry = { first_name: "", last_name: "", email: "", phone: "", preferred_therapist: "", message: "", "bot-field": "" };
const steps = ["welcome", "first_name", "last_name", "email", "phone", "preferred_therapist", "message_choice", "message", "review", "success", "edit"] as const;
type Step = typeof steps[number];
type Message = { role: "assistant" | "visitor"; text: string; summary?: Pick<Inquiry, "first_name" | "last_name" | "email" | "phone" | "preferred_therapist"> };
const sessionKey = "bridge-inquiry-prompt-shown";
const nameOf = (slug: string) => therapists.find(([id]) => id === slug)?.[1].split(",")[0] ?? "Not sure — help me choose";
const firstOf = (slug: string) => slug === "alyxandrah-white" ? "Alyx" : nameOf(slug).split(" ")[0];
const labels = { first_name: "First name", last_name: "Last name", email: "Email", phone: "Phone", preferred_therapist: "Therapist", message: "Message" };

function AssistantAvatar() {
  return <img className={styles.avatar} src="/assets/chat-assistant.webp" width={256} height={243} alt="" aria-hidden="true" />;
}

export function InquiryWidget() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [step, setStep] = useState<Step>("welcome");
  const [answers, setAnswers] = useState<Inquiry>(empty);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: greeting }, { role: "assistant", text: welcome }, { role: "assistant", text: privacy },
  ]);
  const [editing, setEditing] = useState(false);
  const [choosing, setChoosing] = useState(false);
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
  const [profileTherapist, setProfileTherapist] = useState("");
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
  }, [open, step, choosing, typing]);
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
      setProfileTherapist(selected);
      initialized.current = true;
    }
    setOpen(true);
  }
  function question(next: Step, data: Inquiry) {
    const questions: Record<Step, string> = {
      welcome: greeting,
      first_name: "What is your first name?",
      last_name: `Thanks, ${data.first_name}. What's your last name?`,
      email: "What's the best email address to reach you?",
      phone: "And what's the best phone number to reach you?",
      preferred_therapist: profileTherapist && !editing && step !== "edit"
        ? `I see you're looking at ${nameOf(profileTherapist)}'s profile. Would you like to ask about working with ${firstOf(profileTherapist)}?`
        : "Do you have a therapist in mind?",
      message_choice: "Would you like to add a short message for the office?",
      message: "Sure. Please keep it brief and don't include sensitive medical or personal health information.",
      review: "Here's what I'll send to The Bridge:",
      success: `Thanks, ${data.first_name}. Your inquiry has been sent to The Bridge.`,
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
    setTyping(false); setError(""); setPending(false); setEditing(false); setChoosing(false);
    sourcePage.current = window.location.pathname;
    const match = sourcePage.current.match(/^\/therapists\/([^/]+)\/?$/);
    const selected = therapistValue(match?.[1] ?? null);
    setProfileTherapist(selected);
    setAnswers({ ...empty, preferred_therapist: selected });
    setMessages([{role:"assistant", text:greeting}, {role:"assistant", text:welcome}, {role:"assistant", text:privacy}]);
    setStep("welcome");
  }
  function go(next: Step, reply?: string, data = answers) {
    setError("");
    if (reply) setMessages(previous => [...previous, { role: "visitor", text: reply }]);
    const message: Message = { role: "assistant", text: question(next, data), ...(next === "review" ? { summary: { first_name: data.first_name, last_name: data.last_name, email: data.email, phone: data.phone, preferred_therapist: data.preferred_therapist } } : {}) };
    if (next === "success") { setStep(next); setMessages(previous => [...previous, message]); }
    else assistantReply(message, next);
  }
  function respond(data: Inquiry, reply: string, next: Step) {
    setAnswers(data);
    go(editing ? "review" : next, reply, data);
    if (editing) setEditing(false);
  }
  function next(event: FormEvent) {
    event.preventDefault();
    const checked = validateInquiry(answers);
    const fieldError = checked.errors[step as keyof Inquiry];
    if (fieldError) { setError(fieldError); return; }
    respond(checked.data, checked.data[step as keyof Inquiry] || "Skip", steps[steps.indexOf(step) + 1]);
  }
  function choose(slug: string) {
    const data = { ...answers, preferred_therapist: slug };
    const checked = validateInquiry(data);
    if (checked.errors.preferred_therapist) { setError(checked.errors.preferred_therapist); return; }
    respond(checked.data, nameOf(slug), "message_choice");
  }
  async function submit() {
    if (busy.current) return;
    const checked = validateInquiry(answers);
    const invalid = Object.keys(checked.errors)[0] as keyof Inquiry | undefined;
    if (invalid) {
      if (steps.includes(invalid as Step)) setStep(invalid as Step);
      setError(checked.errors[invalid]!); return;
    }
    busy.current = true; setPending(true); setError("");
    try {
      await sendInquiry(checked.data, sourcePage.current, "chat_widget");
      setAnswers({ ...empty, first_name: checked.data.first_name });
      go("success", undefined, checked.data);
      setMessages(previous => [...previous,
        { role: "assistant", text: "A member of the team will contact you about next steps." },
        { role: "assistant", text: "Submitting this inquiry does not confirm an appointment." },
        { role: "assistant", text: "If you'd rather call, you can reach the office at (903) 283-8729." },
      ]);
    } catch {
      setError("Something went wrong and your inquiry wasn't sent. Please try again, or contact The Bridge directly.");
    } finally { busy.current = false; setPending(false); }
  }
  const textStep = ["first_name", "last_name", "email", "phone", "message"].includes(step);
  const field = step as keyof Inquiry;
  const profileChoice = !!profileTherapist && !choosing && !editing;
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
              <dt>Name</dt><dd>{message.summary.first_name} {message.summary.last_name}</dd>
              <dt>Email</dt><dd>{message.summary.email}</dd>
              <dt>Phone</dt><dd>{message.summary.phone || "Not provided"}</dd>
              <dt>Preferred therapist</dt><dd>{nameOf(message.summary.preferred_therapist)}</dd>
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
                  placeholder={`Type your ${labels[step as keyof typeof labels].toLowerCase()}…`}
                  autoComplete={step === "first_name" ? "given-name" : step === "last_name" ? "family-name" : step === "phone" ? "tel" : "email"}
                  required={step !== "phone"} maxLength={limits[field]} value={answers[field]} aria-invalid={!!error} aria-describedby="widget-error"
                  onChange={e => setAnswers({ ...answers, [field]: e.target.value })} />}
              <button className={styles.send} type="submit" aria-label="Send answer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 4 17 8-17 8 3-8-3-8Zm3 8h14" /></svg></button>
            </div>
            {(step === "phone" || step === "message") && <button className={styles.chip} type="button" onClick={() => respond({ ...answers, [field]: "" }, "Skip", step === "phone" ? "preferred_therapist" : "review")}>Skip</button>}
          </form>}
          {step === "welcome" && <div className={styles.actions}><button className={styles.primary} onClick={() => go("first_name", "Start")}>Start</button><a href="/contact/">Use the full Contact form</a></div>}
          {step === "preferred_therapist" && <div className={styles.choices} aria-label="Therapist choices">
            {profileChoice ? <>
              <button className={styles.primary} onClick={() => choose(profileTherapist)}>Yes, {firstOf(profileTherapist)}</button>
              <button className={styles.chip} onClick={() => { setChoosing(true); setMessages(previous => [...previous, { role: "visitor", text: "Help me choose someone else" }]); assistantReply({role:"assistant", text:"Who would you like to ask about?"}, "preferred_therapist"); }}>Help me choose someone else</button>
              <button className={styles.chip} onClick={() => choose("")}>I&apos;m not sure</button>
            </> : therapists.map(([slug]) => <button className={styles.chip} key={slug} onClick={() => choose(slug)}>{nameOf(slug)}</button>)}
          </div>}
          {step === "message_choice" && <div className={styles.actions}><button className={styles.chip} onClick={() => go("message", "Add a message")}>Add a message</button><button className={styles.chip} onClick={() => { const data = { ...answers, message: "" }; setAnswers(data); go("review", "No message", data); }}>No, send my inquiry</button></div>}
          {step === "review" && <div className={styles.actions}>
            <button className={styles.primary} disabled={pending} onClick={submit}>{error ? "Try Again" : "Send Inquiry"}</button>
            {error ? <a href="/contact/">View Contact Information</a> : <button className={styles.chip} disabled={pending} onClick={() => go("edit", "Make a Change")}>Make a Change</button>}
          </div>}
          {step === "edit" && <div className={styles.choices}>{Object.entries(labels).map(([key, label]) => <button className={styles.chip} key={key} onClick={() => { setEditing(true); setChoosing(true); go(key as Step, label); }}>{label}</button>)}</div>}
          {step === "success" && <div className={styles.actions}><button className={styles.primary} onClick={close}>Close</button><a href="/contact/">View Contact Information</a></div>}
          <div id="widget-error" role="alert" className={styles.error}>{step !== "review" ? error : ""}</div>
          </>}
          <p className={styles.caption}>An inquiry does not confirm an appointment.</p>
        </div>
        <div className={styles.honeypot} aria-hidden="true"><label htmlFor="widget-bot">Leave this field empty</label><input id="widget-bot" name="bot-field" tabIndex={-1} autoComplete="off" maxLength={limits["bot-field"]} value={answers["bot-field"]} onChange={e => setAnswers({ ...answers, "bot-field": e.target.value })} /></div>
      </section>}
      <button ref={launcher} id="chat-open" className={styles.launcher} aria-label={open ? "Close inquiry assistant" : "Open inquiry assistant"} aria-haspopup="dialog" aria-expanded={open} aria-controls={open ? "inquiry-widget-panel" : undefined} onClick={open ? close : expand}>
        <AssistantAvatar />
      </button>
    </aside>
  );
}
