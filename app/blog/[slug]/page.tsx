"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlogSidebar } from "@/components/blog/blog-sidebar"

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
  updated_at: string
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (slug) {
      fetchBlog()
    }
  }, [slug])

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${slug}`)
      const data = await response.json()
      
      if (data.success) {
        setBlog(data.data)
      } else {
        setNotFound(true)
      }
    } catch (error) {
      console.error("Error fetching blog:", error)
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading blog post...</p>
          </div>
        </div>
      </main>
    )
  }

  if (notFound || !blog) {
    return (
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-16 bg-card border border-border p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-24 pb-16">
      <article className="container mx-auto px-4 lg:px-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">{blog.title}</h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{blog.author}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{blog.views} views</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{Math.ceil(blog.content.length / 1000)} min read</span>
                </div>
              </div>
            </motion.div>

            {/* Featured Image */}
            {blog.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative w-full h-[400px] md:h-[500px] mb-8 overflow-hidden bg-gray-200 dark:bg-gray-700"
              >
                <Image src={blog.image} alt={blog.title} fill className="object-cover" priority />
              </motion.div>
            )}

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground"
            >
              {/* Render content as HTML or plain text */}
              <div className="whitespace-pre-wrap leading-relaxed text-muted-foreground">
                {blog.content}
              </div>
            </motion.div>

            {/* Share Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 pt-8 border-t border-border"
            >
              <p className="text-sm text-muted-foreground mb-4">Share this article:</p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${blog.title}&url=${window.location.href}`, '_blank')}
                >
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                >
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank')}
                >
                  LinkedIn
                </Button>
              </div>
            </motion.div>

            {/* Author Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 p-6 bg-muted border border-border"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">About the Author</h3>
              <p className="text-muted-foreground mb-4">
                <strong>{blog.author}</strong> is a member of the HashTurn team, dedicated to sharing insights about technology, automation, and digital transformation.
              </p>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="container mx-auto px-4 lg:px-8 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-brand-green/10 to-brand-blue/10 p-8 md:p-12 border border-border"
        >
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Want to Learn More?</h3>
            <p className="text-muted-foreground mb-6">
              Get in touch with us to discuss how we can help transform your business with automation and technology.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
