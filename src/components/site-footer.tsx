import { ArrowUp } from "lucide-react";
import { navigation, profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="theme-dark overflow-hidden border-t border-line px-gutter pt-16 pb-8">
      <div className="grid gap-x-gutter gap-y-10 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="max-w-[28ch] text-muted">
            {profile.title}, based in {profile.location.city}, {profile.location.country}.
          </p>
        </div>
        <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-muted transition-colors hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="space-y-2 lg:col-span-3">
          <li>
            <a href={`mailto:${profile.links.email}`} className="text-muted transition-colors hover:text-fg">
              Email
            </a>
          </li>
          <li>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-fg">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={profile.links.cv} download="Salman-Faris-CV.pdf" className="text-muted transition-colors hover:text-fg">
              Download CV
            </a>
          </li>
        </ul>
      </div>

      {/* Oversized sign-off */}
      <p aria-hidden className="display-xl mt-16 flex items-center gap-[0.12em] leading-none whitespace-nowrap sm:mt-24">
        <span className="size-[0.22em] shrink-0 rounded-full bg-signal" />
        Salman <em>Faris</em>
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-small text-muted">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <a href="#top" className="group/top inline-flex min-h-10 items-center gap-1.5 text-fg">
          Back to top
          <ArrowUp aria-hidden className="size-3.5 transition-transform duration-(--duration-base) group-hover/top:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
