"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import GooglyEyes from "./GooglyEyes";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
          <Link
            href="/"
            onClick={(e) => {
              // On home, don't navigate, just scroll to top. Elsewhere, let
              // Link handle client-side navigation home.
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="font-mono text-xl"
            style={{ color: "var(--fg)" }}
          >
            ZS
          </Link>

          <div className="flex items-center gap-5">
            <nav className="flex items-center gap-6">
              {[
                { label: "work", href: "/#experience" },
                { label: "blog", href: "/blog" },
                { label: "contact", href: "/#contact" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="label transition-colors hover:text-fg"
                >
                  {item.label}
                </Link>
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
