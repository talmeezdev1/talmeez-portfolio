import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The preview card shown when the portfolio link is shared on LinkedIn, WhatsApp, etc. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "radial-gradient(60% 80% at 70% 30%, rgba(108,99,255,0.45), transparent 70%), radial-gradient(50% 60% at 90% 90%, rgba(79,140,255,0.3), transparent 70%), #05060B",
          color: "#F7F8FF",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 6, color: "#9DA4B8" }}>
          <span>DIGITAL GROWTH / CREATIVE / WEB</span>
          <span>DUBAI, UAE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 200, fontWeight: 700, letterSpacing: -10, lineHeight: 0.9 }}>TALMEEZ</div>
          <div style={{ fontSize: 44, marginTop: 28, color: "#9DA4B8" }}>{site.role}</div>
        </div>
      </div>
    ),
    size
  );
}
