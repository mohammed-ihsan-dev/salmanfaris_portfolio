import { ArrowUpRight } from "lucide-react";
import { disciplines, profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { PlaceholderArt } from "../media/placeholder-art";
import { SectionHeader } from "../section-header";
import { ButtonLink } from "../ui/button-link";
import { WorkGallery } from "./work-gallery";
import { WorkTile } from "./work-tile";

const mailto = (subject: string) => `mailto:${profile.links.email}?subject=${encodeURIComponent(subject)}`;

export function WorkSection() {
  const hasProjects = projects.length > 0;

  return (
    <section id="work" aria-labelledby="work-title" className="theme-dark px-gutter py-section">
      <SectionHeader
        index="01"
        label="Selected work"
        id="work-title"
        title={
          <>
            Selected <em>work</em>
          </>
        }
        aside={
          hasProjects ? (
            <p className="max-w-[40ch]">A selection of edits and motion pieces, with the thinking behind each one.</p>
          ) : (
            <p className="max-w-[40ch]">
              Project films are being prepared for the web. Each frame below is a discipline from my professional
              experience, with where I practised it.
            </p>
          )
        }
      />

      <div className="mt-14 sm:mt-20">
        {hasProjects ? (
          <WorkGallery projects={projects} />
        ) : (
          // Honest pre-launch state: one labelled placeholder slot per verified discipline, no invented projects.
          <ul className="grid gap-x-gutter gap-y-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-y-20">
            {disciplines.map((d, i) => (
              <WorkTile
                key={d.name}
                index={i}
                title={d.name}
                category="Placeholder"
                meta={d.where.join(" · ")}
                media={<PlaceholderArt variant={d.art} label={d.name.split(" ")[0]} caption="Samples on request" />}
                action={
                  <a
                    href={mailto(`Work samples: ${d.name}`)}
                    className="group/req inline-flex min-h-11 shrink-0 items-center gap-1.5 text-small whitespace-nowrap text-fg"
                  >
                    <span className="underline decoration-line underline-offset-4 transition-[text-decoration-color] group-hover/req:decoration-signal">
                      Request samples
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 transition-transform duration-(--duration-base) group-hover/req:translate-x-0.5 group-hover/req:-translate-y-0.5"
                    />
                    <span className="sr-only">for {d.name.toLowerCase()} (opens your email app)</span>
                  </a>
                }
              />
            ))}
          </ul>
        )}
      </div>

      {/* Section CTA */}
      <div className="reveal mt-24 flex flex-col gap-6 rounded-frame border border-line p-6 sm:mt-32 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-[24ch] font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
          Want to see the <em className="serif-accent">full reel</em> first?
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={mailto("Showreel request")} variant="accent" arrow="up-right">
            Request the reel
          </ButtonLink>
          <ButtonLink href={profile.links.cv} variant="outline" arrow="down" download="Salman-Faris-CV.pdf">
            Download CV
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
