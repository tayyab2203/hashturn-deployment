"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

interface AnimatedLogoProps {
  variant?: "navbar" | "footer"
}

export function AnimatedLogo({ variant = "navbar" }: AnimatedLogoProps) {
  const [isHovered, setIsHovered] = useState(false)

  const textColor = variant === "navbar" ? "text-foreground" : "text-background"

  return (
    <Link 
      href="/"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center group cursor-pointer"
    >
      <div className="relative flex items-center">
        {/* Hashtag Symbol with Destruct Animation */}
        <motion.div
          className="relative flex-shrink-0"
          animate={{
            scale: isHovered ? 0.7 : 1,
            x: isHovered ? -5 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="w-12 h-12 relative">
            {/* Top Left - Red vertical bar */}
            <motion.div
              className="absolute bg-brand-red"
              style={{ width: '7px', height: '22px', top: '0px', left: '13px' }}
              animate={{
                x: isHovered ? -8 : 0,
                y: isHovered ? -5 : 0,
                rotate: isHovered ? -15 : 0,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            
            {/* Top Right - Yellow vertical bar */}
            <motion.div
              className="absolute bg-brand-yellow"
              style={{ width: '7px', height: '22px', top: '0px', right: '13px' }}
              animate={{
                x: isHovered ? 8 : 0,
                y: isHovered ? -5 : 0,
                rotate: isHovered ? 15 : 0,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />

            {/* Top - Green horizontal bar */}
            <motion.div
              className="absolute bg-brand-green"
              style={{ height: '7px', width: '48px', top: '13px', left: '0px' }}
              animate={{
                y: isHovered ? -8 : 0,
                x: isHovered ? -3 : 0,
                rotate: isHovered ? -10 : 0,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />

            {/* Bottom - Blue horizontal bar */}
            <motion.div
              className="absolute bg-brand-blue"
              style={{ height: '7px', width: '48px', bottom: '13px', left: '0px' }}
              animate={{
                y: isHovered ? 8 : 0,
                x: isHovered ? -3 : 0,
                rotate: isHovered ? 10 : 0,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />

            {/* Bottom Left - Red vertical bar */}
            <motion.div
              className="absolute bg-brand-red"
              style={{ width: '7px', height: '22px', bottom: '0px', left: '13px' }}
              animate={{
                x: isHovered ? -8 : 0,
                y: isHovered ? 5 : 0,
                rotate: isHovered ? 15 : 0,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            
            {/* Bottom Right - Yellow vertical bar */}
            <motion.div
              className="absolute bg-brand-yellow"
              style={{ width: '7px', height: '22px', bottom: '0px', right: '13px' }}
              animate={{
                x: isHovered ? 8 : 0,
                y: isHovered ? 5 : 0,
                rotate: isHovered ? -15 : 0,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Animated HASHTURN Text */}
        <div className="relative overflow-visible flex items-center h-12">
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex items-center ml-1"
              >
                <span className="text-2xl font-bold tracking-wider flex">
                  {["H", "A", "S", "H", "T", "U", "R", "N"].map((letter, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, x: -20, y: 10 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.1 + index * 0.05,
                        ease: "easeOut",
                      }}
                      className={textColor}
                      style={{
                        color: 
                          index === 0 || index === 1 ? "#e53e3e" :
                          index === 2 || index === 3 ? "#38a169" :
                          index === 4 || index === 5 ? "#ecc94b" :
                          "#3182ce"
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-lg blur-2xl"
        animate={{
          opacity: isHovered ? 0.4 : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.4 }}
        style={{
          background: "radial-gradient(circle, rgba(56, 161, 105, 0.4), rgba(49, 130, 206, 0.4), rgba(229, 62, 62, 0.3))",
        }}
      />
    </Link>
  )
}
