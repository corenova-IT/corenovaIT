"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";

type Project = {
  name: string;
  category: string;
  tint: string;
  href: string;
  // optional real preview; cards without one draw the CSS mockup instead
  image?: string;
};

const PROJECTS: Project[] = [
  {
    name: "Web Development",
    // non-breaking space before each "·" keeps a wrapped line from starting with one
    category: "Shopify · Wix · Squarespace · WordPress · WooCommerce · Custom Development",
    tint: "#d63838",
    href: "/platforms",
    image: "/portfolio/ecommerce-storefront-mockup.jpg",
  },
  {
    name: "SaaS Product Site",
    category: "Custom Development · B2B",
    tint: "#4a90d9",
    href: "/platforms",
    image: "/portfolio/Saas%20product%20Site.jpg",
  },
  {
    name: "Agency Client Portal",
    category: "WordPress · White-Label",
    tint: "#7c5cff",
    href: "/partners",
    image: "/portfolio/Agency%20Client%20Portal.jpg",
  },
  {
    name: "AI Support Assistant",
    category: "AI Integration · Automation",
    tint: "#2fbf8f",
    href: "/ai",
    image: "/portfolio/AI%20Support%20Assistant.jpg",
  },
  {
    name: "Brand & Motion Refresh",
    category: "Graphic + Motion · Branding",
    tint: "#e0567a",
    href: "/services",
    image: "/portfolio/Brand%20%26%20Motion%20Refresh.png",
  },
];

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {dir === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  );
}

function CardPreview({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // an image that already failed before hydration never fires onError
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (project.image && !failed) {
    return (
      <img
        ref={imgRef}
        className="portfolio-shot"
        src={project.image}
        alt={`${project.name} website preview`}
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <>
      <div className="portfolio-scene" />
      <div className="portfolio-device">
        <div className="portfolio-device-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="portfolio-device-body">
          <i />
          <i />
          <i />
          <div className="cta" />
        </div>
      </div>
    </>
  );
}

export default function PortfolioCarousel() {
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function recalc() {
      const track = trackRef.current;
      const viewport = track?.parentElement;
      if (!track || !viewport) return;
      const active = track.children[index] as HTMLElement | undefined;
      if (!active) return;
      const viewportWidth = viewport.getBoundingClientRect().width;
      const cardCenter = active.offsetLeft + active.offsetWidth / 2;
      setOffset(viewportWidth / 2 - cardCenter);
    }
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [index]);

  function go(dir: 1 | -1) {
    setIndex((i) => (i + dir + PROJECTS.length) % PROJECTS.length);
  }

  return (
    <section className="section-v2">
      <div className="wrap">
        <div className="portfolio-head">
          <div>
            <span className="pill-badge">Selected Work</span>
            <Reveal as="div">
              <h2 style={{ marginTop: 14 }}>Work We&apos;re Proud to Ship</h2>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="portfolio-stage">
        <button className="portfolio-arrow prev" onClick={() => go(-1)} aria-label="Previous project">
          <ChevronIcon dir="left" />
        </button>
        <button className="portfolio-arrow next" onClick={() => go(1)} aria-label="Next project">
          <ChevronIcon dir="right" />
        </button>

        <div className="portfolio-viewport">
          <div
            className="portfolio-track"
            ref={trackRef}
            style={{ transform: `translateX(${offset}px)` }}
          >
            {PROJECTS.map((p, i) => (
              <div
                key={p.name}
                className={`portfolio-card${i === index ? " is-active" : ""}`}
                style={{ ["--card-tint" as string]: p.tint }}
              >
                <CardPreview project={p} />
                <div className="portfolio-caption">
                  <div>
                    <h3>{p.name}</h3>
                    <span>{p.category}</span>
                  </div>
                  <Link href={p.href} className="portfolio-caption-link" aria-label={`View ${p.name}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
