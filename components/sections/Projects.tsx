"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    name: "react-terminal",
    year: "2024",
    desc: "Open-source interactive Bash-like terminal component for React. TypeScript, pseudo file system, 8+ built-in commands, 10+ configurable props. 620+ npm downloads.",
    tags: ["React", "TypeScript", "Open Source"],
    npm: "https://www.npmjs.com/package/@zqui/react-terminal",
    github: "https://github.com/zaidsidd360/react-terminal",
  },
  {
    name: "Live Polling System",
    year: "2024",
    desc: "Real-time classroom polling for 100+ concurrent users. Sub-200ms latency via Socket.io, teacher dashboard with analytics, MongoDB indexed for 10k+ responses.",
    tags: ["React", "Socket.io", "Node.js", "MongoDB"],
    live: "#",
  },
];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".proj-reveal", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.09,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={ref} className="py-12 md:py-16">
      <div className="container">
        <div className="divider mb-16" />

        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-8 sm:gap-16">
          <span className="proj-reveal label pt-1 font-bold">Projects</span>

          <div className="space-y-12">
            {PROJECTS.map((p) => (
              <div key={p.name} className="proj-reveal">
                <div className="flex items-baseline justify-between mb-2">
                  <h3
                    style={{
                      fontSize: "clamp(18px,2.5vw,22px)",
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      color: "var(--fg)",
                    }}
                  >
                    {p.name}
                  </h3>
                  <span className="label" style={{ color: "var(--fg-muted)" }}>{p.year}</span>
                </div>
                <p
                  style={{ fontSize: "14px", fontWeight: 300, lineHeight: "1.7", color: "var(--fg-muted)", marginBottom: "12px" }}
                >
                  {p.desc}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                  <span style={{ flex: 1 }} />
                  {p.npm && (
                    <a href={p.npm} target="_blank" rel="noopener noreferrer" className="link" style={{ fontSize: "12px" }}>
                      npm ↗
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="link" style={{ fontSize: "12px" }}>
                      github ↗
                    </a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="link" style={{ fontSize: "12px" }}>
                      live ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
