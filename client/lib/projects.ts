export type Project = {
  id: string,
  slug: string;
  title: string;
  punchline: string;
  tags: string[];
  highlights: string[];
  links: { github?: string; demo?: string };
};

export const FEATURED_PROJECTS: Project[] = [
  {
    id:"1",
    slug: "influencer-marketplace",
    title: "Influencer Marketplace (Escrow-style)",
    punchline: "Workflow-driven campaigns with proof submission + review windows + release logic.",
    tags: ["Next.js", "Node", "MongoDB", "Stripe", "TypeScript"],
    highlights: [
      "Overlap prevention + selection flow",
      "Proof submission & review windows (time-bound)",
      "Escrow-style payment release after milestones",
    ],
    links: { github: "https://github.com/syedibrahim8/RentMyHeader", demo: "" },
  },
  {
    id:"2",
    slug: "smartphone-learning",
    title: "Smartphone Learning Platform",
    punchline: "Step-based learning experience that teaches real actions with clarity.",
    tags: ["React", "UX", "Animations", "Responsive"],
    highlights: [
      "Step progress flow + hints",
      "Mobile-first UI, clean interaction",
      "Designed for real-world usability",
    ],
    links: { github: "https://github.com/syedibrahim8/smartPhone-Fundamentals", demo: "" },
  },
  {
    id:"3",
    slug: "youtube-fetcher",
    title: "YouTube Video Fetcher",
    punchline: "Background fetching + search/sort + paginated API + dashboard UI.",
    tags: ["React", "Express", "MongoDB", "Cron", "API"],
    highlights: [
      "Cron background job fetching every N seconds",
      "Server-side pagination + search/sort",
      "Clean API architecture + resilience",
    ],
    links: { github: "https://github.com/syedibrahim8/youtube-fetcher", demo: "https://youtube.ibbu.in" },
  },
  {
  id: "4",
  slug: "pokemon-research-lab",
  title: "Pokémon Research Lab",
  punchline: "Interactive Pokémon data explorer with editing, performance optimization & modern UI.",
  tags: ["Next.js", "TypeScript", "Performance", "API"],
  highlights: [
    "Large dataset rendering with smooth virtualization",
    "Editable data table with optimized state updates",
    "Search, filtering & responsive dashboard UI",
  ],
  links: {
    github: "https://github.com/syedibrahim8/The-Pokemon-Research-Lab",
    demo: "https://pokedex.ibbu.in",
  },
},
]