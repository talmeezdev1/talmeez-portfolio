"use client";

import { motion } from "framer-motion";
import { philosophy } from "@/lib/content";

/** A still moment. Slow reveal, no ambient motion. */
export default function Philosophy() {
  return (
    <section aria-label="Philosophy" className="py-[clamp(120px,18vw,260px)]">
      <div className="container-x">
        <span className="eyebrow">Philosophy</span>
        <div className="mt-12 flex flex-col gap-3">
          {philosophy.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0.08 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 1 }}
              transition={{ duration: 1.8, delay: i * 0.5, ease: "easeOut" }}
              className={`text-[clamp(32px,5.6vw,88px)] font-medium uppercase leading-[0.98] tracking-[-0.04em] ${
                i === philosophy.length - 1 ? "text-fg" : "text-fg-2"
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
