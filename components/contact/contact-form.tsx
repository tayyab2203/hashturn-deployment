"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-2xl p-12 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Icon icon="mdi:check-circle" className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-4">Message Sent!</h3>
        <p className="text-muted-foreground mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline">
          Send Another Message
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border p-8"
    >
      <h2 className="text-2xl font-bold text-foreground mb-6">Send us a message</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" placeholder="John" required className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" placeholder="Doe" required className="rounded-xl" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="john@example.com" required className="rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company (Optional)</Label>
          <Input id="company" placeholder="Your Company" className="rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="service">Service Interested In</Label>
          <select
            id="service"
            className="w-full h-10 px-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            required
          >
            <option value="">Select a service</option>
            <option value="web">Web Development</option>
            <option value="rpa">RPA Solutions</option>
            <option value="api">API Development</option>
            <option value="saas">SaaS Development</option>
            <option value="ecommerce">Ecommerce Solutions</option>
            <option value="automation">Custom Automation</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Tell us about your project..."
            rows={5}
            required
            className="rounded-xl resize-none"
          />
        </div>
        <Button type="submit" size="lg" className="w-full rounded-xl" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Icon icon="mdi:loading" className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Icon icon="mdi:send" className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </motion.div>
  )
}
