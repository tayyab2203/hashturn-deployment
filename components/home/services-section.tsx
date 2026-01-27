"use client"

import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import { SectionHeader } from "@/components/section-header"

const services = [
  {
    icon: "mdi:code-braces",
    title: "Web Development",
    description:
      "Modern and responsive websites and web applications built with the latest frameworks and best practices.",
    color: "bg-brand-blue",
  },
  {
    icon: "mdi:robot-outline",
    title: "RPA Solutions",
    description:
      "Automate repetitive tasks and business workflows with Robotic Process Automation, improving efficiency.",
    color: "bg-brand-red",
  },
  {
    icon: "mdi:connection",
    title: "API Development & Integration",
    description: "Design and integrate secure, reliable APIs to connect your systems and third-party apps seamlessly.",
    color: "bg-brand-green",
  },
  {
    icon: "mdi:cloud-outline",
    title: "SaaS Development",
    description: "Build scalable and secure SaaS applications that can be easily deployed and scaled for growth.",
    color: "bg-brand-yellow",
  },
  {
    icon: "mdi:cart-outline",
    title: "Ecommerce Solutions",
    description:
      "Build and manage your online store with a robust, scalable platform that integrates with your systems.",
    color: "bg-brand-blue",
  },
  {
    icon: "mdi:cog-outline",
    title: "Custom Automation Bots",
    description: "Build intelligent bots for data scraping, reporting, and system integrations to save time.",
    color: "bg-brand-red",
  },
]

export function ServicesSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader
          badge="Our Services"
          title="We build modern solutions tailored to your business needs"
          description="From web development to automation, we deliver end-to-end digital solutions that drive results."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card border  p-8 hover-lift cursor-pointer"
            >
              <div
                className={`w-14 h-14 ${service.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}
              >
                <Icon icon={service.icon} className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              {/* Hover gradient */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity ${service.color}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
