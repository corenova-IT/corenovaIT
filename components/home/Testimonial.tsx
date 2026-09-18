"use client";

import { useEffect, useRef } from "react";

const QUOTE =
  "CoreNovaIT slotted into our studio like another in-house team. Sprints landed on time, updates were clean enough to forward straight to our client, and nothing ever carried their branding.";

const WORDS = QUOTE.split(" ");

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.9 6.6 7.1.7-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.7 7.1-.7z" />
    </svg>
  );
}

export default function Testimonial() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    function update() {
      ticking = false;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.88;
      const end = vh * 0.25;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      el.style.setProperty("--active", String(progress * WORDS.length));
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="quote-sec" ref={sectionRef}>
      <div className="wrap">
        <div className="quote-stars" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} />
          ))}
        </div>
        <p className="quote-text">
          {WORDS.map((word, i) => (
            <span key={i} className="quote-word" style={{ ["--i" as string]: i }}>
              {word}{" "}
            </span>
          ))}
        </p>
        <p className="quote-attribution">
          <strong>Studio Partner</strong> — white-label web agency client
        </p>
      </div>
    </section>
  );
}
