"use client";

import { useMemo, useState } from "react";
import { FEATURED_PROJECTS } from "@/lib/projects";

type OutputLine = { type: "sys" | "out"; text: string };

export default function TerminalSection() {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<OutputLine[]>([
    { type: "sys", text: "IbrahimOS v1.0 — type `help`" },
  ]);

  const help = useMemo(
    () => [
      "help — list commands",
      "projects — show featured projects",
      "skills — jump to skills section",
      "about — jump to about section",
      "contact — jump to contact section",
      "clear — clear terminal",
    ],
    []
  );

  const run = (cmdRaw: string) => {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setLines([{ type: "sys", text: "IbrahimOS v1.0 — type `help`" }]);
      return;
    }

    if (cmd === "help") {
      setLines((p) => [...p, { type: "out", text: help.join("\n") }]);
      return;
    }

    if (cmd === "projects") {
      const out = FEATURED_PROJECTS.map((p) => `• ${p.title} — ${p.tags.slice(0, 3).join(", ")}`).join("\n");
      setLines((p) => [...p, { type: "out", text: out }]);
      return;
    }

    const jump = (id: string) => {
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setLines((p) => [...p, { type: "out", text: `→ Navigating to ${id}` }]);
    };

    if (cmd === "skills") return jump("#skills");
    if (cmd === "about") return jump("#about");
    if (cmd === "contact") return jump("#contact");

    setLines((p) => [...p, { type: "out", text: `Unknown command: ${cmd}` }]);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
        Terminal <span style={{ color: "rgba(168,85,247,0.95)" }}>mode</span>.
      </h2>
      <p className="mt-3 text-muted max-w-2xl">
        For the people who actually like keyboards. Try: <span className="font-medium">help</span>,{" "}
        <span className="font-medium">projects</span>, <span className="font-medium">skills</span>.
      </p>

      <div className="mt-7 glass glow-border rounded-3xl shadow-soft overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-white/20" />
            <span className="h-3 w-3 rounded-full bg-white/20" />
            <span className="h-3 w-3 rounded-full bg-white/20" />
          </div>
          <p className="text-xs text-muted">/bin/ibrahim</p>
        </div>

        <div className="p-4 font-mono text-sm">
          <div className="max-h-[280px] overflow-auto whitespace-pre-wrap text-muted">
            {lines.map((l, i) => (
              <div key={i} className={l.type === "sys" ? "text-white/80" : ""}>
                {l.text}
              </div>
            ))}
          </div>

          <form
            className="mt-4 flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const cmd = input;
              setLines((p) => [...p, { type: "sys", text: `> ${cmd}` }]);
              setInput("");
              run(cmd);
            }}
          >
            <span className="text-white/70">$</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-transparent outline-none text-white/90 placeholder:text-white/30"
              placeholder="type a command…"
            />
          </form>
        </div>
      </div>
    </div>
  );
}