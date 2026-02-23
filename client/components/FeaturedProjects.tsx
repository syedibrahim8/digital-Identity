"use client";

import { motion } from "framer-motion";
import { FEATURED_PROJECTS } from "@/lib/projects";
import ProjectCard3D from "./ProjectCard3D";

export default function FeaturedProjects() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Signature <span style={{ color: "rgba(168,85,247,0.95)" }}>projects</span>.
        </h2>
        <p className="mt-3 text-muted max-w-2xl">
          The stuff that proves I can build real systems: workflows, payments, background jobs,
          edge cases, and clean UX.
        </p>
      </motion.div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {FEATURED_PROJECTS.map((p, idx) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: idx * 0.06 }}
          >
            <ProjectCard3D project={p} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}