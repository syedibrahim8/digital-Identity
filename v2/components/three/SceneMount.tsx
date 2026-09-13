"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { detectTier, type Tier } from "@/lib/quality/detectTier";

/**
 * The client boundary for the 3D scene.
 *
 * dynamic(..., { ssr: false }) must be called from inside a Client Component —
 * Next 16 hard-errors when a Server Component does it. Keeping that one line
 * here is the entire reason this file exists.
 *
 * Tier 0 mounts nothing at all: no canvas, no WebGL context, no 3D chunk
 * downloaded. The SVG drawings already carry every chapter, so that path is a
 * complete site rather than a degraded one.
 */
const SceneCanvas = dynamic(() => import("./SceneCanvas"), { ssr: false });

/* Probed once per session: detectTier allocates a canvas to test WebGL2. */
let cached: Tier | null = null;
function getTier(): Tier {
  if (cached === null) cached = detectTier();
  return cached;
}

/* Capability never changes mid-session, so there is nothing to subscribe to. */
const subscribe = () => () => {};
const serverTier = (): Tier => 0;

export function SceneMount() {
  // useSyncExternalStore rather than setState-in-effect: it renders the server
  // snapshot during hydration and swaps after, without a cascading render.
  const tier = useSyncExternalStore(subscribe, getTier, serverTier);

  if (tier === 0) return null;
  return <SceneCanvas tier={tier} />;
}
