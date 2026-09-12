/**
 * Project data. This is the ONLY place a project is defined.
 *
 * Adding a project here adds a chapter, extends the camera curve, and creates a
 * static /projects/[slug] route. No component changes are required.
 */

/**
 * How a project's module renders in 3D.
 *
 * All three variants resolve to a THREE.Texture fed into the same geometry and
 * material, so switching a project from generated geometry to a screenshot to a
 * video is a one-line edit here. Every slot defaults to `procedural`, which is
 * what keeps content from ever being blocked on assets.
 */
export type ProceduralId =
  /** Nodes + transitions; a token travels the graph. For workflow/state systems. */
  | "state-machine"
  /** Source -> queue -> store -> surface, with packets flowing. For pipelines. */
  | "pipeline"
  /** A dense cell grid that streams in and recycles. For virtualization/data UI. */
  | "grid-stream"
  /** A stepped path that lights segment by segment. For guided learning flows. */
  | "guided-path";

export type ModuleVisual =
  | { kind: "procedural"; generator: ProceduralId; params?: Record<string, number> }
  | { kind: "image"; src: string; aspect: number }
  | { kind: "video"; src: string; poster: string; aspect: number };

/** Sheet ink. Identifies one module's subsystem across the whole drawing set. */
export type SheetInk = "escrow" | "fetcher" | "lab" | "learning";

export type Project = {
  id: string;
  slug: string;
  ink: SheetInk;
  title: string;
  /** One line. What it is, in plain language. */
  punchline: string;
  /** The systems claim — what makes this non-trivial. Shown under the title. */
  thesis: string;
  tags: string[];
  /** Concrete capabilities. Kept short; these are scanned, not read. */
  highlights: string[];
  links: { github?: string; demo?: string };
  visual: ModuleVisual;
  /** The centerpiece gets the longest dwell and the most elaborate sequence. */
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: "escrow",
    ink: "escrow",
    slug: "influencer-marketplace",
    title: "Influencer Marketplace",
    punchline:
      "Workflow-driven campaigns with proof submission, review windows, and escrow-style release.",
    thesis:
      "Money that cannot move until conditions are met. State, time, and payment in one system.",
    tags: ["Next.js", "Node", "MongoDB", "Stripe", "TypeScript"],
    highlights: [
      "Booking overlap prevention across concurrent campaigns",
      "Time-bound proof submission and review windows",
      "Escrow-style payment release gated on milestones",
    ],
    links: { github: "https://github.com/syedibrahim8/RentMyHeader" },
    visual: { kind: "procedural", generator: "state-machine" },
    featured: true,
  },
  {
    id: "youtube-fetcher",
    ink: "fetcher",
    slug: "youtube-fetcher",
    title: "YouTube Video Fetcher",
    punchline:
      "Background fetching with search, sort, and a paginated API behind a dashboard.",
    thesis:
      "A pipeline that keeps running when nobody is watching, and stays queryable while it does.",
    tags: ["React", "Express", "MongoDB", "Cron", "API"],
    highlights: [
      "Scheduled background ingestion via cron",
      "Paginated API with search and sort",
      "Dashboard over continuously updating data",
    ],
    links: {
      github: "https://github.com/syedibrahim8/youtube-fetcher",
      demo: "https://youtube.ibbu.in",
    },
    visual: { kind: "procedural", generator: "pipeline" },
  },
  {
    id: "pokedex",
    ink: "lab",
    slug: "pokemon-research-lab",
    title: "Pokémon Research Lab",
    punchline:
      "Interactive data explorer with inline editing and performance work throughout.",
    thesis:
      "Thousands of rows that stay smooth because almost none of them actually exist.",
    tags: ["Next.js", "TypeScript", "Performance", "API"],
    highlights: [
      "Large dataset rendering with virtualization",
      "Editable table with optimized state updates",
      "Search, filtering, and a responsive dashboard",
    ],
    links: {
      github: "https://github.com/syedibrahim8/The-Pokemon-Research-Lab",
      demo: "https://pokedex.ibbu.in",
    },
    visual: { kind: "procedural", generator: "grid-stream" },
  },
  {
    id: "smartphone",
    ink: "learning",
    slug: "smartphone-learning",
    title: "Smartphone Learning Platform",
    punchline:
      "A step-based learning experience that teaches real actions with clarity.",
    thesis:
      "Teaching by sequence: one action at a time, with no way to get lost.",
    tags: ["React", "UX", "Animations", "Responsive"],
    highlights: [
      "Step-by-step guided flows",
      "Motion used to direct attention, not decorate",
      "Built for low-confidence users",
    ],
    links: { github: "https://github.com/syedibrahim8/smartPhone-Fundamentals" },
    visual: { kind: "procedural", generator: "guided-path" },
  },
];

export const FEATURED_PROJECT =
  PROJECTS.find((p) => p.featured) ?? PROJECTS[0];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
