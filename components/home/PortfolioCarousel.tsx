"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { MutedIcon, PlayOverlay, UnmutedIcon } from "@/components/videoAutoplay";

type Project = {
  name: string;
  category: string;
  tint: string;
  href: string;
  // optional real preview; cards without one draw the CSS mockup instead
  image?: string;
  // optional video; `image` doubles as its poster. Only downloads and plays
  // while this card is the active, visible one.
  video?: string;
};

const PROJECTS: Project[] = [
  {
    name: "Web Development",
    // non-breaking space before each "·" keeps a wrapped line from starting with one
    category: "Shopify · Wix · Squarespace · WordPress · WooCommerce · Custom Development",
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
    image: "/portfolio/Agency%20Client%20Portal.png",
  },
  {
    name: "AI Support Assistant",
    category: "AI Integration · Automation",
    tint: "#2fbf8f",
    href: "/ai",
    image: "/portfolio/AI%20Support%20Assistant.jpg",
  },
  {
    name: "Brand Identity and Design",
    category: "Graphic + Motion · Branding",
    tint: "#e0567a",
    href: "/services",
    image: "/portfolio/Brand%20%26%20Motion%20Refresh.png",
  },
  {
    name: "Explainer Videos",
    category: "Motion Graphics · Animated Explainers",
    tint: "#22b8cf",
    href: "/services",
    image: "/portfolio/Explainer%20Videos.jpg",
    video: "/Videos/cinematic-showcase.mp4",
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

function PortfolioCardBody({
  project,
  active,
  near,
}: {
  project: Project;
  active: boolean;
  // within a couple of cards of the active one: start buffering the video now
  // so it's ready by the time the visitor arrives
  near: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [muted, setMuted] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const wantsPlay = active && inView;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.4),
      { threshold: [0, 0.4, 0.7, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (wantsPlay) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setBlocked(true);
        return;
      }
      video.play().then(() => setBlocked(false)).catch(() => setBlocked(true));
    } else {
      // leaving the card (or the screen) stops it and never carries sound over
      video.pause();
      video.muted = true;
      setMuted(true);
    }
  }, [wantsPlay]);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  function start() {
    videoRef.current?.play().then(() => setBlocked(false)).catch(() => {});
  }

  return (
    <>
      {project.video ? (
        <>
          <video
            ref={videoRef}
            className="portfolio-shot"
            src={project.video}
            poster={project.image}
            muted
            loop
            playsInline
            preload={near ? "auto" : "none"}
            aria-label={`${project.name} video preview`}
            onPlaying={() => setBlocked(false)}
          />
          {blocked && <PlayOverlay onClick={start} />}
        </>
      ) : (
        <CardPreview project={project} />
      )}
      <div className="portfolio-caption">
        <div>
          <h3>{project.name}</h3>
          <span>{project.category}</span>
        </div>
        <div className="portfolio-caption-actions">
          {project.video && (
            <button
              type="button"
              className="portfolio-caption-link portfolio-mute"
              onClick={toggleMute}
              aria-label={muted ? "Unmute video" : "Mute video"}
            >
              {muted ? <MutedIcon /> : <UnmutedIcon />}
            </button>
          )}
          <Link href={project.href} className="portfolio-caption-link" aria-label={`View ${project.name}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </Link>
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

  // Card i is within two clicks ahead of the active one. Forward-only, so
  // nothing is fetched at page load (the video card is last, five clicks away).
  function isNear(i: number) {
    return (i - index + PROJECTS.length) % PROJECTS.length <= 2;
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
                <PortfolioCardBody project={p} active={i === index} near={isNear(i)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
