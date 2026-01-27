"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { AnimatedLogo } from "@/components/animated-logo-with-image"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Discover" },
  { href: "/about", label: "Who We Are" },
  { href: "/services", label: "What We Do" },
  { href: "/projects", label: "Our Work" },
  { href: "/blog", label: "Insights" },
  { href: "/testimonials", label: "Success Stories" },
  { href: "/contact", label: "Let's Talk" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-lg shadow-sm border-b border-border" : "bg-transparent",
      )}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <AnimatedLogo variant="navbar" />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Icon icon="mdi:white-balance-sunny" className="h-5 w-5" /> : <Icon icon="mdi:moon-waning-crescent" className="h-5 w-5" />}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-brand-green hover:text-brand-green hover:bg-brand-green/10"
            >
              <a
                href="https://wa.me/923090483683"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact on WhatsApp"
              >
                <Icon icon="mdi:whatsapp" className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/get-quote">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Icon icon="mdi:white-balance-sunny" className="h-5 w-5" /> : <Icon icon="mdi:moon-waning-crescent" className="h-5 w-5" />}
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <Icon icon="mdi:close" className="h-5 w-5" /> : <Icon icon="mdi:menu" className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-lg mb-4 border border-border"
            >
              <div className="py-4 px-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block py-3 px-4 text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 flex gap-2">
                  <Button asChild className="flex-1 bg-primary">
                    <Link href="/get-quote" onClick={() => setIsOpen(false)}>
                      Get Quote
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="border-brand-green text-brand-green bg-transparent"
                  >
                    <a href="https://wa.me/+92 3090483683" target="_blank" rel="noopener noreferrer">
                      <Icon icon="mdi:whatsapp" className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
