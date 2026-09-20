"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { PlayOverlay, useAutoplay } from "@/components/videoAutoplay";

/**
 * Single glossy, autoplaying video card that replaces the old hero
 * mockup grid. Styled to match .portfolio-card's frosted-glass caption
 * strip: title + subtitle on the left, a mute toggle and a link button
 * on the right.
 */
export default function HeroVideoCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const { blocked, start, onPlaying } = useAutoplay(videoRef);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return (
    <div className="hero-video-card">
      <video
        ref={videoRef}
        className="hero-video-el"
        src="/Videos/explainer.mp4"
        poster="/Videos/explainer-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onPlaying={onPlaying}
      />
      {blocked && <PlayOverlay onClick={start} />}
      <div className="hero-video-caption">
        <div>
          <h3>Who We Are</h3>
          <span>What we offer in services</span>
        </div>
        <div className="hero-video-actions">
          <button
            type="button"
            className="hero-video-btn"
            onClick={toggleMute}
            aria-label={muted ? "Unmute video" : "Mute video"}
          >
            {muted ? <MutedIcon /> : <UnmutedIcon />}
          </button>
          <Link href="/services" className="hero-video-btn" aria-label="View our services">
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

function MutedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="M23 9l-6 6M17 9l6 6" />
    </svg>
  );
}

function UnmutedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}
