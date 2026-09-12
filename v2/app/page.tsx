import { CHAPTERS } from "@/content/chapters";
import { Nav } from "@/components/dom/Nav";
import { Hero } from "@/components/dom/Hero";
import { Convergence } from "@/components/dom/Convergence";
import { StackChapter } from "@/components/dom/StackChapter";
import { ProjectChapter } from "@/components/dom/ProjectChapter";
import { TimelineChapter } from "@/components/dom/TimelineChapter";
import { ContactChapter } from "@/components/dom/ContactChapter";
import { Footer } from "@/components/dom/Footer";

/**
 * The whole drawing set, rendered from CHAPTERS.
 *
 * This is a Server Component on purpose: every word of copy is in the HTML
 * payload, so it is indexed, readable with JavaScript disabled, and complete
 * before any canvas exists. Phase 2 layers a fixed canvas behind this; it never
 * replaces it.
 */
export default function Page() {
  return (
    <>
      <Nav />
      <main id="main">
        {CHAPTERS.map((chapter) => {
          switch (chapter.kind) {
            case "cold-start":
              return <Hero key={chapter.id} chapter={chapter} />;
            case "convergence":
              return <Convergence key={chapter.id} chapter={chapter} />;
            case "current":
              return <StackChapter key={chapter.id} chapter={chapter} />;
            case "project":
              return <ProjectChapter key={chapter.id} chapter={chapter} />;
            case "journey":
              return <TimelineChapter key={chapter.id} chapter={chapter} />;
            case "system":
              return <ContactChapter key={chapter.id} chapter={chapter} />;
          }
        })}
      </main>
      <Footer />
    </>
  );
}
