"use client"

import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"

const contactMethods = [
  {
    icon: "mdi:email-outline",
    label: "Email",
    value: "contact@hashturn.com",
    href: "mailto:contact@hashturn.com",
  },
  {
    icon: "mdi:phone-outline",
    label: "Phone",
    value: "+92 309 0483683",
    href: "tel:+923090483683",
  },
  {
    icon: "mdi:whatsapp",
    label: "WhatsApp",
    value: "Chat with us",
    href: "https://wa.me/923090483683",
  },
  {
    icon: "mdi:map-marker-outline",
    label: "Location",
    value: "Office No 43/43A City Tower, Chungi No 9, Multan, Pakistan",
    href: "https://maps.google.com/?q=Office+No+43/43A+City+Tower+Chungi+No+9+Multan+Pakistan",
  },
  {
    icon: "mdi:clock-outline",
    label: "Business Hours",
    value: "Mon - Fri: 9AM - 6PM (PKT)",
    href: "#",
  },
]

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Get in Touch</h2>
        <p className="text-muted-foreground leading-relaxed">
          Have a project in mind? We'd love to hear from you. Reach out through any of the channels below, and we'll get
          back to you within 24 hours.
        </p>
      </div>

      <div className="space-y-4">
        {contactMethods.map((method) => (
          <a
            key={method.label}
            href={method.href}
            className="flex items-center gap-4 p-4 bg-card border border-border hover:border-primary transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Icon icon={method.icon} className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{method.label}</p>
              <p className="font-medium text-foreground">{method.value}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="bg-primary/5 border border-primary/20 p-6">
        <h3 className="font-semibold text-foreground mb-2">Prefer WhatsApp?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Get instant responses by chatting with us on WhatsApp. We're available 24/7 for quick inquiries.
        </p>
        <Button asChild className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white">
          <a href="https://wa.me/923090483683" target="_blank" rel="noopener noreferrer">
            <Icon icon="mdi:whatsapp" className="mr-2 h-4 w-4" />
            Chat on WhatsApp
          </a>
        </Button>
      </div>
    </motion.div>
  )
}
