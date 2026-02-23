"use client";

import { motion } from "framer-motion";

const core = ["TypeScript", "Next.js", "React", "Node.js", "MongoDB", "Stripe"];
const tools = ["Express", "JWT Cookies", "Zod", "Cron Jobs", "REST APIs", "Tailwind", "Framer Motion"];

export default function SkillsGrid() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Skills & <span style={{ color: "rgba(168,85,247,0.95)" }}>stack</span>.
        </h2>
        <p className="mt-3 text-muted max-w-2xl">
          The tools I use to build fast, reliable systems and premium user experiences.
        </p>
      </motion.div>

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <div className="glass rounded-3xl p-5">
          <p className="text-sm font-semibold">Core</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {core.map((x) => (
              <span key={x} className="glass rounded-full px-4 py-2 text-sm text-muted hover:glow-border transition">
                {x}
              </span>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-5">
          <p className="text-sm font-semibold">Tools</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tools.map((x) => (
              <span key={x} className="glass rounded-full px-4 py-2 text-sm text-muted hover:glow-border transition">
                {x}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}