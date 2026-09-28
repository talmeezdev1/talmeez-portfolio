import { ticker } from "@/lib/content";

/** Continuous strip of real results and skills. Pauses on hover; stands still with reduced motion. */
export default function LiveTicker() {
  const row = [...ticker, ...ticker];
  return (
    <section aria-label="Highlights" className="relative mb-10 border-y border-white/10 bg-ink-900/60 py-5 backdrop-blur-sm">
      <p className="sr-only">{ticker.map((t) => t.text).join(". ")}</p>
      <div aria-hidden="true" className="group overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <ul className="flex w-max items-center gap-10 whitespace-nowrap motion-safe:animate-[marquee_38s_linear_infinite] group-hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <li key={i} className="flex items-center gap-10">
              <span className={t.highlight ? "text-[15px] font-medium text-fg" : "font-mono text-[12px] uppercase tracking-[0.2em] text-fg-2"}>
                {t.highlight ? (
                  <>
                    <span className="bg-gradient-to-r from-violet-2 to-cyan bg-clip-text text-transparent">{t.highlight}</span> {t.text}
                  </>
                ) : (
                  t.text
                )}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-violet-2/70" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
