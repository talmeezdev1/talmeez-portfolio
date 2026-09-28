"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { labItems, type LabItem } from "@/lib/content";
import { useFinePointer } from "@/lib/hooks";
import { showPlaceholders } from "@/lib/placeholders";

const tones = [
  "radial-gradient(70% 70% at 30% 30%, rgba(108,99,255,0.4), transparent 70%)",
  "radial-gradient(70% 70% at 70% 40%, rgba(79,140,255,0.35), transparent 70%)",
  "radial-gradient(70% 70% at 50% 70%, rgba(85,214,255,0.25), transparent 70%)",
];



const isPlaceholder = (item: LabItem) => !item.src && !item.video;
/** On the live site, only filled-in items appear. */
const visibleItems = labItems.filter((item) => showPlaceholders || !isPlaceholder(item));

function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-ink-950/50 backdrop-blur-sm ${className}`}
    >
      <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
        <path d="M13 8 1 15V1z" />
      </svg>
    </span>
  );
}

/**
 * Video tile: muted preview that plays on hover (desktop) or while on screen (phones).
 * Nothing downloads beyond metadata until it is about to play.
 */
function VideoPreview({ item, active }: { item: LabItem; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const fine = useFinePointer();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || fine) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [fine]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shouldPlay = !reduce && (fine ? active : inView);
    if (shouldPlay) el.play().catch(() => {});
    else el.pause();
  }, [active, inView, fine]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      src={item.video}
      poster={item.poster || undefined}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

function Tile({ item, index, onOpen }: { item: LabItem; index: number; onOpen: (item: LabItem) => void }) {
  const [hover, setHover] = useState(false);
  const placeholder = isPlaceholder(item);
  const isVideo = item.type.toLowerCase().includes("video") || Boolean(item.video);
  const label = placeholder ? `${item.type} placeholder` : `${isVideo ? "Play" : "View"} ${item.title}`;

  return (
    <motion.button
      type="button"
      data-cursor={isVideo && !placeholder ? "video" : "image"}
      onClick={() => !placeholder && onOpen(item)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      aria-label={label}
      aria-disabled={placeholder || undefined}
      whileHover={{ y: -4 }}
      whileFocus={{ y: -4 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="group relative block w-full overflow-hidden rounded-[18px] bg-ink-800 text-left ring-1 ring-white/10"
      style={{ aspectRatio: item.ratio }}
    >
      {item.video ? (
        <VideoPreview item={item} active={hover} />
      ) : item.src ? (
        <Image src={item.src} alt="" fill sizes="(min-width:1024px) 30vw, 50vw" className="object-cover" />
      ) : (
        <div aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: tones[index % tones.length] }} />
      )}

      {!placeholder ? (
        <span className="absolute left-3 top-3 z-[1] rounded-full bg-ink-950/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-fg backdrop-blur">
          {item.type}
        </span>
      ) : null}
      {isVideo ? (
        <PlayIcon
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-fg transition-opacity duration-300 ${
            hover && item.video ? "opacity-0" : "opacity-100"
          }`}
        />
      ) : null}

      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-ink-950/95 to-transparent p-4 pt-12 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="eyebrow text-cyan">{item.type}</span>
        {placeholder ? (
          <span className="placeholder-tag self-start">{item.title}</span>
        ) : (
          <>
            <span className="text-[13px] text-fg">{item.title}</span>
            {item.meta ? <span className="text-[12px] text-fg-3">{item.meta}</span> : null}
          </>
        )}
      </span>
    </motion.button>
  );
}

/** Full-screen view. Videos play with sound and controls here. */
function Lightbox({ item, onClose }: { item: LabItem; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      prev?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[150] flex items-center justify-center bg-ink-950/92 p-4 backdrop-blur-md sm:p-10"
      onClick={onClose}
    >
      <motion.figure
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 10 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-full w-full flex-col items-center gap-4"
      >
        <div
          className="relative max-h-[78svh] w-auto max-w-full overflow-hidden rounded-[6px] bg-black"
          style={{ aspectRatio: item.ratio, height: "78svh" }}
        >
          {item.video ? (
            <video className="h-full w-full object-contain" src={item.video} poster={item.poster || undefined} controls autoPlay playsInline />
          ) : item.src ? (
            <Image src={item.src} alt={item.title} fill sizes="90vw" className="object-contain" />
          ) : null}
        </div>
        <figcaption className="flex flex-col items-center gap-1 text-center">
          <span className="eyebrow text-cyan">{item.type}</span>
          <span className="text-fg">{item.title}</span>
          {item.meta ? <span className="text-sm text-fg-3">{item.meta}</span> : null}
        </figcaption>
      </motion.figure>
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute right-4 top-[calc(env(safe-area-inset-top,0px)+16px)] rounded-full border border-white/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg hover:border-white/40"
      >
        Close ✕
      </button>
    </motion.div>
  );
}

type Filter = "all" | "video" | "design";
const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "video", label: "Video ads" },
  { id: "design", label: "Designs" },
];

export default function CreativeLab() {
  const [open, setOpen] = useState<LabItem | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const close = useCallback(() => setOpen(null), []);
  const items = visibleItems.filter((it) => (filter === "all" ? true : filter === "video" ? Boolean(it.video) : !it.video));
  const count = (f: Filter) => visibleItems.filter((it) => (f === "all" ? true : f === "video" ? Boolean(it.video) : !it.video)).length;

  return (
    <section id="ads" aria-label="Ad library" className="sheet-dark scroll-mt-10 py-[clamp(96px,11vw,160px)]">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Creative Lab</span>
            <h2 className="display mt-4 text-[clamp(44px,7vw,104px)] uppercase">Ad library</h2>
          </div>
          <div className="flex flex-col items-start gap-4 sm:items-end">
            <p className="max-w-[34ch] text-[16px] leading-relaxed text-fg-2 sm:text-right">
              Video ads, statics and social creative I&apos;ve made. Tap any piece to open it.
            </p>
            <div role="tablist" aria-label="Filter creative" className="flex gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={`relative rounded-full px-4 py-1.5 text-[13px] transition-colors ${filter === f.id ? "text-ink-950" : "text-fg-2 hover:text-fg"}`}
                >
                  {filter === f.id ? (
                    <motion.span layoutId="lab-filter" className="absolute inset-0 rounded-full bg-fg" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                  ) : null}
                  <span className="relative">
                    {f.label} <span className="opacity-60">{count(f.id)}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.ul layout className="mt-14 columns-2 gap-4 sm:gap-5 lg:columns-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.li
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mb-4 break-inside-avoid sm:mb-5"
              >
                <Tile item={item} index={i} onOpen={setOpen} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <AnimatePresence>{open ? <Lightbox key={open.id} item={open} onClose={close} /> : null}</AnimatePresence>
    </section>
  );
}
