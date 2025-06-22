"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Code, Layers, Palette } from "lucide-react"
import ShopManagementShowcase from "./shop-management-showcase"
import ServiceProviderShowcase from "./v0-project-showcase"
import ProjectCard from "./project-card"

interface Project {
  id: string
  title: string
  category: string
  description: string
  image: string
  demoUrl: string
  githubUrl?: string
  technologies: string[]
  details?: string
}

export default function ProjectsSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })
  const [expandedProject, setExpandedProject] = useState<string | null>(null)

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

  const projects: Project[] = [
    {
      id: "3d-generator",
      title: "3D Model Generator",
      category: "web",
      description:
        "AI-powered 3D model generation tool with advanced wireframe visualization and real-time rendering capabilities.",
      image: "/images/3d-model-generator.png",
      demoUrl: "https://3dmodelgenerator.vercel.app/",
      githubUrl: "#",
      technologies: ["Next.js", "Three.js", "AI/ML", "WebGL", "TypeScript"],
      details:
        "An innovative AI-powered platform that generates complex 3D models from text descriptions. Features real-time wireframe visualization, advanced rendering capabilities, and seamless export options for various 3D formats.",
    },
    {
      id: "1",
      title: "Modern Dashboard",
      category: "web",
      description: "Data analytical dashboard adaptable to all devices, with UI components and animated interactions.",
      image: "/placeholder.svg?height=300&width=500",
      demoUrl: "#",
      githubUrl: "#",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
      details:
        "A comprehensive dashboard solution for data visualization and analytics. Features include real-time data updates, interactive charts, and responsive design for all device sizes.",
    },
    {
      id: "2",
      title: "E-Commerce Website",
      category: "web",
      description: "Amazon clone adaptable to all devices, with UI components and animated interactions.",
      image: "/placeholder.svg?height=300&width=500",
      demoUrl: "#",
      githubUrl: "#",
      technologies: ["Next.js", "MongoDB", "Stripe", "Redux"],
      details:
        "A full-featured e-commerce platform with product listings, shopping cart, user authentication, and payment processing. Includes admin dashboard for inventory management.",
    },
    {
      id: "3",
      title: "Brand Design",
      category: "design",
      description: "Tesla Clone adaptable to all devices, with UI components and animated interactions.",
      image: "/placeholder.svg?height=300&width=500",
      demoUrl: "#",
      technologies: ["Figma", "Adobe XD", "Photoshop"],
      details:
        "Complete brand identity design including logo, color palette, typography, and brand guidelines. Created for a tech startup in the renewable energy sector.",
    },
  ]

  const toggleProject = (id: string) => {
    if (expandedProject === id) {
      setExpandedProject(null)
    } else {
      setExpandedProject(id)
    }
  }

  return (
    <section id="projects" className="py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern-dark"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={controls} className="space-y-16">
          <motion.div variants={itemVariants} className="text-center">
            <Badge variant="outline" className="text-primary border-primary/30 px-3 py-1 mb-4">
              My Work
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Showcasing my most significant development work and client projects. Each project represents a unique
              challenge solved with modern technologies and creative solutions.
            </p>
          </motion.div>

          {/* Project Navigation */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="inline-flex p-1 bg-muted/50 rounded-full">
              <Button
                variant={expandedProject === "shop" ? "default" : "ghost"}
                className="rounded-full gap-2"
                onClick={() => toggleProject("shop")}
              >
                <Layers className="h-4 w-4" />
                Shop Management
                {expandedProject === "shop" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>

              <Button
                variant={expandedProject === "service" ? "default" : "ghost"}
                className="rounded-full gap-2"
                onClick={() => toggleProject("service")}
              >
                <Code className="h-4 w-4" />
                Service Provider
                {expandedProject === "service" ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>

              <Button
                variant={expandedProject === "other" ? "default" : "ghost"}
                className="rounded-full gap-2"
                onClick={() => toggleProject("other")}
              >
                <Palette className="h-4 w-4" />
                Other Projects
                {expandedProject === "other" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </motion.div>

          {/* Project Content */}
          <motion.div variants={itemVariants} className="space-y-16">
            {/* Shop Management System */}
            {expandedProject === "shop" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-xl"
              >
                <div className="text-center mb-8">
                  <Badge variant="outline" className="text-primary border-primary/30 px-3 py-1 text-sm">
                    Featured Project
                  </Badge>
                  <h3 className="text-2xl font-bold mt-2">Shop Management System</h3>
                </div>
                <ShopManagementShowcase />
              </motion.div>
            )}

            {/* Service Provider */}
            {expandedProject === "service" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-xl"
              >
                <div className="text-center mb-8">
                  <Badge variant="outline" className="text-primary border-primary/30 px-3 py-1 text-sm">
                    Featured Project
                  </Badge>
                  <h3 className="text-2xl font-bold mt-2">Digital Service Provider</h3>
                </div>
                <ServiceProviderShowcase />
              </motion.div>
            )}

            {/* Other Projects */}
            {expandedProject === "other" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-xl"
              >
                <div className="text-center mb-8">
                  <Badge variant="outline" className="text-primary border-primary/30 px-3 py-1 text-sm">
                    Additional Projects
                  </Badge>
                  <h3 className="text-2xl font-bold mt-2">More of My Work</h3>
                </div>

                <Tabs defaultValue="all" className="w-full">
                  <div className="flex justify-center mb-8">
                    <TabsList className="grid grid-cols-3 p-1 bg-background/50 backdrop-blur-sm">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="web">Web</TabsTrigger>
                      <TabsTrigger value="design">Design</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="all" className="mt-0">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {projects.map((project) => (
                        <ProjectCard
                          key={project.id}
                          title={project.title}
                          description={project.description}
                          image={project.image}
                          demoUrl={project.demoUrl}
                          githubUrl={project.githubUrl}
                          technologies={project.technologies}
                          details={project.details}
                        />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="web" className="mt-0">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {projects
                        .filter((project) => project.category === "web")
                        .map((project) => (
                          <ProjectCard
                            key={project.id}
                            title={project.title}
                            description={project.description}
                            image={project.image}
                            demoUrl={project.demoUrl}
                            githubUrl={project.githubUrl}
                            technologies={project.technologies}
                            details={project.details}
                          />
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="design" className="mt-0">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {projects
                        .filter((project) => project.category === "design")
                        .map((project) => (
                          <ProjectCard
                            key={project.id}
                            title={project.title}
                            description={project.description}
                            image={project.image}
                            demoUrl={project.demoUrl}
                            githubUrl={project.githubUrl}
                            technologies={project.technologies}
                            details={project.details}
                          />
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}

            {/* Default state - show a preview of all projects */}
            {!expandedProject && (
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 shadow-lg cursor-pointer"
                  onClick={() => toggleProject("shop")}
                >
                  <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-4 flex items-center justify-center">
                    <Layers className="h-16 w-16 text-primary/60" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Shop Management System</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    A comprehensive CRM and inventory management solution for retail businesses.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => toggleProject("shop")}>
                    View Project
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 shadow-lg cursor-pointer"
                  onClick={() => toggleProject("service")}
                >
                  <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-4 flex items-center justify-center">
                    <Code className="h-16 w-16 text-primary/60" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Digital Service Provider</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Premium tech solutions and ethical hacking services platform.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => toggleProject("service")}>
                    View Project
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 shadow-lg cursor-pointer"
                  onClick={() => toggleProject("other")}
                >
                  <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-4 flex items-center justify-center">
                    <Palette className="h-16 w-16 text-primary/60" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Other Projects</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Explore more of my work including web applications, designs, and more.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => toggleProject("other")}>
                    View Projects
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
