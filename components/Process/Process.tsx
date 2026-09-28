"use client";

import { motion } from "framer-motion";
import { philosophy, process } from "@/lib/content";
import Card from "@/components/ui/Card";

const ease = [0.16, 1, 0.3, 1] as const;

const icons = [
  // Think: lightbulb
  <path key="t" d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V17h5.2v-1.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Zm-2.6 16h5.2v1.2a1.3 1.3 0 0 1-1.3 1.3h-2.6a1.3 1.3 0 0 1-1.3-1.3V19Z" />,
  // Build: blocks
  <path key="b" d="M3 13h8v8H3v-8Zm10 0h8v8h-8v-8ZM8 3h8v8H8V3Z" />,
  // Launch: rocket
  <path key="l" d="M14.5 3c3.5 0 6.5 3 6.5 6.5 0 2.7-1.6 5.1-4 6.8V20l-3 1.5-1.2-3.3-3.3-3.3L6.2 13.7 7.7 10.7h3.7C13 6.6 13.7 3 14.5 3ZM15 7.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM5.5 15.5c1.2 0 3 1.8 3 3 0 1.7-3.5 2.5-5.5 2.5 0-2 .8-5.5 2.5-5.5Z" />,
  // Optimize: chart up
  <path key="o" d="M3 20h18v1.5H3V20Zm1.5-3.2 5-5 3.5 3.5 5.7-5.7H16V8h5v5h-1.6V10.7l-6.4 6.4-3.5-3.5-3.9 3.9-1.1-1.1Z" />,
];

export default function Process() {
  return (
    <section aria-label="How I work" className="sheet-dark py-[clamp(100px,12vw,180px)]">
      <div className="container-x">
        <span className="eyebrow">Process</span>
        <h2 className="display mt-4 text-[clamp(44px,7vw,104px)] uppercase">How I work</h2>

        <div className="relative mt-14">
          {/* connecting line */}
          <div aria-hidden="true" className="absolute left-[8%] right-[8%] top-[52px] hidden h-px bg-white/10 lg:block">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-violet-2 via-electric to-cyan"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 1 }}
              transition={{ duration: 1.6, ease }}
            />
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <motion.li
                key={p.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease }}
              >
                <Card className="h-full p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-electric text-white shadow-[0_10px_30px_-10px_rgba(108,99,255,0.9)]">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        {icons[i]}
                      </svg>
                    </span>
                    <span className="font-mono text-[13px] text-fg-3">{p.n}</span>
                  </div>
                  <h3 className="mt-8 text-[30px] font-semibold uppercase leading-none tracking-[-0.04em]">{p.title}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-fg-2">{p.text}</p>
                </Card>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Philosophy */}
        <div className="mt-[clamp(80px,10vw,140px)] border-t border-white/10 pt-12">
          <span className="eyebrow">Philosophy</span>
          <div className="mt-8 flex flex-col gap-2">
            {philosophy.map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0.12 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 1 }}
                transition={{ duration: 1.4, delay: i * 0.35 }}
                className={`text-[clamp(28px,4.6vw,72px)] font-medium uppercase leading-[1] tracking-[-0.04em] ${
                  i === philosophy.length - 1 ? "bg-gradient-to-r from-white via-violet-2 to-cyan bg-clip-text text-transparent" : "text-fg-2"
                }`}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
