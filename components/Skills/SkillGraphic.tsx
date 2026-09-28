"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * A small animated graphic for each skill, shown on hover (desktop) or when a skill is opened (mobile).
 * Shapes are illustrations of the kind of work, not data. The only numbers shown are real results
 * from lib/content.ts (LuckyBiz and Lynks campaigns).
 */

const W = 280;
const H = 140;
const ease = [0.16, 1, 0.3, 1] as const;

const C = {
  violet: "#8B7CFF",
  blue: "#4F8CFF",
  cyan: "#55D6FF",
  grid: "rgba(255,255,255,0.08)",
  text: "#B6BDD2",
  dim: "#8189A3",
};

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={label}>
      <defs>
        <linearGradient id="sg-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.violet} />
          <stop offset="1" stopColor={C.blue} stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="sg-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={C.violet} />
          <stop offset="1" stopColor={C.cyan} />
        </linearGradient>
        <linearGradient id="sg-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.blue} stopOpacity="0.35" />
          <stop offset="1" stopColor={C.blue} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[35, 70, 105].map((y) => (
        <line key={y} x1="0" x2={W} y1={y} y2={y} stroke={C.grid} strokeDasharray="3 5" />
      ))}
      {children}
    </svg>
  );
}

function Chip({ x, y, children, delay = 0.6 }: { x: number; y: number; children: string; delay?: number }) {
  const w = children.length * 6.4 + 18;
  return (
    <motion.g initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5, ease }}>
      <rect x={x} y={y} width={w} height={20} rx={10} fill="rgba(11,16,34,0.85)" stroke={C.violet} strokeOpacity={0.6} />
      <text x={x + w / 2} y={y + 13.5} textAnchor="middle" fontSize="10.5" fontFamily="var(--font-mono)" fill="#F7F8FF">
        {children}
      </text>
    </motion.g>
  );
}

/** Paid Ads: cost per lead coming down week by week, ending at the real LuckyBiz figure. */
function PaidAds() {
  const bars = [104, 88, 76, 60, 50, 40, 34];
  const bw = 26;
  const gap = 12;
  const x0 = 14;
  const pts = bars.map((h, i) => `${x0 + i * (bw + gap) + bw / 2},${H - 12 - h}`).join(" ");
  return (
    <Frame label="Bar chart: cost per lead falling over time, reaching under AED 9">
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={x0 + i * (bw + gap)}
          y={H - 12 - h}
          width={bw}
          height={h}
          rx={4}
          fill="url(#sg-bar)"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
          transition={{ delay: i * 0.06, duration: 0.6, ease }}
        />
      ))}
      <motion.polyline
        points={pts}
        fill="none"
        stroke={C.cyan}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.35, duration: 0.9, ease }}
      />
      <text x={14} y={16} fontSize="10" fontFamily="var(--font-mono)" fill={C.dim} letterSpacing="1.5">
        COST PER LEAD ↓
      </text>
      <Chip x={176} y={8}>{"< AED 9 CPL"}</Chip>
    </Frame>
  );
}

/** Lead generation: a funnel narrowing from reach to booked, with the real monthly lead count. */
function LeadGen() {
  const stages = [
    { w: 250, label: "Reach" },
    { w: 196, label: "Clicks" },
    { w: 142, label: "Leads" },
    { w: 90, label: "Booked" },
  ];
  return (
    <Frame label="Funnel from reach to clicks, leads and bookings; over 1,000 leads in a month">
      {stages.map((s, i) => (
        <motion.g key={s.label} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1, duration: 0.5, ease }}>
          <rect x={(W - s.w) / 2} y={12 + i * 30} width={s.w} height={24} rx={6} fill={i === 3 ? C.cyan : C.violet} fillOpacity={0.18 + i * 0.12} stroke={i === 3 ? C.cyan : C.violet} strokeOpacity={0.5} />
          <text x={W / 2} y={28 + i * 30} textAnchor="middle" fontSize="10.5" fontFamily="var(--font-mono)" fill="#F7F8FF" letterSpacing="1">
            {s.label.toUpperCase()}
          </text>
        </motion.g>
      ))}
      <Chip x={0} y={104} delay={0.55}>1,000+/mo</Chip>
    </Frame>
  );
}

