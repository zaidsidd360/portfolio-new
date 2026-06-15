import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Md Zaid Siddiqui · Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FG = "#f0f0ed";
const MUTED = "#8a8a8a";
const BG = "#0a0a0a";
const BORDER = "#222222";
const GREEN = "#22c55e";

async function loadFont(url: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image() {
  const [regular, bold] = await Promise.all([
    loadFont(
      "https://raw.githubusercontent.com/google/fonts/main/ufl/ubuntumono/UbuntuMono-Regular.ttf",
    ),
    loadFont(
      "https://raw.githubusercontent.com/google/fonts/main/ufl/ubuntumono/UbuntuMono-Bold.ttf",
    ),
  ]);

  const fonts = [
    regular && { name: "Ubuntu Mono", data: regular, weight: 400 as const, style: "normal" as const },
    bold && { name: "Ubuntu Mono", data: bold, weight: 700 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 700; style: "normal" }[];

  const chips = ["TypeScript", "Node.js", "OpenSearch", "Next.js"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 40,
          backgroundColor: BG,
          fontFamily: "Ubuntu Mono",
          color: FG,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: `1px solid ${BORDER}`,
            borderRadius: 18,
            padding: 52,
          }}
        >
          {/* Window top bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", gap: 9 }}>
              <div style={{ width: 14, height: 14, borderRadius: 14, backgroundColor: "#3a3a3a" }} />
              <div style={{ width: 14, height: 14, borderRadius: 14, backgroundColor: "#3a3a3a" }} />
              <div style={{ width: 14, height: 14, borderRadius: 14, backgroundColor: "#3a3a3a" }} />
            </div>
            <div style={{ fontSize: 20, color: MUTED }}>zaid@portfolio: ~</div>
          </div>

          {/* whoami */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 24, color: MUTED }}>$ whoami</div>
            <div style={{ display: "flex", fontSize: 76, fontWeight: 700, letterSpacing: "-0.02em", color: FG }}>
              Md Zaid Siddiqui
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 14, height: 14, borderRadius: 14, backgroundColor: GREEN }} />
              <div style={{ fontSize: 30, color: FG }}>Software Engineer</div>
            </div>
            <div style={{ display: "flex", fontSize: 24, color: MUTED }}>
              APIs · search infrastructure · AI pipelines, at scale.
            </div>
          </div>

          {/* Footer: chips + domain */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 10 }}>
              {chips.map((chip) => (
                <div
                  key={chip}
                  style={{
                    display: "flex",
                    fontSize: 18,
                    color: MUTED,
                    border: `1px solid ${BORDER}`,
                    borderRadius: 100,
                    padding: "6px 16px",
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ fontSize: 26, fontWeight: 700, color: FG }}>zaidsiddiqui.dev</div>
              <div style={{ fontSize: 30, fontWeight: 700, color: GREEN }}>_</div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, ...(fonts.length ? { fonts } : {}) },
  );
}
