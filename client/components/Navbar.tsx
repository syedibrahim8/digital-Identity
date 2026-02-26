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
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Active section detection
      const sections = links.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) {
          setActive(`#${id}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="sticky top-0 z-50 w-full"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div
          className={`mt-3 flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 sm:px-5 sm:py-3 transition-all duration-500 ${scrolled
              ? "glass-strong shadow-[0_8px_40px_rgba(168,85,247,0.12)]"
              : "glass"
            }`}
        >
          {/* Logo */}
          <a href="#top" className="group flex min-w-0 items-center gap-2">
            <div
              className="h-6 w-6 shrink-0 rounded-lg sm:h-7 sm:w-7"
              style={{ background: "linear-gradient(135deg,#a855f7,#38bdf8)" }}
            />
            <span className="truncate text-base font-extrabold tracking-tight sm:text-lg">
              <span className="grad-purple">Ibrahim</span>
              <span className="text-fade text-xs sm:text-sm">.portfolio</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`relative rounded-xl px-3 py-1.5 text-sm font-medium transition-all duration-200
                  ${active === l.href
                    ? "text-white"
                    : "text-fade hover:text-white"}`}
              >
                {active === l.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)" }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="hidden items-center gap-2 md:flex">
            {[
              { href: "https://github.com/syedibrahim8", icon: <Github size={15} />, label: "GitHub" },
              { href: "https://www.linkedin.com/in/syed-ibrahim-ali-57975a388/", icon: <Linkedin size={15} />, label: "LinkedIn" },
              { href: "mailto:syedibrahimofficial1@gmail.com", icon: <Mail size={15} />, label: "Email" },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="glass rounded-xl p-2 text-fade transition-all hover:glow-border hover:text-white hover:scale-110"
              >
                {icon}
              </a>
            ))}

            <a
              href="#contact"
              className="ml-1 rounded-xl px-4 py-2 text-xs font-bold text-white transition hover:opacity-90 hover:scale-105"
              style={{ background: "linear-gradient(135deg,#a855f7,#818cf8)" }}
            >
              Hire me
            </a>
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
              className="glass-strong mt-2 rounded-2xl px-4 py-4 md:hidden"
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 text-sm font-medium transition border-b border-white/5 last:border-0
                    ${active === l.href ? "text-white" : "text-fade hover:text-white"}`}
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-3 flex gap-2 pt-2">
                <a
                  href="#contact"
                  className="flex-1 rounded-xl px-4 py-2.5 text-center text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg,#a855f7,#818cf8)" }}
                  onClick={() => setOpen(false)}
                >
                  Hire me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}