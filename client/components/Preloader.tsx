"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.floor(Math.random() * 14) + 6);
        if (next >= 100) {
          clearInterval(t);
          setTimeout(() => {
            setOpen(false);
            setTimeout(onDone, 450);
          }, 450);
        }
        return next;
      });
    }, 120);

    return () => clearInterval(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[rgb(var(--bg))]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45 } }}
        >
          <div className="w-[min(520px,92vw)]">
            <motion.div
              className="glass glow-border shadow-soft rounded-3xl p-6"
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.6 } }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted">Initializing systems…</p>
                  <h1 className="mt-1 text-xl font-semibold tracking-tight">
                    Ibrahim / Portfolio
                  </h1>
                </div>
                <div className="rounded-2xl px-3 py-1 text-xs glass">
                  {progress}%
                </div>
              </div>

              <div className="mt-5 h-2 w-full rounded-full bg-white/10">
                <motion.div
                  className="h-2 rounded-full"
                  style={{ background: "rgba(168, 85, 247, 0.9)" }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.25 }}
                />
              </div>

              <p className="mt-4 text-xs text-muted">
                Loading experience modules • Motion • Components • Data
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}