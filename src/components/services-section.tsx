import { ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { services } from "@/content/services";
import { SectionHeader } from "./section-header";

const mailto = (subject: string) => `mailto:${profile.links.email}?subject=${encodeURIComponent(subject)}`;

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="theme-light px-gutter py-section">
      <SectionHeader
        index="02"
        label="Services"
        id="services-title"
        title={
          <>
            What I <em>make</em>
          </>
        }
        aside={
          <p className="max-w-[40ch]">
            Editing and motion for brands, studios and teams, from the first assembly cut to final delivery.
          </p>
        }
      />

      <ol className="mt-14 border-t border-line sm:mt-20">
        {services.map((service, i) => (
          <li key={service.title} className="reveal border-b border-line">
            {/* Whole row is the enquiry link. On fine pointers the row inverts on hover. */}
            <a
              href={mailto(`Enquiry: ${service.title}`)}
              className="group/svc relative isolate -mx-gutter grid gap-x-gutter gap-y-4 px-gutter py-8 sm:py-10 lg:grid-cols-12 lg:items-center"
            >
              <span
                aria-hidden
                className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-fg transition-transform duration-(--duration-slow) ease-(--ease-out-expo) pointer-fine:group-hover/svc:scale-y-100"
              />
              <span className="font-serif text-[1.75rem] leading-none text-muted italic transition-colors pointer-fine:group-hover/svc:text-signal lg:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-[clamp(1.75rem,3.4vw,3rem)] leading-[1] font-semibold tracking-[-0.035em] text-fg transition-colors pointer-fine:group-hover/svc:text-bg lg:col-span-5">
                {service.title}
              </h3>
              <p className="max-w-[44ch] text-muted transition-colors pointer-fine:group-hover/svc:text-bg/75 lg:col-span-3">
                {service.description}
              </p>
              <ul className="flex flex-wrap gap-1.5 lg:col-span-2" aria-label="Tools">
                {service.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-control border border-line px-2.5 py-1 text-small whitespace-nowrap text-muted transition-colors pointer-fine:group-hover/svc:border-bg/25 pointer-fine:group-hover/svc:text-bg/80"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
              <span className="flex items-center gap-2 text-small text-fg transition-colors pointer-fine:group-hover/svc:text-bg lg:col-span-1 lg:justify-self-end">
                <span aria-hidden className="lg:hidden">
                  Enquire
                </span>
                <span className="sr-only">Enquire about {service.title.toLowerCase()} (opens your email app)</span>
                <span
                  aria-hidden
                  className="grid size-11 place-items-center rounded-full border border-line transition-[background-color,border-color,color,rotate] duration-(--duration-base) pointer-fine:group-hover/svc:-rotate-45 pointer-fine:group-hover/svc:border-signal pointer-fine:group-hover/svc:bg-signal pointer-fine:group-hover/svc:text-ink"
                >
                  <ArrowUpRight className="size-4 rotate-45" />
                </span>
              </span>
            </a>
          </li>
        ))}
      </ol>

      <p className="reveal mt-10 text-muted">
        Not sure which fits?{" "}
        <a href="#contact" className="text-fg underline decoration-line underline-offset-4 hover:decoration-fg">
          Tell me about the project
        </a>
        .
      </p>
    </section>
  );
}
