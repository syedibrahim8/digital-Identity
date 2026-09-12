import { Mail, Github, Linkedin, FileText } from "lucide-react";
import type { Chapter } from "@/content/chapters";
import { SITE } from "@/content/site";
import { ChapterSection } from "./ChapterSection";

const CHANNELS = [
  { id: "email", label: "Email", value: SITE.links.email, href: `mailto:${SITE.links.email}`, Icon: Mail },
  { id: "github", label: "GitHub", value: "syedibrahim8", href: SITE.links.github, Icon: Github },
  { id: "linkedin", label: "LinkedIn", value: "Syed Ibrahim Ali", href: SITE.links.linkedin, Icon: Linkedin },
  { id: "resume", label: "Resume", value: "PDF", href: SITE.links.resume, Icon: FileText },
];

export function ContactChapter({ chapter }: { chapter: Chapter }) {
  return (
    <ChapterSection chapter={chapter} sheet="08">
      <h2 className="text-4xl sm:text-5xl">{chapter.title}</h2>
      <p className="text-read mt-6 max-w-[52ch] text-lg leading-relaxed">
        {chapter.body}
      </p>

      <ul className="border-object/30 mt-12 grid border-t sm:grid-cols-2">
        {CHANNELS.map(({ id, label, value, href, Icon }) => (
          <li key={id} className="border-object/20 border-b">
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="group hover:bg-vellum-tint flex items-center gap-4 py-5 transition-colors sm:px-2"
            >
              <Icon aria-hidden="true" className="text-construct group-hover:text-annotate size-4 shrink-0 transition-colors" />
              <span className="lettering text-read-soft w-24 shrink-0 text-[10px]">
                {label}
              </span>
              <span className="text-object group-hover:text-annotate truncate text-sm transition-colors">
                {value}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p className="text-read-soft mt-10 text-sm">
        {SITE.location} · {SITE.timezone}
      </p>
    </ChapterSection>
  );
}
