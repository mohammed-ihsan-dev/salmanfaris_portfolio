import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";

/** Name with a small REC dot: the site's signal colour, used as a mark. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display text-[1.0625rem] font-semibold tracking-[-0.03em] whitespace-nowrap",
        className,
      )}
    >
      <span aria-hidden className="size-[0.45em] shrink-0 rounded-full bg-signal" />
      {profile.name}
      {profile.wordmarkMark && (
        <sup aria-hidden className="-ml-1 text-[0.55em] font-medium">
          {profile.wordmarkMark}
        </sup>
      )}
    </span>
  );
}
