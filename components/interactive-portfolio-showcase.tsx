"use client"

import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Share2,
  Eye,
  ExternalLink,
  Github,
  Globe,
  Layers,
  Zap,
  Sparkles,
  Monitor,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Star,
  Award,
  TrendingUp,
  Users,
  Clock,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useSound } from "./sound-provider"

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  category: "web" | "mobile" | "ai" | "ecommerce" | "design"
  technologies: string[]
  features: string[]
  metrics: {
    performance: number
    accessibility: number
    seo: number
    bestPractices: number
  }
  timeline: string
  status: "completed" | "in-progress" | "planning"
  images: string[]
  videoUrl?: string
  liveUrl?: string
  githubUrl?: string
  caseStudyUrl?: string
  testimonial?: {
    text: string
    author: string
    role: string
    company: string
  }
}

const projects: Project[] = [
  {
    id: "ai-3d-generator",
    title: "AI-Powered 3D Model Generator",
    description: "Revolutionary AI system that generates high-quality 3D models from text descriptions",
    longDescription:
      "A cutting-edge application that leverages advanced AI algorithms to create stunning 3D models from simple text prompts. Features real-time generation, customizable parameters, and export capabilities.",
    category: "ai",
    technologies: ["Next.js", "Three.js", "TensorFlow", "WebGL", "Python", "FastAPI"],
    features: [
      "Text-to-3D model generation",
      "Real-time preview and editing",
      "Multiple export formats",
      "Advanced material system",
      "Collaborative workspace",
    ],
    metrics: {
      performance: 95,
      accessibility: 92,
      seo: 88,
      bestPractices: 96,
    },
    timeline: "6 months",
    status: "completed",
    images: ["/images/3d-generator-1.jpg", "/images/3d-generator-2.jpg", "/images/3d-generator-3.jpg"],
    videoUrl: "/videos/3d-generator-demo.mp4",
    liveUrl: "https://3d-generator.uzair.dev",
    githubUrl: "https://github.com/muzairkattana/ai-3d-generator",
    testimonial: {
      text: "This tool revolutionized our 3D workflow. What used to take days now takes minutes!",
      author: "Sarah Johnson",
      role: "3D Artist",
      company: "Creative Studios Inc.",
    },
  },
  {
    id: "ecommerce-platform",
    title: "Next-Gen E-commerce Platform",
    description: "Modern, scalable e-commerce solution with AI-powered recommendations",
    longDescription:
      "A comprehensive e-commerce platform built with modern technologies, featuring AI-powered product recommendations, real-time inventory management, and seamless payment integration.",
    category: "ecommerce",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Redis", "AWS", "Tailwind CSS"],
    features: [
      "AI product recommendations",
      "Real-time inventory tracking",
      "Multi-payment gateway support",
      "Advanced analytics dashboard",
      "Mobile-first design",
    ],
    metrics: {
      performance: 98,
      accessibility: 94,
      seo: 96,
      bestPractices: 97,
    },
    timeline: "4 months",
    status: "completed",
    images: ["/images/ecommerce-1.jpg", "/images/ecommerce-2.jpg", "/images/ecommerce-3.jpg"],
    liveUrl: "https://shop.uzair.dev",
    githubUrl: "https://github.com/muzairkattana/ecommerce-platform",
    testimonial: {
      text: "Our sales increased by 40% after implementing this platform. The AI recommendations are game-changing!",
      author: "Michael Chen",
      role: "CEO",
      company: "TechMart Solutions",
    },
  },
  {
    id: "portfolio-website",
    title: "Interactive Portfolio Website",
    description: "Award-winning portfolio with advanced animations and AI assistant",
    longDescription:
      "A stunning portfolio website featuring cutting-edge animations, an AI-powered assistant, and innovative user interactions. Built with performance and accessibility in mind.",
    category: "web",
    technologies: ["Next.js", "Framer Motion", "Three.js", "OpenAI API", "Tailwind CSS"],
    features: [
      "AI-powered assistant",
      "3D interactive elements",
      "Advanced animations",
      "Voice interaction",
      "Multi-theme support",
    ],
    metrics: {
      performance: 99,
      accessibility: 96,
      seo: 94,
      bestPractices: 98,
    },
    timeline: "3 months",
    status: "completed",
    images: ["/images/portfolio-1.jpg", "/images/portfolio-2.jpg", "/images/portfolio-3.jpg"],
    liveUrl: "https://uzair.dev",
    githubUrl: "https://github.com/muzairkattana/portfolio",
  },
  {
    id: "mobile-fitness-app",
    title: "AI Fitness Companion App",
    description: "Smart fitness app with AI personal trainer and nutrition tracking",
    longDescription:
      "A comprehensive fitness application that uses AI to create personalized workout plans, track nutrition, and provide real-time form corrections through computer vision.",
    category: "mobile",
    technologies: ["React Native", "TensorFlow Lite", "Firebase", "Node.js", "MongoDB"],
    features: [
      "AI personal trainer",
      "Computer vision form analysis",
      "Nutrition tracking",
      "Social challenges",
      "Wearable device integration",
    ],
    metrics: {
      performance: 93,
      accessibility: 91,
      seo: 85,
      bestPractices: 94,
    },
    timeline: "8 months",
    status: "in-progress",
    images: ["/images/fitness-app-1.jpg", "/images/fitness-app-2.jpg", "/images/fitness-app-3.jpg"],
  },
]

