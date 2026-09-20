import type { Metadata } from "next";
import Link from "next/link";
import ExplainerVideo from "@/components/ExplainerVideo";

export const metadata: Metadata = { title: "Services" };

const SERVICES = [
  {
    num: "01",
    name: "Web Development",
    blurb:
      "Shopify, Wix, Squarespace, WordPress, WooCommerce, or fully custom — every build starts on a staging link and ends with a documented handover.",
  },
  {
    num: "02",
    name: "App Development",
    blurb:
      "Sprint-based delivery with visible progress each phase, technical architecture agreed upfront, and QA across devices before release.",
  },
  {
    num: "03",
    name: "Graphic Design",
    blurb:
      "Brand assets, layouts, and visual systems documented well enough to hand to any future designer without a rebuild.",
  },
  {
    num: "04",
    name: "Motion Graphics",
    blurb:
      "Animation and video work built to spec, reviewed at checkpoints, and delivered in formats ready to publish.",
  },
  {
    num: "05",
    name: "Digital Marketing",
    blurb:
      "Campaigns and funnels run on the same clean reporting you can forward straight to your client, no translation needed.",
  },
  {
    num: "06",
    name: "Social Media",
    blurb:
      "Ongoing content and management on a cadence your client can see, start to finish, with no black-box scheduling.",
  },
  {
    num: "07",
    name: "AI Integrations",
    blurb:
      "Chatbots, recommendations, search, and automation layered onto any service above — modular, disclosed, and never a single point of vendor lock-in.",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <section className="sec">
        <div className="wrap">
          <div className="eyebrow page-eyebrow">What we build</div>
          <h1 className="page-h1">One partner, every service line.</h1>
          <p className="page-intro">
            Seven disciplines, one point of contact, one process — so you
            never have to stitch together three different vendors for one
            client.
          </p>
          <ExplainerVideo src="/Videos/explainer.mp4" poster="/Videos/explainer-poster.jpg" />

          <div className="grid-3" style={{ marginTop: 40 }}>
            {SERVICES.map((s) => (
              <article className="svc-card" key={s.num}>
                <div className="svc-num">{s.num}</div>
                <h3>{s.name}</h3>
                <p>{s.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 className="h2-sm">Need one of these for a client?</h2>
          <Link href="/contact" className="btn btn-solid">
            Start a Project
          </Link>
        </div>
      </section>
    </div>
  );
}
