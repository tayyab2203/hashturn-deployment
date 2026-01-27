"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Icon } from "@iconify/react"

interface Stats {
  projects: number
  testimonials: number
  teamMembers: number
}

export function StatsSection() {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    testimonials: 0,
    teamMembers: 8, // Default team members count
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch projects count
        const projectsRes = await fetch('/api/projects?status=active')
        const projectsData = await projectsRes.json()
        const projectsCount = projectsData.success ? projectsData.data.length : 0

        // Fetch testimonials count
        const testimonialsRes = await fetch('/api/testimonials?status=approved')
        const testimonialsData = await testimonialsRes.json()
        const testimonialsCount = testimonialsData.success ? testimonialsData.data.length : 0

        // Team members count from hardcoded array (8 members)
        const teamMembersCount = 8

        setStats({
          projects: projectsCount,
          testimonials: testimonialsCount,
          teamMembers: teamMembersCount,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
  }, [])

  const statItems = [
    { 
      value: stats.projects > 0 ? `${stats.projects}+` : "0", 
      label: "Projects Delivered",
      icon: "mdi:briefcase-outline",
      color: "bg-brand-blue",
      gradient: "from-brand-blue/20 to-brand-blue/5"
    },
    { 
      value: stats.testimonials > 0 ? `${stats.testimonials}+` : "0", 
      label: "Happy Clients",
      icon: "mdi:account-group-outline",
      color: "bg-brand-green",
      gradient: "from-brand-green/20 to-brand-green/5"
    },
    { 
      value: stats.teamMembers > 0 ? `${stats.teamMembers}+` : "0", 
      label: "Team Members",
      icon: "mdi:account-group-outline",
      color: "bg-brand-yellow",
      gradient: "from-brand-yellow/20 to-brand-yellow/5"
    },
    { 
      value: "70%", 
      label: "Cost Reduction",
      icon: "mdi:trending-up",
      color: "bg-brand-red",
      gradient: "from-brand-red/20 to-brand-red/5"
    },
  ]
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Impact in Numbers</h2>
          <p className="text-muted-foreground">
            Real-time data showcasing our commitment to excellence and innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {statItems.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative bg-card border-2 border-border group-hover:border-primary/50 p-6 lg:p-8 text-center transition-all duration-300 shadow-sm hover:shadow-lg">
                {/* Icon */}
                <div className={`w-12 h-12 ${stat.color} flex items-center justify-center text-white mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                  <Icon icon={stat.icon} className="h-6 w-6" />
                </div>
                
                {/* Value */}
                <motion.div 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.value}
                </motion.div>
                
                {/* Label */}
                <div className="text-sm lg:text-base text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
