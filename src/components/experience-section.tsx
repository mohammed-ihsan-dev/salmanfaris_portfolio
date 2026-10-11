import { experience, formatPeriod, profile } from "@/content/profile";
import { ButtonLink } from "./ui/button-link";

/**
 * Recruiter-first experience list. Every entry comes from the CV/confirmed
 * details in profile.ts; roles with no documented responsibilities show none.
 */
export function ExperienceSection() {
  const since = Math.min(...experience.map((r) => r.start));

  return (
    <section id="experience" aria-labelledby="experience-title" className="theme-light px-gutter py-section">
      <div className="grid gap-x-gutter gap-y-14 lg:grid-cols-12">
        <div className="reveal lg:sticky lg:top-[calc(var(--spacing-nav)+2.5rem)] lg:col-span-4 lg:self-start">
          <p className="flex items-center gap-3 text-label text-muted uppercase">
            <span className="font-serif text-[1.375rem] leading-none tracking-normal text-fg normal-case italic">04</span>
            <span aria-hidden className="h-px w-8 bg-line" />
            Experience
          </p>
          <h2 id="experience-title" className="display-section mt-6">
            The edit <em>so far</em>
          </h2>
          <p className="mt-8 font-display text-lg font-semibold tracking-[-0.02em]">
            {since}
            <span className="font-serif font-normal text-muted italic"> to </span>
            now
            <span className="block text-base font-normal tracking-normal text-muted">
              {experience.length} roles across editing, motion and post-production
            </span>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={profile.links.cv} arrow="down" download="Salman-Faris-CV.pdf">
              Download CV
            </ButtonLink>
            <ButtonLink href={profile.links.linkedin} variant="outline" arrow="up-right" target="_blank" rel="noopener noreferrer">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </ButtonLink>
          </div>
        </div>

        <ol className="border-t border-line lg:col-span-8">
          {experience.map((role) => {
            const current = role.end === null;
            return (
              <li
                key={role.organization}
                className="reveal grid gap-x-8 gap-y-3 border-b border-line py-7 sm:grid-cols-[9.5rem_1fr] sm:py-9"
              >
                <p className="flex items-center gap-2.5 self-start text-small text-muted tabular-nums sm:pt-2.5">
                  {current && (
                    <span className="inline-flex items-center gap-1.5 rounded-control bg-signal px-2 py-0.5 text-[0.6875rem] font-semibold tracking-[0.08em] text-ink uppercase">
                      <span aria-hidden className="size-1.5 rounded-full bg-ink" />
                      Now
                    </span>
                  )}
                  <span className="whitespace-nowrap">{formatPeriod(role)}</span>
                </p>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
                      {role.organization}
                    </h3>
                    <p className="text-small text-muted">{role.location}</p>
                  </div>
                  <p className="mt-1.5 font-serif text-[1.25rem] leading-snug italic">{role.title}</p>
                  {role.notes.length > 0 && (
                    <ul className="mt-4 space-y-2 text-muted">
                      {role.notes.map((n) => (
                        <li key={n} className="flex gap-3">
                          <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-muted/60" />
                          <span className="max-w-[60ch]">{n}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
