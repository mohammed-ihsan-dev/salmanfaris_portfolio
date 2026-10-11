import type { MediaSource } from "@/components/media/types";

export type ReelCut = {
  sources: MediaSource[];
  poster?: string;
  /** CSS aspect-ratio of the frame, e.g. "16 / 9" or "9 / 16". */
  aspectRatio: string;
};

/**
 * Hero showreel configuration.
 *
 * `landscape` is the main reel. `portrait` is an optional vertical cut shown
 * on phones held upright (only the visible cut ever loads). Leave `sources`
 * empty until Salman supplies his real reel; the hero then shows a neutral,
 * clearly labelled placeholder. Never point this at stock footage.
 *
 * Example once supplied:
 *   landscape: {
 *     sources: [
 *       { src: "/media/showreel-2026.webm", type: "video/webm" },
 *       { src: "/media/showreel-2026.mp4", type: "video/mp4" },
 *     ],
 *     poster: "/media/showreel-2026-poster.jpg",
 *     aspectRatio: "16 / 9",
 *   },
 *   portrait: { sources: [{ src: "/media/showreel-2026-vertical.mp4", type: "video/mp4" }], aspectRatio: "9 / 16" },
 */
export const showreel: {
  title: string;
  year: string;
  landscape: ReelCut;
  portrait: ReelCut | null;
} = {
  title: "Showreel",
  year: "2026",
  landscape: { sources: [], aspectRatio: "16 / 9" },
  portrait: null,
};
