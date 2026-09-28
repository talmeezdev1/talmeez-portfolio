"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useFinePointer, useReducedMotionSafe } from "@/lib/hooks";

type Mode = "default" | "button" | "link" | "project" | "image" | "video";

const labels: Partial<Record<Mode, string>> = {
  project: "View project →",
  image: "Explore →",
  video: "Play ▶",
};

/**
 * Desktop-only cursor: a small dot plus a soft trailing light.
 * Elements opt in with data-cursor="button | link | project | image | video".
 * Plain links and buttons are detected automatically.
 * Never rendered on touch devices or with reduced motion; the native cursor is kept there.
 */
export default function Cursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotionSafe();
  const enabled = fine && !reduce;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const tx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const ty = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  const [mode, setMode] = useState<Mode>("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor], a, button");
      if (!el) return setMode("default");
      const tagged = el.dataset.cursor as Mode | undefined;
      setMode(tagged ?? (el.tagName === "BUTTON" ? "button" : "link"));
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const label = labels[mode];
  const ring =
    mode === "button"
      ? { width: 54, height: 54, opacity: 0.9, borderWidth: 0 }
      : mode === "link"
        ? { width: 30, height: 30, opacity: 1, borderWidth: 1 }
        : label
          ? { width: 118, height: 118, opacity: 1, borderWidth: 0 }
          : { width: 36, height: 36, opacity: 0.55, borderWidth: 0 };

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: visible ? 1 : 0 }}>
      {/* trailing light */}
      <motion.div className="absolute left-0 top-0" style={{ x: tx, y: ty }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border-white/60"
          animate={ring}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          style={{
            borderStyle: "solid",
            background:
              mode === "link"
                ? "transparent"
                : label
                  ? "rgba(108,99,255,0.92)"
                  : "radial-gradient(circle, rgba(139,124,255,0.35), rgba(79,140,255,0.08) 60%, transparent 72%)",
            filter: label || mode === "link" ? "none" : "blur(6px)",
          }}
        />
        <AnimatePresence>
          {label ? (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-white"
            >
              {label}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.div>
      {/* dot: difference blend keeps it visible on both dark and light sections */}
      <motion.div className="absolute left-0 top-0 mix-blend-difference" style={{ x, y }}>
        <div
          className="h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-opacity duration-200"
          style={{ opacity: label ? 0 : 1 }}
        />
      </motion.div>
    </div>
  );
}
