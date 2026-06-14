"use client";

import { useEffect, useRef } from "react";
import { EXPERIENCE } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, MapPin, CalendarDays, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-label", {
        opacity: 0, y: 20, duration: 0.6,
        scrollTrigger: { trigger: ".exp-label", start: "top 85%", once: true },
      });
      gsap.from(".exp-heading", {
        opacity: 0, y: 40, duration: 0.8,
        scrollTrigger: { trigger: ".exp-heading", start: "top 85%", once: true },
      });

      // Timeline line draw
      gsap.from(".timeline-line", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".timeline-line", start: "top 80%", once: true },
      });

      // Each job card
      document.querySelectorAll(".exp-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          x: i % 2 === 0 ? -40 : 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });
      });

      // Bullet items
      gsap.from(".exp-bullet", {
        opacity: 0, x: -10, duration: 0.5, stagger: 0.05,
        scrollTrigger: { trigger: ".exp-bullet", start: "top 90%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative py-12 md:py-16 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" aria-hidden />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 opacity-10 dark:opacity-5 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(6,182,212,0.6) 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
        }}
        aria-hidden
      />

      <div className="section-wrapper">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="exp-label section-label justify-center">
            <span className="star-dot" />
            Work History
          </p>
          <h2 className="exp-heading section-heading">
            Where I&apos;ve{" "}
            <span className="gradient-text">shipped</span>.
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] max-w-xl mx-auto">
            Three companies, each one pushing me further into high-performance systems and real-scale engineering.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            aria-hidden
          />

          <div className="space-y-12 md:space-y-16">
            {EXPERIENCE.map((job, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={`${job.company}-${index}`}
                  className={cn(
                    "exp-card relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start",
                  )}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-4 md:left-1/2 top-6 w-3 h-3 rounded-full -translate-x-1/2 hidden md:flex items-center justify-center z-10"
                    aria-hidden
                  >
                    <div
                      className={cn(
                        "w-3 h-3 rounded-full border-2",
                        job.current
                          ? "bg-aurora-400 border-aurora-400"
                          : "bg-[hsl(var(--primary))] border-[hsl(var(--primary))]"
                      )}
                    />
                    {job.current && (
                      <div className="absolute w-6 h-6 rounded-full bg-aurora-400 opacity-30 animate-ping" />
                    )}
                  </div>

                  {/* Left side content (alternating) */}
                  {isLeft ? (
                    <>
                      {/* Card on left */}
                      <div className="md:pr-8">
                        <JobCard job={job} />
                      </div>
                      {/* Meta on right */}
                      <div className="md:pl-8 hidden md:flex flex-col justify-start pt-2">
                        <JobMeta job={job} />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Meta on left */}
                      <div className="md:pr-8 hidden md:flex flex-col justify-start items-end pt-2">
                        <JobMeta job={job} align="right" />
                      </div>
                      {/* Card on right */}
                      <div className="md:pl-8">
                        <JobCard job={job} />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function JobCard({ job }: { job: typeof EXPERIENCE[number] }) {
  return (
    <div className="card-cosmos rounded-2xl p-6 md:p-7 relative overflow-hidden">
      {/* Glow accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: job.current
            ? "linear-gradient(90deg, transparent, rgba(52,211,153,0.6), transparent)"
            : "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)",
        }}
        aria-hidden
      />

      {/* Header */}
      <div className="mb-1">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h3 className="font-display font-bold text-lg text-[hsl(var(--foreground))]">
              {job.role}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Briefcase size={12} className="text-[hsl(var(--primary))]" />
              <span className="text-sm font-medium text-[hsl(var(--primary))]">{job.company}</span>
            </div>
          </div>
          {job.current && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(52,211,153,0.1)] border border-[rgba(52,211,153,0.3)] text-aurora-400 text-xs font-mono shrink-0">
              <Circle size={6} className="fill-aurora-400 text-aurora-400" />
              Current
            </span>
          )}
        </div>

        {/* Mobile meta */}
        <div className="flex md:hidden items-center gap-4 mt-2 flex-wrap">
          <span className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))] font-mono">
            <CalendarDays size={11} />
            {job.period}
          </span>
          <span className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))] font-mono">
            <MapPin size={11} />
            {job.location}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[hsl(var(--border))] my-4" />

      {/* Bullets */}
      <ul className="space-y-3">
        {job.bullets.map((bullet, i) => (
          <li key={i} className="exp-bullet flex items-start gap-3 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
            <ChevronRight
              size={14}
              className="shrink-0 mt-0.5 text-[hsl(var(--accent))]"
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-5">
        {job.tags.map((tag) => (
          <span key={tag} className="badge-tech">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function JobMeta({ job, align = "left" }: { job: typeof EXPERIENCE[number]; align?: "left" | "right" }) {
  return (
    <div className={cn("flex flex-col gap-2", align === "right" && "items-end text-right")}>
      <div className="flex items-center gap-2 text-sm font-mono text-[hsl(var(--muted-foreground))]">
        <CalendarDays size={13} className="text-[hsl(var(--primary))]" />
        {job.period}
      </div>
      <div className="flex items-center gap-2 text-sm font-mono text-[hsl(var(--muted-foreground))]">
        <MapPin size={13} className="text-[hsl(var(--accent))]" />
        {job.location}
      </div>
    </div>
  );
}
