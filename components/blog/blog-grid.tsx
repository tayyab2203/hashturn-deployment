"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Icon } from "@iconify/react"

interface Blog {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  status: string
  views: number
  image: string
  tags: string[]
  created_at: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function BlogGrid() {
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
        setBlogs(data.data)
      }
    } catch (error) {
      console.error("Error fetching blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading blogs...</p>
      </div>
    )
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-16 bg-card border border-border p-8">
        <p className="text-muted-foreground text-lg">No blogs published yet. Check back soon!</p>
      </div>
    )
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      {blogs.map((post) => (
        <motion.article
          key={post.id}
          variants={cardVariants}
          whileHover={{ y: -5 }}
          className="group relative bg-card overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
        >
          <Link href={`/blog/${post.slug}`} className="block">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-[200px] md:h-full min-h-[250px] overflow-hidden bg-gray-200 dark:bg-gray-700">
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="absolute top-4 left-4 flex flex-wrap gap-2"
                  >
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:calendar-outline" className="w-4 h-4" />
                    <span>{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <span>•</span>
                  <span>{post.views} views</span>
                </div>

                <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {post.excerpt || post.content.substring(0, 150) + '...'}
                </p>

                <p className="text-xs text-muted-foreground mb-4">By {post.author}</p>

                <div className="flex items-center gap-2 text-primary font-medium text-sm">
                  <span>Read More</span>
                  <Icon icon="mdi:arrow-right" className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </div>
          </Link>

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-brand-green/5" />
          </div>
        </motion.article>
      ))}
    </motion.div>
  )
}
