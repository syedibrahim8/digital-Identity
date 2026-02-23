"use client";

import { useMemo, useRef, useState } from "react";
import { FEATURED_PROJECTS } from "@/lib/projects";

type OutputLine = { type: "sys" | "out" | "err"; text: string };

const COMMANDS: Record<string, (args: string, projects: typeof FEATURED_PROJECTS) => string[]> = {
  help: () => [
    "┌─ Available commands ─────────────────────────────┐",
    "│  help       — list all commands                  │",
    "│  projects   — show featured projects             │",
    "│  skills     — list tech stack                    │",
    "│  about      — who is Ibrahim?                    │",
    "│  contact    — get in touch                       │",
    "│  whoami     — display identity                   │",
    "│  stack      — full tech stack                    │",
    "│  clear      — clear terminal                     │",
    "└──────────────────────────────────────────────────┘",
  ],
  projects: (_, projs) =>
    projs.flatMap((p) => [
      `▸ ${p.title}`,
      `  ${p.punchline}`,
      `  Tags: ${p.tags.join(", ")}`,
      "",
    ]),
  skills: () => [
    "Core   → TypeScript, Next.js, React, Node.js, MongoDB, Stripe",
    "Tools  → Express, JWT, Zod, Cron Jobs, REST APIs, Framer Motion",
    "Ops    → Git, Vercel, Render, Postman",
  ],
  about: () => [
    "Ibrahim — Fullstack Engineer & Systems Builder",
    "Specialises in MERN · TypeScript · Stripe Payments · Architecture",
    "Product-minded. Ships clean systems with serious engineering underneath.",
  ],
  contact: () => [
    "Email  → your@email.com",
    "GitHub → github.com/ibrahim",
    "LinkedIn → linkedin.com/in/ibrahim",
  ],
  whoami: () => ["ibrahim — fullstack engineer, systems builder, occasional hacker."],
  stack: () => [
    "Frontend  → Next.js 15, React 19, TypeScript, Tailwind v4, Framer Motion",
    "Backend   → Node.js, Express, MongoDB, Stripe, Zod, JWT Cookies",
    "Tooling   → pnpm, ESLint, Vercel, Render, Git",
  ],
};

export default function TerminalSection() {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<OutputLine[]>([
    { type: "sys", text: "IbrahimOS v2.0 — type `help` to start" },
    { type: "sys", text: "" },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const run = (cmdRaw: string) => {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setLines([
        { type: "sys", text: "IbrahimOS v2.0 — type `help` to start" },
        { type: "sys", text: "" },
      ]);
      return;
    }

    const handler = COMMANDS[cmd];
    if (handler) {
      const output = handler(cmd, FEATURED_PROJECTS);
      setLines((p) => [
        ...p,
        ...output.map((t) => ({ type: "out" as const, text: t })),
        { type: "sys", text: "" },
      ]);
    } else {
      setLines((p) => [
        ...p,
        { type: "err", text: `Command not found: "${cmd}". Try "help".` },
        { type: "sys", text: "" },
      ]);
    }

    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 30);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
          Interactive
        </p>
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
          Terminal{" "}
          <span className="grad-sky">mode</span>.
        </h2>
        <p className="mt-4 max-w-2xl text-base text-fade">
          For the people who like keyboards. Try:{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-purple-300">help</code>,{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-purple-300">projects</code>,{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-purple-300">whoami</code>.
        </p>
      </div>

      <div className="glass glow-border rounded-3xl shadow-soft overflow-hidden">
        {/* Titlebar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-5 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
          </div>
          <p className="text-xs text-fade font-mono">/bin/ibrahim — zsh</p>
          <div className="w-16" />
        </div>

        {/* Output */}
        <div className="h-[340px] overflow-auto p-5 font-mono text-sm" id="terminal-output">
          {lines.map((l, i) => (
            <div
              key={i}
              className={`whitespace-pre-wrap leading-6 ${l.type === "sys"
                  ? "text-white/50"
                  : l.type === "err"
                    ? "text-rose-400"
                    : "text-emerald-300"
                }`}
            >
              {l.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-white/10 bg-white/[0.02]">
          <form
            className="flex items-center gap-2 px-5 py-3"
            onSubmit={(e) => {
              e.preventDefault();
              const cmd = input.trim();
              if (!cmd) return;
              setLines((p) => [
                ...p,
                { type: "sys", text: `\u276f ${cmd}` },
              ]);
              setInput("");
              run(cmd);
            }}
          >
            <span className="font-mono text-purple-400 select-none">❯</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent font-mono text-sm text-white/90 outline-none placeholder:text-white/25"
              placeholder="type a command…"
              autoComplete="off"
              spellCheck={false}
            />
          </form>
        </div>
      </div>
    </div>
  );
}