"use client";

import { useEffect, useRef } from "react";

/**
 * Two-layer cursor: a fast purple dot + a slow lagging ring.
 */
export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let raf: number;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      // Dot snaps instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        dotRef.current.style.opacity = "1";
      }

      // Big glow follows
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
        glowRef.current.style.opacity = "1";
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.11);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.11);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (glowRef.current) glowRef.current.style.opacity = "0";
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      {/* Large ambient glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[5] h-[400px] w-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 70%)",
          opacity: 0,
          transition: "opacity 300ms ease",
          willChange: "transform",
        }}
      />

      {/* Lagging ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[999] h-10 w-10 rounded-full"
        style={{
          border: "1.5px solid rgba(168,85,247,0.65)",
          opacity: 0,
          transition: "opacity 200ms ease",
          willChange: "transform",
          mixBlendMode: "screen",
        }}
      />

      {/* Instant dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[1000] h-2 w-2 rounded-full"
        style={{
          background: "#c084fc",
          opacity: 0,
          boxShadow: "0 0 8px 3px rgba(192,132,252,0.7)",
          willChange: "transform",
        }}
      />
    </>
  );
}