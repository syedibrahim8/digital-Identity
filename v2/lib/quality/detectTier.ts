/**
 * Device capability, decided once on the client.
 *
 * Phase 2 needs only the on/off decision; the full four-tier ladder with a
 * frame-time probe arrives in Phase 7. What matters now is that tier 0 is a
 * real, complete site rather than a broken one — the canvas simply never
 * mounts, and the SVG drawings carry every chapter.
 */

export type Tier = 0 | 1 | 2 | 3;

export function detectTier(): Tier {
  if (typeof window === "undefined") return 0;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;

  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  if (connection?.saveData) return 0;

  // WebGL2 or nothing: the fallback is already good, so there is no reason to
  // ship a degraded WebGL1 path.
  try {
    const canvas = document.createElement("canvas");
    if (!canvas.getContext("webgl2")) return 0;
  } catch {
    return 0;
  }

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  if (cores <= 4 || memory <= 4 || coarse) return 1;
  return 2;
}
