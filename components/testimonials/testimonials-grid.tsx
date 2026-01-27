"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: string
  name: string
  position: string
  company: string
  content: string
  rating: number
  image_url: string
  status: "approved" | "pending"
  date: string
}

const colorMap = {
  blue: { border: "hover:border-brand-blue/50", glow: "hover:shadow-brand-blue/20", accent: "bg-brand-blue" },
  red: { border: "hover:border-brand-red/50", glow: "hover:shadow-brand-red/20", accent: "bg-brand-red" },
  green: { border: "hover:border-brand-green/50", glow: "hover:shadow-brand-green/20", accent: "bg-brand-green" },
  yellow: { border: "hover:border-brand-yellow/50", glow: "hover:shadow-brand-yellow/20", accent: "bg-brand-yellow" },
}

const colors = ["blue", "red", "green", "yellow"] as const

export function TestimonialsGrid() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/testimonials")
      const data = await response.json()

      if (data.success) {
        // Filter only approved testimonials for public page
        const approvedTestimonials = data.data.filter(
          (t: Testimonial) => t.status === "approved"
        )
        setTestimonials(approvedTestimonials)
      } else {
        setError(data.message || "Failed to fetch testimonials.")
      }
    } catch (err) {
      setError("An unexpected error occurred while fetching testimonials.")
      console.error("Error fetching testimonials:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading testimonials...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-16">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No testimonials available yet.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Masonry-like grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => {
            const colorKey = colors[index % colors.length]
            const colorStyles = colorMap[colorKey]
            const isHovered = hoveredIndex === index

            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "testimonial-card group bg-card border-2 border-border p-8 relative hover-lift transition-all duration-500",
                  colorStyles.border,
                  isHovered && `shadow-2xl ${colorStyles.glow}`,
                )}
              >
                {/* Animated quote icon */}
                <motion.div
                  animate={isHovered ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-6 right-6"
                >
                  <Icon
                    icon="mdi:format-quote-close"
                    className={cn(
                      "h-10 w-10 transition-colors duration-300",
                      isHovered ? "text-primary/30" : "text-primary/10",
                    )}
                  />
                </motion.div>

                {/* Star rating with animation */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 + index * 0.05 }}
                    >
                      <Icon icon="mdi:star" className="h-5 w-5 fill-brand-yellow text-brand-yellow" />
                    </motion.div>
                  ))}
                </div>

                {/* Content with gradient reveal */}
                <p className="text-foreground mb-8 leading-relaxed relative">
                  <span className="text-xl font-serif text-primary">"</span>
                  {testimonial.content}
                  <span className="text-xl font-serif text-primary">"</span>
                </p>

                {/* Author section with animation */}
                <div className="flex items-center gap-4 pt-6 border-t border-border">
                  <motion.div
                    animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    {testimonial.image_url ? (
                      <Image
                        src={testimonial.image_url}
                        alt={testimonial.name}
                        width={56}
                        height={56}
                        className="rounded-full border-2 border-background shadow-lg object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full border-2 border-background shadow-lg bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                    {/* Online indicator */}
                    <motion.span
                      animate={isHovered ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                      className={cn(
                        "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background",
                        colorStyles.accent,
                      )}
                    />
                  </motion.div>

                  <div className="flex-1">
                    <motion.h4 animate={isHovered ? { x: 5 } : { x: 0 }} className="font-bold text-foreground">
                      {testimonial.name}
                    </motion.h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.position}
                      {testimonial.company && `, ${testimonial.company}`}
                    </p>
                  </div>

                  {/* View on Fiverr Button */}
                  <motion.a
                    href="https://www.fiverr.com/zeeshaanbillal?source=gig_cards&referrer_gig_slug=use-power-automate-sharepoint-ms-forms-and-other-power-apps-to-automate&ref_ctx_id=731d780f8e814dac95718445bc60047c&imp_id=e12668fa-ef90-44a5-b5d1-e1ac3baf775"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "px-4 py-2 text-sm font-semibold text-white transition-all shadow-md hover:shadow-lg flex items-center gap-2",
                      colorStyles.accent
                    )}
                    aria-label="View on Fiverr"
                  >
                    <Icon icon="mdi:eye-outline" className="h-4 w-4" />
                    View
                  </motion.a>
                </div>

                {/* Decorative accent line */}
                <motion.div
                  className={cn("absolute bottom-0 left-0 h-1 rounded-b-3xl", colorStyles.accent)}
                  initial={{ width: 0 }}
                  animate={{ width: isHovered ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
