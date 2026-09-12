import type { Chapter } from "@/content/chapters";
import { TIMELINE } from "@/content/timeline";
import { ChapterSection } from "./ChapterSection";

export function TimelineChapter({ chapter }: { chapter: Chapter }) {
  return (
    <ChapterSection chapter={chapter}>
      <h2 className="text-4xl sm:text-5xl">{chapter.title}</h2>

      {/* The spine, drawn as a datum line with stations along it. */}
      <ol className="border-object/30 mt-14 border-l pl-8">
        {TIMELINE.map((entry) => (
          <li key={entry.id} className="relative pb-9 last:pb-0">
            <span
              aria-hidden="true"
              className={`absolute -left-[calc(2rem+1px)] top-1.5 size-2 -translate-x-1/2 ${
                entry.kind === "distinction"
                  ? "bg-annotate rotate-45"
                  : "bg-object rounded-full"
              }`}
            />
            <span className="dimension" data-figures="tabular">
              {entry.period}
            </span>
            <h3 className="text-object mt-1.5 text-lg">{entry.title}</h3>
            <p className="text-read-soft mt-1.5 max-w-[62ch] text-sm leading-relaxed">
              {entry.detail}
            </p>
          </li>
        ))}
      </ol>
    </ChapterSection>
  );
}
