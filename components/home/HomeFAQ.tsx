import Link from "next/link";
import Reveal from "@/components/Reveal";

const FAQS = [
  {
    q: "Will your branding show up anywhere my client can see?",
    a: "No. Staging URLs, invoices, emails, and footers all stay white-label — our name never appears in a client-facing deliverable.",
  },
  {
    q: "Which platforms do you actually build on?",
    a: "Shopify, Wix, Squarespace, WordPress, WooCommerce, and fully custom development — each with its own documented workflow.",
  },
  {
    q: "How does AI get added to an existing site?",
    a: "As a modular layer on top of whatever platform you're already on — chatbots, recommendations, search, or automation — with no vendor lock-in.",
  },
  {
    q: "Who owns the code and designs when it's done?",
    a: "You and your client do. IP and ownership terms are agreed upfront and everything is fully transferable.",
  },
];

export default function HomeFAQ() {
  return (
    <section className="section-v2">
      <div className="wrap">
        <div className="home-faq-head">
          <div>
            <span className="pill-badge">FAQ</span>
            <h2 style={{ marginTop: 14 }}>Questions Agencies Ask First</h2>
          </div>
          <Link className="link-arrow" href="/faq">
            View all FAQs →
          </Link>
        </div>
        <Reveal as="div" className="faq">
          {FAQS.map((item, i) => (
            <details key={item.q} open={i === 0}>
              <summary>
                {item.q}
                <span className="plus" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
