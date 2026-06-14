"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    dot.style.opacity = "1";
    ring.style.opacity = "1";

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    const animate = () => {
      // Lag the ring behind the dot
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
      ring.style.left = `${ringPos.current.x}px`;
      ring.style.top = `${ringPos.current.y}px`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Hover effects
    const addHoverClass = () => {
      dot.classList.add("hovered");
      ring.classList.add("hovered");
    };
    const removeHoverClass = () => {
      dot.classList.remove("hovered");
      ring.classList.remove("hovered");
    };

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", addHoverClass);
      el.addEventListener("mouseleave", removeHoverClass);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", addHoverClass);
        el.removeEventListener("mouseleave", removeHoverClass);
      });
    };
  }, []);

  return (
    <>
      <div
        id="custom-cursor"
        ref={dotRef}
        style={{ opacity: 0 }}
        aria-hidden
      />
      <div
        id="cursor-ring"
        ref={ringRef}
        style={{ opacity: 0 }}
        aria-hidden
      />
    </>
  );
}
