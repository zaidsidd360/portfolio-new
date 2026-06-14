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

        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-8 sm:gap-16">
          <span className="contact-reveal label pt-1 font-bold">Contact</span>
          <div>
            <p
              className="contact-reveal mb-8"
              style={{ fontSize: "clamp(17px,2.2vw,20px)", fontWeight: 300, lineHeight: "1.6", color: "var(--fg-muted)" }}
            >
              Open to full-time roles and interesting projects.
            </p>

            <div className="contact-reveal flex flex-col gap-3">
              {[
                { label: "Email", value: "zaidsidd360@gmail.com", href: "mailto:zaidsidd360@gmail.com" },
                { label: "LinkedIn", value: "linkedin.com/in/zaidsidd360", href: "https://linkedin.com/in/zaidsidd360" },
                { label: "GitHub", value: "github.com/zaidsidd360", href: "https://github.com/zaidsidd360" },
              ].map(({ label, value, href }) => (
                <div key={label} className="flex items-baseline gap-6">
                  <span className="label w-16 shrink-0">{label}</span>
                  <a
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "14px",
                      fontWeight: 300,
                      fontFamily: "Ubuntu Mono, monospace",
                      color: "var(--fg-muted)",
                      textDecoration: "none",
                      borderBottom: "1px solid var(--border)",
                      paddingBottom: "1px",
                      transition: "color 0.15s, border-color 0.15s",
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
                    {value}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="divider mt-24 mb-8" />
        <div
          className="flex items-center justify-between"
          style={{ fontSize: "12px", color: "var(--fg-muted)", fontFamily: "Ubuntu Mono, monospace" }}
        >
          <span>Md Zaid Siddiqui</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </section>
  );
}
