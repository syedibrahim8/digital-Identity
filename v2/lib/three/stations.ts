import { Vector3 } from "three";
import { CHAPTERS } from "@/content/chapters";

/**
 * Where the camera stands for each chapter, and what it looks at.
 *
 * Derived from CHAPTERS rather than hand-listed: adding a project extends the
 * flight automatically, which is the same guarantee the DOM and the sheet
 * numbering already make.
 *
 * Layout is a slow descent with alternating lateral offset, so consecutive
 * chapters are never on the same side and the camera always has somewhere to
 * travel. Deterministic — no randomness, so the flight is identical every load.
 */

export type Station = {
  id: string;
  /** Where the subject sits in world space. */
  subject: Vector3;
  /** Where the camera stands. */
  camera: Vector3;
  /**
   * Where the camera looks — deliberately NOT the subject.
   *
   * Aiming at the subject centres it on screen every time, which puts the
   * geometry directly behind the copy and makes both harder to read. Aiming
   * to one side pushes the subject into the opposite third, so text and
   * drawing occupy different parts of the frame.
   */
  gaze: Vector3;
};

const DEPTH = 26; // travel along -Z per chapter
const DROP = 5.5; // descent per chapter
const SWING = 9; // lateral offset, alternating
const GAZE_BIAS = 7.5; // how far left of the subject the camera aims

export const STATIONS: Station[] = CHAPTERS.map((chapter, i) => {
  const side = i % 2 === 0 ? 1 : -1;
  // Ease the swing so the first and last chapters sit closer to centre.
  const taper = Math.sin((i / Math.max(1, CHAPTERS.length - 1)) * Math.PI);

  const subject = new Vector3(
    side * SWING * (0.35 + taper * 0.65),
    -i * DROP,
    -i * DEPTH,
  );

  const camera = new Vector3(
    subject.x - side * 4,
    subject.y + 2.6,
    subject.z + 26,
  );

  // Look left of the subject so it composes into the right of the frame,
  // opposite the copy column.
  const gaze = new Vector3(subject.x - GAZE_BIAS, subject.y - 0.6, subject.z);

  return { id: chapter.id, subject, camera, gaze };
});

export const STATION_COUNT = STATIONS.length;