/** SEO: a search bar and a rising visibility line. */
function SEO() {
  const path = "M10 118 C 50 112, 70 104, 100 96 S 150 78, 180 62 S 240 30, 270 22";
  return (
    <Frame label="Illustration: search visibility line rising over time">
      <motion.path d={`${path} L 270 132 L 10 132 Z`} fill="url(#sg-area)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} />
      <motion.path d={path} fill="none" stroke="url(#sg-line)" strokeWidth={2.5} strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease }} />
      {[
        [100, 96],
        [180, 62],
        [270, 22],
      ].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r={4} fill={C.cyan} initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ transformBox: "fill-box", transformOrigin: "center" }} transition={{ delay: 0.4 + i * 0.25, type: "spring", stiffness: 300, damping: 15 }} />
      ))}
      <motion.g initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
        <rect x={10} y={8} width={170} height={24} rx={12} fill="rgba(11,16,34,0.85)" stroke="rgba(255,255,255,0.18)" />
        <circle cx={25} cy={20} r={5} fill="none" stroke={C.text} strokeWidth={1.5} />
        <line x1={29} y1={24} x2={33} y2={28} stroke={C.text} strokeWidth={1.5} strokeLinecap="round" />
        <text x={40} y={24} fontSize="10.5" fontFamily="var(--font-mono)" fill={C.text}>
          business setup dubai
        </text>
      </motion.g>
    </Frame>
  );
}

/** Digital marketing: channels fitting together into one ring. */
function DigitalMarketing() {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const segs = [
    { part: 0.34, color: C.violet, label: "Paid social" },
    { part: 0.26, color: C.blue, label: "Search" },
    { part: 0.22, color: C.cyan, label: "Content" },
    { part: 0.18, color: "#B6BDD2", label: "Web" },
  ];
  let acc = 0;
  return (
    <Frame label="Illustration: marketing channels (paid social, search, content, web) working as one system">
      <g transform={`rotate(-90 70 72)`}>
        {segs.map((s, i) => {
          const off = acc;
          acc += s.part;
          return (
            <motion.circle
              key={s.label}
              cx={70}
              cy={72}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={16}
              strokeDasharray={`${s.part * circ - 3} ${circ}`}
              strokeDashoffset={-off * circ}
              initial={{ opacity: 0, strokeWidth: 4 }}
              animate={{ opacity: 1, strokeWidth: 16 }}
              transition={{ delay: i * 0.15, duration: 0.6, ease }}
            />
          );
        })}
      </g>
      {segs.map((s, i) => (
        <motion.g key={s.label} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.12, duration: 0.4 }}>
          <rect x={146} y={30 + i * 24} width={10} height={10} rx={3} fill={s.color} />
          <text x={164} y={39 + i * 24} fontSize="11" fill={C.text}>
            {s.label}
          </text>
        </motion.g>
      ))}
    </Frame>
  );
}

/** Content: a grid of posts popping in, with likes landing. */
function Content() {
  const cells = Array.from({ length: 8 }, (_, i) => i);
  return (
    <Frame label="Illustration: a grid of social posts appearing, with likes">
      {cells.map((i) => {
        const x = 12 + (i % 4) * 66;
        const y = 10 + Math.floor(i / 4) * 64;
        const fill = [C.violet, C.blue, C.cyan][i % 3];
        return (
          <motion.g key={i} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} style={{ transformBox: "fill-box", transformOrigin: "center" }} transition={{ delay: i * 0.06, duration: 0.45, ease }}>
            <rect x={x} y={y} width={58} height={56} rx={8} fill={fill} fillOpacity={0.16} stroke={fill} strokeOpacity={0.45} />
            {i % 3 === 0 ? <polygon points={`${x + 24},${y + 20} ${x + 24},${y + 36} ${x + 37},${y + 28}`} fill="#F7F8FF" fillOpacity={0.8} /> : <rect x={x + 10} y={y + 12} width={38} height={22} rx={4} fill="#F7F8FF" fillOpacity={0.12} />}
            <motion.path
              d={`M${x + 46} ${y + 50} l-4 -4 a2.6 2.6 0 0 1 4 -3.4 a2.6 2.6 0 0 1 4 3.4 z`}
              fill="#FF6B9A"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.4, 1] }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
            />
          </motion.g>
        );
      })}
    </Frame>
  );
}

