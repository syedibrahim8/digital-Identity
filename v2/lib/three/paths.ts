import { CatmullRomCurve3, MathUtils, Vector3 } from "three";
import { STATIONS } from "./stations";

/**
 * The flight: two parallel curves, one for the camera and one for its gaze.
 *
 * Sampling both at the same parameter gives a continuous flight with no cuts,
 * while letting the camera bank between stations without the gaze wandering.
 *
 * getPointAt (arc-length parameterised), not getPoint: otherwise a scroll of
 * constant speed would visibly speed up and slow down wherever control points
 * happen to bunch.
 */

const cameraCurve = new CatmullRomCurve3(
  STATIONS.map((s) => s.camera),
  false,
  "catmullrom",
  0.5,
);

/* The gaze curve, not the subject curve — see Station.gaze. */
const targetCurve = new CatmullRomCurve3(
  STATIONS.map((s) => s.gaze),
  false,
  "catmullrom",
  0.5,
);

// Resolve arc length finely enough that long chapters don't sample coarsely.
cameraCurve.arcLengthDivisions = 800;
targetCurve.arcLengthDivisions = 800;

/**
 * Dwell warp.
 *
 * Linear progress would fly straight through every station at constant speed.
 * This holds the camera nearly still across the middle of a chapter — where the
 * copy is actually read — then moves quickly to the next. It is what makes the
 * flight feel like a guided tour rather than a dolly on rails.
 *
 * Input and output are both 0..1 within one chapter.
 */
const HOLD_UNTIL = 0.42;
const ARRIVE_BY = 0.94;

export function dwell(t: number): number {
  if (t <= HOLD_UNTIL) return 0;
  if (t >= ARRIVE_BY) return 1;
  const k = (t - HOLD_UNTIL) / (ARRIVE_BY - HOLD_UNTIL);
  // Smoothstep, so departure and arrival are both eased.
  return k * k * (3 - 2 * k);
}

const MAX_INDEX = Math.max(1, STATIONS.length - 1);

/**
 * Camera pose for a measured scroll position.
 *
 * Takes the chapter index and progress-within-chapter that the DOM measurement
 * already produced, rather than re-deriving position from raw scroll — so the
 * camera and the visible section cannot disagree.
 */
/**
 * Position along the flight, 0..1, matching station indices.
 *
 * This — not raw document scroll — is what anything positioned by station must
 * use. Chapter weights differ (the centrepiece is nearly twice a normal sheet),
 * so document progress and flight position drift apart, and driving the machine
 * by the wrong one puts its assembly front nowhere near the camera.
 */
export function flightParam(chapterIndex: number, chapterT: number): number {
  return MathUtils.clamp((chapterIndex + dwell(chapterT)) / MAX_INDEX, 0, 1);
}

export function sampleFlight(
  chapterIndex: number,
  chapterT: number,
  outCamera: Vector3,
  outTarget: Vector3,
) {
  const u = flightParam(chapterIndex, chapterT);
  cameraCurve.getPointAt(u, outCamera);
  targetCurve.getPointAt(u, outTarget);
}
