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
  period: string;
  title: string;
  detail: string;
  /** Distinctions render with a marker on the spine. */
  kind: "work" | "milestone" | "distinction";
};

export const TIMELINE: TimelineEntry[] = [
  {
    id: "nasa-ames",
    period: "2018",
    title: "NASA Ames Research Center",
    detail:
      "Visited NASA Ames while working on a space settlement design — the project that started the interest in systems that have to hold up under real constraints.",
    kind: "distinction",
  },
  {
    id: "nss",
    period: "2018",
    title: "Presented at the National Space Society conference",
    detail:
      "Presented a cylindrical colony sited at Earth–Moon L5, with four sector tubes for residence, agriculture, research and industry.",
    kind: "distinction",
  },
  {
    id: "graduated",
    period: "2026",
    title: "B.E. Computer Science and Engineering",
    detail: "Jawaharlal Nehru Technological University.",
    kind: "milestone",
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
    title: "Open to full-stack roles",
    detail: "Looking for problems with real constraints. Based in Hyderabad.",
    kind: "milestone",
  },
];
