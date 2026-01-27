"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"

interface Blog {
  id: number
  title: string
  slug: string
  excerpt: string
  author: string
  image: string
  tags: string[]
  created_at: string
  views: number
}

export function BlogsPreviewSection() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs?status=published")
      const data = await response.json()
      
      if (data.success) {
        // Get only first 3 blogs for home page
        setBlogs(data.data.slice(0, 3))
      }
    } catch (error) {
      console.error("Error fetching blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  if (blogs.length === 0) {
    return null // Don't show section if no blogs
  }

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader
          badge="Latest Insights"
          title="From our blog"
          description="Stay updated with the latest trends, tips, and insights from our team."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card border overflow-hidden hover-lift"
            >
              <Link href={`/blog/${blog.slug}`}>
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
                  {blog.image && (
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  
                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium">
                        {blog.tags[0]}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Icon icon="mdi:calendar-outline" className="w-3 h-3" />
                      <span>{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Icon icon="mdi:account-outline" className="w-3 h-3" />
                      <span>{blog.author}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {blog.excerpt || blog.title}
                  </p>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <span>Read More</span>
                    <Icon icon="mdi:arrow-right" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button asChild size="lg" variant="outline" className="rounded-full px-8 group bg-transparent">
            <Link href="/blog">
              View All Articles
              <Icon icon="mdi:arrow-right" className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
