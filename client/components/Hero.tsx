"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal, Download, Sparkles } from "lucide-react";

const badges = [
  { label: "MERN Stack", color: "rgba(168,85,247,0.2)", border: "rgba(168,85,247,0.4)" },
  { label: "TypeScript", color: "rgba(56,189,248,0.2)", border: "rgba(56,189,248,0.4)" },
  { label: "Stripe Payments", color: "rgba(251,113,133,0.2)", border: "rgba(251,113,133,0.4)" },
  { label: "System Design", color: "rgba(52,211,153,0.2)", border: "rgba(52,211,153,0.4)" },
];

const stats = [
  { n: "10+", label: "Projects shipped" },
  { n: "3+", label: "Fullstack systems" },
  { n: "100%", label: "TypeScript" },
];

export default function Hero() {
  return (
    <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 md:pt-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* ── LEFT ─────────────────────────────── */}
        <div>
          {/* Status pill */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-xs text-green-300"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="pulse-dot" />
            Available for new opportunities
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="mt-6 text-5xl font-extrabold leading-[1.04] tracking-tighter md:text-6xl xl:text-7xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
          >
            I build{" "}
            <span className="grad-purple">systems</span>.<br />
            Not just{" "}
            <span className="grad-sky">websites</span>.
          </motion.h1>

          {/* Sub */}
          <motion.p
            className="mt-5 max-w-lg text-base leading-relaxed text-fade"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
          >
            Product-minded fullstack engineer. MERN · TypeScript · Workflows ·
            Stripe Payments · Architecture. I ship clean experiences with serious
            engineering underneath.
          </motion.p>

          {/* Skill badges */}
          <motion.div
            className="mt-5 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            {badges.map((b) => (
              <span
                key={b.label}
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  background: b.color,
                  border: `1px solid ${b.border}`,
                  color: "#f8f8fc",
                }}
              >
                {b.label}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
          >
            <a
              href="#projects"
              className="group flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(168,85,247,1) 0%, rgba(129,140,248,1) 100%)",
              }}
            >
              View Projects
              <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#terminal"
              className="glass flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-fade transition hover:glow-border hover:text-white"
            >
              <Terminal size={14} />
              Terminal Mode
            </a>
            <a
              href="#"
              className="glass flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-fade transition hover:glow-border hover:text-white"
              aria-label="Download Resume"
            >
              <Download size={14} />
              Resume
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="mt-10 flex gap-8 border-t border-white/10 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-extrabold grad-purple">{s.n}</p>
                <p className="mt-0.5 text-xs text-fade">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT — feature card ─────────────── */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
        >
          {/* Outer glow blob */}
          <div
            className="pointer-events-none absolute -inset-8 rounded-full opacity-30 blur-3xl animate-float"
            style={{ background: "radial-gradient(circle, rgba(168,85,247,0.5), transparent 70%)" }}
          />

          <div className="glass glow-border shadow-soft rounded-3xl p-6 relative overflow-hidden">
            {/* Top gradient bar */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: "linear-gradient(90deg, #a855f7, #818cf8, #38bdf8)" }}
            />

            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-fade">Now building</p>
                <h3 className="mt-1.5 text-xl font-bold">Founder-grade workflows</h3>
              </div>
              <span
                className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.4)", color: "#d8b4fe" }}
              >
                <Sparkles size={10} />
                Active
              </span>
            </div>

            <div className="mt-5 grid gap-2.5">
              {[
                { t: "Escrow-style payments & releases", c: "rgba(168,85,247,0.15)", b: "rgba(168,85,247,0.3)" },
                { t: "Proof submission & review windows", c: "rgba(56,189,248,0.12)", b: "rgba(56,189,248,0.3)" },
                { t: "Clean APIs, validation, edge cases", c: "rgba(52,211,153,0.12)", b: "rgba(52,211,153,0.3)" },
              ].map((x) => (
                <div
                  key={x.t}
                  className="rounded-2xl px-4 py-3 text-sm"
                  style={{ background: x.c, border: `1px solid ${x.b}` }}
                >
                  {x.t}
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["#a855f7", "#38bdf8", "#34d399"].map((c) => (
                  <div
                    key={c}
                    className="h-7 w-7 rounded-full border-2 border-white/10"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <p className="text-xs text-fade">Scroll slowly — the page reacts ✨</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="mt-14 neon-line opacity-60" />
    </div>
  );
}