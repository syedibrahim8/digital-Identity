"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Github, Linkedin, Twitter, ArrowRight } from "lucide-react";

const EMAIL = "syedibrahimofficial1@gmail.com";

const socials = [
  { label: "LinkedIn", icon: <Linkedin size={15} />, href: "https://www.linkedin.com/in/syed-ibrahim-ali-57975a388/" },
  { label: "GitHub", icon: <Github size={15} />, href: "https://github.com/syedibrahim8" },
  { label: "Twitter", icon: <Twitter size={15} />, href: "https://x.com/syedibrahimx8" },
];

export default function ContactCTA() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); } catch { }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      {/* ── Gradient border wrapper using conic-spin ── */}
      <motion.div
        className="relative rounded-3xl p-[1px] overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65 }}
      >
        {/* Animated conic border */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: "conic-gradient(from 0deg, #a855f7 0%, #38bdf8 25%, #f472b6 50%, #a855f7 75%, #38bdf8 100%)",
            animation: "borderSpin 4s linear infinite",
          }}
        />

        {/* Inner card */}
        <div className="relative rounded-[22px] overflow-hidden" style={{ background: "rgb(8,8,12)" }}>
          {/* Background blobs */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl" style={{ background: "rgba(168,85,247,0.12)" }} />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl" style={{ background: "rgba(56,189,248,0.10)" }} />
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full blur-[80px]" style={{ background: "rgba(251,113,133,0.06)" }} />

          {/* Scan line animation */}
          <div className="pointer-events-none absolute left-0 right-0 h-20"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(168,85,247,0.04), transparent)",
              animation: "scanline 4s linear infinite",
              top: "-10%",
            }}
          />

          <div className="relative p-8 md:p-14">
            {/* Header */}
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-purple-400">
                  Let's build something serious
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-tighter md:text-5xl lg:text-6xl">
                  Want me on your team?
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-fade">
                  Open to roles where I can build real products, strong systems,
                  and premium UX. Fullstack · product-minded · ready to ship.
                </p>
              </div>

              {/* Side decoration */}
              <div className="flex flex-shrink-0 flex-col items-center gap-2 opacity-60">
                <div className="h-16 w-px" style={{ background: "linear-gradient(to bottom,transparent,rgba(168,85,247,0.7))" }} />
                <div className="h-3 w-3 rounded-full bg-purple-400" />
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-3">
              <motion.button
                onClick={copy}
                className="group relative flex items-center gap-2 overflow-hidden rounded-2xl px-7 py-3.5 text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg,#a855f7,#818cf8)" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
                <span className="relative flex items-center gap-2">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied!" : "Copy Email"}
                </span>
              </motion.button>

              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass flex items-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-bold text-fade transition hover:glow-border hover:text-white"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {s.icon}
                  {s.label}
                </motion.a>
              ))}
            </div>

            {/* Email display */}
            <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="pulse-dot" style={{ background: "#a855f7", boxShadow: "0 0 0 0 rgba(168,85,247,0.5)" }} />
                <span className="text-xs sm:text-sm text-fade whitespace-nowrap">Direct email:</span>
              </div>
              <span className="font-mono text-xs sm:text-sm font-bold text-white/85 break-all sm:break-normal">
                {EMAIL}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}