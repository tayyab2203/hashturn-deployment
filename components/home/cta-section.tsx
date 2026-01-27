"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-foreground text-background p-12 lg:p-20"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-brand-green/30 to-brand-blue/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-brand-yellow/30 to-brand-red/30 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
              Ready to Transform Your Business?
            </h2>
            <p className="mt-6 text-lg text-background/80 text-pretty">
              Let's discuss how HashTurn can help you automate workflows, build scalable applications, and drive
              innovation in your organization.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground group"
              >
                <Link href="/contact">
                  Contact Us
                  <Icon icon="mdi:arrow-right" className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 border-background/30 text-background hover:bg-background/10 hover:text-background bg-transparent"
              >
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
