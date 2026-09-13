"use client";

import { Canvas } from "@react-three/fiber";
import { useScrollDriver } from "@/lib/scroll/useScrollDriver";
import { CameraRig } from "./CameraRig";
import { Machine } from "./Machine";
import { SheetGrid } from "./SheetGrid";
import type { Tier } from "@/lib/quality/detectTier";

/**
 * The canvas sits fixed behind the document and never receives pointer events,
 * so every link, button and text selection in the DOM above behaves normally.
 *
 * alpha: true — the vellum page background shows through, because the 3D is
 * drafting line over paper, not a scene with its own sky.
 */
function Driver() {
  useScrollDriver();
  return null;
}

export default function SceneCanvas({ tier }: { tier: Tier }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    >
      <Canvas
        dpr={tier >= 2 ? [1, 1.5] : 1}
        gl={{
          alpha: true,
          antialias: tier >= 2,
          powerPreference: "high-performance",
        }}
        camera={{ fov: 42, near: 0.1, far: 600 }}
        // No lights and no shading: everything is line geometry.
        flat
        /*
         * R3F's own wrapper sets an inline `pointer-events: auto`, which undoes
         * the `pointer-events-none` above — and the canvas then swallows clicks
         * on anything not stacked over z-0 (the footer, every project page).
         * Pointer and click input for the scene is read from `window` instead.
         */
        style={{ pointerEvents: "none" }}
      >
        <Driver />
        <CameraRig />
        <SheetGrid opacity={tier >= 2 ? 0.5 : 0.35} />
        <Machine tier={tier} />
        <fog attach="fog" args={["#f0efe8", 40, 240]} />
      </Canvas>
    </div>
  );
}
