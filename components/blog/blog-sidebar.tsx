"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"

interface Blog {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  image: string
  category: string
  published_date: string
  status: string
  created_at: string
}

interface CategoryCount {
  name: string
  count: number
}

export function BlogSidebar() {
  const [categories, setCategories] = useState<CategoryCount[]>([])
  const [recentPosts, setRecentPosts] = useState<Blog[]>([])

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        // Fetch all published blogs
        const response = await fetch('/api/blogs?status=published')
        const data = await response.json()
        
        if (data.success && data.data) {
          const blogs = data.data as Blog[]
          
          // Calculate category counts
          const categoryMap: { [key: string]: number } = {}
          blogs.forEach((blog) => {
            const cat = blog.category || 'Uncategorized'
            categoryMap[cat] = (categoryMap[cat] || 0) + 1
          })
          
          const categoryList = Object.entries(categoryMap).map(([name, count]) => ({
            name,
            count,
          }))
          
          setCategories(categoryList)
          
          // Get 3 most recent posts (sorted by published_date or created_at)
          const sortedBlogs = [...blogs].sort((a, b) => {
            const dateA = new Date(a.published_date || a.created_at).getTime()
            const dateB = new Date(b.published_date || b.created_at).getTime()
            return dateB - dateA
          })
          
          setRecentPosts(sortedBlogs.slice(0, 3))
        }
      } catch (error) {
        console.error('Error fetching sidebar data:', error)
      }
    }

    fetchSidebarData()
  }, [])

  return (
    <div className="space-y-8 lg:sticky lg:top-24">
      {/* Categories */}
      {categories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border p-6"
        >
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full" />
            Categories
          </h3>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <motion.li
                key={category.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Link
                  href={`/blog?category=${encodeURIComponent(category.name.toLowerCase())}`}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted transition-colors group"
                >
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {category.name}
                  </span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {category.count}
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border p-6"
        >
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-brand-green rounded-full" />
            Recent Posts
          </h3>
          <ul className="space-y-4">
            {recentPosts.map((post, index) => (
              <motion.li
                key={post.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="flex gap-3 group">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Icon icon="mdi:calendar-outline" className="w-3 h-3" />
                      <span>
                        {new Date(post.published_date || post.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Newsletter */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-primary/10 via-brand-green/10 to-brand-blue/10 border border-border p-6"
      >
        <h3 className="text-lg font-bold text-foreground mb-2">Subscribe to Newsletter</h3>
        <p className="text-sm text-muted-foreground mb-4">Get the latest insights delivered to your inbox.</p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            Subscribe
            <Icon icon="mdi:chevron-right" className="w-4 h-4" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
