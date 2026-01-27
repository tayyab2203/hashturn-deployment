"use client"

import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import { SectionHeader } from "@/components/section-header"

const steps = [
  {
    icon: "mdi:magnify",
    title: "Discovery",
    description: "We analyze your requirements, goals, and challenges to understand your needs.",
  },
  {
    icon: "mdi:lightbulb-outline",
    title: "Planning",
    description: "Create a detailed roadmap with timelines, milestones, and deliverables.",
  },
  {
    icon: "mdi:code-braces",
    title: "Development",
    description: "Build your solution using agile methodology with regular updates and feedback.",
  },
  {
    icon: "mdi:rocket-launch-outline",
    title: "Deployment",
    description: "Launch your solution with thorough testing and quality assurance.",
  },
  {
    icon: "mdi:headset",
    title: "Support",
    description: "Provide ongoing maintenance, updates, and support to ensure success.",
  },
]

export function ProcessSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader
          badge="Our Process"
          title="How We Work"
          description="A proven methodology that ensures successful project delivery every time."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative text-center"
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-border" />
              )}
              <div className="relative z-10 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                <Icon icon={step.icon} className="h-8 w-8" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
