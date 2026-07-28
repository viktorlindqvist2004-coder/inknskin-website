"use client";

import { motion } from "motion/react";
import { services } from "@/lib/site";
import { MaskUp } from "@/components/ui/SplitText";
import SectionHead from "@/components/ui/SectionHead";

export default function Services() {
  return (
    <section id="tjanster" className="edge relative py-[clamp(5rem,12vh,9rem)]">
      <SectionHead index="02" label="Vad vi gör" />

      <MaskUp className="mt-10">
        <h2 className="display t-xl text-bone">Arbetet</h2>
      </MaskUp>

      <div className="relative mt-14">
        <ul className="border-t border-gold/22">
          {services.map((s, i) => (
            <motion.li
              key={s.n}
              className="group relative border-b border-gold/22"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
            >
              {/* Ember wipe fills the row from the left on hover */}
              <span className="pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 bg-gold/8 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />

              <div className="flex flex-col gap-3 py-7 md:flex-row md:items-baseline md:gap-10">
                <span className="font-mono text-[0.7rem] tracking-[0.2em] text-gold/55 transition-colors duration-500 group-hover:text-gold md:w-14">
                  {s.n}
                </span>

                <h3 className="display text-[clamp(1.6rem,3.6vw,3rem)] text-bone transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:w-[38%] md:group-hover:translate-x-3">
                  {s.title}
                </h3>

                <p className="max-w-xl flex-1 text-[0.93rem] leading-relaxed text-bone-dim transition-colors duration-500 group-hover:text-bone/85">
                  {s.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
