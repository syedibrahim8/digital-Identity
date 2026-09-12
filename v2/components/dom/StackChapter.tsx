import type { Chapter } from "@/content/chapters";
import { SKILL_GROUPS } from "@/content/skills";
import { ChapterSection } from "./ChapterSection";

export function StackChapter({ chapter }: { chapter: Chapter }) {
  return (
    <ChapterSection chapter={chapter}>
      <h2 className="text-4xl sm:text-5xl">{chapter.title}</h2>
      <p className="text-read mt-6 max-w-[60ch] text-lg leading-relaxed">
        {chapter.body}
      </p>

      {/* A parts list, ruled as a drawing schedule. */}
      <div className="border-object/30 mt-14 border-t">
        {SKILL_GROUPS.map((group, i) => (
          <div
            key={group.id}
            className="border-object/20 grid grid-cols-1 gap-2 border-b py-5 sm:grid-cols-[7rem_1fr]"
          >
            <div className="flex items-baseline gap-3">
              <span className="dimension">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="lettering text-object text-xs">{group.label}</h3>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-1.5">
              {group.items.map((item) => (
                <li key={item} className="text-read text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ChapterSection>
  );
}
