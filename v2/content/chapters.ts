import { PROJECTS } from "./projects";
import { SITE } from "./site";

/**
 * The flight plan.
 *
 * Chapter count is DERIVED, never hardcoded. The camera curve is generated from
 * this list, so adding a project in projects.ts extends the flight automatically.
 */

export type ChapterKind =
  | "cold-start"
  | "convergence"
  | "current"
  | "project"
  | "journey"
  | "system";

export type Chapter = {
  id: string;
  kind: ChapterKind;
  /** Shown in nav and the command palette. Omitted = not directly navigable. */
  navLabel?: string;
  /** Title-block "SYSTEM" field. Never rendered as a kicker above the heading. */
  system?: string;
  title: string;
  body?: string;
  /**
   * Relative scroll length, in viewport heights of dwell. Drives both the DOM
   * section height and the camera's dwell band, so the two cannot disagree.
   */
  weight: number;
  /** Set for kind === "project". */
  projectSlug?: string;
};

const OPENING: Chapter[] = [
  {
    id: "cold-start",
    kind: "cold-start",
    navLabel: "Top",
    system: SITE.availability,
    title: SITE.name,
    body: SITE.tagline,
    weight: 1.2,
  },
  {
    id: "convergence",
    kind: "convergence",
    navLabel: "About",
    system: "Convergence",
    title: "Parts become a system",
    body: "I build the parts of software that have to be correct when nobody is watching — workflows that enforce their own rules, jobs that keep running, data that stays fast as it grows.",
    weight: 1.4,
  },
  {
    id: "current",
    kind: "current",
    navLabel: "Stack",
    system: "First current",
    title: "What it's built from",
    body: "The stack isn't a list of logos. It's the substrate the machine runs on.",
    weight: 1.4,
  },
];

const PROJECT_CHAPTERS: Chapter[] = PROJECTS.map((p) => ({
  id: `project-${p.id}`,
  kind: "project" as const,
  navLabel: p.title,
  system: p.featured ? "Centerpiece" : "Module",
  title: p.title,
  body: p.thesis,
  // The centerpiece earns a longer dwell so its sequence can play out.
  weight: p.featured ? 2.2 : 1.5,
  projectSlug: p.slug,
}));

const CLOSING: Chapter[] = [
  {
    id: "journey",
    kind: "journey",
    navLabel: "Journey",
    system: "The spine",
    title: "How it got built",
    weight: 1.5,
  },
  {
    id: "system",
    kind: "system",
    navLabel: "Contact",
    system: "Full system",
    title: "Let's build something",
    body: "Open to fullstack roles and interesting problems.",
    weight: 1.3,
  },
];

export const CHAPTERS: Chapter[] = [
  ...OPENING,
  ...PROJECT_CHAPTERS,
  ...CLOSING,
];

/**
 * Nav items. The four project chapters collapse into a single "Projects" jump —
 * listing each one would bury the rest of the nav. The command palette still
 * exposes every project individually (Phase 1).
 */
export const NAV_ITEMS: { id: string; label: string }[] = (() => {
  const items: { id: string; label: string }[] = [];
  let projectsAdded = false;
  for (const c of CHAPTERS) {
    if (!c.navLabel) continue;
    if (c.kind === "project") {
      if (!projectsAdded) {
        items.push({ id: c.id, label: "Projects" });
        projectsAdded = true;
      }
      continue;
    }
    items.push({ id: c.id, label: c.navLabel });
  }
  return items;
})();

export const TOTAL_WEIGHT = CHAPTERS.reduce((sum, c) => sum + c.weight, 0);

/** Index of the first project chapter — used by the "Projects" nav jump. */
export const FIRST_PROJECT_INDEX = CHAPTERS.findIndex(
  (c) => c.kind === "project",
);
