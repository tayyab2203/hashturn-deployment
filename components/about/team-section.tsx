"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

const team = [
  {
    name: "Zeeshan Bilal",
    role: "Founder, CEO",
    image: "https://www.hashturn.net/team/zb.jpeg",
    linkedin: "https://www.linkedin.com/in/billalzeeshaan/",
    color: "blue",
  },
  {
    name: "Muhammad Awais Anwar",
    role: "Chief Technology Officer",
    image: "https://www.hashturn.net/team/aa.jpeg",
    linkedin: "https://www.linkedin.com/in/awais-anwar-6b3b5521b/",
    color: "red",
  },
  {
    name: "Qazi Zubair",
    role: "MERN Stack Developer",
    image: "https://www.hashturn.net/team/qz.png",
    linkedin: "https://www.linkedin.com/in/qazi-zubair-928b4b243/",
    color: "green",
  },
  {
    name: "Muhammad Zaid Nehal",
    role: "Senior Software Engineer",
    image: "https://www.hashturn.net/team/ZaidNehal.jpeg",
    linkedin: "https://pk.linkedin.com/in/muhammad-zaid-nehal-ab0b3b223",
    color: "yellow",
  },
  {
    name: "Rizwan Khan",
    role: "AI Automation Engineer",
    image: "https://www.hashturn.net/team/Rk.png",
    linkedin: "https://www.linkedin.com/in/rizwanbinakbar/",
    color: "blue",
  },
  {
    name: "Muhammad Abubakar",
    role: "React/Next.js Developer",
    image: "https://www.hashturn.net/team/abubakar.jpeg",
    linkedin: "https://www.linkedin.com/in/muhammadabubakarmughal/",
    color: "red",
  },
  {
    name: "Ahsan Raza Alvi",
    role: "UI/UX Designer",
    image: "https://www.hashturn.net/team/ar.jpg",
    linkedin: "https://www.linkedin.com/in/ahsan-raza-9063aa208/",
    color: "green",
  },
  {
    name: "Muhammad Yousaf Elahi",
    role: "Chief Financial Officer",
    image: "https://www.hashturn.net/team/ya.jpeg",
    linkedin: "https://www.linkedin.com/in/yousafelahi/",
    color: "yellow",
  },
]

const colorMap = {
  blue: { bg: "bg-brand-blue", border: "border-brand-blue", glow: "shadow-brand-blue/30" },
  red: { bg: "bg-brand-red", border: "border-brand-red", glow: "shadow-brand-red/30" },
  green: { bg: "bg-brand-green", border: "border-brand-green", glow: "shadow-brand-green/30" },
  yellow: { bg: "bg-brand-yellow", border: "border-brand-yellow", glow: "shadow-brand-yellow/30" },
}

export function TeamSection() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-background to-background pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Team
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Meet the Experts
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            The passionate minds behind HashTurn's success. Our diverse team of experts brings innovation and
            excellence to every project.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => {
            const colors = colorMap[member.color as keyof typeof colorMap]
            const isHovered = hoveredIndex === index

            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative"
              >
                {/* Card container */}
                <motion.div
                  animate={isHovered ? { y: -10 } : { y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "bg-card border-2 border-border overflow-hidden transition-all duration-500",
                    isHovered && `shadow-2xl ${colors.glow} ${colors.border}`,
                  )}
                >
                  {/* Image container */}
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                    />

                    {/* Gradient overlay - subtle always, stronger on hover */}
                    <motion.div
                      animate={{ opacity: isHovered ? 1 : 0.3 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent"
                    />

                    {/* Role badge - Always visible */}
                    <motion.div
                      animate={{ 
                        scale: isHovered ? 1.05 : 1,
                        y: isHovered ? -4 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "absolute top-4 left-0 px-4 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-sm",
                        colors.bg,
                      )}
                    >
                      {member.role.split(",")[0]}
                    </motion.div>

                    {/* Social links overlay - Only show on hover */}
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={isHovered ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute inset-x-0 bottom-0 p-6 flex justify-center gap-4"
                    >
                      <motion.a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ scale: 0.8, rotate: -10 }}
                        animate={isHovered ? { scale: 1, rotate: 0 } : { scale: 0.8, rotate: -10 }}
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "w-14 h-14 flex items-center justify-center text-white shadow-2xl hover:shadow-3xl",
                          colors.bg,
                        )}
                      >
                        <Icon icon="mdi:linkedin" className="h-6 w-6" />
                      </motion.a>
                      <motion.a
                        href={`mailto:info@hashturn.net`}
                        initial={{ scale: 0.8, rotate: 10 }}
                        animate={isHovered ? { scale: 1, rotate: 0 } : { scale: 0.8, rotate: 10 }}
                        whileHover={{ scale: 1.15, rotate: -5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="w-14 h-14 bg-background/95 backdrop-blur-md flex items-center justify-center text-foreground shadow-2xl hover:shadow-3xl border-2 border-border"
                      >
                        <Icon icon="mdi:email-outline" className="h-6 w-6" />
                      </motion.a>
                    </motion.div>
                  </div>

                  {/* Info section */}
                  <div className="p-6 text-center relative">
                    {/* Animated accent line */}
                    <motion.div
                      className={cn("absolute top-0 left-1/2 -translate-x-1/2 h-1", colors.bg)}
                      animate={{ width: isHovered ? 60 : 20 }}
                      transition={{ duration: 0.4 }}
                    />

                    <motion.h3
                      animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-lg font-bold text-foreground mt-2"
                    >
                      {member.name}
                    </motion.h3>
                    <motion.p 
                      className="text-sm text-muted-foreground mt-1"
                      animate={isHovered ? { color: 'rgb(var(--primary))' } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {member.role}
                    </motion.p>

                    {/* Connect text on hover */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={isHovered ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 overflow-hidden"
                    >
                      <p className="text-xs font-semibold text-primary flex items-center justify-center gap-1">
                        <Icon icon="mdi:open-in-new" className="h-3 w-3" />
                        Connect with me
                      </p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Decorative shadow element */}
                <motion.div
                  animate={isHovered ? { scale: 1.05, opacity: 0.5 } : { scale: 1, opacity: 0 }}
                  className={cn("absolute inset-0 blur-xl -z-10", colors.bg)}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
