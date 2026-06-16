import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import StarField from "@/components/StarField";

export const metadata: Metadata = {
  title: "404 · Lost in space",
  description: "This page drifted off the map.",
  robots: { index: false, follow: false },
};

/**
 * "Lost in space" 404. Theme-aware: colours come from the CSS theme variables
 * (which switch with light/dark), the StarField dims itself in light mode, and
 * astro2.png is a clean cutout with no baked-in glow, so it sits well on either
 * background.
 */
export default function NotFound() {
  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ backgroundColor: "var(--bg)", color: "var(--fg)" }}
    >
      {/* Starfield backdrop */}
      <StarField
        count={3500}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      {/* Vignette to focus the centre — fades edges into the page background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, var(--bg) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Astronaut with the giant faded 404 sitting behind it */}
        <div className="relative flex items-center justify-center">
          <span
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-bold"
            style={{
              fontSize: "clamp(220px, 46vw, 560px)",
              lineHeight: 1,
              letterSpacing: "-0.05em",
              color: "transparent",
              backgroundImage:
                "linear-gradient(180deg, color-mix(in srgb, var(--fg) 16%, transparent) 0%, color-mix(in srgb, var(--fg) 6%, transparent) 65%, transparent 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            aria-hidden
          >
            404
          </span>
          <Image
            src="/astro2.png"
            alt="A lost astronaut drifting through space"
            width={312}
            height={442}
            priority
            className="astro-float relative z-10 h-auto w-[clamp(150px,26vw,230px)] select-none"
            style={{ filter: "drop-shadow(0 24px 50px rgba(0,0,0,0.35))" }}
          />
        </div>

        <h1 className="mt-8 text-[clamp(30px,6vw,60px)] font-bold leading-[1] tracking-[-0.03em]">
          Houston, we have a problem.
        </h1>
        <p
          className="mt-4 text-[15px] font-light"
          style={{ color: "var(--fg-muted)" }}
        >
          The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full px-[22px] py-2.5 text-[13px] font-medium no-underline transition-opacity hover:opacity-75"
          style={{ backgroundColor: "var(--fg)", color: "var(--bg)" }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
            <path
              d="M11 6.5H2M6 2.5l-4 4 4 4"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back home
        </Link>
      </div>
    </main>
  );
}
