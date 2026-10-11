import { ArrowUpRight, Download } from "lucide-react";
import { profile } from "@/content/profile";
import { ButtonLink } from "../ui/button-link";
import { CopyButton } from "./copy-button";
import { EnquiryForm } from "./enquiry-form";

const enquiryMailto = `mailto:${profile.links.email}?subject=${encodeURIComponent("Project enquiry")}&body=${encodeURIComponent(
  "Hi Salman,\n\nWhat I'm making:\nWhere it will be seen:\nTimeline:\nReferences (optional):\n\n",
)}`;

export function ContactSection() {
  const formEnabled = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);
  const { email, linkedin, instagram, whatsapp, cv } = profile.links;

  const recruiterLinks = [
    { label: "Download CV", detail: "PDF · one page", href: cv, download: true },
    { label: "LinkedIn", detail: "Professional profile", href: linkedin, external: true },
    ...(instagram ? [{ label: "Instagram", detail: "@farzeoo · Reels & motion work", href: instagram, external: true }] : []),
    ...(whatsapp ? [{ label: "WhatsApp", detail: `+${whatsapp}`, href: `https://wa.me/${whatsapp}`, external: true }] : []),
  ];

  return (
    <section id="contact" aria-labelledby="contact-title">
      {/* Closing statement on the signal colour */}
      <div className="theme-signal px-gutter pt-section pb-16 sm:pb-24">
        <p className="reveal flex items-center gap-3 text-label uppercase">
          <span className="font-serif text-[1.375rem] leading-none tracking-normal normal-case italic">05</span>
          <span aria-hidden className="h-px w-8 bg-fg/40" />
          Contact
        </p>
        <h2 id="contact-title" className="display-xl reveal mt-8 max-w-[12ch]">
          Have a project <em>in mind?</em>
        </h2>
        <div className="reveal mt-12 grid gap-x-gutter gap-y-8 lg:grid-cols-12 lg:items-end">
          <p className="max-w-[40ch] text-lead text-muted lg:col-span-5">
            Let’s discuss how motion, editing and visual storytelling can bring your idea to life.
          </p>
          <div className="flex flex-wrap gap-3 lg:col-span-7 lg:justify-end">
            <ButtonLink href={enquiryMailto} size="lg" arrow="up-right">
              Email a project brief
            </ButtonLink>
            <CopyButton value={email} label="Copy email" className="h-14 px-6" />
          </div>
        </div>
      </div>

      {/* Two audiences, two paths */}
      <div className="theme-dark px-gutter py-20 sm:py-28">
        <div className="grid gap-x-gutter gap-y-16 lg:grid-cols-12">
          <div className="reveal lg:col-span-5">
            <h3 className="text-label text-muted uppercase">Recruiters &amp; studios</h3>
            <p className="mt-4 font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.1] font-semibold tracking-[-0.03em]">
              Hiring for an editing or <em className="serif-accent">motion</em> role?
            </p>
            <a
              href={`mailto:${email}`}
              className="mt-6 inline-block text-lead break-all text-fg underline decoration-line decoration-1 underline-offset-[6px] transition-[text-decoration-color] hover:decoration-signal"
            >
              {email}
            </a>
            <ul className="mt-8 border-t border-line">
              {recruiterLinks.map((l) => (
                <li key={l.label} className="border-b border-line">
                  <a
                    href={l.href}
                    {...("external" in l && l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    {...("download" in l ? { download: "Salman-Faris-CV.pdf" } : {})}
                    className="group/row flex items-center justify-between gap-4 py-5"
                  >
                    <span>
                      <span className="block text-lg transition-colors group-hover/row:text-signal">{l.label}</span>
                      <span className="text-small text-muted">
                        {l.detail}
                        {"external" in l && l.external && <span className="sr-only"> (opens in a new tab)</span>}
                      </span>
                    </span>
                    <span className="grid size-11 place-items-center rounded-full border border-line transition-colors duration-(--duration-base) group-hover/row:border-signal group-hover/row:bg-signal group-hover/row:text-ink">
                      {"download" in l ? (
                        <Download aria-hidden className="size-4" />
                      ) : (
                        <ArrowUpRight aria-hidden className="size-4" />
                      )}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal lg:col-span-6 lg:col-start-7">
            <h3 className="text-label text-muted uppercase">Start a project</h3>
            {formEnabled ? (
              <div className="mt-6">
                <EnquiryForm fallbackEmail={email} />
              </div>
            ) : (
              <div className="mt-4">
                <p className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.1] font-semibold tracking-[-0.03em]">
                  Commercials, motion graphics, social content or a <em className="serif-accent">full edit.</em>
                </p>
                <p className="mt-6 text-muted">A useful brief covers:</p>
                <ol className="mt-3 grid gap-px overflow-hidden rounded-frame bg-line sm:grid-cols-2">
                  {["What you’re making", "Where it will be seen", "Your timeline", "References you like"].map((item, i) => (
                    <li key={item} className="flex items-baseline gap-3 bg-surface px-4 py-4">
                      <span className="font-serif text-lg text-signal italic">0{i + 1}</span>
                      {item}
                    </li>
                  ))}
                </ol>
                <div className="mt-8">
                  <ButtonLink href={enquiryMailto} variant="accent" arrow="up-right">
                    Start the brief by email
                  </ButtonLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
