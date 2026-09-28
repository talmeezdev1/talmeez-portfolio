import { navLinks, site } from "@/lib/content";
import SocialIcon, { type IconName } from "@/components/ui/SocialIcon";

export default function Footer() {
  const social: { label: string; icon: IconName; href: string }[] = [
    { label: "LinkedIn", icon: "linkedin", href: site.contact.linkedin.href },
    { label: "GitHub", icon: "github", href: site.contact.github.href },
    { label: "Email", icon: "email", href: site.contact.email.href },
  ];
  return (
    <footer className="relative overflow-hidden bg-ink-950">
      <div className="container-x pb-[calc(env(safe-area-inset-bottom,0px)+28px)] pt-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_auto]">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-semibold tracking-[-0.02em]">{site.name}</span>
            <span className="text-sm text-fg-2">{site.role}</span>
            <span className="text-sm text-fg-3">{site.location}</span>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {navLinks.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-sm text-fg-2 transition-colors hover:text-fg">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="flex flex-col gap-3" aria-label="Social links">
            {social
              .filter((s) => s.href)
              .map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="group inline-flex items-center gap-3 text-sm text-fg-2 transition-colors hover:text-fg"
                    {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:border-violet-2/60">
                      <SocialIcon name={s.icon} size={15} />
                    </span>
                    {s.label}
                  </a>
                </li>
              ))}
          </ul>
          <a
            href="#top"
            data-cursor="button"
            className="group flex h-14 w-14 items-center justify-center self-start rounded-full border border-white/15 transition-all hover:-translate-y-1 hover:border-violet-2/60 hover:bg-white/[0.04]"
            aria-label="Back to top"
          >
            <span aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5">
              ↑
            </span>
          </a>
        </div>

        {/* Wordmark */}
        <p
          aria-hidden="true"
          className="display mt-16 select-none bg-gradient-to-b from-white/[0.14] to-white/[0.02] bg-clip-text text-center text-[clamp(80px,22vw,340px)] leading-[0.8] text-transparent"
        >
          TALMEEZ
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">© 2026 {site.name}</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">Designed & built in Dubai</p>
        </div>
      </div>
    </footer>
  );
}
