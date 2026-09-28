/**
 * Slow-moving coloured light behind the whole page. Pure CSS gradients and transforms,
 * no blur filters, so it stays cheap. Stops moving with reduced motion.
 */
export default function Ambient() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -left-[20%] -top-[20%] h-[80vmax] w-[80vmax] rounded-full motion-safe:animate-[aurora-a_26s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(closest-side, rgba(108,99,255,0.22), rgba(108,99,255,0.08) 45%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-[25%] -right-[20%] h-[75vmax] w-[75vmax] rounded-full motion-safe:animate-[aurora-b_32s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(closest-side, rgba(79,140,255,0.2), rgba(85,214,255,0.06) 50%, transparent 72%)" }}
      />
      <div
        className="absolute left-[35%] top-[40%] h-[45vmax] w-[45vmax] rounded-full motion-safe:animate-[aurora-a_40s_ease-in-out_infinite_reverse]"
        style={{ background: "radial-gradient(closest-side, rgba(85,214,255,0.1), transparent 70%)" }}
      />
    </div>
  );
}
