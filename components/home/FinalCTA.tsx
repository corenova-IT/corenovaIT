"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Reveal from "@/components/Reveal";

export default function FinalCTA() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = email.trim() ? `?email=${encodeURIComponent(email.trim())}` : "";
    router.push(`/contact${params}`);
  }

  return (
    <section className="final-cta-v2">
      <div className="wrap">
        <Reveal as="div">
          <h2>Ready to Transform Your Digital Presence?</h2>
        </Reveal>
        <p>Let&apos;s build something extraordinary together. Get in touch and let&apos;s discuss your next project.</p>
        <form className="cta-bar" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Enter your email"
            aria-label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn btn-solid">
            Start Your Project
          </button>
        </form>
      </div>
    </section>
  );
}