const categories = [
  { id: "all", label: "All Projects", icon: Layers },
  { id: "web", label: "Web Apps", icon: Globe },
  { id: "mobile", label: "Mobile Apps", icon: Smartphone },
  { id: "ai", label: "AI Projects", icon: Sparkles },
  { id: "ecommerce", label: "E-commerce", icon: TrendingUp },
  { id: "design", label: "Design", icon: Monitor },
]

export default function InteractivePortfolioShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [showMetrics, setShowMetrics] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { playSound } = useSound()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((project) => project.category === selectedCategory)

  const handleProjectSelect = useCallback(
    (project: Project) => {
      setSelectedProject(project)
      setCurrentImageIndex(0)
      setIsVideoPlaying(false)
      playSound("click")
    },
    [playSound],
  )

  const handleVideoToggle = useCallback(() => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
      playSound("click")
    }
  }, [isVideoPlaying, playSound])

  const nextImage = useCallback(() => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1))
      playSound("click")
    }
  }, [selectedProject, playSound])

  const prevImage = useCallback(() => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1))
      playSound("click")
    }
  }, [selectedProject, playSound])

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "planning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
    }
  }

  const getCategoryColor = (category: Project["category"]) => {
    switch (category) {
      case "web":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "mobile":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
      case "ai":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100"
      case "ecommerce":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "design":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
    }
  }

  return (
    <section className="py-20 relative overflow-hidden" ref={containerRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <motion.div
        className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        style={{ y, opacity }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        style={{ y: useTransform(y, [0, 100], [0, -50]), opacity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Interactive Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore my latest work through an interactive showcase featuring cutting-edge technologies, innovative
            solutions, and measurable results.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => {
                  setSelectedCategory(category.id)
                  playSound("click")
                }}
                className="flex items-center gap-2 transition-all duration-300 hover:scale-105"
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </Button>
            )
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => handleProjectSelect(project)}
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-background to-muted/30">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.images[0] || "/placeholder.svg?height=300&width=400"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Badge className={getStatusColor(project.status)}>{project.status.replace("-", " ")}</Badge>
                      <Badge className={getCategoryColor(project.category)}>{project.category}</Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex items-center gap-2 text-white">
                        <Eye className="h-4 w-4" />
                        <span className="text-sm font-medium">View Details</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {project.timeline}
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { label: "Projects Completed", value: "50+", icon: Target },
            { label: "Happy Clients", value: "30+", icon: Users },
            { label: "Years Experience", value: "5+", icon: Award },
            { label: "Technologies", value: "25+", icon: Zap },
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
              >
                <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto p-0">
          {selectedProject && (
            <div className="relative">
              <DialogHeader className="p-6 pb-0">
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-2xl font-bold mb-2">{selectedProject.title}</DialogTitle>
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className={getStatusColor(selectedProject.status)}>
                        {selectedProject.status.replace("-", " ")}
                      </Badge>
                      <Badge className={getCategoryColor(selectedProject.category)}>{selectedProject.category}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {selectedProject.timeline}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => setShowMetrics(!showMetrics)}>
                            <TrendingUp className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Performance Metrics</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </DialogHeader>

              <div className="p-6">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                    <TabsTrigger value="tech">Technology</TabsTrigger>
                    <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Project Description</h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">{selectedProject.longDescription}</p>

                        <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                        <ul className="space-y-2">
                          {selectedProject.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-6">
                        {selectedProject.videoUrl ? (
                          <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                            <video
                              ref={videoRef}
                              src={selectedProject.videoUrl}
                              className="w-full h-full object-cover"
                              muted={isMuted}
                              loop
                              onPlay={() => setIsVideoPlaying(true)}
                              onPause={() => setIsVideoPlaying(false)}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Button
                                variant="secondary"
                                size="lg"
                                onClick={handleVideoToggle}
                                className="bg-black/50 hover:bg-black/70"
                              >
                                {isVideoPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                              </Button>
                            </div>
                            <div className="absolute bottom-4 right-4 flex gap-2">
                              <Button variant="secondary" size="sm" onClick={() => setIsMuted(!isMuted)}>
                                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="relative aspect-video rounded-lg overflow-hidden">
                            <img
                              src={selectedProject.images[currentImageIndex] || "/placeholder.svg"}
                              alt={selectedProject.title}
                              className="w-full h-full object-cover"
                            />
                            {selectedProject.images.length > 1 && (
                              <>
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={prevImage}
                                  className="absolute left-4 top-1/2 -translate-y-1/2"
                                >
                                  <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={nextImage}
                                  className="absolute right-4 top-1/2 -translate-y-1/2"
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        )}

                        {selectedProject.testimonial && (
                          <Card className="p-4 bg-muted/50">
                            <p className="text-sm italic mb-3">"{selectedProject.testimonial.text}"</p>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-primary">
                                  {selectedProject.testimonial.author.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-medium">{selectedProject.testimonial.author}</p>
                                <p className="text-xs text-muted-foreground">
                                  {selectedProject.testimonial.role} at {selectedProject.testimonial.company}
                                </p>
                              </div>
                            </div>
                          </Card>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-6 border-t">
                      {selectedProject.liveUrl && (
                        <Button asChild>
                          <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {selectedProject.githubUrl && (
                        <Button variant="outline" asChild>
                          <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            Source Code
                          </a>
                        </Button>
                      )}
                      <Button variant="outline">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Project
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="gallery" className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedProject.images.map((image, index) => (
                        <div
                          key={index}
                          className="aspect-video rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`${selectedProject.title} - Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="tech" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Technologies Used</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {selectedProject.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="justify-center py-2">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Architecture & Approach</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">Frontend</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Modern React-based architecture with component-driven development, state management, and
                            responsive design principles.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Backend</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Scalable server architecture with API-first design, database optimization, and cloud
                            deployment strategies.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="metrics" className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(selectedProject.metrics).map(([key, value]) => (
                        <div key={key} className="text-center p-4 rounded-lg bg-muted/50">
                          <div className="text-2xl font-bold text-primary mb-1">{value}%</div>
                          <div className="text-sm text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </div>
                          <Progress value={value} className="mt-2" />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Performance Insights</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <Card className="p-4">
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Zap className="h-4 w-4 text-yellow-500" />
                            Speed Optimization
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Achieved {selectedProject.metrics.performance}% performance score through code splitting,
                            lazy loading, and optimized assets.
                          </p>
                        </Card>
                        <Card className="p-4">
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-500" />
                            Accessibility
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedProject.metrics.accessibility}% accessibility compliance with WCAG guidelines and
                            screen reader support.
                          </p>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
