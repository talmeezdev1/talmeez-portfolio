"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/content";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  // Highlight the section currently in view.
  const [current, setCurrent] = useState<string>("");
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => Boolean(e));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[90] flex justify-center px-3 pt-[calc(env(safe-area-inset-top,0px)+12px)]">
        <nav
          aria-label="Main"
          className={`flex w-full items-center justify-between rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled
              ? "max-w-[980px] border-white/10 bg-ink-950/85 px-4 py-2 shadow-[0_14px_40px_-14px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:px-5"
              : "max-w-[1440px] border-transparent bg-transparent px-[calc(var(--gutter)-12px)] py-4"
          }`}
        >
          <a href="#top" className="font-semibold tracking-[-0.02em]" aria-label={`${site.name}, back to top`}>
            {site.shortName}
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => {
              const on = current === l.href;
              return (
                <li key={l.href} className="relative">
                  {on ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <a
                    href={l.href}
                    aria-current={on ? "true" : undefined}
                    className={`relative block rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                      on ? "text-fg" : "text-fg-2 hover:text-fg"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href="#contact"
            data-cursor="button"
            className="group hidden items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:border-violet-2/60 hover:bg-white/[0.03] md:inline-flex"
          >
            Let&apos;s talk <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-[95] flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span className={`absolute h-px w-6 bg-fg transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
            <span className={`absolute h-px w-6 bg-fg transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[85] flex flex-col justify-between bg-ink-900 px-[var(--gutter)] pb-[calc(env(safe-area-inset-bottom,0px)+32px)] pt-28 md:hidden"
          >
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-violet/25 blur-[90px]" />
            <ul className="relative flex flex-col gap-2">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a href={l.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-1">
                    <span className="font-mono text-xs text-fg-3">0{i + 1}</span>
                    <span className="display text-[clamp(44px,13vw,72px)] uppercase">{l.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="relative flex items-end justify-between"
            >
              <span className="eyebrow">{site.location}</span>
              <a href="#contact" onClick={() => setOpen(false)} className="font-mono text-xs uppercase tracking-[0.18em] text-violet-2">
                Let&apos;s talk →
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
