"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Download, Eye, Filter, Clock, ExternalLink } from "lucide-react"
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
  date: string
  imageSrc: string
  pdfSrc: string
  level: "beginner" | "intermediate" | "advanced" | "expert"
  category: string
  expiryDate?: string
  description?: string
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
      id: "business-acumen",
      title: "Business Acumen",
      issuer: "LinkedIn Learning",
      date: "2023-05-15",
      imageSrc: "/certificates/business-acumen.png",
      pdfSrc: "/certificates/business-acumen.pdf",
      level: "advanced",
      category: "business",
      expiryDate: "2025-05-15",
      description:
        "This certification demonstrates proficiency in understanding business operations, financial metrics, and strategic decision-making. It covers topics such as financial statements, market analysis, and business strategy.",
    },
    {
      id: "supercomputing-ai",
      title: "Supercomputing & AI",
      issuer: "Coursera",
      date: "2023-04-10",
      imageSrc: "/certificates/supercomputing-ai.png",
      pdfSrc: "/certificates/supercomputing-ai.pdf",
      level: "expert",
      category: "technology",
      expiryDate: "2025-04-10",
      description:
        "This expert-level certification covers advanced topics in high-performance computing and artificial intelligence, including parallel processing, GPU acceleration, and implementing AI algorithms at scale.",
    },
    {
      id: "storytelling-investment",
      title: "Storytelling for Investment",
      issuer: "Udemy",
      date: "2023-03-22",
      imageSrc: "/certificates/storytelling-investment.png",
      pdfSrc: "/certificates/storytelling-investment.pdf",
      level: "intermediate",
      category: "business",
      expiryDate: "2025-03-22",
      description:
        "This certification focuses on crafting compelling narratives for investment pitches, business presentations, and stakeholder communications. It covers storytelling techniques, presentation skills, and persuasive communication.",
    },
    {
      id: "agile-business-process",
      title: "Agile Business Process",
      issuer: "Coursera",
      date: "2023-02-18",
      imageSrc: "/certificates/agile-business-process.png",
      pdfSrc: "/certificates/agile-business-process.pdf",
      level: "advanced",
      category: "business",
      expiryDate: "2025-02-18",
      description:
        "This certification covers agile methodologies applied to business processes, including Scrum, Kanban, and Lean principles. It focuses on improving efficiency, adaptability, and continuous improvement in business operations.",
    },
    {
      id: "business-plan",
      title: "Business Plan Development",
      issuer: "edX",
      date: "2023-01-05",
      imageSrc: "/certificates/business-plan.png",
      pdfSrc: "/certificates/business-plan.pdf",
      level: "intermediate",
      category: "business",
      expiryDate: "2025-01-05",
      description:
        "This certification demonstrates expertise in creating comprehensive business plans, including market analysis, financial projections, operational strategies, and risk assessment. It covers all aspects of planning for business success.",
    },
    {
      id: "finance-non-financial",
      title: "Finance for Non-Financial Professionals",
      issuer: "LinkedIn Learning",
      date: "2022-12-10",
      imageSrc: "/certificates/finance-non-financial.png",
      pdfSrc: "/certificates/finance-non-financial.pdf",
      level: "beginner",
      category: "finance",
      expiryDate: "2024-12-10",
      description:
        "This certification provides a foundation in financial concepts for professionals without a finance background. It covers financial statements, budgeting, investment analysis, and financial decision-making.",
    },
    {
      id: "influencing-motivating",
      title: "Influencing & Motivating Teams",
      issuer: "Udemy",
      date: "2022-11-15",
      imageSrc: "/certificates/influencing-motivating.png",
      pdfSrc: "/certificates/influencing-motivating.pdf",
      level: "advanced",
      category: "leadership",
      expiryDate: "2024-11-15",
      description:
        "This advanced certification focuses on leadership skills for influencing and motivating teams. It covers communication strategies, emotional intelligence, conflict resolution, and creating a positive team culture.",
    },
    {
      id: "problem-solving",
      title: "Problem Solving and Decision Making",
      issuer: "Coursera",
      date: "2022-10-20",
      imageSrc: "/certificates/problem-solving.png",
      pdfSrc: "/certificates/problem-solving.pdf",
      level: "intermediate",
      category: "leadership",
      expiryDate: "2024-10-20",
      description:
        "This certification demonstrates proficiency in analytical thinking, creative problem-solving, and effective decision-making. It covers frameworks for analyzing complex problems and implementing solutions.",
    },
    {
      id: "data-science-analytics",
      title: "Data Science & Analytics",
      issuer: "DataCamp",
      date: "2022-09-05",
      imageSrc: "/certificates/data-science-analytics.png",
      pdfSrc: "/certificates/data-science-analytics.pdf",
      level: "expert",
      category: "technology",
      expiryDate: "2024-09-05",
      description:
        "This expert-level certification covers advanced topics in data science including statistical analysis, machine learning, data visualization, and predictive modeling. It demonstrates proficiency in using data to drive business decisions.",
    },
    {
      id: "ai-for-beginners",
      title: "AI for Beginners",
      issuer: "Microsoft",
      date: "2022-08-12",
      imageSrc: "/certificates/ai-for-beginners.png",
      pdfSrc: "/certificates/ai-for-beginners.pdf",
      level: "beginner",
      category: "technology",
      expiryDate: "2024-08-12",
      description:
        "This certification provides a foundation in artificial intelligence concepts, including machine learning, neural networks, and AI applications. It's designed for those new to the field of AI.",
    },
    {
      id: "resume-writing",
      title: "Professional Resume Writing",
      issuer: "Udemy",
      date: "2022-07-18",
      imageSrc: "/certificates/resume-writing.png",
      pdfSrc: "/certificates/resume-writing.pdf",
      level: "beginner",
      category: "career",
      expiryDate: "2024-07-18",
      description:
        "This certification covers techniques for creating effective resumes and cover letters. It includes strategies for highlighting skills, achievements, and experience to stand out to potential employers.",
    },
    {
      id: "cybersecurity-awareness",
      title: "Cybersecurity Awareness",
      issuer: "Coursera",
      date: "2022-06-25",
      imageSrc: "/certificates/cybersecurity-awareness.png",
      pdfSrc: "/certificates/cybersecurity-awareness.pdf",
      level: "intermediate",
      category: "technology",
      expiryDate: "2024-06-25",
      description:
        "This certification demonstrates knowledge of cybersecurity principles, common threats, and best practices for protecting digital assets. It covers topics such as password security, phishing prevention, and data protection.",
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

  // Count certificates by level
  const certCounts = {
    total: certificates.length,
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

  return (
    <section id="certificates" className="py-16 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Professional Certificates</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Continuous learning and professional development are key to staying relevant in today's fast-paced
            technological landscape.
          </p>
        </div>

        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Certificate Counter */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-sm py-1 px-3">
              Total: {certCounts.total}
            </Badge>
            <Badge
              variant="outline"
              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-sm py-1 px-3"
            >
              Beginner: {certCounts.beginner}
            </Badge>
            <Badge
              variant="outline"
              className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-sm py-1 px-3"
            >
              Intermediate: {certCounts.intermediate}
            </Badge>
            <Badge
              variant="outline"
              className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 text-sm py-1 px-3"
            >
              Advanced: {certCounts.advanced}
            </Badge>
            <Badge
              variant="outline"
              className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 text-sm py-1 px-3"
            >
              Expert: {certCounts.expert}
            </Badge>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Filter by Level</label>
                <Select value={activeFilter} onValueChange={setActiveFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Filter by Category</label>
                <Select value={activeFilter} onValueChange={setActiveFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="leadership">Leadership</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="career">Career</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Sort By</label>
                <Select value={activeSort} onValueChange={setActiveSort}>
                  <SelectTrigger>
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
          </div>
        )}

        {/* Certificate Carousel */}
        <div className="relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollLeft}
              className="rounded-full opacity-80 hover:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollRight}
              className="rounded-full opacity-80 hover:opacity-100"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto hide-scrollbar gap-4 py-4 px-10"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {sortedCertificates.map((cert, index) => (
              <div key={cert.id} className="flex-shrink-0 w-[300px]">
                <Card className="h-full">
                  <CardContent className="p-4">
                    <div
                      className="relative aspect-[4/3] mb-4 overflow-hidden rounded-md cursor-pointer"
                      onClick={() => setSelectedCertificate(cert)}
                    >
                      <img
                        src={cert.imageSrc || "/placeholder.svg"}
                        alt={cert.title}
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className={`${getLevelColor(cert.level)}`}>
                          {cert.level.charAt(0).toUpperCase() + cert.level.slice(1)}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-all">
                        <Button variant="secondary" size="sm">
                          <Eye className="h-4 w-4 mr-1" /> View Details
                        </Button>
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {cert.issuer} • {new Date(cert.date).toLocaleDateString()}
                    </p>

                    {cert.expiryDate && remainingDays[cert.id] !== undefined && (
                      <div className="flex items-center text-xs text-muted-foreground mb-3">
                        <Clock className="h-3 w-3 mr-1" />
                        {remainingDays[cert.id] > 0 ? (
                          <span>Expires in {remainingDays[cert.id]} days</span>
                        ) : (
                          <span className="text-red-500">Expired</span>
                        )}
                      </div>
                    )}

                    <div className="flex justify-between mt-2">
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

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => setSelectedCertificate(cert)}
                              className="inline-flex items-center text-xs text-primary hover:underline"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View certificate details</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Counter Display */}
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Showing certificate {currentIndex + 1} of {sortedCertificates.length}
        </div>
      </motion.div>

      {/* Certificate Detail Modal */}
      <Dialog open={!!selectedCertificate} onOpenChange={(open) => !open && setSelectedCertificate(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
          {selectedCertificate && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedCertificate.title}</DialogTitle>
                <DialogDescription>
                  Issued by {selectedCertificate.issuer} on {new Date(selectedCertificate.date).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="relative aspect-video overflow-hidden rounded-lg border">
                  <img
                    src={selectedCertificate.imageSrc || "/placeholder.svg"}
                    alt={selectedCertificate.title}
                    className="object-contain w-full h-full"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={`${getLevelColor(selectedCertificate.level)}`}>
                    {selectedCertificate.level.charAt(0).toUpperCase() + selectedCertificate.level.slice(1)} Level
                  </Badge>
                  <Badge variant="outline">
                    {selectedCertificate.category.charAt(0).toUpperCase() + selectedCertificate.category.slice(1)}
                  </Badge>

                  {selectedCertificate.expiryDate && remainingDays[selectedCertificate.id] !== undefined && (
                    <Badge variant={remainingDays[selectedCertificate.id] > 0 ? "outline" : "destructive"}>
                      {remainingDays[selectedCertificate.id] > 0
                        ? `Expires in ${remainingDays[selectedCertificate.id]} days`
                        : "Expired"}
                    </Badge>
                  )}
                </div>

                <div className="text-muted-foreground">
                  <h4 className="font-medium text-foreground mb-2">Description</h4>
                  <p>{selectedCertificate.description || "No description available."}</p>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" asChild>
                    <a href={selectedCertificate.pdfSrc} download={`${selectedCertificate.title}.pdf`}>
                      <Download className="h-4 w-4 mr-2" /> Download Certificate
                    </a>
                  </Button>

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
