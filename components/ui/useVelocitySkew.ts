"use client";

import { useEffect, useState } from "react";
import { useScroll, useVelocity, useSpring, useTransform, type MotionValue } from "motion/react";

/**
 * Scroll velocity → a small skew angle, springed so it eases back to flat the
 * moment scrolling stops. Create ONE per section and pass the MotionValue to
 * every child that should lean — a hook instance per tile would mean dozens of
 * redundant velocity trackers on the same scroll position.
 *
 * Flattened to 0 on touch devices: skewing a dozen image tiles on every scroll
 * frame is one of the more expensive things you can ask a phone to do, and it
 * showed up as stutter. Pointer devices keep the lean.
 */
export function useVelocitySkew(max = 4): MotionValue<number> {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(
      window.matchMedia("(pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 42, stiffness: 320, mass: 0.4 });
  const amount = enabled ? max : 0;
  return useTransform(smooth, [-2200, 0, 2200], [amount, 0, -amount], { clamp: true });
}
