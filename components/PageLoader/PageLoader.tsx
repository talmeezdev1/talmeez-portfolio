"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LOADER_DONE = "talmeez:loader-done";
const KEY = "talmeez-loader-shown";

/**
 * Opening sequence, shown once per browser session.
 * Short (about 1.4s), skippable with a click or any key, and removed entirely afterwards.
 */
export default function PageLoader() {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finish = () => {
      setShow(false);
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      window.dispatchEvent(new Event(LOADER_DONE));
    };

    if (seen) {
      finish();
      return;
    }

    const duration = reduce ? 300 : 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(finish, reduce ? 0 : 250);
    };
    raf = requestAnimationFrame(tick);

    const skip = () => {
      cancelAnimationFrame(raf);
      finish();
    };
    window.addEventListener("keydown", skip, { once: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = show ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="loader"
          role="status"
          aria-label="Loading"
          onClick={() => {
            setShow(false);
            window.dispatchEvent(new Event(LOADER_DONE));
          }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-ink-950 px-[var(--gutter)] py-8"
          style={{ clipPath: "inset(0 0 0% 0)" }}
        >
          <div className="flex justify-between">
            <span className="eyebrow">Digital Growth / Creative / Web</span>
            <span className="eyebrow hidden sm:inline">Dubai, UAE</span>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="display text-[clamp(64px,17vw,260px)]"
            >
              TALMEEZ
            </motion.h1>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="h-px flex-1 bg-white/10">
              <div
                className="h-px bg-gradient-to-r from-violet to-electric"
                style={{ width: `${count}%` }}
              />
            </div>
            <span className="font-mono text-sm tabular-nums text-fg-2">{String(count).padStart(2, "0")}</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
