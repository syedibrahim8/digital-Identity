"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal, Download, Sparkles, Code2 } from "lucide-react";
import CountUp from "./CountUp";

const badges = [
  { label: "MERN Stack", c: "#a855f7" },
  { label: "TypeScript", c: "#38bdf8" },
  { label: "Stripe Payments", c: "#f472b6" },
  { label: "System Design", c: "#34d399" },
  { label: "Next.js", c: "#818cf8" },
  { label: "REST APIs", c: "#fb923c" },
];

const stats = [
  { n: 10, suffix: "+", label: "Projects shipped" },
  { n: 3, suffix: "+", label: "Production systems" },
  { n: 1, prefix: "~", suffix: "yr", label: "Building experience" },
];

export default function Hero() {
  return (
    <div className="relative mx-auto max-w-7xl px-4 pt-14 pb-6 sm:px-6 md:pt-20">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        {/* ── LEFT ─────────────────────────────── */}
        <div>
          {/* Status badge */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <span className="pulse-dot" />
            Open to new opportunities
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="mt-6 text-5xl font-black leading-[1.03] tracking-tighter md:text-6xl xl:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="text-shimmer block">I build</span>
            <span className="grad-purple block">systems</span>
            <span
              className="block"
              style={{ color: "rgba(248,248,252,0.55)", fontSize: "0.72em" }}
            >
              Not just websites.
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            className="mt-5 max-w-lg text-base leading-relaxed text-fade"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Product-minded fullstack engineer — MERN · TypeScript · Stripe ·
            Architecture. I ship experiences with serious engineering
            underneath.
          </motion.p>

          {/* Skill badges */}
          <motion.div
            className="mt-5 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            {badges.map((b, i) => (
              <motion.span
                key={b.label}
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  background: b.c + "18",
                  border: `1px solid ${b.c}55`,
                  color: b.c,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.18 + i * 0.04 }}
                whileHover={{ scale: 1.08, y: -2 }}
              >
                {b.label}
              </motion.span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <motion.a
              href="#projects"
              className="group relative overflow-hidden rounded-2xl px-6 py-3 text-sm font-bold text-white shadow-glow"
              style={{ background: "linear-gradient(135deg,#a855f7,#818cf8)" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Shimmer sweep on hover */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-500 group-hover:translate-x-full group-hover:opacity-100" />
              <span className="relative flex items-center gap-2">
                View Projects
                <ArrowRight
                  size={14}
                  className="transition group-hover:translate-x-0.5"
                />
              </span>
            </motion.a>

            <motion.a
              href="#terminal"
              className="group relative overflow-hidden glass flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-fade transition hover:glow-border hover:text-white"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* shimmer sweep */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Terminal size={13} />
              Terminal
            </motion.a>

            <motion.a
              href="/Ibrahim_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden glass flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-fade transition hover:glow-border hover:text-white"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Open Resume"
            >
              {/* shimmer sweep */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Download size={13} />
              Resume
              <span
                className="ml-1 rounded-full px-2 py-0.5 text-[10px] font-extrabold tracking-wide"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "rgba(226,232,240,0.85)",
                }}
              >
                PDF
              </span>
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-10 flex gap-8 border-t border-white/10 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-black grad-purple">
                  <CountUp
                    to={s.n}
                    prefix={s.prefix ?? ""}
                    suffix={s.suffix ?? ""}
                  />
                </p>
                <p className="mt-0.5 text-[11px] text-fade">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT — feature card ─────────────── */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 30, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Orbit ring */}
          <div
            className="pointer-events-none absolute -inset-6 rounded-full border border-purple-500/15 animate-spin-slow"
            style={{ borderStyle: "dashed" }}
          />

          {/* Glow blob */}
          <div
            className="pointer-events-none absolute -inset-12 rounded-full opacity-25 blur-3xl animate-float"
            style={{
              background:
                "radial-gradient(circle,rgba(168,85,247,0.6),transparent 70%)",
            }}
          />

          {/* Card */}
          <div className="glass-strong glow-border shadow-soft rounded-3xl overflow-hidden relative">
            {/* Gradient top bar */}
            <div
              className="h-[3px]"
              style={{
                background:
                  "linear-gradient(90deg,#a855f7,#818cf8,#38bdf8,#f472b6)",
              }}
            />

            {/* Card content */}
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-purple-400">
                    Now building
                  </p>
                  <h3 className="mt-1.5 text-xl font-extrabold">
                    Founder-grade workflows
                  </h3>
                </div>
                <span
                  className="flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold"
                  style={{
                    background: "rgba(168,85,247,0.2)",
                    border: "1px solid rgba(168,85,247,0.4)",
                    color: "#d8b4fe",
                  }}
                >
                  <Sparkles size={10} />
                  Live
                </span>
              </div>

              {/* Feature rows */}
              <div className="mt-5 space-y-2.5">
                {[
                  {
                    t: "Escrow-style payments & releases",
                    c: "#a855f7",
                    icon: "💸",
                  },
                  {
                    t: "Proof submission & review windows",
                    c: "#38bdf8",
                    icon: "📋",
                  },
                  {
                    t: "Clean APIs, validation, edge cases",
                    c: "#34d399",
                    icon: "⚙️",
                  },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition hover:scale-[1.01]"
                    style={{
                      background: x.c + "14",
                      border: `1px solid ${x.c}35`,
                    }}
                  >
                    <span className="text-base">{x.icon}</span>
                    {x.t}
                  </div>
                ))}
              </div>

              {/* Code snippet */}
              <div className="mt-5 rounded-2xl bg-black/40 p-4 font-mono text-[11px] leading-5 border border-white/8">
                <span style={{ color: "#a855f7" }}>const</span>{" "}
                <span style={{ color: "#38bdf8" }}>ibrahim</span>{" "}
                <span style={{ color: "#f8f8fc" }}>= {"{"}</span>
                <br />
                {"  "}
                <span style={{ color: "#34d399" }}>role</span>
                <span style={{ color: "#f8f8fc" }}>: </span>
                <span style={{ color: "#fbbf24" }}>"fullstack engineer"</span>
                <span style={{ color: "#f8f8fc" }}>,</span>
                <br />
                {"  "}
                <span style={{ color: "#34d399" }}>stack</span>
                <span style={{ color: "#f8f8fc" }}>: </span>
                <span style={{ color: "#fbbf24" }}>"MERN + TS"</span>
                <span style={{ color: "#f8f8fc" }}>,</span>
                <br />
                {"  "}
                <span style={{ color: "#34d399" }}>ships</span>
                <span style={{ color: "#f8f8fc" }}>: </span>
                <span style={{ color: "#f472b6" }}>true</span>
                <br />
                <span style={{ color: "#f8f8fc" }}>{"}"};</span>
              </div>

              <p className="mt-4 text-[11px] text-fade">
                ✨ Scroll slowly — this page reacts to your movement
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="mt-16 neon-line opacity-50" />
    </div>
  );
}
