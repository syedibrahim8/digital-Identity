import { SITE } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-object/25 border-t">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 sm:px-8">
        <p className="text-read-soft text-xs">
          © {new Date().getFullYear()} {SITE.name}
        </p>
        <a
          href="#cold-start"
          className="lettering text-read-soft hover:text-annotate text-[10px] transition-colors"
        >
          Back to sheet 00
        </a>
      </div>
    </footer>
  );
}
