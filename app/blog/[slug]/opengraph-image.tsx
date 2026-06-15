import { ImageResponse } from "next/og";
import { getPostMeta, getPostSlugs, postExists } from "@/lib/blog";

// Reads posts from the filesystem, so it must run on Node, not edge.
export const runtime = "nodejs";
export const alt = "Md Zaid Siddiqui";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Pre-render one image per post at build time.
export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

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

function titleSize(len: number): number {
  if (len <= 36) return 62;
  if (len <= 60) return 52;
  if (len <= 90) return 44;
  return 38;
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = postExists(slug) ? getPostMeta(slug) : null;
  const title = meta?.title ?? "Md Zaid Siddiqui";
  const tags = (meta?.tags ?? []).slice(0, 4);

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

          {/* Prompt + title */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ fontSize: 24, color: MUTED }}>{`$ cat ${slug}.mdx`}</div>
            <div
              style={{
                display: "flex",
                fontSize: titleSize(title.length),
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: FG,
                maxWidth: 1000,
              }}
            >
              {title}
            </div>
          </div>

          {/* Footer: tags + domain */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 10 }}>
              {tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    display: "flex",
                    fontSize: 18,
                    color: MUTED,
                    border: `1px solid ${BORDER}`,
                    borderRadius: 100,
                    padding: "6px 16px",
                  }}
                >
                  {tag}
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
