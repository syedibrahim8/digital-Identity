"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-14 md:pt-20">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <motion.p
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs text-muted"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: "rgba(168,85,247,0.9)" }} />
            Product-minded Fullstack Engineer
          </motion.p>

          <motion.h1
            className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
          >
            I build <span style={{ color: "rgba(168,85,247,0.95)" }}>systems</span>.
            <br />
            Not just websites.
          </motion.h1>

          <motion.p
            className="mt-5 max-w-xl text-muted"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
          >
            MERN + TypeScript • Workflows • Payments • Architecture • Performance.
            I ship clean experiences with real engineering underneath.
          </motion.p>

          <motion.div
            className="mt-7 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18 }}
          >
            <a
              href="#projects"
              className="rounded-2xl px-5 py-3 font-medium shadow-soft"
              style={{ background: "rgba(168,85,247,0.92)" }}
            >
              View Projects
            </a>
            <a
              href="#terminal"
              className="glass rounded-2xl px-5 py-3 font-medium hover:glow-border transition"
            >
              Enter Terminal
            </a>
            <a
              href="#"
              className="glass rounded-2xl px-5 py-3 font-medium hover:glow-border transition"
              aria-label="Download Resume"
            >
              Download Resume
            </a>
          </motion.div>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          <div className="glass glow-border shadow-soft rounded-3xl p-5">
            <p className="text-sm text-muted">Now building</p>
            <h3 className="mt-2 text-xl font-semibold">Founder-grade workflows</h3>

            <div className="mt-4 grid gap-3">
              {[
                "Escrow-style payments & releases",
                "Proof submission & review windows",
                "Clean APIs, validation, edge cases",
              ].map((x) => (
                <div key={x} className="glass rounded-2xl p-4 text-sm">
                  {x}
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs text-muted">
              Tip: scroll slowly — the page reacts ✨
            </p>
          </div>
        </motion.div>
      </div>

      <div className="mt-10 border-t border-white/10" />
    </div>
  );
}