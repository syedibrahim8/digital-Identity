"use client";

import { motion } from "framer-motion";
import { FEATURED_PROJECTS } from "@/lib/projects";
import ProjectCard3D from "./ProjectCard3D";

export default function FeaturedProjects() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      {/* Header */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
          Selected work
        </p>
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
          Signature{" "}
          <span className="grad-purple">projects</span>.
        </h2>
        <p className="mt-4 max-w-2xl text-base text-fade">
          Real systems: role-based workflows, payments, authentications, background jobs, edge cases, and
          clean UX that proves engineering depth.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {FEATURED_PROJECTS.map((p, idx) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: idx * 0.08 }}
          >
            <ProjectCard3D project={p} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}