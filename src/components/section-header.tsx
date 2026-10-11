import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  index: string;
  label: string;
  /** Display title. Wrap a word in <em> for the serif-italic accent. */
  title: React.ReactNode;
  /** id for the h2, referenced by the section's aria-labelledby. */
  id: string;
  /** Short supporting copy or actions, set beside the title on desktop. */
  aside?: React.ReactNode;
  className?: string;
};

/** Section opener: serif index · rule · label, then the display title with an optional aside. */
export function SectionHeader({ index, label, title, id, aside, className }: SectionHeaderProps) {
  return (
    <header className={cn("reveal grid gap-x-gutter gap-y-6 lg:grid-cols-12 lg:items-end", className)}>
      <p className="flex items-center gap-3 text-label text-muted uppercase lg:col-span-12">
        <span className="font-serif text-[1.375rem] leading-none tracking-normal text-fg normal-case italic">{index}</span>
        <span aria-hidden className="h-px w-8 bg-line" />
        {label}
      </p>
      <h2 id={id} className="display-section lg:col-span-8">
        {title}
      </h2>
      {aside && <div className="text-muted lg:col-span-4 lg:pb-2">{aside}</div>}
    </header>
  );
}
