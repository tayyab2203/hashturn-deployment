export interface Project {
  slug: string
  title: string
  category: string
  description: string
  image: string
  color: "blue" | "red" | "green" | "yellow"
  tech: string[]
  
  // Case Study Details
  client: string
  industry: string
  duration: string
  year: string
  website?: string
  
  // Full Details
  overview: string
  challenge: string
  solution: string
  
  // Features
  features: {
    title: string
    description: string
    icon: string
  }[]
  
  // Results/Metrics
  results: {
    metric: string
    value: string
    description: string
  }[]
  
  // Technologies Used (detailed)
  technologies: {
    category: string
    items: string[]
  }[]
  
  // Gallery Images
  gallery: string[]
  
  // Testimonial (optional)
  testimonial?: {
    quote: string
    author: string
    position: string
    avatar?: string
  }
}

export const projects: Project[] = [
  {
    slug: "ecommerce-web-app",
    title: "E-commerce Web App",
    category: "Web Development",
    description: "Full-featured online store with payment integration, inventory management, and analytics dashboard.",
    image: "https://www.hashturn.net/projects/ecommerce.webp",
    color: "blue",
    tech: ["Next.js", "Stripe", "MongoDB"],
    client: "RetailPro Inc.",
    industry: "E-commerce",
    duration: "3 months",
    year: "2024",
    website: "https://example.com",
    overview: "Built a comprehensive e-commerce platform that handles everything from product catalog to payment processing and order fulfillment. The platform features a modern, responsive design and provides an excellent user experience across all devices.",
    challenge: "The client needed a scalable e-commerce solution that could handle high traffic during peak seasons while maintaining fast load times and providing a seamless checkout experience.",
    solution: "We developed a Next.js-based platform with server-side rendering for optimal performance, integrated Stripe for secure payments, and implemented MongoDB for flexible data management. The solution includes real-time inventory tracking, automated email notifications, and comprehensive analytics.",
    features: [
      {
        title: "Product Management",
        description: "Advanced catalog system with categories, variants, and inventory tracking",
        icon: "package"
      },
      {
        title: "Payment Integration",
        description: "Secure checkout with Stripe supporting multiple payment methods",
        icon: "credit-card"
      },
      {
        title: "Order Tracking",
        description: "Real-time order status updates and shipment tracking",
        icon: "truck"
      },
      {
        title: "Analytics Dashboard",
        description: "Comprehensive insights into sales, customers, and inventory",
        icon: "chart"
      }
    ],
    results: [
      {
        metric: "Sales Increase",
        value: "150%",
        description: "Growth in online sales within first 6 months"
      },
      {
        metric: "Page Load Time",
        value: "1.2s",
        description: "Average page load time across the site"
      },
      {
        metric: "Conversion Rate",
        value: "4.8%",
        description: "Increase in checkout conversion rate"
      },
      {
        metric: "Customer Satisfaction",
        value: "95%",
        description: "Positive feedback from customers"
      }
    ],
    technologies: [
      {
        category: "Frontend",
        items: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS"]
      },
      {
        category: "Backend",
        items: ["Node.js", "MongoDB", "Stripe API", "NextAuth.js"]
      },
      {
        category: "Infrastructure",
        items: ["Vercel", "MongoDB Atlas", "Cloudinary", "SendGrid"]
      }
    ],
    gallery: [
      "https://www.hashturn.net/projects/ecommerce.webp",
      "https://www.hashturn.net/projects/ecommerce.webp",
      "https://www.hashturn.net/projects/ecommerce.webp"
    ],
    testimonial: {
      quote: "HashTurn delivered an exceptional e-commerce platform that exceeded our expectations. The site is fast, beautiful, and our sales have increased significantly.",
      author: "John Smith",
      position: "CEO, RetailPro Inc."
    }
  },
  {
    slug: "invoice-automation-bot",
    title: "Invoice Automation Bot",
    category: "RPA Solution",
    description: "Automated invoice processing system that reduced manual work by 80% and eliminated errors.",
    image: "https://www.hashturn.net/projects/invoice-bot.webp",
    color: "red",
    tech: ["Python", "UiPath", "AWS"],
    client: "FinanceFlow Corp",
    industry: "Finance",
    duration: "2 months",
    year: "2024",
    overview: "Developed an intelligent RPA solution that automates the entire invoice processing workflow, from data extraction to approval routing and payment scheduling.",
    challenge: "The finance team was spending 20+ hours per week manually processing invoices, leading to delays and errors in payment processing.",
    solution: "We built a Python-based automation bot using UiPath that extracts data from invoices, validates information, routes for approval, and schedules payments automatically. The system integrates with their existing ERP and accounting software.",
    features: [
      {
        title: "Data Extraction",
        description: "AI-powered OCR extracts data from invoices in any format",
        icon: "scan"
      },
      {
        title: "Smart Validation",
        description: "Automated validation against purchase orders and contracts",
        icon: "check"
      },
      {
        title: "Approval Workflow",
        description: "Intelligent routing based on amount and department",
        icon: "flow"
      },
      {
        title: "Payment Integration",
        description: "Direct integration with banking systems for payments",
        icon: "dollar"
      }
    ],
    results: [
      {
        metric: "Time Saved",
        value: "80%",
        description: "Reduction in manual processing time"
      },
      {
        metric: "Error Rate",
        value: "0.1%",
        description: "Down from 5% with manual processing"
      },
      {
        metric: "Processing Speed",
        value: "2min",
        description: "Average time per invoice"
      },
      {
        metric: "Cost Savings",
        value: "$50K",
        description: "Annual operational cost reduction"
      }
    ],
    technologies: [
      {
        category: "Automation",
        items: ["Python", "UiPath", "Selenium", "BeautifulSoup"]
      },
      {
        category: "AI/ML",
        items: ["Tesseract OCR", "spaCy", "TensorFlow"]
      },
      {
        category: "Cloud",
        items: ["AWS Lambda", "S3", "RDS", "CloudWatch"]
      }
    ],
    gallery: [
      "https://www.hashturn.net/projects/invoice-bot.webp",
      "https://www.hashturn.net/projects/invoice-bot.webp"
    ],
    testimonial: {
      quote: "The automation bot has transformed our finance operations. We're now processing invoices in minutes instead of hours.",
      author: "Sarah Johnson",
      position: "CFO, FinanceFlow Corp"
    }
  },
  {
    slug: "analytics-dashboard",
    title: "Analytics Dashboard",
    category: "SaaS",
    description: "Real-time analytics platform with customizable dashboards and automated reporting.",
    image: "https://www.hashturn.net/projects/analytics.webp",
    color: "green",
    tech: ["React", "D3.js", "PostgreSQL"],
    client: "DataInsights Inc.",
    industry: "SaaS / Analytics",
    duration: "4 months",
    year: "2024",
    website: "https://example.com",
    overview: "Created a powerful analytics platform that provides real-time insights with customizable dashboards, automated reports, and predictive analytics capabilities.",
    challenge: "The client needed a scalable analytics solution that could handle millions of data points while providing instant visualizations and insights to their users.",
    solution: "We developed a React-based dashboard with D3.js for advanced visualizations, PostgreSQL for data storage, and a Node.js backend for real-time data processing. The platform includes drag-and-drop dashboard builder, automated reporting, and AI-powered insights.",
    features: [
      {
        title: "Custom Dashboards",
        description: "Drag-and-drop interface for building personalized dashboards",
        icon: "layout"
      },
      {
        title: "Real-time Updates",
        description: "Live data streaming with instant chart updates",
        icon: "refresh"
      },
      {
        title: "Automated Reports",
        description: "Schedule and generate reports automatically",
        icon: "file"
      },
      {
        title: "AI Insights",
        description: "Machine learning-powered predictions and anomaly detection",
        icon: "brain"
      }
    ],
    results: [
      {
        metric: "Data Processing",
        value: "10M+",
        description: "Data points processed per day"
      },
      {
        metric: "Response Time",
        value: "<100ms",
        description: "Average query response time"
      },
      {
        metric: "User Adoption",
        value: "92%",
        description: "Of clients actively using the platform"
      },
      {
        metric: "Uptime",
        value: "99.9%",
        description: "Platform availability"
      }
    ],
    technologies: [
      {
        category: "Frontend",
        items: ["React", "D3.js", "Redux", "Material-UI"]
      },
      {
        category: "Backend",
        items: ["Node.js", "Express", "PostgreSQL", "Redis"]
      },
      {
        category: "Analytics",
        items: ["Apache Kafka", "Elasticsearch", "TensorFlow"]
      }
    ],
    gallery: [
      "https://www.hashturn.net/projects/analytics.webp",
      "https://www.hashturn.net/projects/analytics.webp"
    ]
  }
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug)
}

export function getAllProjectSlugs(): string[] {
  return projects.map(project => project.slug)
}
