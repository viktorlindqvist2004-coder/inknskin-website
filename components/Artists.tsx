"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { artists } from "@/lib/site";
import { videos } from "@/lib/media";
import { MaskUp } from "@/components/ui/SplitText";
import SectionHead from "@/components/ui/SectionHead";
import ImageReveal from "@/components/ui/ImageReveal";
import AutoVideo from "@/components/ui/AutoVideo";

type Artist = (typeof artists)[number];

const linkOf = (a: Artist) => ("handleUrl" in a ? a.handleUrl : undefined);

/**
 * Porträttet kommer från tatueraren själv, så en ny person utan foto får en
 * tom ram i stället för någon annans ansikte.
 */
function Portrait({ artist, className = "" }: { artist: Artist; className?: string }) {
  if (!artist.portrait) return null;
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={artist.portrait}
      alt={artist.portraitAlt}
      style={{ objectPosition: artist.portraitPosition }}
      loading="lazy"
      decoding="async"
      className={`h-full w-full object-cover grayscale transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-hover:grayscale-0 ${className}`}
    />
  );
}

/** Namnet breddas via Archivos width-axel när kortet hovras. */
function Name({ name, className }: { name: string; className: string }) {
  return (
    <h3
      className={`display transition-[font-variation-settings] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
      style={{ fontVariationSettings: '"wdth" 100' }}
    >
      <span className="block group-hover:[font-variation-settings:'wdth'_118]">
        {name}
      </span>
    </h3>
  );
}

/**
 * Bara Instagram-länken.
 *
 * Här satt tidigare en rad stilmärkningar per person — "Fineline", "Blackwork",
 * "Cover-up" och så vidare. De räknade upp exakt samma stilar som sektionen
 * Arbetet redan listar två skärmar högre upp, och på mobil radbröt de till tre
 * rader per tatuerare. `focus` ligger kvar i lib/site.ts eftersom den beskriver
 * personen och kan behövas igen.
 */
function Handle({ artist }: { artist: Artist }) {
  const url = linkOf(artist);
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      data-cursor="Instagram"
      className="mt-4 inline-block rounded-full border border-gold/40 px-3.5 py-1.5 text-[0.68rem] uppercase tracking-[0.14em] text-gold transition-colors hover:bg-gold hover:text-ink"
    >
      {artist.handle}
    </a>
  );
}

/** Ensam tatuerare: bild och text sida vid sida, i full sektionsbredd. */
function Solo({ artist }: { artist: Artist }) {
  return (
    <motion.article
      className="group mt-16 grid gap-10 md:grid-cols-[0.82fr_1.18fr] md:items-center md:gap-16"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative">
        <ImageReveal
          className="relative aspect-[4/5] rounded-sm bg-ink-2"
          from="top"
          duration={1.4}
        >
          <Portrait artist={artist} />
        </ImageReveal>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <span className="absolute left-5 top-5 font-mono text-[0.7rem] tracking-[0.22em] text-gold">
          01
        </span>
      </div>

      <div>
        <p className="text-[0.72rem] uppercase tracking-[0.2em] text-gold">
          {artist.role}
        </p>
        <Name name={artist.name} className="mt-3 t-lg text-bone" />
        <p className="mt-8 max-w-xl text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed text-bone-dim">
          {artist.bio}
        </p>
        <Handle artist={artist} />
      </div>
    </motion.article>
  );
}

/** Två eller fler: rutnät av porträttkort. */
function Grid({ list }: { list: readonly Artist[] }) {
  return (
    <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-8">
      {list.map((a, i) => (
        <motion.article
          key={a.name}
          className="group relative"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-ink-2">
            <Portrait artist={a} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
            <span className="absolute left-5 top-5 font-mono text-[0.7rem] tracking-[0.22em] text-gold">
              0{i + 1}
            </span>
            <div className="absolute inset-x-5 bottom-5">
              <Name name={a.name} className="text-[clamp(2.2rem,5.4vw,3.8rem)] text-bone" />
              <p className="mt-1 text-[0.72rem] uppercase tracking-[0.2em] text-gold">
                {a.role}
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-md text-[0.92rem] leading-relaxed text-bone-dim">
            {a.bio}
          </p>
          <Handle artist={a} />
        </motion.article>
      ))}
    </div>
  );
}

export default function Artists() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  // `artists` är `as const`, så .length blir en literal typ och en direkt
  // jämförelse mot 1 avvisas av TypeScript. Vidga till number — layouten ska
  // fortfarande kunna växla tillbaka om studion går ner till en tatuerare.
  const solo = (artists as readonly Artist[]).length === 1;

  return (
    <section
      ref={ref}
      id="tatuerare"
      className="relative overflow-hidden py-[clamp(3.5rem,8vh,6rem)]"
    >
      {/* Barely-there footage wash behind the whole section. It sits at 13%
          opacity, so on phones the still poster is indistinguishable from the
          film — not worth a fourth simultaneous video decode. */}
      <motion.div className="absolute inset-0 -z-10 opacity-[0.13]" style={{ y: bgY }} aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={videos.needle.poster}
          alt=""
          className="h-[116%] w-full object-cover md:hidden"
          loading="lazy"
          decoding="async"
        />
        <AutoVideo
          src={videos.needle.src}
          poster={videos.needle.poster}
          className="hidden h-[116%] w-full object-cover md:block"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/80 to-ink" aria-hidden />

      <div className="edge">
        <SectionHead index="04" label={solo ? "Tatueraren" : "Tatuerare"} />

        <MaskUp className="mt-8">
          <h2 className="display t-xl text-bone">Handen bakom</h2>
        </MaskUp>

        {solo ? <Solo artist={artists[0]} /> : <Grid list={artists} />}
      </div>
    </section>
  );
}
