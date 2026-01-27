import type { Metadata } from "next"
import { AboutHero } from "@/components/about/about-hero"
import { MissionVision } from "@/components/about/mission-vision"
import { StatsSection } from "@/components/about/stats-section"
import { TeamSection } from "@/components/about/team-section"

export const metadata: Metadata = {
  title: "About Us — HashTurn",
  description:
    "Learn about HashTurn's mission to save human hours through innovative digital solutions and automation.",
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionVision />
      <StatsSection />
      <TeamSection />
    </>
  )
}
