import { motionValue } from "framer-motion";

/**
 * Scroll state, in two tiers.
 *
 * HOT — a plain mutable singleton, written every scroll frame and read by
 * whoever needs it. Deliberately not React state: this changes at 60Hz, and a
 * setState here would re-render the tree every frame. (The previous site did
 * exactly that in CountUp, twelve instances at once.)
 *
 * WARM — MotionValues. framer-motion writes these straight to the DOM outside
 * React, so a bound element animates with zero renders.
 *
 * House rule: if a value changes every frame, it must not be React state.
 */

export type ScrollState = {
  /** 0..1 across the whole document. */
  progress: number;
  velocity: number;
  /** Index into CHAPTERS. */
  chapterIndex: number;
  /** 0..1 within the current chapter. Drives the camera dwell in Phase 2. */
  chapterT: number;
};

export const scrollState: ScrollState = {
  progress: 0,
  velocity: 0,
  chapterIndex: 0,
  chapterT: 0,
};

export const progressMV = motionValue(0);
export const chapterTMV = motionValue(0);
