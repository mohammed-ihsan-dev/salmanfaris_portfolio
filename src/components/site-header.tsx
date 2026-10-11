"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { navigation, profile } from "@/content/profile";
import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { Wordmark } from "./wordmark";

const idOf = (href: string) => href.split("#")[1] ?? "";
const sectionIds = navigation.map((item) => idOf(item.href));

/** Highlights the nav item for the section currently crossing the upper third of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActive(sectionIds.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return active;
}

export function SiteHeader() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // Hairline under the header only once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, close on Escape, keep Tab inside the header, restore focus.
  useEffect(() => {
    if (!open) return;
    const header = headerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !header) return;
      const focusables = Array.from(header.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")).filter(
        (el) => el.offsetParent !== null,
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const closeOnDesktop = window.matchMedia("(min-width: 64rem)");
    const onResize = () => closeOnDesktop.matches && setOpen(false);

    document.addEventListener("keydown", onKeyDown);
    closeOnDesktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      closeOnDesktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "intro-nav theme-light fixed inset-x-0 top-0 z-50 border-b transition-colors duration-(--duration-base)",
        scrolled || open ? "border-line" : "border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only z-10 rounded-control bg-fg px-4 py-2 text-small font-medium text-bg focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <div className="flex h-nav items-center justify-between gap-6 px-gutter">
        <Link href="/#top" className="-m-2 p-2" aria-label="Salman Faris, home" onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = active === idOf(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "flex h-10 items-center gap-2 rounded-control px-3.5 text-[0.875rem] transition-colors duration-(--duration-fast)",
                      isActive ? "bg-surface text-fg" : "text-muted hover:bg-surface hover:text-fg",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "size-1.5 rounded-full bg-signal transition-[scale,opacity] duration-(--duration-base) ease-(--ease-out-quart)",
                        isActive ? "scale-100 opacity-100" : "-mr-3.5 scale-0 opacity-0",
                      )}
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="ml-3">
              <HireMe />
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 lg:hidden">
          <HireMe compact onClick={() => setOpen(false)} />
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 min-w-10 items-center justify-center gap-2.5 rounded-control border border-line px-3.5 text-small text-fg"
          >
            <span className="sr-only xs:not-sr-only">{open ? "Close" : "Menu"}</span>
            <span aria-hidden className="relative block h-2.5 w-4">
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-4 bg-current transition-transform duration-(--duration-base) ease-(--ease-out-quart)",
                  open ? "top-1/2 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-4 bg-current transition-transform duration-(--duration-base) ease-(--ease-out-quart)",
                  open ? "top-1/2 -rotate-45" : "top-full",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-menu"
            aria-label="Primary"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: duration.base, ease: ease.inOut } }}
            transition={{ duration: duration.slow, ease: ease.outExpo }}
            className="theme-dark fixed inset-x-0 top-nav bottom-0 flex flex-col justify-between overflow-y-auto px-gutter pt-6 pb-8 lg:hidden"
          >
            <ul className="flex flex-col">
              {navigation.map((item, index) => (
                <m.li
                  key={item.href}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: duration.slow, ease: ease.outExpo, delay: 0.08 + index * 0.05 }}
                  className="border-b border-line"
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-4 font-display text-[clamp(2rem,9.5vw,3rem)] leading-none font-semibold tracking-[-0.04em]"
                  >
                    <span className="w-8 font-serif text-[0.5em] font-normal text-muted italic">0{index + 1}</span>
                    {item.label}
                  </Link>
                </m.li>
              ))}
            </ul>
            <div className="mt-10 space-y-5">
              <p className="text-small text-muted">
                {profile.title} · {profile.location.city}, {profile.location.country}
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={profile.links.cv}
                  download="Salman-Faris-CV.pdf"
                  className="inline-flex h-11 items-center gap-2 rounded-control bg-fg px-5 text-small font-medium text-bg"
                >
                  <Download aria-hidden className="size-4" />
                  Download CV
                </a>
                <a
                  href={`mailto:${profile.links.email}`}
                  className="inline-flex h-11 items-center gap-2 rounded-control border border-line px-5 text-small text-fg"
                >
                  <Mail aria-hidden className="size-4" />
                  Email
                </a>
                {profile.links.instagram && (
                  <a
                    href={profile.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-1.5 rounded-control border border-line px-4 text-small text-fg"
                  >
                    <span>Instagram</span>
                    <ArrowUpRight aria-hidden className="size-3.5 text-muted" />
                  </a>
                )}
              </div>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function HireMe({ compact = false, onClick }: { compact?: boolean; onClick?: () => void }) {
  return (
    <Link
      href="/#contact"
      onClick={onClick}
      className={cn(
        "group/hire inline-flex h-10 items-center gap-1.5 rounded-control bg-fg font-medium whitespace-nowrap text-bg",
        "transition-[background-color,color,scale] duration-(--duration-base) ease-(--ease-out-quart) hover:bg-signal hover:text-ink active:scale-[0.97]",
        compact ? "px-4 text-small" : "px-5 text-[0.875rem]",
      )}
    >
      Hire me
      <ArrowUpRight
        aria-hidden
        className="size-3.5 transition-transform duration-(--duration-base) ease-(--ease-out-quart) group-hover/hire:translate-x-0.5 group-hover/hire:-translate-y-0.5"
      />
    </Link>
  );
}
