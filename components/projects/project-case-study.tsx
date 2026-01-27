"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { 
  IoArrowBack, 
  IoCalendarOutline, 
  IoBriefcaseOutline,
  IoGlobeOutline,
  IoCheckmarkCircle
} from "react-icons/io5"
import { HiOutlineExternalLink } from "react-icons/hi"

interface Project {
  id: number
  title: string
  slug: string
  description: string
  content?: string
  client: string
  image: string
  tech: string[]
  features?: string[]
  results?: string[]
  live_url?: string
  status: string
  project_date?: string
  created_at: string
}

interface ProjectCaseStudyProps {
  project: Project
}

const colors = ["bg-brand-blue", "bg-brand-red", "bg-brand-green", "bg-brand-yellow"]
const colorClasses = [
  { bg: "bg-brand-blue", text: "text-brand-blue", border: "border-brand-blue" },
  { bg: "bg-brand-red", text: "text-brand-red", border: "border-brand-red" },
  { bg: "bg-brand-green", text: "text-brand-green", border: "border-brand-green" },
  { bg: "bg-brand-yellow", text: "text-brand-yellow", border: "border-brand-yellow" },
]

export function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  const colorClass = colorClasses[project.id % colorClasses.length]
  
  // Parse content into sections if it exists
  const contentSections = project.content ? project.content.split('\n\n') : []

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background pointer-events-none" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Back Button */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <IoArrowBack className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Projects</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className={`inline-block px-4 py-1.5 ${colorClass.bg} text-white text-sm font-semibold mb-4`}>
                {project.client}
              </span>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                {project.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {project.description}
              </p>

              {/* Project Meta */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <IoBriefcaseOutline className={`h-5 w-5 ${colorClass.text}`} />
                  <div>
                    <div className="text-sm text-muted-foreground">Client</div>
                    <div className="font-semibold">{project.client}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <IoCalendarOutline className={`h-5 w-5 ${colorClass.text}`} />
                  <div>
                    <div className="text-sm text-muted-foreground">Date</div>
                    <div className="font-semibold">
                      {project.project_date 
                        ? new Date(project.project_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                        : new Date(project.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              {project.tech && project.tech.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`px-4 py-2 border-2 ${colorClass.border} ${colorClass.text} bg-transparent text-sm font-medium`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3 ${colorClass.bg} text-white font-semibold hover:opacity-90 transition-opacity`}
                >
                  <IoGlobeOutline className="h-5 w-5" />
                  Visit Live Project
                  <HiOutlineExternalLink className="h-4 w-4" />
                </a>
              )}
            </motion.div>

            {/* Right: Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative aspect-[4/3] overflow-hidden border-2 border-border"
            >
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Study Content */}
      {project.content && (
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
              <div 
                className="text-muted-foreground leading-relaxed whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: project.content.replace(/##/g, '<h2 class="text-3xl font-bold text-foreground mt-12 mb-6">').replace(/\n\n/g, '</h2><p class="mb-6">') + '</p>' }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {project.features && project.features.length > 0 && (
        <section className="py-16 lg:py-24 bg-muted/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border-2 border-border p-6 hover:border-primary/50 transition-colors flex items-start gap-4"
                  >
                    <IoCheckmarkCircle className={`h-6 w-6 ${colorClass.text} flex-shrink-0 mt-1`} />
                    <p className="text-foreground">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      {project.results && project.results.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">Results & Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-card border-2 ${colorClass.border} p-6 text-center hover:shadow-lg transition-shadow`}
                  >
                    <IoCheckmarkCircle className={`h-12 w-12 ${colorClass.text} mx-auto mb-4`} />
                    <div className="font-semibold text-foreground">{result}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how we can help transform your business with innovative solutions.
            </p>
            <Link
              href="/contact"
              className={`inline-flex items-center justify-center px-8 py-4 text-lg font-semibold ${colorClass.bg} text-white hover:opacity-90 transition-opacity`}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
