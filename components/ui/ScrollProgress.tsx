"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <div aria-hidden="true" className="pointer-events-none fixed right-3 top-1/2 z-50 hidden h-40 w-px -translate-y-1/2 bg-white/10 md:block">
      <motion.div
        style={{ scaleY }}
        className="h-full w-full origin-top bg-gradient-to-b from-violet-2 to-electric"
      />
    </div>
  );
}
