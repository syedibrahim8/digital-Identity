"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FEATURED_PROJECTS } from "@/lib/projects";
import { motion } from "framer-motion";

type Line = { type: "sys" | "out" | "err" | "cmd"; text: string };

const COMMANDS: Record<
  string,
  (projects: typeof FEATURED_PROJECTS) => string[]
> = {
  help: () => [
    "╔═══════════════════════════════════════════╗",
    "║       IbrahimOS — Available Commands      ║",
    "╠═══════════════════════════════════════════╣",
    "║  help       list all commands             ║",
    "║  whoami     display identity              ║",
    "║  projects   show featured projects        ║",
    "║  skills     tech stack overview           ║",
    "║  stack      full environment details      ║",
    "║  about      background & philosophy       ║",
    "║  contact    how to reach me               ║",
    "║  clear      clear the terminal            ║",
    "╚═══════════════════════════════════════════╝",
  ],
  whoami: () => [
    "  ibrahim — fullstack engineer, systems builder",
    "  status  — available for hire",
    "  mission — ship premium products with serious engineering",
  ],
  projects: (projs) => [
    "  FEATURED PROJECTS",
    "  " + "─".repeat(42),
    ...projs.flatMap((p, i) => [
      `  [${i + 1}] ${p.title}`,
      `      ${p.punchline}`,
      `      tags: ${p.tags.join(" · ")}`,
      "",
    ]),
  ],
  skills: () => [
    "  Core   ── TypeScript · Next.js · React · Node · MongoDB · Stripe",
    "  Tools  ── Express · JWT · Zod · REST APIs · Framer Motion",
    "  Ops    ── Git · Vercel · Render · Postman",
  ],
  stack: () => [
    "  Frontend  ── Next.js · React · TypeScript · Tailwind v4",
    "  Backend   ── Node.js · Express · MongoDB · Stripe · Zod · JWT",
    "  Package   ── npm/pnpm · ESLint · Turbopack",
    "  Deploy    ── AWS · Vercel · DigitalOcean · Hostinger ",
  ],
  about: () => [
    "  I don't just ship screens. I build systems.",
    "  Data models · workflows · timing windows · integrations",
    "  — wrapped in UI that feels premium.",
  ],
  contact: () => [
    "  Email    ── syedibrahimofficial1@gmail.com",
    "  GitHub   ── github.com/syedibrahim8",
    "  LinkedIn ── linkedin.com/in/syed-ibrahim-ali-57975a388",
    "  Status   ── open to new opportunities",
  ],
};

const INIT: Line[] = [
  { type: "sys", text: "IbrahimOS v2.0 ─ Fullstack Edition" },
  {
    type: "sys",
    text: `Last login: ${new Date().toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric" })}.`,
  },
  { type: "sys", text: "" },
  { type: "out", text: '  Type "help" to see available commands.' },
  { type: "sys", text: "" },
];

