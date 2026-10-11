import { cn } from "@/lib/cn";

/**
 * Art-directed stand-ins used until real footage exists. Each borrows the
 * visual language of an editor's toolkit (test bars, slates, safe-area
 * guides, waveforms, letterboxing), so the layout looks finished while
 * never imitating actual client work. Always rendered inside a frame that
 * carries an explicit "Placeholder" label. Purely decorative (aria-hidden).
 *
 * Sizes use container-query units, so every composition scales with its frame.
 */
export type ArtVariant = "bars" | "slate" | "type" | "guides" | "wave" | "letterbox";

type PlaceholderArtProps = {
  variant: ArtVariant;
  /** Main word or title shown in the composition, e.g. "Motion". */
  label?: string;
  /** Small secondary text, e.g. "Showreel 2026". */
  caption?: string;
  className?: string;
};

export function PlaceholderArt({ variant, label = "", caption = "", className }: PlaceholderArtProps) {
  const Art = variants[variant];
  return (
    <div aria-hidden className={cn("absolute inset-0 overflow-hidden [container-type:size] select-none", className)}>
      <Art label={label} caption={caption} />
    </div>
  );
}

type ArtProps = { label: string; caption: string };

const small = "text-[max(9px,2.6cqmin)] font-medium tracking-[0.14em] uppercase";
const TIMECODE = "00:00:00:00";

/* Colour bars, re-voiced in the site palette. */
function Bars({ label, caption }: ArtProps) {
  const top = ["#d8c7a1", "#8faaa2", "#2f4bd6", "#f3efe7", "#ff4a1c", "#b8b2a7", "#2a2d35"];
  const mid = ["#2f4bd6", "#14161b", "#ff4a1c", "#14161b", "#8faaa2", "#14161b", "#f3efe7"];
  return (
    <div className="absolute inset-0 flex flex-col bg-ink">
      <div className="flex basis-[62%]">
        {top.map((c, i) => (
          <span key={i} className="flex-1" style={{ background: c }} />
        ))}
      </div>
      <div className="flex basis-[8%]">
        {mid.map((c, i) => (
          <span key={i} className="flex-1" style={{ background: c }} />
        ))}
      </div>
      <div className="flex flex-1 items-end justify-between gap-[3cqmin] p-[4cqmin] text-paper">
        <span className="font-serif text-[clamp(18px,11cqmin,120px)] leading-[0.85] italic">{label}</span>
        <span className={cn(small, "text-right tabular-nums text-paper/70")}>
          {caption && <span className="block">{caption}</span>}
          {TIMECODE}
        </span>
      </div>
    </div>
  );
}

/* Clapperboard slate. Fields are honest: it's a placeholder. */
function Slate({ label, caption }: ArtProps) {
  const fields = [
    ["Prod.", label || "Showreel"],
    ["Roll", caption || "—"],
    ["Scene", "01"],
    ["Take", "01"],
  ];
  return (
    <div className="absolute inset-0 flex flex-col bg-ink text-paper">
      <div
        className="basis-[16%] border-b-[0.8cqmin] border-ink"
        style={{
          backgroundImage:
            "repeating-linear-gradient(120deg, #f3efe7 0 7cqmin, #14161b 7cqmin 14cqmin)",
        }}
      />
      <div className="grid flex-1 grid-cols-2 grid-rows-2">
        {fields.map(([k, v], i) => (
          <div
            key={k}
            className={cn(
              "flex flex-col justify-between border-paper/15 p-[3.5cqmin]",
              i % 2 === 0 && "border-r",
              i < 2 && "border-b",
            )}
          >
            <span className={cn(small, "text-paper/55")}>{k}</span>
            <span className="truncate font-serif text-[clamp(16px,9cqmin,96px)] leading-none italic">{v}</span>
          </div>
        ))}
      </div>
      <div className={cn(small, "flex justify-between border-t border-paper/15 px-[3.5cqmin] py-[2.5cqmin] text-paper/55")}>
        <span>Placeholder</span>
        <span className="tabular-nums">{TIMECODE}</span>
      </div>
    </div>
  );
}

/* Type study on the signal colour: a cropped serif word and a lens circle. */
function TypeStudy({ label, caption }: ArtProps) {
  return (
    <div className="absolute inset-0 bg-signal text-ink">
      <span className="absolute top-[8%] right-[8%] aspect-square w-[46cqmin] rounded-full border border-ink/70" />
      <span className="absolute top-[8%] right-[calc(8%+23cqmin)] h-[46cqmin] w-px bg-ink/40" />
      <span className="absolute top-[calc(8%+23cqmin)] right-[8%] h-px w-[46cqmin] bg-ink/40" />
      <span className={cn(small, "absolute top-[5cqmin] left-[5cqmin]")}>{caption || "Fig. 01"}</span>
      <span className="absolute -bottom-[7cqh] -left-[3cqw] font-serif text-[clamp(48px,40cqmin,420px)] leading-none whitespace-nowrap italic">
        {label}
      </span>
    </div>
  );
}

