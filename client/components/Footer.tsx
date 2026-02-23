export default function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-12">
      <div className="border-t border-white/10 pt-6 text-sm text-muted flex flex-wrap items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Ibrahim. Built with Next.js.</p>
        <a className="hover:text-white transition" href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}