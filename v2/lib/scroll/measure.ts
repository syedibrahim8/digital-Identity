/**
 * Chapter boundaries, measured from the DOM — never hardcoded.
 *
 * The camera and the DOM both derive from this one measurement, which is what
 * makes them structurally incapable of drifting apart when copy changes or text
 * reflows at a different width.
 */

export type ChapterRange = {
  id: string;
  /** Document-space pixels. */
  start: number;
  end: number;
};

export function measureChapters(): ChapterRange[] {
  const scrollY = window.scrollY;
  return Array.from(
    document.querySelectorAll<HTMLElement>("[data-chapter]"),
  ).map((el) => {
    // getBoundingClientRect + scrollY, not offsetTop: offsetTop is relative to
    // the offsetParent, which sticky positioning makes unreliable.
    const rect = el.getBoundingClientRect();
    const start = rect.top + scrollY;
    return { id: el.dataset.chapter!, start, end: start + rect.height };
  });
}

/**
 * Which chapter is being read, and how far through it.
 *
 * The probe is the viewport centre rather than its top: with sticky content,
 * the centre is where the reader is actually looking.
 */
export function resolveChapter(
  scrollY: number,
  viewportHeight: number,
  ranges: ChapterRange[],
): { index: number; t: number } {
  if (ranges.length === 0) return { index: 0, t: 0 };

  const probe = scrollY + viewportHeight / 2;

  for (let i = 0; i < ranges.length; i++) {
    const { start, end } = ranges[i];
    if (probe < end || i === ranges.length - 1) {
      const span = end - start;
      const t = span > 0 ? (probe - start) / span : 0;
      return { index: i, t: Math.min(1, Math.max(0, t)) };
    }
  }

  return { index: ranges.length - 1, t: 1 };
}
