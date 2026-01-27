"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

const services = [
  {
    icon: "mdi:code-braces",
    title: "Web Development",
    description:
      "Modern and responsive websites and web applications built with the latest frameworks like React, Next.js, and Vue.",
    features: ["Custom Web Applications", "Progressive Web Apps", "Responsive Design", "Performance Optimization"],
    color: "blue",
    stats: { projects: "50+", satisfaction: "98%" },
  },
  {
    icon: "mdi:robot-outline",
    title: "RPA Solutions",
    description:
      "Automate repetitive tasks and business workflows with Robotic Process Automation. Reduce human error and save time.",
    features: ["Process Automation", "Data Entry Automation", "Report Generation", "Workflow Optimization"],
    color: "red",
    
  },
  {
    icon: "mdi:connection",
    title: "API Development",
    description: "Design and integrate secure, reliable APIs to connect your systems and third-party apps seamlessly.",
    features: ["RESTful APIs", "GraphQL APIs", "Third-party Integration", "API Documentation"],
    color: "green",
    stats: { projects: "40+", satisfaction: "97%" },
  },
  {
    icon: "mdi:cloud-outline",
    title: "SaaS Development",
    description:
      "Build scalable and secure SaaS applications that can be easily deployed and scaled for your business.",
    features: ["Multi-tenant Architecture", "Subscription Management", "Cloud Deployment", "Scalable Infrastructure"],
    color: "yellow",
    
  },
  {
    icon: "mdi:cart-outline",
    title: "Ecommerce Solutions",
    description:
      "Build and manage your online store with a robust, scalable platform that integrates with existing systems.",
    features: ["Custom Storefronts", "Payment Integration", "Inventory Management", "Analytics Dashboard"],
    color: "blue",
    
  },
  {
    icon: "mdi:cog-outline",
    title: "Custom Automation",
    description: "Build intelligent bots for data scraping, reporting, and system integrations to save time.",
    features: ["Web Scraping", "Data Extraction", "Automated Reporting", "System Integration"],
    color: "red",
    
  },
  {
    icon: "mdi:database-outline",
    title: "Database Design",
    description: "Design and implement efficient database solutions that scale with your business.",
    features: ["Schema Design", "Data Migration", "Query Optimization", "Backup Solutions"],
    color: "green",
    
  },
  {
    icon: "mdi:shield-check-outline",
    title: "Security Solutions",
    description: "Protect your digital assets with comprehensive security audits and implementations.",
    features: ["Security Audits", "Penetration Testing", "Compliance", "Data Protection"],
    color: "yellow",
    
  },
  {
    icon: "mdi:cellphone",
    title: "Mobile Development",
    description: "Create native and cross-platform mobile applications with exceptional UX.",
    features: ["iOS & Android", "React Native", "Cross-platform", "App Store Deployment"],
    color: "blue",
    
  },
]

const colorMap = {
  blue: {
    bg: "bg-brand-blue",
    glow: "card-glow-blue",
    light: "bg-brand-blue/10",
    border: "border-brand-blue/20",
    text: "text-brand-blue",
  },
  red: {
    bg: "bg-brand-red",
    glow: "card-glow-red",
    light: "bg-brand-red/10",
    border: "border-brand-red/20",
    text: "text-brand-red",
  },
  green: {
    bg: "bg-brand-green",
    glow: "card-glow-green",
    light: "bg-brand-green/10",
    border: "border-brand-green/20",
    text: "text-brand-green",
  },
  yellow: {
    bg: "bg-brand-yellow",
    glow: "card-glow-yellow",
    light: "bg-brand-yellow/10",
    border: "border-brand-yellow/20",
    text: "text-brand-yellow",
  },
}

export function ServicesGrid() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)

  return (
    <section className="py-16 lg:py-24 bg-muted/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-green/5  blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {services.map((service, index) => {
            const colors = colorMap[service.color as keyof typeof colorMap]
            const isHovered = hoveredIndex === index

            // Make first and last cards larger
            const isLarge = index === 0 || index === services.length - 1

            return (
              <Link href="/contact" key={service.title}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={cn(
                    "group relative bg-card border-2 border-border rounded-full p-8 hover-lift gradient-border cursor-pointer",
                    colors.glow,
                    isLarge && "md:col-span-2 lg:col-span-1",
                  )}
                >
                {/* Animated corner accent */}
                <div
                  className={cn(
                    "absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 transition-all duration-500 group-hover:opacity-20 group-hover:w-32 group-hover:h-32",
                    colors.bg,
                  )}
                />

                {/* Icon with animation */}
                <motion.div
                  className={cn(
                    "relative w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 icon-animate",
                    colors.bg,
                  )}
                  animate={isHovered ? { rotate: [0, -10, 10, 0], scale: [1, 1.1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <Icon icon={service.icon} className="h-8 w-8" />

                  {/* Sparkle effect on hover */}
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -top-2 -right-2"
                    >
                      <Icon icon="mdi:sparkles" className={cn("h-5 w-5", colors.text)} />
                    </motion.div>
                  )}
                </motion.div>

                {/* Title with underline animation */}
                <h3 className="text-xl font-bold text-foreground mb-3 relative inline-block">
                  {service.title}
                  <motion.span
                    className={cn("absolute bottom-0 left-0 h-0.5 rounded-full", colors.bg)}
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? "100%" : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed text-sm">{service.description}</p>

                {/* Features with staggered animation */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, fIndex) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
                      transition={{ delay: fIndex * 0.1 }}
                      className="flex items-center gap-3 text-sm text-muted-foreground"
                    >
                      <motion.div
                        className={cn("w-2 h-2 rounded-full", colors.bg)}
                        animate={isHovered ? { scale: [1, 1.5, 1] } : {}}
                        transition={{ delay: fIndex * 0.1, duration: 0.3 }}
                      />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                

                {/* Arrow indicator */}
                <motion.div
                  className={cn(
                    "absolute bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                    isHovered ? colors.bg : "bg-muted",
                  )}
                  animate={isHovered ? { x: [0, 5, 0] } : {}}
                  transition={{ repeat: isHovered ? Number.POSITIVE_INFINITY : 0, duration: 1 }}
                >
                  <Icon icon="mdi:arrow-right" className={cn("h-5 w-5", isHovered ? "text-white" : "text-muted-foreground")} />
                </motion.div>
              </motion.div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
