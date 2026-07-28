"use client";

import { motion } from "motion/react";
import { contact, site } from "@/lib/site";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  // The wordmark reveal is whileInView rather than scroll-linked. A
  // scroll-linked progress on the last element of the page never completes:
  // there is no scroll left once the footer is on screen, so it stayed parked
  // at its start values — 25% opacity and 22% off position.
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-gold/18 pt-16">
      <div className="edge flex flex-col gap-10 pb-14 md:flex-row md:justify-between">
        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -14 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Logo size={76} />
          </motion.div>
          <span className="eyebrow">Studion</span>
          <a
            href={contact.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[0.92rem] leading-relaxed text-bone transition-colors hover:text-gold"
          >
            {contact.street}
            <br />
            {contact.postal} {contact.city}
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <span className="eyebrow">Följ</span>
          <a
            href={contact.instagram}
            target="_blank"
            rel="noreferrer"
            className="text-[0.92rem] text-bone transition-colors hover:text-gold"
          >
            Instagram {contact.instagramHandle}
          </a>
          <a
            href={contact.tiktok}
            target="_blank"
            rel="noreferrer"
            className="text-[0.92rem] text-bone transition-colors hover:text-gold"
          >
            TikTok {contact.tiktokHandle}
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <span className="eyebrow">Bemannat</span>
          <span className="text-[0.92rem] leading-relaxed text-bone">
            Mån–Fre 12:00 – 16:30
            <br />
            <span className="text-muted">Övriga tider via DM</span>
          </span>
        </div>

        <a
          href="#top"
          data-cursor="Upp"
          className="group flex h-fit items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-bone-dim transition-colors hover:text-bone"
        >
          <span className="transition-transform duration-500 group-hover:-translate-y-1">↑</span>
          Till toppen
        </a>
      </div>

      {/* Oversized wordmark bleeding off the bottom edge.
          Grey fill with a hairline outline in the emblem's gold. The type is
          held on one line — at 19vw it wrapped to "INKN / SKIN". */}
      <motion.div
        className="edge select-none"
        initial={{ opacity: 0, y: "18%" }}
        whileInView={{ opacity: 1, y: "0%" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden
      >
        <span
          className="display block w-full whitespace-nowrap text-center text-[clamp(2rem,13vw,12rem)] leading-[0.85] tracking-[-0.04em] text-[#35312b]"
          style={{
            WebkitTextStrokeWidth: "1.5px",
            WebkitTextStrokeColor: "var(--color-gold)",
          }}
        >
          INK N SKIN
        </span>
      </motion.div>

      <div className="edge flex flex-col gap-2 border-t border-gold/18 py-6 text-[0.72rem] text-muted md:flex-row md:items-center md:justify-between">
        <span>
          © {year} {site.legalName} · Est. {site.est}
        </span>
        <span>Tatueringsstudio i Trollhättan · 18 år och giltig legitimation krävs</span>
      </div>
    </footer>
  );
}