/* Broadcast safe-area guides with a lower-third graphic. */
function Guides({ label, caption }: ArtProps) {
  return (
    <div className="absolute inset-0 bg-paper-deep text-ink">
      <span className="absolute inset-[5%] border border-dashed border-ink/30" />
      <span className="absolute inset-[10%] border border-ink/45" />
      <span className="absolute top-1/2 left-1/2 h-[8cqmin] w-px -translate-1/2 bg-ink/60" />
      <span className="absolute top-1/2 left-1/2 h-px w-[8cqmin] -translate-1/2 bg-ink/60" />
      <span className={cn(small, "absolute top-[12%] right-[12%] text-ink/60")}>{caption || "Title safe"}</span>
      <div className="absolute bottom-[14%] left-[12%] flex max-w-[76%] items-stretch">
        <span className="w-[2.2cqmin] shrink-0 bg-signal" />
        <span className="bg-ink px-[3cqmin] py-[2cqmin] text-paper">
          <span className="block font-display text-[clamp(13px,6cqmin,64px)] leading-tight font-semibold tracking-[-0.02em]">
            {label}
          </span>
          <span className={cn(small, "mt-[0.8cqmin] block text-paper/60")}>Lower third</span>
        </span>
      </div>
    </div>
  );
}

/* Audio waveform with a played section in the signal colour. */
function Wave({ label, caption }: ArtProps) {
  const bars = Array.from({ length: 56 }, (_, i) => {
    const v = Math.abs(Math.sin(i * 0.55) * 0.6 + Math.sin(i * 1.7) * 0.3 + Math.sin(i * 0.13) * 0.25);
    return Math.max(0.08, Math.min(1, v));
  });
  return (
    <div className="absolute inset-0 flex flex-col bg-ink text-paper">
      <div className={cn(small, "flex justify-between p-[4cqmin] text-paper/55")}>
        <span>{caption || "Audio"}</span>
        <span className="tabular-nums">{TIMECODE}</span>
      </div>
      <div className="relative flex flex-1 items-center gap-[0.7cqw] px-[4cqmin]">
        <span className="absolute inset-x-[4cqmin] top-1/2 h-px bg-paper/15" />
        {bars.map((h, i) => (
          <span
            key={i}
            className={cn("relative flex-1 rounded-full", i < 20 ? "bg-signal" : "bg-paper/70")}
            style={{ height: `${h * 62}%` }}
          />
        ))}
        <span className="absolute top-[8%] bottom-[8%] left-[calc(4cqmin+35%)] w-[0.5cqmin] bg-paper" />
      </div>
      <span className="p-[4cqmin] font-serif text-[clamp(16px,9cqmin,96px)] leading-none italic">{label}</span>
    </div>
  );
}

/* 2.39:1 letterbox over an abstract horizon. */
function Letterbox({ label, caption }: ArtProps) {
  return (
    <div className="absolute inset-0 flex flex-col justify-center bg-ink text-paper">
      <div className="relative w-full overflow-hidden bg-sand" style={{ height: "min(100%, calc(100cqw / 2.39))" }}>
        <span className="absolute inset-x-0 bottom-0 h-[38%] bg-[#c4b18a]" />
        <span className="absolute bottom-[30%] left-[62%] aspect-square w-[16cqmin] rounded-full bg-signal" />
        <span className="absolute inset-x-0 bottom-[38%] h-px bg-ink/25" />
        <span className="absolute bottom-[8%] left-[4cqmin] font-serif text-[clamp(18px,12cqmin,130px)] leading-none text-ink italic">
          {label}
        </span>
      </div>
      <div className={cn(small, "absolute inset-x-0 bottom-0 flex justify-between p-[3cqmin] text-paper/55")}>
        <span>{caption || "2.39 : 1"}</span>
        <span className="tabular-nums">{TIMECODE}</span>
      </div>
    </div>
  );
}

const variants: Record<ArtVariant, (p: ArtProps) => React.ReactElement> = {
  bars: Bars,
  slate: Slate,
  type: TypeStudy,
  guides: Guides,
  wave: Wave,
  letterbox: Letterbox,
};
