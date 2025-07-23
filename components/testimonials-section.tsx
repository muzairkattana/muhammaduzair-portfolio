"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause, ExternalLink, Check, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useSound } from "./sound-provider"
import { ClickableText } from "@/components/clickable-text"

interface Testimonial {
  id: string
  name: string
  position: string
  company: string
  avatar: string
  rating: number
  text: string
  date: string
  verified?: boolean
  projectLink?: string
  projectImage?: string
  projectType?: string
  resultMetrics?: {
    metric: string
    value: string
    improvement: string
  }[]
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    position: "CTO",
    company: "TechCorp Solutions",
    avatar: "/placeholder.svg?height=80&width=80&text=SJ",
    rating: 5,
    text: "Muhammad delivered an exceptional e-commerce platform that exceeded our expectations. The attention to detail and performance optimization was outstanding. Our conversion rate increased by 40% within the first month.",
    date: "December 2023",
    verified: true,
    projectType: "E-commerce Platform",
    projectLink: "https://techcorp-demo.com",
    projectImage: "/placeholder.svg?height=200&width=300&text=E-commerce+Platform",
    resultMetrics: [
      { metric: "Conversion Rate", value: "40%", improvement: "increase" },
      { metric: "Page Load Speed", value: "60%", improvement: "faster" },
      { metric: "User Engagement", value: "85%", improvement: "higher" },
    ],
  },
  {
    id: "2",
    name: "Michael Chen",
    position: "Product Manager",
    company: "InnovateLab",
    avatar: "/placeholder.svg?height=80&width=80&text=MC",
    rating: 5,
    text: "Working with Muhammad was a game-changer for our AI project. His expertise in integrating complex AI models with user-friendly interfaces is remarkable. The project was delivered on time and within budget.",
    date: "November 2023",
    verified: true,
    projectType: "AI Integration",
    projectLink: "https://innovatelab-ai.com",
    projectImage: "/placeholder.svg?height=200&width=300&text=AI+Dashboard",
    resultMetrics: [
      { metric: "Processing Speed", value: "70%", improvement: "faster" },
      { metric: "Accuracy", value: "95%", improvement: "achieved" },
      { metric: "User Satisfaction", value: "4.8/5", improvement: "rating" },
    ],
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    position: "Marketing Director",
    company: "GrowthCo",
    avatar: "/placeholder.svg?height=80&width=80&text=ER",
    rating: 5,
    text: "Muhammad's work on our marketing dashboard transformed how we analyze data. The intuitive design and powerful analytics features have made our team 50% more efficient in campaign management.",
    date: "October 2023",
    verified: true,
    projectType: "Analytics Dashboard",
    projectLink: "https://growthco-analytics.com",
    projectImage: "/placeholder.svg?height=200&width=300&text=Analytics+Dashboard",
    resultMetrics: [
      { metric: "Team Efficiency", value: "50%", improvement: "increase" },
      { metric: "Data Processing", value: "3x", improvement: "faster" },
      { metric: "Report Generation", value: "80%", improvement: "automated" },
    ],
  },
  {
    id: "4",
    name: "David Kim",
    position: "Founder",
    company: "StartupXYZ",
    avatar: "/placeholder.svg?height=80&width=80&text=DK",
    rating: 5,
    text: "As a startup, we needed someone who could wear multiple hats. Muhammad not only built our MVP but also provided valuable insights on user experience and scalability. Highly recommended!",
    date: "September 2023",
    verified: true,
    projectType: "MVP Development",
    projectLink: "https://startupxyz.com",
    projectImage: "/placeholder.svg?height=200&width=300&text=Startup+MVP",
    resultMetrics: [
      { metric: "Time to Market", value: "30%", improvement: "faster" },
      { metric: "Development Cost", value: "25%", improvement: "savings" },
      { metric: "User Adoption", value: "200%", improvement: "above target" },
    ],
  },
  {
    id: "5",
    name: "Lisa Thompson",
    position: "Operations Manager",
    company: "RetailPro",
    avatar: "/placeholder.svg?height=80&width=80&text=LT",
    rating: 5,
    text: "The inventory management system Muhammad built for us has revolutionized our operations. Real-time tracking and automated alerts have reduced our inventory costs by 35%.",
    date: "August 2023",
    verified: true,
    projectType: "Inventory System",
    projectLink: "https://retailpro-inventory.com",
    projectImage: "/placeholder.svg?height=200&width=300&text=Inventory+System",
    resultMetrics: [
      { metric: "Inventory Costs", value: "35%", improvement: "reduction" },
      { metric: "Stock Accuracy", value: "99%", improvement: "achieved" },
      { metric: "Order Processing", value: "60%", improvement: "faster" },
    ],
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const { playSound } = useSound()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    playSound("click")
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    playSound("click")
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
    playSound("click")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-br from-background via-background to-muted/10 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-secondary/5 to-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <ClickableText
              as="h2"
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            >
              What Clients Say
            </ClickableText>
            <ClickableText as="p" className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Trusted by industry leaders and innovative startups worldwide. Here's what they say about working with me.
            </ClickableText>
          </motion.div>

          {/* Stats Overview */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-4 rounded-lg bg-card border border-border/50">
              <div className="text-2xl font-bold text-primary mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-card border border-border/50">
              <div className="text-2xl font-bold text-primary mb-1">4.9/5</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-card border border-border/50">
              <div className="text-2xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Project Success</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-card border border-border/50">
              <div className="text-2xl font-bold text-primary mb-1">95%</div>
              <div className="text-sm text-muted-foreground">Client Retention</div>
            </div>
          </motion.div>

          {/* Main Testimonial Display */}
          <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
            <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-card to-card/50">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Left Side - Testimonial Content */}
                  <div className="p-8 md:p-12 space-y-6">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {currentTestimonial.projectType}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={prevTestimonial} className="h-8 w-8 rounded-full">
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={toggleAutoPlay} className="h-8 w-8 rounded-full">
                          {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={nextTestimonial} className="h-8 w-8 rounded-full">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="relative">
                      <Quote className="absolute -top-4 -left-2 h-12 w-12 text-primary/20" />
                      <blockquote className="text-lg md:text-xl leading-relaxed pl-8">
                        "{currentTestimonial.text}"
                      </blockquote>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
                        <Image
                          src={currentTestimonial.avatar || "/placeholder.svg"}
                          alt={currentTestimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-lg">{currentTestimonial.name}</h4>
                          {currentTestimonial.verified && (
                            <Badge variant="outline" className="text-green-600 border-green-200 text-xs">
                              <Check className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground">
                          {currentTestimonial.position} at {currentTestimonial.company}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < currentTestimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{currentTestimonial.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Project Results */}
                    {currentTestimonial.resultMetrics && (
                      <div className="space-y-3 pt-4 border-t border-border/50">
                        <h5 className="font-medium text-sm flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          Project Results
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {currentTestimonial.resultMetrics.map((metric, index) => (
                            <div key={index} className="text-center p-3 bg-muted/30 rounded-lg">
                              <div className="text-lg font-bold text-primary">{metric.value}</div>
                              <div className="text-xs text-muted-foreground">{metric.metric}</div>
                              <div className="text-xs text-green-600">{metric.improvement}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentTestimonial.projectLink && (
                      <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                        <a href={currentTestimonial.projectLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Project
                        </a>
                      </Button>
                    )}
                  </div>

                  {/* Right Side - Project Preview */}
                  <div className="relative bg-gradient-to-br from-muted/30 to-muted/10 p-8 md:p-12 flex items-center justify-center">
                    {currentTestimonial.projectImage && (
                      <div className="relative w-full max-w-sm aspect-[4/3] rounded-lg overflow-hidden shadow-xl border border-border/50">
                        <Image
                          src={currentTestimonial.projectImage || "/placeholder.svg"}
                          alt="Project preview"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Testimonial Navigation Dots */}
          <motion.div variants={itemVariants} className="flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  playSound("click")
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary scale-125"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </motion.div>

          {/* All Testimonials Grid */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">All Client Reviews</h3>
              <p className="text-muted-foreground">Browse through all testimonials from satisfied clients</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    onClick={() => setSelectedTestimonial(testimonial)}
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground truncate">
                            {testimonial.position}, {testimonial.company}
                          </p>
                        </div>
                        {testimonial.verified && (
                          <Badge variant="outline" className="text-green-600 border-green-200 text-xs">
                            <Check className="h-3 w-3" />
                          </Badge>
                        )}
                      </div>

                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-sm line-clamp-3 group-hover:text-primary/80 transition-colors">
                        "{testimonial.text}"
                      </p>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{testimonial.projectType}</span>
                        <span>{testimonial.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center space-y-6 pt-12">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Ready to Join These Success Stories?</h3>
              <p className="text-muted-foreground mb-6">
                Let's discuss how I can help transform your ideas into exceptional digital experiences that drive real
                results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="#contact">Start Your Project</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#portfolio">View My Work</a>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
