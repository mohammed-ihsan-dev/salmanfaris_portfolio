/**
 * Verified profile content. Presentation components read from here only.
 *
 * Sources: confirmed details from Salman (current/previous roles, 5+ years,
 * Dubai base) and his CV (earlier roles, skills, education, languages, email).
 * Where they differ, the confirmed details win (SATA Academy ended in 2026,
 * he is now based in Dubai). Anything `null` is unknown or unapproved and is
 * hidden by the UI. Do not fill these in with guesses.
 *
 * Deliberately not published: date of birth, phone number (pending approval).
 */

export type Role = {
  organization: string;
  title: string;
  location: string;
  /** Inclusive calendar years as written in the CV. `end: null` = present. */
  start: number;
  end: number | null;
  /** Responsibilities as documented in the CV. Empty when the CV lists none. */
  notes: string[];
};

export const experience: Role[] = [
  {
    organization: "Akbar Travels",
    title: "Video Editor & Motion Graphics Artist",
    location: "Dubai, UAE",
    start: 2026,
    end: null,
    notes: [],
  },
  {
    organization: "SATA Academy",
    title: "Video Editor & Motion Artist",
    location: "Perinthalmanna, Kerala",
    start: 2025,
    end: 2026,
    notes: [
      "Produced educational and promotional videos.",
      "Managed the full post-production workflow: editing, motion graphics, color grading and final delivery.",
    ],
  },
  {
    organization: "Code 7",
    title: "Video Editor & Motion Artist",
    location: "Perinthalmanna, Kerala",
    start: 2025,
    end: 2025,
    notes: [
      "Delivered motion graphics and video edits aligned with client branding.",
      "Worked with designers and marketing teams to keep campaigns consistent.",
    ],
  },
  {
    organization: "Boby Chemmanur",
    title: "Video Editor & Motion Artist",
    location: "Thrissur, Kerala",
    start: 2024,
    end: 2025,
    notes: [
      "Created promotional and advertisement videos.",
      "Applied transitions, effects and storytelling techniques across brand content.",
    ],
  },
  {
    organization: "Shaah Advertising",
    title: "Video Editor & Motion Artist",
    location: "Mannarkkad, Kerala",
    start: 2023,
    end: 2024,
    notes: ["Edited commercial content and developed motion graphics for marketing campaigns."],
  },
  {
    organization: "Jora Weddings",
    title: "Video Editor & Motion Artist",
    location: "Mannarkkad, Kerala",
    start: 2022,
    end: 2023,
    notes: ["Produced cinematic wedding films with transitions, color grading and storytelling."],
  },
  {
    organization: "Dezone",
    title: "Video Editor",
    location: "Perinthalmanna, Kerala",
    start: 2022,
    end: 2023,
    notes: [],
  },
  {
    organization: "Kyurio Production",
    title: "Video Editor",
    location: "Mannarkkad, Kerala",
    start: 2021,
    end: 2022,
    notes: [],
  },
];

export const profile = {
  name: "Salman Faris",
  /** Wordmark suffix. Empty by decision: the name is not a registered trademark. */
  wordmarkMark: "" as "®" | "™" | "",
  title: "Video Editor & Motion Graphics Artist",
  location: { city: "Dubai", country: "UAE", timeZone: "Asia/Dubai", zoneLabel: "GST" },
  experienceYears: "5+",
  current: experience[0],
  education: [
    { qualification: "B.Com in Computer Applications", institution: "University of Calicut", period: "2021–2024" },
    { qualification: "Diploma in Video Editing & Digital Marketing", institution: null, period: null },
  ],
  software: [
    { name: "Adobe Premiere Pro", short: "Pr", use: "Editing" },
    { name: "Adobe After Effects", short: "Ae", use: "Motion & VFX" },
    { name: "Adobe Photoshop", short: "Ps", use: "Image & thumbnails" },
    { name: "Adobe Illustrator", short: "Ai", use: "Vector & assets" },
  ],
  skillGroups: [
    { label: "Editing & motion", items: ["Video editing", "Motion graphics", "Storytelling", "Transitions"] },
    {
      label: "Post-production",
      items: ["Color grading", "Visual effects (VFX)", "Sound sync", "Rendering optimization"],
    },
  ],
  languages: ["English", "Malayalam", "Tamil"],
  links: {
    email: "salmanpersonalac@gmail.com",
    linkedin: "https://www.linkedin.com/in/salman-faris-7bb45528b/",
    /** Digits only, international format. Null until approved for publication. */
    whatsapp: null as string | null,
    cv: "/cv/salman-faris-cv.pdf",
  },
  /** Only shown when explicitly confirmed by Salman. */
  availability: null as string | null,
};

export const hero = {
  eyebrow: "Video Editor · Motion Graphics Artist",
  headline: "Crafting motion that moves people.",
  intro: "Visual storytelling, cinematic editing and motion graphics crafted to make every frame count.",
  primaryCta: { label: "Explore my work", href: "#work" },
  secondaryCta: { label: "Hire me", href: "#contact" },
  tertiaryCta: { label: "Download CV", href: "/cv/salman-faris-cv.pdf" },
};

export const about = {
  statement: "Every frame, on purpose.",
  paragraphs: [
    "I’m a video editor and motion graphics artist with 5+ years of turning raw footage into clear, engaging stories, now based in Dubai with Akbar Travels.",
    "My work has spanned advertising, education, brand content and wedding films, from the first assembly cut to motion design, color grading, sound sync and final delivery.",
  ],
};

/**
 * Disciplines evidenced by the experience above. Until real project media
 * exists, the work gallery shows one clearly labelled placeholder slot per
 * discipline (never a fabricated project).
 */
export const disciplines: {
  name: string;
  where: string[];
  art: "bars" | "type" | "guides" | "letterbox" | "slate" | "wave";
}[] = [
  { name: "Commercial & promotional", where: ["Boby Chemmanur", "Shaah Advertising", "Code 7"], art: "bars" },
  { name: "Motion graphics", where: ["Code 7", "Shaah Advertising", "SATA Academy"], art: "type" },
  { name: "Educational content", where: ["SATA Academy"], art: "guides" },
  { name: "Wedding films", where: ["Jora Weddings"], art: "letterbox" },
];

/**
 * In-page anchors are absolute so they also work from case-study pages.
 * Only list sections that exist.
 */
export const navigation = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
] as const;

export const formatPeriod = (role: Pick<Role, "start" | "end">) =>
  role.end === null ? `${role.start}–Present` : role.start === role.end ? `${role.start}` : `${role.start}–${role.end}`;
