import { FileText, ChevronDown } from "lucide-react";
import { NAV_ITEMS } from "@/content/chapters";
import { SITE } from "@/content/site";

/**
 * Jump navigation — the guarantee that nobody is forced to scroll the whole
 * flight to reach the work.
 *
 * Phase 0 uses plain anchors. Phase 1 routes them through lenis.scrollTo so the
 * camera flies rather than jumps; the previous site never did this, so its
 * anchors bypassed smooth scroll entirely.
 */
export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Primary"
        className="border-object/25 bg-vellum/85 border-b backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-6xl items-center gap-5 px-5 py-3 sm:px-8">
          <a href="#cold-start" className="lettering text-object text-xs">
            {SITE.name}
          </a>

          <ul data-nav className="hidden flex-1 items-center gap-6 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="lettering text-read-soft hover:text-annotate aria-[current]:text-annotate text-[10px] transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={SITE.links.resume}
            className="border-object/40 text-object hover:border-annotate hover:text-annotate ml-auto inline-flex items-center gap-2 border px-3 py-1.5 transition-colors md:ml-0"
          >
            <FileText aria-hidden="true" className="size-3.5" />
            <span className="lettering text-[10px]">Resume</span>
          </a>

          {/*
            Mobile sheet index. A native <details> so it works with no
            JavaScript and keeps this a Server Component — roughly half of
            visitors arrive on a phone, and they must still reach the work in
            one tap.
          */}
          <details className="group relative md:hidden">
            <summary className="border-object/40 text-object flex cursor-pointer list-none items-center gap-1.5 border px-3 py-1.5 [&::-webkit-details-marker]:hidden">
              <span className="lettering text-[10px]">Sheets</span>
              <ChevronDown
                aria-hidden="true"
                className="size-3.5 transition-transform group-open:rotate-180"
              />
            </summary>
            <ul data-nav className="border-object/25 bg-vellum absolute right-0 z-50 mt-2 min-w-44 border shadow-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.id} className="border-object/15 border-b last:border-b-0">
                  <a
                    href={`#${item.id}`}
                    className="lettering text-read-soft hover:text-annotate aria-[current]:text-annotate hover:bg-vellum-tint block px-4 py-3 text-[10px] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </nav>
    </header>
  );
}
