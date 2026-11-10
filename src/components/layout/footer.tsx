import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 py-6 text-sm text-subtle sm:flex-row sm:items-center sm:px-6">
        <p>&copy; {new Date().getFullYear()} Aakash Kumar. New Delhi, India.</p>
        <a href="#top" className="inline-flex min-h-11 items-center gap-1.5 rounded-md hover:text-foreground">
          Back to top
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
