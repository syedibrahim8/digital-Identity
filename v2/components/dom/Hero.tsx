import { ArrowDown } from "lucide-react";
import type { Chapter } from "@/content/chapters";
import { CHAPTERS, FIRST_PROJECT_INDEX } from "@/content/chapters";
import { SITE, ACHIEVEMENTS } from "@/content/site";
import { TitleBlock } from "./TitleBlock";
import { AssemblyPlate } from "./AssemblyPlate";

const firstProjectId = CHAPTERS[FIRST_PROJECT_INDEX]?.id ?? "";

export function Hero({ chapter }: { chapter: Chapter }) {
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
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 pt-24 pb-8 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-xl">
            {/*
              Phase 5 replaces this with the signature drawn as one continuous
              stroke. It stays a real <h1> regardless, so it is indexed and
              readable with no canvas at all.
            */}
            <h1 className="text-object text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.92]">
              {SITE.name}
            </h1>

            <p className="text-object mt-6 max-w-[34ch] text-xl leading-snug sm:text-2xl">
              {SITE.tagline}
            </p>

            <p className="text-read mt-5 max-w-[58ch] leading-relaxed">
              {SITE.role} working on workflow systems, scheduled pipelines, and
              interfaces that stay fast as the data grows.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={`#${firstProjectId}`}
                className="bg-object text-vellum hover:bg-annotate inline-flex items-center gap-2 px-5 py-3 text-sm transition-colors"
              >
                <span className="lettering text-xs">See the work</span>
                <ArrowDown aria-hidden="true" className="size-4" />
              </a>
              <a
                href="#system"
                className="border-object/40 text-object hover:border-annotate hover:text-annotate border px-5 py-3 transition-colors"
              >
                <span className="lettering text-xs">Get in touch</span>
              </a>
            </div>
          </div>

          <AssemblyPlate className="mx-auto h-[46vh] max-h-[520px] w-full max-w-sm lg:h-[70vh] lg:max-h-none" />
        </div>

        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-end justify-between gap-6 px-5 pb-10 sm:px-8">
          {/* Distinctions, ruled as a drawing note rather than badges. */}
          <ul className="border-object/30 max-w-sm border-t pt-3">
            {ACHIEVEMENTS.map((a) => (
              <li
                key={a.id}
                className="text-read-soft flex gap-3 py-1 text-xs leading-relaxed"
              >
                <span className="dimension shrink-0">{a.org}</span>
                <span>{a.title}</span>
              </li>
            ))}
          </ul>
          <TitleBlock system={chapter.system} sheet="00" />
        </div>
      </div>
    </section>
  );
}
