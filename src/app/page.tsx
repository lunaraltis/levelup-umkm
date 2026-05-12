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
import { getContent } from "@/lib/cms";

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Navbar />
      <main>
      <Hero />
      <About />
      <Features />
      <Portfolio />
      <Pricing initialData={content.pricing} />
      <Testimonial initialData={content.testimonials} />
      <FAQ initialData={content.faqs} />
      <Contact initialData={content.contact} />
    </main>
    <Footer />
    </>
  );
}
