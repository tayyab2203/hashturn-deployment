import { HeroSection } from "@/components/home/hero-section"
import { ServicesSection } from "@/components/home/services-section"
import { WhyChooseUsSection } from "@/components/home/why-choose-us-section"
import { ProjectsPreviewSection } from "@/components/home/projects-preview-section"
import { BlogsPreviewSection } from "@/components/home/blogs-preview-section"
import { TestimonialsPreviewSection } from "@/components/home/testimonials-preview-section"
import { FAQSection } from "@/components/home/faq-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ProjectsPreviewSection />
      <BlogsPreviewSection />
      <TestimonialsPreviewSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
