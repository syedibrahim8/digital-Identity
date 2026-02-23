"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Github, Linkedin, Send } from "lucide-react";

const EMAIL = "your@email.com";

const socials = [
  {
    label: "LinkedIn",
    icon: <Linkedin size={15} />,
    href: "https://linkedin.com/in/ibrahim",
    color: "#0a66c2",
  },
  {
    label: "GitHub",
    icon: <Github size={15} />,
    href: "https://github.com/ibrahim",
    color: "#ffffff",
  },
];

export default function ContactCTA() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <motion.div
        className="relative overflow-hidden rounded-3xl p-0.5 shadow-glow"
        style={{
          background:
            "linear-gradient(135deg, rgba(168,85,247,0.5) 0%, rgba(56,189,248,0.3) 50%, rgba(251,113,133,0.3) 100%)",
        }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65 }}
      >
        <div className="relative rounded-[22px] bg-[rgb(8,8,12)] p-8 md:p-12">
          {/* Background blobs */}
          <div
            className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full blur-3xl"
            style={{ background: "rgba(168,85,247,0.12)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full blur-3xl"
            style={{ background: "rgba(56,189,248,0.10)" }}
          />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
              Let's build something serious
            </p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
              Want me on your team?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-fade">
              I'm open to roles where I can build real products, strong systems, and
              premium UX. Fullstack, product-minded, ready to ship.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {/* Copy email */}
              <button
                onClick={copy}
                className="flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(168,85,247,1) 0%, rgba(129,140,248,1) 100%)",
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Email copied!" : "Copy Email"}
              </button>

              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-fade transition hover:glow-border hover:text-white"
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>

            {/* Email display */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm">
              <Send size={12} className="text-purple-400" />
              <span className="text-fade">Email:</span>
              <span className="font-medium text-white/85">{EMAIL}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}