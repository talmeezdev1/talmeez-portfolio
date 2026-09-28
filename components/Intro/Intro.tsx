"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/hooks";
import { useRef } from "react";

const lines = ["Not just a marketer.", "Not just a designer.", "Not just a developer."];

function Line({ text, progress, range }: { text: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, [range[0], range[1], 0.58, 0.68], [0.08, 1, 1, 0]);
  const y = useTransform(progress, range, [40, 0]);
  return (
    <motion.p style={{ opacity, y }} className="text-[clamp(30px,6vw,92px)] font-medium uppercase leading-[0.95] tracking-[-0.04em] text-fg-2">
      {text}
    </motion.p>
  );
}

/** Pinned typographic sequence. Each line arrives with scroll, then BUILDER takes over. */
export default function Intro() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const builderScale = useTransform(scrollYProgress, [0.64, 0.9], [0.55, 1]);
  const builderOpacity = useTransform(scrollYProgress, [0.64, 0.76], [0, 1]);
  const glow = useTransform(scrollYProgress, [0.7, 1], [0, 0.9]);

  if (reduce) {
    return (
      <section aria-label="Who I am" className="container-x py-40">
        {lines.map((l) => (
          <p key={l} className="text-[clamp(30px,6vw,92px)] font-medium uppercase leading-[0.95] tracking-[-0.04em] text-fg-2">
            {l}
          </p>
        ))}
        <p className="display mt-8 text-[clamp(72px,19vw,300px)] uppercase">A builder.</p>
      </section>
    );
  }

  return (
    <section ref={ref} aria-label="Who I am" className="relative h-[320vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <motion.div
          aria-hidden="true"
          style={{ opacity: glow }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(108,99,255,0.28),transparent)] blur-2xl"
        />
        <div className="container-x relative">
          <div className="flex flex-col gap-2">
            {lines.map((l, i) => (
              <Line key={l} text={l} progress={scrollYProgress} range={[0.04 + i * 0.14, 0.16 + i * 0.14]} />
            ))}
          </div>
          <motion.p
            style={{ scale: builderScale, opacity: builderOpacity }}
            className="display absolute inset-x-[var(--gutter)] top-1/2 origin-center -translate-y-1/2 text-center text-[clamp(72px,19vw,300px)] uppercase"
          >
            A <span className="bg-gradient-to-r from-white via-violet-2 to-electric bg-clip-text text-transparent">builder.</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
