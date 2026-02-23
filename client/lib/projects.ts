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
    links: { github: "https://github.com/syedibrahim8/RentMyHeader", demo: "#" },
  },
  {
    id:"2",
    slug: "youtube-fetcher",
    title: "YouTube Video Fetcher",
    punchline: "Background fetching + search/sort + paginated API + dashboard UI.",
    tags: ["React", "Express", "MongoDB", "Cron", "API"],
    highlights: [
      "Cron background job fetching every N seconds",
      "Server-side pagination + search/sort",
      "Clean API architecture + resilience",
    ],
    links: { github: "#", demo: "#" },
  },
  {
    id:"3",
    slug: "smartphone-learning",
    title: "Smartphone Learning Platform",
    punchline: "Step-based learning experience that teaches real actions with clarity.",
    tags: ["React", "UX", "Animations", "Responsive"],
    highlights: [
      "Step progress flow + hints",
      "Mobile-first UI, clean interaction",
      "Designed for real-world usability",
    ],
    links: { github: "https://github.com/syedibrahim8/smartPhone-Fundamentals", demo: "#" },
  },
]