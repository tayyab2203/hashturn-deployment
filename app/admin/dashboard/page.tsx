"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import { isAuthenticated, clearAuthSession, getAuthSession, getUser } from "@/lib/auth"

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [userName, setUserName] = useState("")
  const [stats, setStats] = useState({
    blogs: { total: 0, published: 0, drafts: 0 },
    projects: { total: 0, active: 0, archived: 0 },
    testimonials: { total: 0, approved: 0, pending: 0 }
  })

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push("/")
      return
    }

    // Get user info
    const email = getAuthSession()
    if (email) {
      const user = getUser(email)
      setUserName(user?.name || "Admin")
    }
    
    // Fetch stats from database
    fetchStats()
    
    setIsLoading(false)
  }, [router])

  const fetchStats = async () => {
    try {
      // Fetch all blogs
      const blogsRes = await fetch("/api/blogs")
      const blogsData = await blogsRes.json()
      
      // Fetch all projects
      const projectsRes = await fetch("/api/projects")
      const projectsData = await projectsRes.json()
      
      // Fetch all testimonials
      const testimonialsRes = await fetch("/api/testimonials")
      const testimonialsData = await testimonialsRes.json()
      
      if (blogsData.success && projectsData.success && testimonialsData.success) {
        const blogs = blogsData.data
        const projects = projectsData.data
        const testimonials = testimonialsData.data
        
        setStats({
          blogs: {
            total: blogs.length,
            published: blogs.filter((b: any) => b.status === "published").length,
            drafts: blogs.filter((b: any) => b.status === "draft").length
          },
          projects: {
            total: projects.length,
            active: projects.filter((p: any) => p.status === "active").length,
            archived: projects.filter((p: any) => p.status === "archived").length
          },
          testimonials: {
            total: testimonials.length,
            approved: testimonials.filter((t: any) => t.status === "approved").length,
            pending: testimonials.filter((t: any) => t.status === "pending").length
          }
        })
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const handleLogout = () => {
    clearAuthSession()
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full"
        />
      </div>
    )
  }

  const managementCards = [
    {
      title: "Blog Management",
      description: "Create, edit, and manage blog posts",
      icon: "mdi:post-outline",
      color: "from-primary to-primary/80",
      href: "/admin/dashboard/blogs",
      stats: stats.blogs
    },
    {
      title: "Project Management",
      description: "Manage portfolio projects and case studies",
      icon: "mdi:folder-outline",
      color: "from-primary to-primary/80",
      href: "/admin/dashboard/projects",
      stats: stats.projects
    },
    {
      title: "Testimonial Management",
      description: "Manage client testimonials and reviews",
      icon: "mdi:message-text-outline",
      color: "from-primary to-primary/80",
      href: "/admin/dashboard/testimonials",
      stats: stats.testimonials
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              >
                Admin Dashboard
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 dark:text-gray-400 mt-1"
              >
                Welcome back, <span className="font-semibold text-gray-900 dark:text-white">{userName}</span>! 👋
              </motion.p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-destructive text-destructive-foreground font-semibold hover:bg-destructive/90 transition-all shadow-lg"
            >
              <Icon icon="mdi:logout" className="h-5 w-5" />
              Logout
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-gradient-to-br from-primary to-primary/80 p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Total Blogs</p>
                <p className="text-4xl font-bold mt-2">{stats.blogs.total}</p>
                <p className="text-sm text-white/60 mt-1">{stats.blogs.published} published · {stats.blogs.drafts} drafts</p>
              </div>
              <Icon icon="mdi:file-document-outline" className="h-16 w-16 opacity-30" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-primary/80 p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Total Projects</p>
                <p className="text-4xl font-bold mt-2">{stats.projects.total}</p>
                <p className="text-sm text-white/60 mt-1">{stats.projects.active} active · {stats.projects.archived} archived</p>
              </div>
              <Icon icon="mdi:folder-open-outline" className="h-16 w-16 opacity-30" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-primary/80 p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Total Testimonials</p>
                <p className="text-4xl font-bold mt-2">{stats.testimonials.total}</p>
                <p className="text-sm text-white/60 mt-1">{stats.testimonials.approved} approved · {stats.testimonials.pending} pending</p>
              </div>
              <Icon icon="mdi:message-text-outline" className="h-16 w-16 opacity-30" />
            </div>
          </div>
        </motion.div>

        {/* Management Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Content Management</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {managementCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => router.push(card.href)}
                className="group relative bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all"
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                
                {/* Icon */}
                <div className={`absolute top-4 right-4 w-20 h-20 bg-gradient-to-br ${card.color} opacity-10 group-hover:opacity-20 transition-opacity flex items-center justify-center`}>
                  <card.icon className="h-12 w-12 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                </div>

                <div className="relative p-8">
                  <div className={`inline-flex p-3 bg-gradient-to-br ${card.color} mb-4`}>
                    <card.icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-all">
                    {card.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                    {card.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-500">Total:</span>
                      <span className="ml-1 font-bold text-gray-900 dark:text-white">{card.stats.total}</span>
                    </div>
                    <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
                    <div>
                      <span className="text-gray-500 dark:text-gray-500">
                        {card.title.includes("Blog") ? "Published" : card.title.includes("Project") ? "Active" : "Approved"}:
                      </span>
                      <span className="ml-1 font-bold text-green-600">
                        {card.title.includes("Blog") ? card.stats.published : card.title.includes("Project") ? card.stats.active : card.stats.approved}
                      </span>
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <motion.div
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className={`w-8 h-8 bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                      <span className="text-white font-bold">→</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-12 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/admin/dashboard/blogs")}
              className="flex items-center gap-3 px-6 py-4 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-md"
            >
              <Icon icon="mdi:file-document-outline" className="h-6 w-6" />
              Create New Blog
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/admin/dashboard/projects")}
              className="flex items-center gap-3 px-6 py-4 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-md"
            >
              <Icon icon="mdi:folder-open-outline" className="h-6 w-6" />
              Add New Project
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/admin/dashboard/testimonials")}
              className="flex items-center gap-3 px-6 py-4 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-md"
            >
              <Icon icon="mdi:message-text-outline" className="h-6 w-6" />
              Add Testimonial
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
