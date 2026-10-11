import { cn } from "@/lib/cn";
import { Frame } from "../media/frame";

/**
 * Editorial slots for the work grid. Each position has its own span, ratio
 * and vertical offset, so the gallery reads as a composed spread rather than
 * a grid of identical cards. Slots repeat every four items.
 */
export const workSlots = [
  { span: "md:col-span-2 lg:col-span-8", ratio: "16 / 10", offset: "" },
  { span: "lg:col-span-4", ratio: "4 / 5", offset: "lg:mt-40" },
  { span: "lg:col-span-5", ratio: "1 / 1", offset: "lg:-mt-24" },
  { span: "md:col-span-2 lg:col-span-7", ratio: "16 / 9", offset: "lg:mt-24" },
] as const;

type WorkTileProps = {
  index: number;
  title: string;
  /** One line under the title: role, organizations… */
  meta: string;
  category: string;
  /** Art, image or video layer; scales gently on hover. */
  media: React.ReactNode;
  /** Optional layer above the media (e.g. hover video). */
  overlay?: React.ReactNode;
  tag?: string;
  /** Right-hand action (link). When `href` is set the whole tile is the link instead. */
  action?: React.ReactNode;
  href?: string;
};

export function WorkTile({ index, title, meta, category, media, overlay, tag, action, href }: WorkTileProps) {
  const slot = workSlots[index % workSlots.length];
  const Wrapper = href ? "a" : "div";

  return (
    <li className={cn("group/tile", slot.span, slot.offset)}>
      <Wrapper {...(href ? { href } : {})} className="block">
        <div className="reveal-clip">
          <Frame aspectRatio={slot.ratio} tag={tag} meta={category}>
            <div className="absolute inset-0 transition-transform duration-[1200ms] ease-(--ease-out-expo) motion-safe:group-hover/tile:scale-[1.035]">
              {media}
            </div>
            {overlay}
          </Frame>
        </div>
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="flex gap-4">
            <span className="w-8 shrink-0 pt-1 font-serif text-[1.375rem] leading-none text-muted italic">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-display text-[clamp(1.375rem,2.3vw,2.125rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-fg">
                <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-(--duration-slow) ease-(--ease-out-expo) group-hover/tile:bg-[length:100%_2px]">
                  {title}
                </span>
              </h3>
              <p className="mt-2 text-small text-muted">{meta}</p>
            </div>
          </div>
          {action && <div className="pl-12 sm:pl-0">{action}</div>}
        </div>
      </Wrapper>
    </li>
  );
}
