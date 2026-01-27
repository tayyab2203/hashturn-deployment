"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { HiOutlineArrowLeft, HiOutlineCheck } from "react-icons/hi"
import { FaProjectDiagram } from "react-icons/fa"

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [projectId, setProjectId] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [fetchingData, setFetchingData] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    client: "",
    image: "",
    tech: "",
    features: "",
    results: "",
    live_url: "",
    status: "active" as "active" | "archived",
    project_date: ""
  })

  useEffect(() => {
    const fetchProject = async () => {
      const resolvedParams = await params
      setProjectId(resolvedParams.id)
      
      try {
        const response = await fetch(`/api/projects/${resolvedParams.id}`)
        const data = await response.json()

        if (data.success) {
          const project = data.data
          setFormData({
            title: project.title || "",
            slug: project.slug || "",
            description: project.description || "",
            content: project.content || "",
            client: project.client || "",
            image: project.image || "",
            tech: Array.isArray(project.tech) ? project.tech.join(", ") : "",
            features: Array.isArray(project.features) ? project.features.join("\n") : "",
            results: Array.isArray(project.results) ? project.results.join("\n") : "",
            live_url: project.live_url || "",
            status: project.status || "active",
            project_date: project.project_date ? project.project_date.split('T')[0] : ""
          })
        } else {
          alert("❌ Failed to load project")
          router.push("/admin/dashboard/projects")
        }
      } catch (error) {
        console.error("Error fetching project:", error)
        alert("❌ Error loading project")
        router.push("/admin/dashboard/projects")
      } finally {
        setFetchingData(false)
      }
    }

    fetchProject()
  }, [params, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          tech: formData.tech ? formData.tech.split(",").map(t => t.trim()) : [],
          features: formData.features ? formData.features.split("\n").filter(f => f.trim()) : [],
          results: formData.results ? formData.results.split("\n").filter(r => r.trim()) : []
        })
      })

      const data = await response.json()

      if (data.success) {
        alert("✅ Project updated successfully!")
        router.push("/admin/dashboard/projects")
      } else {
        alert("❌ " + (data.error || "Failed to update project"))
      }
    } catch (error) {
      console.error("Error updating project:", error)
      alert("❌ Error updating project")
    } finally {
      setLoading(false)
    }
  }

  if (fetchingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading project data...</p>
        </div>
      </div>
    )
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
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push("/admin/dashboard/projects")}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <HiOutlineArrowLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </motion.button>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary">
                <FaProjectDiagram className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary">Edit Project</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Update project details</p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Form */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-8 shadow-xl"
        >
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
                placeholder="E-Commerce Platform"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
                placeholder="ecommerce-platform"
              />
            </div>

            {/* Client */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Client Name *
              </label>
              <input
                type="text"
                required
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
                placeholder="TechCorp Inc."
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Short Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
                placeholder="Brief project description..."
              />
            </div>

            {/* Content / Full Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Full Description (Case Study Content)
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={8}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
                placeholder="Detailed project description, challenges, solutions..."
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Image URL *
              </label>
              <input
                type="text"
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
                placeholder="/images/project.jpg"
              />
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Technologies Used *
              </label>
              <input
                type="text"
                required
                value={formData.tech}
                onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
                placeholder="Next.js, TypeScript, PostgreSQL (comma separated)"
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Key Features (one per line)
              </label>
              <textarea
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
                placeholder="User Authentication&#10;Payment Integration&#10;Admin Dashboard&#10;Real-time Notifications"
              />
            </div>

            {/* Results */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Project Results (one per line)
              </label>
              <textarea
                value={formData.results}
                onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
                placeholder="50% increase in efficiency&#10;Reduced costs by 30%&#10;Improved user satisfaction"
              />
            </div>

            {/* Live Project URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Live Project URL (Optional)
              </label>
              <input
                type="url"
                value={formData.live_url}
                onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
                placeholder="https://project-demo.com"
              />
              <p className="text-xs text-gray-500 mt-1">If project is live, provide the URL here</p>
            </div>

            {/* Project Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Project Date
              </label>
              <input
                type="date"
                value={formData.project_date}
                onChange={(e) => setFormData({ ...formData, project_date: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Status *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="active"
                    checked={formData.status === "active"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" })}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="archived"
                    checked={formData.status === "archived"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "archived" })}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Archived</span>
                </label>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-8 py-4 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <HiOutlineCheck className="h-5 w-5" />
                    Update Project
                  </>
                )}
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/admin/dashboard/projects")}
                className="px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                Cancel
              </motion.button>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  )
}
