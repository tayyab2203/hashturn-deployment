"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"

export default function CreateBlogPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "HashTurn Team",
    category: "",
    status: "draft" as "draft" | "published",
    image: "",
    tags: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
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
        alert("✅ Blog created successfully!")
        router.push("/admin/dashboard/blogs")
      } else {
        alert("❌ " + (data.error || "Failed to create blog"))
      }
    } catch (error) {
      console.error("Error creating blog:", error)
      alert("❌ Error creating blog")
    } finally {
      setLoading(false)
    }
  }

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData({
      ...formData,
      title,
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    })
  }

  // Handle image URL change with preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageUrl = e.target.value
    setFormData({ ...formData, image: imageUrl })
    setImagePreview(imageUrl)
  }

  // Insert image markdown into content
  const insertImageInContent = () => {
    const imageUrl = prompt("Enter image URL (from /public folder or external):")
    if (imageUrl) {
      const imageMarkdown = `\n\n![Image description](${imageUrl})\n\n`
      setFormData({ ...formData, content: formData.content + imageMarkdown })
    }
  }

  const categories = [
    "Technology",
    "Web Development",
    "RPA",
    "Automation",
    "SaaS",
    "Business",
    "API Integration",
    "Ecommerce",
    "AI & ML"
  ]

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
                <h1 className="text-3xl font-bold text-primary">Create New Blog</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Add a new blog post to your website</p>
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
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
                placeholder="Enter blog title..."
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
                placeholder="blog-url-slug"
              />
              <p className="mt-1 text-sm text-gray-500">URL-friendly version of title (auto-generated)</p>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
              >
                <option value="">Select a category...</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500">This will be used in blog sidebar categories</p>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Excerpt
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
                placeholder="Short description (optional)..."
              />
            </div>

            {/* Main Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Main Blog Image *
              </label>
              <input
                type="text"
                required
                value={formData.image}
                onChange={handleImageChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
                placeholder="/images/blog-image.jpg or https://example.com/image.jpg"
              />
              <p className="mt-1 text-sm text-gray-500">
                <Icon icon="mdi:information-outline" className="inline h-4 w-4 mr-1" />
                Upload image to <code className="bg-gray-200 dark:bg-gray-700 px-1">/public/images/</code> folder first, then use path like <code className="bg-gray-200 dark:bg-gray-700 px-1">/images/filename.jpg</code>
              </p>
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Preview:</p>
                  <div className="relative w-full h-48 border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={() => setImagePreview("")}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Content *
                </label>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={insertImageInContent}
                  className="text-xs px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center gap-1"
                >
                  <Icon icon="mdi:image-plus" className="h-4 w-4" />
                  Insert Image
                </motion.button>
              </div>
              <textarea
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={15}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white font-mono text-sm"
                placeholder="Write your blog content here...&#10;&#10;You can add images using markdown:&#10;![Image alt text](/images/your-image.jpg)"
              />
              <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  <Icon icon="mdi:lightbulb-outline" className="inline h-4 w-4 mr-1" />
                  <strong>To add images in content:</strong>
                </p>
                <ul className="text-xs text-blue-600 dark:text-blue-400 mt-1 space-y-1 ml-5">
                  <li>• Click "Insert Image" button above</li>
                  <li>• Or manually type: <code className="bg-blue-100 dark:bg-blue-900 px-1">![Description](/images/file.jpg)</code></li>
                  <li>• Upload images to <code className="bg-blue-100 dark:bg-blue-900 px-1">/public/images/</code> folder first</li>
                </ul>
              </div>
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Author *
              </label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Tags
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
                placeholder="nextjs, react, typescript (comma separated)"
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
                    value="draft"
                    checked={formData.status === "draft"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "draft" })}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Draft</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="published"
                    checked={formData.status === "published"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "published" })}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Published</span>
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
                    <Icon icon="mdi:plus" className="h-5 w-5" />
                    Create Blog
                  </>
                )}
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/admin/dashboard/blogs")}
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
