import Reveal from "@/components/Reveal";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

const COLUMNS = [
  {
    number: "7",
    label: "Service Lines",
    items: ["Web & app development", "Graphic & motion design", "Digital marketing & social", "AI integrations"],
  },
  {
    number: "5+",
    label: "Platforms Supported",
    items: ["Shopify & WooCommerce", "Wix & Squarespace", "WordPress", "Fully custom development"],
  },
  {
    number: "100%",
    label: "White-Label",
    items: ["No branding in deliverables", "Fully transferable IP", "Reporting you can forward", "Documented on handover"],
  },
];

export default function Stats() {
  return (
    <section className="section-v2">
      <div className="wrap">
        <div className="head-center">
          <span className="pill-badge">By the Numbers</span>
          <Reveal as="div">
            <h2>Built for Agencies to Rely On</h2>
          </Reveal>
          <p>The structure behind every engagement, whether it&apos;s one page or a full platform.</p>
        </div>
        <div className="stats-grid">
          {COLUMNS.map((c, i) => (
            <Reveal key={c.label} as="article" className="stat-col" delay={i * 100}>
              <div className="stat-number">{c.number}</div>
              <div className="stat-label">{c.label}</div>
              <hr className="stat-divider" />
              <ul className="stat-checklist">
                {c.items.map((item) => (
                  <li key={item}>
                    <span className="stat-check">
                      <CheckIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
