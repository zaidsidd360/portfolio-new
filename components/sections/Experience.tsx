"use client";

import { useEffect, useRef } from "react";
import { EXPERIENCE } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-reveal", {
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
    <section id="experience" ref={ref} className="py-12 md:py-16">
      <div className="container">
        <div className="divider mb-16" />

        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-8 sm:gap-16">
          <span className="exp-reveal label pt-1 font-bold">Experience</span>

          <div className="space-y-12">
            {EXPERIENCE.map((job) => (
              <div key={`${job.company}-${job.period}`} className="exp-reveal">
                {/* Role + period */}
                <div className="mb-1 flex items-baseline justify-between gap-4">
                  <h3 className="text-[clamp(18px,2.5vw,22px)] font-bold tracking-[-0.01em] text-fg">
                    {job.role}
                  </h3>
                  <span className="label shrink-0">{job.period}</span>
                </div>

                {/* Company + location */}
                <div className="mb-4 flex items-center gap-2">
                  {job.current && (
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
                  )}
                  <span className="text-[14px] font-medium text-fg">{job.company}</span>
                  <span className="text-fg-muted">·</span>
                  <span className="label">{job.location}</span>
                </div>

                {/* Bullets */}
                <ul className="mb-4 space-y-2">
                  {job.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex gap-2.5 text-[14px] font-light leading-[1.7] text-fg-muted"
                    >
                      <span className="select-none text-fg">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
