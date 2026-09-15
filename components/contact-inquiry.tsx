"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  limits,
  therapists,
  therapistValue,
  validateInquiry,
  type Inquiry,
} from "@/lib/inquiry";

export function ContactInquiry() {
  const therapistSelect = useRef<HTMLSelectElement>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof Inquiry, string>>>(
    {},
  );
  const [notice, setNotice] = useState("");
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const status = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  useEffect(() => {
    if (therapistSelect.current)
      therapistSelect.current.value = therapistValue(
        new URLSearchParams(window.location.search).get("therapist"),
      );
  }, []);
  useEffect(() => {
    if (sent || notice) status.current?.focus();
  }, [sent, notice]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const input = Object.fromEntries(new FormData(form));
    const checked = validateInquiry(input);
    setErrors(checked.errors);
    setNotice("");
    if (Object.keys(checked.errors).length) {
      const key = Object.keys(checked.errors)[0];
      (form.elements.namedItem(key) as HTMLElement)?.focus();
      return;
    }
    busy.current = true;
    setPending(true);
    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "form-name": "bridge-contact-inquiry", ...checked.data }).toString(),
        signal: AbortSignal.timeout(20000),
      });
      if (response.ok) {
        form.reset();
        setSent(true);
      } else {
        setNotice(
          "Your inquiry could not be sent. Please try again, or use the phone or email below.",
        );
      }
    } catch {
      setNotice(
        "Your inquiry could not be sent. Please try again, or use the phone or email below.",
      );
    } finally {
      busy.current = false;
      setPending(false);
    }
  }
  return (
    <section
      className="contact-inquiry"
      id="inquiry"
      aria-labelledby="inquiry-title"
    >
      <h2 id="inquiry-title">Send an inquiry</h2>
      <p>Ask about getting started or working with a therapist.</p>
      <div ref={status} tabIndex={-1} role={sent ? "status" : "alert"}>
        {sent ? (
          <>
            <h3>Thank you for reaching out.</h3>
            <p>
              Your message has been sent to The Bridge. A member of the team
              will contact you about next steps.
            </p>
            <p>Submitting this form does not confirm an appointment.</p>
          </>
        ) : (
          notice && (
            <>
              <p>{notice}</p>
              <p>
                <a href="tel:9032838729">Call (903) 283-8729</a> or{" "}
                <a href="mailto:info@thebridgetherapy.com">
                  email info@thebridgetherapy.com
                </a>
                .
              </p>
            </>
          )
        )}
      </div>
      {!sent && (
        <form name="bridge-contact-inquiry" action="/__forms.html" method="post" data-netlify-honeypot="bot-field" onSubmit={submit} noValidate>
          <input type="hidden" name="form-name" value="bridge-contact-inquiry" />
          <div className="inquiry-grid">
            {(
              [
                ["first_name", "First Name", "text", "given-name"],
                ["last_name", "Last Name", "text", "family-name"],
                ["email", "Email", "email", "email"],
                ["phone", "Phone", "tel", "tel"],
              ] as const
            ).map(([name, label, type, autoComplete]) => (
              <div key={name}>
                <label htmlFor={`inquiry-${name}`}>
                  {label}
                  {name === "phone" ? " (optional)" : " (required)"}
                </label>
                <input
                  id={`inquiry-${name}`}
                  name={name}
                  type={type}
                  autoComplete={autoComplete}
                  required={name !== "phone"}
                  maxLength={limits[name]}
                  aria-invalid={!!errors[name]}
                  aria-describedby={errors[name] ? `${name}-error` : undefined}
                />
                {errors[name] && (
                  <p className="inquiry-error" id={`${name}-error`}>
                    {errors[name]}
                  </p>
                )}
              </div>
            ))}
          </div>
          <label htmlFor="inquiry-therapist">Preferred Therapist</label>
          <select
            id="inquiry-therapist"
            name="preferred_therapist"
            ref={therapistSelect}
            defaultValue=""
            aria-invalid={!!errors.preferred_therapist}
            aria-describedby={errors.preferred_therapist ? "therapist-error" : undefined}
          >
            {therapists.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {errors.preferred_therapist && (
            <p id="therapist-error" className="inquiry-error">
              {errors.preferred_therapist}
            </p>
          )}
          <label htmlFor="inquiry-message">Message (optional)</label>
          <p id="inquiry-privacy">
            Please do not include sensitive medical or personal health
            information in this form.
          </p>
          <textarea
            id="inquiry-message"
            name="message"
            rows={4}
            maxLength={limits.message}
            aria-invalid={!!errors.message}
            aria-describedby={`inquiry-privacy${errors.message ? " message-error" : ""}`}
          />
          {errors.message && (
            <p id="message-error" className="inquiry-error">
              {errors.message}
            </p>
          )}
          <div className="inquiry-honeypot" aria-hidden="true">
            <label htmlFor="inquiry-bot-field">Leave this field empty</label>
            <input
              id="inquiry-bot-field"
              name="bot-field"
              tabIndex={-1}
              autoComplete="off"
              maxLength={limits["bot-field"]}
            />
          </div>
          <button className="button" disabled={pending} type="submit">
            {pending ? "Sending…" : "Send Inquiry"}
          </button>
          <p>Submitting this form does not confirm an appointment.</p>
        </form>
      )}
      <noscript>
        Please call (903) 283-8729 or email info@thebridgetherapy.com to
        inquire. The form requires JavaScript.
      </noscript>
    </section>
  );
}
