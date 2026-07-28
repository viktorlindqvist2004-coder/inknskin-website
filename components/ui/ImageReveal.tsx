"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Media reveal: the frame masks its contents, and the contents slide in behind
 * the mask edge.
 *
 * Deliberately NOT built on an animated `clip-path`. Browsers collapse the
 * four-value `inset()` shorthand to three in computed style
 * (`inset(100% 0 0 0)` → `inset(100% 0px 0px)`), so Motion cannot interpolate
 * between the declared string and the computed one — the animation silently
 * never runs and the element stays stuck fully clipped.
 *
 * The child is translated fully outside the mask, so an IntersectionObserver
 * on the child would measure a zero-area intersection and never fire. The
 * observer therefore lives on the *unclipped* wrapper and the child is driven
 * through variants — same rule as the text reveals in SplitText.
 */
export default function ImageReveal({
  children,
  className = "",
  from = "bottom",
  delay = 0,
  amount = 0.2,
  duration = 1.2,
}: {
  children: ReactNode;
  className?: string;
  from?: "bottom" | "top";
  delay?: number;
  amount?: number;
  duration?: number;
}) {
  const hiddenY = from === "bottom" ? "101%" : "-101%";

  const curtain: Variants = {
    hidden: { y: hiddenY },
    show: {
      y: "0%",
      transition: { duration, ease: EASE, delay },
    },
  };

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      <motion.div variants={curtain} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </motion.div>
  );
}
