"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Clock,
  ExternalLink,
  Award,
  Calendar,
  MapPin,
  GraduationCap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Certificate {
  id: string
  title: string
  issuer: string
  issuerType: "university" | "platform" | "organization" | "company"
  date: string
  imageSrc: string
  pdfSrc: string
  level: "beginner" | "intermediate" | "advanced" | "expert"
  category: string
  expiryDate?: string
  description?: string
  credentialId?: string
  verificationUrl?: string
  skills: string[]
  duration?: string
  location?: string
}

export default function CertificatesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [activeSort, setActiveSort] = useState<string>("newest")
  const [showFilters, setShowFilters] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [remainingDays, setRemainingDays] = useState<Record<string, number>>({})
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const certificates: Certificate[] = [
    {
      id: "business-acumen-gik",
      title: "Business Acumen & Strategic Management",
      issuer: "GIK Institute of Engineering Sciences and Technology",
      issuerType: "university",
      date: "2024-03-15",
      imageSrc: "/certificates/business-acumen.png",
      pdfSrc: "/certificates/business-acumen.pdf",
      level: "expert",
      category: "business",
      expiryDate: "2027-03-15",
      description:
        "Comprehensive program covering strategic business management, financial analysis, market research, and leadership principles. Focused on developing critical thinking skills for business decision-making.",
      credentialId: "GIK-BA-2024-001",
      verificationUrl: "https://giki.edu.pk/verify/GIK-BA-2024-001",
      skills: ["Strategic Planning", "Financial Analysis", "Market Research", "Leadership", "Decision Making"],
      duration: "6 months",
      location: "Topi, Swabi, Pakistan",
    },
    {
      id: "ai-machine-learning-gik",
      title: "Artificial Intelligence & Machine Learning",
      issuer: "GIK Institute of Engineering Sciences and Technology",
      issuerType: "university",
      date: "2024-01-20",
      imageSrc: "/certificates/supercomputing-ai.png",
      pdfSrc: "/certificates/supercomputing-ai.pdf",
      level: "expert",
      category: "technology",
      expiryDate: "2027-01-20",
      description:
        "Advanced certification in AI/ML covering neural networks, deep learning, computer vision, natural language processing, and practical implementation of AI solutions.",
      credentialId: "GIK-AI-2024-002",
      verificationUrl: "https://giki.edu.pk/verify/GIK-AI-2024-002",
      skills: [
        "Machine Learning",
        "Deep Learning",
        "Neural Networks",
        "Computer Vision",
        "NLP",
        "Python",
        "TensorFlow",
      ],
      duration: "8 months",
      location: "Topi, Swabi, Pakistan",
    },
    {
      id: "data-science-analytics-gik",
      title: "Data Science & Advanced Analytics",
      issuer: "GIK Institute of Engineering Sciences and Technology",
      issuerType: "university",
      date: "2023-11-10",
      imageSrc: "/certificates/data-science-analytics.png",
      pdfSrc: "/certificates/data-science-analytics.pdf",
      level: "expert",
      category: "technology",
      expiryDate: "2026-11-10",
      description:
        "Comprehensive data science program covering statistical analysis, data visualization, predictive modeling, big data technologies, and business intelligence.",
      credentialId: "GIK-DS-2023-003",
      verificationUrl: "https://giki.edu.pk/verify/GIK-DS-2023-003",
      skills: ["Data Analysis", "Statistical Modeling", "Data Visualization", "Big Data", "Python", "R", "SQL"],
      duration: "7 months",
      location: "Topi, Swabi, Pakistan",
    },
    {
      id: "cybersecurity-gik",
      title: "Cybersecurity & Information Assurance",
      issuer: "GIK Institute of Engineering Sciences and Technology",
      issuerType: "university",
      date: "2023-09-05",
      imageSrc: "/certificates/cybersecurity-awareness.png",
      pdfSrc: "/certificates/cybersecurity-awareness.pdf",
      level: "advanced",
      category: "technology",
      expiryDate: "2026-09-05",
      description:
        "Advanced cybersecurity certification covering network security, ethical hacking, digital forensics, risk assessment, and security policy development.",
      credentialId: "GIK-CS-2023-004",
      verificationUrl: "https://giki.edu.pk/verify/GIK-CS-2023-004",
      skills: ["Network Security", "Ethical Hacking", "Digital Forensics", "Risk Assessment", "Security Policies"],
      duration: "5 months",
      location: "Topi, Swabi, Pakistan",
    },
    {
      id: "software-engineering-gik",
      title: "Advanced Software Engineering",
      issuer: "GIK Institute of Engineering Sciences and Technology",
      issuerType: "university",
      date: "2023-06-18",
      imageSrc: "/certificates/agile-business-process.png",
      pdfSrc: "/certificates/agile-business-process.pdf",
      level: "expert",
      category: "technology",
      expiryDate: "2026-06-18",
      description:
        "Comprehensive software engineering program covering software architecture, design patterns, agile methodologies, DevOps practices, and project management.",
      credentialId: "GIK-SE-2023-005",
      verificationUrl: "https://giki.edu.pk/verify/GIK-SE-2023-005",
      skills: ["Software Architecture", "Design Patterns", "Agile", "DevOps", "Project Management"],
      duration: "6 months",
      location: "Topi, Swabi, Pakistan",
    },
    {
      id: "digital-marketing-gik",
      title: "Digital Marketing & E-Commerce",
      issuer: "GIK Institute of Engineering Sciences and Technology",
      issuerType: "university",
      date: "2023-04-12",
      imageSrc: "/certificates/storytelling-investment.png",
      pdfSrc: "/certificates/storytelling-investment.pdf",
      level: "advanced",
      category: "business",
      expiryDate: "2026-04-12",
      description:
        "Digital marketing certification covering SEO, social media marketing, content strategy, e-commerce platforms, and digital analytics.",
      credentialId: "GIK-DM-2023-006",
      verificationUrl: "https://giki.edu.pk/verify/GIK-DM-2023-006",
      skills: ["SEO", "Social Media Marketing", "Content Strategy", "E-commerce", "Digital Analytics"],
      duration: "4 months",
      location: "Topi, Swabi, Pakistan",
    },
    {
      id: "entrepreneurship-gik",
      title: "Entrepreneurship & Innovation Management",
      issuer: "GIK Institute of Engineering Sciences and Technology",
      issuerType: "university",
      date: "2023-02-08",
      imageSrc: "/certificates/business-plan.png",
      pdfSrc: "/certificates/business-plan.pdf",
      level: "advanced",
      category: "business",
      expiryDate: "2026-02-08",
      description:
        "Entrepreneurship program focusing on startup development, business model innovation, venture capital, and scaling strategies.",
      credentialId: "GIK-EN-2023-007",
      verificationUrl: "https://giki.edu.pk/verify/GIK-EN-2023-007",
      skills: ["Startup Development", "Business Models", "Venture Capital", "Innovation", "Scaling"],
      duration: "5 months",
      location: "Topi, Swabi, Pakistan",
    },
    {
      id: "leadership-management-gik",
      title: "Leadership & Team Management",
      issuer: "GIK Institute of Engineering Sciences and Technology",
      issuerType: "university",
      date: "2022-12-15",
      imageSrc: "/certificates/influencing-motivating.png",
      pdfSrc: "/certificates/influencing-motivating.pdf",
      level: "advanced",
      category: "leadership",
      expiryDate: "2025-12-15",
      description:
        "Leadership development program covering team dynamics, conflict resolution, performance management, and organizational behavior.",
      credentialId: "GIK-LM-2022-008",
      verificationUrl: "https://giki.edu.pk/verify/GIK-LM-2022-008",
      skills: ["Team Leadership", "Conflict Resolution", "Performance Management", "Communication"],
      duration: "4 months",
      location: "Topi, Swabi, Pakistan",
    },
    {
      id: "problem-solving-linkedin",
      title: "Problem Solving and Decision Making",
      issuer: "LinkedIn Learning",
      issuerType: "platform",
      date: "2024-02-20",
      imageSrc: "/certificates/problem-solving.png",
      pdfSrc: "/certificates/problem-solving.pdf",
      level: "intermediate",
      category: "leadership",
      description:
        "Professional development course focusing on analytical thinking, creative problem-solving methodologies, and effective decision-making frameworks.",
      credentialId: "LIL-PS-2024-009",
      skills: ["Analytical Thinking", "Creative Problem Solving", "Decision Making", "Critical Analysis"],
      duration: "2 months",
    },
    {
      id: "finance-non-financial-coursera",
      title: "Finance for Non-Financial Professionals",
      issuer: "Coursera (University of Pennsylvania)",
      issuerType: "platform",
      date: "2023-10-25",
      imageSrc: "/certificates/finance-non-financial.png",
      pdfSrc: "/certificates/finance-non-financial.pdf",
      level: "intermediate",
      category: "finance",
      expiryDate: "2026-10-25",
      description:
        "Comprehensive finance course covering financial statements, budgeting, investment analysis, and financial decision-making for non-finance professionals.",
      credentialId: "COURSERA-FIN-2023-010",
      verificationUrl: "https://coursera.org/verify/COURSERA-FIN-2023-010",
      skills: ["Financial Analysis", "Budgeting", "Investment Analysis", "Financial Planning"],
      duration: "3 months",
    },
    {
      id: "resume-writing-udemy",
      title: "Professional Resume Writing & Career Development",
      issuer: "Udemy",
      issuerType: "platform",
      date: "2023-08-14",
      imageSrc: "/certificates/resume-writing.png",
      pdfSrc: "/certificates/resume-writing.pdf",
      level: "beginner",
      category: "career",
      description:
        "Career development course covering resume optimization, cover letter writing, interview preparation, and personal branding strategies.",
      credentialId: "UDEMY-RW-2023-011",
      skills: ["Resume Writing", "Cover Letters", "Interview Skills", "Personal Branding"],
      duration: "1 month",
    },
    {
      id: "ai-beginners-microsoft",
      title: "AI for Beginners - Complete Course",
      issuer: "Microsoft Learn",
      issuerType: "company",
      date: "2023-07-30",
      imageSrc: "/certificates/ai-for-beginners.png",
      pdfSrc: "/certificates/ai-for-beginners.pdf",
      level: "beginner",
      category: "technology",
      description:
        "Foundational AI course covering machine learning basics, AI ethics, practical applications, and hands-on projects with Microsoft AI tools.",
      credentialId: "MS-AI-2023-012",
      verificationUrl: "https://learn.microsoft.com/verify/MS-AI-2023-012",
      skills: ["AI Fundamentals", "Machine Learning Basics", "AI Ethics", "Microsoft AI Tools"],
      duration: "2 months",
    },
  ]

  // Calculate remaining days for certificates with expiry dates
  useEffect(() => {
    const today = new Date()
    const daysRemaining: Record<string, number> = {}

    certificates.forEach((cert) => {
      if (cert.expiryDate) {
        const expiryDate = new Date(cert.expiryDate)
        const diffTime = expiryDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        daysRemaining[cert.id] = diffDays
      }
    })

    setRemainingDays(daysRemaining)
  }, [])

  // Filter certificates based on active filter
  const filteredCertificates = certificates.filter((cert) => {
    if (activeFilter === "all") return true
    if (activeFilter === "gik") return cert.issuer.includes("GIK Institute")
    if (
      activeFilter === "beginner" ||
      activeFilter === "intermediate" ||
      activeFilter === "advanced" ||
      activeFilter === "expert"
    ) {
      return cert.level === activeFilter
    }
    return cert.category === activeFilter
  })

  // Sort certificates based on active sort
  const sortedCertificates = [...filteredCertificates].sort((a, b) => {
    if (activeSort === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
    if (activeSort === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    }
    if (activeSort === "a-z") {
      return a.title.localeCompare(b.title)
    }
    if (activeSort === "z-a") {
      return b.title.localeCompare(a.title)
    }
    return 0
  })

  // Count certificates by different criteria
  const certCounts = {
    total: certificates.length,
    gik: certificates.filter((cert) => cert.issuer.includes("GIK Institute")).length,
    beginner: certificates.filter((cert) => cert.level === "beginner").length,
    intermediate: certificates.filter((cert) => cert.level === "intermediate").length,
    advanced: certificates.filter((cert) => cert.level === "advanced").length,
    expert: certificates.filter((cert) => cert.level === "expert").length,
  }

  // Scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      }
    }
  }

  // Scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
      if (currentIndex < sortedCertificates.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    }
  }

  // Get level badge color
  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "advanced":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
      case "expert":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
    }
  }

  // Get issuer type icon
  const getIssuerIcon = (issuerType: Certificate["issuerType"]) => {
    switch (issuerType) {
      case "university":
        return <GraduationCap className="h-4 w-4" />
      case "platform":
        return <Award className="h-4 w-4" />
      case "organization":
        return <Award className="h-4 w-4" />
      case "company":
        return <Award className="h-4 w-4" />
      default:
        return <Award className="h-4 w-4" />
    }
  }

  return (
    <section
      id="certificates"
      className="py-20 px-4 md:px-8 bg-gradient-to-br from-background via-muted/30 to-background"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6"
          >
            <Award className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Professional Development</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Professional Certificates
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Continuous learning and professional development through prestigious institutions and platforms. Specialized
            focus on emerging technologies and business excellence.
          </motion.p>
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
            <div className="text-2xl font-bold text-primary mb-1">{certCounts.total}</div>
            <div className="text-sm text-muted-foreground">Total Certificates</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-600 mb-1">{certCounts.gik}</div>
            <div className="text-sm text-muted-foreground">GIK Institute</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20">
            <div className="text-2xl font-bold text-green-600 mb-1">{certCounts.expert}</div>
            <div className="text-sm text-muted-foreground">Expert Level</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-600 mb-1">{certCounts.advanced}</div>
            <div className="text-sm text-muted-foreground">Advanced Level</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20">
            <div className="text-2xl font-bold text-orange-600 mb-1">5+</div>
            <div className="text-sm text-muted-foreground">Years Learning</div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 p-6 bg-card rounded-2xl border shadow-sm"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <Button
                variant={activeFilter === "all" ? "default" : "outline"}
                onClick={() => setActiveFilter("all")}
                size="sm"
              >
                All ({certCounts.total})
              </Button>
              <Button
                variant={activeFilter === "gik" ? "default" : "outline"}
                onClick={() => setActiveFilter("gik")}
                size="sm"
              >
                <GraduationCap className="h-4 w-4 mr-1" />
                GIK Institute ({certCounts.gik})
              </Button>
              <Button
                variant={activeFilter === "expert" ? "default" : "outline"}
                onClick={() => setActiveFilter("expert")}
                size="sm"
              >
                Expert ({certCounts.expert})
              </Button>
              <Button
                variant={activeFilter === "advanced" ? "default" : "outline"}
                onClick={() => setActiveFilter("advanced")}
                size="sm"
              >
                Advanced ({certCounts.advanced})
              </Button>
            </div>

            <div className="flex gap-2">
              <Select value={activeSort} onValueChange={setActiveSort}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="a-z">A-Z</SelectItem>
                  <SelectItem value="z-a">Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Certificate Carousel */}
        <div className="relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollLeft}
              className="rounded-full opacity-80 hover:opacity-100 shadow-lg bg-transparent"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollRight}
              className="rounded-full opacity-80 hover:opacity-100 shadow-lg bg-transparent"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto hide-scrollbar gap-6 py-4 px-12"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {sortedCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 w-[350px]"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-card to-muted/30 group">
                  <CardContent className="p-6">
                    <div
                      className="relative aspect-[4/3] mb-4 overflow-hidden rounded-lg cursor-pointer group"
                      onClick={() => setSelectedCertificate(cert)}
                    >
                      <img
                        src={cert.imageSrc || "/placeholder.svg"}
                        alt={cert.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className={`${getLevelColor(cert.level)} shadow-sm`}>
                          {cert.level.charAt(0).toUpperCase() + cert.level.slice(1)}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                          {getIssuerIcon(cert.issuerType)}
                          <span className="ml-1 capitalize">{cert.issuerType}</span>
                        </Badge>
                      </div>
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Button variant="secondary" size="sm" className="shadow-lg">
                          <Eye className="h-4 w-4 mr-1" /> View Details
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {cert.title}
                      </h3>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {getIssuerIcon(cert.issuerType)}
                        <span className="font-medium">{cert.issuer}</span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(cert.date).toLocaleDateString()}
                        </div>
                        {cert.duration && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {cert.duration}
                          </div>
                        )}
                      </div>

                      {cert.location && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {cert.location}
                        </div>
                      )}

                      {cert.expiryDate && remainingDays[cert.id] !== undefined && (
                        <div className="flex items-center text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {remainingDays[cert.id] > 0 ? (
                            <span className="text-green-600">Valid for {remainingDays[cert.id]} days</span>
                          ) : (
                            <span className="text-red-500">Expired</span>
                          )}
                        </div>
                      )}

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {cert.skills.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{cert.skills.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <div className="flex gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a
                                  href={cert.pdfSrc}
                                  download={`${cert.title}.pdf`}
                                  className="inline-flex items-center text-xs text-primary hover:underline"
                                >
                                  <Download className="h-3 w-3 mr-1" />
                                  Download
                                </a>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Download certificate as PDF</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          {cert.verificationUrl && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <a
                                    href={cert.verificationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-xs text-primary hover:underline"
                                  >
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    Verify
                                  </a>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Verify certificate authenticity</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => setSelectedCertificate(cert)}
                                className="inline-flex items-center text-xs text-primary hover:underline"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Details
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View certificate details</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certificate Counter Display */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Showing {sortedCertificates.length} of {certificates.length} certificates
        </div>
      </motion.div>

      {/* Certificate Detail Modal */}
      <Dialog open={!!selectedCertificate} onOpenChange={(open) => !open && setSelectedCertificate(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          {selectedCertificate && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-3">
                  {getIssuerIcon(selectedCertificate.issuerType)}
                  {selectedCertificate.title}
                </DialogTitle>
                <DialogDescription className="text-base">
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Issued by:</span>
                      {selectedCertificate.issuer}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(selectedCertificate.date).toLocaleDateString()}
                      </div>
                      {selectedCertificate.duration && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {selectedCertificate.duration}
                        </div>
                      )}
                      {selectedCertificate.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {selectedCertificate.location}
                        </div>
                      )}
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="relative aspect-video overflow-hidden rounded-lg border">
                  <img
                    src={selectedCertificate.imageSrc || "/placeholder.svg"}
                    alt={selectedCertificate.title}
                    className="object-contain w-full h-full bg-muted"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge className={`${getLevelColor(selectedCertificate.level)}`}>
                        {selectedCertificate.level.charAt(0).toUpperCase() + selectedCertificate.level.slice(1)} Level
                      </Badge>
                      <Badge variant="outline">
                        {selectedCertificate.category.charAt(0).toUpperCase() + selectedCertificate.category.slice(1)}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {getIssuerIcon(selectedCertificate.issuerType)}
                        <span className="ml-1">{selectedCertificate.issuerType}</span>
                      </Badge>
                    </div>

                    {selectedCertificate.expiryDate && remainingDays[selectedCertificate.id] !== undefined && (
                      <Badge variant={remainingDays[selectedCertificate.id] > 0 ? "outline" : "destructive"}>
                        {remainingDays[selectedCertificate.id] > 0
                          ? `Valid for ${remainingDays[selectedCertificate.id]} days`
                          : "Expired"}
                      </Badge>
                    )}

                    {selectedCertificate.credentialId && (
                      <div className="text-sm">
                        <span className="font-medium">Credential ID:</span>
                        <code className="ml-2 bg-muted px-2 py-1 rounded text-xs">
                          {selectedCertificate.credentialId}
                        </code>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Skills Acquired</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCertificate.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-muted-foreground">
                  <h4 className="font-medium text-foreground mb-2">Description</h4>
                  <p className="leading-relaxed">{selectedCertificate.description || "No description available."}</p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t">
                  <Button variant="outline" asChild>
                    <a href={selectedCertificate.pdfSrc} download={`${selectedCertificate.title}.pdf`}>
                      <Download className="h-4 w-4 mr-2" /> Download Certificate
                    </a>
                  </Button>

                  {selectedCertificate.verificationUrl && (
                    <Button variant="outline" asChild>
                      <a href={selectedCertificate.verificationUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" /> Verify Authenticity
                      </a>
                    </Button>
                  )}

                  <Button variant="outline" asChild>
                    <a href={selectedCertificate.imageSrc} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" /> Open Full Size
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
