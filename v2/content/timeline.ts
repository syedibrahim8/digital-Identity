/**
 * The journey chapter. Rendered as the machine's spine — each entry is a
 * segment of the backbone the camera flies along.
 *
 * Achievements live here rather than in a separate "credentials" block: a
 * timeline is where a reader expects to find them, and it keeps the site to one
 * narrative.
 */

export type TimelineEntry = {
  id: string;
  /** TODO(ibrahim): confirm real dates. */
  period: string;
  title: string;
  detail: string;
  /** Distinctions render with a marker on the spine. */
  kind: "work" | "milestone" | "distinction";
};

export const TIMELINE: TimelineEntry[] = [
  {
    id: "start",
    period: "2025",
    title: "Started building in earnest",
    detail:
      "Moved from tutorials to shipping — first full-stack applications with real data and real users.",
    kind: "milestone",
  },
  {
    id: "nasa-ames",
    period: "TODO",
    title: "NASA Ames Research Center",
    detail:
      "Visited NASA Ames in connection with space settlement design work.",
    kind: "distinction",
  },
  {
    id: "nss",
    period: "TODO",
    title: "National Space Society — Space Settlement Conference",
    detail:
      "Attended the NSS conference on space settlement design.",
    kind: "distinction",
  },
  {
    id: "systems",
    period: "2025—2026",
    title: "Systems over surfaces",
    detail:
      "Shifted focus to the parts that have to be correct: workflow state, scheduled jobs, payment gating, and performance under load.",
    kind: "work",
  },
  {
    id: "now",
    period: "Now",
    title: "Open to fullstack roles",
    detail: "Looking for problems with real constraints.",
    kind: "milestone",
  },
];
