"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative background video that actually autoplays on mobile.
 *
 * iOS falls back to a poster frame with a play button whenever autoplay is
 * refused, which is what the raw <video autoPlay muted loop playsInline> was
 * doing. Three things cause that here:
 *
 *  1. React sets `muted` as a DOM *property* after the element is created, so
 *     the very first load can be seen as unmuted and refused. The muted flag is
 *     therefore also forced on the element imperatively before play().
 *  2. `preload="none"` means no data is fetched until something calls play(),
 *     and Safari will not start on its own from that state.
 *  3. Autoplay can be refused once and never retried. play() is re-attempted on
 *     `loadeddata` and `canplay`.
 *
 * Playback is also tied to visibility: off-screen videos are paused, so a phone
 * is never decoding four films at once while you scroll.
 */
export default function AutoVideo({
  src,
  poster,
  className = "",
  style,
}: {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Autoplay is only ever granted to a muted video — set it on the element
    // itself rather than trusting the React prop to land before first load.
    el.muted = true;
    el.defaultMuted = true;
    el.setAttribute("muted", "");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const attempt = () => {
      if (reduced) return;
      const p = el.play();
      // A rejected play() promise is expected (Low Power Mode, background tab).
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    el.addEventListener("loadeddata", attempt);
    el.addEventListener("canplay", attempt);
    attempt();

    // Only decode while on screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) attempt();
        else if (!el.paused) el.pause();
      },
      { rootMargin: "200px 0px", threshold: 0.01 },
    );
    io.observe(el);

    const onVisibility = () => {
      if (document.hidden) el.pause();
      else attempt();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Last resort. iOS refuses autoplay outright in Low Power Mode, and no
    // amount of correct markup changes that — the block is at the OS level and
    // only lifts once the visitor interacts. Start on the first gesture so the
    // page recovers instead of sitting on a still frame for the whole visit.
    const gestures = ["pointerdown", "touchstart", "keydown", "scroll"] as const;
    const kick = () => {
      attempt();
      for (const ev of gestures) window.removeEventListener(ev, kick);
    };
    for (const ev of gestures) window.addEventListener(ev, kick, { passive: true });

    return () => {
      el.removeEventListener("loadeddata", attempt);
      el.removeEventListener("canplay", attempt);
      document.removeEventListener("visibilitychange", onVisibility);
      for (const ev of gestures) window.removeEventListener(ev, kick);
      io.disconnect();
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      style={style}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      preload="metadata"
      tabIndex={-1}
      aria-hidden
    />
  );
}
