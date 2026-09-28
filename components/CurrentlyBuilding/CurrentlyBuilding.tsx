import { currentlyBuilding } from "@/lib/content";

export default function CurrentlyBuilding() {
  return (
    <section aria-label="Currently building" className="border-y border-line">
      <div className="container-x flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-cyan opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
          </span>
          Currently building
        </span>
        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          {currentlyBuilding.map((c, i) => (
            <li
              key={c}
              className="font-mono text-[12px] uppercase tracking-[0.16em] text-fg motion-safe:animate-[blink_3.2s_ease-in-out_infinite]"
              style={{ animationDelay: `${i * 0.64}s` }}
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
