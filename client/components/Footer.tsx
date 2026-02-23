import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const links = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Terminal", href: "#terminal" },
  { label: "Skills", href: "#skills" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: <Github size={16} />, label: "GitHub", href: "https://github.com" },
  { icon: <Linkedin size={16} />, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: <Mail size={16} />, label: "Email", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
      <div className="neon-line opacity-40" />

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {/* Brand */}
        <div>
          <p className="text-lg font-extrabold tracking-tight">
            <span className="grad-purple">Ibrahim</span>
            <span style={{ color: "rgba(248,248,252,0.4)" }}>.dev</span>
          </p>
          <p className="mt-2 text-sm leading-relaxed text-fade">
            Product-minded fullstack engineer. Building systems that scale and
            experiences that feel premium.
          </p>
        </div>

        {/* Nav links */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-center">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-fade transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Social icons */}
        <div className="flex items-start gap-2 md:justify-end">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="glass rounded-xl p-2 text-fade transition hover:glow-border hover:text-white"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-fade">
        <p>© {new Date().getFullYear()} Ibrahim. Built with Next.js & Tailwind v4.</p>
        <a
          href="#top"
          className="flex items-center gap-1 transition hover:text-white"
          aria-label="Back to top"
        >
          Back to top
          <ArrowUp size={12} />
        </a>
      </div>
    </footer>
  );
}