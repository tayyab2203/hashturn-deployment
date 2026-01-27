"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/section-header"

const technologies = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Automation" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "AWS", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "Selenium", category: "RPA" },
  { name: "Puppeteer", category: "RPA" },
  { name: "TailwindCSS", category: "Styling" },
]

export function TechStackSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader
          badge="Tech Stack"
          title="Technologies We Use"
          description="We leverage modern, battle-tested technologies to build robust solutions."
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="px-6 py-3 bg-card border border-border rounded-full text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors cursor-default"
            >
              {tech.name}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
