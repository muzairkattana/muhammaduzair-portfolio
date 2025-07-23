"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink, Github, Eye, Code, Zap, Star, Calendar, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClickableText } from "@/components/clickable-text"
import Image from "next/image"

const portfolioProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern, responsive e-commerce platform built with Next.js and Stripe integration",
    longDescription:
      "A comprehensive e-commerce solution featuring user authentication, product management, shopping cart functionality, secure payment processing with Stripe, order tracking, and admin dashboard. Built with modern technologies for optimal performance and user experience.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Stripe", "MongoDB"],
    category: "Web Development",
    status: "Completed",
    year: "2024",
    client: "TechCorp Solutions",
    duration: "3 months",
    team: "4 developers",
    features: [
      "User Authentication & Authorization",
      "Product Catalog Management",
      "Shopping Cart & Checkout",
      "Payment Integration (Stripe)",
      "Order Tracking System",
      "Admin Dashboard",
      "Responsive Design",
      "SEO Optimization",
    ],
    challenges: [
      "Implementing secure payment processing",
      "Optimizing for mobile performance",
      "Managing complex state across components",
    ],
    results: ["40% increase in conversion rate", "60% improvement in page load speed", "99.9% uptime achieved"],
    github: "https://github.com/muzairkattana/ecommerce-platform",
    live: "https://ecommerce-demo.vercel.app",
    testimonial: {
      text: "Muhammad delivered an exceptional e-commerce platform that exceeded our expectations. The attention to detail and performance optimization was outstanding.",
      author: "Sarah Johnson",
      position: "CTO, TechCorp Solutions",
    },
  },
  {
    id: 2,
    title: "AI Content Generator",
    description: "An intelligent content generation tool powered by OpenAI's GPT models",
    longDescription:
      "A sophisticated AI-powered content generation platform that helps businesses create high-quality content at scale. Features include multiple content types, customizable templates, SEO optimization, and team collaboration tools.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["React", "Node.js", "OpenAI API", "PostgreSQL", "Redis", "Docker"],
    category: "AI/ML",
    status: "In Progress",
    year: "2024",
    client: "ContentFlow Inc.",
    duration: "4 months",
    team: "3 developers",
    features: [
      "Multiple Content Types (Blog, Social, Ads)",
      "Custom Template System",
      "SEO Content Optimization",
      "Team Collaboration Tools",
      "Content Calendar Integration",
      "Analytics Dashboard",
      "API Integration",
      "Multi-language Support",
    ],
    challenges: ["Optimizing AI response times", "Implementing content quality filters", "Managing API rate limits"],
    results: ["70% reduction in content creation time", "85% user satisfaction rate", "500+ active users in beta"],
    github: "https://github.com/muzairkattana/ai-content-generator",
    live: "https://ai-content-demo.vercel.app",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A modern, interactive portfolio website with advanced animations and features",
    longDescription:
      "A cutting-edge portfolio website showcasing advanced web development skills with smooth animations, interactive elements, dark/light mode, responsive design, and performance optimization. Built to impress and convert visitors into clients.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "Vercel"],
    category: "Web Development",
    status: "Completed",
    year: "2024",
    client: "Personal Project",
    duration: "2 months",
    team: "Solo project",
    features: [
      "Interactive Animations",
      "Dark/Light Mode Toggle",
      "Responsive Design",
      "Performance Optimized",
      "SEO Friendly",
      "Contact Form Integration",
      "Blog Section",
      "Project Showcase",
    ],
    challenges: [
      "Creating smooth animations without performance impact",
      "Optimizing for all device sizes",
      "Implementing advanced UI interactions",
    ],
    results: ["95+ PageSpeed Insights score", "100% accessibility compliance", "50+ client inquiries generated"],
    github: "https://github.com/muzairkattana/portfolio",
    live: "https://muhammad-uzair.vercel.app",
  },
  {
    id: 4,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates",
    longDescription:
      "A comprehensive task management solution designed for teams and individuals. Features real-time collaboration, project organization, deadline tracking, file attachments, and detailed analytics to boost productivity.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["Vue.js", "Express.js", "Socket.io", "MongoDB", "AWS S3"],
    category: "Web Development",
    status: "Completed",
    year: "2023",
    client: "ProductivityPro",
    duration: "5 months",
    team: "5 developers",
    features: [
      "Real-time Collaboration",
      "Project Organization",
      "Deadline Tracking",
      "File Attachments",
      "Team Chat Integration",
      "Progress Analytics",
      "Mobile App",
      "Offline Sync",
    ],
    challenges: [
      "Implementing real-time synchronization",
      "Managing large file uploads",
      "Ensuring data consistency across devices",
    ],
    results: ["30% increase in team productivity", "95% user retention rate", "1000+ active teams"],
    github: "https://github.com/muzairkattana/task-manager",
    live: "https://taskmanager-demo.vercel.app",
  },
]

