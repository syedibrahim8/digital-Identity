"use client";

import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { CHAPTERS, TOTAL_WEIGHT } from "@/content/chapters";
import { progressMV } from "@/lib/scroll/store";
import { scrollState } from "@/lib/scroll/store";

/**
 * Progress, drawn as a dimension line.
 *
 * Zero React renders: the marker binds to a derived MotionValue (framer writes
 * the style outside React) and the sheet readout is written to a ref's
 * textContent from the scroll callback. Nothing here calls setState.
 */

/** Tick positions, from chapter weights — the same weights that size the DOM. */
const TICKS = (() => {
  let acc = 0;
  return CHAPTERS.map((chapter) => {
    const at = acc / TOTAL_WEIGHT;
    acc += chapter.weight;
    return { id: chapter.id, at };
  });
})();

export function ScrollRail() {
  const readout = useRef<HTMLSpanElement>(null);
  const lastIndex = useRef(-1);

  const top = useTransform(progressMV, (p) => `${Math.min(1, Math.max(0, p)) * 100}%`);

  useLenis(() => {
    const index = scrollState.chapterIndex;
    if (index === lastIndex.current || !readout.current) return;
    lastIndex.current = index;
    readout.current.textContent = CHAPTERS[index]?.sheet ?? "--";
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-1/2 right-5 z-40 hidden h-[38vh] -translate-y-1/2 lg:block"
    >
      {/* Extension line. */}
      <div className="bg-construct absolute inset-y-0 left-1/2 w-px -translate-x-1/2" />

      {/* Terminators, as a dimension line carries. */}
      <div className="bg-object absolute top-0 left-1/2 h-px w-2.5 -translate-x-1/2" />
      <div className="bg-object absolute bottom-0 left-1/2 h-px w-2.5 -translate-x-1/2" />

      {/* One tick per sheet. */}
      {TICKS.map((tick) => (
        <div
          key={tick.id}
          className="bg-construct absolute left-1/2 h-px w-1.5 -translate-x-1/2"
          style={{ top: `${tick.at * 100}%` }}
        />
      ))}

      {/* The travelling marker, with the live sheet number beside it. */}
      <motion.div
        style={{ top }}
        className="absolute left-1/2 flex -translate-x-1/2 items-center"
      >
        <span className="bg-annotate block size-1.5 rotate-45" />
        {/* Label sits inboard of the marker: the rail hugs the right edge. */}
        <span
          ref={readout}
          className="dimension absolute right-3.5"
          data-figures="tabular"
        >
          00
        </span>
      </motion.div>
    </div>
  );
}
