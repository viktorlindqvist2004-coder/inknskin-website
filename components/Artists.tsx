"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { artists } from "@/lib/site";
import { images, videos, arashPortrait, nickPortrait } from "@/lib/media";
import { MaskUp } from "@/components/ui/SplitText";
import SectionHead from "@/components/ui/SectionHead";
import ImageReveal from "@/components/ui/ImageReveal";
import AutoVideo from "@/components/ui/AutoVideo";

type Artist = (typeof artists)[number];

/**
 * Ett porträtt per tatuerare, i samma ordning som `artists`. De två första är
 * riktiga foton; sista posten är en platshållare om studion växer igen.
 */
const PORTRAITS: { src: string; alt: string; objectPosition: string }[] = [
  // Arash foto är nästan kvadratiskt, så en stående ram klipper i sidled.
  // Beskärningen dras åt höger så huvudet och maskinen ryms.
  { ...arashPortrait, objectPosition: "92% center" },
  // Nicks är redan 4:5 och behöver ingen förskjutning.
  { ...nickPortrait, objectPosition: "center" },
  { ...images.arm, objectPosition: "center" },
];

const linkOf = (a: Artist) => ("handleUrl" in a ? a.handleUrl : undefined);

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

function FocusTags({ artist }: { artist: Artist }) {
  const url = linkOf(artist);
  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      {artist.focus.map((f) => (
        <span
          key={f}
          className="rounded-full border border-gold/30 px-3.5 py-1.5 text-[0.68rem] uppercase tracking-[0.14em] text-bone-dim transition-colors duration-500 group-hover:border-gold/55"
        >
          {f}
        </span>
      ))}
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          data-cursor="Instagram"
          className="rounded-full border border-gold/40 px-3.5 py-1.5 text-[0.68rem] uppercase tracking-[0.14em] text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          {artist.handle}
        </a>
      ) : null}
    </div>
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
          {/* Nästan kvadratiskt foto i en stående ram — beskärningen styrs mot
              höger så att ansiktet och maskinen ryms och den oskarpa armen
              till vänster är det som faller bort. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={arashPortrait.src}
            alt={arashPortrait.alt}
            width={arashPortrait.width}
            height={arashPortrait.height}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-[92%_center] grayscale transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-hover:grayscale-0"
          />
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
        <FocusTags artist={artist} />
      </div>
    </motion.article>
  );
}

/** Två eller fler: rutnät av porträttkort. */
function Grid({ list }: { list: readonly Artist[] }) {
  return (
    <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-10">
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={(PORTRAITS[i] ?? PORTRAITS[0]).src}
              alt={(PORTRAITS[i] ?? PORTRAITS[0]).alt}
              style={{ objectPosition: (PORTRAITS[i] ?? PORTRAITS[0]).objectPosition }}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover grayscale transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-hover:grayscale-0"
            />
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

          <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-bone-dim">
            {a.bio}
          </p>
          <FocusTags artist={a} />
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
      className="relative overflow-hidden py-[clamp(5rem,12vh,9rem)]"
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

        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <MaskUp>
            <h2 className="display t-xl text-bone">Handen bakom</h2>
          </MaskUp>
          <p className="max-w-sm pb-3 text-[0.93rem] leading-relaxed text-bone-dim">
            {solo
              ? "En tatuerare, samma hand från skiss till sista linjen."
              : "Säg vad du vill ha så säger vi vem som passar bäst."}
          </p>
        </div>

        {solo ? <Solo artist={artists[0]} /> : <Grid list={artists} />}
      </div>
    </section>
  );
}
