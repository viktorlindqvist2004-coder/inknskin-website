"use client";

import { motion, type MotionValue } from "motion/react";
import { reviews, reviewCount, reviewCountApprox, averageRating, REVIEWS_VERIFIED, type Review } from "@/lib/reviews";
import Marquee from "@/components/ui/Marquee";
import Counter from "@/components/ui/Counter";
import { MaskUp } from "@/components/ui/SplitText";
import { contact } from "@/lib/site";
import SectionHead from "@/components/ui/SectionHead";
import { useVelocitySkew } from "@/components/ui/useVelocitySkew";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-1" aria-label={`${n} av 5 stjärnor`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z"
            fill={i < n ? "var(--color-gold)" : "transparent"}
            stroke="var(--color-gold)"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

function Card({ review, skew }: { review: Review; skew: MotionValue<number> }) {
  return (
    <motion.article style={{ skewY: skew }} className="mx-3 flex w-[clamp(19rem,29vw,26rem)] shrink-0 flex-col justify-between gap-6 rounded-sm border border-gold/22 bg-ink-2/80 p-7 md:backdrop-blur-sm transition-colors duration-500 hover:border-gold/40">
      <Stars n={review.rating} />
      <p className="text-[0.95rem] leading-relaxed text-bone/85">“{review.body}”</p>
      <footer className="flex items-end justify-between gap-4 border-t border-gold/18 pt-4">
        <div>
          <div className="text-[0.82rem] text-bone">{review.author}</div>
          {review.context ? (
            <div className="mt-0.5 text-[0.7rem] uppercase tracking-[0.14em] text-muted">
              {review.context}
            </div>
          ) : null}
        </div>
        {review.source ? (
          <span className="text-[0.65rem] uppercase tracking-[0.18em] text-muted">
            {review.source}
          </span>
        ) : null}
      </footer>
    </motion.article>
  );
}

/**
 * The marquee wraps at exactly one copy of its content, so a row narrower than
 * the viewport leaves a visible gap mid-band. Google's API only ever returns a
 * handful of reviews, which can put as few as two cards in a row — repeat the
 * row until it is comfortably wider than any screen.
 */
const MIN_PER_ROW = 5;

function fill(row: Review[]): Review[] {
  if (row.length === 0) return row;
  const out: Review[] = [];
  while (out.length < MIN_PER_ROW) out.push(...row);
  return out;
}

export default function Reviews() {
  const skew = useVelocitySkew(2);
  const half = Math.ceil(reviews.length / 2);
  const rowA = fill(reviews.slice(0, half));
  const rowB = fill(reviews.slice(half).length ? reviews.slice(half) : reviews.slice(0, half));

  return (
    <section id="omdomen" className="relative overflow-hidden py-[clamp(5rem,12vh,9rem)]">
      <div className="edge">
        <SectionHead index="05" label="Omdömen" />

        <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <MaskUp>
            <h2 className="display t-xl text-bone">Vad kunderna säger</h2>
          </MaskUp>

          <motion.div
            className="flex items-end gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <div className="display flex items-baseline text-[clamp(3rem,7vw,5.5rem)] leading-none text-bone tabular-nums">
                <Counter to={averageRating} decimals={1} />
                <span className="ml-1 text-[0.42em] text-muted">/5</span>
              </div>
              <div className="mt-3">
                <Stars n={Math.round(averageRating)} />
              </div>
            </div>
            <div className="border-l border-gold/22 pl-8">
              <div className="display flex items-baseline gap-2 text-[clamp(1.8rem,4vw,3rem)] leading-none text-bone tabular-nums">
                {reviewCountApprox ? (
                  <span className="text-[0.42em] uppercase tracking-[0.14em] text-gold">
                    Över
                  </span>
                ) : null}
                <Counter to={reviewCount} />
              </div>
              <div className="mt-2 text-[0.7rem] uppercase tracking-[0.16em] text-muted">
                recensioner på Google
              </div>
            </div>
          </motion.div>
        </div>

        {process.env.NODE_ENV !== "production" && !REVIEWS_VERIFIED ? (
          <p className="mt-8 rounded-sm border border-gold/40 bg-gold/10 px-4 py-3 text-[0.8rem] text-bone">
            <strong>Endast synligt i utvecklingsläge:</strong> omdömena nedan är
            platshållare. Kör{" "}
            <code className="text-gold">npm run fetch-reviews</code> för att
            hämta de riktiga — sidan växlar över automatiskt.
          </p>
        ) : null}
      </div>

      <div className="mt-14 flex flex-col gap-4 md:gap-6">
        <Marquee baseSpeed={38} direction={-1}>
          {rowA.map((r, i) => (
            <Card key={`a-${i}`} review={r} skew={skew} />
          ))}
        </Marquee>
        <Marquee baseSpeed={38} direction={1}>
          {rowB.map((r, i) => (
            <Card key={`b-${i}`} review={r} skew={skew} />
          ))}
        </Marquee>
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent md:w-32" />

      <div className="edge mt-14 flex justify-center">
        <a
          href={contact.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="text-[0.75rem] uppercase tracking-[0.18em] text-bone-dim underline-offset-8 transition-colors hover:text-gold hover:underline"
        >
          Läs alla omdömen på Google
        </a>
      </div>
    </section>
  );
}
