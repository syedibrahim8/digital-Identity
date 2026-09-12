"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { Search, CornerDownLeft } from "lucide-react";
import { CHAPTERS } from "@/content/chapters";
import { PROJECTS } from "@/content/projects";
import { SITE } from "@/content/site";

/**
 * The sheet index.
 *
 * This is the previous site's terminal, rebuilt as navigation rather than a
 * scroll hijack. That component installed a capture-phase, non-passive wheel
 * listener on document and ran its own inertia loop, which fought Lenis for
 * every gesture. This gives the same keyboard-first delight and touches the
 * wheel not at all: it routes through the one scroll authority.
 */

type Item = {
  id: string;
  label: string;
  hint: string;
  href: string;
  external?: boolean;
};

function buildItems(): Item[] {
  const items: Item[] = CHAPTERS.filter((c) => c.navLabel).map((c) => ({
    id: c.id,
    label: c.title,
    hint: c.kind === "project" ? "Sheet" : "Section",
    href: `#${c.id}`,
  }));

  for (const project of PROJECTS) {
    if (project.links.demo) {
      items.push({
        id: `${project.id}-demo`,
        label: `${project.title} — live`,
        hint: "Opens",
        href: project.links.demo,
        external: true,
      });
    }
    if (project.links.github) {
      items.push({
        id: `${project.id}-src`,
        label: `${project.title} — source`,
        hint: "Opens",
        href: project.links.github,
        external: true,
      });
    }
  }

  items.push(
    { id: "resume", label: "Resume", hint: "PDF", href: SITE.links.resume, external: true },
    { id: "email", label: SITE.links.email, hint: "Email", href: `mailto:${SITE.links.email}`, external: true },
    { id: "linkedin", label: "LinkedIn", hint: "Opens", href: SITE.links.linkedin, external: true },
    { id: "github", label: "GitHub", hint: "Opens", href: SITE.links.github, external: true },
  );

  return items;
}

const ITEMS: Item[] = buildItems();

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const lenis = useLenis();

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ITEMS;
    return ITEMS.filter((i) => i.label.toLowerCase().includes(q));
  }, [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    restoreFocus.current?.focus();
  }, []);

  const run = useCallback(
    (item: Item) => {
      if (item.external) {
        window.open(item.href, item.href.startsWith("mailto:") ? "_self" : "_blank", "noopener,noreferrer");
        close();
        return;
      }
      const element = document.getElementById(item.href.slice(1));
      close();
      if (element) {
        lenis?.scrollTo(element, { duration: 1.4 });
        history.pushState(null, "", item.href);
      }
    },
    [lenis, close],
  );

  /* Global open shortcut. Keydown only — never wheel, never scroll. */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const el = document.activeElement;
      const typing =
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el as HTMLElement | null)?.isContentEditable;

      const combo = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      const slash = event.key === "/" && !typing;

      if (combo || slash) {
        event.preventDefault();
        restoreFocus.current = document.activeElement as HTMLElement;
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Keep the highlighted row in view without scrolling the page behind it.
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => {
          restoreFocus.current = document.activeElement as HTMLElement;
          setOpen(true);
        }}
        className="border-object/30 bg-vellum/90 text-read-soft hover:border-annotate hover:text-annotate fixed bottom-5 left-5 z-40 hidden items-center gap-2 border px-3 py-2 backdrop-blur-sm transition-colors md:flex"
      >
        <Search aria-hidden="true" className="size-3.5" />
        <span className="lettering text-[10px]">Sheet index</span>
        <kbd className="dimension border-construct/60 border px-1 py-0.5">⌘K</kbd>
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          close();
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          setActive((i) => (results.length ? (i + 1) % results.length : 0));
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
        } else if (event.key === "Enter") {
          event.preventDefault();
          const item = results[active];
          if (item) run(item);
        } else if (event.key === "Tab") {
          // Only the input is focusable, so keep focus inside.
          event.preventDefault();
        }
      }}
    >
      <button
        type="button"
        aria-label="Close sheet index"
        onClick={close}
        className="bg-object/25 absolute inset-0 cursor-default"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Sheet index"
        className="border-object/40 bg-vellum relative w-full max-w-lg border shadow-lg"
      >
        <div className="border-object/20 flex items-center gap-3 border-b px-4 py-3">
          <Search aria-hidden="true" className="text-construct size-4 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            placeholder="Find a sheet, a project, a link"
            aria-label="Search sheets and links"
            className="text-object placeholder:text-construct w-full bg-transparent text-sm outline-none"
          />
          <kbd className="dimension border-construct/60 shrink-0 border px-1 py-0.5">ESC</kbd>
        </div>

        <ul ref={listRef} className="max-h-[50vh] overflow-y-auto" data-lenis-prevent>
          {results.length === 0 ? (
            <li className="text-read-soft px-4 py-6 text-sm">Nothing matches that.</li>
          ) : (
            results.map((item, index) => (
              <li key={item.id} data-index={index}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onClick={() => run(item)}
                  aria-current={index === active ? "true" : undefined}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    index === active ? "bg-vellum-tint" : ""
                  }`}
                >
                  <span className="dimension w-16 shrink-0">{item.hint}</span>
                  <span className="text-object truncate text-sm">{item.label}</span>
                  {index === active ? (
                    <CornerDownLeft aria-hidden="true" className="text-construct ml-auto size-3.5 shrink-0" />
                  ) : null}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
