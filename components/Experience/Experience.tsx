"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { journey } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const grow = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="experience" aria-label="Experience" className="sheet scroll-mt-10 py-[clamp(100px,12vw,180px)]">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow-dark">Experience · 2019 — Now</span>
            <h2 className="display mt-4 text-[clamp(44px,6vw,92px)] uppercase text-night">The journey</h2>
            <p className="mt-6 max-w-[34ch] text-[16px] leading-relaxed text-night-2">
              From the sales floor to the ad account. Every step taught me something about how people decide.
            </p>
          </div>
        </div>

        <ol ref={ref} className="relative lg:col-span-8">
          <div aria-hidden="true" className="absolute bottom-8 left-[15px] top-4 w-[2px] rounded-full bg-night/10">
            <motion.div style={{ scaleY: grow }} className="h-full w-full origin-top rounded-full bg-gradient-to-b from-violet via-electric to-cyan" />
          </div>
          {journey.map((step, i) => {
            const last = i === journey.length - 1;
            return (
              <motion.li
                key={step.stage}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease }}
                className="relative pb-6 pl-12 last:pb-0"
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-[7px] top-7 h-[18px] w-[18px] rounded-full border-[3px] border-paper ${
                    last ? "bg-gradient-to-br from-violet to-cyan shadow-[0_0_0_6px_rgba(108,99,255,0.18)]" : "bg-violet"
                  }`}
                />
                <div
                  className={`rounded-3xl p-6 ring-1 transition-shadow duration-500 hover:shadow-[0_24px_60px_-30px_rgba(13,18,48,0.35)] sm:p-7 ${
                    last ? "bg-night text-fg ring-night" : "bg-white ring-night/[0.06]"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className={`text-[clamp(24px,2.6vw,36px)] font-semibold uppercase leading-none tracking-[-0.04em] ${last ? "text-fg" : "text-night"}`}>
                      {step.stage}
                    </h3>
                    <span className={`font-mono text-[12px] tabular-nums ${last ? "text-cyan" : "text-violet"}`}>{step.dates}</span>
                  </div>
                  <p className={`mt-3 font-mono text-[11px] uppercase tracking-[0.14em] ${last ? "text-fg-3" : "text-night-3"}`}>
                    {step.role} · {step.place}
                  </p>
                  <p className={`mt-4 max-w-[56ch] text-[16px] leading-relaxed ${last ? "text-fg-2" : "text-night-2"}`}>{step.text}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
