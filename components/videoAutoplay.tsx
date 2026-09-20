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

// Solid speaker + a bold ×, both drawn inside the 24×24 box (the glyph spans
// x 2–22, so it sits centred in its button and matches the arrow's weight).
export function MutedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6.5 9H3v6h3.5L11 19V5Z" fill="currentColor" />
      <path d="M16 9.5l5 5M21 9.5l-5 5" />
    </svg>
  );
}

export function UnmutedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6.5 9H3v6h3.5L11 19V5Z" fill="currentColor" />
      <path d="M15.5 9a4.2 4.2 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" />
    </svg>
  );
}
