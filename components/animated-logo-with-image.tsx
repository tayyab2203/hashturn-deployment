"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

interface AnimatedLogoProps {
  variant?: "navbar" | "footer"
}

export function AnimatedLogo({ variant = "navbar" }: AnimatedLogoProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Dark Navy Blue color for text - Same for both navbar and footer
  const textColor = "#1e3a8a"

  return (
    <Link 
      href="/"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center group relative overflow-visible"
    >
      {/* Container that centers logo by default, then shifts left on hover */}
      <motion.div
        className="flex items-center"
        animate={{
          x: isHovered ? 0 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Logo PNG Image - Starts centered, slides left on hover */}
        <motion.div
          className="relative flex-shrink-0"
          animate={{
            x: isHovered ? 0 : 0,
            scale: isHovered ? 0.95 : 1,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="w-10 h-10 relative">
            <Image
              src="/logo.png"
              alt="HashTurn Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Animated Text - Navy Blue Color - Slides in from right */}
        <motion.div
          className="relative overflow-hidden h-10 flex items-center"
          animate={{
            width: isHovered ? "auto" : 0,
            marginLeft: isHovered ? 10 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="whitespace-nowrap">
            <span className="text-2xl tracking-tight flex font-anton">
              {["H", "A", "S", "H", "T", "U", "R", "N"].map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    x: isHovered ? 0 : -10,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: isHovered ? index * 0.04 : 0,
                    ease: "easeOut",
                  }}
                  className="inline-block"
                  style={{
                    color: textColor
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Subtle glow effect on hover */}
      <motion.div
        className="absolute inset-0 -z-10 blur-xl opacity-0 pointer-events-none"
        animate={{
          opacity: isHovered ? 0.3 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: "radial-gradient(circle, rgba(30, 58, 138, 0.3), rgba(49, 130, 206, 0.3))",
        }}
      />
    </Link>
  )
}
