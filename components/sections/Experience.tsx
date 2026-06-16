"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { EXPERIENCE } from "@/lib/data";
import { ExperienceRole } from "@/components/ExperienceRole";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-reveal", {
        opacity: 0,
        y: 18,
        duration: 0.6,
        stagger: 0.1,
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

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[120px_1fr] sm:gap-16">
          <span className="exp-reveal label pt-1 font-bold">Experience</span>

          <div>
            {EXPERIENCE.map((job) => (
              <div
                key={`${job.company}-${job.period}`}
                className="exp-reveal mt-9 border-t border-line pt-9 first:mt-0 first:border-t-0 first:pt-0"
              >
                <ExperienceRole job={job} compact />
              </div>
            ))}

            <Link
              href="/experience"
              className="exp-reveal group mt-12 inline-flex items-center gap-1.5 text-[13px] text-fg-muted transition-colors hover:text-fg"
            >
              Recruiter? Way down we go
              <ArrowDownRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
