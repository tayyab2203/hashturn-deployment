import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ProjectCaseStudy } from "@/components/projects/project-case-study"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getProjectBySlug(slug: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/projects/${slug}`, {
      cache: 'no-store'
    })
    const data = await response.json()
    
    if (data.success) {
      return data.data
    }
    return null
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} - Case Study | HashTurn`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return <ProjectCaseStudy project={project} />
}
