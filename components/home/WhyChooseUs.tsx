import Reveal from "@/components/Reveal";

const REASONS = [
  {
    title: "White-Label Readiness",
    desc: "Our branding never appears in a client-facing deliverable — staging URLs, invoices, and emails all stay yours.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 9h18" />
      </svg>
    ),
  },
  {
    title: "Clear IP & Ownership",
    desc: "All code, designs, and assets are fully transferable to you and your client — no lock-in to us as the developer.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 4v6c0 5-3.4 7.6-8 10-4.6-2.4-8-5-8-10V6z" />
      </svg>
    ),
  },
  {
    title: "Reporting You Can Forward",
    desc: "Clean, sprint-based updates written to send straight to your client — no editing required on your end.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19V5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
        <path d="M14 3v5h5M9 13h6M9 17h6" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-v2">
      <div className="wrap">
        <div className="head-center">
          <span className="pill-badge">Our Promise</span>
          <Reveal as="div">
            <h2>Why Agencies Choose CoreNovaIT</h2>
          </Reveal>
          <p>Built to disappear into your agency, not compete with it.</p>
        </div>
        <div className="why-grid">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} as="article" className="why-card" delay={i * 100}>
              <div className="why-icon">{r.icon}</div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
