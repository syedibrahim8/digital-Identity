"use client";

import { motion } from "framer-motion";
import CountUp from "./CountUp";

const core = [
  { name: "TypeScript", pct: 95, c: "#38bdf8", icon: "🔷" },
  { name: "Next.js", pct: 92, c: "#a855f7", icon: "▲" },
  { name: "React", pct: 93, c: "#61dafb", icon: "⚛" },
  { name: "Node.js", pct: 88, c: "#34d399", icon: "🟢" },
  { name: "MongoDB", pct: 85, c: "#4ade80", icon: "🍃" },
];

const tools = [
  { label: "Express", c: "#f8f8fc" },
  { label: "JWT Auth", c: "#f59e0b" },
  { label: "REST APIs", c: "#38bdf8" },
  { label: "Tailwind v4", c: "#06b6d4" },
  { label: "Framer Motion", c: "#f472b6" },
  { label: "Lenis", c: "#c084fc" },
  { label: "Git & Git Hub", c: "#f97316" },
  { label: "Vercel", c: "#f8f8fc" },
  { label: "Postman", c: "#ff6c37" },
  { label: "ESLint", c: "#818cf8" },
  { label: "React Bits", c: "#f472b6" },
  { label: "Shadcn", c: "#f8f8fc" },
  { label: "npm", c: "#f59e0b" },
  { label: "Zod", c: "#a855f7" },
  { label: "Cron Jobs", c: "#fb923c" },
];

export default function SkillsGrid() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-purple-400">Expertise</p>
        <h2 className="mt-3 text-4xl font-black tracking-tighter md:text-5xl">
          Skills & <span className="grad-purple">stack</span>.
        </h2>
        <p className="mt-4 max-w-2xl text-base text-fade">
          The tools and technologies I use to build fast, reliable, and genuinely
          premium experiences.
        </p>
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Core skills with animated bars */}
        <motion.div
          className="glass-strong rounded-3xl p-6 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm font-black uppercase tracking-widest text-white/80">Core technologies</p>
            <span className="rounded-full px-3 py-1 text-[10px] font-bold text-purple-300"
              style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)" }}>
              <CountUp to={core.length} suffix=" skills" />
            </span>
          </div>

          <div className="space-y-5">
            {core.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.07 }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    <span className="text-base">{s.icon}</span>
                    {s.name}
                  </span>
                  <span className="text-xs font-bold" style={{ color: s.c }}>
                    <CountUp to={s.pct} suffix="%" duration={1200} />
                  </span>
                </div>
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/8">
                  {/* Track glow */}
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${s.c}99, ${s.c})`,
                      boxShadow: `0 0 12px ${s.c}80`,
                    }}
                    initial={{ width: "0%" }}
                    whileInView={{ width: `${s.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tools grid */}
        <motion.div
          className="glass-strong rounded-3xl p-6 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm font-black uppercase tracking-widest text-white/80">Tools & libraries</p>
            <span className="rounded-full px-3 py-1 text-[10px] font-bold text-sky-300"
              style={{ background: "rgba(56,189,248,0.15)", border: "1px solid rgba(56,189,248,0.3)" }}>
              <CountUp to={tools.length} suffix=" tools" />
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {tools.map((t, i) => (
              <motion.span
                key={t.label}
                className="cursor-default rounded-xl px-3 py-2 text-xs font-bold transition-all"
                style={{
                  background: t.c + "14",
                  border: `1px solid ${t.c}35`,
                  color: t.c,
                }}
                initial={{ opacity: 0, scale: 0.8, y: 8 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                {t.label}
              </motion.span>
            ))}
          </div>

          {/* Bonus stat */}
          <div className="mt-6 rounded-2xl border border-white/8 bg-white/4 p-4">
            <p className="text-xs text-fade">Stack philosophy</p>
            <p className="mt-1 text-sm font-bold">
              Fullstack TypeScript from DB to UI — one language, full control.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}