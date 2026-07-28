"use client";

import { useScroll, useVelocity, useSpring, useTransform, type MotionValue } from "motion/react";

/**
 * Scroll velocity → a small skew angle, springed so it eases back to flat the
 * moment scrolling stops. Create ONE per section and pass the MotionValue to
 * every child that should lean — a hook instance per tile would mean dozens of
 * redundant velocity trackers on the same scroll position.
 */
export function useVelocitySkew(max = 4): MotionValue<number> {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 42, stiffness: 320, mass: 0.4 });
  return useTransform(smooth, [-2200, 0, 2200], [max, 0, -max], { clamp: true });
}
