"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { CHAPTERS, FIRST_PROJECT_INDEX } from "@/content/chapters";
import { PROJECTS } from "@/content/projects";
import {
  measureChapters,
  resolveChapter,
  type ChapterRange,
} from "./measure";
import { progressMV, chapterTMV, scrollState } from "./store";

/**
 * The single scroll authority.
 *
 * Lenis owns window scroll. Nothing else in the app listens to scroll or wheel
 * — the previous site had three systems competing for the same gesture (Lenis,
 * a rect-polling scroll listener in the navbar, and a capture-phase non-passive
 * wheel hijack in the terminal), and the fix is structural rather than
 * disciplinary: there is exactly one subscriber, and it lives here.
 *
 * Renders no DOM of its own (root Lenis drives window), so wrapping the server
 * -rendered tree in it costs nothing and causes no hydration mismatch.
 */
export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        // Reduced motion still scrolls — it just arrives immediately.
        smoothWheel: !reduced,
        lerp: reduced ? 1 : 0.1,
        syncTouch: false,
      }}
    >
      <ScrollDriver reduced={reduced} />
      {children}
    </ReactLenis>
  );
}

function ScrollDriver({ reduced }: { reduced: boolean }) {
  const lenis = useLenis();
  const ranges = useRef<ChapterRange[]>([]);
  const lastChapter = useRef(-1);

  /** Re-measure on anything that can change layout. */
  const remeasure = useCallback(() => {
    ranges.current = measureChapters();
  }, []);

  useEffect(() => {
    remeasure();

    // Fonts land after first paint and change every section's height.
    document.fonts?.ready.then(remeasure).catch(() => {});

    const ro = new ResizeObserver(remeasure);
    ro.observe(document.body);

    // iOS Safari's address bar resizes the visual viewport without firing
    // a window resize, which silently invalidates every measured range.
    window.visualViewport?.addEventListener("resize", remeasure);

    return () => {
      ro.disconnect();
      window.visualViewport?.removeEventListener("resize", remeasure);
    };
  }, [remeasure]);

  /* The one scroll subscriber in the app. */
  useLenis((instance) => {
    const progress = instance.progress || 0;
    scrollState.progress = progress;
    scrollState.velocity = instance.velocity;
    progressMV.set(progress);

    const { index, t } = resolveChapter(
      instance.scroll,
      window.innerHeight,
      ranges.current,
    );
    scrollState.chapterIndex = index;
    scrollState.chapterT = t;
    chapterTMV.set(t);

    // Cold path: only on an actual chapter change, and written straight to the
    // DOM so the server-rendered Nav stays a Server Component.
    if (index !== lastChapter.current) {
      lastChapter.current = index;
      markCurrentChapter(index);
    }
  });

  /*
   * Route every in-page anchor through Lenis.
   * A click listener, not a scroll one — the single-authority rule is intact.
   * This is what the previous site was missing: its nav anchors jumped
   * instantly, bypassing smooth scroll entirely.
   */
  useEffect(() => {
    if (!lenis) return;

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.<HTMLAnchorElement>('a[href^="#"]');
      const id = anchor?.getAttribute("href")?.slice(1);
      if (!id) return;

      const element = document.getElementById(id);
      if (!element) return;

      event.preventDefault();
      lenis.scrollTo(element, { duration: reduced ? 0 : 1.4 });
      history.pushState(null, "", `#${id}`);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis, reduced]);

  /*
   * Deep links. ?module=<slug> and #hash both land on the right sheet — a
   * recruiter can be sent straight to one project.
   */
  useEffect(() => {
    if (!lenis) return;
    const slug = new URLSearchParams(window.location.search).get("module");
    const project = slug ? PROJECTS.find((p) => p.slug === slug) : undefined;
    const id = project ? `project-${project.id}` : window.location.hash.slice(1);
    if (!id) return;

    // After fonts and layout settle, or the target has moved.
    const timer = window.setTimeout(() => {
      const element = document.getElementById(id);
      if (element) lenis.scrollTo(element, { immediate: true });
    }, 120);
    return () => window.clearTimeout(timer);
  }, [lenis]);

  return null;
}

/**
 * Mark the active nav link with aria-current.
 *
 * Written directly to the DOM rather than through React so Nav can stay a
 * Server Component. The four project chapters all map to the single collapsed
 * "Projects" nav entry.
 */
function markCurrentChapter(index: number) {
  const chapter = CHAPTERS[index];
  if (!chapter) return;

  const navId =
    chapter.kind === "project"
      ? (CHAPTERS[FIRST_PROJECT_INDEX]?.id ?? chapter.id)
      : chapter.id;

  document
    .querySelectorAll<HTMLAnchorElement>("[data-nav] a[href^='#']")
    .forEach((link) => {
      const isCurrent = link.getAttribute("href") === `#${navId}`;
      if (isCurrent) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
}
