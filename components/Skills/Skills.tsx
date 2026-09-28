"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { skills } from "@/lib/content";
import { useReducedMotionSafe } from "@/lib/hooks";
import Card from "@/components/ui/Card";
import SkillGraphic from "./SkillGraphic";

const CYCLE_MS = 4800;
const ease = [0.16, 1, 0.3, 1] as const;

/**
 * "What I do" as a control panel: pick a skill on the left, its live graphic plays on the right.
 * It cycles through the skills on its own while on screen, and stops as soon as someone interacts.
 */
export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotionSafe();
  const [active, setActive] = useState(1);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const running = auto && inView && !paused && !reduce;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % skills.length), CYCLE_MS);
    return () => window.clearTimeout(t);
  }, [running, active]);

  const pick = (i: number) => {
    setActive(i);
    setAuto(false);
  };

  const s = skills[active];

  return (
    <section id="skills" ref={ref} aria-label="What I do" className="sheet-dark scroll-mt-24 pb-[clamp(96px,12vw,160px)] pt-[clamp(96px,11vw,160px)]">
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-1/4 -z-10 h-[60vh] w-[60vw] bg-[radial-gradient(closest-side,rgba(79,140,255,0.16),transparent)]" />
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Skills · 08 channels</span>
            <h2 className="display mt-4 text-[clamp(44px,7vw,104px)] uppercase">What I do</h2>
          </div>
          <p className="max-w-[36ch] text-[16px] leading-relaxed text-fg-2">
            One person across the whole funnel: the ad, the creative, the page and the follow-up numbers.
          </p>
        </div>

        {/* Mobile tabs */}
        <div className="-mx-[var(--gutter)] mt-10 overflow-x-auto px-[var(--gutter)] lg:hidden" role="tablist" aria-label="Skills">
          <div className="flex w-max gap-2 pb-2">
            {skills.map((k, i) => (
              <button
                key={k.name}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => pick(i)}
                className={`rounded-full border px-4 py-2 text-[14px] transition-colors ${
                  i === active ? "border-violet-2 bg-violet/25 text-fg" : "border-white/10 bg-white/[0.03] text-fg-2"
                }`}
              >
                {k.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:mt-14 lg:grid-cols-12" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {/* Desktop list */}
          <ul className="hidden lg:col-span-5 lg:flex lg:flex-col" role="tablist" aria-label="Skills" aria-orientation="vertical">
            {skills.map((k, i) => {
              const on = i === active;
              return (
                <li key={k.name}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="skill-panel"
                    onClick={() => pick(i)}
                    onMouseEnter={() => pick(i)}
                    onFocus={() => pick(i)}
                    data-cursor="button"
                    className="group relative flex w-full items-center gap-5 border-b border-white/10 py-4 text-left"
                  >
                    <span className={`font-mono text-[12px] transition-colors ${on ? "text-violet-2" : "text-fg-3"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span
                      className={`text-[clamp(22px,2.2vw,34px)] font-medium uppercase leading-none tracking-[-0.035em] transition-all duration-500 ${
                        on ? "translate-x-2 text-fg" : "text-fg-3 group-hover:text-fg-2"
                      }`}
                    >
                      {k.name}
                    </span>
                    <span aria-hidden="true" className={`ml-auto text-violet-2 transition-all duration-500 ${on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`}>
                      →
                    </span>
                    {/* auto-play progress */}
                    <span aria-hidden="true" className="absolute inset-x-0 bottom-[-1px] h-px overflow-hidden">
                      {on ? (
                        <motion.span
                          key={`${active}-${running}`}
                          className="block h-full origin-left bg-gradient-to-r from-violet-2 to-cyan"
                          initial={{ scaleX: running ? 0 : 1 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: running ? CYCLE_MS / 1000 : 0.3, ease: "linear" }}
                        />
                      ) : null}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Panel */}
          <div className="lg:col-span-7">
            <Card className="h-full p-5 sm:p-8" id="skill-panel" role="tabpanel" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease }}
                  className="flex h-full flex-col gap-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-3">
                      {String(active + 1).padStart(2, "0")} / {String(skills.length).padStart(2, "0")}
                    </span>
                    <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-fg-3">
                      <span className={`h-1.5 w-1.5 rounded-full ${running ? "bg-emerald-400" : "bg-fg-3"}`} />
                      {running ? "Auto" : "Paused"}
                    </span>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-ink-950/50 p-4 sm:p-6">
                    <SkillGraphic skill={s.name} />
                  </div>
                  <div>
                    <h3 className="text-[clamp(28px,3vw,44px)] font-semibold leading-none tracking-[-0.04em]">{s.name}</h3>
                    <p className="mt-3 max-w-[48ch] text-[17px] leading-relaxed text-fg-2">{s.text}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
