import type { ArtVariant } from "@/components/media/placeholder-art";

/**
 * Services, derived only from verified CV skills and experience.
 * No prices, packages, turnaround times or guarantees. To offer Graphic
 * Design or Digital Marketing, add an entry here once it's confirmed.
 */
export type Service = {
  title: string;
  description: string;
  /** Verified software from the CV. */
  tools: string[];
  art: ArtVariant;
};

export const services: Service[] = [
  {
    title: "Video editing",
    description: "Story-first edits from raw footage to final cut: structure, pacing, transitions and sound sync.",
    tools: ["Premiere Pro"],
    art: "wave",
  },
  {
    title: "Motion graphics",
    description: "Animated titles, graphics and brand motion that explain, emphasise and keep a video moving.",
    tools: ["After Effects", "Illustrator"],
    art: "type",
  },
  {
    title: "Commercial & promotional video",
    description: "Ads, promos and campaign edits shaped around a brand’s message and the platform they’ll run on.",
    tools: ["Premiere Pro", "After Effects"],
    art: "bars",
  },
  {
    title: "Color grading & post-production",
    description: "Grading, visual effects, sound sync and render-ready delivery for a consistent, finished look.",
    tools: ["Premiere Pro", "After Effects", "Photoshop"],
    art: "letterbox",
  },
];
