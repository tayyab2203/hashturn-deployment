"use client"

import { motion } from "framer-motion"
import { Icon } from "@iconify/react"

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/923090483683"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <Icon icon="mdi:whatsapp" className="h-6 w-6" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-red rounded-full animate-ping" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-red rounded-full" />
    </motion.a>
  )
}
