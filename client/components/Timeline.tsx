"use client";

import { motion } from "framer-motion";

const steps = [
  { t: "Started building", d: "Learned fundamentals and shipped small apps fast." },
  { t: "Fullstack systems", d: "Moved into APIs, DB modeling, auth, and real workflows." },
  { t: "Marketplace architecture", d: "Designed selection flows, escrow logic, proof/review windows." },
  { t: "Now", d: "Shipping premium UIs with clean backend foundations." },
];

export default function Timeline() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <motion.h2
        className="text-3xl font-semibold tracking-tight md:text-4xl"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        Journey.
      </motion.h2>

      <div className="mt-8 grid gap-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.t}
            className="glass rounded-3xl p-5 hover:glow-border transition"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: i * 0.06 }}
          >
            <p className="text-xs text-muted">Phase {i + 1}</p>
            <p className="mt-1 text-lg font-semibold">{s.t}</p>
            <p className="mt-2 text-sm text-muted">{s.d}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}