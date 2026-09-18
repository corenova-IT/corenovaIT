"use client";

import { useState, type FormEvent } from "react";

const TO = "contact@corenovait.com.au";

const SERVICES = [
  "Web Development",
  "App Development",
  "Graphic Design",
  "Motion Graphics",
  "Digital Marketing",
  "Social Media",
  "AI Integrations",
  "Not sure yet",
];

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Posts to /api/contact (app/api/contact/route.ts), which saves the
 * submission to Supabase and emails a notification via Resend.
 */
export default function ContactForm({ initialEmail = "" }: { initialEmail?: string }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [service, setService] = useState(SERVICES[0]);
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }

    setStatus("submitting");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, email, service, details }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setStatus("success");
        setFeedback(data.message || "Thank you! Your message has been received.");
        setName("");
        setCompany("");
        setEmail("");
        setService(SERVICES[0]);
        setDetails("");
      } else {
        setStatus("error");
        setFeedback(
          data?.message || `Something went wrong. Please email us directly at ${TO}.`
        );
      }
    } catch {
      setStatus("error");
      setFeedback(`Couldn't reach the server. Please email us directly at ${TO}.`);
    }
  }

  return (
    <div className="form-wrap">
      <form onSubmit={handleSubmit} noValidate>
        <div className="field-row">
          <div className="field">
            <label htmlFor="cf-name">Name</label>
            <input
              id="cf-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="cf-company">Agency / Company</label>
            <input
              id="cf-company"
              name="company"
              type="text"
              autoComplete="organization"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="cf-service">What do you need?</label>
          <select
            id="cf-service"
            name="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="cf-details">Project details</label>
          <textarea
            id="cf-details"
            name="details"
            required
            placeholder="Platform, timeline, budget range, anything else we should know."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        <div>
          <button type="submit" className="btn btn-solid" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "Send message"}
          </button>
          <p className="form-note" style={{ marginTop: 12 }}>
            Sends straight to our team and gets saved to our system — nothing
            opens your email app.
          </p>
          {status === "success" && <p id="formStatus">{feedback}</p>}
          {status === "error" && <p id="formStatus" className="error">{feedback}</p>}
        </div>
      </form>

      <aside className="contact-side">
        <h3>Prefer to just email us?</h3>
        <p>Skip the form and write to us directly — same inbox either way.</p>
        <div className="direct">
          <a className="mailto" href={`mailto:${TO}`}>
            {TO}
          </a>
        </div>
      </aside>
    </div>
  );
}
