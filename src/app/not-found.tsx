import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="theme-light flex min-h-svh flex-col justify-center px-gutter pt-nav pb-section">
        <p className="flex items-center gap-3 text-label text-muted uppercase">
          <span aria-hidden className="size-2 rounded-full bg-signal" />
          Error 404
        </p>
        <h1 className="display-section mt-6 max-w-[14ch]">
          This frame didn’t make the <em>final cut.</em>
        </h1>
        <p className="mt-6 max-w-[42ch] text-lead text-muted">The page you’re looking for doesn’t exist or has moved.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to the homepage</ButtonLink>
          <ButtonLink href="/#contact" variant="outline" arrow="up-right">
            Contact
          </ButtonLink>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
