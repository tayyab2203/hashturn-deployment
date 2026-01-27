"use client"

import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"

export function TestimonialsHero() {
  const [happyClientsCount, setHappyClientsCount] = useState(0)

  useEffect(() => {
    const fetchClientsCount = async () => {
      try {
        const response = await fetch('/api/testimonials?status=approved')
        const data = await response.json()
        if (data.success) {
          setHappyClientsCount(data.data.length)
        }
      } catch (error) {
        console.error('Error fetching clients count:', error)
      }
    }

    fetchClientsCount()
  }, [])

  return (
    <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Testimonials
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
            What Our Clients Say
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Don't just take our word for it. Hear from the businesses we've helped transform through automation and
            digital solutions.
          </p>
          
          {/* Stats Row */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            {/* Rating */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} icon="mdi:star" className="h-6 w-6 text-brand-yellow" />
                ))}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-lg font-bold text-foreground">4.9/5</span>
                <span className="text-xs text-muted-foreground">Average rating</span>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-12 bg-border" />

            {/* Happy Clients Count */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-brand-green flex items-center justify-center">
                <Icon icon="mdi:account-group-outline" className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col items-start">
                <motion.span 
                  key={happyClientsCount}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg font-bold text-foreground"
                >
                  {happyClientsCount}+
                </motion.span>
                <span className="text-xs text-muted-foreground">Happy Clients</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
