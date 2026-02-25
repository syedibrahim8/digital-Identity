"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";
import type { Project } from "@/lib/projects";

const tagColors: Record<string, { bg: string; border: string; text: string }> =
{
  "Next.js": {
    bg: "rgba(255,255,255,0.07)",
    border: "rgba(255,255,255,0.14)",
    text: "#e2e8f0",
  },
  Node: {
    bg: "rgba(52,211,153,0.12)",
    border: "rgba(52,211,153,0.3)",
    text: "#6ee7b7",
  },
  MongoDB: {
    bg: "rgba(52,211,153,0.12)",
    border: "rgba(52,211,153,0.3)",
    text: "#6ee7b7",
  },
  Stripe: {
    bg: "rgba(99,102,241,0.14)",
    border: "rgba(99,102,241,0.35)",
    text: "#a5b4fc",
  },
  TypeScript: {
    bg: "rgba(56,189,248,0.12)",
    border: "rgba(56,189,248,0.35)",
    text: "#7dd3fc",
  },
  React: {
    bg: "rgba(56,189,248,0.12)",
    border: "rgba(56,189,248,0.3)",
    text: "#7dd3fc",
  },
  Express: {
    bg: "rgba(255,255,255,0.07)",
    border: "rgba(255,255,255,0.14)",
    text: "#cbd5e1",
  },
  Cron: {
    bg: "rgba(251,146,60,0.12)",
    border: "rgba(251,146,60,0.3)",
    text: "#fdba74",
  },
  API: {
    bg: "rgba(168,85,247,0.12)",
    border: "rgba(168,85,247,0.3)",
    text: "#d8b4fe",
  },
  UX: {
    bg: "rgba(251,113,133,0.12)",
    border: "rgba(251,113,133,0.3)",
    text: "#fda4af",
  },
  Animations: {
    bg: "rgba(251,113,133,0.12)",
    border: "rgba(251,113,133,0.3)",
    text: "#fda4af",
  },
  Responsive: {
    bg: "rgba(52,211,153,0.12)",
    border: "rgba(52,211,153,0.3)",
    text: "#6ee7b7",
  },
};
const defaultTag = {
  bg: "rgba(255,255,255,0.05)",
  border: "rgba(255,255,255,0.1)",
  text: "#94a3b8",
};

const gradients = [
  "linear-gradient(135deg,#a855f7 0%,#818cf8 100%)",
  "linear-gradient(135deg,#38bdf8 0%,#6366f1 100%)",
  "linear-gradient(135deg,#f472b6 0%,#a855f7 100%)",
];

export default function ProjectCard3D({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(my, { stiffness: 150, damping: 22 });
  const rotateY = useSpring(mx, { stiffness: 150, damping: 22 });

  // Spotlight position
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    // Safety check for mobile: if user is not using a mouse, don't perform heavy tilt
    if (window.matchMedia("(hover: none)").matches) {
      mx.set(0);
      my.set(0);
    } else {
      mx.set((px - 0.5) * 14);
      my.set((0.5 - py) * 14);
    }
    setSpot({ x: px * 100, y: py * 100 });
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
    setHovering(false);
  };

  const grad = gradients[index % gradients.length];

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={() => setHovering(true)}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative glass rounded-3xl shadow-soft will-change-transform h-full flex flex-col overflow-hidden transition-all duration-300 group"
      whileHover={{ scale: 1.015 }}
    >
      {/* Spotlight glare overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-3xl transition-opacity duration-300"
        style={{
          opacity: hovering ? 1 : 0,
          background: `radial-gradient(280px circle at ${spot.x}% ${spot.y}%, rgba(255,255,255,0.055), transparent 60%)`,
        }}
      />

      {/* Top gradient bar */}
      <div
        className="h-[3px] w-full flex-shrink-0"
        style={{ background: grad }}
      />

      {/* Gradient number badge */}
      <div
        className="absolute right-4 top-6 flex h-8 w-8 items-center justify-center rounded-full text-xs font-black text-white"
        style={{ background: grad, opacity: 0.9 }}
      >
        {String(project.id).padStart(2, "0")}
      </div>

      <div
        className="flex flex-col flex-1 p-5 sm:p-6"
        style={{ transform: "translateZ(18px)" }}
      >
        {/* Meta */}
        <div className="flex items-center gap-2">
          <Star
            size={10}
            style={{ color: grad.split(",")[1]?.split(" ")[1] ?? "#a855f7" }}
          />
          <p className="text-[11px] font-bold uppercase tracking-widest text-purple-400">
            Featured project
          </p>
        </div>

        {/* Title */}
        <h3 className="mt-2.5 pr-8 text-lg font-extrabold leading-snug">
          {project.title}
        </h3>

        {/* Punchline */}
        <p className="mt-2 text-sm leading-relaxed text-fade">
          {project.punchline}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 5).map((t) => {
            const c = tagColors[t] ?? defaultTag;
            return (
              <span
                key={t}
                className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                style={{
                  background: c.bg,
                  border: `1px solid ${c.border}`,
                  color: c.text,
                }}
              >
                {t}
              </span>
            );
          })}
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-white/8" />

        {/* Highlights */}
        <ul className="flex-1 space-y-2">
          {project.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-fade">
              <span
                className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ background: grad }}
              />
              {h}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="mt-5 flex gap-2">
          {(() => {
            const demoHref = project.links.demo?.trim();
            const hasDemo = Boolean(demoHref);

            return (
              <a
                href={hasDemo ? demoHref : undefined}
                target={hasDemo ? "_blank" : undefined}
                rel={hasDemo ? "noopener noreferrer" : undefined}
                aria-disabled={!hasDemo}
                tabIndex={hasDemo ? 0 : -1}
                onClick={(e) => {
                  if (!hasDemo) e.preventDefault();
                }}
                className={[
                  "group/btn relative flex flex-1 items-center justify-center gap-1.5 overflow-hidden rounded-xl py-2.5 text-sm font-bold text-white transition",
                  hasDemo
                    ? "hover:scale-[1.02]"
                    : "cursor-not-allowed opacity-70 saturate-50",
                ].join(" ")}
                style={{ background: grad }}
              >
                {hasDemo && (
                  <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-500 group-hover/btn:translate-x-full" />
                )}

                <ExternalLink size={12} />
                {hasDemo ? "Live Demo" : "Live Demo coming soon..."}
              </a>
            );
          })()}

          <a
            href={project.links.github ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="glass flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold text-fade transition hover:glow-border hover:text-white"
          >
            <Github size={12} />
            Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}
