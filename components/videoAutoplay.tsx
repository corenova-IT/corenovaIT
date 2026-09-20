"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Autoplay for a decorative looping video, with a fallback for when the
 * browser won't do it (iOS Low Power Mode, data-saver, autoplay blocked) or
 * the visitor asked for reduced motion: `blocked` turns true so the caller
 * can show <PlayOverlay /> and let them start it themselves.
 */
export function useAutoplay(ref: RefObject<HTMLVideoElement | null>) {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // React doesn't reliably reflect the `muted` attribute on the DOM node,
    // and browsers only autoplay muted video
    video.muted = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      setBlocked(true);
      return;
    }
    video.play().catch(() => setBlocked(true));
  }, [ref]);

  function start() {
    ref.current
      ?.play()
      .then(() => setBlocked(false))
      .catch(() => {});
  }

  return { blocked, start, onPlaying: () => setBlocked(false) };
}

export function PlayOverlay({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="video-play-overlay" onClick={onClick} aria-label="Play video">
      <span>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
        </svg>
      </span>
    </button>
  );
}

export function MutedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="M23 9l-6 6M17 9l6 6" />
    </svg>
  );
}

export function UnmutedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}
