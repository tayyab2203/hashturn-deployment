"use client"

import { motion } from "framer-motion"

export function ServicesHero() {
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
            Our Services
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
            Comprehensive Digital Solutions
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            From web development to automation, we offer end-to-end services designed to transform your business and
            drive growth.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
