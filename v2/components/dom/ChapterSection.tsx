import type { ReactNode } from "react";
import type { Chapter } from "@/content/chapters";
import { TitleBlock } from "./TitleBlock";

/**
 * One sheet of the drawing set.
 *
 * Height comes from the chapter's weight and the content sticks centred inside
 * it. That tall-section-with-sticky-content shape creates the dwell — the
 * reader holds still on the copy while scroll continues — and in Phase 2 it
 * becomes the band where the camera nearly stops. Both derive from the same
 * weight, so DOM and camera cannot disagree.
 *
 * Uses dvh, not vh: iOS Safari's address bar makes vh lie.
 */
export function ChapterSection({
  chapter,
  sheet,
  tint,
  children,
}: {
  chapter: Chapter;
  sheet: string;
  tint?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={chapter.id}
      data-chapter={chapter.id}
      data-chapter-kind={chapter.kind}
      data-weight={chapter.weight}
      aria-label={chapter.title}
      className="relative"
      style={{ minHeight: `calc(${chapter.weight} * 100dvh)` }}
    >
      <div className="sticky top-0 flex min-h-dvh flex-col justify-center">
        <div className="mx-auto w-full max-w-6xl px-5 pt-24 pb-10 sm:px-8">
          {children}
        </div>
        <div className="mx-auto flex w-full max-w-6xl justify-end px-5 pb-10 sm:px-8">
          <TitleBlock system={chapter.system} sheet={sheet} tint={tint} />
        </div>
      </div>
    </section>
  );
}
