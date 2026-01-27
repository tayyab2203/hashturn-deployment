"use client"

import { motion } from "framer-motion"
import { Icon } from "@iconify/react"

export function AboutHero() {
  return (
    <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium mb-6">
              <Icon icon="mdi:sparkles" className="h-4 w-4" />
              About HashTurn
            </span>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground text-balance mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            We Save{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
              Human Hours
            </span>
          </motion.h1>

          <motion.p 
            className="mt-6 text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            HashTurn is a modern, production-ready digital solutions provider specializing in Web Development and RPA
            Solutions. We help businesses automate workflows, reduce costs, and embrace innovation through cutting-edge
            technology.
          </motion.p>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8"
          >
            {[
              { icon: "mdi:rocket-launch-outline", text: "Fast Delivery" },
              { icon: "mdi:chart-line", text: "Result Driven" },
              { icon: "mdi:sparkles", text: "Innovation First" },
            ].map((item, index) => (
              <motion.div
                key={item.text}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary">
                  <Icon icon={item.icon} className="h-5 w-5" />
                </div>
                <span className="font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
