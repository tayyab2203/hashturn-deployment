"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [blogId, setBlogId] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [fetchingData, setFetchingData] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    image: "",
    category: "",
    tags: "",
    status: "draft" as "published" | "draft"
  })

  useEffect(() => {
    const fetchBlog = async () => {
      const resolvedParams = await params
      setBlogId(resolvedParams.id)
      
      try {
        const response = await fetch(`/api/blogs/${resolvedParams.id}`)
        const data = await response.json()

        if (data.success) {
          const blog = data.data
          setFormData({
            title: blog.title || "",
            slug: blog.slug || "",
            excerpt: blog.excerpt || "",
            content: blog.content || "",
            author: blog.author || "",
            image: blog.image || "",
            category: blog.category || "",
            tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
            status: blog.status || "draft"
          })
        } else {
          alert("❌ Failed to load blog")
          router.push("/admin/dashboard/blogs")
        }
      } catch (error) {
        console.error("Error fetching blog:", error)
        alert("❌ Error loading blog")
        router.push("/admin/dashboard/blogs")
      } finally {
        setFetchingData(false)
      }
    }

    fetchBlog()
  }, [params, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags ? formData.tags.split(",").map(t => t.trim()) : []
        })
      })

      const data = await response.json()

      if (data.success) {
        alert("✅ Blog updated successfully!")
        router.push("/admin/dashboard/blogs")
      } else {
        alert("❌ " + (data.error || "Failed to update blog"))
      }
    } catch (error) {
      console.error("Error updating blog:", error)
      alert("❌ Error updating blog")
    } finally {
      setLoading(false)
    }
  }

  if (fetchingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading blog data...</p>
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
              onClick={() => router.push("/admin/dashboard/blogs")}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Icon icon="mdi:arrow-left" className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </motion.button>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary">
                <Icon icon="mdi:post-outline" className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary">Edit Blog</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Update blog post details</p>
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
          className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 shadow-xl"
        >
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Blog Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                placeholder="Enter blog title"
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
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                placeholder="blog-slug"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Excerpt *
              </label>
              <textarea
                required
                rows={3}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                placeholder="Short description"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Content *
              </label>
              <textarea
                required
                rows={12}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all font-mono text-sm"
                placeholder="Blog content (Markdown supported)"
              />
            </div>

            {/* Author & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                  placeholder="Author name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                >
                  <option value="">Select category</option>
                  <option value="Technology">Technology</option>
                  <option value="Automation">Automation</option>
                  <option value="Development">Development</option>
                  <option value="AI">AI</option>
                  <option value="Tutorial">Tutorial</option>
                </select>
              </div>
            </div>

            {/* Image & Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                  placeholder="tag1, tag2, tag3"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Status *
              </label>
              <select
                required
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as "published" | "draft" })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/admin/dashboard/blogs")}
                className="flex-1 px-6 py-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                Cancel
              </motion.button>
              
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-4 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:check" className="h-5 w-5" />
                    Update Blog
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  )
}
