import type { CSSProperties, ReactNode } from "react";
import Reveal from "@/components/Reveal";

// Decorative previews — the animation lives entirely in globals.css
// (".service-viz-card:hover" / ":focus-visible"); these components only
// supply markup and per-item CSS variables (--i for stagger order, --h / --h2
// for a bar's resting and hovered height).
const vars = (v: Record<string, string | number>) => v as CSSProperties;

const TIMELINE = [
  { label: "Discovery & Strategy", days: "Day 1–3" },
  { label: "Design & Prototype", days: "Day 4–7" },
  { label: "Development & Launch", days: "Day 8–14" },
];

function TimelineViz() {
  return (
    <div className="service-viz" aria-hidden="true">
      <div className="viz-tl">
        <div className="viz-tl-head">
          <span className="viz-tl-spin" />
          Project Timeline
          <span className="range">Week 1–2</span>
        </div>
        <ul className="viz-tl-list">
          {TIMELINE.map((row, i) => (
            <li className="viz-tl-row" key={row.label} style={vars({ "--i": i })}>
              <span className="viz-tl-mark">
                <span className="viz-tl-dot" />
                <span className="viz-tl-tick">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
              </span>
              <span className="viz-tl-label">{row.label}</span>
              <span className="viz-tl-days">{row.days}</span>
            </li>
          ))}
        </ul>
        <div className="viz-pill">
          <span className="viz-pill-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="viz-pill-live">Live</span>
        </div>
      </div>
    </div>
  );
}

// resting height → height once the card is previewed (percent of the panel)
const BARS = [
  { h: 42, h2: 64 },
  { h: 58, h2: 84 },
  { h: 34, h2: 52 },
  { h: 66, h2: 92 },
  { h: 48, h2: 70 },
  { h: 74, h2: 100 },
  { h: 40, h2: 60 },
];

function BarsViz() {
  return (
    <div className="service-viz" aria-hidden="true">
      <div className="viz-bars">
        {BARS.map((b, i) => (
          <div
            key={i}
            className={`viz-bar${b.h2 === 100 ? " hi" : ""}`}
            style={vars({ "--i": i, "--h": `${b.h}%`, "--h2": `${b.h2}%` })}
          />
        ))}
      </div>
    </div>
  );
}

const stroke = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// angle in degrees clockwise from 12 o'clock, on the outer ring
const TOOLS: { angle: number; icon: ReactNode }[] = [
  {
    angle: -55,
    icon: (
      <svg {...stroke}>
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    angle: 30,
    icon: (
      <svg {...stroke}>
        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
      </svg>
    ),
  },
  {
    angle: 140,
    icon: (
      <svg {...stroke}>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.6-.7 1.6-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1a1.6 1.6 0 0 1 1.7-1.7H16.5c3 0 5.5-2.5 5.5-5.5C22 6 17.5 2 12 2z" />
        <circle cx="7.5" cy="11" r="1" />
        <circle cx="10.5" cy="7" r="1" />
        <circle cx="15.5" cy="7.5" r="1" />
      </svg>
    ),
  },
  {
    angle: 215,
    icon: (
      <svg {...stroke}>
        <path d="M6 2v14a2 2 0 0 0 2 2h14M18 22V8a2 2 0 0 0-2-2H2" />
      </svg>
    ),
  },
];

function toolPosition(angle: number) {
  const r = (angle * Math.PI) / 180;
  return {
    left: `${(50 + 50 * Math.sin(r)).toFixed(2)}%`,
    top: `${(50 - 50 * Math.cos(r)).toFixed(2)}%`,
  };
}

function ToolsViz() {
  return (
    <div className="service-viz" aria-hidden="true">
      <div className="viz-radial">
        <span className="viz-ring r1" />
        <span className="viz-ring r2" />
        <span className="viz-ring r3" />
        <div className="viz-core">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z" />
          </svg>
        </div>
        {TOOLS.map((t, i) => (
          <span className="viz-tool" key={i} style={{ ...toolPosition(t.angle), ...vars({ "--i": i }) }}>
            <span className="viz-tool-inner">{t.icon}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const SERVICES = [
  {
    name: "Web Development",
    blurb: "Custom-built on Shopify, WordPress, or fully bespoke — fast, responsive, and handed over documented.",
    viz: <TimelineViz />,
  },
  {
    name: "Digital Marketing",
    blurb: "Campaigns run on reporting you can forward straight to your client, tracked from click to conversion.",
    viz: <BarsViz />,
  },
  {
    name: "Graphic Design",
    blurb: "Brand assets and layouts built to be picked up by any designer on your side, no guesswork required.",
    viz: <ToolsViz />,
  },
];

export default function ServicesShowcase() {
  return (
    <section className="section-v2">
      <div className="wrap">
        <div className="head-center">
          <span className="pill-badge">What We Do</span>
          <Reveal as="div">
            <h2>Services That Drive Results</h2>
          </Reveal>
          <p>One partner for every service line an agency hands off — web, marketing, design, and AI.</p>
        </div>
        <div className="services-v2-grid">
          {SERVICES.map((s, i) => (
            <Reveal
              key={s.name}
              as="article"
              className="service-viz-card"
              delay={i * 100}
              tabIndex={0}
              role="group"
              aria-label={s.name}
            >
              {s.viz}
              <div>
                <h3>{s.name}</h3>
                <p>{s.blurb}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
