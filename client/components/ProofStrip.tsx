"use client";

import { motion } from "framer-motion";

const items = [
  {
    k: "Focus",
    v: "Performance + Architecture",
    color: "#a855f7",
    bg: "rgba(168,85,247,0.12)",
    border: "rgba(168,85,247,0.25)",
  },
  {
    k: "Stack",
    v: "Next.js · Node · Mongo · TS",
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.12)",
    border: "rgba(56,189,248,0.25)",
  },
  {
    k: "Special sauce",
    v: "Workflow systems · Payments",
    color: "#34d399",
    bg: "rgba(52,211,153,0.12)",
    border: "rgba(52,211,153,0.25)",
  },
];

export default function ProofStrip() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <motion.div
        className="grid gap-3 md:grid-cols-3"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
      >
        {items.map((x, i) => (
          <motion.div
            key={x.k}
            className="rounded-2xl p-5 transition hover:scale-[1.02]"
            style={{ background: x.bg, border: `1px solid ${x.border}` }}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: x.color }}>
              {x.k}
            </p>
            <p className="mt-2 text-base font-bold">{x.v}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}