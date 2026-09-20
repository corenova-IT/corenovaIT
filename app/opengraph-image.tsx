import { ImageResponse } from "next/og";

// Node runtime (not edge) since this is self-hosted on Hostinger, not Vercel.
export const alt = "CoreNovaIT — Build. Design. Grow. Automate.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(120% 120% at 15% 0%, rgba(214,56,56,0.35), transparent 55%), linear-gradient(150deg, #181b24, #0b0d12)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 999,
              background: "#d63838",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            N
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600, color: "#f2efe8", letterSpacing: -0.5 }}>
            CoreNova<span style={{ color: "#db4d4d" }}>IT</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              color: "#f2efe8",
              lineHeight: 1.08,
              letterSpacing: -1.5,
              maxWidth: 920,
            }}
          >
            We Build Digital Experiences
          </div>
          <div style={{ fontSize: 26, color: "#b9bdc9", maxWidth: 780, lineHeight: 1.5 }}>
            White-label web, app, design &amp; AI-integration partner for agencies that don&apos;t build in-house.
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {["Web", "App", "Design", "Marketing", "AI"].map((tag) => (
            <div
              key={tag}
              style={{
                fontSize: 20,
                color: "#db4d4d",
                border: "1px solid rgba(219,77,77,0.4)",
                borderRadius: 999,
                padding: "8px 20px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
