"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"

interface Testimonial {
  id: string
  name: string
  position: string
  company: string
  content: string
  rating: number
  image_url?: string
  status: "approved" | "pending"
}

export function TestimonialsPreviewSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/testimonials?status=approved")
      const data = await response.json()
      
      if (data.success) {
        // Only show approved testimonials from database
        setTestimonials(data.data)
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return null // Don't show section if no testimonials
  }

  // Split testimonials into two groups for different rows
  const midpoint = Math.ceil(testimonials.length / 2)
  const topRowTestimonials = testimonials.slice(0, midpoint)
  const bottomRowTestimonials = testimonials.slice(midpoint)

  return (
    <section className="py-24 lg:py-32 bg-muted/50 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader
          badge="Testimonials"
          title="Real stories from teams we partner with"
          description="Don't just take our word for it. Hear from the businesses we've helped transform."
        />

        {/* Carousel Wrapper */}
        <div className="mt-16 space-y-8">
          {/* Top Row (Right → Left) - First half of testimonials */}
          <div className="overflow-hidden relative">
            <motion.div
              className="flex gap-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            >
              {[...topRowTestimonials, ...topRowTestimonials].map((testimonial, index) => (
                <TestimonialCard key={"top-" + testimonial.id + "-" + index} testimonial={testimonial} />
              ))}
            </motion.div>
          </div>

          {/* Bottom Row (Left → Right) - Second half of testimonials */}
          {bottomRowTestimonials.length > 0 && (
            <div className="overflow-hidden relative">
              <motion.div
                className="flex gap-6"
                animate={{ x: ["-50%", "0%"] }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              >
                {[...bottomRowTestimonials, ...bottomRowTestimonials].map((testimonial, index) => (
                  <TestimonialCard key={"bottom-" + testimonial.id + "-" + index} testimonial={testimonial} />
                ))}
              </motion.div>
            </div>
          )}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 group bg-transparent">
            <a href="/testimonials">
              View All Testimonials
              <Icon icon="mdi:arrow-right" className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

// Single Testimonial Card Component
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-card border p-6 relative flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-72 xl:w-80">
      <Icon icon="mdi:format-quote-close" className="absolute top-4 right-4 h-6 w-6 text-primary/20" />
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating || 5)].map((_, i) => (
          <Icon key={i} icon="mdi:star" className="h-5 w-5 fill-brand-yellow text-brand-yellow" />
        ))}
      </div>
      <p className="text-foreground mb-4 leading-relaxed text-sm sm:text-base line-clamp-4">
        "{testimonial.content}"
      </p>
      <div className="flex items-center gap-3 mb-4">
        {testimonial.image_url ? (
          <Image
            src={testimonial.image_url}
            alt={testimonial.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
            {testimonial.name.charAt(0)}
          </div>
        )}
        <div className="flex-1">
          <h4 className="font-semibold text-foreground text-sm sm:text-base">{testimonial.name}</h4>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {testimonial.position}
            {testimonial.company && `, ${testimonial.company}`}
          </p>
        </div>
      </div>

      {/* View on Fiverr Button */}
      <a
        href="https://www.fiverr.com/zeeshaanbillal?source=gig_cards&referrer_gig_slug=use-power-automate-sharepoint-ms-forms-and-other-power-apps-to-automate&ref_ctx_id=731d780f8e814dac95718445bc60047c&imp_id=e12668fa-ef90-44a5-b5d1-e1ac3baf775"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full px-4 py-2 bg-[#12B76A] hover:bg-[#0FA958] text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
      >
        <Icon icon="mdi:eye-outline" className="h-4 w-4" />
        View on Fiverr
      </a>
    </div>
  )
}
