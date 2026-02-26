"use client";

import { motion } from "framer-motion";

const steps = [
  {
    phase: "01",
    year: "H1 - 2025",
    t: "Learning the fundamentals",
    d: "Started with fundamentals, fell in love with making things feel alive. Shipped small projects obsessively.",
    color: "#a855f7",
    icon: "🌱",
  },
  {
    phase: "02",
    year: "H2 - 2025",
    t: "Going fullstack",
    d: "Moved deep into Node.js, MongoDB, Express, auth flows, JWT sessions — building real backend foundations.",
    color: "#38bdf8",
    icon: "⚙️",
  },
  {
    phase: "03",
    year: "2026",
    t: "Marketplace architecture",
    d: "Designed selection flows, escrow payment logic, proof-submission time windows, Stripe — systems thinking at scale.",
    color: "#34d399",
    icon: "🏗️",
  },
  {
    phase: "04",
    year: "Now",
    t: "Shipping premium products",
    d: "Fullstack TypeScript, premium UX, founder-grade workflows. Built for teams that want engineering depth.",
    color: "#f59e0b",
    icon: "🚀",
  },
];

export default function Timeline() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <motion.div
        className="mb-14"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-purple-400">Background</p>
        <h2 className="mt-3 text-4xl font-black tracking-tighter md:text-5xl">
          My <span className="grad-rose">journey</span>.
        </h2>
      </motion.div>

      <div className="relative">
        {/* Vertical gradient line */}
        <div
          className="absolute bottom-0 left-[28px] top-0 w-px md:left-1/2 md:-translate-x-px"
          style={{
            background: "linear-gradient(to bottom, rgba(168,85,247,0.8) 0%, rgba(56,189,248,0.5) 50%, rgba(245,158,11,0.3) 85%, transparent 100%)",
          }}
        />

        <div className="space-y-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.phase}
              className={`relative flex ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Phase dot */}
              <div className="absolute left-0 z-10 md:left-1/2 md:-translate-x-1/2">
                <motion.div
                  className="flex h-14 w-14 flex-col items-center justify-center rounded-2xl text-center sm:h-[70px] sm:w-[70px]"
                  style={{
                    background: s.color + "18",
                    border: `1.5px solid ${s.color}55`,
                    boxShadow: `0 0 30px ${s.color}25`,
                  }}
                  whileInView={{ boxShadow: `0 0 50px ${s.color}40` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 + 0.3 }}
                >
                  <span className="text-xl">{s.icon}</span>
                  <span className="mt-0.5 text-[9px] font-bold" style={{ color: s.color }}>{s.year}</span>
                </motion.div>
              </div>

              {/* Spacer for center alignment */}
              <div className="hidden w-[50%] md:block" />

              {/* Card */}
              <div className={`ml-12 md:ml-0 md:w-[46%] ${i % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
                <motion.div
                  className="glass rounded-3xl p-5 sm:p-6 transition-all hover:glow-border relative overflow-hidden"
                  whileHover={{ y: -4, scale: 1.01 }}
                >
                  {/* Card accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }}
                  />

                  <div className="flex items-center gap-3">
                    <span
                      className="rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-widest"
                      style={{ background: s.color + "20", color: s.color, border: `1px solid ${s.color}40` }}
                    >
                      Phase {s.phase}
                    </span>
                    <span className="text-[10px] font-medium text-fade">{s.year}</span>
                  </div>

                  <p className="mt-3 text-lg font-extrabold">{s.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-fade">{s.d}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}