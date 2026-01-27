"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const categories = ["All", "Web Development", "RPA Solution", "SaaS", "Mobile App", "Cloud"]

interface Project {
  id: number
  title: string
  slug: string
  description: string
  client: string
  image: string
  tech: string[]
  status: string
  created_at: string
  live_url?: string
}

const colorMap = {
  blue: { bg: "bg-brand-blue", text: "text-brand-blue", border: "border-brand-blue" },
  red: { bg: "bg-brand-red", text: "text-brand-red", border: "border-brand-red" },
  green: { bg: "bg-brand-green", text: "text-brand-green", border: "border-brand-green" },
  yellow: { bg: "bg-brand-yellow", text: "text-brand-yellow", border: "border-brand-yellow" },
}

const colors = ["blue", "red", "green", "yellow"] as const

export function ProjectsGrid() {
  const [selectedCategory, setSelectedCategory] = React.useState("All")
  const [projects, setProjects] = React.useState<Project[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects?status=active")
      const data = await response.json()
      
      if (data.success) {
        setProjects(data.data)
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = projects

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading projects...</p>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-16 bg-card border border-border p-8">
        <p className="text-muted-foreground text-lg">No projects available yet. Check back soon!</p>
      </div>
    )
  }

  return (
    <div>
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            const color = colors[index % colors.length]
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group relative bg-card overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
              >
                {/* Image - Reduced height */}
                <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Content - Reduced padding */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn("w-2 h-2 rounded-full", colorMap[color].bg)} />
                    <span className="text-xs font-medium text-muted-foreground">{project.client}</span>
                  </div>

                  <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{project.description}</p>

                  {/* Tech Stack - Reduced */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tech && project.tech.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 bg-muted text-muted-foreground text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons - Always show both */}
                  <div className="flex gap-2">
                    {/* Case Study Button - Always visible */}
                    <Link href={`/projects/${project.slug}`} className={project.live_url ? "flex-1" : "w-full"}>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full text-xs hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                      >
                        <Icon icon="mdi:file-document-outline" className="h-3.5 w-3.5 mr-1.5" />
                        Case Study
                      </Button>
                    </Link>

                    {/* Live Link Button - Always show, disabled if no URL */}
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
                          className="w-full text-xs group/btn"
                        >
                          <Icon icon="mdi:open-in-new" className="h-3.5 w-3.5 mr-1.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          Live Demo
                        </Button>
                      </a>
                    ) : (
                      <Button 
                        size="sm" 
                        disabled
                        className="flex-1 text-xs cursor-not-allowed opacity-50"
                      >
                        <Icon icon="mdi:open-in-new" className="h-3.5 w-3.5 mr-1.5" />
                        No Demo
                      </Button>
                    )}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-10", colorMap[color].bg)} />
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
