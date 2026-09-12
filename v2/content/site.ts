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
  role: "Full Stack Developer",
  /** The positioning line. Appears in the hero and in OG metadata. */
  tagline: "I build systems, not websites.",
  location: "Hyderabad, India",
  timezone: "IST (UTC+5:30)",
  /**
   * Signals "recent graduate" without leading with the word fresher, which
   * reads as a discount rather than a fact. The graduation year carries it.
   */
  availability: "Open to full-stack roles",

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
  year?: string;
  detail: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "nasa-ames",
    title: "NASA Ames Research Center",
    org: "NASA",
    year: "2018",
    detail: "Visited NASA Ames for space settlement design work.",
  },
  {
    id: "nss-conference",
    title: "Presented a space settlement project",
    org: "National Space Society",
    year: "2018",
    detail:
      "Presented a space settlement design at the National Space Society conference.",
  },
];
