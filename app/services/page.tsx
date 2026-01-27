import type { Metadata } from "next"
import { ServicesHero } from "@/components/services/services-hero"
import { ServicesGrid } from "@/components/services/services-grid"
import { ProcessSection } from "@/components/services/process-section"
import { TechStackSection } from "@/components/services/tech-stack-section"

export const metadata: Metadata = {
  title: "Our Services — HashTurn",
  description:
    "Explore HashTurn's comprehensive range of digital solutions including Web Development, RPA, API Integration, and more.",
}

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <ProcessSection />
      <TechStackSection />
    </>
  )
}
