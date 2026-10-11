import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MediaPlayer } from "@/components/media/media-player";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ButtonLink } from "@/components/ui/button-link";
import { Frame } from "@/components/media/frame";
import { PlaceholderArt } from "@/components/media/placeholder-art";
import { profile } from "@/content/profile";
import { getProject, projects } from "@/content/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${profile.name}`,
    description: project.summary,
    ...(project.preview ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const meta = [
    { term: "Client", detail: project.client },
    { term: "Category", detail: project.category },
    { term: "Role", detail: project.role },
    { term: "Year", detail: project.year?.toString() },
    { term: "Tools", detail: project.tools?.join(", ") },
  ].filter((m): m is { term: string; detail: string } => Boolean(m.detail));

  return (
    <>
      <SiteHeader />
      <main id="main">
        <article id="top" className="theme-light px-gutter pt-[calc(var(--spacing-nav)+2rem)] pb-section">
          <Link
            href="/#work"
            className="group/back inline-flex min-h-10 items-center gap-2 text-small text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft aria-hidden className="size-4 transition-transform duration-(--duration-base) group-hover/back:-translate-x-0.5" />
            All work
          </Link>

          {project.preview && (
            <p className="mt-6 flex w-fit rounded-control bg-ink px-3 py-1 text-label text-paper uppercase">
              Layout preview · not real work · development only
            </p>
          )}

          <header className="mt-8 grid gap-x-gutter gap-y-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="intro-up flex items-center gap-3 text-label text-muted uppercase">
                <span aria-hidden className="size-2 rounded-full bg-signal" />
                {project.category}
              </p>
              <h1 className="intro-up display-section mt-5" style={{ "--delay": "80ms" } as React.CSSProperties}>
                {project.title}
              </h1>
            </div>
            <dl className="intro-up lg:col-span-4" style={{ "--delay": "160ms" } as React.CSSProperties}>
              {meta.map(({ term, detail }) => (
                <div key={term} className="grid grid-cols-[6.5rem_1fr] gap-4 border-t border-line py-3 last:border-b">
                  <dt className="text-label text-muted uppercase">{term}</dt>
                  <dd className="text-small">{detail}</dd>
                </div>
              ))}
            </dl>
          </header>

          <div className="intro-frame mt-12 sm:mt-16">
            {project.media ? (
              <MediaPlayer
                title={project.title}
                sources={project.media.sources}
                poster={project.media.poster}
                aspectRatio={project.media.aspectRatio}
                className="rounded-frame"
              />
            ) : project.thumbnail ? (
              <Frame aspectRatio="16 / 9">
                <Image src={project.thumbnail.src} alt={project.thumbnail.alt} fill priority sizes="100vw" className="object-cover" />
              </Frame>
            ) : (
              <Frame aspectRatio="16 / 9" tag="Placeholder">
                <PlaceholderArt variant={project.art ?? "slate"} label={project.category.split(" ")[0]} />
              </Frame>
            )}
          </div>

          <div className="mt-16 grid gap-x-gutter gap-y-14 sm:mt-24 lg:grid-cols-12">
            <p className="reveal font-display text-[clamp(1.375rem,2.4vw,2rem)] leading-[1.25] font-medium tracking-[-0.02em] lg:col-span-5">
              {project.summary}
            </p>
            <div className="space-y-14 lg:col-span-6 lg:col-start-7">
              {project.brief && (
                <section className="reveal">
                  <h2 className="border-b border-line pb-3 text-label text-muted uppercase">Brief &amp; objective</h2>
                  <p className="mt-4 text-lead text-muted">{project.brief}</p>
                </section>
              )}
              {project.approach && project.approach.length > 0 && (
                <section className="reveal">
                  <h2 className="border-b border-line pb-3 text-label text-muted uppercase">Creative approach</h2>
                  <ol>
                    {project.approach.map((step, i) => (
                      <li key={step} className="grid grid-cols-[2.5rem_1fr] border-b border-line py-4 text-muted">
                        <span className="font-serif text-lg text-fg italic">0{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </section>
              )}
              {project.outcome && (
                <section className="reveal">
                  <h2 className="border-b border-line pb-3 text-label text-muted uppercase">Outcome</h2>
                  <p className="mt-4 text-lead text-muted">{project.outcome}</p>
                </section>
              )}
            </div>
          </div>

          {project.stills && project.stills.length > 0 && (
            <ul className="mt-20 grid gap-gutter sm:grid-cols-2">
              {project.stills.map((still) => (
                <li key={still.src} className="reveal-clip">
                  <Frame aspectRatio="16 / 9">
                    <Image src={still.src} alt={still.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </Frame>
                </li>
              ))}
            </ul>
          )}
        </article>

        <nav aria-label="More work" className="theme-dark px-gutter py-section">
          {next && next !== project && (
            <Link href={`/work/${next.slug}`} className="group/next block">
              <span className="text-label text-muted uppercase">Next project</span>
              <span className="mt-4 flex items-center justify-between gap-6">
                <span className="display-section transition-colors group-hover/next:text-signal">{next.title}</span>
                <ArrowRight
                  aria-hidden
                  className="size-10 shrink-0 text-muted transition-transform duration-(--duration-slow) ease-(--ease-out-expo) group-hover/next:translate-x-2 group-hover/next:text-signal"
                />
              </span>
            </Link>
          )}
          <div className="mt-14 flex flex-wrap gap-3">
            <ButtonLink href="/#contact" variant="accent" arrow="up-right">
              Start a project
            </ButtonLink>
            <ButtonLink href="/#work" variant="outline">
              All work
            </ButtonLink>
          </div>
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
