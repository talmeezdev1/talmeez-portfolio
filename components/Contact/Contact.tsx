"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import LiveClock from "@/components/ui/LiveClock";
import { site } from "@/lib/content";
import SocialIcon, { type IconName } from "@/components/ui/SocialIcon";

const ease = [0.16, 1, 0.3, 1] as const;

const channels: { k: string; icon: IconName; label: string; href: string }[] = [
  { k: "Email", icon: "email", ...site.contact.email },
  { k: "LinkedIn", icon: "linkedin", ...site.contact.linkedin },
  { k: "GitHub", icon: "github", ...site.contact.github },
];

export default function Contact() {
  const primary = site.contact.email.href || site.contact.linkedin.href || "#contact-details";
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative z-[1] -mt-10 overflow-hidden rounded-t-[40px] bg-[linear-gradient(135deg,#5b52f0_0%,#4f8cff_55%,#3cc4f0_100%)] pb-16 pt-[clamp(100px,12vw,180px)] text-white"
    >
      {/* moving light */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-1/4 -top-1/3 h-[90vmax] w-[90vmax] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.22),transparent_70%)] motion-safe:animate-[aurora-a_22s_ease-in-out_infinite]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 30% 30%, black 20%, transparent 70%)",
        }}
      />

      <div className="container-x relative">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/75">Contact · Dubai · <LiveClock /></span>
        <h2 id="contact-title" className="mt-8">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease }}
            className="display block text-[clamp(56px,11vw,180px)] uppercase text-white/70"
          >
            Have an idea?
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="display block text-[clamp(56px,11vw,180px)] uppercase"
          >
            Let&apos;s build it.
          </motion.span>
        </h2>

        <div className="mt-12 flex flex-wrap gap-3">
          <MagneticButton href={primary} variant="light" external={primary.startsWith("http")}>
            Let&apos;s talk
          </MagneticButton>
          <a
            href="#work"
            className="group inline-flex items-center gap-3 rounded-full border border-white/40 px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/10"
          >
            View my work <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        <ul id="contact-details" className="mt-20 grid gap-3 sm:grid-cols-3" aria-label="Contact details">
          {channels.map((c, i) => (
            <motion.li
              key={c.k}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
            >
              <a
                href={c.href || undefined}
                data-cursor="link"
                className="group flex h-full items-center gap-4 rounded-3xl border border-white/25 bg-white/10 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
                {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#4f5ce8]">
                  <SocialIcon name={c.icon} size={20} />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/70">{c.k}</span>
                  <span className="mt-1 block break-all text-[15px] font-medium">{c.label}</span>
                </span>
                <span aria-hidden="true" className="ml-auto transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
