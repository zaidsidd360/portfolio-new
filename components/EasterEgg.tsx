"use client";

import { useEffect, useState } from "react";

const EGGS = [
  // The Office
  {
    show: "The Office",
    quotes: [
      { text: "Bears. Beets. Battlestar Galactica.", attr: "Dwight Schrute" },
      { text: "I'm not superstitious, but I am a little stitious.", attr: "Michael Scott" },
      { text: "That's what she said.", attr: "Michael Scott" },
      { text: "Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.", attr: "Michael Scott" },
    ],
    emoji: "📎",
    color: "#d4a843",
  },
  // Breaking Bad
  {
    show: "Breaking Bad",
    quotes: [
      { text: "I am the one who knocks.", attr: "Walter White" },
      { text: "Science, bitch!", attr: "Jesse Pinkman" },
      { text: "Say my name.", attr: "Heisenberg" },
      { text: "I did it for me. I liked it. I was good at it. And I was really... I was alive.", attr: "Walter White" },
    ],
    emoji: "🧪",
    color: "#4e9e4a",
  },
  // Better Call Saul
  {
    show: "Better Call Saul",
    quotes: [
      { text: "It's all good, man.", attr: "Jimmy McGill" },
      { text: "You know what? I'm gonna take that as a sign.", attr: "Jimmy McGill" },
      { text: "I'm the guy who's gonna save your ass.", attr: "Jimmy McGill" },
      { text: "As my brother used to say... let the universe do the rest.", attr: "Jimmy McGill" },
    ],
    emoji: "⚖️",
    color: "#c0863a",
  },
];

export default function EasterEgg() {
  const [visible, setVisible] = useState(false);
  const [egg, setEgg] = useState<(typeof EGGS)[number] | null>(null);
  const [quote, setQuote] = useState<{ text: string; attr: string } | null>(null);

  useEffect(() => {
    // Pick a random show + random quote deterministically per session
    const randomEgg = EGGS[Math.floor(Math.random() * EGGS.length)];
    const randomQuote = randomEgg.quotes[Math.floor(Math.random() * randomEgg.quotes.length)];
    setEgg(randomEgg);
    setQuote(randomQuote);

    // Appear after 4s
    const t = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(t);
  }, []);

  if (!egg || !quote) return null;

  return (
    <div
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 999,
        maxWidth: "280px",
        transform: visible ? "translateY(0)" : "translateY(20px)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.5s cubic-bezier(0.175,0.885,0.32,1.2), opacity 0.4s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "14px 16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
          <span
            style={{
              fontSize: "10px",
              fontFamily: "Ubuntu Mono, monospace",
              letterSpacing: "0.08em",
              color: egg.color,
              textTransform: "uppercase",
            }}
          >
            {egg.emoji} {egg.show}
          </span>
          <button
            onClick={() => setVisible(false)}
            aria-label="Dismiss"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--fg-muted)",
              fontSize: "16px",
              lineHeight: 1,
              padding: "0 0 0 8px",
              opacity: 0.5,
            }}
          >
            ×
          </button>
        </div>

        {/* Quote */}
        <p
          style={{
            fontSize: "13px",
            fontWeight: 300,
            lineHeight: "1.55",
            color: "var(--fg)",
            marginBottom: "6px",
          }}
        >
          &ldquo;{quote.text}&rdquo;
        </p>
        <p
          style={{
            fontSize: "11px",
            fontFamily: "Ubuntu Mono, monospace",
            color: "var(--fg-muted)",
          }}
        >
          — {quote.attr}
        </p>
      </div>
    </div>
  );
}
