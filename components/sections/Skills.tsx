"use client";

import { useEffect, useRef } from "react";
import { SKILLS } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Layers,
  Cloud,
  Database,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  Layers,
  Cloud,
  Database,
  Wrench,
  Zap,
};

const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  Languages: { bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.3)", text: "#a78bfa" },
  Frameworks: { bg: "rgba(6,182,212,0.1)", border: "rgba(6,182,212,0.3)", text: "#22d3ee" },
  "Cloud & DevOps": { bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.3)", text: "#34d399" },
  "Data & Search": { bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.3)", text: "#fbbf24" },
  Tools: { bg: "rgba(244,114,182,0.1)", border: "rgba(244,114,182,0.3)", text: "#f472b6" },
  Specialties: { bg: "rgba(99,102,241,0.1)", border: "rgba(99,102,241,0.3)", text: "#818cf8" },
};

// All unique skills for the marquee strip
const ALL_TECH = [
  "TypeScript", "React.js", "Next.js", "Node.js", "Express.js",
  "PostgreSQL", "MongoDB", "OpenSearch", "AWS S3", "AWS EC2",
  "CI/CD", "Redis", "Tailwind CSS", "Shadcn UI", "Zustand",
  "Redux Toolkit", "Socket.io", "Docker", "Java", "Git",
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skills-label", {
        opacity: 0, y: 20, duration: 0.6,
        scrollTrigger: { trigger: ".skills-label", start: "top 85%", once: true },
      });
      gsap.from(".skills-heading", {
        opacity: 0, y: 40, duration: 0.8,
        scrollTrigger: { trigger: ".skills-heading", start: "top 85%", once: true },
      });

      document.querySelectorAll(".skill-cat-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          scale: 0.96,
          duration: 0.7,
          delay: (i % 3) * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 92%", once: true },
        });
      });

      // Skill pill pop-in
      gsap.from(".skill-pill", {
        opacity: 0,
        scale: 0.85,
        duration: 0.4,
        stagger: 0.03,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".skill-pill", start: "top 90%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-12 md:py-16 md:py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, var(--nebula-1) 0%, transparent 60%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" aria-hidden />

      <div className="section-wrapper">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="skills-label section-label justify-center">
            <span className="star-dot" />
            Tech Stack
          </p>
          <h2 className="skills-heading section-heading">
            My{" "}
            <span className="gradient-text">constellation</span>{" "}
            of tools.
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] max-w-xl mx-auto">
            A collection of technologies I use to build fast, reliable, and scalable systems.
          </p>
        </div>

        {/* Category cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {SKILLS.map((skill) => {
            const Icon = ICON_MAP[skill.icon] ?? Code2;
            const colors = CATEGORY_COLORS[skill.category] ?? CATEGORY_COLORS["Tools"];
            return (
              <div
                key={skill.category}
                className="skill-cat-card rounded-2xl p-6 card-cosmos relative overflow-hidden"
              >
                {/* Corner constellation dot */}
                <div
                  className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full"
                  style={{ background: colors.text, boxShadow: `0 0 6px ${colors.text}` }}
                  aria-hidden
                />

                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
                  >
                    <Icon size={16} style={{ color: colors.text }} />
                  </div>
                  <h3 className="font-display font-semibold text-sm text-[hsl(var(--foreground))]">
                    {skill.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="skill-pill inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono transition-all duration-200 cursor-default"
                      style={{
                        background: colors.bg,
                        border: `1px solid ${colors.border}`,
                        color: colors.text,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Marquee ticker */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[hsl(var(--background))] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[hsl(var(--background))] to-transparent pointer-events-none" />

          <div className="flex gap-4 animate-marquee whitespace-nowrap">
            {[...ALL_TECH, ...ALL_TECH].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--muted))] border border-[hsl(var(--border))] text-xs font-mono text-[hsl(var(--muted-foreground))] shrink-0"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: `hsl(${(i * 37) % 360}, 70%, 65%)` }}
                  aria-hidden
                />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
