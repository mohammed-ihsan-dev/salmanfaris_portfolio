import type { ArtVariant } from "@/components/media/placeholder-art";
import type { MediaSource } from "@/components/media/types";

export const categories = [
  "Commercial & Promotional",
  "Motion Graphics",
  "Educational Content",
  "Wedding Films",
  "Graphic Design",
] as const;
export type Category = (typeof categories)[number];

export type Project = {
  slug: string;
  title: string;
  category: Category;
  year?: number;
  /** Verified client or organization only. */
  client?: string;
  /** Salman's actual role on the project. */
  role: string;
  summary: string;
  thumbnail?: { src: string; alt: string };
  /** Short muted loop played on desktop hover in the gallery (e.g. "/media/work/x/preview.mp4"). */
  previewSrc?: string;
  media?: { sources: MediaSource[]; poster?: string; aspectRatio: string };
  brief?: string;
  approach?: string[];
  tools?: string[];
  /** Only documented results. Never estimated. */
  outcome?: string;
  stills?: { src: string; alt: string }[];
  /** Placeholder composition used when there's no thumbnail yet. */
  art?: ArtVariant;
  /** Development-only layout preview. Never rendered in production. */
  preview?: true;
};

/**
 * Published projects. Add verified work here (media in /public/media/work/…).
 * Empty until Salman supplies project files.
 */
const published: Project[] = [];

/** Neutral layout previews so the gallery and case-study design can be reviewed in `npm run dev`. */
const layoutPreviews: Project[] = [
  {
    slug: "preview-commercial",
    title: "Layout preview — commercial",
    category: "Commercial & Promotional",
    role: "Editing, motion graphics, color",
    summary: "Placeholder entry used to review the case-study layout. Not real work.",
    brief: "Placeholder text for the project brief and objective.",
    approach: ["Placeholder for the creative approach.", "Placeholder for a second step in the process."],
    tools: ["Adobe Premiere Pro", "Adobe After Effects"],
    art: "bars",
    preview: true,
  },
  {
    slug: "preview-motion",
    title: "Layout preview — motion",
    category: "Motion Graphics",
    role: "Motion design",
    summary: "Placeholder entry. Not real work.",
    art: "type",
    preview: true,
  },
  {
    slug: "preview-education",
    title: "Layout preview — education",
    category: "Educational Content",
    role: "Editing & post-production",
    summary: "Placeholder entry. Not real work.",
    art: "guides",
    preview: true,
  },
];

export const projects: Project[] = process.env.NODE_ENV === "development" ? [...published, ...layoutPreviews] : published;

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
