import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact/contact-section";
import { ExperienceSection } from "@/components/experience-section";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ServicesSection } from "@/components/services-section";
import { WorkSection } from "@/components/work/work-section";
import { profile } from "@/content/profile";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  worksFor: { "@type": "Organization", name: profile.current.organization },
  address: { "@type": "PostalAddress", addressLocality: profile.location.city, addressCountry: "AE" },
  email: `mailto:${profile.links.email}`,
  sameAs: [profile.links.linkedin, profile.links.instagram].filter(Boolean) as string[],
  knowsLanguage: profile.languages,
  ...(process.env.NEXT_PUBLIC_SITE_URL ? { url: process.env.NEXT_PUBLIC_SITE_URL } : {}),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <SiteHeader />
      <main id="main">
        <Hero />
        <WorkSection />
        <ServicesSection />
        <AboutSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
