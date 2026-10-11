import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  /** primary = section text colour as fill; accent = signal; outline = hairline. Theme-aware. */
  variant?: "primary" | "accent" | "outline";
  /** "right" in-page travel, "up-right" leaves the context, "down" downloads. */
  arrow?: "right" | "up-right" | "down";
  size?: "md" | "lg";
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

const variants = {
  primary: "bg-fg text-bg hover:bg-hover-fill hover:text-ink",
  accent: "bg-signal text-ink hover:bg-fg hover:text-bg",
  outline: "border border-fg/25 text-fg hover:border-fg",
};

const icons = { right: ArrowRight, "up-right": ArrowUpRight, down: ArrowDown };
const exit = {
  right: "group-hover/btn:translate-x-[140%]",
  "up-right": "group-hover/btn:translate-x-[140%] group-hover/btn:-translate-y-[140%]",
  down: "group-hover/btn:translate-y-[140%]",
};
const enter = {
  right: "-translate-x-[140%] group-hover/btn:translate-x-0",
  "up-right": "-translate-x-[140%] translate-y-[140%] group-hover/btn:translate-0",
  down: "-translate-y-[140%] group-hover/btn:translate-y-0",
};

/**
 * Pill CTA. On hover the fill swaps and the arrow exits while a copy slides
 * in behind it; on press the pill compresses slightly. Colour carries the
 * state for reduced-motion users.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = "right",
  size = "md",
  className,
  ...rest
}: ButtonLinkProps) {
  const Icon = icons[arrow];
  const iconClass = "absolute inset-0 size-4 transition-transform duration-(--duration-slow) ease-(--ease-out-expo)";
  return (
    <a
      href={href}
      className={cn(
        "group/btn inline-flex items-center gap-3 rounded-control font-medium whitespace-nowrap",
        "transition-[background-color,border-color,color,scale] duration-(--duration-base) ease-(--ease-out-quart) active:scale-[0.97]",
        size === "lg" ? "h-14 pr-6 pl-7 text-base" : "h-12 pr-4 pl-5 text-[0.9375rem] xs:pr-5 xs:pl-6",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
      <span aria-hidden className="relative size-4 overflow-hidden">
        <Icon className={cn(iconClass, exit[arrow])} />
        <Icon className={cn(iconClass, enter[arrow])} />
      </span>
    </a>
  );
}
