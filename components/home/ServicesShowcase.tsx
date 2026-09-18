import Reveal from "@/components/Reveal";

const BAR_HEIGHTS = [55, 78, 40, 92, 62, 100, 48];

function ChecklistViz() {
  return (
    <div className="service-viz">
      <div className="viz-checklist-head">
        <span>Sprint Plan</span>
        <span className="dot-spin" />
      </div>
      {[0, 1, 2, 3].map((row) => (
        <div className="viz-checklist-row" key={row}>
          <span className="viz-check" />
          <span className="viz-line" style={{ width: row === 3 ? "40%" : undefined }} />
        </div>
      ))}
      <div className="viz-progress">
        <div className="viz-progress-fill" />
      </div>
    </div>
  );
}

function BarsViz() {
  return (
    <div className="service-viz">
      <div className="viz-bars">
        {BAR_HEIGHTS.map((h, i) => (
          <div
            key={i}
            className={`viz-bar${h === 100 ? " hi" : ""}`}
            style={{ ["--h" as string]: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function RadialViz() {
  return (
    <div className="service-viz">
      <div className="viz-radial">
        <span className="viz-ring r1" />
        <span className="viz-ring r2" />
        <div className="viz-orbit">
          <span className="viz-orbit-dot">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l2.4 7.2H22l-6 4.6 2.3 7.2-6.3-4.5-6.3 4.5 2.3-7.2-6-4.6h7.6z" />
            </svg>
          </span>
        </div>
        <div className="viz-orbit slow">
          <span className="viz-orbit-dot" style={{ top: "auto", bottom: "4%" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            </svg>
          </span>
        </div>
        <div className="viz-radial-core">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

const SERVICES = [
  {
    name: "Web Development",
    blurb: "Custom-built on Shopify, WordPress, or fully bespoke — fast, responsive, and handed over documented.",
    viz: <ChecklistViz />,
  },
  {
    name: "Digital Marketing",
    blurb: "Campaigns run on reporting you can forward straight to your client, tracked from click to conversion.",
    viz: <BarsViz />,
  },
  {
    name: "Graphic Design",
    blurb: "Brand assets and layouts built to be picked up by any designer on your side, no guesswork required.",
    viz: <RadialViz />,
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
            <Reveal key={s.name} as="article" className="service-viz-card" delay={i * 100}>
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