const categories = ["All", "Web Development", "AI/ML", "Mobile", "Design"]

export default function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<(typeof portfolioProjects)[0] | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const filteredProjects =
    selectedCategory === "All"
      ? portfolioProjects
      : portfolioProjects.filter((project) => project.category === selectedCategory)

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

  return (
    <section
      id="portfolio"
      className="py-20 bg-gradient-to-br from-background via-muted/5 to-background relative overflow-hidden"
    >
      {/* Add background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary/3 to-secondary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-secondary/3 to-primary/3 rounded-full blur-3xl"></div>
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
              My Portfolio
            </ClickableText>
            <ClickableText as="p" className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore my latest projects showcasing expertise in web development, AI integration, and modern
              technologies. Each project represents a unique challenge solved with innovative solutions.
            </ClickableText>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="flex flex-wrap gap-2 p-1 bg-muted rounded-lg">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all duration-300"
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants} whileHover={{ y: -10 }} className="group">
                <Card className="h-full overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm">
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4">
                      <Badge variant={project.status === "Completed" ? "default" : "secondary"}>{project.status}</Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" asChild>
                          <a href={project.live} target="_blank" rel="noopener noreferrer">
                            <Eye className="h-4 w-4 mr-1" />
                            Live Demo
                          </a>
                        </Button>
                        <Button size="sm" variant="secondary" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-1" />
                            Code
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <CardHeader className="space-y-4 p-6">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {project.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground font-medium">{project.year}</span>
                    </div>
                    <ClickableText
                      as={CardTitle}
                      className="text-xl font-bold group-hover:text-primary transition-colors leading-tight"
                    >
                      {project.title}
                    </ClickableText>
                    <ClickableText as={CardDescription} className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </ClickableText>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-1">
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

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {project.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {project.team}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedProject(project)}
                        className="text-primary hover:text-primary/80"
                      >
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Project Details Modal */}
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-background/98 backdrop-blur-xl rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border/50 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <Image
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    width={800}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
                    onClick={() => setSelectedProject(null)}
                  >
                    ×
                  </Button>
                </div>

                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-3xl font-bold">{selectedProject.title}</h3>
                      <Badge variant={selectedProject.status === "Completed" ? "default" : "secondary"}>
                        {selectedProject.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-lg">{selectedProject.longDescription}</p>
                  </div>

                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="features">Features</TabsTrigger>
                      <TabsTrigger value="challenges">Challenges</TabsTrigger>
                      <TabsTrigger value="results">Results</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Code className="h-5 w-5" />
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold">Project Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Client:</span>
                              <span>{selectedProject.client}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Duration:</span>
                              <span>{selectedProject.duration}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Team Size:</span>
                              <span>{selectedProject.team}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Year:</span>
                              <span>{selectedProject.year}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="features" className="space-y-4">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Key Features
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedProject.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="challenges" className="space-y-4">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        Technical Challenges
                      </h4>
                      <div className="space-y-3">
                        {selectedProject.challenges.map((challenge, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-semibold text-primary">{index + 1}</span>
                            </div>
                            <span className="text-sm">{challenge}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="results" className="space-y-4">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Project Results
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {selectedProject.results.map((result, index) => (
                          <div key={index} className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                            <div className="text-2xl font-bold text-primary mb-2">
                              {result.match(/\d+/)?.[0] || "✓"}
                              {result.includes("%") && "%"}
                            </div>
                            <div className="text-sm text-muted-foreground">{result.replace(/\d+%?\s*/, "")}</div>
                          </div>
                        ))}
                      </div>

                      {selectedProject.testimonial && (
                        <div className="mt-6 p-4 bg-muted/30 rounded-lg border-l-4 border-primary">
                          <blockquote className="text-sm italic mb-2">"{selectedProject.testimonial.text}"</blockquote>
                          <cite className="text-xs text-muted-foreground">
                            — {selectedProject.testimonial.author}, {selectedProject.testimonial.position}
                          </cite>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>

                  <div className="flex gap-4 pt-4 border-t">
                    <Button asChild className="flex-1">
                      <a href={selectedProject.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Live Project
                      </a>
                    </Button>
                    <Button variant="outline" asChild className="flex-1 bg-transparent">
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        View Source Code
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center space-y-6 pt-12">
            <ClickableText as="h3" className="text-2xl font-bold">
              Ready to Start Your Project?
            </ClickableText>
            <ClickableText as="p" className="text-muted-foreground max-w-2xl mx-auto">
              Let's collaborate to bring your ideas to life. I'm always excited to work on new challenges and create
              innovative solutions that make a difference.
            </ClickableText>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="#contact">Start a Project</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/cv/Muhammad-Uzair-CV.pdf" target="_blank" rel="noreferrer">
                  Download CV
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
