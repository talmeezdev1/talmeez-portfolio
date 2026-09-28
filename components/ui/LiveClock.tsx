"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Dubai",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

/** Current time in Dubai, ticking every second. Renders a steady placeholder until mounted (no hydration mismatch). */
export default function LiveClock({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={`tabular-nums ${className}`} aria-label={now ? `Local time in Dubai ${now}` : "Local time in Dubai"}>
      {now ?? "--:--:--"} GST
    </span>
  );
}
