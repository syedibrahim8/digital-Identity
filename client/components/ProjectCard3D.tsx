"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/projects";

const tagColors: Record<string, { bg: string; border: string; text: string }> = {
  "Next.js": { bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.15)", text: "#e2e8f0" },
  "Node": { bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.3)", text: "#6ee7b7" },
  "MongoDB": { bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.3)", text: "#6ee7b7" },
  "Stripe": { bg: "rgba(99,102,241,0.14)", border: "rgba(99,102,241,0.35)", text: "#a5b4fc" },
  "TypeScript": { bg: "rgba(56,189,248,0.12)", border: "rgba(56,189,248,0.35)", text: "#7dd3fc" },
  "React": { bg: "rgba(56,189,248,0.12)", border: "rgba(56,189,248,0.3)", text: "#7dd3fc" },
  "Express": { bg: "rgba(255,255,255,0.07)", border: "rgba(255,255,255,0.14)", text: "#cbd5e1" },
  "Cron": { bg: "rgba(251,146,60,0.12)", border: "rgba(251,146,60,0.3)", text: "#fdba74" },
  "API": { bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.3)", text: "#d8b4fe" },
  "UX": { bg: "rgba(251,113,133,0.12)", border: "rgba(251,113,133,0.3)", text: "#fda4af" },
};

const defaultTag = { bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.12)", text: "#cbd5e1" };

const gradients = [
  "linear-gradient(135deg, rgba(168,85,247,1) 0%, rgba(129,140,248,1) 100%)",
  "linear-gradient(135deg, rgba(56,189,248,1) 0%, rgba(99,102,241,1) 100%)",
  "linear-gradient(135deg, rgba(251,113,133,1) 0%, rgba(168,85,247,1) 100%)",
];

export default function ProjectCard3D({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(my, { stiffness: 160, damping: 20 });
  const rotateY = useSpring(mx, { stiffness: 160, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 12);
    my.set((0.5 - (e.clientY - r.top) / r.height) * 12);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="glass rounded-3xl shadow-soft will-change-transform transition hover:glow-border h-full flex flex-col overflow-hidden"
    >
      {/* Top gradient bar */}
      <div
        className="h-1 w-full flex-shrink-0"
        style={{ background: gradients[index % gradients.length] }}
      />

      <div className="flex flex-col flex-1 p-6" style={{ transform: "translateZ(16px)" }}>
        {/* Label */}
        <p className="text-[11px] font-semibold uppercase tracking-widest text-purple-400">
          Featured
        </p>

        {/* Title */}
        <h3 className="mt-2 text-lg font-bold leading-snug">{project.title}</h3>

        {/* Punchline */}
        <p className="mt-2 text-sm leading-relaxed text-fade">{project.punchline}</p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 5).map((t) => {
            const c = tagColors[t] ?? defaultTag;
            return (
              <span
                key={t}
                className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
              >
                {t}
              </span>
            );
          })}
        </div>

        {/* Highlights */}
        <ul className="mt-4 flex-1 space-y-1.5">
          {project.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-fade">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-400" />
              {h}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="mt-5 flex gap-2">
          <a
            href={project.links.demo ?? "#"}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: gradients[index % gradients.length] }}
          >
            <ExternalLink size={13} />
            Live Demo
          </a>
          <a
            href={project.links.github ?? "#"}
            className="glass flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-fade transition hover:glow-border hover:text-white"
          >
            <Github size={13} />
            Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}