"use client";

import { motion } from "framer-motion";

const steps = [
  {
    phase: "01",
    t: "Started building",
    d: "Learned fundamentals, shipped small apps fast. Fell in love with making things feel alive.",
    color: "#a855f7",
  },
  {
    phase: "02",
    t: "Fullstack systems",
    d: "Moved into APIs, database modelling, auth flows, JWT sessions — real backend engineering.",
    color: "#38bdf8",
  },
  {
    phase: "03",
    t: "Marketplace architecture",
    d: "Designed selection flows, escrow logic, proof-submission windows, Stripe integration.",
    color: "#34d399",
  },
  {
    phase: "04",
    t: "Now",
    d: "Shipping premium UIs with clean backend foundations. Building for founders and scale.",
    color: "#f59e0b",
  },
];

export default function Timeline() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
          Background
        </p>
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
          My{" "}
          <span className="grad-rose">journey</span>.
        </h2>
      </motion.div>

      <div className="mt-12 relative">
        {/* Vertical line */}
        <div
          className="absolute left-[18px] top-0 bottom-0 w-px md:left-1/2 md:-translate-x-px"
          style={{ background: "linear-gradient(to bottom, rgba(168,85,247,0.6), rgba(56,189,248,0.2), transparent)" }}
        />

        <div className="space-y-10">
          {steps.map((s, i) => (
            <motion.div
              key={s.phase}
              className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              {/* Dot */}
              <div
                className="absolute left-0 z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 border-white/20 text-xs font-bold md:left-1/2 md:-translate-x-1/2"
                style={{ background: s.color + "30", color: s.color, borderColor: s.color + "60" }}
              >
                {s.phase}
              </div>

              {/* Card */}
              <div
                className={`ml-14 md:ml-0 md:w-[46%] ${i % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}
              >
                <div
                  className="glass rounded-2xl p-5 transition hover:glow-border"
                  style={{ borderColor: s.color + "30" }}
                >
                  <p className="text-xs font-semibold" style={{ color: s.color }}>
                    Phase {s.phase}
                  </p>
                  <p className="mt-1 text-lg font-bold">{s.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-fade">{s.d}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}