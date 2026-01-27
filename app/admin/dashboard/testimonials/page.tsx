"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { HiOutlineArrowLeft, HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineStar, HiOutlineCheck } from "react-icons/hi"
import { MdRateReview } from "react-icons/md"
import Image from "next/image"

interface Testimonial {
  id: number
  name: string
  position: string
  company: string
  content: string
  rating: number
  image: string
  status: "approved" | "pending"
  created_at: string
}

export default function TestimonialManagementPage() {
  const router = useRouter()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "approved" | "pending">("all")

  // Fetch testimonials from database
  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const url = filterStatus === "all" 
        ? "/api/testimonials" 
        : `/api/testimonials?status=${filterStatus}`
      
      const response = await fetch(url)
      const data = await response.json()
      
      if (data.success) {
        setTestimonials(data.data)
      } else {
        alert("Failed to fetch testimonials")
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error)
      alert("Error loading testimonials")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [filterStatus])

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         testimonial.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         testimonial.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return

    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE"
      })
      
      const data = await response.json()
      
      if (data.success) {
        alert("✅ Testimonial deleted successfully!")
        fetchTestimonials()
      } else {
        alert("❌ " + (data.error || "Failed to delete testimonial"))
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error)
      alert("❌ Error deleting testimonial")
    }
  }

  const handleApprove = async (id: number) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: "approved" })
      })
      
      const data = await response.json()
      
      if (data.success) {
        alert("✅ Testimonial approved!")
        fetchTestimonials()
      } else {
        alert("❌ " + (data.error || "Failed to approve testimonial"))
      }
    } catch (error) {
      console.error("Error approving testimonial:", error)
      alert("❌ Error approving testimonial")
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
                    <MdRateReview className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h1 className="text-3xl font-bold text-primary">
                    Testimonial Management
                  </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-1 ml-14">
                  {loading ? "Loading..." : `${testimonials.length} total testimonials`}
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/admin/dashboard/testimonials/create")}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-lg"
            >
              <HiOutlinePlus className="h-5 w-5" />
              Add Testimonial
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
                placeholder="Search testimonials..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              {(["all", "approved", "pending"] as const).map((status) => (
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
            <p className="text-gray-500 dark:text-gray-400">Loading testimonials from database...</p>
          </div>
        )}

        {/* Testimonial Grid */}
        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 shadow-lg hover:shadow-2xl transition-all group relative"
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 text-xs font-bold ${
                      testimonial.status === "approved"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}>
                      {testimonial.status.toUpperCase()}
                    </span>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 overflow-hidden bg-gray-200 dark:bg-gray-700">
                      {testimonial.image && (
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.position} at {testimonial.company}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <HiOutlineStar
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                    "{testimonial.content}"
                  </p>

                  {/* Date */}
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                    {new Date(testimonial.created_at).toLocaleDateString()}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {testimonial.status === "pending" && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleApprove(testimonial.id)}
                        className="flex-1 px-4 py-2 bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <HiOutlineCheck className="h-5 w-5" />
                        Approve
                      </motion.button>
                    )}
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push(`/admin/dashboard/testimonials/edit/${testimonial.id}`)}
                      className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      <HiOutlinePencil className="h-5 w-5" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(testimonial.id)}
                      className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                    >
                      <HiOutlineTrash className="h-5 w-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {filteredTestimonials.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <MdRateReview className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {searchQuery ? "No testimonials match your search" : "No testimonials found in database. Sample data should be there!"}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
