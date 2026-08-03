"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { contact, hours } from "@/lib/site";
import { videos } from "@/lib/media";
import { MaskUp } from "@/components/ui/SplitText";
import Magnetic from "@/components/ui/Magnetic";
import SectionHead from "@/components/ui/SectionHead";
import ImageReveal from "@/components/ui/ImageReveal";
import AutoVideo from "@/components/ui/AutoVideo";
import Logo from "@/components/ui/Logo";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  return (
    <section ref={ref} id="kontakt" className="edge relative py-[clamp(3.5rem,8vh,6rem)]">
      <SectionHead index="07" label="Kontakt" />

      <div className="mt-9 grid gap-12 lg:grid-cols-[1fr_0.72fr] lg:gap-16">
        <div className="flex flex-col">
          <MaskUp>
            <h2 className="display t-xl text-bone">Boka tid</h2>
          </MaskUp>

          <p className="mt-6 max-w-lg text-[1rem] leading-relaxed text-bone-dim">
            DM:a din idé — motiv, storlek och placering. Eller kom förbi.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Magnetic strength={0.3}>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noreferrer"
                data-cursor="DM"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-bone px-9 py-5 text-ink"
              >
                <span className="absolute inset-0 translate-y-full bg-gold transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                <span className="relative z-10 text-[0.78rem] font-semibold uppercase tracking-[0.18em]">
                  DM på Instagram
                </span>
              </a>
            </Magnetic>

            <Magnetic strength={0.3}>
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="Karta"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-gold/40 px-9 py-5"
              >
                <span className="absolute inset-0 translate-y-full bg-bone/10 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                <span className="relative z-10 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-bone">
                  Hitta hit
                </span>
              </a>
            </Magnetic>
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <div>
              <span className="eyebrow">Studion</span>
              <address className="mt-4 not-italic text-[0.95rem] leading-relaxed text-bone">
                {contact.street}
                <br />
                {contact.postal} {contact.city}
                <br />
                {contact.country}
              </address>
              <div className="mt-6 flex flex-col gap-1.5 text-[0.9rem]">
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit text-bone transition-colors hover:text-gold"
                >
                  Instagram {contact.instagramHandle}
                </a>
                <a
                  href={contact.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit text-bone transition-colors hover:text-gold"
                >
                  TikTok {contact.tiktokHandle}
                </a>
                {contact.phone ? (
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="w-fit text-bone hover:text-gold">
                    {contact.phone}
                  </a>
                ) : null}
                {contact.email ? (
                  <a href={`mailto:${contact.email}`} className="w-fit text-bone hover:text-gold">
                    {contact.email}
                  </a>
                ) : null}
              </div>
            </div>

            {/* Sju rader — en per veckodag — sa samma sak som två rader gör.
                Fem av dem var identiska och två var "Bokning"/"Stängt". */}
            <div>
              <span className="eyebrow">Bemannade tider</span>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-bone">
                {hours.summary}
              </p>
              <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">
                {hours.note}
              </p>
            </div>
          </div>
        </div>

        {/* Vertical film panel */}
        <div className="relative hidden lg:block">
          <ImageReveal
            className="relative aspect-[4/5] rounded-sm bg-ink-2"
            from="top"
            duration={1.4}
          >
            <motion.div className="h-[118%] w-full" style={{ y: videoY }}>
              <AutoVideo
                src={videos.heroVertical.src}
                poster={videos.heroVertical.poster}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </ImageReveal>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/30" />
          <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
            <div>
              <span className="eyebrow">{contact.street}</span>
              <p className="display mt-2 text-[1.6rem] leading-none text-bone">
                Trollhättan
              </p>
            </div>
            <Logo size={64} className="mb-1 opacity-90" />
          </div>
        </div>
      </div>
    </section>
  );
}