/** Web development: a browser window loading in, with a speed ring filling up. */
function WebDev() {
  const r = 22;
  const circ = 2 * Math.PI * r;
  return (
    <Frame label="Illustration: a web page loading in a browser, with a speed gauge filling">
      <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
        <rect x={8} y={8} width={184} height={124} rx={10} fill="rgba(11,16,34,0.9)" stroke="rgba(255,255,255,0.18)" />
        <line x1={8} y1={28} x2={192} y2={28} stroke="rgba(255,255,255,0.12)" />
        {[20, 32, 44].map((x, i) => (
          <circle key={x} cx={x} cy={18} r={3.5} fill={[C.violet, C.blue, C.cyan][i]} />
        ))}
      </motion.g>
      {[
        { y: 40, w: 110, h: 12, c: "#F7F8FF", o: 0.8 },
        { y: 58, w: 150, h: 6, c: C.text, o: 0.4 },
        { y: 70, w: 130, h: 6, c: C.text, o: 0.4 },
        { y: 88, w: 64, h: 18, c: C.violet, o: 0.9 },
      ].map((b, i) => (
        <motion.rect
          key={i}
          x={22}
          y={b.y}
          height={b.h}
          rx={b.h / 2}
          fill={b.c}
          fillOpacity={b.o}
          initial={{ width: 0 }}
          animate={{ width: b.w }}
          transition={{ delay: 0.25 + i * 0.12, duration: 0.6, ease }}
        />
      ))}
      <circle cx={238} cy={62} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={6} />
      <motion.circle
        cx={238}
        cy={62}
        r={r}
        fill="none"
        stroke={C.cyan}
        strokeWidth={6}
        strokeLinecap="round"
        transform="rotate(-90 238 62)"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ * 0.06 }}
        transition={{ delay: 0.3, duration: 1.1, ease }}
      />
      <text x={238} y={66} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="#F7F8FF">
        FAST
      </text>
      <text x={238} y={106} textAnchor="middle" fontSize="9.5" fontFamily="var(--font-mono)" fill={C.dim} letterSpacing="1">
        RESPONSIVE
      </text>
    </Frame>
  );
}

/** Video: an edit timeline with clips sliding into place and a moving playhead. */
function Video() {
  const clips = [
    { t: 0, x: 12, w: 70, c: C.violet },
    { t: 0, x: 86, w: 96, c: C.blue },
    { t: 0, x: 186, w: 82, c: C.violet },
    { t: 1, x: 12, w: 120, c: C.cyan },
    { t: 1, x: 138, w: 60, c: C.cyan },
  ];
  const bars = Array.from({ length: 42 }, (_, i) => 4 + Math.abs(Math.sin(i * 1.7) * 14) + ((i * 7) % 5));
  return (
    <Frame label="Illustration: a video editing timeline with clips, audio waveform and a moving playhead">
      {clips.map((c, i) => (
        <motion.rect key={i} y={14 + c.t * 30} x={c.x} width={c.w} height={24} rx={5} fill={c.c} fillOpacity={0.3} stroke={c.c} strokeOpacity={0.7} initial={{ x: c.x + 40, opacity: 0 }} animate={{ x: c.x, opacity: 1 }} transition={{ delay: i * 0.08, duration: 0.5, ease }} />
      ))}
      {bars.map((h, i) => (
        <motion.rect key={i} x={12 + i * 6.2} width={3.4} rx={1.7} fill={C.text} fillOpacity={0.55} initial={{ y: 104, height: 0 }} animate={{ y: 104 - h / 2, height: h }} transition={{ delay: 0.3 + i * 0.012, duration: 0.4 }} />
      ))}
      <motion.g initial={{ x: 0 }} animate={{ x: [0, 250] }} transition={{ delay: 0.5, duration: 3.2, ease: "linear", repeat: Infinity }}>
        <line x1={14} y1={6} x2={14} y2={132} stroke="#FF6B9A" strokeWidth={1.5} />
        <polygon points="9,4 19,4 14,11" fill="#FF6B9A" />
      </motion.g>
    </Frame>
  );
}

/** Creative strategy: goal → audience → message → creative, connected. */
function CreativeStrategy() {
  const nodes = [
    { x: 40, y: 40, label: "Goal" },
    { x: 140, y: 26, label: "Audience" },
    { x: 118, y: 104, label: "Message" },
    { x: 236, y: 76, label: "Creative" },
  ];
  const links = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
  ];
  return (
    <Frame label="Illustration: goal, audience and message connecting into the creative">
      {links.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="url(#sg-line)"
          strokeWidth={1.8}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.2 + i * 0.15, duration: 0.6, ease }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.g key={n.label} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ transformBox: "fill-box", transformOrigin: "center" }} transition={{ delay: i * 0.15, type: "spring", stiffness: 260, damping: 18 }}>
          <circle cx={n.x} cy={n.y} r={i === 3 ? 13 : 9} fill={i === 3 ? C.cyan : C.violet} fillOpacity={i === 3 ? 0.9 : 0.75} />
          <text x={n.x} y={n.y + (i === 3 ? 30 : 24)} textAnchor="middle" fontSize="10.5" fontFamily="var(--font-mono)" fill={C.text} letterSpacing="1">
            {n.label.toUpperCase()}
          </text>
        </motion.g>
      ))}
    </Frame>
  );
}

const map: Record<string, () => ReactNode> = {
  "Digital Marketing": DigitalMarketing,
  "Paid Ads": PaidAds,
  SEO: SEO,
  "Lead Generation": LeadGen,
  Content: Content,
  "Web Development": WebDev,
  Video: Video,
  "Creative Strategy": CreativeStrategy,
};

export default function SkillGraphic({ skill }: { skill: string }) {
  const G = map[skill];
  return G ? <G /> : null;
}
