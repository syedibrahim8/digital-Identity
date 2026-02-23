"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { Project } from "@/lib/projects";

export default function ProjectCard3D({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(my, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(mx, { stiffness: 180, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    mx.set((px - 0.5) * 10);
    my.set((0.5 - py) * 10);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="glass rounded-3xl p-5 shadow-soft hover:glow-border transition will-change-transform"
    >
      <div style={{ transform: "translateZ(18px)" }}>
        <p className="text-xs text-muted">Featured</p>
        <h3 className="mt-1 text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 text-sm text-muted">{project.punchline}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((t) => (
            <span key={t} className="glass rounded-full px-3 py-1 text-[11px] text-muted">
              {t}
            </span>
          ))}
        </div>

        <ul className="mt-4 space-y-2 text-sm">
          {project.highlights.slice(0, 3).map((h) => (
            <li key={h} className="text-muted">• {h}</li>
          ))}
        </ul>

        <div className="mt-5 flex gap-3">
          <a href={project.links.demo ?? "#"} className="rounded-2xl px-4 py-2 text-sm font-medium"
             style={{ background: "rgba(168,85,247,0.92)" }}>
            Live
          </a>
          <a href={project.links.github ?? "#"} className="glass rounded-2xl px-4 py-2 text-sm font-medium hover:glow-border transition">
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}