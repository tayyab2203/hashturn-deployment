import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono, Anton } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ChatBot } from "@/components/chat-bot"
import { AdminLoginProvider } from "@/components/admin/admin-login-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" })

export const metadata: Metadata = {
  title: "HashTurn - We Save Human Hours",
  description:
    "HashTurn is a modern digital solutions provider specializing in Web Development, RPA Solutions, API Integration, and Custom Automation. Perfect for startups and enterprises looking to build scalable applications and automate workflows.",
  keywords: ["Web Development", "RPA", "Automation", "API Integration", "SaaS Development", "Ecommerce"],
  authors: [{ name: "HashTurn" }],
  openGraph: {
    title: "HashTurn - We Save Human Hours",
    description: "Modern digital solutions provider specializing in Web Development and RPA Solutions.",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} ${anton.variable} font-sans antialiased`}>
        <ThemeProvider defaultTheme="light">
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
          <ChatBot />
          <AdminLoginProvider />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
