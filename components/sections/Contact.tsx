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
              Open to full-time software engineering roles.
            </p>

            <div className="contact-reveal flex flex-col gap-3">
              {[
                { label: "Email", value: "zaidsidd360@gmail.com", href: "mailto:zaidsidd360@gmail.com" },
                { label: "LinkedIn", value: "linkedin.com/in/zaidsidd360", href: "https://linkedin.com/in/zaidsidd360" },
                { label: "GitHub", value: "github.com/zaidsidd360", href: "https://github.com/zaidsidd360" },
                { label: "Resume", value: "download (PDF)", href: "/MdZaidSiddiquiResume.pdf" },
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
