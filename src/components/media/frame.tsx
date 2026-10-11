import { cn } from "@/lib/cn";

type FrameProps = {
  /** CSS aspect-ratio, e.g. "16 / 9". */
  aspectRatio: string;
  /** Visible tag in the top-left corner, e.g. "Placeholder". */
  tag?: string;
  /** Small technical label in the top-right corner, e.g. "16:9". */
  meta?: string;
  className?: string;
  children: React.ReactNode;
};

/** A media frame with optional corner labels. Holds art, images or a MediaPlayer. */
export function Frame({ aspectRatio, tag, meta, className, children }: FrameProps) {
  return (
    <div className={cn("relative isolate overflow-hidden rounded-frame bg-surface", className)} style={{ aspectRatio }}>
      {children}
      {/* Hairline edge so dark or light art never dissolves into the section background. */}
      <span aria-hidden className="pointer-events-none absolute inset-0 z-10 rounded-frame ring-1 ring-fg/12 ring-inset" />
      {(tag || meta) && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-wrap items-start justify-between gap-1.5 p-2.5 sm:p-3">
          {tag ? (
            <span className="rounded-control bg-ink/85 px-2.5 py-1 text-[0.6875rem] whitespace-nowrap font-medium tracking-[0.1em] text-paper uppercase">
              {tag}
            </span>
          ) : (
            <span />
          )}
          {meta && (
            <span className="ml-auto rounded-control bg-paper/85 px-2.5 py-1 text-[0.6875rem] whitespace-nowrap font-medium tracking-[0.1em] text-ink uppercase tabular-nums">
              {meta}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
