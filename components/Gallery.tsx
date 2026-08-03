"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { portfolio, portfolioColumns, type Work } from "@/lib/portfolio";
import { MaskUp } from "@/components/ui/SplitText";
import SectionHead from "@/components/ui/SectionHead";
import ImageReveal from "@/components/ui/ImageReveal";
import { useVelocitySkew } from "@/components/ui/useVelocitySkew";
import { contact } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

function Tile({
  work,
  index,
  skew,
}: {
  work: Work;
  index: number;
  skew: MotionValue<number>;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // The photo drifts and breathes inside its frame, independent of the column.
  const imgY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.16, 1.04, 1.16]);

  return (
    <motion.figure
      ref={ref}
      className="group relative"
      style={{ skewY: skew }}
      data-cursor={work.style}
    >
      <div className="relative">
        {/* Kvadratiskt överallt. Stående 4:5 gjorde portfolion till sidans
            längsta avsnitt på både mobil och desktop — fyra rutor per kolumn
            på en telefon. Kvadraten tar bort en femtedel av höjden per ruta
            utan att en enda bild plockas bort. */}
        <ImageReveal
          className="relative aspect-square rounded-sm bg-ink-2"
          delay={(index % 3) * 0.09}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src={work.src}
            alt={work.alt}
            width={work.width}
            height={work.height}
            loading="lazy"
            decoding="async"
            style={{ y: imgY, scale: imgScale }}
            className="h-full w-full object-cover transition-[filter] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:brightness-110"
          />
        </ImageReveal>
        <div className="pointer-events-none absolute inset-0 bg-ink/20 transition-opacity duration-700 group-hover:opacity-0" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-bone/10" />
      </div>

      <motion.figcaption
        className="mt-3 flex items-baseline justify-between gap-3 overflow-hidden"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.25 + (index % 3) * 0.09 }}
      >
        <span className="text-[0.72rem] uppercase tracking-[0.16em] text-bone transition-colors duration-500 group-hover:text-gold">
          {work.style}
        </span>
        <span className="h-px flex-1 bg-gold/25" aria-hidden />
        <span className="text-[0.68rem] uppercase tracking-[0.14em] text-gold/60">
          {work.artist}
        </span>
      </motion.figcaption>
    </motion.figure>
  );
}

/** One column that drifts at its own rate as the section passes the viewport. */
function Column({
  works,
  speed,
  skew,
  className = "",
}: {
  works: Work[];
  speed: number;
  skew: MotionValue<number>;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed}%`, `${-speed}%`]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`flex flex-col gap-5 md:gap-6 ${className}`}
    >
      {works.map((w, i) => (
        <Tile key={w.src} work={w} index={i} skew={skew} />
      ))}
    </motion.div>
  );
}

export default function Gallery() {
  const skew = useVelocitySkew(2.6);

  // Three columns need at least two works each to avoid a short, obviously
  // empty third column — five works split 2/2/1 and left a gap. Falls back to
  // two until the portfolio is big enough, then widens on its own.
  const wide = portfolio.length >= 6;
  const cols = portfolioColumns(wide ? 3 : 2);

  // Mobile always shows two columns.
  const mobileCols = portfolioColumns(2);

  return (
    <section id="arbeten" className="relative py-[clamp(3.5rem,8vh,6rem)]">
      <div className="edge">
        <SectionHead index="03" label="Arbeten" />

        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <MaskUp>
            <h2 className="display t-xl text-bone">Portfolio</h2>
          </MaskUp>
          <motion.p
            className="max-w-sm pb-3 text-[0.93rem] leading-relaxed text-bone-dim"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            Ett urval från studion. Hela flödet ligger på Instagram.
          </motion.p>
        </div>
      </div>

      <div className="edge mt-10">
        {/* Desktop: columns at different parallax speeds.
            The offsets are a percentage of column height, so two wide columns
            travel far more pixels than three narrow ones for the same number —
            enough that the rising column climbed over the section intro. The
            two-column layout therefore runs at roughly half the speed. */}
        <div
          className={`hidden gap-6 md:grid ${wide ? "md:grid-cols-3" : "md:grid-cols-2"}`}
        >
          <Column works={cols[0]} speed={wide ? 8 : 4} skew={skew} />
          <Column
            works={cols[1]}
            speed={wide ? -10 : -4}
            skew={skew}
            className={wide ? "pt-10" : "pt-6"}
          />
          {wide ? (
            <Column works={cols[2]} speed={6} skew={skew} className="pt-4" />
          ) : null}
        </div>

        {/* Mobile: two columns, every work still shown */}
        <div className="grid grid-cols-2 gap-5 md:hidden">
          <Column works={mobileCols[0]} speed={5} skew={skew} />
          <Column works={mobileCols[1]} speed={-6} skew={skew} className="pt-6" />
        </div>
      </div>

      <div className="edge mt-12 flex flex-col items-center">
        <a
          href={contact.instagram}
          target="_blank"
          rel="noreferrer"
          data-cursor="Instagram"
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-gold/40 px-8 py-4"
        >
          <span className="absolute inset-0 translate-y-full bg-bone transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
          <span className="relative z-10 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-bone transition-colors duration-500 group-hover:text-ink">
            Se hela flödet {contact.instagramHandle}
          </span>
          <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
            <Arrow />
          </span>
        </a>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 13L13 3M13 3H5.5M13 3v7.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
