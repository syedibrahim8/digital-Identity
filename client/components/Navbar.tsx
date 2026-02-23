"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Terminal", href: "#terminal" },
  { label: "Skills", href: "#skills" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="sticky top-0 z-50 w-full"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55 }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div
          className={`mt-3 flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300 ${scrolled ? "glass shadow-glow" : "glass"
            }`}
        >
          {/* Logo */}
          <a href="#top" className="group relative text-lg font-bold tracking-tight">
            <span className="grad-purple">Ibrahim</span>
            <span style={{ color: "rgba(248,248,252,0.45)" }}>.dev</span>
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-purple-400 to-indigo-400 transition-all duration-300 group-hover:w-full" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-sm text-fade transition hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-purple-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="hidden items-center gap-2 md:flex">
            {[
              { href: "https://github.com", icon: <Github size={16} />, label: "GitHub" },
              { href: "https://linkedin.com", icon: <Linkedin size={16} />, label: "LinkedIn" },
              { href: "#contact", icon: <Mail size={16} />, label: "Email" },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="glass rounded-xl p-2 text-fade transition hover:glow-border hover:text-white"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Mobile burger */}
          <button
            className="glass rounded-xl p-2 md:hidden"
            onClick={() => setOpen((x) => !x)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="glass mt-2 rounded-2xl px-4 py-4 md:hidden"
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.22 }}
            >
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-sm text-fade transition hover:text-white"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-3 flex gap-3 border-t border-white/10 pt-3">
                {[
                  { href: "https://github.com", label: "GitHub" },
                  { href: "https://linkedin.com", label: "LinkedIn" },
                ].map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="glass rounded-xl px-4 py-2 text-xs text-fade hover:text-white"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}