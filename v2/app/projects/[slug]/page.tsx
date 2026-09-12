import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { PROJECTS, getProject } from "@/content/projects";

/**
 * A static sheet per project.
 *
 * Exists so a recruiter can be sent straight to one project, so each has its
 * own indexable URL, and so the deep link works with JavaScript disabled.
 */

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.punchline };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const ink = `var(--color-${project.ink})`;

  return (
    <main className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <Link
        href="/"
        className="lettering text-read-soft hover:text-annotate inline-flex items-center gap-2 text-[10px] transition-colors"
      >
        <ArrowLeft aria-hidden="true" className="size-3.5" />
        Back to the set
      </Link>

      <p className="dimension mt-10" data-figures="tabular">
        Sheet {project.sheet}
      </p>
      <h1 className="mt-2 text-4xl sm:text-5xl" style={{ color: ink }}>
        {project.title}
      </h1>
      <p className="text-object mt-5 text-xl leading-snug">{project.thesis}</p>
      <p className="text-read mt-5 leading-relaxed">{project.punchline}</p>

      <dl className="mt-10 border-t" style={{ borderColor: ink }}>
        {project.highlights.map((h, i) => (
          <div
            key={h}
            className="grid grid-cols-[2.5rem_1fr] gap-3 border-b py-4"
            style={{ borderColor: `color-mix(in oklab, ${ink} 35%, transparent)` }}
          >
            <dt className="dimension pt-0.5" style={{ color: ink }} data-figures="tabular">
              {project.sheet}.{i + 1}
            </dt>
            <dd className="text-read text-sm leading-relaxed">{h}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-wrap gap-3">
        {project.links.demo ? (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noreferrer"
            className="text-vellum inline-flex items-center gap-2 px-4 py-2.5"
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
            className="inline-flex items-center gap-2 border px-4 py-2.5"
            style={{ borderColor: ink, color: ink }}
          >
            <Github aria-hidden="true" className="size-4" />
            <span className="lettering text-xs">Source</span>
          </a>
        ) : null}
      </div>
    </main>
  );
}
