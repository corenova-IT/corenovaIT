const COL_A = [
  { tint: "#ff8a44", label: "Shopify build" },
  { tint: "#4a90d9", label: "SaaS dashboard" },
  { tint: "#ff8a44", label: "Shopify build" },
  { tint: "#4a90d9", label: "SaaS dashboard" },
];

const COL_B = [
  { tint: "#7c5cff", label: "Brand refresh" },
  { tint: "#2fbf8f", label: "AI assistant" },
  { tint: "#7c5cff", label: "Brand refresh" },
  { tint: "#2fbf8f", label: "AI assistant" },
];

function MockCard({ tint, label }: { tint: string; label: string }) {
  return (
    <div className="mock-card" style={{ ["--mock-tint" as string]: tint }}>
      <div className="mock-card-bar">
        <span />
        <span />
        <span />
      </div>
      <div className="mock-card-body">
        <i />
        <div className="mock-fill" />
      </div>
      <span className="mock-card-label">{label}</span>
    </div>
  );
}

export default function HeroMockups() {
  return (
    <div className="mock-marquee" aria-hidden="true">
      <div className="mock-col">
        <div className="mock-track">
          {[...COL_A, ...COL_A].map((c, i) => (
            <MockCard key={i} {...c} />
          ))}
        </div>
      </div>
      <div className="mock-col reverse">
        <div className="mock-track">
          {[...COL_B, ...COL_B].map((c, i) => (
            <MockCard key={i} {...c} />
          ))}
        </div>
      </div>
    </div>
  );
}
