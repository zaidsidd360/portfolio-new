"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-7 h-7" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="w-7 h-7 flex items-center justify-center rounded transition-opacity hover:opacity-60"
      style={{ color: "var(--fg-muted)" }}
    >
      {theme === "dark" ? <Sun size={15} strokeWidth={1.2} /> : <Moon size={15} strokeWidth={1.2} />}
    </button>
  );
}
