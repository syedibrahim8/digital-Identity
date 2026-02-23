"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Terminal", href: "#terminal" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <motion.header
      className="sticky top-0 z-50"
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="mt-3 flex items-center justify-between rounded-3xl glass px-4 py-3">
          <a href="#top" className="font-semibold tracking-tight">
            Ibrahim<span className="text-muted">.dev</span>
          </a>

          <nav className="hidden gap-5 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted hover:text-white transition"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a className="glass rounded-2xl p-2 hover:glow-border transition" href="#" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a className="glass rounded-2xl p-2 hover:glow-border transition" href="#" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a className="glass rounded-2xl p-2 hover:glow-border transition" href="#contact" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}