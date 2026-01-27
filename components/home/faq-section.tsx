"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const faqs = [
  {
    q: "How long does deployment take?",
    a: "We launch standard web apps in 2-4 weeks. Simple workflows launch in as little as 1 week. Enterprise systems with multiple integrations typically require 6-10 weeks to ensure proper testing and scalability."
  },
  {
    q: "What happens after launch?",
    a: "We provide continued support, monitoring, and optimization. As your business evolves, we expand automation across new departments and workflows. You'll receive regular reports on system performance and recommendations for improvements."
  },
  {
    q: "Is my data secure?",
    a: "Security is built into every system we architect. We follow enterprise-grade compliance standards, encrypt data both in transit and at rest, and regularly update protocols to align with best practices. Your data integrity is our top priority."
  },
  {
    q: "Do we need technical staff?",
    a: "Not necessarily. We design systems to run smoothly without deep technical knowledge. However, having at least one technical staff member can be beneficial for advanced configurations and future scalability."
  },
  {
    q: "Do you work with legacy systems?",
    a: "Absolutely. We specialize in integrating modern solutions with legacy infrastructure. We approach bridges gaps without requiring complete system overhauls, ensuring smooth transitions while preserving your existing investments."
  },
  {
    q: "What if automation breaks something?",
    a: "We build safeguards and testing protocols into every deployment. Workflows include error handling and rollback mechanisms that prevent data loss and ensure business continuity throughout without disruption or additional overhead."
  },
  {
    q: "Can you handle our scale?",
    a: "HashTurn systems work just as well for hyper-growth startups. Whether you process hundreds or millions of transactions daily, we design infrastructure to scale effortlessly with your business requirements and growth trajectory."
  },
  {
    q: "How much does this cost?",
    a: "Pricing varies considerably depending on integrations, and scope. We provide transparent estimates upfront, along with projected ROI. Most clients see efficiency gains that far exceed our fees through time savings and reduced manual errors."
  },
  {
    q: "Can you integrate with our CRM?",
    a: "Yes. We work with Salesforce, HubSpot, Pipedrive, and custom systems. Our integrations create seamless workflows between all your tools, and automated processes that synchronize data in real time across platforms."
  },
  {
    q: "What about AI and machine learning?",
    a: "We build AI agents for content generation, data classification, and decision-support. Our intelligent agents can automate complex workflows, improve over time, automating tasks that previously required human judgment and expertise."
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export function FAQSection() {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Questions
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Common concerns answered. Direct responses on automation, security, and implementation.
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto"
        >
          {faqs.map((item, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <details className="group border bg-card/50 backdrop-blur-sm px-6 py-5 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <summary className="cursor-pointer list-none select-none text-base lg:text-lg font-semibold">
                  <div className="flex items-center justify-between gap-4">
                    <span>{item.q}</span>
                    <span className="text-2xl transition-transform duration-300 group-open:rotate-45">+</span>
                  </div>
                </summary>
                <div className="mt-4 text-muted-foreground leading-relaxed">
                  {item.a}
                </div>
              </details>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-20"
        >
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Ready to move forward?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your specific challenges and opportunities.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
          >
            Contact
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
