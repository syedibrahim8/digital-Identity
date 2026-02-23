"use client";

import { motion } from "framer-motion";
import { Zap, Layers, Code2, Lightbulb } from "lucide-react";

const principles = [
  {
    icon: <Zap size={16} />,
    title: "Performance-first",
    desc: "Fast UI, clean APIs, no jank. Motion stays smooth and purposeful.",
    color: "#f59e0b",
  },
  {
    icon: <Layers size={16} />,
    title: "Workflow thinking",
    desc: "I design flows with edge cases, guards, time windows, and clear states.",
    color: "#a855f7",
  },
  {
    icon: <Code2 size={16} />,
    title: "Clean architecture",
    desc: "Readable modules, validation layers, maintainable and scalable structure.",
    color: "#38bdf8",
  },
  {
    icon: <Lightbulb size={16} />,
    title: "Product mindset",
    desc: "I build what users actually understand, enjoy, and come back to.",
    color: "#34d399",
  },
];

const stats = [
  { a: "10+", b: "Projects" },
  { a: "Real-world", b: "Workflows" },
  { a: "Fullstack TS", b: "Stack" },
  { a: "Unfair", b: "Energy" },
];

export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
            About me
          </p>
          <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Engineering with{" "}
            <span className="grad-purple">intent</span>.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-fade">
            I don't just ship screens. I build systems: data models, workflows,
            timing windows, integrations, and reliability — wrapped in UI that
            feels premium. Every decision is deliberate.
          </p>
          <p className="mt-4 text-base leading-relaxed text-fade">
            From escrow-style payment releases to background job orchestration,
            I work at the intersection of clean code and real product value.
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {stats.map((x) => (
              <div key={x.a} className="glass rounded-2xl p-4">
                <p className="text-xl font-extrabold grad-purple">{x.a}</p>
                <p className="mt-0.5 text-xs text-fade">{x.b}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.08 }}
        >
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              className="glass rounded-2xl p-5 transition hover:glow-border"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <div
                className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-xl"
                style={{ background: p.color + "25", color: p.color }}
              >
                {p.icon}
              </div>
              <p className="font-bold">{p.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-fade">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}