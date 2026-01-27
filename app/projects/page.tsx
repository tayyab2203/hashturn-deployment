import type { Metadata } from "next"
import { ProjectsHero } from "@/components/projects/projects-hero"
import { ProjectsGrid } from "@/components/projects/projects-grid"

export const metadata: Metadata = {
  title: "Our Projects — HashTurn",
  description:
    "Explore HashTurn's portfolio of successful projects including web apps, RPA solutions, and custom automation.",
}

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHero />
      <ProjectsGrid />
    </>
  )
}
