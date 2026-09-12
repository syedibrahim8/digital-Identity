import type { Chapter } from "@/content/chapters";
import { ChapterSection } from "./ChapterSection";

const PRINCIPLES = [
  {
    n: "1",
    title: "State that enforces itself",
    detail:
      "Rules belong in the system, not in the person using it. If an action shouldn't be possible, it shouldn't be reachable.",
  },
  {
    n: "2",
    title: "Correct while unattended",
    detail:
      "Scheduled work, retries and background jobs are where software quietly breaks. That's the part worth getting right.",
  },
  {
    n: "3",
    title: "Fast at the size it will actually be",
    detail:
      "Anything is smooth with ten rows. The interesting work starts at ten thousand.",
  },
];

export function Convergence({ chapter }: { chapter: Chapter }) {
  return (
    <ChapterSection chapter={chapter} sheet="01">
      <h2 className="max-w-2xl text-4xl sm:text-5xl">{chapter.title}</h2>
      <p className="text-read mt-6 max-w-[68ch] text-lg leading-relaxed">
        {chapter.body}
      </p>

      {/* Balloon callouts on leader lines — the drawing set's own list form. */}
      <ul className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-3">
        {PRINCIPLES.map((p) => (
          <li key={p.n} className="relative">
            <span
              className="border-annotate text-annotate absolute -top-1 -left-1 flex size-7 items-center justify-center rounded-full border"
              style={{ fontFamily: "var(--font-dim)", fontSize: "11px" }}
              aria-hidden="true"
            >
              {p.n}
            </span>
            <div className="border-annotate/50 border-t pt-4 pl-9">
              <h3 className="text-object text-base">{p.title}</h3>
              <p className="text-read-soft mt-2.5 text-sm leading-relaxed">
                {p.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </ChapterSection>
  );
}
