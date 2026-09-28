"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { currentlyBuilding, kpis, site, toolkit } from "@/lib/content";
import Card from "@/components/ui/Card";
import CountUp from "@/components/ui/CountUp";
import LiveClock from "@/components/ui/LiveClock";
import MagneticButton from "@/components/ui/MagneticButton";
import { LOADER_DONE } from "@/components/PageLoader/PageLoader";

const ease = [0.16, 1, 0.3, 1] as const;

/** Each card rises in after the loader, one after another. */
function useReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const go = () => setReady(true);
    window.addEventListener(LOADER_DONE, go);
    const t = setTimeout(go, 2600);
    return () => {
      window.removeEventListener(LOADER_DONE, go);
      clearTimeout(t);
    };
  }, []);
  return ready;
}

function Rise({ i, ready, className = "", children }: { i: number; ready: boolean; className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.08 * i, ease }}
    >
      {children}
    </motion.div>
  );
}

/** A tiny decorative pulse line for the KPI cards. It carries no data. */
function Pulse({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 120 24" className="h-6 w-full" aria-hidden="true">
      <motion.path
        d="M0 18 L20 18 L28 8 L36 20 L46 12 L60 14 L70 4 L80 16 L94 10 L120 10"
        fill="none"
        stroke="url(#kpi-line)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay, ease }}
      />
      <defs>
        <linearGradient id="kpi-line" x1="0" x2="1">
          <stop offset="0" stopColor="#8B7CFF" stopOpacity="0.2" />
          <stop offset="1" stopColor="#55D6FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Hero() {
  const ready = useReady();

  return (
    <section id="top" aria-label="Introduction" className="relative pb-16 pt-24 sm:pt-28">
      {/* Hero light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[90vh] bg-[radial-gradient(60%_60%_at_30%_20%,rgba(108,99,255,0.35),transparent_70%),radial-gradient(50%_50%_at_85%_30%,rgba(79,140,255,0.25),transparent_70%)]" />

      <div className="container-x grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Intro */}
        <Rise i={0} ready={ready} className="lg:col-span-7">
          <Card className="flex h-full flex-col justify-between gap-10 p-7 sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {site.location} · <LiveClock />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-3">Portfolio · 2026</span>
            </div>

            <div>
              <p className="mb-5 font-mono text-[12px] uppercase tracking-[0.24em] text-violet-2">{site.name}</p>
              <h1 className="text-[clamp(38px,4.7vw,74px)] font-semibold leading-[0.95] tracking-[-0.045em] text-balance">
                I turn attention into{" "}
                <span className="bg-gradient-to-r from-violet-2 via-electric to-cyan bg-clip-text text-transparent">leads</span>, with ads,
                content and websites.
              </h1>
              <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-fg-2">
                {site.role} in Dubai. I plan the campaign, make the creative, build the landing page and read the numbers after.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <MagneticButton href="#work">See the work</MagneticButton>
              <MagneticButton href="#contact" variant="ghost">
                Let&apos;s talk
              </MagneticButton>
            </div>
          </Card>
        </Rise>

        {/* Portrait */}
        <Rise i={1} ready={ready} className="lg:col-span-5">
          <Card className="group relative aspect-[4/5] h-full min-h-[380px] p-0 lg:aspect-auto" data-cursor="image">
            {site.hasPortrait ? (
              <Image
                src={site.portrait}
                alt={`Portrait of ${site.name}`}
                fill
                priority
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            ) : null}
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent" />
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(70%_50%_at_80%_10%,rgba(108,99,255,0.35),transparent_70%)] mix-blend-screen" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
              <div>
                <p className="text-[28px] font-semibold leading-none tracking-[-0.03em]">Talmeez</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-2">Growth · Creative · Web</p>
              </div>
              <span className="rounded-full border border-white/20 bg-ink-950/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-fg backdrop-blur">
                Dubai, UAE
              </span>
            </div>
          </Card>
        </Rise>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-12 lg:grid-cols-4">
          {kpis.map((k, i) => (
            <Rise key={k.value + k.brand} i={2 + i} ready={ready}>
              <Card className="flex h-full flex-col gap-4 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-fg-3">{k.label}</span>
                  <span className="rounded-full bg-violet/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-violet-2">{k.brand}</span>
                </div>
                <CountUp value={k.value} className="text-[clamp(30px,3.4vw,52px)] font-semibold leading-none tracking-[-0.04em]" />
                <Pulse delay={0.3 + i * 0.15} />
              </Card>
            </Rise>
          ))}
        </div>

        {/* Currently building */}
        <Rise i={6} ready={ready} className="lg:col-span-8">
          <Card className="flex h-full flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
              </span>
              Currently building
            </span>
            <ul className="flex flex-wrap gap-2">
              {currentlyBuilding.map((c, i) => (
                <li
                  key={c}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[13px] text-fg motion-safe:animate-[blink_3.6s_ease-in-out_infinite]"
                  style={{ animationDelay: `${i * 0.7}s` }}
                >
                  {c}
                </li>
              ))}
            </ul>
          </Card>
        </Rise>

        {/* Toolkit */}
        <Rise i={7} ready={ready} className="lg:col-span-4">
          <Card className="h-full p-6 sm:p-7">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-3">Toolkit</span>
            <ul className="mt-4 flex flex-wrap gap-2">
              {toolkit.map((t) => (
                <li key={t} className="rounded-lg bg-white/[0.06] px-2.5 py-1 text-[13px] text-fg-2">
                  {t}
                </li>
              ))}
            </ul>
          </Card>
        </Rise>
      </div>
    </section>
  );
}
