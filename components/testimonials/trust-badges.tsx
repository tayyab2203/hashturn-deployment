"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function TrustBadges() {
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

  const stats = [
    { value: "98%", label: "Client Satisfaction" },
    { value: happyClientsCount > 0 ? `${happyClientsCount}+` : "0", label: "Happy Clients" },
    { value: "70%", label: "Avg. Cost Reduction" },
    { value: "24/7", label: "Support Available" },
  ]

  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div 
                key={stat.value}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-3xl md:text-4xl font-bold text-primary mb-1"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
