"use client";

import { site } from "@/lib/site";

/**
 * The studio's emblem, background removed and masked to its circle so it sits
 * on the near-black page without a grey plate behind it.
 *
 * Served at 512px and drawn between 32px and 200px, so it stays crisp on
 * retina at every size it is used.
 */
export default function Logo({
  size = 40,
  className = "",
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/media/logo.png"
      alt={`${site.name} — ${site.tagline}`}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={`shrink-0 select-none object-contain ${className}`}
    />
  );
}
