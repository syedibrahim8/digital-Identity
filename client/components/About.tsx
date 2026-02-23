"use client";

import { motion } from "framer-motion";
import { Zap, Layers, Code2, Lightbulb, BarChart3, Globe } from "lucide-react";
import CountUp from "./CountUp";

const principles = [
  { icon: <Zap size={15} />, title: "Performance-first", desc: "Fast UI, clean APIs, no jank. Motion stays smooth.", color: "#f59e0b" },
  { icon: <Layers size={15} />, title: "Workflow thinking", desc: "Flows designed with edge cases, guards, time windows.", color: "#a855f7" },
  { icon: <Code2 size={15} />, title: "Clean architecture", desc: "Readable modules, validation layers, built to scale.", color: "#38bdf8" },
  { icon: <Lightbulb size={15} />, title: "Product mindset", desc: "I build what users understand, enjoy, and return to.", color: "#34d399" },
];

const bigStats = [
  { n: 10, suffix: "+", label: "Projects shipped", c: "#a855f7" },
  { n: 3, suffix: "+", label: "Production systems", c: "#38bdf8" },
  { n: 100, suffix: "%", label: "TypeScript coverage", c: "#34d399" },
  { n: 5, suffix: "+", label: "Payment integrations", c: "#f59e0b" },
];

export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      {/* Header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-purple-400">About me</p>
        <h2 className="mt-3 text-4xl font-black tracking-tighter md:text-5xl">
          Engineering with <span className="grad-purple">intent</span>.
        </h2>
      </motion.div>

      {/* Bento grid */}
      <div className="grid gap-4 md:grid-cols-3 md:grid-rows-[auto_auto]">

        {/* Bio — spans 2 columns */}
        <motion.div
          className="glass-strong rounded-3xl p-7 border border-white/10 md:col-span-2"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Globe size={20} className="mb-4 text-purple-400" />
          <h3 className="text-xl font-extrabold">I don't just ship screens.</h3>
          <p className="mt-3 text-base leading-relaxed text-fade">
            I build systems: data models, workflows, timing windows, integrations,
            and reliability — wrapped in UI that feels genuinely premium.
            From escrow-style payment releases to background job orchestration,
            I work at the intersection of clean code and real product value.
          </p>
          <p className="mt-3 text-base leading-relaxed text-fade">
            Every decision is deliberate. Every edge case is handled. Every
            component is designed to scale and be maintained with pride.
          </p>
        </motion.div>

        {/* Stats card */}
        <motion.div
          className="glass-strong rounded-3xl p-6 border border-white/10 relative overflow-hidden"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.06 }}
        >
          <div
            className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl"
            style={{ background: "rgba(168,85,247,0.18)" }}
          />
          <BarChart3 size={20} className="mb-4 text-purple-400 relative z-10" />
          <div className="relative z-10 grid grid-cols-2 gap-3">
            {bigStats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/5 p-3">
                <p className="text-2xl font-black" style={{ color: s.c }}>
                  <CountUp to={s.n} suffix={s.suffix} />
                </p>
                <p className="mt-0.5 text-[10px] leading-tight text-fade">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Principles — 4 icon cards */}
        {principles.map((p, i) => (
          <motion.div
            key={p.title}
            className="glass rounded-2xl p-5 border border-white/8 transition-all hover:glow-border"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            whileHover={{ y: -4, scale: 1.01 }}
          >
            <div
              className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ background: p.color + "22", color: p.color, border: `1px solid ${p.color}44` }}
            >
              {p.icon}
            </div>
            <p className="font-extrabold">{p.title}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-fade">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}