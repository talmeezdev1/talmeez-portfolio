"use client";

import { motion } from "framer-motion";
import { projects, type Project } from "@/lib/content";
import Media from "@/components/ui/Media";
import CountUp from "@/components/ui/CountUp";

const ease = [0.16, 1, 0.3, 1] as const;

function CaseStudy({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  // On desktop the cards stack: each one pins near the top and the next slides over it.
  const top = 96 + index * 18;
  const hasMedia = Boolean(project.image || project.video);

  return (
    <motion.article
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease }}
      style={{ ["--stack-top" as string]: `${top}px` }}
      className="group grid scroll-mt-28 overflow-hidden rounded-[32px] bg-white lg:sticky lg:top-[var(--stack-top)] shadow-[0_1px_0_rgba(13,18,48,0.04),0_30px_80px_-40px_rgba(13,18,48,0.35)] ring-1 ring-night/[0.06] lg:grid-cols-12"
    >
      {/* Visual */}
      <div className={`relative p-3 lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <div data-cursor="project" className="relative aspect-[16/11] overflow-hidden rounded-[24px] bg-ink-900">
          <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
            <Media
              src={project.image}
              video={project.video}
              poster={project.poster}
              alt={`${project.name} project visual`}
              watermark={hasMedia ? undefined : project.name}
              tone={project.tone}
              fit={project.fit}
              sizes="(min-width:1024px) 55vw, 100vw"
            />
          </div>
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-night backdrop-blur">
            {project.number} · {project.kicker[0]}
          </span>
        </div>
      </div>

      {/* Story */}
      <div className={`flex flex-col gap-7 p-7 sm:p-10 lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <div>
          <ul className="flex flex-wrap gap-x-3 gap-y-1">
            {project.kicker.map((k) => (
              <li key={k} className="eyebrow-dark">
                {k}
              </li>
            ))}
          </ul>
          <h3 id={`${project.id}-title`} className="mt-3 text-[clamp(40px,4.6vw,72px)] font-semibold uppercase leading-[0.9] tracking-[-0.05em] text-night">
            {project.name}
          </h3>
          <p className="mt-5 text-[16.5px] leading-relaxed text-night-2">{project.summary}</p>
        </div>

        {project.results.length ? (
          <dl className="grid grid-cols-2 gap-3">
            {project.results.map((r) => (
              <div key={r.label} className="rounded-2xl bg-paper p-4 ring-1 ring-night/[0.05]">
                <dt className="text-[12px] text-night-3">{r.label}</dt>
                <dd className="mt-1">
                  <CountUp
                    value={r.value}
                    className="bg-gradient-to-r from-violet to-electric bg-clip-text text-[clamp(28px,2.8vw,40px)] font-semibold leading-none tracking-[-0.04em] text-transparent"
                  />
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="mt-auto">
          <h4 className="eyebrow-dark mb-3">What I worked on</h4>
          <ul className="flex flex-wrap gap-2">
            {project.workedOn.map((w) => (
              <li key={w} className="rounded-full border border-night/10 px-3 py-1 text-[13px] text-night-2">
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

export default function Work() {
  return (
    <section id="work" aria-label="Selected work" className="sheet scroll-mt-10 pb-[clamp(100px,12vw,180px)] pt-[clamp(80px,10vw,140px)]">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow-dark">Work · 2024 — Now</span>
            <h2 className="display mt-4 text-[clamp(44px,7vw,104px)] uppercase text-night">Selected work</h2>
          </div>
          <p className="max-w-[34ch] text-[16px] leading-relaxed text-night-2">
            Brands I work with, what I do for them, and the numbers where they&apos;re real.
          </p>
        </div>
        <div className="mt-14 flex flex-col gap-8">
          {projects.map((p, i) => (
            <CaseStudy key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
