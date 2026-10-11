import type { Metadata } from "next";
import { about, experience, formatPeriod, profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "CV — Salman Faris",
  robots: { index: false, follow: false },
};

/**
 * Print-ready CV built from the same verified content as the site.
 * `npm run cv` renders it to public/cv/salman-faris-cv.pdf.
 * Intentionally omits date of birth and phone number.
 */
export default function CvPage() {
  return (
    <div className="cv-page min-h-screen bg-white px-6 py-10 text-[#101010] print:p-0 sm:px-12">
      <main className="mx-auto max-w-[46rem] text-[13px] leading-relaxed">
        <header className="border-b-2 border-[#101010] pb-5">
          <h1 className="font-display text-[34px] leading-none font-semibold tracking-[-0.03em] uppercase">{profile.name}</h1>
          <p className="mt-2 text-[15px] font-medium">{profile.title}</p>
          <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[#444]">
            <span>
              {profile.location.city}, {profile.location.country}
            </span>
            <a href={`mailto:${profile.links.email}`}>{profile.links.email}</a>
            <a href={profile.links.linkedin}>{profile.links.linkedin.replace("https://www.", "")}</a>
          </p>
        </header>

        <Section title="Profile">
          <p>
            Video editor and motion graphics artist with {profile.experienceYears} years creating visual content across advertising,
            education, brand and digital platforms. Experienced across the full post-production workflow: editing, motion design,
            color grading, visual effects, sound sync and final delivery.
          </p>
          <p className="mt-1 text-[#444] italic">{about.statement}</p>
        </Section>

        <Section title="Experience">
          <ol className="space-y-3.5">
            {experience.map((role) => (
              <li key={role.organization} className="break-inside-avoid">
                <div className="flex justify-between gap-4">
                  <p>
                    <strong className="font-semibold">{role.title}</strong> · {role.organization}, {role.location}
                  </p>
                  <p className="shrink-0 tabular-nums text-[#444]">{formatPeriod(role)}</p>
                </div>
                {role.notes.length > 0 && (
                  <ul className="mt-1 list-disc pl-5 text-[#333]">
                    {role.notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Skills">
          <p>
            <strong className="font-semibold">Software:</strong> {profile.software.map((s) => s.name).join(", ")}
          </p>
          {profile.skillGroups.map((g) => (
            <p key={g.label}>
              <strong className="font-semibold">{g.label}:</strong> {g.items.join(", ")}
            </p>
          ))}
        </Section>

        <div className="grid gap-x-10 sm:grid-cols-[1fr_auto]">
          <Section title="Education">
            {profile.education.map((e) => (
              <p key={e.qualification}>
                <strong className="font-semibold">{e.qualification}</strong>
                {e.institution && ` · ${e.institution}`}
                {e.period && <span className="text-[#444] tabular-nums"> · {e.period}</span>}
              </p>
            ))}
          </Section>
          <Section title="Languages">
            <p>{profile.languages.join(", ")}</p>
          </Section>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="mb-2.5 border-b border-[#ccc] pb-1 text-[11px] font-semibold tracking-[0.14em] uppercase">{title}</h2>
      {children}
    </section>
  );
}
