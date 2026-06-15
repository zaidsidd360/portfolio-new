"use client";

import { useEffect, useRef } from "react";

export default function GooglyEyes() {
  const eye1Ref = useRef<HTMLDivElement>(null);
  const eye2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const MAX_OFFSET = 2.8; // max pupil travel in px

    const movePupil = (eyeEl: HTMLDivElement, mx: number, my: number) => {
      const rect = eyeEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(my - cy, mx - cx);
      // Clamp to max offset
      const dist = Math.min(
        Math.hypot(mx - cx, my - cy),
        MAX_OFFSET * 4 // cursor needs to be at least this far to reach max offset
      );
      const ratio = Math.min(dist / (MAX_OFFSET * 4), 1);
      const x = Math.cos(angle) * MAX_OFFSET * ratio;
      const y = Math.sin(angle) * MAX_OFFSET * ratio;
      const pupil = eyeEl.querySelector<HTMLElement>(".pupil");
      if (pupil) {
        pupil.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      }
    };

    const onMove = (e: MouseEvent) => {
      if (eye1Ref.current) movePupil(eye1Ref.current, e.clientX, e.clientY);
      if (eye2Ref.current) movePupil(eye2Ref.current, e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const EyeStyle: React.CSSProperties = {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    background: "white",
    border: "1.5px solid #d1d1d1",
    position: "relative",
    overflow: "hidden",
    flexShrink: 0,
    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.08)",
  };

  const PupilStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#1a1a1a",
    transform: "translate(-50%, -50%)",
    transition: "transform 0.05s linear",
  };

  return (
    <a
      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="googly eyes"
      style={{ display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}
    >
      <div ref={eye1Ref} style={EyeStyle}>
        <div className="pupil" style={PupilStyle} />
      </div>
      <div ref={eye2Ref} style={EyeStyle}>
        <div className="pupil" style={PupilStyle} />
      </div>
    </a>
  );
}
