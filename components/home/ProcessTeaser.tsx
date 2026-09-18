import Link from "next/link";
import Reveal from "@/components/Reveal";

const STEPS = [
  { num: "01", title: "Discovery Call" },
  { num: "04", title: "Execution in Sprints" },
  { num: "07", title: "Post-Launch Support" },
];

export default function ProcessTeaser() {
  return (
    <section className="section-v2">
      <div className="wrap">
        <div className="process-v2-head">
          <div>
            <span className="pill-badge">Our Process</span>
            <Reveal as="div">
              <h2 style={{ marginTop: 14 }}>Every Engagement, One Structure</h2>
            </Reveal>
          </div>
          <Link className="link-arrow" href="/process">
            See the full process →
          </Link>
        </div>
        <Reveal as="div" className="process-v2-list">
          {STEPS.map((s) => (
            <div className="ledger-row" key={s.num}>
              <div className="ledger-num">{s.num}</div>
              <div className="ledger-title">{s.title}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
