"use client";

import { useEffect } from "react";
import Link from "next/link";

/** Route-level error boundary. Shows no internal error details to visitors. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Surfaces in Vercel's runtime logs; the message itself is never rendered.
    console.error(error.digest ?? "Unhandled render error");
  }, [error]);

  return (
    <main id="main" className="theme-light flex min-h-svh flex-col justify-center px-gutter py-section">
      <p className="flex items-center gap-3 text-label text-muted uppercase">
        <span aria-hidden className="size-2 rounded-full bg-signal" />
        Something went wrong
      </p>
      <h1 className="display-section mt-6 max-w-[16ch]">
        The render <em>dropped a frame.</em>
      </h1>
      <p className="mt-6 max-w-[42ch] text-lead text-muted">Please try again. If it keeps happening, the homepage still works.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-12 items-center rounded-control bg-fg px-6 font-medium text-bg transition-colors hover:bg-signal hover:text-ink"
        >
          Try again
        </button>
        <Link href="/" className="inline-flex h-12 items-center rounded-control border border-fg/25 px-6 text-fg hover:border-fg">
          Homepage
        </Link>
      </div>
    </main>
  );
}
