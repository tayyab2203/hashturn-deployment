"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"

interface Project {
  id: number
  title: string
  slug: string
  description: string
  client: string
  image: string
  tech: string[]
  live_url?: string
}

const colors = ["bg-brand-blue", "bg-brand-red", "bg-brand-green", "bg-brand-yellow"]

export function ProjectsPreviewSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects?status=active")
      const data = await response.json()
      
      if (data.success) {
        // Get only first 4 projects for home page
        setProjects(data.data.slice(0, 4))
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  if (projects.length === 0) {
    return null // Don't show section if no projects
  }

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader
          badge="Our Portfolio"
          title="Showcasing impactful projects we've delivered"
          description="Real solutions for real businesses. See how we've helped our clients succeed."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card border overflow-hidden hover-lift"
            >
              {/* Image Section - Reduced height */}
              <div className="aspect-[16/9] relative overflow-hidden bg-gray-200 dark:bg-gray-700">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content Section - Reduced padding */}
              <div className="p-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colors[index % colors.length]} text-white mb-2`}>
                  {project.client}
                </span>
                <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">{project.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.description}</p>

                {/* Action Buttons - Always show both */}
                <div className="flex gap-2">
                  {/* Case Study Button - Always visible */}
                  <Link href={`/projects/${project.slug}`} className={project.live_url ? "flex-1" : "w-full"}>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group/btn hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                    >
                      <Icon icon="mdi:file-document-outline" className="h-4 w-4 mr-2" />
                      Case Study
                    </Button>
                  </Link>

                  {/* Live Link Button - Always visible, disabled if no URL */}
                  {project.live_url ? (
                    <a 
                      href={project.live_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button 
                        size="sm" 
                        className="w-full group/btn"
                      >
                        <Icon icon="mdi:open-in-new" className="h-4 w-4 mr-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        Live Demo
                      </Button>
                    </a>
                  ) : (
                    <Button 
                      size="sm" 
                      disabled
                      className="flex-1 cursor-not-allowed opacity-50"
                    >
                      <Icon icon="mdi:open-in-new" className="h-4 w-4 mr-2" />
                      No Demo
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button asChild size="lg" className="rounded-full px-8 group">
            <Link href="/projects">
              View All Projects
              <Icon icon="mdi:arrow-right" className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
