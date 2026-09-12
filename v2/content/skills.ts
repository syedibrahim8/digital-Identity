/**
 * The stack, grouped by role in the system. Each group becomes a cluster of
 * nodes in the machine that lights as the current reaches it.
 */

export type SkillGroup = {
  id: string;
  label: string;
  /** Where this sits in the machine — drives node clustering in 3D. */
  layer: "surface" | "logic" | "store" | "ops";
  items: string[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "surface",
    label: "Surface",
    layer: "surface",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "logic",
    label: "Logic",
    layer: "logic",
    items: ["Node.js", "Express", "REST APIs", "Auth", "Stripe"],
  },
  {
    id: "store",
    label: "Store",
    layer: "store",
    items: ["MongoDB", "Mongoose", "Schema design", "Indexing", "Pagination"],
  },
  {
    id: "ops",
    label: "Ops",
    layer: "ops",
    items: ["Git", "Cron jobs", "Vercel", "Performance profiling"],
  },
];

export const ALL_SKILLS = SKILL_GROUPS.flatMap((g) => g.items);
