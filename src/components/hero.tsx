import { Download } from "lucide-react";
import { hero, profile } from "@/content/profile";
import { showreel } from "@/content/showreel";
import { LocalTime } from "./local-time";
import { Frame } from "./media/frame";
import { MediaPlayer } from "./media/media-player";
import { PlaceholderArt } from "./media/placeholder-art";
import { ButtonLink } from "./ui/button-link";

/** Headline words; `em` = serif-italic accent, `br` = forced line break. */
const headline: Array<{ word: string; em?: boolean; br?: boolean }> = [
  { word: "Crafting" },
  { word: "motion", br: true },
  { word: "that" },
  { word: "moves", em: true, br: true },
  { word: "people." },
];

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  const reelName = `${profile.name} ${showreel.title.toLowerCase()} ${showreel.year}`;
  const hasLandscape = showreel.landscape.sources.length > 0;
  const portrait = showreel.portrait && showreel.portrait.sources.length > 0 ? showreel.portrait : null;

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="theme-light overflow-x-clip px-gutter pt-[calc(var(--spacing-nav)+1.5rem)] pb-section short:pt-[calc(var(--spacing-nav)+1rem)] lg:pt-[calc(var(--spacing-nav)+1rem)]"
    >
      <div className="grid gap-x-gutter gap-y-14 short:grid-cols-12 short:items-center lg:min-h-[calc(100svh-var(--spacing-nav)-2rem)] lg:grid-cols-12 lg:items-center">
        {/* Statement */}
        <div className="short:col-span-7 lg:col-span-6">
          <p className="intro-up inline-flex h-8 items-center gap-2.5 rounded-control border border-line px-3.5 text-label text-fg uppercase">
            <span aria-hidden className="size-2 rounded-full bg-signal" />
            {hero.eyebrow}
          </p>

          <h1 id="hero-title" className="display-hero mt-7 short:mt-4 sm:mt-9">
            {headline.map(({ word, em, br }, i) => (
              <span key={word}>
                <span className="intro-word" style={{ "--i": i } as React.CSSProperties}>
                  <span>{em ? <em>{word}</em> : word}</span>
                </span>{" "}
                {br && <br className={word === "moves" ? "short:hidden" : undefined} />}
              </span>
            ))}
          </h1>

          <p className="intro-rise mt-7 max-w-[38ch] text-lead text-muted [text-wrap:pretty] short:mt-4 short:text-base" style={delay(480)}>
            {hero.intro}
          </p>

          <div className="intro-up mt-9 flex flex-wrap items-center gap-3 short:mt-5" style={delay(560)}>
            <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="outline" arrow="up-right">
              {hero.secondaryCta.label}
            </ButtonLink>
            <a
              href={hero.tertiaryCta.href}
              download="Salman-Faris-CV.pdf"
              className="group/cv inline-flex min-h-11 items-center gap-2 px-2 text-small text-muted transition-colors duration-(--duration-fast) hover:text-fg"
            >
              <Download
                aria-hidden
                className="size-4 transition-transform duration-(--duration-base) ease-(--ease-out-quart) group-hover/cv:translate-y-0.5"
              />
              <span className="underline decoration-line decoration-1 underline-offset-4 transition-[text-decoration-color] group-hover/cv:decoration-fg">
                {hero.tertiaryCta.label}
              </span>
            </a>
          </div>

          <dl
            className="intro-up mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-5 text-small sm:grid-cols-3"
            style={delay(660)}
          >
            <div>
              <dt className="text-label text-muted uppercase">Based in</dt>
              <dd className="mt-1.5 text-fg">
                {profile.location.city}, {profile.location.country}
                <span className="block text-muted">
                  <LocalTime timeZone={profile.location.timeZone} label={profile.location.zoneLabel} />
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-label text-muted uppercase">Currently</dt>
              <dd className="mt-1.5 text-fg">{profile.current.organization}</dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-label text-muted uppercase">Experience</dt>
              <dd className="mt-1.5 text-fg">{profile.experienceYears} years in editing &amp; motion</dd>
            </div>
          </dl>
        </div>

        {/* Media collage: showreel + vertical cut + grade study. Real media replaces each placeholder via config. */}
        <div id="reel" role="group" aria-label="Showreel preview" className="relative short:col-span-5 lg:col-span-6">
          <div className="relative mx-auto aspect-[1/0.96] w-full max-w-[44rem]">
            <div className="intro-frame absolute top-[3%] right-0 w-[86%]" style={delay(300)}>
              {hasLandscape ? (
                <MediaPlayer
                  title={reelName}
                  sources={showreel.landscape.sources}
                  poster={showreel.landscape.poster}
                  aspectRatio="16 / 9"
                  autoPlayPreview
                  className="rounded-frame"
                />
              ) : (
                <Frame aspectRatio="16 / 9" tag="Placeholder" meta={`${showreel.title} ’${showreel.year.slice(-2)}`}>
                  <PlaceholderArt variant="slate" label={showreel.title} caption={showreel.year} />
                </Frame>
              )}
            </div>

            <div className="drift absolute top-[42%] left-0 z-10 w-[37%]" style={{ "--drift": "1.75rem" } as React.CSSProperties}>
              <div className="intro-frame rounded-frame ring-[6px] ring-bg sm:ring-8" style={delay(480)}>
                {portrait ? (
                  <MediaPlayer
                    title={`${reelName}, vertical cut`}
                    sources={portrait.sources}
                    poster={portrait.poster}
                    aspectRatio="4 / 5"
                    autoPlayPreview
                    className="rounded-frame"
                  />
                ) : (
                  <Frame aspectRatio="4 / 5">
                    <PlaceholderArt variant="type" label="Motion" caption="9:16 · Vertical cut" />
                  </Frame>
                )}
              </div>
            </div>

            <div className="drift absolute top-[60%] right-[5%] w-[46%]" style={{ "--drift": "-1.25rem" } as React.CSSProperties}>
              <div className="intro-frame" style={delay(620)}>
                <Frame aspectRatio="4 / 3" meta="Grade">
                  <PlaceholderArt variant="bars" label="Colour" caption="Rec. 709" />
                </Frame>
              </div>
            </div>
          </div>
          <p className="intro-up mt-4 text-center text-small text-muted lg:text-right" style={delay(900)}>
            Placeholder compositions · {showreel.title} {showreel.year} coming soon
          </p>
        </div>
      </div>
    </section>
  );
}
