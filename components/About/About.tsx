"use client";

import { motion } from "framer-motion";
import { languages, site } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as const;

const lines = ["Not just a marketer.", "Not just a designer.", "Not just a developer."];

const meta = [
  { k: "Based in", v: "Dubai, UAE" },
  { k: "Focus", v: "Digital growth" },
  { k: "Working with", v: "Brands, businesses, founders" },
  { k: "Languages", v: languages.join(" · ") },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="sheet scroll-mt-10 py-[clamp(100px,12vw,180px)]">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <span className="eyebrow-dark">About</span>
          <h2 id="about-title" className="mt-6">
            {lines.map((l, i) => (
              <motion.span
                key={l}
                initial={{ opacity: 0.15, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 1 }}
                transition={{ duration: 0.8, delay: i * 0.15, ease }}
                className="block text-[clamp(30px,4.2vw,64px)] font-medium uppercase leading-[1] tracking-[-0.04em] text-night-3"
              >
                {l}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 1 }}
              transition={{ duration: 1, delay: 0.5, ease }}
              className="mt-3 block origin-left text-[clamp(64px,10vw,160px)] font-semibold uppercase leading-[0.85] tracking-[-0.06em]"
            >
              <span className="bg-gradient-to-r from-violet via-electric to-cyan bg-clip-text text-transparent">A builder.</span>
            </motion.span>
          </h2>
        </div>

        <div className="flex flex-col justify-end gap-8 lg:col-span-5">
          <p className="text-[clamp(18px,1.5vw,21px)] leading-relaxed text-night">
            I&apos;m Talmeez, a digital growth and creative specialist based in Dubai. My work combines marketing, content, websites,
            advertising and creative strategy to help businesses build a stronger digital presence and generate real opportunities.
          </p>
          <p className="text-[17px] leading-relaxed text-night-2">
            I started in sales, on the phones. So I care about what happens after the click: the enquiry, the conversation, the customer.
          </p>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-night/10 pt-7">
            {meta.map((m) => (
              <div key={m.k}>
                <dt className="eyebrow-dark">{m.k}</dt>
                <dd className="mt-1.5 text-[15px] font-medium text-night">{m.v}</dd>
              </div>
            ))}
          </dl>
          <span className="sr-only">{site.name}</span>
        </div>
      </div>
    </section>
  );
}
