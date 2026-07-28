"use client";

/**
 * Ornamental backdrop: a diamond lattice with dotwork nodes and a small
 * four-point sparkle at each centre — the kind of filler pattern tattooers use
 * in negative space, and a nod to the filigree in the studio's emblem.
 *
 * One tiled background-image and nothing else. No animation, no extra
 * compositing layer per section, so it costs essentially nothing to scroll —
 * which matters after the grain overlay turned out to be a drag on phones.
 *
 * Sits above the page background and below all content (main is z-10).
 */

const TILE = 88;

// Kept as a data URI rather than a file: it is under a kilobyte, so a separate
// request would cost more than inlining it.
const PATTERN = `<svg xmlns='http://www.w3.org/2000/svg' width='${TILE}' height='${TILE}' viewBox='0 0 ${TILE} ${TILE}'>
  <g fill='none' stroke='%23d2a02a' stroke-width='0.9' stroke-linejoin='round'>
    <path d='M0 44 L44 0 L88 44 L44 88 Z'/>
  </g>
  <g fill='%23d2a02a'>
    <circle cx='44' cy='0' r='1.7'/><circle cx='0' cy='44' r='1.7'/>
    <circle cx='88' cy='44' r='1.7'/><circle cx='44' cy='88' r='1.7'/>
    <circle cx='0' cy='0' r='1.1'/><circle cx='88' cy='0' r='1.1'/>
    <circle cx='0' cy='88' r='1.1'/><circle cx='88' cy='88' r='1.1'/>
    <path d='M44 35 L46 42 L53 44 L46 46 L44 53 L42 46 L35 44 L42 42 Z'/>
  </g>
</svg>`.replace(/\n\s*/g, " ");

export default function Ornament() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage: `url("data:image/svg+xml,${PATTERN}")`,
        backgroundSize: `${TILE}px ${TILE}px`,
        opacity: 0.13,
        // Thinned towards the centre so headlines and body copy always sit on
        // clean black, full strength out at the margins.
        maskImage:
          "radial-gradient(115% 80% at 50% 50%, transparent 8%, rgba(0,0,0,0.55) 45%, black 85%)",
        WebkitMaskImage:
          "radial-gradient(115% 80% at 50% 50%, transparent 8%, rgba(0,0,0,0.55) 45%, black 85%)",
      }}
    />
  );
}
