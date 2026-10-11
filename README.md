# Salman Faris — Portfolio

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Motion for React · Lucide.

```bash
npm run dev     # http://localhost:3000 (also shows "layout preview" projects)
npm run build   # production build (type-checks and lints)
npm start
npm run cv      # regenerate public/cv/salman-faris-cv.pdf from /cv (app must be running; CV_URL to override)
```

## Where content lives

All copy and facts live in `src/content`. Components never hard-code them.

| File | What to edit |
| --- | --- |
| `src/content/profile.ts` | Experience, skills, education, languages, email/LinkedIn/Instagram/WhatsApp, about copy |
| `src/content/showreel.ts` | Hero showreel sources and poster (empty = neutral placeholder) |
| `src/content/projects.ts` | Published projects for the gallery and `/work/[slug]` case studies |

After changing `profile.ts`, run `npm run cv` so the downloadable PDF matches.

### Adding a project

Put media in `public/media/work/<slug>/` and add an entry to `published` in `projects.ts`: title, category, role, summary, thumbnail, and optionally media, brief, approach, tools, stills. Only add `client` and `outcome` when they are verified. Optionally add `previewSrc` (a short muted loop, played on desktop hover) and `art` (placeholder composition until a thumbnail exists). With no published projects, the Selected Work section shows one labelled placeholder frame per discipline from his experience instead of a gallery. The `layoutPreviews` entries exist only in `npm run dev` and return 404 in production.

### Adding the showreel

Add WebM and MP4 files plus a poster to `public/media/` and fill in `landscape` in `src/content/showreel.ts`; it replaces the slate in the hero's main frame. An optional vertical `portrait` cut replaces the orange 9:16 frame. Videos only load once they're near the viewport. No component changes are needed.

## Environment

| Variable | Effect |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Final domain, e.g. `https://salmanfaris.com`. Enables indexing, canonical URL, sitemap and absolute OG URLs. **Unset = noindex everywhere.** |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL` | Enable the enquiry form (delivered via [Resend](https://resend.com)). Unset = the section offers a pre-filled email instead. Read at build time. |
| `CONTACT_FROM_EMAIL` | Sender on a Resend-verified domain. The default test sender only delivers to the Resend account owner. |

## Design system

"Studio Editorial": warm paper and deep ink sections, one signal accent, Inter Tight display with Instrument Serif italic accents.

- Tokens live in `src/app/globals.css`. Fixed palette (`paper`, `ink`, `signal`…) plus theme-aware colours (`bg`, `fg`, `muted`, `line`, `surface`) that flip per section via `.theme-light`, `.theme-dark` and `.theme-signal`. Motion values are mirrored in `src/lib/motion.ts`.
- Signal `#FF4A1C` is for fills, large type and indicators only. It's too light for small text on paper.
- `<em>` inside `.display-*` headings switches to the serif italic.
- Placeholder media comes from `src/components/media/placeholder-art.tsx` (bars, slate, type, guides, wave, letterbox). It's always shown inside a labelled `Frame` and never presented as real work.
- Intro animations and scroll reveals, frame wipes and parallax are CSS-only, so content never waits on JavaScript. They're disabled under `prefers-reduced-motion`.

## Privacy and accuracy

Deliberately **not** published: date of birth, the +91 phone number (pending approval), and the original CV PDF. The site and the generated CV use the confirmed details (Dubai, Akbar Travels, SATA Academy ended 2026, 5+ years). Roles that overlap in the CV are shown exactly as the CV states them.
