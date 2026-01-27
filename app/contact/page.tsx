import type { Metadata } from "next"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"

export const metadata: Metadata = {
  title: "Contact Us — HashTurn",
  description:
    "Get in touch with HashTurn. Let's discuss how we can help you automate workflows and build scalable applications.",
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
    </>
  )
}