export default function TerminalSection() {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>(INIT);
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<HTMLDivElement>(null);
  const wheelTargetRef = useRef(0);
  const wheelRafRef = useRef<number | null>(null);
const stickRef = useRef(true);

  useEffect(() => {
  const el = outputRef.current;
  if (!el) return;

  const onScroll = () => {
    const nearBottom =
    el.scrollHeight - el.scrollTop - el.clientHeight < 40; // threshold
    stickRef.current = nearBottom;
  };

  el.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // init

  return () => el.removeEventListener("scroll", onScroll);
}, []);

useEffect(() => {
  const el = outputRef.current;
  if (!el) return;

  if (stickRef.current) {
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }
}, [lines])

 useEffect(() => {
  const term = termRef.current;
  const out = outputRef.current;
  if (!term || !out) return;

  // initialize target to current
  wheelTargetRef.current = out.scrollTop;

  const step = () => {
    const el = outputRef.current;
    if (!el) return;

    const current = el.scrollTop;
    const target = wheelTargetRef.current;

    // easing (0.18–0.28 feels great)
    const next = current + (target - current) * 0.21;

    el.scrollTop = next;

    if (Math.abs(target - next) > 0.5) {
      wheelRafRef.current = requestAnimationFrame(step);
    } else {
      el.scrollTop = target;
      wheelRafRef.current = null;
    }
  };

  const onWheel = (e: WheelEvent) => {
    const targetNode = e.target as Node | null;
    if (!targetNode || !term.contains(targetNode)) return;

    e.preventDefault();
    e.stopPropagation();

    // update the target scroll position
    const max = out.scrollHeight - out.clientHeight;
    const speed = 1.2; // increase to 1.2 if you want it faster
    wheelTargetRef.current = Math.max(
      0,
      Math.min(max, wheelTargetRef.current + e.deltaY * speed)
    );

    // start animation loop if not running
    if (wheelRafRef.current == null) {
      wheelRafRef.current = requestAnimationFrame(step);
    }
  };

  document.addEventListener("wheel", onWheel, { passive: false, capture: true });

  return () => {
    document.removeEventListener("wheel", onWheel, true);
    if (wheelRafRef.current != null) cancelAnimationFrame(wheelRafRef.current);
  };
}, []);

useEffect(() => {
  const term = termRef.current;
  if (!term) return;

  const onTouchMove = (e: TouchEvent) => {
    const target = e.target as Node | null;
    if (!target || !term.contains(target)) return;
    e.preventDefault();
  };

  document.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });

  return () => {
    document.removeEventListener("touchmove", onTouchMove, true);
  };
}, []);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setHistory((h) => [cmd, ...h]);
    setHIdx(-1);

    if (cmd === "clear") {
      setLines(INIT);
      return;
    }

    const handler = COMMANDS[cmd];
    if (handler) {
      setLines((p) => [
        ...p,
        ...handler(FEATURED_PROJECTS).map((t) => ({
          type: "out" as const,
          text: t,
        })),
        { type: "sys", text: "" },
      ]);
    } else {
      setLines((p) => [
        ...p,
        { type: "err", text: `  bash: ${cmd}: command not found. Try "help".` },
        { type: "sys", text: "" },
      ]);
    }
    // scrollBottom();
  };

  const lineColor = (type: Line["type"]) => {
    if (type === "cmd") return "text-white/90";
    if (type === "err") return "text-rose-400";
    if (type === "out") return "text-emerald-300";
    return "text-white/40";
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      {/* Header */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-purple-400">
          Interactive
        </p>
        <h2 className="mt-3 text-4xl font-black tracking-tighter md:text-5xl">
          Terminal <span className="grad-sky">mode</span>.
        </h2>
        <p className="mt-3 max-w-2xl text-base text-fade">
          Try{" "}
          <code className="rounded-md bg-white/10 px-1.5 py-0.5 text-xs text-purple-300 font-mono">
            help
          </code>
          ,{" "}
          <code className="rounded-md bg-white/10 px-1.5 py-0.5 text-xs text-purple-300 font-mono">
            whoami
          </code>
          ,{" "}
          <code className="rounded-md bg-white/10 px-1.5 py-0.5 text-xs text-purple-300 font-mono">
            projects
          </code>
          .
        </p>
      </motion.div>

      {/* Terminal */}
      <motion.div
        ref={termRef}
        className="glass-strong rounded-3xl shadow-soft overflow-hidden border border-white/10 overscroll-contain"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between border-b border-white/10 px-5 py-3"
          style={{ background: "rgba(0,0,0,0.3)" }}
        >
          <div className="flex gap-1.5">
            <span
              className="h-3 w-3 rounded-full cursor-pointer hover:opacity-80 transition"
              style={{ background: "#ff5f57" }}
            />
            <span
              className="h-3 w-3 rounded-full cursor-pointer hover:opacity-80 transition"
              style={{ background: "#febc2e" }}
            />
            <span
              className="h-3 w-3 rounded-full cursor-pointer hover:opacity-80 transition"
              style={{ background: "#28c840" }}
            />
          </div>
          <p className="font-mono text-[11px] text-white/35">
            ibrahim@portfolio ─ zsh
          </p>
          <div className="w-16 text-right">
            <span className="text-[10px] text-white/20 font-mono">⌘K</span>
          </div>
        </div>

        {/* Output area */}
        <div
          ref={outputRef}
          className="h-[420px] cursor-text overflow-y-auto overscroll-contain p-5 font-mono text-sm"
          onClick={() => inputRef.current?.focus()}
          style={{ background: "rgba(0,0,0,0.2)" }}
        >
          {lines.map((l, i) => (
            <div
              key={i}
              className={`whitespace-pre-wrap leading-[1.7] ${lineColor(l.type)}`}
            >
              {l.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input row */}
        <div
          className="border-t border-white/10"
          style={{ background: "rgba(0,0,0,0.3)" }}
        >
          <form
            className="flex items-center gap-2 px-5 py-3"
            onSubmit={(e) => {
              e.preventDefault();
              const cmd = input.trim();
              if (cmd) {
                setLines((p) => [...p, { type: "cmd", text: `❯ ${cmd}` }]);
                setInput("");
                run(cmd);
              }
            }}
          >
            <span className="font-mono text-purple-400 select-none">❯</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  const next = Math.min(hIdx + 1, history.length - 1);
                  setHIdx(next);
                  setInput(history[next] ?? "");
                }
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  const next = Math.max(hIdx - 1, -1);
                  setHIdx(next);
                  setInput(next === -1 ? "" : (history[next] ?? ""));
                }
              }}
              className="flex-1 bg-transparent font-mono text-sm text-white/90 caret-purple-400 outline-none placeholder:text-white/20"
              placeholder="type a command…"
              autoComplete="off"
              spellCheck={false}
              autoFocus
            />
            <span className="animate-blink h-4 w-0.5 rounded-full bg-purple-400 select-none" />
          </form>
        </div>
      </motion.div>
    </div>
  );
}
