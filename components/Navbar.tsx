"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import GooglyEyes from "./GooglyEyes";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        backgroundColor: scrolled ? "color-mix(in srgb, var(--bg) 85%, transparent)" : "transparent",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="font-mono text-xl"
            style={{ color: "var(--fg)" }}
          >
            ZS
          </a>

          <div className="flex items-center gap-5">
            <nav className="flex items-center gap-6">
              {["work", "contact"].map((s) => (
                <a
                  key={s}
                  href={`#${s === "work" ? "experience" : s}`}
                  className="label transition-colors"
                  style={{ color: "var(--fg-muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
                >
                  {s}
                </a>
              ))}
            </nav>
            <div className="hidden sm:flex">
              <GooglyEyes />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
