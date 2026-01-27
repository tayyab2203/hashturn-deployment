"use client"

import { motion } from "framer-motion"

interface SectionHeaderProps {
  badge?: string
  title: string
  description?: string
  className?: string
  align?: "left" | "center"
}

export function SectionHeader({ badge, title, description, className = "", align = "center" }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      {badge && (
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">{title}</h2>
      {description && <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">{description}</p>}
    </motion.div>
  )
}
