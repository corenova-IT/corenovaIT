"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Autoplay for a decorative looping video. It only plays while it is actually
 * on screen (and the tab is visible): an off-screen 1080p video that keeps
 * decoding steals CPU/GPU from whatever the visitor is looking at, which shows
 * up as stutter when a second video is playing lower on the page.
 *
 * Falls back for when the browser won't autoplay (iOS Low Power Mode,
 * data-saver) or the visitor asked for reduced motion: `blocked` turns true so
 * the caller can show <PlayOverlay /> and let them start it themselves.
 */
export function useAutoplay(ref: RefObject<HTMLVideoElement | null>) {
  const [blocked, setBlocked] = useState(false);
  const [visible, setVisible] = useState(true); // until the observer says otherwise

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // React doesn't reliably reflect the `muted` attribute on the DOM node,
    // and browsers only autoplay muted video
    video.muted = true;

    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.2),
      { threshold: [0, 0.2, 0.5, 1] }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [ref]);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function sync() {
      if (!video) return;
      if (reduced) {
        video.pause();
        setBlocked(true);
      } else if (visible && !document.hidden) {
        video.play().catch((err) => {
          // pausing while a play() is still starting rejects with AbortError —
          // that's us scrolling away, not the browser blocking autoplay
          if (err?.name !== "AbortError") setBlocked(true);
        });
      } else {
        video.pause();
      }
    }

    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, [ref, visible]);

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
