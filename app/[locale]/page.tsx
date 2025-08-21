import Hero from "@/components/Hero";
import ServicesPreview from "@/components/ServicesPreview";
import Industries from "@/components/Industries";
import ProcessSteps from "@/components/ProcessSteps";
import HSECompliance from "@/components/HSECompliance";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import FAQs from "@/components/FAQs";
import CTABanner from "@/components/CTABanner";
import dynamic from "next/dynamic";
import WhyUs from "@/components/WhyUs";
const HeroFX = dynamic(() => import("@/components/HeroFX"), { ssr: false });

export default function HomePage() {
  return (
    <>
      <HeroFX />
      <Hero />
      <WhyUs />

      <ServicesPreview />
      <Industries />
      <ProcessSteps />
      <HSECompliance />
      <Stats />
      <Testimonials />
      <FAQs />
      <CTABanner />
    </>
  );
}
