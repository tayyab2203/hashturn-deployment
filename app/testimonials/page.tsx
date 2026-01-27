import type { Metadata } from "next"
import { TestimonialsHero } from "@/components/testimonials/testimonials-hero"
import { TestimonialsGrid } from "@/components/testimonials/testimonials-grid"
import { TrustBadges } from "@/components/testimonials/trust-badges"

export const metadata: Metadata = {
  title: "Testimonials — HashTurn",
  description: "Read what our clients say about working with HashTurn. Real stories from teams we've partnered with.",
}

export default function TestimonialsPage() {
  return (
    <>
      <TestimonialsHero />
      <TrustBadges />
      <TestimonialsGrid />
    </>
  )
}
