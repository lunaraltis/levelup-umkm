import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import Testimonial from "@/components/Testimonial";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import TrustSection from "@/components/TrustSection";
import { getContent } from "@/lib/cms";
import { absoluteUrl, siteUrl } from "@/lib/site";
import type { ContentData } from "@/lib/content-types";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

function buildJsonLd(content: ContentData) {
  const contact = content.contact;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `${siteUrl}/#business`,
        name: "Level Up UMKM",
        url: siteUrl,
        image: absoluteUrl("/images/logo_revisi.png"),
        logo: absoluteUrl("/images/logo_revisi.png"),
        description:
          "Jasa digitalisasi UMKM untuk pembuatan website, toko online, branding, manajemen sosial media, dan optimasi bisnis digital.",
        telephone: contact.whatsappDisplay,
        email: contact.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: contact.location,
          addressCountry: "ID",
        },
        areaServed: {
          "@type": "Country",
          name: "Indonesia",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          telephone: contact.whatsappDisplay,
          email: contact.email,
          availableLanguage: ["id-ID"],
        },
        makesOffer: content.pricing.map((plan) => ({
          "@type": "Offer",
          name: plan.name,
          description: plan.description,
          priceCurrency: "IDR",
          price: plan.priceUpfront.replace(/\D/g, ""),
          url: absoluteUrl("/#pricing"),
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Level Up UMKM",
        inLanguage: "id-ID",
        publisher: {
          "@id": `${siteUrl}/#business`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: content.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <JsonLd data={buildJsonLd(content)} />
      <Navbar />
      <main>
        <Hero initialData={content.hero} />
        <About />
        <Features />
        <TrustSection initialData={content.trust} />
        <Portfolio initialData={content.portfolio} />
        <Pricing initialData={content.pricing} />
        <Testimonial initialData={content.testimonials} />
        <FAQ initialData={content.faqs} />
        <Contact initialData={content.contact} />
      </main>
      <Footer />
    </>
  );
}
