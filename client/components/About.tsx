"use client";

import { motion } from "framer-motion";

const principles = [
  { title: "Performance-first", desc: "Fast UI, clean APIs, no jank. Motion stays smooth." },
  { title: "Workflow thinking", desc: "I design flows with edge cases, guards, and clear states." },
  { title: "Clean architecture", desc: "Readable modules, validation, and maintainable structure." },
  { title: "Product mindset", desc: "I build what users actually understand and enjoy." },
];

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Engineering with <span style={{ color: "rgba(168,85,247,0.95)" }}>intent</span>.
          </h2>
          <p className="mt-4 text-muted">
            I don’t just ship screens. I build systems: data models, workflows, timing windows,
            integrations, and reliability — wrapped in UI that feels premium.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {[
              { a: "Projects", b: "10+" },
              { a: "Workflows", b: "Real-world" },
              { a: "Stack", b: "Fullstack TS" },
              { a: "Energy", b: "Unfair" },
            ].map((x) => (
              <div key={x.a} className="glass rounded-3xl p-4">
                <p className="text-xs text-muted">{x.a}</p>
                <p className="mt-1 text-xl font-semibold">{x.b}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid gap-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          {principles.map((p) => (
            <div key={p.title} className="glass rounded-3xl p-5 hover:glow-border transition">
              <p className="font-semibold">{p.title}</p>
              <p className="mt-2 text-sm text-muted">{p.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}