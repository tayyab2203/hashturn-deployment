"use client"

import { motion } from "framer-motion"
import { Icon } from "@iconify/react"

const items = [
  {
    icon: "mdi:target",
    title: "Our Mission",
    description:
      "To empower businesses with cutting-edge digital solutions that automate workflows, reduce costs, and drive innovation, enabling our clients to focus on what matters most.",
    color: "bg-brand-red",
    gradient: "from-brand-red/20 via-brand-red/10 to-transparent",
  },
  {
    icon: "mdi:eye-outline",
    title: "Our Vision",
    description:
      "To be the leading automation and digital solutions partner for businesses worldwide, recognized for excellence, innovation, and transformative impact.",
    color: "bg-brand-green",
    gradient: "from-brand-green/20 via-brand-green/10 to-transparent",
  },
  {
    icon: "mdi:heart-outline",
    title: "Our Values",
    description:
      "Innovation, integrity, collaboration, and excellence guide everything we do. We believe in building lasting partnerships and delivering solutions that make a real difference.",
    color: "bg-brand-blue",
    gradient: "from-brand-blue/20 via-brand-blue/10 to-transparent",
  },
]

export function MissionVision() {
  return (
    <section className="py-16 lg:py-24 bg-muted/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/50 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

              {/* Card */}
              <div className="relative bg-card border-2 border-border group-hover:border-primary/50 p-8 lg:p-10 text-center transition-all duration-300 shadow-sm hover:shadow-xl">
                {/* Icon with animation */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`w-20 h-20 ${item.color} flex items-center justify-center text-white mx-auto mb-6 shadow-lg group-hover:shadow-2xl transition-shadow duration-300`}
                >
                  <Icon icon={item.icon} className="h-10 w-10" />
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                  {item.description}
                </p>

                {/* Decorative dot */}
                <div className="absolute top-8 right-8 w-2 h-2 bg-primary/20 group-hover:bg-primary group-hover:scale-150 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
