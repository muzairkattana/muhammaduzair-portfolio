"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  ExternalLink,
  ThumbsUp,
  Calendar,
  Award,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSound } from "./sound-provider"
import ClientReviewForm from "./client-review-form"
import { toast } from "@/components/ui/use-toast"

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
}

export default function TestimonialsSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })
  const [activeIndex, setActiveIndex] = useState(0)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [activeTab, setActiveTab] = useState("featured")
  const { playSound } = useSound()
  const [clientSubmittedTestimonials, setClientSubmittedTestimonials] = useState<Testimonial[]>([
    {
      id: "4",
      name: "Michael Brown",
      position: "Founder",
      company: "DigitalSolutions",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "Muhammad helped us build our company website from scratch. His attention to detail and responsive design skills made our site look professional on all devices. Highly recommended!",
      date: "January 10, 2025",
      projectLink: "https://example.com/digitalsolutions",
      projectImage: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "5",
      name: "Jessica Lee",
      position: "Product Manager",
      company: "InnovateTech",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4,
      text: "We hired Muhammad to develop a custom dashboard for our product. He delivered on time and was very responsive to our feedback throughout the process.",
      date: "December 5, 2024",
    },
  ])

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      position: "Marketing Director",
      company: "TechCorp",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "Muhammad Uzair delivered an exceptional e-commerce solution that exceeded our expectations. His expertise in both front-end and back-end development resulted in a seamless user experience that has significantly increased our conversion rates.",
      date: "December 15, 2024",
      verified: true,
    },
    {
      id: "2",
      name: "David Chen",
      position: "CTO",
      company: "StartupX",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "Working with Muhammad was a pleasure. His deep understanding of AI technologies and web development helped us create an innovative product that has given us a competitive edge in the market.",
      date: "November 3, 2024",
      verified: true,
      projectLink: "https://example.com/project",
      projectImage: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      position: "E-commerce Manager",
      company: "RetailPlus",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4,
      text: "Muhammad's expertise in Amazon FBA was invaluable to our business. He optimized our listings and inventory management processes, resulting in a 40% increase in sales within just three months.",
      date: "October 22, 2024",
    },
  ]

  const nextTestimonial = () => {
    const testimonialsList = activeTab === "featured" ? testimonials : clientSubmittedTestimonials
    setActiveIndex((prev) => (prev + 1) % testimonialsList.length)
    playSound("click")
  }

  const prevTestimonial = () => {
    const testimonialsList = activeTab === "featured" ? testimonials : clientSubmittedTestimonials
    setActiveIndex((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length)
    playSound("click")
  }

  const handleReviewSubmit = (review: any) => {
    // Create a new testimonial from the submitted review
    const newTestimonial: Testimonial = {
      id: `client-${Date.now()}`, // Generate a unique ID
      name: review.name,
      position: review.position || "Client",
      company: review.company || "",
      avatar: review.image ? URL.createObjectURL(review.image) : "/placeholder.svg?height=100&width=100",
      rating: review.rating,
      text: review.text,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      projectLink: review.projectLink,
    }

    // Add the new testimonial to the client-submitted list
    // In a real app, this would be sent to a server
    setClientSubmittedTestimonials([...clientSubmittedTestimonials, newTestimonial])

    // Update the state to show the new testimonial
    setActiveTab("client")
    setActiveIndex(clientSubmittedTestimonials.length - 1)

    // Close the form
    setShowReviewForm(false)

    // Show success message
    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback. Your review has been added.",
    })

    // Play success sound
    playSound("success")
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setActiveIndex(0)
    playSound("click")
  }

  return (
    <section id="testimonials" className="py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={controls} className="space-y-12">
          <motion.div variants={itemVariants} className="text-center">
            <Badge variant="outline" className="text-primary border-primary/30 px-3 py-1 mb-4">
              Client Feedback
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Clients Say</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Hear directly from clients about their experiences working with me on various projects
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-auto">
              <TabsList className="grid grid-cols-2 w-[300px]">
                <TabsTrigger value="featured" className="flex items-center gap-1">
                  <Award className="h-4 w-4" /> Featured Testimonials
                </TabsTrigger>
                <TabsTrigger value="client" className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" /> Client Reviews
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                {showReviewForm ? (
                  <motion.div
                    key="review-form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-2xl mx-auto mt-8"
                  >
                    <ClientReviewForm onSubmit={handleReviewSubmit} onCancel={() => setShowReviewForm(false)} />
                  </motion.div>
                ) : (
                  <>
                    <TabsContent value="featured" className="mt-6">
                      {/* Desktop View */}
                      <div className="hidden md:grid md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial) => (
                          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                        ))}
                      </div>

                      {/* Mobile Carousel */}
                      <div className="md:hidden">
                        <Card className="overflow-hidden">
                          <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-4">
                              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                <Image
                                  src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                                  alt={testimonials[activeIndex].name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-medium">{testimonials[activeIndex].name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {testimonials[activeIndex].position}, {testimonials[activeIndex].company}
                                </p>
                              </div>
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < testimonials[activeIndex].rating
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="relative">
                              <Quote className="absolute -top-2 -left-2 h-6 w-6 text-primary/20" />
                              <p className="text-sm pt-4 px-4">{testimonials[activeIndex].text}</p>
                            </div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{testimonials[activeIndex].date}</span>
                              </div>
                              {testimonials[activeIndex].verified && (
                                <Badge variant="outline" className="text-green-500 border-green-200 text-xs">
                                  <Check className="h-3 w-3 mr-1" /> Verified
                                </Badge>
                              )}
                            </div>

                            {testimonials[activeIndex].projectImage && (
                              <div className="mt-2 pt-2 border-t">
                                <p className="text-xs text-muted-foreground mb-2">Project Preview:</p>
                                <div className="relative h-32 rounded-md overflow-hidden">
                                  <Image
                                    src={testimonials[activeIndex].projectImage || "/placeholder.svg"}
                                    alt="Project preview"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>

                        <div className="flex justify-center mt-4 gap-2">
                          <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full">
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <div className="flex items-center gap-1">
                            {testimonials.map((_, index) => (
                              <div
                                key={index}
                                className={`h-2 w-2 rounded-full ${index === activeIndex ? "bg-primary" : "bg-primary/20"}`}
                                onClick={() => {
                                  setActiveIndex(index)
                                  playSound("click")
                                }}
                              />
                            ))}
                          </div>
                          <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="client" className="mt-6">
                      {clientSubmittedTestimonials.length > 0 ? (
                        <>
                          {/* Desktop View */}
                          <div className="hidden md:grid md:grid-cols-3 gap-6">
                            {clientSubmittedTestimonials.map((testimonial) => (
                              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                            ))}
                          </div>

                          {/* Mobile Carousel */}
                          <div className="md:hidden">
                            <Card className="overflow-hidden">
                              <CardContent className="p-6 space-y-4">
                                <div className="flex items-center gap-4">
                                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                    <Image
                                      src={clientSubmittedTestimonials[activeIndex].avatar || "/placeholder.svg"}
                                      alt={clientSubmittedTestimonials[activeIndex].name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div>
                                    <h3 className="font-medium">{clientSubmittedTestimonials[activeIndex].name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                      {clientSubmittedTestimonials[activeIndex].position},{" "}
                                      {clientSubmittedTestimonials[activeIndex].company}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < clientSubmittedTestimonials[activeIndex].rating
                                          ? "text-yellow-400 fill-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <div className="relative">
                                  <Quote className="absolute -top-2 -left-2 h-6 w-6 text-primary/20" />
                                  <p className="text-sm pt-4 px-4">{clientSubmittedTestimonials[activeIndex].text}</p>
                                </div>
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{clientSubmittedTestimonials[activeIndex].date}</span>
                                  </div>
                                </div>

                                {clientSubmittedTestimonials[activeIndex].projectImage && (
                                  <div className="mt-2 pt-2 border-t">
                                    <p className="text-xs text-muted-foreground mb-2">Project Preview:</p>
                                    <div className="relative h-32 rounded-md overflow-hidden">
                                      <Image
                                        src={
                                          clientSubmittedTestimonials[activeIndex].projectImage || "/placeholder.svg"
                                        }
                                        alt="Project preview"
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </Card>

                            <div className="flex justify-center mt-4 gap-2">
                              <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full">
                                <ChevronLeft className="h-4 w-4" />
                              </Button>
                              <div className="flex items-center gap-1">
                                {clientSubmittedTestimonials.map((_, index) => (
                                  <div
                                    key={index}
                                    className={`h-2 w-2 rounded-full ${index === activeIndex ? "bg-primary" : "bg-primary/20"}`}
                                    onClick={() => {
                                      setActiveIndex(index)
                                      playSound("click")
                                    }}
                                  />
                                ))}
                              </div>
                              <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-muted-foreground mb-4">
                            No client reviews yet. Be the first to leave a review!
                          </p>
                        </div>
                      )}
                    </TabsContent>
                  </>
                )}
              </AnimatePresence>
            </Tabs>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 text-center">
            <Button
              className="gap-2"
              onClick={() => {
                setShowReviewForm(!showReviewForm)
                playSound("click")
              }}
            >
              <MessageSquare className="h-4 w-4" />
              {showReviewForm ? "Cancel" : "Leave a Review"}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Separate component for testimonial cards
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { playSound } = useSound()

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={testimonial.avatar || "/placeholder.svg"}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium">{testimonial.name}</h3>
            <p className="text-sm text-muted-foreground">
              {testimonial.position}, {testimonial.company}
            </p>
          </div>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            />
          ))}
        </div>
        <div className="relative flex-1">
          <Quote className="absolute -top-2 -left-2 h-6 w-6 text-primary/20" />
          <p className="text-sm pt-4 px-4">{testimonial.text}</p>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{testimonial.date}</span>
          </div>
          {testimonial.verified && (
            <Badge variant="outline" className="text-green-500 border-green-200 text-xs">
              <Check className="h-3 w-3 mr-1" /> Verified
            </Badge>
          )}
        </div>

        {testimonial.projectLink && (
          <div className="pt-2 mt-2 border-t">
            <a
              href={testimonial.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs flex items-center gap-1 text-primary hover:underline"
              onClick={() => playSound("click")}
            >
              <ExternalLink className="h-3 w-3" /> View Project
            </a>
          </div>
        )}

        {testimonial.projectImage && (
          <div className="mt-2 pt-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Project Preview:</p>
            <div className="relative h-32 rounded-md overflow-hidden">
              <Image
                src={testimonial.projectImage || "/placeholder.svg"}
                alt="Project preview"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
