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
  | "settlement"
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
  /**
   * Sheet number as printed in the title block. Assigned below from position in
   * the set, never hand-written: two numbering systems on screen at once (a
   * rail counting one way, a title block another) reads as a bug.
   */
  sheet: string;
};

type UnnumberedChapter = Omit<Chapter, "sheet">;

const OPENING: UnnumberedChapter[] = [
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
    /*
     * Origin story — drafted by Claude at Ibrahim's request, from his own
     * material (the 2018 L5 design, and the coupling instinct that shows up
     * again in the escrow work). Replace freely; this is the one paragraph on
     * the site that should sound like nobody else.
     */
    body: "In 2018 I designed a space colony, and it taught me the thing that still shapes how I build: in a real system, nothing stands alone. Move the radius and the gravity moves with it, and the farmland, and the shielding. Software behaves the same way. The interesting part was never the screen — it is the rules underneath, the ones that have to hold when nobody is watching.",
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

const PROJECT_CHAPTERS: UnnumberedChapter[] = PROJECTS.map((p) => ({
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

const CLOSING: UnnumberedChapter[] = [
  {
    id: "settlement",
    kind: "settlement",
    navLabel: "Settlement",
    system: "Distinction",
    title: "Space settlement, 2018",
    weight: 1.8,
  },
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
].map((chapter, index) => ({
  ...chapter,
  sheet: String(index).padStart(2, "0"),
}));

/** Sheet number for a project slug — the static route has no Chapter to hand. */
export const SHEET_BY_SLUG: Record<string, string> = Object.fromEntries(
  CHAPTERS.filter((c) => c.projectSlug).map((c) => [c.projectSlug!, c.sheet]),
);

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
