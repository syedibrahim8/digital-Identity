import { ArrowUpRight, Github } from "lucide-react";
import type { Chapter } from "@/content/chapters";
import { getProject } from "@/content/projects";
import { ChapterSection } from "./ChapterSection";

/**
 * One project, as its own sheet in the drawing set.
 *
 * The full copy lives here in the DOM unconditionally. In Phase 6 the module
 * detaches into a focused 3D inspection, but that is a focused view of content
 * the visitor can already read — so WebGL failure degrades to an ordinary,
 * complete project section rather than an empty one.
 */
export function ProjectChapter({ chapter }: { chapter: Chapter }) {
  const project = chapter.projectSlug ? getProject(chapter.projectSlug) : undefined;
  if (!project) return null;

  const ink = `var(--color-${project.ink})`;

  return (
    <ChapterSection chapter={chapter} sheet={project.sheet} tint={ink}>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <h2 className="text-4xl sm:text-5xl" style={{ color: ink }}>
            {project.title}
          </h2>

          <p className="text-object mt-5 max-w-[42ch] text-xl leading-snug">
            {project.thesis}
          </p>

          <p className="text-read mt-5 max-w-[62ch] leading-relaxed">
            {project.punchline}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.demo ? (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="text-vellum inline-flex items-center gap-2 px-4 py-2.5 transition-opacity hover:opacity-85"
                style={{ backgroundColor: ink }}
              >
                <span className="lettering text-xs">Live</span>
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            ) : null}
            {project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border px-4 py-2.5 transition-colors"
                style={{ borderColor: ink, color: ink }}
              >
                <Github aria-hidden="true" className="size-4" />
                <span className="lettering text-xs">Source</span>
              </a>
            ) : null}
          </div>
        </div>

        {/* Specification schedule: what the part does, ruled as drawing notes. */}
        <dl className="border-t" style={{ borderColor: ink }}>
          {project.highlights.map((h, i) => (
            <div
              key={h}
              className="grid grid-cols-[2.5rem_1fr] gap-3 border-b py-4"
              style={{ borderColor: `color-mix(in oklab, ${ink} 35%, transparent)` }}
            >
              <dt
                className="dimension pt-0.5"
                style={{ color: ink }}
                data-figures="tabular"
              >
                {project.sheet}.{i + 1}
              </dt>
              <dd className="text-read text-sm leading-relaxed">{h}</dd>
            </div>
          ))}
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 pt-4">
            {project.tags.map((t) => (
              <span key={t} className="text-read-soft text-xs">
                {t}
              </span>
            ))}
          </div>
        </dl>
      </div>
    </ChapterSection>
  );
}
