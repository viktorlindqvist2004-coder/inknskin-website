"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { videos } from "@/lib/media";
import SectionHead from "@/components/ui/SectionHead";
import AutoVideo from "@/components/ui/AutoVideo";

const COPY =
  "Vi tatuerar inte motiv. Vi bygger något som ska sitta på dig resten av livet.";

/** Each word fades from ghost to bone as the block scrolls through the viewport. */
function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <span className="relative mr-[0.26em] inline-block">
      <motion.span style={{ opacity, y }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
}

export default function Intro() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.15"],
  });

  const words = COPY.split(" ");

  const inkRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: inkProgress } = useScroll({
    target: inkRef,
    offset: ["start end", "end start"],
  });
  const inkY = useTransform(inkProgress, [0, 1], ["-12%", "12%"]);
  const inkScale = useTransform(inkProgress, [0, 0.5, 1], [1.15, 1, 1.15]);

  return (
    <section ref={ref} id="studion" className="edge relative py-[clamp(4rem,9vh,7rem)]">
      <SectionHead index="01" label="Studion" />

      {/* Meningen och filmen står bredvid varandra från md och upp. Staplade
          tog de tillsammans över 1200 px på en bred skärm — en hel skärmhöjd
          för en enda mening.

          Här satt också fyra räknare: "1 tatuerare", "Kungsgatan 16B",
          "5 min", "100% sterilt". Två var direkt felaktiga sedan Nick kom in
          och adressen rättades, och ingen sa något en besökare behöver veta.
          Adress och tider står där de hör hemma — i kontaktsektionen och i
          sidfoten. */}
      <div className="mt-9 grid gap-10 md:grid-cols-[1fr_0.9fr] md:items-center md:gap-14">
        <p className="display max-w-[20ch] text-[clamp(1.75rem,3.6vw,3.1rem)] leading-[1.04] tracking-[-0.035em] text-bone">
          {words.map((w, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={`${w}-${i}`} progress={scrollYProgress} range={[start, end]}>
                {w}
              </Word>
            );
          })}
        </p>

        <div
          ref={inkRef}
          className="relative aspect-[4/3] overflow-hidden rounded-sm bg-ink-2 md:aspect-[5/4]"
        >
          <motion.div
            className="h-[124%] w-full -translate-y-[10%]"
            style={{ y: inkY, scale: inkScale }}
          >
            <AutoVideo
              src={videos.ink.src}
              poster={videos.ink.poster}
              className="h-full w-full object-cover opacity-90"
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />
        </div>
      </div>
    </section>
  );
}
