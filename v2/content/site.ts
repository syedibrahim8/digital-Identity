/**
 * Single source of truth for identity and links.
 *
 * Nothing here may be duplicated into a component. The previous site hardcoded
 * the email and social URLs across five files; changing one meant finding all five.
 */

export const SITE = {
  name: "Syed Ibrahim Ali",
  /** Short form for tight spaces (nav, footer, OG). */
  shortName: "Ibrahim",
  role: "Fullstack Engineer",
  /** The positioning line. Appears in the hero and in OG metadata. */
  tagline: "I build systems, not websites.",
  /** TODO(ibrahim): confirm city + timezone. */
  location: "India",
  timezone: "IST (UTC+5:30)",
  /** TODO(ibrahim): confirm availability wording. */
  availability: "Open to fullstack roles",

  /** Placeholders carried from the previous site — safe to edit, used everywhere. */
  links: {
    email: "syedibrahimofficial1@gmail.com",
    github: "https://github.com/syedibrahim8",
    linkedin: "https://www.linkedin.com/in/syed-ibrahim-ali-57975a388",
    x: "https://x.com/syedibrahimx8",
    resume: "/Ibrahim_resume.pdf",
  },
} as const;

/**
 * Distinctions worth showing. Deliberately NOT academic records — grades stop
 * being a signal once there are shipped projects with live URLs, and the resume
 * PDF carries them anyway.
 */
export type Achievement = {
  id: string;
  title: string;
  org: string;
  /** TODO(ibrahim): fill real years. */
  year?: string;
  detail: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "nasa-ames",
    title: "NASA Ames Research Center",
    org: "NASA",
    detail:
      "Visited NASA Ames Research Center in connection with space settlement design work.",
  },
  {
    id: "nss-conference",
    title: "Space Settlement Conference",
    org: "National Space Society",
    detail:
      "Attended the National Space Society conference on space settlement design.",
  },
];
