"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/hooks";
import { useRef, type ReactNode, type MouseEvent } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light";
  className?: string;
  external?: boolean;
};

/** Link styled as a button. Drifts a few pixels toward the cursor on desktop. */
export default function MagneticButton({ href, children, variant = "primary", className = "", external }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotionSafe();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.18);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center gap-3 rounded-full px-6 py-3.5 font-mono text-[12px] tracking-[0.18em] uppercase transition-[background-color,box-shadow,border-color] duration-300 hover:-translate-y-[2px] will-change-transform";
  const styles =
    variant === "light"
      ? "text-night bg-white border border-white shadow-[0_12px_40px_-12px_rgba(13,18,48,0.6)] hover:bg-paper"
      : variant === "primary"
      ? "text-fg bg-ink-700 border border-white/10 shadow-[0_0_0_1px_rgba(108,99,255,0.25),0_8px_30px_-10px_rgba(108,99,255,0.55)] hover:bg-ink-600 hover:shadow-[0_0_0_1px_rgba(139,124,255,0.6),0_10px_40px_-8px_rgba(108,99,255,0.8)]"
      : "text-fg-2 border border-white/10 hover:text-fg hover:border-white/25";

  return (
    <motion.a
      ref={ref}
      href={href}
      data-cursor="button"
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`${base} ${styles} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{children}</span>
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </motion.a>
  );
}
