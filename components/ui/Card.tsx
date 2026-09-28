"use client";

import type { HTMLAttributes, MouseEvent } from "react";

/**
 * Dashboard card: glassy navy panel with a light that follows the pointer.
 * The pointer position is written to CSS variables, so there is no React re-render on move.
 */
export default function Card({ className = "", children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div
      onMouseMove={onMove}
      className={`spot relative overflow-hidden rounded-[28px] border border-white/10 bg-ink-800/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
