"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { HiOutlineArrowLeft, HiOutlinePlus, HiOutlineStar } from "react-icons/hi"
import { MdRateReview } from "react-icons/md"

export default function CreateTestimonialPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    company: "",
    content: "",
    rating: 5,
    image: "",
    status: "pending" as "pending" | "approved"
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        alert("✅ Testimonial created successfully!")
        router.push("/admin/dashboard/testimonials")
      } else {
        alert("❌ " + (data.error || "Failed to create testimonial"))
      }
    } catch (error) {
      console.error("Error creating testimonial:", error)
      alert("❌ Error creating testimonial")
    } finally {
      setLoading(false)
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
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push("/admin/dashboard/testimonials")}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <HiOutlineArrowLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </motion.button>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary">
                <MdRateReview className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary">Add New Testimonial</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Add a client testimonial or review</p>
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
          className="max-w-3xl mx-auto bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-8 shadow-xl"
        >
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Client Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
                placeholder="John Smith"
              />
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Position *
              </label>
              <input
                type="text"
                required
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
                placeholder="CEO"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Company *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
                placeholder="TechCorp Inc."
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Testimonial Content *
              </label>
              <textarea
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
                placeholder="What did the client say about your work..."
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Rating *
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="focus:outline-none"
                  >
                    <HiOutlineStar
                      className={`h-8 w-8 transition-colors ${
                        star <= formData.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  </motion.button>
                ))}
                <span className="ml-4 text-gray-700 dark:text-gray-300 font-medium">
                  {formData.rating} {formData.rating === 1 ? "star" : "stars"}
                </span>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Client Photo URL
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-gray-900 dark:text-white"
                placeholder="/images/client-photo.jpg"
              />
              <p className="mt-1 text-sm text-gray-500">Optional - Leave empty for default avatar</p>
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
                    value="pending"
                    checked={formData.status === "pending"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "pending" })}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Pending Review</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="approved"
                    checked={formData.status === "approved"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "approved" })}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Approved</span>
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
                    <HiOutlinePlus className="h-5 w-5" />
                    Add Testimonial
                  </>
                )}
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/admin/dashboard/testimonials")}
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
