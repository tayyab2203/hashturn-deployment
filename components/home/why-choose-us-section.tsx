"use client"

import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import { SectionHeader } from "@/components/section-header"

const reasons = [
  {
    icon: "mdi:account-group-outline",
    title: "Expert Team",
    description: "Experienced engineers and designers who deliver with precision and care.",
  },
  {
    icon: "mdi:trophy-outline",
    title: "Proven Track Record",
    description: "Successful launches across industries with measurable business outcomes.",
  },
  {
    icon: "mdi:trending-up",
    title: "Scalable Solutions",
    description: "Systems designed for growth, performance, and long-term maintainability.",
  },
  {
    icon: "mdi:flash-outline",
    title: "Automation-First Approach",
    description: "We automate workflows to reduce manual effort and eliminate errors.",
  },
  {
    icon: "mdi:message-text-outline",
    title: "Transparent Communication",
    description: "Clear updates, fast feedback loops, and true partnership throughout.",
  },
  {
    icon: "mdi:face-agent",
    title: "Continuous Support",
    description: "Reliable post-launch support and iterative improvements when you need them.",
  },
]

export function WhyChooseUsSection() {
  return (
    <section className="py-24 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader
          badge="Why Choose Us"
          title="At Hashturn, we combine technical expertise with innovation"
          description="We deliver reliable, scalable, and cost-effective digital solutions that transform your business."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 flex items-center justify-center text-primary">
                <Icon icon={reason.icon} className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{reason.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
