"use client";

import { useCallback, useEffect, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { PROJECTS } from "@/content/projects";
import { useUIStore } from "@/lib/state/ui";
import { commitScroll } from "./commit";
import { measureChapters } from "./measure";
import { lenisHandle, ranges } from "./store";

/**
 * The single scroll authority.
 *
 * Lenis owns window scroll. Nothing else in the app listens to scroll or wheel
 * — the previous site had three systems competing for the same gesture (Lenis,
 * a rect-polling scroll listener in the navbar, and a capture-phase non-passive
 * wheel hijack in the terminal), and the fix is structural rather than
 * disciplinary: there is exactly one subscriber.
 *
 * There is also exactly one frame loop. When the 3D canvas is mounted it owns
 * the loop and ticks Lenis from inside it; when there is no canvas (tier 0,
 * reduced motion, no WebGL) Lenis runs its own. Never both.
 *
 * Renders no DOM of its own, so wrapping the server-rendered tree costs nothing
 * and causes no hydration mismatch.
 */
export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false);
  const canvasDriving = useUIStore((s) => s.canvasDriving);

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
        // Handed to R3F's loop the moment the canvas mounts.
        autoRaf: !canvasDriving,
      }}
    >
      <ScrollDriver reduced={reduced} canvasDriving={canvasDriving} />
      {children}
    </ReactLenis>
  );
}

function ScrollDriver({
  reduced,
  canvasDriving,
}: {
  reduced: boolean;
  canvasDriving: boolean;
}) {
  const lenis = useLenis();
  const remeasure = useCallback(() => {
    ranges.current = measureChapters();
  }, []);

  /* Publish the instance as a module singleton: the R3F canvas is a separate
     reconciler root, and reaching across it via context is a dependency we do
     not need to take. */
  useEffect(() => {
    lenisHandle.current = lenis ?? null;
    return () => {
      lenisHandle.current = null;
    };
  }, [lenis]);

  useEffect(() => {
    remeasure();

    // Fonts land after first paint and change every section's height.
    document.fonts?.ready.then(remeasure).catch(() => {});

    const ro = new ResizeObserver(remeasure);
    ro.observe(document.body);

    // iOS Safari's address bar resizes the visual viewport without firing a
    // window resize, which silently invalidates every measured range.
    window.visualViewport?.addEventListener("resize", remeasure);

    return () => {
      ro.disconnect();
      window.visualViewport?.removeEventListener("resize", remeasure);
    };
  }, [remeasure]);

  /* Commit here only while Lenis owns the loop. With the canvas mounted, the
     driver inside it commits instead — so state is written exactly once. */
  useLenis((instance) => {
    if (canvasDriving) return;
    commitScroll(instance);
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

    const timer = window.setTimeout(() => {
      const element = document.getElementById(id);
      if (element) lenis.scrollTo(element, { immediate: true });
    }, 120);
    return () => window.clearTimeout(timer);
  }, [lenis]);

  return null;
}
