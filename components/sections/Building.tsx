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

        <div className="flex flex-col gap-10">
          <h2 className="section-title">What I&apos;m building.</h2>

          <div ref={contentRef} style={{ opacity: 1 }}>
            {/* Title row */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3
                  style={{
                    fontSize: "clamp(24px,4vw,36px)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "var(--fg)",
                    lineHeight: 1.1,
                    marginBottom: "4px",
                  }}
                >
                  Antymo
                </h3>
                <a
                  href="https://antymo.com"
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
                  antymo.com
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
              <span className="label" style={{ color: "var(--fg-muted)", paddingTop: "4px", flexShrink: 0 }}>
                Since 2026
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
              Deal tracking built for independent creator managers. Every brand deal, payment, deadline,
              and commission in one pipeline, so nothing slips through the cracks and no invoice goes unchased.
              Built solo, live now.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {["Deal pipeline", "Payment tracking", "Commission calc", "Creator CRM", "AI follow-ups"].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
