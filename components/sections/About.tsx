"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-12 md:py-16">
      <div className="container">
        <div className="divider mb-16" />

        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-8 sm:gap-16">
          <span className="about-reveal label pt-1 font-bold">About</span>
          <div className="space-y-4">
            <p
              className="about-reveal"
              style={{ fontSize: "clamp(17px,2.2vw,20px)", fontWeight: 300, lineHeight: "1.65", color: "var(--fg)" }}
            >
              Software engineer with 2+ years building production systems: AI pipelines, search infrastructure,
              high-throughput APIs. I obsess over the numbers: latency, throughput, storage. If it can be faster, I want to know why it isn&apos;t.
            </p>
            <p
              className="about-reveal"
              style={{ fontSize: "15px", fontWeight: 300, lineHeight: "1.7", color: "var(--fg-muted)" }}
            >
              Currently a software engineer at <a
              href="https://vujis.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--fg)", textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              Vujis
            </a>, and shipping{" "}
              <a
                href="https://discovry.app"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--fg)", textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                Discovry
              </a>{" "}
              on the side. B.Tech in Computer Science and Engineering.
            </p>
            <Link
              href="/about"
              className="about-reveal group inline-flex items-center gap-1.5 pt-1 text-[13px] text-fg-muted transition-colors hover:text-fg"
            >
              More about me
              <ArrowRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
