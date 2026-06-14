import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Ubuntu", "system-ui", "sans-serif"],
        mono: ["Ubuntu Mono", "monospace"],
      },
      colors: {
        // Theme-aware tokens backed by the CSS variables in globals.css.
        // These follow the light/dark toggle, so prefer them over inline styles:
        //   text-fg / text-fg-muted / bg-bg / bg-fg / text-bg / border-line
        fg: {
          DEFAULT: "var(--fg)",
          muted: "var(--fg-muted)",
        },
        bg: "var(--bg)",
        line: "var(--border)",
        ink: {
          DEFAULT: "#0a0a0a",
          soft: "#1a1a1a",
          muted: "#3a3a3a",
        },
        paper: {
          DEFAULT: "#f9f9f7",
          soft: "#f0f0ed",
          muted: "#e0e0db",
        },
        mid: "#888888",
      },
      fontSize: {
        "display-xl": ["clamp(56px,10vw,120px)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(40px,7vw,84px)", { lineHeight: "1", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(28px,4vw,48px)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
