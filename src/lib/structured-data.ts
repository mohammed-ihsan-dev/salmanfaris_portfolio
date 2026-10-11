import { experience, profile } from "@/content/profile";
import { absoluteUrl, siteDescription, siteName, siteUrl } from "./site";

const personId = absoluteUrl("/#person");

/**
 * schema.org graph for the homepage, from verified profile data only:
 * no ratings, reviews or awards. CreativeWork/VideoObject entries should be
 * added only once real published media exists.
 */
export function homeJsonLd() {
  const languages = profile.languages;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        url: siteUrl,
        image: absoluteUrl("/opengraph-image"),
        jobTitle: profile.title,
        description: siteDescription,
        worksFor: { "@type": "Organization", name: profile.current.organization },
        workLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: profile.location.city, addressCountry: "AE" } },
        alumniOf: profile.education
          .filter((e) => e.institution)
          .map((e) => ({ "@type": "CollegeOrUniversity", name: e.institution })),
        knowsAbout: [...profile.skillGroups.flatMap((g) => g.items), ...profile.software.map((s) => s.name)],
        knowsLanguage: languages,
        hasOccupation: { "@type": "Occupation", name: profile.title, occupationLocation: { "@type": "City", name: profile.location.city } },
        email: `mailto:${profile.links.email}`,
        sameAs: [profile.links.linkedin, profile.links.instagram].filter(Boolean),
        // Earlier employers (verified, from the CV) as past affiliations.
        affiliation: experience.slice(1).map((r) => ({ "@type": "Organization", name: r.organization })),
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": absoluteUrl("/#profilepage"),
        url: siteUrl,
        name: `${siteName} | ${profile.title}`,
        isPartOf: { "@id": absoluteUrl("/#website") },
        mainEntity: { "@id": personId },
        inLanguage: "en",
      },
    ],
  };
}

/** Serialize for a <script type="application/ld+json">: escapes `<` so content can't close the tag. */
export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
