import type Lenis from "lenis";
import { CHAPTERS, FIRST_PROJECT_INDEX } from "@/content/chapters";
import { resolveChapter } from "./measure";
import { chapterTMV, progressMV, ranges, scrollState } from "./store";

/**
 * Write scroll state for one frame.
 *
 * Lives in one place because there are two possible drivers — Lenis' own rAF
 * when there is no canvas, and R3F's frame loop when there is — and they must
 * produce identical state. Only one is ever active.
 */

let lastChapter = -1;

export function commitScroll(lenis: Lenis) {
  const progress = lenis.progress || 0;
  scrollState.progress = progress;
  scrollState.velocity = lenis.velocity;
  progressMV.set(progress);

  const { index, t } = resolveChapter(
    lenis.scroll,
    window.innerHeight,
    ranges.current,
  );
  scrollState.chapterIndex = index;
  scrollState.chapterT = t;
  chapterTMV.set(t);

  if (index !== lastChapter) {
    lastChapter = index;
    markCurrentChapter(index);
  }
}

/**
 * Mark the active nav link with aria-current.
 *
 * Written directly to the DOM rather than through React so Nav can stay a
 * Server Component. The project chapters all map to the single collapsed
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
