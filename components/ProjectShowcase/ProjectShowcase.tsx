"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Project } from "@/lib/content";
import Media from "@/components/ui/Media";
import { useMediaQuery, useReducedMotionSafe } from "@/lib/hooks";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * One project as a scene: the visual scales up and drifts as it scrolls through,
 * the text moves the other way, and the details sit underneath.
 */
export default function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const flip = index % 2 === 1;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.45], [reduceMotion ? 1 : 0.92, 1]);
  const mediaX = useTransform(scrollYProgress, [0, 1], // Horizontal drift is desktop-only; phones get straight vertical storytelling.
    reduceMotion || !desktop ? [0, 0] : [flip ? -40 : 40, flip ? 30 : -30]);
  const textY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [60, -60]);
  const numOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

  const results = project.results;
  const detailsId = `${project.id}-details`;
  const href = project.href || `#${detailsId}`;
  const external = Boolean(project.href?.startsWith("http"));

  return (
    <article ref={ref} aria-labelledby={`${project.id}-title`} className="group relative py-[clamp(56px,9vw,120px)]">
      <div className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-0`}>
        {/* Visual */}
        <motion.div
          style={{ scale, x: mediaX }}
          className={`relative lg:col-span-8 ${flip ? "lg:col-start-5" : "lg:col-start-1"} lg:row-start-1`}
        >
          <a
            href={href}
            data-cursor="project"
            aria-label={`View project: ${project.name}`}
            className="group relative block aspect-[16/10] w-full overflow-hidden rounded-[4px] bg-ink-800"
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
              <Media
                src={project.image}
                video={project.video}
                poster={project.poster}
                alt={`${project.name} project visual`}
                label={project.image || project.video ? undefined : `Add screenshot · public/images/projects/${project.id}.jpg`}
                watermark={project.image || project.video ? undefined : project.name}
                fit={project.fit}
                tone={project.tone}
                sizes="(min-width: 1024px) 66vw, 100vw"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-100"
            />
            <span className="absolute bottom-5 right-5 font-mono text-[11px] uppercase tracking-[0.2em] text-fg opacity-0 transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 max-lg:opacity-100">
              View project →
            </span>
          </a>
        </motion.div>

        {/* Title block, overlapping the visual on desktop */}
        <motion.div
          style={{ y: textY }}
          className={`relative z-10 lg:row-start-1 ${flip ? "lg:col-span-5 lg:col-start-1" : "lg:col-span-5 lg:col-start-8"}`}
        >
          <motion.span style={{ opacity: numOpacity }} className="block font-mono text-sm text-violet-2">
            {project.number}
          </motion.span>
          <motion.div className="overflow-hidden transition-transform duration-500 lg:group-hover:translate-x-2" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}>
            <motion.h3
              id={`${project.id}-title`}
              variants={{ hidden: { y: "100%" }, show: { y: "0%" } }}
              transition={{ duration: 1, ease }}
              className={`display mt-3 uppercase ${project.name.length > 9 ? "text-[clamp(40px,4.6vw,76px)]" : "text-[clamp(44px,7vw,112px)]"}`}
            >
              {project.name}
            </motion.h3>
          </motion.div>
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-5 flex flex-wrap gap-x-4 gap-y-1"
          >
            {project.kicker.map((k) => (
              <li key={k} className="eyebrow text-fg-2">
                {k}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      {/* Details */}
      <div id={detailsId} className="mt-12 grid scroll-mt-28 gap-10 border-t border-line pt-10 md:grid-cols-12">
        <p className="text-[17px] leading-relaxed text-fg-2 md:col-span-6 lg:col-span-5">{project.summary}</p>
        <div className="md:col-span-6 lg:col-span-3 lg:col-start-7">
          <h4 className="eyebrow mb-4">What I worked on</h4>
          <ul className="flex flex-col gap-2">
            {project.workedOn.map((w) => (
              <li key={w} className="text-[15px] text-fg">
                {w}
              </li>
            ))}
          </ul>
        </div>
        {results.length ? (
          <div className="md:col-span-12 lg:col-span-3 lg:col-start-10">
            <h4 className="eyebrow mb-5">Results</h4>
            <dl className="grid grid-cols-2 gap-6 lg:grid-cols-1">
              {results.map((r) => (
                <div key={r.label} className="flex flex-col gap-1">
                  <dt className="order-2 text-[13px] text-fg-3">{r.label}</dt>
                  <dd className="order-1 bg-gradient-to-r from-white to-violet-2 bg-clip-text text-[clamp(34px,3.6vw,52px)] font-semibold leading-none tracking-[-0.04em] text-transparent tabular-nums">
                    {r.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
      </div>
    </article>
  );
}
