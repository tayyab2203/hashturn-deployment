"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { HiOutlineArrowLeft, HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineEye, HiOutlineExternalLink, HiOutlineCheck } from "react-icons/hi"
import { FaProjectDiagram } from "react-icons/fa"
import Image from "next/image"

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
  status: "active" | "archived"
  project_date?: string
  created_at: string
}

export default function ProjectManagementPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "archived">("all")

  // Fetch projects from database
  const fetchProjects = async () => {
    try {
      setLoading(true)
      const url = filterStatus === "all" 
        ? "/api/projects" 
        : `/api/projects?status=${filterStatus}`
      
      const response = await fetch(url)
      const data = await response.json()
      
      if (data.success) {
        setProjects(data.data)
      } else {
        alert("Failed to fetch projects")
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
      alert("Error loading projects")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [filterStatus])

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE"
      })
      
      const data = await response.json()
      
      if (data.success) {
        alert("✅ Project deleted successfully!")
        fetchProjects() // Refresh list
      } else {
        alert("❌ " + (data.error || "Failed to delete project"))
      }
    } catch (error) {
      console.error("Error deleting project:", error)
      alert("❌ Error deleting project")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => router.push("/admin/dashboard")}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <HiOutlineArrowLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              </motion.button>
              
              <div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary">
                    <FaProjectDiagram className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h1 className="text-3xl font-bold text-primary">
                    Project Management
                  </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-1 ml-14">
                  {loading ? "Loading..." : `${projects.length} total projects`}
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/admin/dashboard/projects/create")}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-lg"
            >
              <HiOutlinePlus className="h-5 w-5" />
              Add New Project
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 mb-8 shadow-lg"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              {(["all", "active", "archived"] as const).map((status) => (
                <motion.button
                  key={status}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilterStatus(status)}
                  className={`px-6 py-3 font-semibold transition-all ${
                    filterStatus === status
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">Loading projects from database...</p>
          </div>
        )}

        {/* Project Grid */}
        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
                    {project.image && (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 text-xs font-bold ${
                        project.status === "active"
                          ? "bg-green-500 text-white"
                          : "bg-gray-500 text-white"
                      }`}>
                        {project.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => router.push(`/admin/dashboard/projects/edit/${project.id}`)}
                        className="p-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                        title="Edit"
                      >
                        <HiOutlinePencil className="h-4 w-4" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => window.open(`/projects/${project.slug}`, '_blank')}
                        className="p-2 bg-green-500 text-white hover:bg-green-600 transition-colors"
                        title="View Case Study"
                      >
                        <HiOutlineEye className="h-4 w-4" />
                      </motion.button>

                      {project.live_url && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => window.open(project.live_url, '_blank')}
                          className="p-2 bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                          title="Open Live Link"
                        >
                          <HiOutlineExternalLink className="h-4 w-4" />
                        </motion.button>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(project.id)}
                        className="p-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
                        title="Delete"
                      >
                        <HiOutlineTrash className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      Client: <span className="font-semibold text-gray-700 dark:text-gray-300">{project.client}</span>
                    </p>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Live URL if exists */}
                    {project.live_url && (
                      <div className="mb-3">
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-500 hover:text-blue-700 underline flex items-center gap-1"
                        >
                          🌐 Live Demo
                        </a>
                      </div>
                    )}

                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {project.project_date ? new Date(project.project_date).toLocaleDateString() : new Date(project.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {filteredProjects.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <FaProjectDiagram className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {searchQuery ? "No projects match your search" : "No projects found in database. Sample data should be there!"}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
