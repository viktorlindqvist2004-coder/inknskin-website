"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The numbered rule that opens every section: the label slides in from the
 * left while the hairline draws itself across the remaining width.
 */
export default function SectionHead({
  index,
  label,
}: {
  index: string;
  label: string;
}) {
  return (
    <div className="flex items-baseline gap-4">
      <motion.span
        className="eyebrow shrink-0"
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        {index} — {label}
      </motion.span>
      <motion.span
        className="hairline flex-1 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
      />
    </div>
  );
}
