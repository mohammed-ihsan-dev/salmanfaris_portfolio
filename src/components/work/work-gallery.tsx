"use client";

import { useState } from "react";
import Image from "next/image";
import { m } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Category, Project } from "@/content/projects";
import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { PlaceholderArt } from "../media/placeholder-art";
import { HoverVideo } from "./hover-video";
import { WorkTile } from "./work-tile";

/** Published projects with an optional category filter (shown when there's more than one category). */
export function WorkGallery({ projects }: { projects: Project[] }) {
  const present = [...new Set(projects.map((p) => p.category))];
  const [filter, setFilter] = useState<Category | "All">("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      {present.length > 1 && (
        <div role="group" aria-label="Filter by category" className="-mx-gutter mb-12 flex gap-2 overflow-x-auto px-gutter pb-1">
          {(["All", ...present] as const).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
              className={cn(
                "h-10 shrink-0 rounded-control border px-4 text-small whitespace-nowrap transition-colors duration-(--duration-fast)",
                filter === item ? "border-signal bg-signal text-ink" : "border-line text-muted hover:border-fg hover:text-fg",
              )}
            >
              {item}
            </button>
          ))}
        </div>
      )}
      <p className="sr-only" role="status">
        {shown.length} {shown.length === 1 ? "project" : "projects"} shown
      </p>
      {/* Re-keyed per filter so the new set fades in as one composition. */}
      <m.ul
        key={filter}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration.slow, ease: ease.outExpo }}
        className="grid gap-x-gutter gap-y-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-y-20"
      >
        {shown.map((project, i) => (
          <WorkTile
            key={project.slug}
            index={i}
            href={`/work/${project.slug}`}
            title={project.title}
            category={project.category}
            meta={[project.client, project.role, project.year].filter(Boolean).join(" · ")}
            tag={project.preview ? "Layout preview · not real work" : undefined}
            media={
              project.thumbnail ? (
                <Image
                  src={project.thumbnail.src}
                  alt={project.thumbnail.alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                  ) : (
                    <PlaceholderArt variant={project.art ?? "slate"} label={project.category.split(" ")[0]} />
                  )
                }
                overlay={project.previewSrc ? <HoverVideo src={project.previewSrc} /> : undefined}
                action={
                  <span
                    aria-hidden
                    className="grid size-11 shrink-0 place-items-center rounded-full border border-line transition-colors duration-(--duration-base) group-hover/tile:border-signal group-hover/tile:bg-signal group-hover/tile:text-ink"
                  >
                    <ArrowUpRight className="size-4" />
                  </span>
                }
              />
        ))}
      </m.ul>
    </div>
  );
}
