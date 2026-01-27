"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from "@iconify/react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

interface QuoteData {
  // Step 1: Personal Info
  name: string
  email: string
  phone: string
  company: string
  
  // Step 2: Service Selection
  service: string
  serviceDetails: string
  
  // Step 3: Project Details
  timeline: string
  budget: string
  requirements: string
  
  // Step 4: Additional Info
  targetAudience: string
  additionalNotes: string
}

const services = [
  "Web Development",
  "RPA Solutions",
  "API Development & Integration",
  "SaaS Development",
  "Ecommerce Solutions",
  "Custom Automation Bots",
  "Mobile App Development",
  "Database Solutions",
  "Security & Compliance"
]

const timelines = [
  "Less than 1 month",
  "1-3 months",
  "3-6 months",
  "6-12 months",
  "More than 12 months"
]

const budgets = [
  "Under $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000 - $100,000",
  "Above $100,000"
]

export default function GetQuotePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<QuoteData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    serviceDetails: "",
    timeline: "",
    budget: "",
    requirements: "",
    targetAudience: "",
    additionalNotes: ""
  })
  const [pdfGenerated, setPdfGenerated] = useState(false)

  const totalSteps = 4

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleInputChange = (field: keyof QuoteData, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const generatePDF = () => {
    const doc = new jsPDF()
    
    // Colors - HashTurn Logo Theme
    const primaryGreen = [18, 183, 106] // #12B76A (Logo Green)
    const darkGray = [30, 58, 138] // #1e3a8a (Dark Navy Blue)
    
    // Header with Logo
    doc.setFillColor(primaryGreen[0], primaryGreen[1], primaryGreen[2])
    doc.rect(0, 0, 210, 40, 'F')
    
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(28)
    doc.setFont('helvetica', 'bold')
    doc.text('# HASHTURN', 20, 25)
    
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('We Save Human Hours', 20, 32)
    
    // Quote Title
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text('Project Quote Request', 20, 55)
    
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 62)
    
    // Client Information
    let yPos = 75
    
    doc.setFontSize(14)
    doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2])
    doc.setFont('helvetica', 'bold')
    doc.text('Client Information', 20, yPos)
    yPos += 10
    
    doc.setFontSize(10)
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
    doc.setFont('helvetica', 'normal')
    
    const clientInfo = [
      ['Name:', formData.name],
      ['Email:', formData.email],
      ['Phone:', formData.phone],
      ['Company:', formData.company || 'N/A']
    ]
    
    clientInfo.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold')
      doc.text(label, 20, yPos)
      doc.setFont('helvetica', 'normal')
      doc.text(value, 60, yPos)
      yPos += 7
    })
    
    yPos += 5
    
    // Project Details
    doc.setFontSize(14)
    doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2])
    doc.setFont('helvetica', 'bold')
    doc.text('Project Details', 20, yPos)
    yPos += 10
    
    autoTable(doc, {
      startY: yPos,
      head: [['Category', 'Details']],
      body: [
        ['Service Required', formData.service],
        ['Service Details', formData.serviceDetails || 'N/A'],
        ['Timeline', formData.timeline],
        ['Budget Range', formData.budget],
        ['Target Audience', formData.targetAudience || 'N/A']
      ],
      theme: 'striped',
      headStyles: { 
        fillColor: primaryGreen,
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      styles: { 
        fontSize: 10,
        cellPadding: 5
      },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 50 },
        1: { cellWidth: 120 }
      }
    })
    
    yPos = (doc as any).lastAutoTable.finalY + 10
    
    // Requirements Section
    if (formData.requirements) {
      doc.setFontSize(14)
      doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2])
      doc.setFont('helvetica', 'bold')
      doc.text('Project Requirements', 20, yPos)
      yPos += 8
      
      doc.setFontSize(10)
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
      doc.setFont('helvetica', 'normal')
      
      const splitRequirements = doc.splitTextToSize(formData.requirements, 170)
      doc.text(splitRequirements, 20, yPos)
      yPos += splitRequirements.length * 5 + 10
    }
    
    // Additional Notes
    if (formData.additionalNotes) {
      doc.setFontSize(14)
      doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2])
      doc.setFont('helvetica', 'bold')
      doc.text('Additional Notes', 20, yPos)
      yPos += 8
      
      doc.setFontSize(10)
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
      doc.setFont('helvetica', 'normal')
      
      const splitNotes = doc.splitTextToSize(formData.additionalNotes, 170)
      doc.text(splitNotes, 20, yPos)
    }
    
    // Footer
    const pageHeight = doc.internal.pageSize.height
    doc.setFillColor(primaryGreen[0], primaryGreen[1], primaryGreen[2])
    doc.rect(0, pageHeight - 35, 210, 35, 'F')
    
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Contact HashTurn', 20, pageHeight - 23)
    
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.text('Email: contact@hashturn.com', 20, pageHeight - 16)
    doc.text('Phone: +92 309 0483683', 20, pageHeight - 10)
    doc.text('Website: www.hashturn.com', 120, pageHeight - 16)
    doc.text('Location: Multan, Pakistan', 120, pageHeight - 10)
    
    return doc
  }

  const handleDownload = () => {
    const doc = generatePDF()
    doc.save(`HashTurn_Quote_${formData.name.replace(/\s+/g, '_')}_${Date.now()}.pdf`)
    setPdfGenerated(true)
  }

  const handleWhatsAppShare = () => {
    const message = `Hi HashTurn! I would like to request a quote for:

*Service:* ${formData.service}
*Budget:* ${formData.budget}
*Timeline:* ${formData.timeline}

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}

*Requirements:*
${formData.requirements}

Please find my detailed requirements in the PDF document.`
    
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/923090483683?text=${encodedMessage}`, '_blank')
  }

  const handleEmailSend = () => {
    const subject = `Quote Request from ${formData.name} - ${formData.service}`
    const body = `Dear HashTurn Team,

I would like to request a quote for the following project:

SERVICE DETAILS:
- Service: ${formData.service}
- Timeline: ${formData.timeline}
- Budget: ${formData.budget}

CLIENT INFORMATION:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Company: ${formData.company}

PROJECT REQUIREMENTS:
${formData.requirements}

ADDITIONAL NOTES:
${formData.additionalNotes}

Best regards,
${formData.name}`
    
    window.location.href = `mailto:contact@hashturn.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const isStepValid = () => {
    switch(step) {
      case 1:
        return formData.name && formData.email && formData.phone
      case 2:
        return formData.service
      case 3:
        return formData.timeline && formData.budget && formData.requirements
      case 4:
        return true
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#12B76A]/5 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#12B76A]">
                <Icon icon="mdi:file-document-outline" className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#12B76A]">Get a Quote</h1>
                <p className="text-sm text-muted-foreground">Tell us about your project</p>
              </div>
            </div>
            
            {/* Progress Indicator */}
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    s === step
                      ? 'bg-[#12B76A] text-white scale-110'
                      : s < step
                      ? 'bg-[#12B76A]/20 text-[#12B76A]'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                  }`}
                >
                  {s < step ? <Icon icon="mdi:check" className="h-5 w-5" /> : s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Form Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-8 shadow-xl"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">Personal Information</h2>
                  <p className="text-muted-foreground">Let's start with your basic details</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-[#12B76A] focus:ring-4 focus:ring-[#12B76A]/20 transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-[#12B76A] focus:ring-4 focus:ring-[#12B76A]/20 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-[#12B76A] focus:ring-4 focus:ring-[#12B76A]/20 transition-all"
                      placeholder="+92 300 1234567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Company Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-[#12B76A] focus:ring-4 focus:ring-[#12B76A]/20 transition-all"
                      placeholder="Your Company Ltd."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Service Selection */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-8 shadow-xl"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">Service Selection</h2>
                  <p className="text-muted-foreground">What service do you need?</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Select Service *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => handleInputChange('service', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-[#12B76A] focus:ring-4 focus:ring-[#12B76A]/20 transition-all"
                    >
                      <option value="">Choose a service...</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Service Details (Optional)
                    </label>
                    <textarea
                      value={formData.serviceDetails}
                      onChange={(e) => handleInputChange('serviceDetails', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-[#12B76A] focus:ring-4 focus:ring-[#12B76A]/20 transition-all"
                      placeholder="Any specific details about the service you need..."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Project Details */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-8 shadow-xl"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">Project Details</h2>
                  <p className="text-muted-foreground">Help us understand your project better</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Project Timeline *
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-[#12B76A] focus:ring-4 focus:ring-[#12B76A]/20 transition-all"
                    >
                      <option value="">Select timeline...</option>
                      {timelines.map((timeline) => (
                        <option key={timeline} value={timeline}>{timeline}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Budget Range *
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-[#12B76A] focus:ring-4 focus:ring-[#12B76A]/20 transition-all"
                    >
                      <option value="">Select budget range...</option>
                      {budgets.map((budget) => (
                        <option key={budget} value={budget}>{budget}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Project Requirements *
                    </label>
                    <textarea
                      value={formData.requirements}
                      onChange={(e) => handleInputChange('requirements', e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-[#12B76A] focus:ring-4 focus:ring-[#12B76A]/20 transition-all"
                      placeholder="Describe your project requirements in detail..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Target Audience (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.targetAudience}
                      onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-[#12B76A] focus:ring-4 focus:ring-[#12B76A]/20 transition-all"
                      placeholder="E.g., Small businesses, Enterprise customers"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Review & Submit */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-8 shadow-xl"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">Review & Submit</h2>
                  <p className="text-muted-foreground">Review your information and generate quote</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      value={formData.additionalNotes}
                      onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-[#12B76A] focus:ring-4 focus:ring-[#12B76A]/20 transition-all"
                      placeholder="Any additional information you'd like to share..."
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="bg-[#12B76A]/10 p-6 space-y-4">
                    <h3 className="font-bold text-foreground mb-4">Generate Your Quote</h3>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownload}
                      className="w-full px-6 py-4 bg-[#12B76A] text-white font-bold hover:bg-[#0FA958] transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Icon icon="mdi:download" className="h-5 w-5" />
                      Download PDF Quote
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleWhatsAppShare}
                      className="w-full px-6 py-4 bg-[#12B76A] text-white font-bold hover:bg-[#0FA958] transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Icon icon="mdi:whatsapp" className="h-5 w-5" />
                      Send via WhatsApp
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleEmailSend}
                      className="w-full px-6 py-4 bg-[#1e3a8a] text-white font-bold hover:bg-[#1e40af] transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Icon icon="mdi:email-outline" className="h-5 w-5" />
                      Send via Email
                    </motion.button>

                    {/* Back to Home Button - Shows after PDF download */}
                    {pdfGenerated && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => router.push('/')}
                        className="w-full px-6 py-4 bg-gray-800 dark:bg-gray-700 text-white font-bold hover:bg-gray-900 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2 shadow-lg border-2 border-gray-700"
                      >
                        <Icon icon="mdi:home" className="h-5 w-5" />
                        Back to Home
                      </motion.button>
                    )}
                  </div>

                  {/* Summary Preview */}
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 space-y-4">
                    <h3 className="font-bold text-foreground mb-4">Quote Summary</h3>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Name:</p>
                        <p className="font-semibold">{formData.name}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Service:</p>
                        <p className="font-semibold">{formData.service}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Timeline:</p>
                        <p className="font-semibold">{formData.timeline}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Budget:</p>
                        <p className="font-semibold">{formData.budget}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePrev}
                className="px-8 py-4 bg-gray-200 dark:bg-gray-700 text-foreground font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all flex items-center gap-2"
              >
                <Icon icon="mdi:arrow-left" className="h-5 w-5" />
                Previous
              </motion.button>
            )}
            
            {step < totalSteps && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                disabled={!isStepValid()}
                className="flex-1 px-8 py-4 bg-[#12B76A] text-white font-bold hover:bg-[#0FA958] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Next Step
                <Icon icon="mdi:arrow-right" className="h-5 w-5" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
