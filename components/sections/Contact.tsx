"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={ref} className="py-12 md:py-16 pb-32">
      <div className="container">
        <div className="divider mb-16" />

        <h2
          className="contact-reveal section-title"
        >
          Open to full-time roles.
        </h2>

        <a
          href="mailto:hi@zaidsiddiqui.dev"
          className="contact-reveal contact-email mt-3 mb-10 inline-block text-fg no-underline"
          style={{ fontSize: "clamp(32px,10vw,76px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.04em" }}
        >
          hi@zaidsiddiqui.dev
        </a>

        <div className="contact-reveal flex flex-wrap gap-x-7 gap-y-3 text-[15px] text-fg-muted">
          {[
            { label: "GitHub", href: "https://github.com/zaidsidd360" },
            { label: "LinkedIn", href: "https://linkedin.com/in/zaidsidd360" },
            { label: "X", href: "https://x.com/zaidsidd360" },
            { label: "Resume (PDF)", href: "/MdZaidSiddiquiResume.pdf" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link py-2 text-fg-muted no-underline transition-colors hover:text-fg"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="divider mt-24 mb-8" />
        <div
          className="flex items-center justify-between"
          style={{ fontSize: "12px", color: "var(--fg-muted)", fontFamily: "Ubuntu Mono, monospace" }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            Md Zaid Siddiqui
            <span
              title="In solidarity with persecuted people everywhere"
              aria-label="In solidarity with persecuted people everywhere"
              role="img"
              style={{ display: "inline-flex", alignItems: "center", gap: "5px", opacity: 0.85 }}
            >
              {/* Palestine */}
              <svg
                width="16"
                height="11"
                viewBox="0 0 30 20"
                aria-hidden="true"
                style={{ borderRadius: "2px", overflow: "hidden", display: "block" }}
              >
                <rect width="30" height="20" fill="#fff" />
                <rect width="30" height="6.667" y="0" fill="#000" />
                <rect width="30" height="6.667" y="13.333" fill="#007A3D" />
                <path d="M0 0 L13 10 L0 20 Z" fill="#CE1126" />
              </svg>
              {/* Sudan */}
              <svg
                width="16"
                height="11"
                viewBox="0 0 30 20"
                aria-hidden="true"
                style={{ borderRadius: "2px", overflow: "hidden", display: "block" }}
              >
                <rect width="30" height="20" fill="#fff" />
                <rect width="30" height="6.667" y="0" fill="#D21034" />
                <rect width="30" height="6.667" y="13.333" fill="#000" />
                <path d="M0 0 L13 10 L0 20 Z" fill="#007229" />
              </svg>
              {/* DR Congo */}
              <svg
                width="16"
                height="11"
                viewBox="0 0 30 20"
                aria-hidden="true"
                style={{ borderRadius: "2px", overflow: "hidden", display: "block" }}
              >
                <rect width="30" height="20" fill="#0095DA" />
                <line x1="0" y1="20" x2="30" y2="0" stroke="#F7D618" strokeWidth="6" />
                <line x1="0" y1="20" x2="30" y2="0" stroke="#CE1021" strokeWidth="3.2" />
                <path
                  d="M5 2 L5.705 4.029 L7.853 4.073 L6.141 5.371 L6.763 7.427 L5 6.2 L3.237 7.427 L3.859 5.371 L2.147 4.073 L4.295 4.029 Z"
                  fill="#F7D618"
                />
              </svg>
            </span>
          </span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </section>
  );
}
