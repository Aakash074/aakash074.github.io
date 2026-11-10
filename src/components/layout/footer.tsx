import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} Aakash Kumar. New Delhi, India.</p>
        <a href="#top" className="inline-flex min-h-11 items-center gap-1.5 hover:text-foreground">
          <span className="link-u">Back to top</span>
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
