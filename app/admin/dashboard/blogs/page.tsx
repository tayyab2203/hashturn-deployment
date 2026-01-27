"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { HiOutlineArrowLeft, HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineEye, HiOutlineCheck } from "react-icons/hi"
import { FaBlog } from "react-icons/fa"

interface Blog {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  status: "published" | "draft"
  views: number
  created_at: string
  updated_at: string
}

export default function BlogManagementPage() {
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all")

  // Fetch blogs from database
  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const url = filterStatus === "all" 
        ? "/api/blogs" 
        : `/api/blogs?status=${filterStatus}`
      
      const response = await fetch(url)
      const data = await response.json()
      
      if (data.success) {
        setBlogs(data.data)
      } else {
        alert("Failed to fetch blogs")
      }
    } catch (error) {
      console.error("Error fetching blogs:", error)
      alert("Error loading blogs")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [filterStatus])

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog?")) return

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE"
      })
      
      const data = await response.json()
      
      if (data.success) {
        alert("✅ Blog deleted successfully!")
        fetchBlogs() // Refresh list
      } else {
        alert("❌ " + (data.error || "Failed to delete blog"))
      }
    } catch (error) {
      console.error("Error deleting blog:", error)
      alert("❌ Error deleting blog")
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
                    <FaBlog className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h1 className="text-3xl font-bold text-primary">
                    Blog Management
                  </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-1 ml-14">
                  {loading ? "Loading..." : `${blogs.length} total blogs`}
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/admin/dashboard/blogs/create")}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-lg"
            >
              <HiOutlinePlus className="h-5 w-5" />
              Create New Blog
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
                placeholder="Search blogs..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              {(["all", "published", "draft"] as const).map((status) => (
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
            <p className="text-gray-500 dark:text-gray-400">Loading blogs from database...</p>
          </div>
        )}

        {/* Blog List */}
        {!loading && (
          <div className="grid gap-6">
            <AnimatePresence mode="popLayout">
              {filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start justify-between gap-6 flex-wrap">
                    {/* Content */}
                    <div className="flex-1 min-w-[300px]">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span className={`px-3 py-1 text-xs font-bold ${
                          blog.status === "published"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}>
                          {blog.status.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(blog.created_at).toLocaleDateString()}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <HiOutlineEye className="h-4 w-4" />
                          {blog.views} views
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                        {blog.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {blog.excerpt}
                      </p>

                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        By {blog.author}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => router.push(`/admin/dashboard/blogs/edit/${blog.id}`)}
                        className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                        title="Edit"
                      >
                        <HiOutlinePencil className="h-5 w-5" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => window.open(`/api/blogs/${blog.slug}`, '_blank')}
                        className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                        title="View"
                      >
                        <HiOutlineEye className="h-5 w-5" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(blog.id)}
                        className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                        title="Delete"
                      >
                        <HiOutlineTrash className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredBlogs.length === 0 && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <FaBlog className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {searchQuery ? "No blogs match your search" : "No blogs found in database. Sample data should be there!"}
                </p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
