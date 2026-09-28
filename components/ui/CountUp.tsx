"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "@/lib/hooks";

/**
 * Counts the number inside a string up from zero when it scrolls into view.
 * "< AED 9" → "< AED 0" … "< AED 9". "1,000+" → "0+" … "1,000+". The final text is always the real value.
 */
export default function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotionSafe();
  const match = value.match(/^(\D*?)([\d,]+)(.*)$/);
  const target = match ? Number(match[2].replace(/,/g, "")) : 0;
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    if (!inView || !match || reduce) return;
    const c = animate(0, target, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target, reduce]);

  const shown = !match || n === null ? value : `${match[1]}${n.toLocaleString("en-US")}${match[3]}`;
  return (
    <span ref={ref} className={`tabular-nums ${className}`} aria-label={value}>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}
