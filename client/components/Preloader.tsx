"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const MESSAGES = [
  "Initializing systems…",
  "Loading experience modules…",
  "Compiling premium UI…",
  "Connecting APIs…",
  "Almost there…",
];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.floor(Math.random() * 12) + 5);
        setMsgIdx(Math.min(Math.floor((next / 100) * MESSAGES.length), MESSAGES.length - 1));
        if (next >= 100) {
          clearInterval(t);
          setTimeout(() => { setOpen(false); setTimeout(onDone, 500); }, 300);
        }
        return next;
      });
    }, 110);

    return () => clearInterval(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center"
          style={{ background: "rgb(8,8,12)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(circle at 50% 45%, rgba(168,85,247,0.12) 0%, transparent 65%)",
            }}
          />

          {/* Particle grid */}
          <div className="pointer-events-none absolute inset-0 soft-grid opacity-[0.12]" />

          {/* Card */}
          <motion.div
            className="relative w-[min(480px,92vw)]"
            initial={{ y: 24, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Conic spinning border */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: `conic-gradient(from 0deg, #a855f7, #38bdf8, #f472b6, #a855f7)`,
                animation: "borderSpin 2.5s linear infinite",
                padding: "1px",
              }}
            />

            <div className="relative overflow-hidden rounded-[22px] p-5 sm:p-7" style={{ background: "rgb(8,8,12)" }}>
              {/* Top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: "linear-gradient(90deg,#a855f7,#38bdf8,#f472b6)" }} />

              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="pulse-dot shrink-0" />
                    <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-purple-400 truncate">
                      {MESSAGES[msgIdx]}
                    </p>
                  </div>
                  <h1 className="mt-2 text-xl font-black tracking-tight sm:text-2xl">
                    <span className="grad-purple">Ibrahim</span> / Portfolio
                  </h1>
                </div>
                <div
                  className="rounded-2xl px-3 py-2 text-xs font-extrabold tabular-nums sm:px-3.5 sm:text-sm"
                  style={{
                    background: "rgba(168,85,247,0.15)",
                    border: "1px solid rgba(168,85,247,0.35)",
                    color: "#d8b4fe",
                    minWidth: "56px",
                    textAlign: "center",
                  }}
                >
                  {progress}%
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
                <motion.div
                  className="h-1.5 rounded-full"
                  style={{
                    background: "linear-gradient(90deg,#a855f7,#818cf8,#38bdf8)",
                    boxShadow: "0 0 16px rgba(168,85,247,0.7)",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                />
              </div>

              {/* Modules */}
              <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {["Motion", "Components", "Data"].map((m, i) => (
                  <motion.div
                    key={m}
                    className="rounded-xl px-1.5 py-2 text-center text-[10px] sm:text-[11px] font-bold leading-tight flex items-center justify-center min-h-[36px]"
                    style={{
                      background: progress > (i + 1) * 30
                        ? "rgba(168,85,247,0.18)"
                        : "rgba(255,255,255,0.04)",
                      border: `1px solid ${progress > (i + 1) * 30 ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.08)"}`,
                      color: progress > (i + 1) * 30 ? "#d8b4fe" : "rgba(248,248,252,0.3)",
                    }}
                    animate={{
                      opacity: progress > (i + 1) * 30 ? 1 : 0.4,
                    }}
                  >
                    <span>{progress > (i + 1) * 30 ? "✓ " : ""}{m}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}