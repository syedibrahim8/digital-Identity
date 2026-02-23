"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactCTA() {
  const [copied, setCopied] = useState(false);
  const email = "your@email.com";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <motion.div
        className="glass glow-border rounded-3xl p-7 shadow-soft"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs text-muted">Let’s build something serious</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          Want me on your team?
        </h2>
        <p className="mt-3 text-muted max-w-2xl">
          I’m open to roles where I can build real products, strong systems, and premium UX.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={copy}
            className="rounded-2xl px-5 py-3 font-medium shadow-soft"
            style={{ background: "rgba(168,85,247,0.92)" }}
          >
            {copied ? "Copied ✅" : "Copy Email"}
          </button>
          <a
            href="#"
            className="glass rounded-2xl px-5 py-3 font-medium hover:glow-border transition"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="glass rounded-2xl px-5 py-3 font-medium hover:glow-border transition"
          >
            GitHub
          </a>
        </div>

        <p className="mt-4 text-xs text-muted">
          Email: <span className="text-white/80">{email}</span>
        </p>
      </motion.div>
    </div>
  );
}