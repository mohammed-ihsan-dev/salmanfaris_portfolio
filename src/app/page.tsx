import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact/contact-section";
import { ExperienceSection } from "@/components/experience-section";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ServicesSection } from "@/components/services-section";
import { WorkSection } from "@/components/work/work-section";
import { homeJsonLd, serializeJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(homeJsonLd()) }} />
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
