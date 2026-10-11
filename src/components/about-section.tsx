import { about, profile } from "@/content/profile";
import { SectionHeader } from "./section-header";

/** About + toolkit. All facts come from src/content/profile.ts. */
export function AboutSection() {
  const facts = [
    { term: "Based in", detail: `${profile.location.city}, ${profile.location.country}` },
    { term: "Currently", detail: `${profile.current.title}, ${profile.current.organization}` },
    { term: "Languages", detail: profile.languages.join(", ") },
    ...profile.education.map((e, i) => ({
      term: i === 0 ? "Education" : "",
      // Word joiner keeps "2021–2024" on one line.
      detail: [e.qualification, e.institution, e.period?.replace("–", "–⁠")].filter(Boolean).join(" · "),
    })),
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="theme-dark px-gutter py-section">
      <SectionHeader
        index="03"
        label="About"
        id="about-title"
        title={
          <>
            Every frame, <em>on purpose.</em>
          </>
        }
      />

      <div className="mt-14 grid gap-x-gutter gap-y-14 sm:mt-20 lg:grid-cols-12">
        {/* Facts */}
        <div className="reveal lg:col-span-5">
          <p className="flex items-end gap-4 border-b border-line pb-6">
            <span className="font-serif text-[clamp(5rem,13vw,9.5rem)] leading-[0.8] text-signal italic">
              {profile.experienceYears}
            </span>
            <span className="max-w-[12ch] pb-2 font-display text-lg leading-tight font-semibold tracking-[-0.02em]">
              years in editing &amp; motion
            </span>
          </p>
          <dl>
            {facts.map(({ term, detail }) => (
              <div key={detail} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                <dt className="text-label text-muted uppercase sm:pt-0.5">{term}</dt>
                <dd>{detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Bio */}
        <div className="reveal space-y-6 lg:col-span-6 lg:col-start-7">
          {about.paragraphs.map((p, i) => (
            <p
              key={p}
              className={
                i === 0
                  ? "font-display text-[clamp(1.375rem,2.4vw,2rem)] leading-[1.25] font-medium tracking-[-0.02em] [text-wrap:pretty]"
                  : "max-w-[52ch] text-lead text-muted [text-wrap:pretty]"
              }
            >
              {p}
            </p>
          ))}
        </div>
      </div>

      {/* Toolkit */}
      <div className="mt-24 grid gap-x-gutter gap-y-12 sm:mt-32 lg:grid-cols-12">
        <div className="reveal lg:col-span-12">
          <h3 className="flex items-center gap-3 text-label text-muted uppercase">
            <span className="font-serif text-[1.375rem] leading-none tracking-normal text-fg normal-case italic">Toolkit</span>
            <span aria-hidden className="h-px w-8 bg-line" />
            Software &amp; skills
          </h3>
        </div>

        <ul aria-label="Software" className="reveal grid grid-cols-2 gap-3 lg:col-span-6">
          {profile.software.map((tool) => (
            <li key={tool.name} className="flex flex-col justify-between gap-10 rounded-frame bg-surface p-5 sm:p-6">
              {/* Neutral monogram, not a reproduction of the vendor logo. */}
              <span aria-hidden className="font-serif text-[clamp(2.75rem,5vw,4rem)] leading-none text-signal italic">
                {tool.short}
              </span>
              <span>
                <span className="block font-medium">{tool.name.replace("Adobe ", "")}</span>
                <span className="mt-0.5 block text-small text-muted">
                  <span className="sr-only">Adobe, used for </span>
                  {tool.use}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:col-start-8 lg:grid-cols-1">
          {profile.skillGroups.map((group) => (
            <div key={group.label} className="reveal">
              <h4 className="text-label text-muted uppercase">{group.label}</h4>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-control border border-line px-4 py-2 font-display text-[1.0625rem] tracking-[-0.01em]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
