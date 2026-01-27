"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"

export default function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [testimonialId, setTestimonialId] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [fetchingData, setFetchingData] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    company: "",
    content: "",
    rating: 5,
    image: "",
    status: "pending" as "approved" | "pending"
  })

  useEffect(() => {
    const fetchTestimonial = async () => {
      const resolvedParams = await params
      setTestimonialId(resolvedParams.id)
      
      try {
        const response = await fetch(`/api/testimonials/${resolvedParams.id}`)
        const data = await response.json()

        if (data.success) {
          const testimonial = data.data
          setFormData({
            name: testimonial.name || "",
            position: testimonial.position || "",
            company: testimonial.company || "",
            content: testimonial.content || "",
            rating: testimonial.rating || 5,
            image: testimonial.image || "",
            status: testimonial.status || "pending"
          })
        } else {
          alert("❌ Failed to load testimonial")
          router.push("/admin/dashboard/testimonials")
        }
      } catch (error) {
        console.error("Error fetching testimonial:", error)
        alert("❌ Error loading testimonial")
        router.push("/admin/dashboard/testimonials")
      } finally {
        setFetchingData(false)
      }
    }

    fetchTestimonial()
  }, [params, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/testimonials/${testimonialId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        alert("✅ Testimonial updated successfully!")
        router.push("/admin/dashboard/testimonials")
      } else {
        alert("❌ " + (data.error || "Failed to update testimonial"))
      }
    } catch (error) {
      console.error("Error updating testimonial:", error)
      alert("❌ Error updating testimonial")
    } finally {
      setLoading(false)
    }
  }

  if (fetchingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading testimonial data...</p>
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
              onClick={() => router.push("/admin/dashboard/testimonials")}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Icon icon="mdi:arrow-left" className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </motion.button>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary">
                <Icon icon="mdi:message-text-outline" className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary">Edit Testimonial</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Update testimonial details</p>
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
            {/* Name & Position */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                  placeholder="Client name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Position *
                </label>
                <input
                  type="text"
                  required
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                  placeholder="CEO, Developer, etc."
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                placeholder="Company name"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Testimonial Content *
              </label>
              <textarea
                required
                rows={6}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                placeholder="What did the client say about your service?"
              />
            </div>

            {/* Rating & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Rating (1-5) *
                </label>
                <select
                  required
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 stars)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 stars)</option>
                  <option value={3}>⭐⭐⭐ (3 stars)</option>
                  <option value={2}>⭐⭐ (2 stars)</option>
                  <option value={1}>⭐ (1 star)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Status *
                </label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as "approved" | "pending" })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                </select>
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Client Image URL
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/admin/dashboard/testimonials")}
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
                    Update Testimonial
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
