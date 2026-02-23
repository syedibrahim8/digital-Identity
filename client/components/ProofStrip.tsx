"use client";

import { motion } from "framer-motion";

const items = [
  { k: "Focus", v: "Performance + Architecture" },
  { k: "Stack", v: "Next.js • Node • Mongo • TS" },
  { k: "Special", v: "Workflow systems • Payments" },
];

export default function ProofStrip() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <motion.div
        className="grid gap-3 md:grid-cols-3"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        {items.map((x) => (
          <div key={x.k} className="glass rounded-3xl p-5">
            <p className="text-xs text-muted">{x.k}</p>
            <p className="mt-2 text-base font-semibold">{x.v}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}