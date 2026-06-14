"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Building() {
  const ref = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-12 md:py-16">
      <div className="container">
        <div className="divider mb-16" />

        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-8 sm:gap-16">
          <span className="label pt-1 font-bold" style={{ color: "var(--fg-muted)" }}>Building</span>

          <div ref={contentRef} style={{ opacity: 1 }}>
            {/* Title row */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2
                  style={{
                    fontSize: "clamp(24px,4vw,36px)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "var(--fg)",
                    lineHeight: 1.1,
                    marginBottom: "4px",
                  }}
                >
                  Discovry
                </h2>
                <a
                  href="https://discovry.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "12px",
                    fontFamily: "Ubuntu Mono, monospace",
                    color: "var(--fg-muted)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--border)",
                    paddingBottom: "1px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--fg)";
                    e.currentTarget.style.borderBottomColor = "var(--fg)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--fg-muted)";
                    e.currentTarget.style.borderBottomColor = "var(--border)";
                  }}
                >
                  discovry.app
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
              <span className="label" style={{ color: "var(--fg-muted)", paddingTop: "4px", flexShrink: 0 }}>
                Since 2025
              </span>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: "15px",
                fontWeight: 300,
                lineHeight: "1.7",
                color: "var(--fg-muted)",
                maxWidth: "520px",
                marginBottom: "16px",
              }}
            >
              AI-first Google Business Profile management for agencies. Automates posts, review replies,
              geo-grid rank tracking, and profile health across all client locations, so agencies stop doing it by hand.
              Built solo, currently in private beta.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {["GBP API", "AI review replies", "Rank tracking", "Multi-location", "White-label"].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
