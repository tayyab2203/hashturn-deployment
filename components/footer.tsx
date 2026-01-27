"use client"

import Link from "next/link"
import { Icon } from "@iconify/react"
import { AnimatedLogo } from "@/components/animated-logo-with-image"

interface FooterLink {
  href: string
  label: string
  onClick?: string
}

const footerLinks = {
  company: [
    { href: "/about", label: "Who We Are" },
    { href: "/contact", label: "Let's Talk" },
    { href: "#", label: "Admin Login", onClick: "openAdminLogin" },
    { href: "#", label: "Admin Signup", onClick: "openAdminSignup" },
  ] as FooterLink[],
  services: [
    { href: "/services", label: "Web Development" },
    { href: "/services", label: "RPA Solutions" },
    { href: "/services", label: "API Integration" },
  ],
  resources: [
    { href: "/projects", label: "Our Work" },
    { href: "/testimonials", label: "Success Stories" },
    { href: "/blog", label: "Insights" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <AnimatedLogo variant="footer" />
            <p className="text-background/70 text-sm leading-relaxed">
              We save human hours. Modern digital solutions provider specializing in Web Development, RPA Solutions, and
              Custom Automation.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/hashturn/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Icon icon="mdi:linkedin" className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/hashturnofficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="Facebook"
              >
                <Icon icon="mdi:facebook" className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/hashturn/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="GitHub"
              >
                <Icon icon="mdi:github" className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/923090483683"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="WhatsApp"
              >
                <Icon icon="mdi:whatsapp" className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-6">Company</h4>
                <ul className="space-y-4">
                  {footerLinks.company.map((link) => (
                    <li key={link.href + link.label}>
                      {link.onClick ? (
                        <button
                          onClick={() => {
                            const event = new Event(link.onClick)
                            window.dispatchEvent(event)
                          }}
                          className="text-background/70 hover:text-background transition-colors text-sm"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <Link href={link.href} className="text-background/70 hover:text-background transition-colors text-sm">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold mb-6">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-background/70 hover:text-background transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-background/70 text-sm">
                <Icon icon="mdi:email-outline" className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:contact@hashturn.com" className="hover:text-background transition-colors">
                  contact@hashturn.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-background/70 text-sm">
                <Icon icon="mdi:phone-outline" className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+923090483683" className="hover:text-background transition-colors">
                  +92 309 0483683
                </a>
              </li>
              <li className="flex items-start gap-3 text-background/70 text-sm">
                <Icon icon="mdi:map-marker-outline" className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>Office No 43/43A City Tower<br />Chungi No 9, Multan, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

          <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">© {new Date().getFullYear()} HashTurn. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-background/60 hover:text-background text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-background/60 hover:text-background text-sm transition-colors">
              Terms of Service
            </Link>
            <button
              onClick={() => {
                const event = new CustomEvent('openAdminLogin')
                window.dispatchEvent(event)
              }}
              className="text-background/60 hover:text-background text-sm transition-colors font-medium"
            >
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
