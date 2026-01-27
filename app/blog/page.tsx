"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/section-header"
import { BlogGrid } from "@/components/blog/blog-grid"
import { BlogSidebar } from "@/components/blog/blog-sidebar"

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <section className="container mx-auto px-4 lg:px-8">
        <SectionHeader
          title="Our Blog"
          subtitle="Stay updated with the latest insights, tips, and trends in automation, technology, and digital transformation."
          centered
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Posts */}
          <div className="lg:col-span-2">
            <BlogGrid />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 lg:px-8 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-brand-green/10 to-brand-blue/10 p-8 md:p-12 border border-border"
        >
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">How can we help you?</h3>
            <p className="text-muted-foreground mb-6">
              We are here to help you! Tell us how we can help and we'll get in touch within next 24hrs
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </motion.a>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue/20 rounded-full blur-3xl" />
        </motion.div>
      </section>
    </main>
  )
}
