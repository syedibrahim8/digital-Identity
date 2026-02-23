"use client";

import { motion } from "framer-motion";

const core = [
  { name: "TypeScript", pct: 95, color: "#38bdf8" },
  { name: "Next.js", pct: 92, color: "#a855f7" },
  { name: "React", pct: 93, color: "#60a5fa" },
  { name: "Node.js", pct: 88, color: "#34d399" },
  { name: "MongoDB", pct: 85, color: "#4ade80" },
  { name: "Stripe", pct: 80, color: "#818cf8" },
];

const tools = [
  "Express", "JWT Cookies", "Zod", "Cron Jobs", "REST APIs",
  "Tailwind CSS", "Framer Motion", "Lenis", "Git", "Vercel",
  "Postman", "ESLint",
];

const toolColors = [
  { bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.3)", text: "#d8b4fe" },
  { bg: "rgba(56,189,248,0.12)", border: "rgba(56,189,248,0.3)", text: "#7dd3fc" },
  { bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.3)", text: "#6ee7b7" },
  { bg: "rgba(251,113,133,0.12)", border: "rgba(251,113,133,0.3)", text: "#fda4af" },
  { bg: "rgba(251,146,60,0.12)", border: "rgba(251,146,60,0.3)", text: "#fdba74" },
];

export default function SkillsGrid() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
          Expertise
        </p>
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
          Skills &{" "}
          <span className="grad-purple">stack</span>.
        </h2>
        <p className="mt-4 max-w-2xl text-base text-fade">
          The tools I use to build fast, reliable systems and genuinely
          premium user experiences.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Core skills with bars */}
        <motion.div
          className="glass rounded-3xl p-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          <p className="mb-5 text-sm font-bold">Core technologies</p>
          <div className="space-y-4">
            {core.map((s, i) => (
              <div key={s.name}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm font-medium">{s.name}</span>
                  <span className="text-xs text-fade">{s.pct}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10">
                  <motion.div
                    className="h-1.5 rounded-full"
                    style={{ background: s.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tools grid */}
        <motion.div
          className="glass rounded-3xl p-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <p className="mb-5 text-sm font-bold">Tools & libraries</p>
          <div className="flex flex-wrap gap-2">
            {tools.map((t, i) => {
              const c = toolColors[i % toolColors.length];
              return (
                <motion.span
                  key={t}
                  className="rounded-full px-3 py-1.5 text-xs font-medium transition hover:scale-105"
                  style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  {t}
                </motion.span>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}