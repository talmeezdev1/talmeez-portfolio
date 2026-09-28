import Image from "next/image";
import { showPlaceholders } from "@/lib/placeholders";

type Props = {
  src?: string;
  video?: string;
  poster?: string;
  alt: string;
  label?: string;
  /** Large faint text shown on the empty design (e.g. the project name). */
  watermark?: string;
  tone?: "violet" | "blue" | "cyan" | "mixed";
  priority?: boolean;
  className?: string;
  sizes?: string;
  /**
   * "cover" fills the frame (crops). "contain" shows the whole image or video centred,
   * over a soft blurred copy of itself. Use "contain" for vertical designs and Reels in a wide frame.
   */
  fit?: "cover" | "contain";
};

const tones = {
  violet: "radial-gradient(60% 70% at 30% 30%, rgba(108,99,255,0.35), transparent 70%), radial-gradient(50% 60% at 80% 80%, rgba(79,140,255,0.18), transparent 70%)",
  blue: "radial-gradient(60% 70% at 70% 30%, rgba(79,140,255,0.32), transparent 70%), radial-gradient(50% 60% at 20% 90%, rgba(85,214,255,0.12), transparent 70%)",
  cyan: "radial-gradient(60% 70% at 40% 70%, rgba(85,214,255,0.22), transparent 70%), radial-gradient(50% 60% at 85% 20%, rgba(108,99,255,0.18), transparent 70%)",
  mixed: "conic-gradient(from 200deg at 60% 50%, rgba(108,99,255,0.25), rgba(85,214,255,0.12), rgba(79,140,255,0.22), rgba(108,99,255,0.25))",
};

/**
 * One component for all media. Supports JPG / PNG / WebP (via next/image) and MP4 with a poster.
 * With no src, it renders a styled placeholder that says what belongs there.
 * The parent must be positioned and sized (e.g. relative + aspect ratio).
 */
export default function Media({ src, video, poster, alt, label, watermark, tone = "violet", priority, className = "", sizes = "100vw", fit = "cover" }: Props) {
  if (fit === "contain" && (video || src)) {
    const backdrop = video ? poster : src;
    return (
      <div className={`absolute inset-0 overflow-hidden bg-ink-900 ${className}`}>
        {backdrop ? (
          <Image src={backdrop} alt="" aria-hidden="true" fill sizes="40vw" className="scale-125 object-cover opacity-45 blur-2xl" />
        ) : null}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink-950/60 via-transparent to-ink-950/60" />
        {video ? (
          <video
            className="absolute inset-0 h-full w-full object-contain"
            src={video}
            poster={poster}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            aria-label={alt}
          />
        ) : src ? (
          <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-contain p-[4%] drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]" />
        ) : null}
      </div>
    );
  }
  if (video) {
    return (
      <video
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
        src={video}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-label={alt}
      />
    );
  }
  if (src) {
    return <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={`object-cover ${className}`} />;
  }
  return (
    <div
      role="img"
      aria-label={showPlaceholders ? `${alt} (placeholder)` : alt}
      className={`absolute inset-0 flex items-start bg-ink-800 p-5 ${className}`}
      style={{ backgroundImage: tones[tone] }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      {watermark ? (
        <span
          aria-hidden="true"
          className="display pointer-events-none absolute inset-x-5 bottom-4 select-none text-[clamp(40px,9vw,140px)] uppercase leading-[0.85] text-white/[0.06]"
        >
          {watermark}
        </span>
      ) : null}
      {label && showPlaceholders ? <span className="placeholder-tag relative">{label}</span> : null}
    </div>
  );
}
